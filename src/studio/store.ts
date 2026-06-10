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
import { defaultEdges, defaultNodes } from './defaultGraph'
import {
  generateImage,
  generateImageGrid,
  generateScript,
  generateStoryboard,
} from './api'
import type {
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

type StudioState = {
  nodes: PineNode[]
  edges: PineEdge[]
  selectedNodeId: string | null
  onNodesChange: (changes: NodeChange<PineNode>[]) => void
  onEdgesChange: (changes: EdgeChange<PineEdge>[]) => void
  onConnect: (conn: Connection) => void
  selectNode: (id: string | null) => void
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
  deleteNode: (id: string) => void
  runNode: (id: string) => Promise<void>
  pipelineRunning: boolean
  runPipeline: () => Promise<void>
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
    (set, get) => ({
  nodes: defaultNodes,
  edges: defaultEdges,
  selectedNodeId: 'script-1',
  pipelineRunning: false,

  onNodesChange: (changes) =>
    set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) as PineNode[] })),

  onEdgesChange: (changes) =>
    set((s) => ({ edges: applyEdgeChanges(changes, s.edges) })),

  onConnect: (conn) =>
    set((s) => ({
      edges: addEdge(
        { ...conn, animated: true, style: { stroke: '#FF6A3D' } },
        s.edges,
      ),
    })),

  selectNode: (id) => set({ selectedNodeId: id }),

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

  addScriptNode: (position) => {
    const node = newNode(
      'script',
      '新剧本节点',
      { brief: '', tone: 'cinematic', length: 'short' } satisfies ScriptParams,
      positionFor(120, position),
    )
    set((s) => ({ nodes: [...s.nodes, node], selectedNodeId: node.id }))
    return node.id
  },

  addImageNode: (position) => {
    const node = newNode(
      'image',
      '新概念图',
      { prompt: '', aspectRatio: '16:9' } satisfies ImageParams,
      positionFor(600, position),
    )
    set((s) => ({ nodes: [...s.nodes, node], selectedNodeId: node.id }))
    return node.id
  },

  addStoryboardNode: (position) => {
    const node = newNode(
      'storyboard',
      '新分镜',
      { screenplay: '', splitter: '', mode: 'auto' } satisfies StoryboardParams,
      positionFor(520, position),
    )
    set((s) => ({ nodes: [...s.nodes, node], selectedNodeId: node.id }))
    return node.id
  },

  addSceneNode: (position) => {
    const node = newNode(
      'scene',
      '新场景',
      { description: '', aspectRatio: '16:9' } satisfies SceneParams,
      positionFor(520, position),
    )
    set((s) => ({ nodes: [...s.nodes, node], selectedNodeId: node.id }))
    return node.id
  },

  addCharacterNode: (position) => {
    const node = newNode(
      'character',
      '新角色',
      { description: '' } satisfies CharacterParams,
      positionFor(520, position),
    )
    set((s) => ({ nodes: [...s.nodes, node], selectedNodeId: node.id }))
    return node.id
  },

  addPropNode: (position) => {
    const node = newNode(
      'prop',
      '新道具',
      { description: '' } satisfies PropParams,
      positionFor(520, position),
    )
    set((s) => ({ nodes: [...s.nodes, node], selectedNodeId: node.id }))
    return node.id
  },

  addShotNode: (position) => {
    const node = newNode(
      'shot',
      '新分镜图',
      { shotDescription: '', aspectRatio: '16:9' } satisfies ShotParams,
      positionFor(900, position),
    )
    set((s) => ({ nodes: [...s.nodes, node], selectedNodeId: node.id }))
    return node.id
  },

  deleteNode: (id) =>
    set((s) => ({
      nodes: s.nodes.filter((n) => n.id !== id),
      edges: s.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: s.selectedNodeId === id ? null : s.selectedNodeId,
    })),

  runNode: async (id) => {
    const state = get()
    const node = state.nodes.find((n) => n.id === id)
    if (!node) return

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
            referenceImage: p.referenceImage,
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
          const res = await generateImageGrid({
            prompts: characterTriViewPrompts(desc),
            referenceImages: p.referenceImage ? [p.referenceImage] : undefined,
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
          const res = await generateImageGrid({
            prompts: propTriViewPrompts(desc),
            referenceImages: p.referenceImage ? [p.referenceImage] : undefined,
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

  runPipeline: async () => {
    if (get().pipelineRunning) return
    set({ pipelineRunning: true })
    try {
      const { nodes, edges, runNode } = get()
      const layers = topoLayers(nodes, edges)
      for (const layer of layers) {
        // 单节点失败由 runNode 自行兜成 error 状态，不阻断整条管线
        await Promise.allSettled(layer.map((nid) => runNode(nid)))
      }
    } finally {
      set({ pipelineRunning: false })
    }
  },

  exportProject: () => {
    const { nodes, edges } = get()
    // 内存中保留完整 base64 图片，导出文件因此是用户可留存/转交的完整工程
    return JSON.stringify(
      { app: 'pineline', version: 1, exportedAt: new Date().toISOString(), nodes, edges },
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
    const obj = data as { nodes?: unknown; edges?: unknown }
    if (!obj || !Array.isArray(obj.nodes) || !Array.isArray(obj.edges)) {
      throw new Error('工程文件格式不正确：缺少 nodes / edges 数组')
    }
    set({
      nodes: obj.nodes as PineNode[],
      edges: obj.edges as PineEdge[],
      selectedNodeId: null,
      pipelineRunning: false,
    })
  },

  resetProject: () =>
    set({
      nodes: defaultNodes,
      edges: defaultEdges,
      selectedNodeId: 'script-1',
      pipelineRunning: false,
    }),
    }),
    {
      name: 'pineline-studio-v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({
          nodes: state.nodes.map(stripHeavyOutputs),
          edges: state.edges,
          selectedNodeId: state.selectedNodeId,
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
