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
  generateImage,
  generateImageGrid,
  generateScript,
  generateStoryboard,
} from './api'
import {
  buildNode,
  estimateCost,
  gridPrompts,
  GRID_VIEW_LABELS,
  INITIAL_CREDITS,
  presetMeta,
} from './nodeCatalog'
import { migrateGraph, migrateLegacyEdge } from './migrate'
import { appendHistory } from './assetdb'
import {
  activeContent,
  isImageContent,
  type NodeKind,
  type NodeParams,
  type NodePreset,
  type NodeVersion,
  type PinColor,
  type PineEdge,
  type PineNode,
  type PineNodeData,
  type ShotItem,
} from './types'

type Position = { x: number; y: number }

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
  setPreset: (id: string, preset: NodePreset) => void
  setPrompt: (id: string, prompt: string) => void
  updateNodeParams: (id: string, patch: Partial<NodeParams>) => void
  updateNodeTitle: (id: string, title: string) => void
  /** 编辑当前激活版本的正文（文本节点产出可改写） */
  updateActiveContent: (id: string, content: string) => void
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
    },
  ) => Promise<void>
  pipelineRunning: boolean
  // 自增信号：画布监听后执行 fitView（模板/建链后自动把新节点带入视野）
  fitViewTick: number
  requestFitView: () => void
  runPipeline: (ids?: string[]) => Promise<void>
  createPipelineFromBrief: (brief: string) => string[]
  exportProject: () => string
  importProject: (raw: string) => void
  resetProject: () => void
  resetCredits: () => void
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
 * 持久化前的瘦身：localStorage 单 origin 上限 ~5MB，base64 图片不落盘。
 * 关键（审计修复）：图片被剥离的节点 status 归位 idle、清空错误——
 * 刷新后用户看到「待运行」，而不是残缺的「完成」或误报的「生成失败」。
 */
function stripHeavyOutputs(node: PineNode): PineNode {
  const data = node.data
  const hasImage = data.versions.some((v) => isImageContent(v.content))
  if (!hasImage) {
    return data.status === 'running'
      ? { ...node, data: { ...data, status: 'idle' } }
      : node
  }
  return {
    ...node,
    data: {
      ...data,
      versions: [],
      activeVersion: 0,
      status: 'idle',
      error: undefined,
    },
  }
}

const HISTORY_LIMIT = 50

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
            { x: src.position.x + 48, y: src.position.y + 48 },
            {
              title: `${src.data.title} 副本`,
              prompt: src.data.prompt,
              params: { ...src.data.params },
            },
          )
          // 素材节点的版本就是内容本身，复制时保留；生成类节点则重置为待运行
          if (src.data.kind === 'asset') {
            copy.data.versions = src.data.versions
            copy.data.activeVersion = src.data.activeVersion
            copy.data.status = src.data.status
          }
          return pushNode(copy)
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
              data: { ...n.data, versions: n.data.kind === 'asset' ? n.data.versions : [], activeVersion: 0, status: n.data.kind === 'asset' ? n.data.status : ('idle' as const), error: undefined },
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
              const gridLabels =
                preset && preset in GRID_VIEW_LABELS
                  ? GRID_VIEW_LABELS[preset as keyof typeof GRID_VIEW_LABELS]
                  : null

              if (gridLabels) {
                // 三视图/四宫格：固定视角 prompt 组
                const desc = node.data.prompt.trim()
                if (!desc) throw new Error('请先填写描述')
                const prompts = gridPrompts(preset as never, desc)!
                const res = await generateImageGrid({
                  prompts,
                  referenceImages: refImgs.length ? refImgs : undefined,
                  aspectRatio: params.aspectRatio,
                  quality: params.quality,
                })
                const gridVersions = res.images.map((img, i) =>
                  newVersion(img, gridLabels[i], res.errors?.[i] ?? null),
                )
                safeSet(g, (s) => ({
                  nodes: mutateNode(s.nodes, id, {
                    status: 'done',
                    versions: gridVersions,
                    activeVersion: Math.max(0, res.images.findIndex((x) => !!x)),
                  }),
                }))
                recordHistory(id, 'image', preset, desc, gridVersions)
              } else {
                const fallback =
                  preset === 'shot' ? firstShotDescription(upstreamText) : upstreamText || ''
                const basePrompt = node.data.prompt.trim() || fallback || ''
                if (!basePrompt)
                  throw new Error('缺少提示词：请在下方输入，或从上游节点连线')
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
                  const res = await generateImage({
                    prompt,
                    referenceImages: refImgs.length ? refImgs : undefined,
                    aspectRatio: params.aspectRatio,
                    quality: params.quality,
                  })
                  const oneVersion = [newVersion(res.image)]
                  safeSet(g, (s) => ({
                    nodes: mutateNode(s.nodes, id, {
                      status: 'done',
                      versions: oneVersion,
                      activeVersion: 0,
                    }),
                  }))
                  recordHistory(id, 'image', preset, prompt, oneVersion)
                }
              }
            }
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err)
            safeSet(g, (s) => ({
              nodes: mutateNode(s.nodes, id, { status: 'error', error: msg }),
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
            // 传 ids 时只跑指定子图（如 Agent 刚创建的链），不重跑画布上其他节点
            const subset = ids ? nodes.filter((n) => ids.includes(n.id)) : nodes
            const subIds = new Set(subset.map((n) => n.id))
            const subEdges = edges.filter(
              (e) => subIds.has(e.source) && subIds.has(e.target),
            )
            const layers = topoLayers(subset, subEdges)
            for (const layer of layers) {
              if (g !== generation) break
              // 单节点失败由 runNode 自行兜成 error 状态，不阻断整条管线
              await Promise.allSettled(layer.map((nid) => runNode(nid)))
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
      }
    },
    {
      name: 'pineline-studio-v1',
      version: 4,
      storage: createJSONStorage(() => localStorage),
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
        }) as unknown as StudioState,
    },
  ),
)

/** 内存剪贴板（模块级：跨组件共享，刷新即失效） */
let clipboard: Clipboard = null

/** 生成历史（IndexedDB，非关键路径，失败静默） */
function recordHistory(
  nodeId: string,
  kind: 'text' | 'image',
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

function firstShotDescription(text: string | null): string {
  if (!text) return ''
  const first = text.split(/\n\n/)[0] ?? ''
  return first.replace(/^#\d+\s+[^\n]*\n?/, '').trim()
}

export type { ShotItem }
