import { create } from 'zustand'
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
      if (extra.startsWith('data:image')) imgs.push(extra)
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
  const id = `${kind}-${Date.now()}`
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

export const useStudioStore = create<StudioState>((set, get) => ({
  nodes: defaultNodes,
  edges: defaultEdges,
  selectedNodeId: 'script-1',

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
          const p = node.data.params as ScriptParams
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
          const p = node.data.params as ImageParams
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
          const p = node.data.params as StoryboardParams
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
          const p = node.data.params as SceneParams
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
              output: res.images[0] ?? null,
            }),
          }))
          break
        }
        case 'character': {
          const p = node.data.params as CharacterParams
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
              output: res.images[0] ?? null,
            }),
          }))
          break
        }
        case 'prop': {
          const p = node.data.params as PropParams
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
              output: res.images[0] ?? null,
            }),
          }))
          break
        }
        case 'shot': {
          const p = node.data.params as ShotParams
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
}))

function firstShotDescription(text: string | null): string {
  if (!text) return ''
  const first = text.split(/\n\n/)[0] ?? ''
  return first.replace(/^#\d+\s+[^\n]*\n?/, '').trim()
}

export type { ShotItem }
