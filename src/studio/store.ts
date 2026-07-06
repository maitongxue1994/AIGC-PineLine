import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react'
import { buildTemplate, type TemplateId } from './templates'
import {
  createVideoTask,
  fetchVideoFile,
  fetchVideoReadiness,
  generateImage,
  generateImageGrid,
  generateScript,
  generateStoryboard,
  queryVideoTask,
} from './api'
import {
  buildNode,
  DEFAULT_VIDEO_MODEL,
  ENTITY_STAGE_LABELS,
  entityStagePrompts,
  estimateCost,
  IMAGE_MODELS,
  isEntityPreset,
  INITIAL_CREDITS,
  presetMeta,
  resolveApiModel,
  TEXT_MODELS,
  VIDEO_MODELS,
} from './nodeCatalog'
import { migrateGraph, migrateLegacyEdge } from './migrate'
import { buildVideoPrompt, resolveGenerateAudio } from './videoPrompt'
import { styleKeywords } from './videoStyles'
import { rememberTaskLabel } from './taskLabels'
import { appendHistory, getProject, isPersistent, putProject } from './assetdb'
import {
  activeContent,
  isImageContent,
  type ImageQuality,
  type NodeKind,
  type NodeParams,
  type NodePreset,
  type NodeVersion,
  type PinColor,
  type PineEdge,
  type PineNode,
  type PineNodeData,
  type ShotItem,
  type VideoReadiness,
} from './types'

type Position = { x: number; y: number }

/**
 * localStorage 写入容错：zustand persist 的 setItem 无 try/catch，配额超限
 * （QuotaExceededError）会让异常穿透进**每一个** store action——表现为整套
 * UI 流程卡死（如项目页 busy 永久 true）。降级为仅内存 + console 告警。
 * （agentStore 同样复用；消息带缩略图后其体积也可能逼近配额）
 */
export const guardedLocalStorage = {
  getItem: (k: string) => localStorage.getItem(k),
  setItem: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v)
    } catch (err) {
      console.error('[pineline] localStorage 写入失败（疑似超配额），本次状态仅保留在内存', err)
    }
  },
  removeItem: (k: string) => localStorage.removeItem(k),
}

// 撤销/重做的结构快照：节点数组是不可变更新的，快照只是引用拷贝，内存开销很小
type GraphSnapshot = { nodes: PineNode[]; edges: PineEdge[] }

type Clipboard = { nodes: PineNode[]; edges: PineEdge[] } | null

type StudioState = {
  nodes: PineNode[]
  edges: PineEdge[]
  selectedNodeId: string | null
  projectName: string
  past: GraphSnapshot[]
  future: GraphSnapshot[]
  /** 假积分（本地模拟，无真实计费；帮助面板有注明） */
  credits: number
  onNodesChange: (changes: NodeChange<PineNode>[]) => void
  onEdgesChange: (changes: EdgeChange<PineEdge>[]) => void
  onConnect: (conn: Connection) => void
  selectNode: (id: string | null) => void
  focusNode: (id: string) => void
  /** 请求画布把节点带入视口中心：{id, tick} 自增信号，画布消费后 setCenter */
  focusRequest: { id: string; tick: number } | null
  setProjectName: (name: string) => void
  applyTemplate: (id: TemplateId) => string[]
  addNode: (
    kind: NodeKind,
    preset: NodePreset | null,
    position?: Position,
    init?: { title?: string; prompt?: string; params?: NodeParams },
  ) => string
  addAssetNode: (dataUrl: string, position?: Position) => string
  /**
   * 用户上传的参考图 → 命名实体参考节点（角色/场景/道具），供分镜图派生按名精确挂载。
   * Agent 把「这张图作为主讲人/场景/道具」落地到画布的通道。
   */
  addReferenceNode: (
    dataUrl: string,
    kind: 'char' | 'scene' | 'prop',
    name: string,
    position?: Position,
  ) => string
  /** 上传视频 → 视频节点（内容即本体） */
  addVideoNode: (dataUrl: string, position?: Position) => string
  /** 剪辑/增强派生下游视频节点并连线 */
  deriveVideoNode: (
    sourceId: string,
    opts: {
      title: string
      trim?: { start: number; end: number }
      enhance?: { resolution: string; frameRate: string; slowdown: string }
    },
  ) => string | null
  setPreset: (id: string, preset: NodePreset) => void
  setPrompt: (id: string, prompt: string) => void
  updateNodeParams: (id: string, patch: Partial<NodeParams>) => void
  updateNodeTitle: (id: string, title: string) => void
  /** 编辑当前激活版本的正文（文本节点产出可改写） */
  updateActiveContent: (id: string, content: string) => void
  /** 追加一个图片版本（本地裁剪/编辑结果）：activeVersion 指向新版本，保留原图可切回 */
  addImageVersion: (id: string, dataUrl: string, label?: string) => void
  /** 编辑分镜镜头（title/description）：写回 shots 并同步版本拼接文本，派生分镜图/视频用新内容 */
  updateShot: (
    id: string,
    shotIndex: number,
    patch: Partial<Pick<ShotItem, 'title' | 'description'>>,
  ) => void
  /** 整体编辑分镜全文：解析「#n 标题 + 描述」文本块重建 shots（可增删镜头），保留原顺序 id */
  replaceShotsFromText: (id: string, text: string) => void
  setActiveVersion: (id: string, index: number) => void
  setPin: (id: string, pin: PinColor | null) => void
  clearNodeError: (id: string) => void
  duplicateNode: (id: string) => string | null
  deleteNode: (id: string) => void
  copySelection: () => void
  pasteClipboard: (position?: Position) => string[]
  undo: () => void
  redo: () => void
  runNode: (id: string) => Promise<void>
  /**
   * 视频节点提示词填充：按 Seedance 官方公式组装上游语境（分镜画面描述 +
   * 分镜节点音色设定 + 纯净模式约束）写回节点提示词；返回是否有变化。
   */
  fillVideoPromptFromUpstream: (id: string) => boolean
  /** 视频任务超时后的续查：用版本上的 taskRef 重进轮询取件，不重新下单 */
  resumeVideoTask: (id: string) => Promise<void>
  /** 云端任务找回：本地任务 ID 丢失时，从供应商近 7 天列表取回成功任务的视频落版本 */
  recoverCloudTask: (id: string, taskId: string) => Promise<void>
  /**
   * 高级图像操作的再生成通道（多角度/打光/摄影机/蒙版重绘）：
   * 以当前激活版本为参考图 + 操作提示词重新生成，结果追加为新版本（可回退）。
   * composite 钩子供蒙版重绘做客户端合成保底。
   */
  runImageEdit: (
    id: string,
    prompt: string,
    opts?: {
      label?: string
      extraRefs?: string[]
      composite?: (generated: string) => Promise<string>
      /** 本次垫图临时用的图像模型（IMAGE_MODELS 的 id）；缺省沿用节点 params.imageModel */
      model?: string
    },
  ) => Promise<void>
  pipelineRunning: boolean
  // 自增信号：画布监听后执行 fitView（模板/建链后自动把新节点带入视野）
  fitViewTick: number
  requestFitView: () => void
  /** 一键整理：按拓扑层从左到右分列、层内纵向堆叠，可 ⌘Z 撤销 */
  autoLayout: () => void
  runPipeline: (ids?: string[]) => Promise<void>
  createPipelineFromBrief: (brief: string) => string[]
  /**
   * 分镜两段式派生：为选中镜头各建一个分镜图节点并连线，
   * 随后调 image-prompt 端点生成生图提示词回填（节点保持 idle，用户确认/编辑后再生图）。
   * 返回派生节点 id（供「全部生成图片」批量运行）。
   */
  deriveShotImageNodes: (
    storyboardId: string,
    indices: number[],
    opts?: { imageModel?: string; quality?: ImageQuality },
  ) => Promise<string[]>
  /**
   * 一键生成全部分镜图：对已派生的下游分镜图节点，缺提示词的先补生图提示词，
   * 然后整批运行（全部派生完成后的主入口，替代重复派生）。
   */
  generateAllShotImages: (
    storyboardId: string,
    opts?: { imageModel?: string; quality?: ImageQuality },
  ) => Promise<void>
  /**
   * 分镜→一键成片：为每个已派生分镜图建下游视频节点（已有视频的跳过），
   * 按 Seedance 官方公式预填提示词（含音色/纯净约束）并连线；
   * opts.run 时立即整批运行。返回新建视频节点 id。
   */
  deriveShotVideoNodes: (
    storyboardId: string,
    opts?: { videoModel?: string; run?: boolean; indices?: number[] },
  ) => Promise<string[]>
  exportProject: () => string
  importProject: (raw: string) => void
  resetProject: () => void
  resetCredits: () => void
  /** 各视频供应商密钥就绪状态（模型选择器显示可用/需配置；不持久化） */
  videoReadiness: VideoReadiness | null
  loadVideoReadiness: () => Promise<void>
  // ---- 多项目管理（项目档案在 IndexedDB projects 库） ----
  /** 当前画布归属的项目 id；null = 尚未建档（首次变更时自动建档） */
  currentProjectId: string | null
  /** 立即快照当前画布进项目档案（画布变更 2s 防抖自动调用） */
  snapshotCurrentProject: () => Promise<void>
  /**
   * Studio 挂载时从项目档案恢复完整画布：
   * localStorage 剥离了 data: 媒体，档案（IndexedDB）是完整版——刷新后图片由此回来。
   */
  restoreCurrentProject: () => Promise<void>
  /** 载入项目档案替换画布；返回是否成功 */
  loadProject: (id: string) => Promise<boolean>
  /** 新建空项目并切换过去，返回新项目 id */
  createProject: () => Promise<string>
  /** 项目被删除后的解绑（删的是当前项目时清空画布） */
  detachProject: (id: string) => void
}

function mutateNode(
  nodes: PineNode[],
  id: string,
  patch: Partial<PineNodeData>,
): PineNode[] {
  return nodes.map((n) =>
    n.id === id ? { ...n, data: { ...n.data, ...patch } } : n,
  )
}

function getUpstreamTextOutput(
  nodes: PineNode[],
  edges: PineEdge[],
  nodeId: string,
): string | null {
  for (const e of edges) {
    if (e.target !== nodeId) continue
    const source = nodes.find((n) => n.id === e.source)
    if (!source) continue
    const out = activeContent(source.data)
    if (out && !isImageContent(out)) return out
  }
  return null
}

function collectUpstreamImages(
  nodes: PineNode[],
  edges: PineEdge[],
  nodeId: string,
): string[] {
  const imgs: string[] = []
  for (const e of edges) {
    if (e.target !== nodeId) continue
    const src = nodes.find((n) => n.id === e.source)
    if (!src) continue
    for (const v of src.data.versions) {
      if (isImageContent(v.content)) imgs.push(v.content as string)
    }
  }
  return imgs.slice(0, 6)
}

function positionFor(fallbackX: number, position?: Position): Position {
  return (
    position ?? {
      x: fallbackX + Math.random() * 80,
      y: 360 + Math.random() * 80,
    }
  )
}

function newVersion(content: string | null, label?: string, error?: string | null): NodeVersion {
  return {
    id: crypto.randomUUID(),
    content,
    ...(label ? { label } : {}),
    ...(error ? { error } : {}),
    createdAt: Date.now(),
  }
}

/**
 * 项目档案的节点整理：与 localStorage 的 stripHeavyOutputs 不同，
 * IndexedDB 配额以 GB 计，**媒体完整保留**（剥离媒体曾导致重开项目分镜图全丢）；
 * 只做状态归位：running→idle、清除选中/拖拽标记。
 */
/**
 * 入档媒体合并：画布节点处于剥离/恢复失败的空壳态（无 data: 媒体版本、无全能参考
 * 素材）而档案同 id 节点有 → 沿用档案的媒体版本，档案只增不减。
 * 背景：防污染分支只拦「整图无媒体」；档案恢复失败后用户新生成任意一张图，
 * canvasHasMedia 即为 true，快照会用残缺画布覆盖完整档案——真实丢档路径。
 */
function mergeArchiveMedia(cur: PineNode[], prevNodes: PineNode[]): PineNode[] {
  if (!prevNodes.length) return cur
  const prevById = new Map(prevNodes.map((n) => [n.id, n]))
  return cur.map((n) => {
    const old = prevById.get(n.id)
    if (!old?.data) return n
    let data = n.data
    const curHasMedia = data.versions.some((v) => v.content?.startsWith('data:'))
    const oldHasMedia = old.data.versions?.some((v) => v.content?.startsWith('data:'))
    if (!curHasMedia && oldHasMedia) {
      data = {
        ...data,
        versions: old.data.versions,
        activeVersion: Math.max(
          0,
          Math.min(old.data.activeVersion ?? 0, old.data.versions.length - 1),
        ),
        status: old.data.status === 'running' ? 'done' : old.data.status,
      }
    }
    // 全能参考素材同被 localStorage 剥离，一并回填
    const p = data.params
    const op = old.data.params
    const omniPatch: Partial<NodeParams> = {}
    if (!p.omniRefs?.length && op?.omniRefs?.length) omniPatch.omniRefs = op.omniRefs
    if (!p.omniVideos?.length && op?.omniVideos?.length) omniPatch.omniVideos = op.omniVideos
    if (!p.omniAudios?.length && op?.omniAudios?.length) omniPatch.omniAudios = op.omniAudios
    if (Object.keys(omniPatch).length) data = { ...data, params: { ...p, ...omniPatch } }
    return data === n.data ? n : { ...n, data }
  })
}

function sanitizeForArchive(node: PineNode): PineNode {
  return {
    ...node,
    selected: false,
    dragging: false,
    data:
      node.data.status === 'running'
        ? { ...node.data, status: 'idle' as const, error: undefined, progressNote: undefined }
        : node.data,
  }
}

/**
 * 档案图恢复前的整形：档案可能存有旧 schema/损坏节点（data.versions 缺失等），
 * 直接 set 进画布会在渲染期抛 TypeError → 整页白屏且刷新复现（档案每次挂载重放）。
 * 与 importProject 同套校验：过滤坏节点 → 补齐必备字段 → migrateGraph → 掐悬空边。
 */
function sanitizeArchiveGraph(
  rawNodes: unknown[],
  rawEdges: unknown[],
): { nodes: PineNode[]; edges: PineEdge[] } {
  const sane = (rawNodes as PineNode[])
    .filter(
      (n) =>
        n &&
        typeof n.id === 'string' &&
        n.position &&
        Number.isFinite(n.position.x) &&
        Number.isFinite(n.position.y) &&
        n.data &&
        typeof n.data.kind === 'string',
    )
    .map((n) => ({
      ...n,
      selected: false,
      dragging: false,
      data: {
        ...n.data,
        versions: Array.isArray(n.data.versions) ? n.data.versions : [],
        activeVersion:
          typeof n.data.activeVersion === 'number' ? n.data.activeVersion : 0,
        ...(n.data.status === 'running'
          ? { status: 'idle' as const, progressNote: undefined }
          : {}),
      },
    }))
  const edges = (Array.isArray(rawEdges) ? (rawEdges as PineEdge[]) : [])
    .filter((e) => e && typeof e.source === 'string' && typeof e.target === 'string')
    .map(migrateLegacyEdge)
  const migrated = migrateGraph(sane, edges)
  const ids = new Set(migrated.nodes.map((n) => n.id))
  migrated.edges = migrated.edges.filter((e) => ids.has(e.source) && ids.has(e.target))
  return migrated
}

/** 恢复档案期间挂起自动快照，防止把 localStorage 剥离版（无图）写回档案 */
let restoringProject = false

/** 项目缩略图：首张图缩放到 ≤320px 宽 jpeg（IndexedDB 里不存原图大小的缩略） */
async function makeThumb(dataUrl: string): Promise<string | null> {
  try {
    const img = new Image()
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('thumb'))
      img.src = dataUrl
    })
    const scale = Math.min(1, 320 / img.width)
    const w = Math.max(1, Math.round(img.width * scale))
    const h = Math.max(1, Math.round(img.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d')?.drawImage(img, 0, 0, w, h)
    return canvas.toDataURL('image/jpeg', 0.72)
  } catch {
    return null
  }
}

// ---------------- 视频生成轮询（异步任务：创建 → 轮询 → 取件代理） ----------------

const VIDEO_POLL_INTERVAL_MS = 8_000

/** 轮询超时按档位自适应：1080p/4k 或 >10s 的重活给 20 分钟，其余 10 分钟 */
function videoPollTimeoutMs(req: { resolution?: string; duration?: number }): number {
  const heavy =
    req.resolution === '1080p' || req.resolution === '4k' || (req.duration ?? 5) > 10
  return (heavy ? 20 : 10) * 60_000
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('视频数据读取失败'))
    reader.readAsDataURL(blob)
  })
}

/**
 * 轮询任务直至完成/失败/超时。
 * 超时不丢任务：方舟侧任务默认 48h 过期、任务 ID 保留 7 天，返回带 taskRef 的
 * error 版本，供「继续查询」续查取件（不重新下单、不重复扣积分）。
 * 供应商明确判失败的任务不带 taskRef（续查无意义）。
 */
async function pollVideoTask(
  provider: string,
  taskId: string,
  timeoutMs: number,
  onTick?: (elapsedMs: number) => void,
): Promise<NodeVersion> {
  const startedAt = Date.now()
  const taskRef = { provider, taskId }
  try {
    let misses = 0
    for (;;) {
      await sleep(VIDEO_POLL_INTERVAL_MS)
      const elapsed = Date.now() - startedAt
      onTick?.(elapsed)
      if (elapsed > timeoutMs) {
        const mins = Math.round(timeoutMs / 60_000)
        return {
          ...newVersion(
            null,
            undefined,
            `已等待 ${mins} 分钟仍未完成：任务仍在供应商侧运行，可点「继续查询」接着取件`,
          ),
          taskRef,
        }
      }
      let st: Awaited<ReturnType<typeof queryVideoTask>>
      try {
        st = await queryVideoTask({ provider, taskId })
        misses = 0
      } catch (err) {
        // 轮询期的瞬时网络故障容忍 3 次
        if (++misses >= 3) throw err
        continue
      }
      if (st.status === 'done') break
      if (st.status === 'error') {
        // 任务确实失败：不留 taskRef（续查只会得到同样的失败）
        return newVersion(null, undefined, st.error ?? '生成失败')
      }
    }
    const blob = await fetchVideoFile({ provider, taskId })
    return newVersion(await blobToDataUrl(blob))
  } catch (err) {
    // 查询/取件通道异常：任务本身可能还活着，留 taskRef 允许续查
    return {
      ...newVersion(null, undefined, err instanceof Error ? err.message : String(err)),
      taskRef,
    }
  }
}

/**
 * 视频「下单阶段」并发闸（只限创建任务，不限轮询）：批量成片时 30 个节点同时下单
 * 会把方舟瞬时并发打满、部分请求 60s 超时报错（任务其实已创建）。限制同时在飞的
 * 下单请求数，拿到 taskId 立刻放行进入轮询——轮询是长任务，不占闸，30 个可同时轮。
 */
function makeGate(max: number) {
  let active = 0
  const queue: (() => void)[] = []
  return async function run<T>(fn: () => Promise<T>): Promise<T> {
    if (active >= max) await new Promise<void>((r) => queue.push(r))
    active++
    try {
      return await fn()
    } finally {
      active--
      queue.shift()?.()
    }
  }
}
const videoCreateGate = makeGate(4)

/** 单条视频任务全流程；失败返回带 error 的空版本（多倍数时部分成功可用） */
async function runOneVideoTask(
  provider: string,
  req: Parameters<typeof createVideoTask>[0],
  onTick?: (elapsedMs: number) => void,
  label?: string,
): Promise<NodeVersion> {
  try {
    // 下单限流：拿到 taskId 后立刻出闸，轮询不占并发
    const { taskId } = await videoCreateGate(() => createVideoTask(req))
    if (label) rememberTaskLabel(taskId, label, Date.now())
    return await pollVideoTask(provider, taskId, videoPollTimeoutMs(req), onTick)
  } catch (err) {
    // 创建任务即失败：无任务可续查。下单超时特判——任务可能已在云端创建，引导用户去找回
    const msg = err instanceof Error ? err.message : String(err)
    const friendly = /未响应|超时|timeout|abort/i.test(msg)
      ? '下单超时：任务可能已在云端创建，请用「云端任务找回」取回，避免重复生成扣费'
      : msg
    return newVersion(null, undefined, friendly)
  }
}

/**
 * 持久化前的瘦身：localStorage 单 origin 上限 ~5MB，base64 图片不落盘。
 * 关键（审计修复）：图片被剥离的节点 status 归位 idle、清空错误——
 * 刷新后用户看到「待运行」，而不是残缺的「完成」或误报的「生成失败」。
 */
function stripHeavyOutputs(node: PineNode): PineNode {
  const data = node.data
  // params 里的媒体（全能参考素材等 data: URL，合计可达 64MB）同样不落盘——
  // 否则每次 persist 都 QuotaExceeded，异常穿透所有 store action
  const params = data.params
  const paramsHeavy =
    !!params &&
    (params.omniRefs?.length || params.omniVideos?.length || params.omniAudios?.length)
  const strippedParams = paramsHeavy
    ? { ...params, omniRefs: undefined, omniVideos: undefined, omniAudios: undefined }
    : params
  // 图片/视频等 data: 媒体一律不落盘（视频体积更大）
  const hasHeavy = data.versions.some((v) => !!v.content && v.content.startsWith('data:'))
  if (!hasHeavy) {
    if (data.status === 'running' || paramsHeavy) {
      return {
        ...node,
        data: {
          ...data,
          params: strippedParams,
          ...(data.status === 'running'
            ? { status: 'idle' as const, progressNote: undefined }
            : {}),
        },
      }
    }
    return node
  }
  return {
    ...node,
    data: {
      ...data,
      params: strippedParams,
      versions: [],
      activeVersion: 0,
      status: 'idle',
      error: undefined,
      progressNote: undefined,
    },
  }
}

const HISTORY_LIMIT = 50

/** 单节点保留的视频版本上限：base64 视频单条可达数十 MB，无限追加会耗尽内存与
 * 档案配额（连续生成/取件后整页 OOM 白屏的根源之一）。 */
const MAX_VIDEO_VERSIONS = 4

/**
 * 视频版本裁剪：超限时从最旧的「带 data: 媒体」版本开始丢弃（成功产出已入
 * 生成历史，可从历史面板找回）；仅含 taskRef 的失败版本保留（续查凭据、体积小）。
 * activeVersion 随删除平移，保持指向同一条版本。
 */
function capVideoVersions(
  versions: NodeVersion[],
  activeVersion: number,
): { versions: NodeVersion[]; activeVersion: number } {
  const isHeavy = (v: NodeVersion) => !!v.content && v.content.startsWith('data:')
  let heavy = versions.filter(isHeavy).length
  if (heavy <= MAX_VIDEO_VERSIONS) return { versions, activeVersion }
  const next: NodeVersion[] = []
  let active = activeVersion
  versions.forEach((v, i) => {
    if (heavy > MAX_VIDEO_VERSIONS && isHeavy(v)) {
      heavy--
      if (i <= activeVersion) active -= 1
      return
    }
    next.push(v)
  })
  return {
    versions: next,
    activeVersion: Math.max(0, Math.min(active, next.length - 1)),
  }
}

/**
 * 撤销/重做只回退画布结构（节点增删、连线、导入/新建），不回退生成结果：
 * 恢复快照时按节点 id 把"当前"的 versions / status 等运行产物合并回去，
 * 避免一次 Cmd+Z 把用户等了很久的生成图也撤掉。
 * 快照里的节点若已不在当前画布（删除时正在运行），把遗留 running 归位 idle，
 * 否则恢复出来的节点永远卡在「生成中」。
 */
function withCurrentOutputs(
  snapNodes: PineNode[],
  curNodes: PineNode[],
): PineNode[] {
  const cur = new Map(curNodes.map((n) => [n.id, n]))
  return snapNodes.map((n) => {
    const c = cur.get(n.id)
    if (!c) {
      return n.data.status === 'running'
        ? { ...n, data: { ...n.data, status: 'idle' as const } }
        : n
    }
    return {
      ...n,
      data: {
        ...n.data,
        versions: c.data.versions,
        activeVersion: c.data.activeVersion,
        shots: c.data.shots,
        status: c.data.status,
        error: c.data.error,
      },
    }
  })
}

/**
 * 按 edges 做 Kahn 拓扑分层：同一层内节点彼此无依赖、可并发运行；
 * 后一层节点的所有上游都在前面的层里已运行完，从而能安全消费上游产出。
 * 环路兜底：未被覆盖的节点作为最后一层强制返回，避免漏跑。
 */
function topoLayers(nodes: PineNode[], edges: PineEdge[]): string[][] {
  const ids = nodes.map((n) => n.id)
  const idSet = new Set(ids)
  const indeg = new Map<string, number>()
  const adj = new Map<string, string[]>()
  for (const id of ids) {
    indeg.set(id, 0)
    adj.set(id, [])
  }
  for (const e of edges) {
    if (!idSet.has(e.source) || !idSet.has(e.target)) continue
    adj.get(e.source)!.push(e.target)
    indeg.set(e.target, (indeg.get(e.target) ?? 0) + 1)
  }

  const layers: string[][] = []
  const seen = new Set<string>()
  let frontier = ids.filter((id) => (indeg.get(id) ?? 0) === 0)

  while (frontier.length) {
    layers.push(frontier)
    for (const id of frontier) seen.add(id)
    const next: string[] = []
    for (const id of frontier) {
      for (const t of adj.get(id) ?? []) {
        indeg.set(t, (indeg.get(t) ?? 0) - 1)
        if ((indeg.get(t) ?? 0) === 0 && !seen.has(t)) next.push(t)
      }
    }
    frontier = next
  }

  const leftover = ids.filter((id) => !seen.has(id))
  if (leftover.length) layers.push(leftover)
  return layers
}

/** 导入/重置/换模板时递增：在飞的旧运行结果按代际校验后丢弃，不写进新画布 */
let generation = 0

export const useStudioStore = create<StudioState>()(
  persist<StudioState>(
    (set, get) => {
      // 在结构性修改（增删节点/连线/导入/新建）前调用，记一笔撤销历史。
      // 同一手势常触发多个回调（如删节点连带删边、拖线建节点随即连线），
      // 150ms 内的连续 commit 合并成一步，撤销时整个手势一次回退。
      let lastCommitAt = 0
      const commit = () => {
        const now = Date.now()
        if (now - lastCommitAt < 150) return
        lastCommitAt = now
        const { nodes, edges, past } = get()
        set({
          past: [...past.slice(-(HISTORY_LIMIT - 1)), { nodes, edges }],
          future: [],
        })
      }

      const pushNode = (node: PineNode): string => {
        commit()
        set((s) => ({
          nodes: [...s.nodes, node],
          selectedNodeId: node.id,
        }))
        return node.id
      }

      /** 代际安全写回：importProject/resetProject/applyTemplate 之后丢弃过期结果 */
      const safeSet = (g: number, fn: (s: StudioState) => Partial<StudioState>) => {
        if (g !== generation) return
        set(fn)
      }

      return {
        nodes: [],
        edges: [],
        selectedNodeId: null,
        projectName: '未命名工程',
        past: [],
        future: [],
        credits: INITIAL_CREDITS,
        pipelineRunning: false,
        fitViewTick: 0,
        focusRequest: null,

        onNodesChange: (changes) => {
          if (changes.some((c) => c.type === 'remove')) commit()
          set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) as PineNode[] }))
        },

        onEdgesChange: (changes) => {
          if (changes.some((c) => c.type === 'remove')) commit()
          set((s) => ({ edges: applyEdgeChanges(changes, s.edges) }))
        },

        onConnect: (conn) => {
          // 自连保护
          if (conn.source === conn.target) return
          commit()
          set((s) => ({ edges: addEdge(conn, s.edges) }))
        },

        selectNode: (id) => set({ selectedNodeId: id }),

        // 面板/搜索点选：同步 ReactFlow selected 标记并请求画布居中该节点
        focusNode: (id) =>
          set((s) => ({
            selectedNodeId: id,
            nodes: s.nodes.map((n) => ({ ...n, selected: n.id === id })),
            focusRequest: { id, tick: (s.focusRequest?.tick ?? 0) + 1 },
          })),

        setProjectName: (name) => set({ projectName: name }),

        requestFitView: () => set((s) => ({ fitViewTick: s.fitViewTick + 1 })),

        // 一键整理画布：Kahn 拓扑层 → 一层一列（上游在左），层内按原 y 序纵排。
        // 高度优先用 React Flow v12 回写的 measured 实测值，未测量时按 kind 估算
        autoLayout: () => {
          const { nodes, edges } = get()
          if (!nodes.length) return
          commit()
          const layers = topoLayers(nodes, edges)
          const byId = new Map(nodes.map((n) => [n.id, n]))
          const COL_W = 560
          const GAP_Y = 64
          const estimateH = (n: PineNode) => {
            const measured = (n as { measured?: { height?: number } }).measured?.height
            if (measured) return measured
            if (n.data.kind === 'video') return 320
            if (n.data.kind === 'text') return 280
            return 380
          }
          // —— 语义列修正：纯拓扑分层会让「没挂参考连线的分镜图」与资产节点同层混排
          //（资产=分镜下一层；挂了资产参考的分镜图才被推到再下一层），用户找不到
          // 对应镜头。这里把实体参考节点归拢成一列、全部分镜图统一排在其右一列，
          // 再沿拓扑序把下游（镜头视频等）只增不减地往右推，保持依赖仍是左→右。
          const layerOf = new Map<string, number>()
          layers.forEach((layer, li) => layer.forEach((nid) => layerOf.set(nid, li)))
          const isEntityNode = (n?: PineNode) =>
            !!n && n.data.kind === 'image' && isEntityPreset(n.data.preset)
          const isShotNode = (n?: PineNode) =>
            !!n && n.data.kind === 'image' && n.data.preset === 'shot'
          const entityIds = nodes.filter((n) => isEntityNode(n)).map((n) => n.id)
          const shotIds = nodes.filter((n) => isShotNode(n)).map((n) => n.id)
          if (shotIds.length && entityIds.length) {
            const entityCol = Math.max(...entityIds.map((nid) => layerOf.get(nid) ?? 0))
            entityIds.forEach((nid) => layerOf.set(nid, entityCol))
            const shotCol = Math.max(
              entityCol + 1,
              ...shotIds.map((nid) => layerOf.get(nid) ?? 0),
            )
            shotIds.forEach((nid) => layerOf.set(nid, shotCol))
            const adj = new Map<string, string[]>()
            for (const e of edges) {
              if (!byId.has(e.source) || !byId.has(e.target)) continue
              adj.set(e.source, [...(adj.get(e.source) ?? []), e.target])
            }
            for (const nid of layers.flat()) {
              const base = layerOf.get(nid) ?? 0
              for (const t of adj.get(nid) ?? []) {
                layerOf.set(t, Math.max(layerOf.get(t) ?? 0, base + 1))
              }
            }
          }
          // 重组列（压掉修正后可能出现的空列），层内排序：分镜图按镜头号，其余按原 y
          const colValues = [...new Set([...layerOf.values()])].sort((a, b) => a - b)
          const colIndex = new Map(colValues.map((v, i) => [v, i]))
          const columns: string[][] = colValues.map(() => [])
          for (const n of nodes) {
            columns[colIndex.get(layerOf.get(n.id) ?? 0) ?? 0].push(n.id)
          }
          const sortKey = (nid: string) => {
            const n = byId.get(nid)
            if (!n) return Number.MAX_SAFE_INTEGER
            if (isShotNode(n) && n.data.params.shotIndex != null)
              return n.data.params.shotIndex
            return n.position.y
          }
          const placed = new Map<string, Position>()
          columns.forEach((column, li) => {
            let y = 80
            const ordered = [...column].sort((a, b) => sortKey(a) - sortKey(b))
            for (const nid of ordered) {
              const n = byId.get(nid)
              if (!n) continue
              placed.set(nid, { x: 80 + li * COL_W, y })
              y += estimateH(n) + GAP_Y
            }
          })
          set((s) => ({
            nodes: s.nodes.map((n) =>
              placed.has(n.id) ? { ...n, position: placed.get(n.id)! } : n,
            ),
          }))
          get().requestFitView()
        },

        // 模板 = 起一个新工作流：清空并替换画布；commit 在前，⌘Z 一步可撤回原画布
        applyTemplate: (id) => {
          const tpl = buildTemplate(id)
          commit()
          generation++
          set({
            nodes: tpl.nodes,
            edges: tpl.edges,
            selectedNodeId: tpl.nodes[0]?.id ?? null,
          })
          get().requestFitView()
          return tpl.nodes.map((n) => n.id)
        },

        addNode: (kind, preset, position, init) =>
          pushNode(buildNode(kind, preset, positionFor(kind === 'text' ? 120 : 600, position), init)),

        addAssetNode: (dataUrl, position) => {
          const node = buildNode('asset', null, positionFor(320, position))
          // 版本内容即素材本体，节点天然处于 done 态，可直接被下游引用
          node.data.versions = [newVersion(dataUrl)]
          node.data.status = 'done'
          return pushNode(node)
        },

        addReferenceNode: (dataUrl, kind, name, position) => {
          const preset =
            kind === 'scene' ? 'scene-grid' : kind === 'prop' ? 'prop-triview' : 'char-triview'
          // image + 实体 preset + 有图版本 → deriveShotImageNodes 的 shot-compose 会按 title 精确挂载
          const node = buildNode('image', preset, positionFor(320, position), {
            title: name.slice(0, 24) || '参考',
          })
          node.data.versions = [newVersion(dataUrl)]
          node.data.status = 'done'
          return pushNode(node)
        },

        addVideoNode: (dataUrl, position) => {
          const node = buildNode('video', null, positionFor(600, position))
          node.data.versions = [newVersion(dataUrl)]
          node.data.status = 'done'
          return pushNode(node)
        },

        // 剪辑/增强确认后：派生下游视频节点并连线（trim=软剪辑区间；enhance=增强配置占位节点）
        deriveVideoNode: (sourceId, opts) => {
          const src = get().nodes.find((n) => n.id === sourceId)
          if (!src) return null
          const node = buildNode(
            'video',
            null,
            { x: src.position.x + 560, y: src.position.y },
            { title: opts.title, params: { ...src.data.params, ...(opts.trim ? { trim: opts.trim } : {}), ...(opts.enhance ? { enhance: opts.enhance } : {}), compliance: undefined } },
          )
          if (opts.trim) {
            // 软剪辑：复用源视频内容，播放范围 clamp 到 trim
            node.data.versions = src.data.versions
            node.data.activeVersion = src.data.activeVersion
            node.data.status = 'done'
          }
          const id = pushNode(node)
          get().onConnect({ source: sourceId, sourceHandle: null, target: id, targetHandle: null })
          get().focusNode(id)
          return id
        },

        setPreset: (id, preset) => {
          const meta = presetMeta(preset)
          if (!meta) return
          set((s) => ({
            nodes: s.nodes.map((n) =>
              n.id === id
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      preset,
                      // 切预设时合并默认参数（保留用户已设置的重叠字段）
                      params: { ...meta.defaultParams, ...n.data.params },
                    },
                  }
                : n,
            ),
          }))
        },

        setPrompt: (id, prompt) =>
          set((s) => ({ nodes: mutateNode(s.nodes, id, { prompt }) })),

        updateNodeParams: (id, patch) =>
          set((s) => ({
            nodes: s.nodes.map((n) =>
              n.id === id
                ? { ...n, data: { ...n.data, params: { ...n.data.params, ...patch } } }
                : n,
            ),
          })),

        updateNodeTitle: (id, title) =>
          set((s) => ({ nodes: mutateNode(s.nodes, id, { title }) })),

        updateActiveContent: (id, content) =>
          set((s) => ({
            nodes: s.nodes.map((n) => {
              if (n.id !== id) return n
              const versions = n.data.versions.length
                ? n.data.versions.map((v, i) =>
                    i === n.data.activeVersion ? { ...v, content } : v,
                  )
                : [newVersion(content)]
              return { ...n, data: { ...n.data, versions, status: 'done' as const } }
            }),
          })),

        addImageVersion: (id, dataUrl, label) => {
          commit()
          set((s) => ({
            nodes: s.nodes.map((n) => {
              if (n.id !== id) return n
              const versions = [...n.data.versions, newVersion(dataUrl, label)]
              return {
                ...n,
                data: {
                  ...n.data,
                  versions,
                  activeVersion: versions.length - 1,
                  status: 'done' as const,
                },
              }
            }),
          }))
        },

        updateShot: (id, shotIndex, patch) =>
          set((s) => ({
            nodes: s.nodes.map((n) => {
              if (n.id !== id || !n.data.shots?.length) return n
              const shots = n.data.shots.map((sh, i) =>
                i === shotIndex ? { ...sh, ...patch } : sh,
              )
              // 版本拼接文本与结构化 shots 保持同步（下游文本消费/展示用同一格式）
              const text = shots
                .map((sh, i) => `#${i + 1} ${sh.title}\n${sh.description}`)
                .join('\n\n')
              const versions = n.data.versions.length
                ? n.data.versions.map((v, i) =>
                    i === n.data.activeVersion ? { ...v, content: text } : v,
                  )
                : [newVersion(text)]
              return { ...n, data: { ...n.data, shots, versions } }
            }),
          })),

        replaceShotsFromText: (id, text) => {
          commit()
          set((s) => ({
            nodes: s.nodes.map((n) => {
              if (n.id !== id || n.data.preset !== 'storyboard') return n
              const prev = n.data.shots ?? []
              // 按空行分段；每段首行为标题（去 #n 前缀），其余为描述
              const shots: ShotItem[] = text
                .split(/\n{2,}/)
                .map((b) => b.trim())
                .filter(Boolean)
                .map((block, i) => {
                  const nl = block.indexOf('\n')
                  const rawTitle = (nl === -1 ? block : block.slice(0, nl)).trim()
                  const description = nl === -1 ? '' : block.slice(nl + 1).trim()
                  return {
                    id: prev[i]?.id ?? `shot-${crypto.randomUUID()}`,
                    title: rawTitle.replace(/^#\s*\d+\s*/, '').trim() || `镜头 ${i + 1}`,
                    description,
                  }
                })
              const vtext = shots
                .map((sh, i) => `#${i + 1} ${sh.title}\n${sh.description}`)
                .join('\n\n')
              const versions = n.data.versions.length
                ? n.data.versions.map((v, i) =>
                    i === n.data.activeVersion ? { ...v, content: vtext } : v,
                  )
                : [newVersion(vtext)]
              return { ...n, data: { ...n.data, shots, versions } }
            }),
          }))
        },

        setActiveVersion: (id, index) =>
          set((s) => ({
            nodes: s.nodes.map((n) =>
              n.id === id && index >= 0 && index < n.data.versions.length
                ? { ...n, data: { ...n.data, activeVersion: index } }
                : n,
            ),
          })),

        setPin: (id, pin) =>
          set((s) => ({ nodes: mutateNode(s.nodes, id, { pin: pin ?? undefined }) })),

        // 审计修复：错误必须可被用户清除；出错节点回到待运行
        clearNodeError: (id) =>
          set((s) => ({
            nodes: s.nodes.map((n) =>
              n.id === id
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      error: undefined,
                      status: n.data.status === 'error' ? 'idle' : n.data.status,
                    },
                  }
                : n,
            ),
          })),

        duplicateNode: (id) => {
          const src = get().nodes.find((n) => n.id === id)
          if (!src) return null
          const copy = buildNode(
            src.data.kind,
            src.data.preset,
            { x: src.position.x + 72, y: src.position.y + 72 },
            {
              title: `${src.data.title} 副本`,
              prompt: src.data.prompt,
              params: { ...src.data.params },
            },
          )
          // 所有类型都保留产出（版本引用拷贝，无体积负担）：复制出的剧本/分镜/
          // 图片不再是空白节点（用户实测反馈）；running 归位 idle
          copy.data.versions = src.data.versions
          copy.data.activeVersion = src.data.activeVersion
          copy.data.status = src.data.status === 'running' ? 'idle' : src.data.status
          if (src.data.shots) copy.data.shots = src.data.shots
          // 副本接管 React Flow 选中态：原节点选中时 z=1000，若不转移选中，
          // 副本（z=0）会被原节点完全盖住，看起来像「没复制出来」
          copy.selected = true
          commit()
          set((s) => ({
            nodes: [...s.nodes.map((n) => ({ ...n, selected: false })), copy],
            selectedNodeId: copy.id,
          }))
          return copy.id
        },

        deleteNode: (id) => {
          commit()
          set((s) => ({
            nodes: s.nodes.filter((n) => n.id !== id),
            edges: s.edges.filter((e) => e.source !== id && e.target !== id),
            selectedNodeId: s.selectedNodeId === id ? null : s.selectedNodeId,
          }))
        },

        // ⌘C：选中节点（含两端都被选中的内部边）入内存剪贴板
        copySelection: () => {
          const { nodes, edges } = get()
          const picked = nodes.filter((n) => n.selected)
          if (!picked.length) return
          const ids = new Set(picked.map((n) => n.id))
          clipboard = {
            nodes: picked,
            edges: edges.filter((e) => ids.has(e.source) && ids.has(e.target)),
          }
        },

        // ⌘V：新 id、偏移落点、一步 commit 可整体撤销
        pasteClipboard: (position) => {
          if (!clipboard || !clipboard.nodes.length) return []
          const idMap = new Map<string, string>()
          const minX = Math.min(...clipboard.nodes.map((n) => n.position.x))
          const minY = Math.min(...clipboard.nodes.map((n) => n.position.y))
          const base = position ?? { x: minX + 64, y: minY + 64 }
          const nodes = clipboard.nodes.map((n) => {
            const id = `${n.data.kind}-${crypto.randomUUID()}`
            idMap.set(n.id, id)
            return {
              ...n,
              id,
              selected: true,
              position: {
                x: base.x + (n.position.x - minX),
                y: base.y + (n.position.y - minY),
              },
              // 与 duplicateNode 一致：粘贴同样保留产出与镜头表（引用拷贝），running 归位
              data: {
                ...n.data,
                status: n.data.status === 'running' ? ('idle' as const) : n.data.status,
                error: undefined,
              },
            }
          })
          const edges = clipboard.edges.map((e) => ({
            ...e,
            id: `e-${idMap.get(e.source)}-${idMap.get(e.target)}`,
            source: idMap.get(e.source)!,
            target: idMap.get(e.target)!,
          }))
          commit()
          set((s) => ({
            nodes: [...s.nodes.map((n) => ({ ...n, selected: false })), ...nodes],
            edges: [...s.edges, ...edges],
            selectedNodeId: nodes[0]?.id ?? null,
          }))
          return nodes.map((n) => n.id)
        },

        undo: () => {
          const { past, future, nodes, edges } = get()
          const prev = past[past.length - 1]
          if (!prev) return
          set({
            past: past.slice(0, -1),
            future: [...future, { nodes, edges }],
            nodes: withCurrentOutputs(prev.nodes, nodes),
            edges: prev.edges,
          })
        },

        redo: () => {
          const { past, future, nodes, edges } = get()
          const next = future[future.length - 1]
          if (!next) return
          set({
            future: future.slice(0, -1),
            past: [...past, { nodes, edges }],
            nodes: withCurrentOutputs(next.nodes, nodes),
            edges: next.edges,
          })
        },

        runNode: async (id) => {
          const state = get()
          const node = state.nodes.find((n) => n.id === id)
          // 重入守卫（审计修复）：running 中的节点不可再次触发，避免并发重复付费请求
          if (!node || node.data.status === 'running') return

          // 上传素材节点不调模型，内容即本体
          if (node.data.kind === 'asset') return

          const g = generation
          const { kind, preset, params } = node.data
          const cost = estimateCost(kind, preset, params)

          set((s) => ({
            nodes: mutateNode(s.nodes, id, { status: 'running', error: undefined }),
            credits: Math.max(0, s.credits - cost),
          }))

          try {
            if (kind === 'text') {
              if (preset === 'storyboard') {
                const upstream = getUpstreamTextOutput(state.nodes, state.edges, id)
                const screenplay = node.data.prompt.trim() || upstream || ''
                if (!screenplay)
                  throw new Error('缺少剧本：请粘贴或从上游「剧本」节点连线')
                const res = await generateStoryboard({
                  screenplay,
                  splitter:
                    params.splitMode === 'manual' && params.splitter
                      ? params.splitter
                      : undefined,
                  model: resolveApiModel(TEXT_MODELS, params.textModel),
                })
                const shotsText = res.shots
                  .map((s, i) => `#${i + 1} ${s.title}\n${s.description}`)
                  .join('\n\n')
                const sbVersions = [newVersion(shotsText)]
                safeSet(g, (s) => ({
                  nodes: mutateNode(s.nodes, id, {
                    status: 'done',
                    shots: res.shots,
                    versions: sbVersions,
                    activeVersion: 0,
                  }),
                }))
                recordHistory(id, 'text', preset, screenplay, sbVersions)
              } else {
                const upstream = getUpstreamTextOutput(state.nodes, state.edges, id)
                const brief = node.data.prompt.trim() || upstream || ''
                if (!brief)
                  throw new Error('缺少提示词：请在下方输入，或从上游节点连线')
                const res = await generateScript({
                  brief,
                  tone: params.tone,
                  length: params.length,
                  preset: preset === 'ad-copy' ? 'ad-copy' : preset === 'free' ? 'free' : 'script',
                  model: resolveApiModel(TEXT_MODELS, params.textModel),
                })
                const txtVersions = [newVersion(res.script)]
                safeSet(g, (s) => ({
                  nodes: mutateNode(s.nodes, id, {
                    status: 'done',
                    versions: txtVersions,
                    activeVersion: 0,
                  }),
                }))
                recordHistory(id, 'text', preset, brief, txtVersions)
              }
            } else if (kind === 'image') {
              const upstreamText = getUpstreamTextOutput(state.nodes, state.edges, id)
              const refImgs = collectUpstreamImages(state.nodes, state.edges, id)

              if (isEntityPreset(preset)) {
                // 实体参考两段式：先出单张主视图，再以主视图为参考合成一张
                // 多视角融合图（16:9）——而不是一次并发生成多张离散视角图
                const desc = node.data.prompt.trim()
                if (!desc) throw new Error('请先填写描述')
                const stages = entityStagePrompts(preset, desc)
                const imageModel = resolveApiModel(IMAGE_MODELS, params.imageModel)
                const main = await generateImage({
                  prompt: stages.main,
                  referenceImages: refImgs.length ? refImgs : undefined,
                  aspectRatio: params.aspectRatio,
                  quality: params.quality,
                  model: imageModel,
                })
                const mainVersion = newVersion(main.image, ENTITY_STAGE_LABELS[0])
                // 主视图先落节点：融合阶段再失败也保得住第一张，且用户能看到进度
                safeSet(g, (s) => ({
                  nodes: mutateNode(s.nodes, id, {
                    versions: [mainVersion],
                    activeVersion: 0,
                  }),
                }))
                let fusionVersion: NodeVersion
                try {
                  const fusion = await generateImage({
                    prompt: stages.fusion,
                    referenceImages: [main.image, ...refImgs].slice(0, 6),
                    aspectRatio: '16:9',
                    quality: params.quality,
                    model: imageModel,
                  })
                  fusionVersion = newVersion(fusion.image, ENTITY_STAGE_LABELS[1])
                } catch (err) {
                  fusionVersion = newVersion(
                    null,
                    ENTITY_STAGE_LABELS[1],
                    err instanceof Error ? err.message : String(err),
                  )
                }
                const entityVersions = [mainVersion, fusionVersion]
                safeSet(g, (s) => ({
                  nodes: mutateNode(s.nodes, id, {
                    status: 'done',
                    versions: entityVersions,
                    // 融合图是下游一致性参考的默认版本；失败则回退主视图
                    activeVersion: fusionVersion.content ? 1 : 0,
                  }),
                }))
                recordHistory(id, 'image', preset, desc, entityVersions)
              } else {
                const fallback =
                  preset === 'shot'
                    ? shotDescriptionFor(state.nodes, state.edges, id, params.shotIndex)
                    : upstreamText || ''
                const basePrompt = node.data.prompt.trim() || fallback || ''
                if (!basePrompt)
                  throw new Error('缺少提示词：请在下方输入，或从上游节点连线')
                // Agent 直连创建的分镜图节点 prompt 为空、运行时才临时取镜：把实际
                // 采用的镜头描述回写节点，画布上可见可编辑（派生流程本就会回填，
                // 此前 Agent 路径的分镜图输入栏一直空白——用户实测反馈）
                if (preset === 'shot' && !node.data.prompt.trim() && fallback) {
                  safeSet(g, (s) => ({
                    nodes: mutateNode(s.nodes, id, { prompt: fallback }),
                  }))
                }
                // 摄影机预设注入（摄影机面板「保存」回填的镜头光学描述）
                const prompt = params.camera ? `${basePrompt}. ${params.camera}` : basePrompt
                const batch = params.batch ?? 1
                if (batch > 1) {
                  // 批量出图：同 prompt ×N 走 grid 端点，结果为版本层叠
                  const res = await generateImageGrid({
                    prompts: Array.from({ length: batch }, () => prompt),
                    referenceImages: refImgs.length ? refImgs : undefined,
                    aspectRatio: params.aspectRatio,
                    quality: params.quality,
                    model: resolveApiModel(IMAGE_MODELS, params.imageModel),
                  })
                  const batchVersions = res.images.map((img, i) =>
                    newVersion(img, undefined, res.errors?.[i] ?? null),
                  )
                  safeSet(g, (s) => ({
                    nodes: mutateNode(s.nodes, id, {
                      status: 'done',
                      versions: batchVersions,
                      activeVersion: Math.max(0, res.images.findIndex((x) => !!x)),
                    }),
                  }))
                  recordHistory(id, 'image', preset, prompt, batchVersions)
                } else {
                  // 编辑语义：节点已有图片产出（视频截帧/上一轮生成）时，把当前图
                  // 作为首个参考图传入——「在这张图基础上改」而非凭提示词重开盲盒；
                  // 产出以新版本追加（原图可回退），与高级面板 runImageEdit 一致
                  const selfImage = activeContent(node.data)
                  const editing = !!selfImage && isImageContent(selfImage)
                  const refs = editing
                    ? [selfImage as string, ...refImgs].slice(0, 6)
                    : refImgs
                  const res = await generateImage({
                    prompt,
                    referenceImages: refs.length ? refs : undefined,
                    aspectRatio: params.aspectRatio,
                    quality: params.quality,
                    model: resolveApiModel(IMAGE_MODELS, params.imageModel),
                  })
                  const created = newVersion(res.image, editing ? '编辑' : undefined)
                  safeSet(g, (s) => {
                    const cur = s.nodes.find((n) => n.id === id)
                    const versions = editing
                      ? [...(cur?.data.versions ?? []), created]
                      : [created]
                    return {
                      nodes: mutateNode(s.nodes, id, {
                        status: 'done',
                        versions,
                        activeVersion: versions.length - 1,
                      }),
                    }
                  })
                  recordHistory(id, 'image', preset, prompt, [created])
                }
              }
            } else if (kind === 'video') {
              const model =
                VIDEO_MODELS.find((m) => m.id === (params.videoModel ?? DEFAULT_VIDEO_MODEL)) ??
                VIDEO_MODELS[0]
              const videoMode = params.videoMode ?? 'frames'
              // 按 Seedance 官方公式组装最终提示词（用户手输优先，空则上游分镜；
              // 音色/纯净约束注入带幂等标记），组装结果回填节点——所见即所发
              const userPrompt = node.data.prompt.trim()
              const vctx = videoContextFor(state.nodes, state.edges, id)
              const purity = {
                noSubtitles: params.videoNoSubtitles,
                noBgm: params.videoNoBgm,
                noSfx: params.videoNoSfx,
              }
              const hasVoice = !!(vctx.voiceNarration || vctx.voiceCast)
              const generateAudio = resolveGenerateAudio(params.videoAudio, purity, hasVoice)
              // 全能参考模式：把上游角色/场景/道具实体图作 reference_image + Seedance @图片N 主体绑定
              // （首帧模式与多模态参考互斥，故仅 omni 生效；frames 默认走分镜图首帧继承一致性）
              const omni = videoMode === 'omni'
              const entityRefs = omni ? (vctx.entityRefs ?? []) : []
              const prompt = buildVideoPrompt({
                userPrompt,
                shotText: vctx.shotText,
                voiceNarration: vctx.voiceNarration,
                voiceCast: vctx.voiceCast,
                // 节点自身风格覆盖分镜全局风格
                ...(styleKeywords(params.videoStyle ?? vctx.style)
                  ? { style: styleKeywords(params.videoStyle ?? vctx.style) }
                  : {}),
                ...(entityRefs.length
                  ? { refBindings: entityRefs.map((e) => ({ kind: e.kind, name: e.name })) }
                  : {}),
                purity,
                audioOn: generateAudio,
              })
              if (prompt && prompt !== userPrompt) {
                safeSet(g, (s) => ({ nodes: mutateNode(s.nodes, id, { prompt }) }))
              }

              // 首尾帧：沿边取上游图片（与 VideoPromptBar 展示一致），⇄ 交换态在 params
              const frames: string[] = []
              if (videoMode === 'frames') {
                for (const e of state.edges) {
                  if (e.target !== id) continue
                  const src = state.nodes.find((n) => n.id === e.source)
                  const img = src?.data.versions.find((v) => isImageContent(v.content))?.content
                  if (img) frames.push(img)
                  if (frames.length >= 2) break
                }
                if (params.framesSwapped) frames.reverse()
              }
              const [firstFrame, lastFrame] = frames

              // 全能参考图 = 上游实体图（@图片1..N，顺序与 refBindings 一致）+ 用户手动上传，≤9
              const omniRefs = omni
                ? [...entityRefs.map((e) => e.image), ...(params.omniRefs ?? [])].slice(0, 9)
                : []
              const omniVideos = omni ? (params.omniVideos ?? []) : []
              const omniAudios = omni ? (params.omniAudios ?? []) : []

              if (omni) {
                if (!model.omniReference)
                  throw new Error(`${model.name} 不支持全能参考，请切换 Seedance 2.0 系列`)
                // 官方约束：参考音频不能单独使用，必须搭配参考图或参考视频
                if (omniAudios.length && !omniRefs.length && !omniVideos.length)
                  throw new Error('全能参考：参考音频需搭配至少 1 张参考图或 1 段参考视频')
                if (!prompt && !omniRefs.length && !omniVideos.length)
                  throw new Error('全能参考：请上传参考图/参考视频，或输入提示词')
              } else {
                if (!prompt && !firstFrame)
                  throw new Error('请输入提示词，或连线上游图片节点作首帧参考')
                if (lastFrame && !model.lastFrame)
                  throw new Error(`${model.name} 不支持尾帧参考，请切换支持首尾帧的模型`)
              }

              const req = {
                provider: model.provider,
                model: model.apiModel,
                prompt,
                ...(omniRefs.length ? { omniRefs } : {}),
                ...(omniVideos.length ? { omniVideos } : {}),
                ...(omniAudios.length ? { omniAudios } : {}),
                ...(firstFrame ? { firstFrame } : {}),
                ...(lastFrame ? { lastFrame } : {}),
                duration: params.videoDuration ?? 5,
                ratio: params.videoRatio ?? 'auto',
                resolution: params.videoResolution ?? '720p',
                generateAudio,
              }
              // 轮询期把等待时长透出到节点（每分钟更新一次，用户可感知任务仍在跑）
              const onTick = (elapsedMs: number) => {
                const mins = Math.floor(elapsedMs / 60_000)
                const note = mins >= 1 ? `生成中 · 已等待 ${mins} 分钟` : undefined
                safeSet(g, (s) => {
                  const cur = s.nodes.find((n) => n.id === id)
                  if (!cur || cur.data.progressNote === note) return {}
                  return { nodes: mutateNode(s.nodes, id, { progressNote: note }) }
                })
              }
              // 倍数条数并行生成，全部落定后统一入版本（部分失败保留成功条目）
              const count = params.videoMultiplier ?? 1
              // 云端任务找回辨认用：节点标题 · 提示词摘要
              const taskLabel = `${node.data.title} · ${prompt.slice(0, 40)}`.trim()
              const results = await Promise.all(
                Array.from({ length: count }, () =>
                  runOneVideoTask(model.provider, req, onTick, taskLabel),
                ),
              )
              const okIndex = results.findIndex((v) => !!v.content)
              if (okIndex < 0) {
                // 全部失败：超时任务的 taskRef 版本仍要入版本列表，供「继续查询」
                safeSet(g, (s) => {
                  const cur = s.nodes.find((n) => n.id === id)
                  const withRef = results.filter((v) => v.taskRef)
                  if (!cur || !withRef.length) return {}
                  return {
                    nodes: mutateNode(s.nodes, id, {
                      versions: [...cur.data.versions, ...withRef],
                      progressNote: undefined,
                    }),
                  }
                })
                throw new Error(results[0]?.error ?? '视频生成失败')
              }
              safeSet(g, (s) => {
                const cur = s.nodes.find((n) => n.id === id)
                const merged = [...(cur?.data.versions ?? []), ...results]
                const capped = capVideoVersions(
                  merged,
                  merged.length - results.length + okIndex,
                )
                return {
                  nodes: mutateNode(s.nodes, id, {
                    status: 'done',
                    versions: capped.versions,
                    activeVersion: capped.activeVersion,
                    progressNote: undefined,
                  }),
                }
              })
              // 视频入生成历史（含首帧海报；assetdb 内有视频单独 LRU 上限 20 条）
              void recordVideoHistory(id, prompt, results)
            }
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err)
            safeSet(g, (s) => ({
              nodes: mutateNode(s.nodes, id, { status: 'error', error: msg, progressNote: undefined }),
            }))
          }
        },

        fillVideoPromptFromUpstream: (id) => {
          const s = get()
          const node = s.nodes.find((n) => n.id === id)
          if (!node || node.data.kind !== 'video') return false
          const params = node.data.params
          const vctx = videoContextFor(s.nodes, s.edges, id)
          const purity = {
            noSubtitles: params.videoNoSubtitles,
            noBgm: params.videoNoBgm,
            noSfx: params.videoNoSfx,
          }
          const hasVoice = !!(vctx.voiceNarration || vctx.voiceCast)
          const prompt = buildVideoPrompt({
            userPrompt: node.data.prompt,
            shotText: vctx.shotText,
            voiceNarration: vctx.voiceNarration,
            voiceCast: vctx.voiceCast,
            ...(styleKeywords(params.videoStyle ?? vctx.style)
              ? { style: styleKeywords(params.videoStyle ?? vctx.style) }
              : {}),
            purity,
            audioOn: resolveGenerateAudio(params.videoAudio, purity, hasVoice),
          })
          if (!prompt || prompt === node.data.prompt.trim()) return false
          set((st) => ({ nodes: mutateNode(st.nodes, id, { prompt }) }))
          return true
        },

        resumeVideoTask: async (id) => {
          const state = get()
          const node = state.nodes.find((n) => n.id === id)
          if (!node || node.data.kind !== 'video' || node.data.status === 'running') return
          // 找可续查版本：优先激活版本，否则最后一个带 taskRef 的失败版本
          const versions = node.data.versions
          const resumable = (i: number) => !!versions[i] && !versions[i].content && !!versions[i].taskRef
          let idx = resumable(node.data.activeVersion) ? node.data.activeVersion : -1
          if (idx < 0) {
            for (let i = versions.length - 1; i >= 0; i--) {
              if (resumable(i)) { idx = i; break }
            }
          }
          if (idx < 0) return
          const ref = versions[idx].taskRef!
          const g = generation
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'running',
              error: undefined,
              progressNote: '继续查询中…',
            }),
          }))
          const onTick = (elapsedMs: number) => {
            const mins = Math.floor(elapsedMs / 60_000)
            const note = mins >= 1 ? `继续查询中 · 已等待 ${mins} 分钟` : '继续查询中…'
            safeSet(g, (s) => {
              const cur = s.nodes.find((n) => n.id === id)
              if (!cur || cur.data.progressNote === note) return {}
              return { nodes: mutateNode(s.nodes, id, { progressNote: note }) }
            })
          }
          const result = await pollVideoTask(ref.provider, ref.taskId, 10 * 60_000, onTick)
          safeSet(g, (s) => {
            const cur = s.nodes.find((n) => n.id === id)
            if (!cur) return {}
            const nextVersions = [...cur.data.versions]
            // 原位替换续查版本：成功填充内容，失败刷新错误信息（保留 taskRef 可再续查）
            nextVersions[idx] = result
            return {
              nodes: mutateNode(s.nodes, id, {
                status: result.content ? 'done' : 'error',
                error: result.content ? undefined : (result.error ?? '生成失败'),
                versions: nextVersions,
                activeVersion: result.content ? idx : cur.data.activeVersion,
                progressNote: undefined,
              }),
            }
          })
          if (result.content) {
            void recordVideoHistory(id, node.data.prompt.trim(), [result])
          }
        },

        recoverCloudTask: async (id, taskId) => {
          const state = get()
          const node = state.nodes.find((n) => n.id === id)
          if (!node || node.data.kind !== 'video' || node.data.status === 'running') return
          const g = generation
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'running',
              error: undefined,
              progressNote: '云端取件中…',
            }),
          }))
          try {
            const blob = await fetchVideoFile({ provider: 'seedance', taskId })
            const version: NodeVersion = {
              ...newVersion(await blobToDataUrl(blob)),
              taskRef: { provider: 'seedance', taskId },
            }
            safeSet(g, (s) => {
              const cur = s.nodes.find((n) => n.id === id)
              if (!cur) return {}
              const merged = [...cur.data.versions, version]
              const capped = capVideoVersions(merged, merged.length - 1)
              return {
                nodes: mutateNode(s.nodes, id, {
                  status: 'done',
                  versions: capped.versions,
                  activeVersion: capped.activeVersion,
                  progressNote: undefined,
                }),
              }
            })
            void recordVideoHistory(id, node.data.prompt.trim(), [version])
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err)
            safeSet(g, (s) => ({
              nodes: mutateNode(s.nodes, id, {
                status: 'error',
                error: `云端取件失败：${msg}`,
                progressNote: undefined,
              }),
            }))
          }
        },

        runImageEdit: async (id, prompt, opts) => {
          const state = get()
          const node = state.nodes.find((n) => n.id === id)
          if (!node || node.data.kind !== 'image' || node.data.status === 'running') return
          const current = activeContent(node.data)
          if (!current || !isImageContent(current)) return

          const g = generation
          const cost = estimateCost('image', 'single', node.data.params)
          set((s) => ({
            nodes: mutateNode(s.nodes, id, { status: 'running', error: undefined }),
            credits: Math.max(0, s.credits - cost),
          }))

          try {
            const res = await generateImage({
              prompt,
              referenceImages: [current, ...(opts?.extraRefs ?? [])].slice(0, 6),
              aspectRatio: node.data.params.aspectRatio,
              quality: node.data.params.quality,
              model: resolveApiModel(IMAGE_MODELS, opts?.model ?? node.data.params.imageModel),
            })
            const content = opts?.composite ? await opts.composite(res.image) : res.image
            const v = newVersion(content, opts?.label)
            safeSet(g, (s) => {
              const cur = s.nodes.find((n) => n.id === id)
              const versions = [...(cur?.data.versions ?? []), v]
              return {
                nodes: mutateNode(s.nodes, id, {
                  status: 'done',
                  versions,
                  activeVersion: versions.length - 1,
                }),
              }
            })
            recordHistory(id, 'image', node.data.preset, prompt, [v])
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err)
            safeSet(g, (s) => ({
              nodes: mutateNode(s.nodes, id, { status: 'error', error: msg }),
            }))
          }
        },

        runPipeline: async (ids) => {
          if (get().pipelineRunning) return
          const g = generation
          set({ pipelineRunning: true })
          try {
            const { nodes, edges, runNode } = get()
            // 分层深度按**全画布**图计算，而不是只看 ids 子图——Agent 传来的
            // run ids 可能漏掉中间节点（如分镜节点），子图断链会让下游与上游
            // 掉进同一层并行开跑（实测：分镜脚本没生成完，分镜图/视频就全开跑）
            const layersAll = topoLayers(nodes, edges)
            const depth = new Map<string, number>()
            layersAll.forEach((layer, d) => layer.forEach((nid) => depth.set(nid, d)))
            const targetIds = new Set(ids ?? nodes.map((n) => n.id))
            const byDepth = new Map<number, string[]>()
            for (const n of nodes) {
              if (!targetIds.has(n.id)) continue
              const d = depth.get(n.id) ?? 0
              byDepth.set(d, [...(byDepth.get(d) ?? []), n.id])
            }
            const layers = [...byDepth.entries()]
              .sort((a, b) => a[0] - b[0])
              .map(([, layer]) => layer)

            // 上游（含不在本次 run 集合里的）仍在生成时等待其落定，而不是拿
            // 旧产出/空产出直接开跑；代际切换或超过 25 分钟兜底放行
            const waitForRunningUpstreams = async (layer: string[]) => {
              const deadline = Date.now() + 25 * 60_000
              for (;;) {
                if (g !== generation || Date.now() > deadline) return
                const cur = get()
                const busy = layer.some((nid) =>
                  cur.edges.some((e) => {
                    if (e.target !== nid) return false
                    const u = cur.nodes.find((n) => n.id === e.source)
                    return u?.data.status === 'running'
                  }),
                )
                if (!busy) return
                await sleep(1000)
              }
            }

            let skipped = 0
            for (const layer of layers) {
              if (g !== generation) break
              await waitForRunningUpstreams(layer)
              if (g !== generation) break
              // 级联保护：直接上游失败或无产出（已被跳过）的节点不再运行，
              // 避免上游超时后下游连环报「缺少剧本/缺少提示词」（用户实测反馈）。
              // 判定沿全量 edges；但「idle 且无产出」只对本次 run 集合内的上游
              // 生效——集合外的空闲上游本就不会运行，维持旧行为不误伤
              const cur = get()
              const runnable = layer.filter((nid) => {
                const ups = cur.edges
                  .filter((e) => e.target === nid)
                  .map((e) => cur.nodes.find((n) => n.id === e.source))
                  .filter((u): u is PineNode => !!u)
                const blocked = ups.some(
                  (u) =>
                    u.data.status === 'error' ||
                    (targetIds.has(u.id) &&
                      u.data.status !== 'done' &&
                      !activeContent(u.data)),
                )
                if (blocked) skipped++
                return !blocked
              })
              // 单节点失败由 runNode 自行兜成 error 状态，不阻断整条管线
              await Promise.allSettled(runnable.map((nid) => runNode(nid)))
            }
            if (skipped > 0 && g === generation) {
              window.dispatchEvent(
                new CustomEvent('pineline:flash', {
                  detail: `已跳过 ${skipped} 个下游节点（上游未成功），修复上游后可再次运行`,
                }),
              )
            }
          } finally {
            // 代际已切换时新画布的 pipelineRunning 由新一轮运行管理，不越权清除
            if (g === generation) set({ pipelineRunning: false })
          }
        },

        createPipelineFromBrief: (brief) => {
          // 放在现有节点下方一行，避免叠在已有内容上
          const baseY =
            get().nodes.reduce((m, n) => Math.max(m, n.position.y), 0) + 320
          const script = buildNode('text', 'script', { x: 80, y: baseY }, { title: '剧本', prompt: brief })
          const storyboard = buildNode('text', 'storyboard', { x: 560, y: baseY }, { title: '分镜 · 自动拆分' })
          const shot = buildNode('image', 'shot', { x: 1040, y: baseY }, { title: '分镜图 · 首镜' })
          // commit 在 150ms 窗口内合并，整条链的创建是一步撤销
          commit()
          set((s) => ({
            nodes: [...s.nodes, script, storyboard, shot],
            edges: [
              ...s.edges,
              { id: `e-${script.id}-${storyboard.id}`, source: script.id, target: storyboard.id },
              { id: `e-${storyboard.id}-${shot.id}`, source: storyboard.id, target: shot.id },
            ],
            selectedNodeId: script.id,
          }))
          get().requestFitView()
          return [script.id, storyboard.id, shot.id]
        },

        deriveShotImageNodes: async (storyboardId, indices, opts) => {
          const state = get()
          const sb = state.nodes.find((n) => n.id === storyboardId)
          const shots = sb?.data.shots ?? []
          const chosen = indices.filter((i) => i >= 0 && i < shots.length)
          if (!sb || !chosen.length) return []

          const flash = (msg: string) =>
            window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))

          // 第一步：派生节点 + 连线（commit 由 addNode/onConnect 的 150ms 合并窗归并成一步撤销）
          // 落点让开实体参考列：分镜与分镜图之间通常已有一列角色/场景/道具节点，
          // 从分镜节点 +460 起排会压在资产上、分镜图穿插进资产列（用户实测反馈）
          const entityRightX = state.nodes
            .filter((n) => n.data.kind === 'image' && isEntityPreset(n.data.preset))
            .reduce((m, n) => Math.max(m, n.position.x), sb.position.x)
          const baseX = entityRightX + 460
          const baseY = sb.position.y
          // 槽位从「已派生数量」续排：分批派生时 k 从 0 重数会让第二批与第一批
          // 坐标完全重叠、逐个叠死（用户实测反馈）；行距 560 给竖版分镜图留高度
          const existing = state.edges.filter((e) => {
            if (e.source !== storyboardId) return false
            const t = state.nodes.find((n) => n.id === e.target)
            return t?.data.kind === 'image' && t.data.preset === 'shot'
          }).length
          // 一致性挂载候选：画布上有产出的实体参考节点（角色三视图/场景宫格/道具三视图）
          const GENERIC_TITLES = new Set(['角色三视图', '场景四宫格', '道具三视图', '图片', '新图片'])
          const entityNodes = state.nodes.filter((n) => {
            if (n.data.kind !== 'image') return false
            if (!isEntityPreset(n.data.preset)) return false
            if (!n.data.versions.some((v) => isImageContent(v.content))) return false
            const name = n.data.title.trim()
            return name.length >= 2 && !GENERIC_TITLES.has(name)
          })
          // 实体清单（供 shot-compose 精确判断每镜用到哪些素材）：「kind:name」形式
          const entityKindLabel = (p: string | null) =>
            p === 'char-triview' ? '角色' : p === 'scene-grid' ? '场景' : '道具'
          const entityList = entityNodes.map((n) => ({
            node: n,
            tag: `${entityKindLabel(n.data.preset)}:${n.data.title.trim()}`,
          }))

          const ids: string[] = []
          chosen.forEach((shotIdx, k) => {
            const slot = existing + k
            const shot = shots[shotIdx]
            const id = get().addNode(
              'image',
              'shot',
              { x: baseX + (slot % 3) * 420, y: baseY + Math.floor(slot / 3) * 560 },
              {
                title: `#${shotIdx + 1} ${shot.title}`.slice(0, 24),
                params: {
                  shotIndex: shotIdx,
                  ...(opts?.imageModel ? { imageModel: opts.imageModel } : {}),
                  ...(opts?.quality ? { quality: opts.quality } : {}),
                },
              },
            )
            get().onConnect({ source: storyboardId, sourceHandle: null, target: id, targetHandle: null })
            ids.push(id)
          })
          get().requestFitView()

          // 第二步：逐镜生成生图提示词 + 实体感知挂载。
          // 有实体节点 → shot-compose（返回 {prompt, assets}，按 assets 精确连参考图，
          // 替代脆弱的文本子串匹配）；无实体 → 退回纯 image-prompt。
          flash(`正在为 ${chosen.length} 个镜头生成生图提示词…`)
          let mounted = 0
          const results = await Promise.allSettled(
            chosen.map(async (shotIdx, k) => {
              const shot = shots[shotIdx]
              const nid = ids[k]
              if (entityList.length) {
                const brief =
                  `镜头：${shot.title}\n${shot.description}\n\n可用素材清单：\n` +
                  entityList.map((e) => `- ${e.tag}`).join('\n')
                const res = await generateScript({
                  brief,
                  tone: sb.data.params.tone,
                  preset: 'shot-compose',
                  model: resolveApiModel(TEXT_MODELS, sb.data.params.textModel),
                })
                const parsed = parseShotCompose(res.script)
                if (!get().nodes.some((n) => n.id === nid)) return
                if (parsed.prompt) get().setPrompt(nid, parsed.prompt)
                // 按 assets 精确匹配实体节点（tag 完全一致）→ 连参考图
                for (const tag of parsed.assets) {
                  const hit = entityList.find((e) => e.tag === tag)
                  if (!hit) continue
                  get().onConnect({ source: hit.node.id, sourceHandle: null, target: nid, targetHandle: null })
                  mounted++
                }
              } else {
                const res = await generateScript({
                  brief: `${shot.title}\n${shot.description}`,
                  tone: sb.data.params.tone,
                  preset: 'image-prompt',
                  model: resolveApiModel(TEXT_MODELS, sb.data.params.textModel),
                })
                if (get().nodes.some((n) => n.id === nid)) get().setPrompt(nid, res.script.trim())
              }
            }),
          )
          const ok = results.filter((r) => r.status === 'fulfilled').length
          if (mounted) flash(`已按镜头内容精确连接 ${mounted} 处角色/场景/道具参考（可手动增删连线）`)
          flash(
            ok
              ? `✓ 已生成 ${ok}/${chosen.length} 条生图提示词，确认或编辑后可生成图片`
              : '生图提示词生成失败，可在节点输入栏手动填写',
          )
          return ids
        },

        generateAllShotImages: async (storyboardId, opts) => {
          const s = get()
          const sb = s.nodes.find((n) => n.id === storyboardId)
          const shots = sb?.data.shots ?? []
          // 沿连线找已派生的下游分镜图节点（带 shotIndex 绑定）
          const derived = s.edges
            .filter((e) => e.source === storyboardId)
            .map((e) => s.nodes.find((n) => n.id === e.target))
            .filter(
              (n): n is PineNode =>
                !!n &&
                n.data.kind === 'image' &&
                n.data.preset === 'shot' &&
                n.data.params.shotIndex != null,
            )
          if (!derived.length || !sb) return

          const flash = (msg: string) =>
            window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))

          // 已有提示词的节点直接生图；缺的先补一次生图提示词（不重复劳动）
          const missing = derived.filter((n) => !n.data.prompt.trim())
          if (missing.length) {
            flash(`正在为 ${missing.length} 个缺提示词的分镜图补生图提示词…`)
            await Promise.allSettled(
              missing.map(async (n) => {
                const shot = shots[n.data.params.shotIndex!]
                if (!shot) return
                const res = await generateScript({
                  brief: `${shot.title}\n${shot.description}`,
                  tone: sb.data.params.tone,
                  preset: 'image-prompt',
                  model: resolveApiModel(TEXT_MODELS, sb.data.params.textModel),
                })
                if (get().nodes.some((x) => x.id === n.id)) {
                  get().setPrompt(n.id, res.script.trim())
                }
              }),
            )
          }
          // 面板选了生图模型/分辨率：批量覆盖所有派生节点参数再开跑
          if (opts?.imageModel || opts?.quality) {
            for (const n of derived) {
              get().updateNodeParams(n.id, {
                ...(opts.imageModel ? { imageModel: opts.imageModel } : {}),
                ...(opts.quality ? { quality: opts.quality } : {}),
              })
            }
          }
          flash(`开始生成 ${derived.length} 张分镜图…`)
          void get().runPipeline(derived.map((n) => n.id))
        },

        deriveShotVideoNodes: async (storyboardId, opts) => {
          const s = get()
          const flash = (msg: string) =>
            window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))

          // 沿边找已派生分镜图节点（shotIndex 绑定），按镜头顺序排列
          const derived = s.edges
            .filter((e) => e.source === storyboardId)
            .map((e) => s.nodes.find((n) => n.id === e.target))
            .filter(
              (n): n is PineNode =>
                !!n &&
                n.data.kind === 'image' &&
                n.data.preset === 'shot' &&
                n.data.params.shotIndex != null,
            )
            .sort((a, b) => a.data.params.shotIndex! - b.data.params.shotIndex!)
          if (!derived.length) {
            flash('请先派生分镜图，再一键成片')
            return []
          }

          // 已有下游视频节点的分镜图跳过（重复触发不叠加）；opts.indices 指定则仅这些镜头
          const pending = derived.filter(
            (img) =>
              (!opts?.indices || opts.indices.includes(img.data.params.shotIndex!)) &&
              !s.edges.some((e) => {
                if (e.source !== img.id) return false
                const t = s.nodes.find((n) => n.id === e.target)
                return t?.data.kind === 'video'
              }),
          )
          if (!pending.length) {
            flash('每个分镜图都已挂镜头视频节点')
            return []
          }

          // 分镜 shots 用于按节奏估算每镜时长（有长有短）
          const sbShots = s.nodes.find((n) => n.id === storyboardId)?.data.shots ?? []
          const ids: string[] = []
          for (const img of pending) {
            const shotIdx = img.data.params.shotIndex!
            const shotText = sbShots[shotIdx]?.description || img.data.prompt || ''
            const id = get().addNode(
              'video',
              null,
              { x: img.position.x + 460, y: img.position.y },
              {
                title: `镜头视频 ${shotIdx + 1}`,
                params: {
                  videoDuration: estimateShotDuration(shotText),
                  ...(opts?.videoModel ? { videoModel: opts.videoModel } : {}),
                },
              },
            )
            get().onConnect({ source: img.id, sourceHandle: null, target: id, targetHandle: null })
            // 按官方公式预填提示词（分镜图画面描述 + 分镜节点音色设定），可再编辑
            get().fillVideoPromptFromUpstream(id)
            ids.push(id)
          }
          get().requestFitView()
          flash(
            opts?.run
              ? `✓ 已派生 ${ids.length} 个镜头视频，开始生成…`
              : `✓ 已派生 ${ids.length} 个镜头视频节点，确认提示词后可一键生成`,
          )
          if (opts?.run && ids.length) void get().runPipeline(ids)
          return ids
        },

        exportProject: () => {
          const { nodes, edges, projectName } = get()
          // 内存中保留完整 base64 图片，导出文件因此是用户可留存/转交的完整工程
          return JSON.stringify(
            {
              app: 'pineline',
              version: 2,
              projectName,
              exportedAt: new Date().toISOString(),
              nodes,
              edges,
            },
            null,
            2,
          )
        },

        importProject: (raw) => {
          let data: unknown
          try {
            data = JSON.parse(raw)
          } catch {
            throw new Error('文件不是合法 JSON')
          }
          const obj = data as { nodes?: unknown; edges?: unknown; projectName?: unknown }
          if (!obj || !Array.isArray(obj.nodes) || !Array.isArray(obj.edges)) {
            throw new Error('工程文件格式不正确：缺少 nodes / edges 数组')
          }
          // 逐节点 sanitize：坏文件会被 persist 立即落盘，崩溃前必须拦下（审计修复）
          const sane = (obj.nodes as PineNode[]).filter(
            (n) =>
              n &&
              typeof n.id === 'string' &&
              n.position &&
              Number.isFinite(n.position.x) &&
              Number.isFinite(n.position.y) &&
              n.data &&
              typeof n.data.kind === 'string',
          )
          const dropped = (obj.nodes as unknown[]).length - sane.length
          // v1 旧工程 → v4 新模型；v2 新工程幂等通过
          const migrated = migrateGraph(
            sane.map((n) => ({ ...n, selected: false, dragging: false })),
            (obj.edges as PineEdge[]).map(migrateLegacyEdge),
          )
          // 导入文件里可能带 running 遗留态，归位
          migrated.nodes = migrated.nodes.map((n) =>
            n.data.status === 'running'
              ? { ...n, data: { ...n.data, status: 'idle' as const } }
              : n,
          )
          const ids = new Set(migrated.nodes.map((n) => n.id))
          migrated.edges = migrated.edges.filter(
            (e) => ids.has(e.source) && ids.has(e.target),
          )
          commit()
          generation++
          set({
            nodes: migrated.nodes,
            edges: migrated.edges,
            ...(typeof obj.projectName === 'string' && obj.projectName.trim()
              ? { projectName: obj.projectName.trim() }
              : {}),
            selectedNodeId: null,
          })
          if (dropped > 0) {
            throw new Error(`已导入，但有 ${dropped} 个损坏节点被剔除`)
          }
        },

        // 清空 = 完全空白画布
        resetProject: () => {
          commit()
          generation++
          set({
            nodes: [],
            edges: [],
            selectedNodeId: null,
          })
        },

        resetCredits: () => set({ credits: INITIAL_CREDITS }),

        videoReadiness: null,
        loadVideoReadiness: async () => {
          if (get().videoReadiness) return
          try {
            set({ videoReadiness: await fetchVideoReadiness() })
          } catch {
            // 本地无 Worker/离线时静默：选择器按「未知」展示，不打扰
          }
        },

        // ---- 多项目管理 ----
        currentProjectId: null,

        snapshotCurrentProject: async () => {
          if (restoringProject) return
          const s = get()
          // 空画布且未建档：不生成空档案
          if (!s.currentProjectId && s.nodes.length === 0) return
          const id = s.currentProjectId ?? `p-${crypto.randomUUID()}`
          if (!s.currentProjectId) set({ currentProjectId: id })
          const firstImage =
            s.nodes
              .flatMap((n) => n.data.versions)
              .find((v) => isImageContent(v.content))?.content ?? null
          const thumb = firstImage ? await makeThumb(firstImage) : null
          // 总是读旧档：入档前做媒体合并（档案只增不减）
          const prev = await getProject(id)

          // 防污染：画布无任何 data: 媒体而档案有 → 画布疑似 localStorage 剥离态，
          // 只刷新元数据、不用无图 graph 覆盖完整档案
          const canvasHasMedia = s.nodes.some((n) =>
            n.data.versions.some((v) => v.content?.startsWith('data:')),
          )
          const prevNodes = (prev?.graph.nodes ?? []) as PineNode[]
          const prevHasMedia = prevNodes.some((n) =>
            n.data?.versions?.some((v) => v.content?.startsWith('data:')),
          )
          if (!canvasHasMedia && prevHasMedia && prev) {
            await putProject({
              ...prev,
              name: s.projectName,
              updatedAt: Date.now(),
              credits: s.credits,
            })
            return
          }

          // 逐节点媒体合并：画布空壳节点沿用档案媒体（防「半剥离画布」覆盖完整档案）
          const merged = mergeArchiveMedia(s.nodes, prevNodes)
          await putProject({
            id,
            name: s.projectName,
            updatedAt: Date.now(),
            thumb: thumb ?? prev?.thumb ?? null,
            // 媒体完整入档（IndexedDB）——localStorage 才需要剥离
            graph: { nodes: merged.map(sanitizeForArchive), edges: s.edges },
            credits: s.credits,
          })
        },

        restoreCurrentProject: async () => {
          const pid = get().currentProjectId
          if (!pid) return
          restoringProject = true
          try {
            const rec = await getProject(pid)
            if (!rec) {
              // 区分「没有档案」与「库不可用」：后者要明确告知，媒体没丢只是暂时读不到
              if (!isPersistent()) {
                window.dispatchEvent(
                  new CustomEvent('pineline:flash', {
                    detail:
                      '本地数据库暂不可用，项目里的图片/视频未能恢复（数据仍在本机）——请关闭其他 PineLine 标签页后刷新',
                  }),
                )
              }
              return
            }
            const { nodes, edges } = sanitizeArchiveGraph(
              rec.graph.nodes ?? [],
              rec.graph.edges ?? [],
            )
            // 档案无媒体且不比当前画布多内容时不覆盖（罕见：旧版剥离档案）
            const hasMedia = nodes.some((n) =>
              n.data.versions.some((v) => v.content?.startsWith('data:')),
            )
            if (!hasMedia && nodes.length <= get().nodes.length) return
            generation++
            // 档案恢复=会话起点，此前的撤销栈（可能属于恢复前画布）一并清空
            set({
              nodes,
              edges,
              projectName: rec.name,
              selectedNodeId: null,
              past: [],
              future: [],
            })
          } catch (err) {
            // 坏档案不阻断挂载：保持当前画布（localStorage 版），仅告警
            console.error('[pineline] 项目档案恢复失败，已跳过', err)
          } finally {
            restoringProject = false
          }
        },

        loadProject: async (id) => {
          try {
            const rec = await getProject(id)
            if (!rec) return false
            // 切换前先落档当前画布，避免丢工作
            await get().snapshotCurrentProject()
            const { nodes, edges } = sanitizeArchiveGraph(
              rec.graph.nodes ?? [],
              rec.graph.edges ?? [],
            )
            generation++
            // 项目边界不可撤销：清空撤销栈，否则 ⌘Z 连按会把上一个项目的画布
            // 回退出来（且 2s 自动快照会把旧项目内容写进当前项目档案，持久化污染）
            set({
              nodes,
              edges,
              projectName: rec.name,
              // credits 是用户级模拟额度，不随项目档案覆盖（档案字段仅向后兼容保留）
              selectedNodeId: null,
              currentProjectId: id,
              past: [],
              future: [],
            })
            get().requestFitView()
            return true
          } catch (err) {
            console.error('[pineline] 项目载入失败', err)
            return false
          }
        },

        createProject: async () => {
          await get().snapshotCurrentProject()
          const id = `p-${crypto.randomUUID()}`
          generation++
          set({
            nodes: [],
            edges: [],
            selectedNodeId: null,
            projectName: '未命名项目',
            currentProjectId: id,
            past: [],
            future: [],
          })
          await putProject({
            id,
            name: '未命名项目',
            updatedAt: Date.now(),
            thumb: null,
            graph: { nodes: [], edges: [] },
            credits: get().credits,
          })
          return id
        },

        detachProject: (id) => {
          if (get().currentProjectId !== id) return
          generation++
          set({
            nodes: [],
            edges: [],
            selectedNodeId: null,
            projectName: '未命名工程',
            currentProjectId: null,
            past: [],
            future: [],
          })
        },
      }
    },
    {
      name: 'pineline-studio-v1',
      version: 4,
      storage: createJSONStorage(() => guardedLocalStorage),
      // v2：shot 多桩 handle 剥离；v3：projectName；v4：节点体系收敛（8 类 → 3 类 + preset + versions）
      migrate: (persisted, version) => {
        const s = persisted as StudioState
        try {
          if (Array.isArray(s?.edges)) {
            s.edges = s.edges.map(migrateLegacyEdge)
          }
          if (version < 3) {
            s.projectName = s.projectName || '未命名工程'
          }
          if (version < 4 && Array.isArray(s?.nodes)) {
            const migrated = migrateGraph(s.nodes, s.edges ?? [])
            s.nodes = migrated.nodes
            s.edges = migrated.edges
          }
          if (typeof s.credits !== 'number') s.credits = INITIAL_CREDITS
        } catch {
          // 迁移失败兜底：空画布而非白屏
          s.nodes = []
          s.edges = []
          s.selectedNodeId = null
          s.credits = INITIAL_CREDITS
        }
        return s
      },
      partialize: (state) =>
        ({
          nodes: state.nodes.map(stripHeavyOutputs),
          edges: state.edges,
          selectedNodeId: state.selectedNodeId,
          projectName: state.projectName,
          credits: state.credits,
          currentProjectId: state.currentProjectId,
        }) as unknown as StudioState,
    },
  ),
)

// 画布/工程名变更 2s 防抖自动快照进项目档案（首次变更自动建档）
let snapshotTimer: ReturnType<typeof setTimeout> | null = null
useStudioStore.subscribe((state, prev) => {
  if (
    state.nodes === prev.nodes &&
    state.edges === prev.edges &&
    state.projectName === prev.projectName
  )
    return
  if (snapshotTimer) clearTimeout(snapshotTimer)
  snapshotTimer = setTimeout(() => {
    void useStudioStore.getState().snapshotCurrentProject()
  }, 2000)
})

/** 内存剪贴板（模块级：跨组件共享，刷新即失效） */
let clipboard: Clipboard = null

/** 生成历史（IndexedDB，非关键路径，失败静默） */
function recordHistory(
  nodeId: string,
  kind: 'text' | 'image' | 'video',
  preset: string | null,
  prompt: string,
  versions: NodeVersion[],
) {
  const entries = versions
    .filter((v) => v.content)
    .map((v) => ({
      nodeId,
      kind,
      preset,
      prompt: prompt.slice(0, 200),
      content: v.content as string,
      ...(v.label ? { label: v.label } : {}),
    }))
  if (entries.length) void appendHistory(entries)
}

/** 视频首帧海报（≤480px jpeg dataURL），历史面板列表展示用 */
function videoPoster(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const v = document.createElement('video')
    v.muted = true
    v.playsInline = true
    v.src = src
    v.onerror = () => resolve(null)
    v.onloadedmetadata = () => {
      v.currentTime = Math.min(0.1, (v.duration || 1) / 10)
    }
    v.onseeked = () => {
      try {
        const c = document.createElement('canvas')
        const scale = Math.min(1, 480 / (v.videoWidth || 480))
        c.width = Math.max(1, Math.round((v.videoWidth || 640) * scale))
        c.height = Math.max(1, Math.round((v.videoHeight || 360) * scale))
        c.getContext('2d')!.drawImage(v, 0, 0, c.width, c.height)
        resolve(c.toDataURL('image/jpeg', 0.7))
      } catch {
        resolve(null)
      }
    }
  })
}

/** 视频生成历史：异步截首帧海报后入库（IndexedDB 有视频单独 LRU 上限） */
async function recordVideoHistory(nodeId: string, prompt: string, versions: NodeVersion[]) {
  const entries: Parameters<typeof appendHistory>[0] = []
  for (const v of versions) {
    if (!v.content) continue
    const poster = await videoPoster(v.content)
    entries.push({
      nodeId,
      kind: 'video',
      preset: null,
      prompt: prompt.slice(0, 200),
      content: v.content,
      ...(poster ? { poster } : {}),
      ...(v.label ? { label: v.label } : {}),
    })
  }
  if (entries.length) void appendHistory(entries)
}

/**
 * 解析 shot-compose 返回：{prompt, assets}。容错链同 agentChat/extract-entities：
 * 剥 think/围栏 → 截首个 {…} → parse。失败时降级为「整段作 prompt、无 assets」。
 */
function parseShotCompose(raw: string): { prompt: string; assets: string[] } {
  const cleaned = raw
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
  const attempts = [cleaned]
  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first >= 0 && last > first) attempts.push(cleaned.slice(first, last + 1))
  for (const text of attempts) {
    try {
      const obj = JSON.parse(text) as { prompt?: unknown; assets?: unknown }
      const prompt = typeof obj.prompt === 'string' ? obj.prompt.trim() : ''
      const assets = Array.isArray(obj.assets)
        ? obj.assets.filter((x): x is string => typeof x === 'string').map((s) => s.trim())
        : []
      if (prompt) return { prompt, assets }
    } catch {
      /* 尝试下一种 */
    }
  }
  // 解析失败：整段当提示词（去掉可能的 JSON 残骸），不挂载
  return { prompt: cleaned.replace(/[{}[\]"]/g, '').slice(0, 400), assets: [] }
}

function firstShotDescription(text: string | null): string {
  if (!text) return ''
  const first = text.split(/\n\n/)[0] ?? ''
  return first.replace(/^#\d+\s+[^\n]*\n?/, '').trim()
}

/**
 * 分镜图节点取镜逻辑：优先读上游 storyboard 节点的结构化 shots[shotIndex]
 * （params.shotIndex 由「生成分镜图」派生时写入，用户也可在多个分镜图间自选镜头）；
 * 上游无结构化 shots 时回退旧的文本切分（取第一镜）。
 */
function shotDescriptionFor(
  nodes: PineNode[],
  edges: PineEdge[],
  nodeId: string,
  shotIndex?: number,
): string {
  for (const e of edges) {
    if (e.target !== nodeId) continue
    const src = nodes.find((n) => n.id === e.source)
    const shots = src?.data.shots
    if (shots?.length) {
      const s = shots[Math.max(0, Math.min(shotIndex ?? 0, shots.length - 1))]
      return `${s.title}：${s.description}`.replace(/^：/, '').trim()
    }
  }
  return firstShotDescription(getUpstreamTextOutput(nodes, edges, nodeId))
}

/** 上游实体参考（角色/场景/道具）：图 + kind + name，供视频 @图片N 绑定 */
type EntityRef = { image: string; kind: string; name: string }

type VideoUpstreamContext = {
  shotText?: string
  voiceNarration?: string
  voiceCast?: string
  /** 分镜节点上的全片统一视觉风格 id（VIDEO_STYLES） */
  style?: string
  /** 该镜头用到的角色/场景/道具实体（沿分镜图上游收集，供 Seedance @图片N 引用） */
  entityRefs?: EntityRef[]
}

const entityKindZh = (p: string | null): string =>
  p === 'char-triview' ? '角色' : p === 'scene-grid' ? '场景' : p === 'prop-triview' ? '道具' : '素材'

/**
 * 按镜头节奏估算视频时长（Seedance 2.0 支持 4-15s）。官方建议：4-5s 单动作、
 * 6-10s 2-3 镜、10-15s 复杂叙事。据镜头描述的信息量（字数 + 动作/运镜密度）分档，
 * 让不同镜头有长有短、贴合内容节奏，而非全部固定 5s。
 */
function estimateShotDuration(text: string): number {
  const t = (text || '').trim()
  const len = t.length
  const actions = (
    t.match(
      /走|跑|转身|回头|抬|推|拉|挥|跳|坐下|站起|说|讲|看向|指向|拿起|放下|打开|关上|迈出|递|碰|转向|走近|走出|奔|冲|飞|落|升起|降下|环视|扫视/g,
    ) || []
  ).length
  let d = 5
  if (len > 55 || actions >= 3) d = 8
  if (len > 95 || actions >= 5) d = 10
  if (len > 140 || actions >= 7) d = 12
  return Math.max(4, Math.min(15, d))
}

/**
 * 视频节点上游语境：沿边上溯 视频 ← 分镜图(shot) ← (分镜 + 角色/场景/道具实体)。
 * 画面描述取分镜图生图提示词（派生已回填），空则回退 shots[shotIndex]；
 * 音色设定取自链上分镜节点；实体参考取自分镜图上游的三视图/宫格节点（一致性传递）。
 */
function videoContextFor(
  nodes: PineNode[],
  edges: PineEdge[],
  videoId: string,
): VideoUpstreamContext {
  const ctx: VideoUpstreamContext = {}
  const entityRefs: EntityRef[] = []
  const seenEntity = new Set<string>()
  const takeVoice = (d: PineNodeData) => {
    if (!ctx.voiceNarration && d.params.voiceNarration?.trim())
      ctx.voiceNarration = d.params.voiceNarration.trim()
    if (!ctx.voiceCast && d.params.voiceCast?.trim()) ctx.voiceCast = d.params.voiceCast.trim()
    if (!ctx.style && d.params.videoStyle) ctx.style = d.params.videoStyle
  }
  const collectEntity = (n: PineNode) => {
    if (seenEntity.has(n.id)) return
    const img = n.data.versions.find((v) => isImageContent(v.content))?.content
    if (!img) return
    seenEntity.add(n.id)
    entityRefs.push({ image: img, kind: entityKindZh(n.data.preset), name: n.data.title.trim() })
  }
  for (const e of edges) {
    if (e.target !== videoId) continue
    const src = nodes.find((n) => n.id === e.source)
    if (!src) continue
    const d = src.data
    if (d.kind === 'image' && d.preset === 'shot') {
      if (!ctx.shotText) {
        ctx.shotText =
          d.prompt.trim() ||
          shotDescriptionFor(nodes, edges, src.id, d.params.shotIndex) ||
          undefined
      }
      // 分镜图上游：分镜节点（音色）+ 实体参考节点（@图片N 一致性）
      for (const e2 of edges) {
        if (e2.target !== src.id) continue
        const up = nodes.find((n) => n.id === e2.source)
        if (!up) continue
        if (up.data.preset === 'storyboard') takeVoice(up.data)
        else if (up.data.kind === 'image' && isEntityPreset(up.data.preset)) collectEntity(up)
      }
    } else if (d.preset === 'storyboard') {
      takeVoice(d)
      if (!ctx.shotText && d.shots?.length) {
        const s = d.shots[0]
        ctx.shotText = `${s.title}：${s.description}`
      }
    } else if (d.kind === 'image' && isEntityPreset(d.preset)) {
      collectEntity(src) // 实体节点直连视频
    } else if (d.kind === 'image' || d.kind === 'asset') {
      if (!ctx.shotText && d.prompt.trim()) ctx.shotText = d.prompt.trim()
    }
  }
  // Seedance 参考图 ≤9
  if (entityRefs.length) ctx.entityRefs = entityRefs.slice(0, 9)
  return ctx
}

export type { ShotItem }
