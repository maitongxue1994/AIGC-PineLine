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
import type {
  AssetParams,
  CharacterParams,
  ImageParams,
  NodeKind,
  PineEdge,
  PineNode,
  PineNodeData,
  PropParams,
  SceneParams,
  ScriptParams,
  ShotItem,
  ShotParams,
  StoryboardParams,
} from './types'

type Position = { x: number; y: number }

// 撤销/重做的结构快照：节点数组是不可变更新的，快照只是引用拷贝，内存开销很小
type GraphSnapshot = { nodes: PineNode[]; edges: PineEdge[] }

type StudioState = {
  nodes: PineNode[]
  edges: PineEdge[]
  selectedNodeId: string | null
  projectName: string
  // 空画布模板引导卡：仅新工程初始态默认展示；清空=完全空白，可经「模板」按钮唤起
  guideOpen: boolean
  past: GraphSnapshot[]
  future: GraphSnapshot[]
  onNodesChange: (changes: NodeChange<PineNode>[]) => void
  onEdgesChange: (changes: EdgeChange<PineEdge>[]) => void
  onConnect: (conn: Connection) => void
  selectNode: (id: string | null) => void
  focusNode: (id: string) => void
  setProjectName: (name: string) => void
  setGuideOpen: (open: boolean) => void
  applyTemplate: (id: TemplateId) => string[]
  updateNodeParams: (id: string, patch: Partial<PineNodeData['params']>) => void
  updateNodeTitle: (id: string, title: string) => void
  updateNodeOutput: (id: string, output: string) => void
  addScriptNode: (position?: Position) => string
  addImageNode: (position?: Position) => string
  addStoryboardNode: (position?: Position) => string
  addSceneNode: (position?: Position) => string
  addCharacterNode: (position?: Position) => string
  addPropNode: (position?: Position) => string
  addShotNode: (position?: Position) => string
  addAssetNode: (dataUrl: string, position?: Position) => string
  duplicateNode: (id: string) => string | null
  deleteNode: (id: string) => void
  undo: () => void
  redo: () => void
  runNode: (id: string) => Promise<void>
  pipelineRunning: boolean
  // 自增信号：画布监听后执行 fitView（模板/Composer 铺链后自动把新节点带入视野）
  fitViewTick: number
  requestFitView: () => void
  runPipeline: (ids?: string[]) => Promise<void>
  createPipelineFromBrief: (brief: string) => string[]
  exportProject: () => string
  importProject: (raw: string) => void
  resetProject: () => void
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
    const out = source?.data.output
    if (out && !out.startsWith('data:image')) return out
  }
  return null
}

function expectParams<T>(node: PineNode, kind: NodeKind, ...required: (keyof T)[]): T {
  if (node.data.kind !== kind) {
    throw new Error(`节点类型不一致：期望 ${kind}，实际 ${node.data.kind}`)
  }
  const p = node.data.params as Record<string, unknown>
  for (const k of required) {
    if (!(k in p)) {
      throw new Error(`节点 params 缺少字段：${String(k)}（kind=${kind}）`)
    }
  }
  return node.data.params as unknown as T
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
    const o = src.data.output
    if (o && o.startsWith('data:image')) imgs.push(o)
    for (const extra of src.data.outputs ?? []) {
      if (extra && extra.startsWith('data:image')) imgs.push(extra)
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

function newNode(
  kind: NodeKind,
  title: string,
  params: PineNodeData['params'],
  position: Position,
): PineNode {
  const id = `${kind}-${crypto.randomUUID()}`
  return {
    id,
    type: kind,
    position,
    data: { kind, title, params, output: null, status: 'idle' },
  }
}

function sceneGridPrompts(desc: string): string[] {
  return [
    `${desc}，wide establishing shot, cinematic lighting`,
    `${desc}，medium shot looking in from the side, soft shadows`,
    `${desc}，close-up detail with shallow depth of field`,
    `${desc}，bird's-eye overhead view at night`,
  ]
}

function characterTriViewPrompts(desc: string): string[] {
  return [
    `${desc}，full-body front view, neutral pose, plain light-grey background, character reference sheet`,
    `${desc}，full-body side profile view, neutral pose, plain light-grey background, character reference sheet`,
    `${desc}，full-body back view, neutral pose, plain light-grey background, character reference sheet`,
  ]
}

function propTriViewPrompts(desc: string): string[] {
  return [
    `${desc}，studio product photo, front view, plain white background, soft shadow`,
    `${desc}，studio product photo, three-quarter angle view, plain white background, soft shadow`,
    `${desc}，studio product photo, top-down view, plain white background, soft shadow`,
  ]
}

function isImageDataUrl(s: string | null | undefined): boolean {
  return !!s && s.startsWith('data:image')
}

function stripHeavyOutputs(node: PineNode): PineNode {
  // localStorage 单 origin 上限 ~5MB；不持久化 base64 图片，文本输出（剧本 / 分镜列表）保留
  const data = node.data
  const lightOutput = isImageDataUrl(data.output) ? null : data.output
  const lightOutputs = data.outputs?.map((x) => (isImageDataUrl(x) ? null : x))
  return {
    ...node,
    data: {
      ...data,
      output: lightOutput,
      outputs: lightOutputs,
      // 重置 status 避免显示 running 假状态
      status: data.status === 'running' ? 'idle' : data.status,
    },
  }
}

const HISTORY_LIMIT = 50

/**
 * 撤销/重做只回退画布结构（节点增删、连线、导入/新建），不回退生成结果：
 * 恢复快照时按节点 id 把"当前"的 output / status 等运行产物合并回去，
 * 避免一次 Cmd+Z 把用户等了很久的生成图也撤掉。
 */
function withCurrentOutputs(
  snapNodes: PineNode[],
  curNodes: PineNode[],
): PineNode[] {
  const cur = new Map(curNodes.map((n) => [n.id, n]))
  return snapNodes.map((n) => {
    const c = cur.get(n.id)
    if (!c) return n
    return {
      ...n,
      data: {
        ...n.data,
        output: c.data.output,
        outputs: c.data.outputs,
        outputErrors: c.data.outputErrors,
        shots: c.data.shots,
        status: c.data.status,
        error: c.data.error,
      },
    }
  })
}

/**
 * 按 edges 做 Kahn 拓扑分层：同一层内节点彼此无依赖、可并发运行；
 * 后一层节点的所有上游都在前面的层里已运行完，从而能安全消费上游 output。
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
          guideOpen: false,
        }))
        return node.id
      }

      return {
  // v3 M2：默认空工程，首次体验交给空画布引导卡（模板）+ Composer
  nodes: [],
  edges: [],
  selectedNodeId: null,
  projectName: '未命名工程',
  guideOpen: true,
  past: [],
  future: [],
  pipelineRunning: false,
  fitViewTick: 0,

  onNodesChange: (changes) => {
    if (changes.some((c) => c.type === 'remove')) commit()
    set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) as PineNode[] }))
  },

  onEdgesChange: (changes) => {
    if (changes.some((c) => c.type === 'remove')) commit()
    set((s) => ({ edges: applyEdgeChanges(changes, s.edges) }))
  },

  onConnect: (conn) => {
    commit()
    set((s) => ({
      edges: addEdge(
        { ...conn, animated: true, style: { stroke: '#FF6A3D' } },
        s.edges,
      ),
    }))
  },

  selectNode: (id) => set({ selectedNodeId: id }),

  // 从二级面板点选：同步 ReactFlow 的 selected 标记，画布上真正高亮该节点
  focusNode: (id) =>
    set((s) => ({
      selectedNodeId: id,
      nodes: s.nodes.map((n) => ({ ...n, selected: n.id === id })),
    })),

  setProjectName: (name) => set({ projectName: name }),

  setGuideOpen: (open) => set({ guideOpen: open }),

  requestFitView: () => set((s) => ({ fitViewTick: s.fitViewTick + 1 })),

  // 模板 = 起一个新工作流：清空并替换画布（评审反馈）；commit 在前，⌘Z 一步可撤回原画布
  applyTemplate: (id) => {
    const tpl = buildTemplate(id)
    commit()
    set({
      nodes: tpl.nodes,
      edges: tpl.edges,
      selectedNodeId: tpl.nodes[0]?.id ?? null,
      guideOpen: false,
    })
    get().requestFitView()
    return tpl.nodes.map((n) => n.id)
  },

  updateNodeParams: (id, patch) =>
    set((s) => ({
      nodes: s.nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                params: { ...n.data.params, ...patch } as PineNodeData['params'],
              },
            }
          : n,
      ),
    })),

  updateNodeTitle: (id, title) =>
    set((s) => ({ nodes: mutateNode(s.nodes, id, { title }) })),

  updateNodeOutput: (id, output) =>
    set((s) => ({ nodes: mutateNode(s.nodes, id, { output }) })),

  addScriptNode: (position) =>
    pushNode(
      newNode(
        'script',
        '新剧本节点',
        { brief: '', tone: 'cinematic', length: 'short' } satisfies ScriptParams,
        positionFor(120, position),
      ),
    ),

  addImageNode: (position) =>
    pushNode(
      newNode(
        'image',
        '新概念图',
        { prompt: '', aspectRatio: '16:9' } satisfies ImageParams,
        positionFor(600, position),
      ),
    ),

  addStoryboardNode: (position) =>
    pushNode(
      newNode(
        'storyboard',
        '新分镜',
        { screenplay: '', splitter: '', mode: 'auto' } satisfies StoryboardParams,
        positionFor(520, position),
      ),
    ),

  addSceneNode: (position) =>
    pushNode(
      newNode(
        'scene',
        '新场景',
        { description: '', aspectRatio: '16:9' } satisfies SceneParams,
        positionFor(520, position),
      ),
    ),

  addCharacterNode: (position) =>
    pushNode(
      newNode(
        'character',
        '新角色',
        { description: '' } satisfies CharacterParams,
        positionFor(520, position),
      ),
    ),

  addPropNode: (position) =>
    pushNode(
      newNode(
        'prop',
        '新道具',
        { description: '' } satisfies PropParams,
        positionFor(520, position),
      ),
    ),

  addShotNode: (position) =>
    pushNode(
      newNode(
        'shot',
        '新分镜图',
        { shotDescription: '', aspectRatio: '16:9' } satisfies ShotParams,
        positionFor(900, position),
      ),
    ),

  addAssetNode: (dataUrl, position) => {
    const node = newNode(
      'asset',
      '上传素材',
      {} satisfies AssetParams,
      positionFor(320, position),
    )
    // output 即素材本体，节点天然处于 done 态，可直接被下游引用
    node.data.output = dataUrl
    node.data.status = 'done'
    return pushNode(node)
  },

  duplicateNode: (id) => {
    const src = get().nodes.find((n) => n.id === id)
    if (!src) return null
    const copy = newNode(
      src.data.kind,
      `${src.data.title} 副本`,
      { ...src.data.params } as PineNodeData['params'],
      { x: src.position.x + 48, y: src.position.y + 48 },
    )
    // 素材节点的 output 就是内容本身，复制时保留；生成类节点则重置为待运行
    if (src.data.kind === 'asset') {
      copy.data.output = src.data.output
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
    if (!node) return

    // 上传素材节点不调模型，output 即内容本身
    if (node.data.kind === 'asset') return

    set({
      nodes: mutateNode(state.nodes, id, { status: 'running', error: undefined }),
    })

    try {
      switch (node.data.kind) {
        case 'script': {
          const p = expectParams<ScriptParams>(node, 'script', 'brief', 'tone', 'length')
          const res = await generateScript({
            brief: p.brief,
            tone: p.tone,
            length: p.length,
          })
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'done',
              output: res.script,
            }),
          }))
          break
        }
        case 'image': {
          const p = expectParams<ImageParams>(node, 'image', 'prompt', 'aspectRatio')
          const upstream = getUpstreamTextOutput(state.nodes, state.edges, id)
          const prompt = p.prompt?.trim() || upstream || ''
          if (!prompt)
            throw new Error('缺少 prompt：请在节点内输入，或从上游节点连线')
          const refImgs = collectUpstreamImages(state.nodes, state.edges, id)
          const res = await generateImage({
            prompt,
            referenceImages: refImgs.length ? refImgs : undefined,
            aspectRatio: p.aspectRatio,
          })
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'done',
              output: res.image,
            }),
          }))
          break
        }
        case 'storyboard': {
          const p = expectParams<StoryboardParams>(node, 'storyboard', 'mode')
          const upstream = getUpstreamTextOutput(state.nodes, state.edges, id)
          const screenplay = p.screenplay?.trim() || upstream || ''
          if (!screenplay)
            throw new Error('缺少剧本：请粘贴或从上游「剧本」节点连线')
          const res = await generateStoryboard({
            screenplay,
            splitter: p.mode === 'manual' ? p.splitter : undefined,
          })
          const shotsText = res.shots
            .map((s, i) => `#${i + 1} ${s.title}\n${s.description}`)
            .join('\n\n')
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'done',
              shots: res.shots,
              output: shotsText,
            }),
          }))
          break
        }
        case 'scene': {
          const p = expectParams<SceneParams>(node, 'scene', 'description', 'aspectRatio')
          const desc = p.description?.trim()
          if (!desc) throw new Error('请先填写场景描述')
          const res = await generateImageGrid({
            prompts: sceneGridPrompts(desc),
            aspectRatio: p.aspectRatio,
          })
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'done',
              outputs: res.images,
              outputErrors: res.errors,
              output: res.images.find((x) => !!x) ?? null,
            }),
          }))
          break
        }
        case 'character': {
          const p = expectParams<CharacterParams>(node, 'character', 'description')
          const desc = p.description?.trim()
          if (!desc) throw new Error('请先填写角色描述')
          // v3：参考图不再是参数，统一从连入的上游节点（如上传素材）收集
          const charRefs = collectUpstreamImages(state.nodes, state.edges, id)
          const res = await generateImageGrid({
            prompts: characterTriViewPrompts(desc),
            referenceImages: charRefs.length ? charRefs : undefined,
          })
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'done',
              outputs: res.images,
              outputErrors: res.errors,
              output: res.images.find((x) => !!x) ?? null,
            }),
          }))
          break
        }
        case 'prop': {
          const p = expectParams<PropParams>(node, 'prop', 'description')
          const desc = p.description?.trim()
          if (!desc) throw new Error('请先填写道具描述')
          const propRefs = collectUpstreamImages(state.nodes, state.edges, id)
          const res = await generateImageGrid({
            prompts: propTriViewPrompts(desc),
            referenceImages: propRefs.length ? propRefs : undefined,
          })
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'done',
              outputs: res.images,
              outputErrors: res.errors,
              output: res.images.find((x) => !!x) ?? null,
            }),
          }))
          break
        }
        case 'shot': {
          const p = expectParams<ShotParams>(node, 'shot', 'shotDescription', 'aspectRatio')
          const upstreamText = getUpstreamTextOutput(state.nodes, state.edges, id)
          const desc = p.shotDescription?.trim() || firstShotDescription(upstreamText)
          if (!desc) throw new Error('请填写分镜图描述，或从上游「分镜」节点连线')
          const refImgs = collectUpstreamImages(state.nodes, state.edges, id)
          const res = await generateImage({
            prompt: desc,
            referenceImages: refImgs.length ? refImgs : undefined,
            aspectRatio: p.aspectRatio,
          })
          set((s) => ({
            nodes: mutateNode(s.nodes, id, {
              status: 'done',
              output: res.image,
            }),
          }))
          break
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      set((s) => ({
        nodes: mutateNode(s.nodes, id, { status: 'error', error: msg }),
      }))
    }
  },

  runPipeline: async (ids) => {
    if (get().pipelineRunning) return
    set({ pipelineRunning: true })
    try {
      const { nodes, edges, runNode } = get()
      // 传 ids 时只跑指定子图（如 Composer 刚创建的链），不重跑画布上其他节点
      const subset = ids ? nodes.filter((n) => ids.includes(n.id)) : nodes
      const subIds = new Set(subset.map((n) => n.id))
      const subEdges = edges.filter(
        (e) => subIds.has(e.source) && subIds.has(e.target),
      )
      const layers = topoLayers(subset, subEdges)
      for (const layer of layers) {
        // 单节点失败由 runNode 自行兜成 error 状态，不阻断整条管线
        await Promise.allSettled(layer.map((nid) => runNode(nid)))
      }
    } finally {
      set({ pipelineRunning: false })
    }
  },

  createPipelineFromBrief: (brief) => {
    // 放在现有节点下方一行，避免叠在已有内容上
    const baseY =
      get().nodes.reduce((m, n) => Math.max(m, n.position.y), 0) + 320
    const script = newNode(
      'script',
      '剧本 · 来自 Composer',
      { brief, tone: 'cinematic', length: 'short' } satisfies ScriptParams,
      { x: 80, y: baseY },
    )
    const storyboard = newNode(
      'storyboard',
      '分镜 · 自动拆分',
      { screenplay: '', splitter: '', mode: 'auto' } satisfies StoryboardParams,
      { x: 560, y: baseY },
    )
    const shot = newNode(
      'shot',
      '分镜图 · 首镜',
      { shotDescription: '', aspectRatio: '16:9' } satisfies ShotParams,
      { x: 1040, y: baseY },
    )
    // commit 在 150ms 窗口内合并，整条链的创建是一步撤销
    commit()
    set((s) => ({
      nodes: [...s.nodes, script, storyboard, shot],
      edges: [
        ...s.edges,
        {
          id: `e-${script.id}-${storyboard.id}`,
          source: script.id,
          target: storyboard.id,
          animated: true,
          style: { stroke: '#FF6A3D' },
        },
        {
          id: `e-${storyboard.id}-${shot.id}`,
          source: storyboard.id,
          target: shot.id,
          animated: true,
          style: { stroke: '#FF6A3D' },
        },
      ],
      selectedNodeId: script.id,
      guideOpen: false,
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
        version: 1,
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
    commit()
    set({
      nodes: obj.nodes as PineNode[],
      // 旧版工程文件的边可能带已废弃的 shot 多桩 handle id，剥离之
      edges: (obj.edges as PineEdge[]).map((e) => ({
        ...e,
        sourceHandle: undefined,
        targetHandle: undefined,
      })),
      ...(typeof obj.projectName === 'string' && obj.projectName.trim()
        ? { projectName: obj.projectName.trim() }
        : {}),
      selectedNodeId: null,
      pipelineRunning: false,
      guideOpen: false,
    })
  },

  // 清空 = 完全空白画布（不强弹引导卡，可经「模板」按钮唤起）
  resetProject: () => {
    commit()
    set({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      pipelineRunning: false,
      guideOpen: false,
    })
  },
      }
    },
    {
      name: 'pineline-studio-v1',
      version: 3,
      storage: createJSONStorage(() => localStorage),
      // v2：shot 节点从 4 个分色输入桩收敛为单桩，旧边携带的 handle id
      // （text/scene/character/prop）已不存在，剥离后 ReactFlow 才能正常渲染
      // v3：新增 projectName / guideOpen；老用户画布有内容时不弹引导卡
      migrate: (persisted, version) => {
        const s = persisted as StudioState
        if (Array.isArray(s?.edges)) {
          s.edges = s.edges.map((e) => ({
            ...e,
            sourceHandle: undefined,
            targetHandle: undefined,
          }))
        }
        if (version < 3) {
          s.projectName = s.projectName || '未命名工程'
          s.guideOpen = !(Array.isArray(s.nodes) && s.nodes.length > 0)
        }
        return s
      },
      partialize: (state) =>
        ({
          nodes: state.nodes.map(stripHeavyOutputs),
          edges: state.edges,
          selectedNodeId: state.selectedNodeId,
          projectName: state.projectName,
          guideOpen: state.guideOpen,
        }) as unknown as StudioState,
    },
  ),
)

function firstShotDescription(text: string | null): string {
  if (!text) return ''
  const first = text.split(/\n\n/)[0] ?? ''
  return first.replace(/^#\d+\s+[^\n]*\n?/, '').trim()
}

export type { ShotItem }
