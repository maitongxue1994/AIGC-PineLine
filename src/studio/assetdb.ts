/**
 * 素材库 / 生成历史 的本地持久层：IndexedDB 薄封装（无第三方依赖）。
 * 图片存 IndexedDB（配额以 GB 计），绕开 localStorage 5MB 与 base64 剥离限制——
 * 「收藏到素材库」的图刷新后仍在。
 * 隐私模式等打不开 IndexedDB 时静默降级为会话内存（persistent=false，面板给黄条提示）。
 */

/** 资产类型：驱动一致性自动挂载（派生分镜图/视频时按类型匹配参考），与文件夹组织解耦 */
export type AssetType = 'character' | 'scene' | 'prop' | 'style' | 'other'

export type LibraryAsset = {
  id: string
  folderId: string
  name: string
  dataUrl: string
  favorite: boolean
  createdAt: number
  sourceNodeId?: string
  /** 旧资产缺省时按 folderId 推断（inferAssetType），读出时已归一 */
  type?: AssetType
}

const FOLDER_TYPE: Record<string, AssetType> = {
  character: 'character',
  scene: 'scene',
  prop: 'prop',
  style: 'style',
}

export function inferAssetType(a: Pick<LibraryAsset, 'type' | 'folderId'>): AssetType {
  return a.type ?? FOLDER_TYPE[a.folderId] ?? 'other'
}

export const ASSET_TYPE_OPTIONS: { id: AssetType; label: string }[] = [
  { id: 'character', label: '角色' },
  { id: 'scene', label: '场景' },
  { id: 'prop', label: '道具' },
  { id: 'style', label: '风格' },
  { id: 'other', label: '其他' },
]

export type HistoryEntry = {
  id: string
  nodeId: string
  kind: 'text' | 'image' | 'video'
  preset: string | null
  prompt: string
  /** 图片为 dataURL（原图）；文本为正文；视频为 dataURL 本体 */
  content: string
  /** 视频首帧海报缩图（jpeg dataURL），列表展示用 */
  poster?: string
  label?: string
  createdAt: number
}

export type LibraryFolder = { id: string; name: string }

/**
 * 生成请求日志（v3 新增 genlog 库）：与 history 不同，**失败也记录**——
 * 提示词/模型/耗时/错误/供应商 request-id 全留痕，超时后可凭 requestId
 * 去供应商控制台对账找回生成记录。
 */
export type GenLogEntry = {
  id: string
  createdAt: number
  /** API 路径，如 /api/generate/image */
  path: string
  ok: boolean
  /** 请求耗时 ms */
  ms: number
  /** 提示词摘要（前 200 字符） */
  prompt?: string
  model?: string
  error?: string
  /** 供应商侧 request-id（方舟 x-request-id 等），对账找回用 */
  requestId?: string
}

/**
 * 用户长期记忆（v4 新增 memory 库）：画布助手跨对话携带的用户偏好/项目设定。
 * 来源：agent=助手 remember op 自动沉淀；user=记忆管理手动添加；import=外部
 * 记忆文件（如 Claude Code 的 MEMORY.md）导入。
 */
export type MemoryEntry = {
  id: string
  content: string
  source: 'agent' | 'user' | 'import'
  createdAt: number
  updatedAt: number
}

/** 项目档案：画布图（剥离 data: 媒体）+ 缩略图 + 元数据（v2 新增 projects 库） */
export type ProjectRecord = {
  id: string
  name: string
  updatedAt: number
  /** ≤320px jpeg dataURL；无图项目为 null（页面显示渐变占位） */
  thumb: string | null
  graph: { nodes: unknown[]; edges: unknown[] }
  credits: number
}

const DB_NAME = 'pineline-studio'
const DB_VERSION = 4
const HISTORY_LIMIT = 200
/** 生成请求日志上限（纯文本小记录，多留一些便于排查） */
const GENLOG_LIMIT = 500
/** 用户长期记忆条数上限（LRU 按更新时间裁剪） */
const MEMORY_LIMIT = 100
/** 视频体积大（单条可达数十 MB），历史单独收紧 LRU 上限 */
const VIDEO_HISTORY_LIMIT = 20
const FOLDERS_KEY = 'pineline-library-v1'

export const DEFAULT_FOLDERS: LibraryFolder[] = [
  { id: 'character', name: '角色' },
  { id: 'scene', name: '场景' },
  { id: 'prop', name: '道具' },
  { id: 'style', name: '风格' },
  { id: 'others', name: 'Others' },
]

let dbPromise: Promise<IDBDatabase | null> | null = null
let persistent = true
// 降级内存兜底
const memAssets = new Map<string, LibraryAsset>()
const memHistory: HistoryEntry[] = []
const memProjects = new Map<string, ProjectRecord>()
const memGenLog: GenLogEntry[] = []
const memMemory = new Map<string, MemoryEntry>()

export function isPersistent(): boolean {
  return persistent
}

function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains('assets')) {
          const s = db.createObjectStore('assets', { keyPath: 'id' })
          s.createIndex('folderId', 'folderId')
        }
        if (!db.objectStoreNames.contains('history')) {
          const s = db.createObjectStore('history', { keyPath: 'id' })
          s.createIndex('createdAt', 'createdAt')
        }
        if (!db.objectStoreNames.contains('projects')) {
          const s = db.createObjectStore('projects', { keyPath: 'id' })
          s.createIndex('updatedAt', 'updatedAt')
        }
        if (!db.objectStoreNames.contains('genlog')) {
          const s = db.createObjectStore('genlog', { keyPath: 'id' })
          s.createIndex('createdAt', 'createdAt')
        }
        if (!db.objectStoreNames.contains('memory')) {
          const s = db.createObjectStore('memory', { keyPath: 'id' })
          s.createIndex('updatedAt', 'updatedAt')
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => {
        persistent = false
        resolve(null)
      }
    } catch {
      persistent = false
      resolve(null)
    }
  })
  return dbPromise
}

function tx<T>(
  store: 'assets' | 'history' | 'projects' | 'genlog' | 'memory',
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T>,
): Promise<T | null> {
  return openDb().then(
    (db) =>
      new Promise<T | null>((resolve) => {
        if (!db) return resolve(null)
        try {
          const t = db.transaction(store, mode)
          const req = fn(t.objectStore(store))
          req.onsuccess = () => resolve(req.result as T)
          req.onerror = () => resolve(null)
        } catch {
          resolve(null)
        }
      }),
  )
}

// ---------------- 文件夹（元数据小，存 localStorage） ----------------

export function listFolders(): LibraryFolder[] {
  try {
    const raw = localStorage.getItem(FOLDERS_KEY)
    if (!raw) return DEFAULT_FOLDERS
    const parsed = JSON.parse(raw) as LibraryFolder[]
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_FOLDERS
  } catch {
    return DEFAULT_FOLDERS
  }
}

export function addFolder(name: string): LibraryFolder[] {
  const folders = listFolders()
  const next = [...folders, { id: `f-${crypto.randomUUID()}`, name }]
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(next))
  } catch {
    /* 存不下就只在本次会话生效 */
  }
  return next
}

// ---------------- 素材 ----------------

export async function listAssets(): Promise<LibraryAsset[]> {
  const rows = await tx<LibraryAsset[]>('assets', 'readonly', (s) => s.getAll())
  const list = rows ?? [...memAssets.values()]
  // 类型归一：旧资产按 folderId 推断，下游（自动挂载/筛选）无需再判空
  return list
    .map((a) => ({ ...a, type: inferAssetType(a) }))
    .sort((a, b) => b.createdAt - a.createdAt)
}

export async function saveAsset(
  input: Omit<LibraryAsset, 'id' | 'createdAt'>,
): Promise<LibraryAsset> {
  const asset: LibraryAsset = { ...input, id: `a-${crypto.randomUUID()}`, createdAt: Date.now() }
  const ok = await tx('assets', 'readwrite', (s) => s.put(asset))
  if (ok === null && !persistent) memAssets.set(asset.id, asset)
  else if (ok === null) memAssets.set(asset.id, asset)
  return asset
}

export async function updateAsset(id: string, patch: Partial<LibraryAsset>): Promise<void> {
  const rows = await listAssets()
  const cur = rows.find((a) => a.id === id)
  if (!cur) return
  const next = { ...cur, ...patch, id }
  const ok = await tx('assets', 'readwrite', (s) => s.put(next))
  if (ok === null) memAssets.set(id, next)
}

export async function removeAsset(id: string): Promise<void> {
  await tx('assets', 'readwrite', (s) => s.delete(id))
  memAssets.delete(id)
}

// ---------------- 项目档案（多项目管理） ----------------

export async function listProjects(): Promise<ProjectRecord[]> {
  const rows = await tx<ProjectRecord[]>('projects', 'readonly', (s) => s.getAll())
  if (rows) return rows.sort((a, b) => b.updatedAt - a.updatedAt)
  return [...memProjects.values()].sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getProject(id: string): Promise<ProjectRecord | null> {
  const row = await tx<ProjectRecord>('projects', 'readonly', (s) => s.get(id))
  return row ?? memProjects.get(id) ?? null
}

/** upsert：新建与自动快照共用 */
export async function putProject(record: ProjectRecord): Promise<void> {
  const ok = await tx('projects', 'readwrite', (s) => s.put(record))
  if (ok === null) memProjects.set(record.id, record)
}

export async function removeProject(id: string): Promise<void> {
  await tx('projects', 'readwrite', (s) => s.delete(id))
  memProjects.delete(id)
}

// ---------------- 生成历史（上限 200，LRU 裁剪） ----------------

export async function listHistory(): Promise<HistoryEntry[]> {
  const rows = await tx<HistoryEntry[]>('history', 'readonly', (s) => s.getAll())
  if (rows) return rows.sort((a, b) => b.createdAt - a.createdAt)
  return [...memHistory].sort((a, b) => b.createdAt - a.createdAt)
}

export async function appendHistory(
  entries: Omit<HistoryEntry, 'id' | 'createdAt'>[],
): Promise<void> {
  const now = Date.now()
  const rows: HistoryEntry[] = entries.map((e, i) => ({
    ...e,
    id: `h-${crypto.randomUUID()}`,
    createdAt: now + i,
  }))
  const db = await openDb()
  if (!db) {
    memHistory.push(...rows)
    memHistory.sort((a, b) => b.createdAt - a.createdAt)
    memHistory.length = Math.min(memHistory.length, HISTORY_LIMIT)
    return
  }
  try {
    const t = db.transaction('history', 'readwrite')
    const store = t.objectStore('history')
    for (const r of rows) store.put(r)
    // LRU 裁剪
    const all = store.getAll()
    all.onsuccess = () => {
      const list = (all.result as HistoryEntry[]).sort((a, b) => b.createdAt - a.createdAt)
      // 视频单独更小的 LRU 上限，再做总量裁剪
      const videos = list.filter((r) => r.kind === 'video')
      for (const stale of videos.slice(VIDEO_HISTORY_LIMIT)) store.delete(stale.id)
      for (const stale of list.slice(HISTORY_LIMIT)) store.delete(stale.id)
    }
  } catch {
    /* 历史非关键路径，失败静默 */
  }
}

// ---------------- 生成请求日志（成功+失败都记，上限 500） ----------------

export async function listGenLog(): Promise<GenLogEntry[]> {
  const rows = await tx<GenLogEntry[]>('genlog', 'readonly', (s) => s.getAll())
  if (rows) return rows.sort((a, b) => b.createdAt - a.createdAt)
  return [...memGenLog].sort((a, b) => b.createdAt - a.createdAt)
}

export async function appendGenLog(
  entry: Omit<GenLogEntry, 'id' | 'createdAt'>,
): Promise<void> {
  const row: GenLogEntry = {
    ...entry,
    id: `g-${crypto.randomUUID()}`,
    createdAt: Date.now(),
  }
  const db = await openDb()
  if (!db) {
    memGenLog.push(row)
    memGenLog.sort((a, b) => b.createdAt - a.createdAt)
    memGenLog.length = Math.min(memGenLog.length, GENLOG_LIMIT)
    return
  }
  try {
    const t = db.transaction('genlog', 'readwrite')
    const store = t.objectStore('genlog')
    store.put(row)
    const all = store.getAll()
    all.onsuccess = () => {
      const list = (all.result as GenLogEntry[]).sort((a, b) => b.createdAt - a.createdAt)
      for (const stale of list.slice(GENLOG_LIMIT)) store.delete(stale.id)
    }
  } catch {
    /* 日志非关键路径，失败静默 */
  }
}

export async function clearGenLog(): Promise<void> {
  await tx('genlog', 'readwrite', (s) => s.clear())
  memGenLog.length = 0
}

// ---------------- 用户长期记忆（上限 100，LRU 按更新时间裁剪） ----------------

export async function listMemories(): Promise<MemoryEntry[]> {
  const rows = await tx<MemoryEntry[]>('memory', 'readonly', (s) => s.getAll())
  const list = rows ?? [...memMemory.values()]
  return list.sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function putMemory(
  input: Pick<MemoryEntry, 'content' | 'source'>,
): Promise<MemoryEntry | null> {
  const content = input.content.trim().slice(0, 500)
  if (!content) return null
  // 去重：同内容已存在则只刷新更新时间
  const existing = (await listMemories()).find((m) => m.content === content)
  const now = Date.now()
  const row: MemoryEntry = existing
    ? { ...existing, updatedAt: now }
    : { id: `m-${crypto.randomUUID()}`, content, source: input.source, createdAt: now, updatedAt: now }
  const ok = await tx('memory', 'readwrite', (s) => s.put(row))
  if (ok === null) memMemory.set(row.id, row)
  // LRU 裁剪
  const all = await listMemories()
  for (const stale of all.slice(MEMORY_LIMIT)) {
    await tx('memory', 'readwrite', (s) => s.delete(stale.id))
    memMemory.delete(stale.id)
  }
  return row
}

export async function updateMemory(id: string, content: string): Promise<void> {
  const cur = (await listMemories()).find((m) => m.id === id)
  if (!cur) return
  const next = { ...cur, content: content.trim().slice(0, 500), updatedAt: Date.now() }
  const ok = await tx('memory', 'readwrite', (s) => s.put(next))
  if (ok === null) memMemory.set(id, next)
}

export async function removeMemory(id: string): Promise<void> {
  await tx('memory', 'readwrite', (s) => s.delete(id))
  memMemory.delete(id)
}
