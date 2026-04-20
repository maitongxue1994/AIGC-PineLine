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
import { generateImage, generateScript } from './api'
import type {
  ImageParams,
  PineEdge,
  PineNode,
  PineNodeData,
  ScriptParams,
} from './types'

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
  addScriptNode: (position?: { x: number; y: number }) => string
  addImageNode: (position?: { x: number; y: number }) => string
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

function getUpstreamOutput(
  nodes: PineNode[],
  edges: PineEdge[],
  nodeId: string,
): string | null {
  const incoming = edges.find((e) => e.target === nodeId)
  if (!incoming) return null
  const source = nodes.find((n) => n.id === incoming.source)
  return source?.data.output ?? null
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
          ? { ...n, data: { ...n.data, params: { ...n.data.params, ...patch } as PineNodeData['params'] } }
          : n,
      ),
    })),

  updateNodeTitle: (id, title) =>
    set((s) => ({ nodes: mutateNode(s.nodes, id, { title }) })),

  updateNodeOutput: (id, output) =>
    set((s) => ({ nodes: mutateNode(s.nodes, id, { output }) })),

  addScriptNode: (position) => {
    const id = `script-${Date.now()}`
    const newNode: PineNode = {
      id,
      type: 'script',
      position: position ?? {
        x: 120 + Math.random() * 80,
        y: 360 + Math.random() * 80,
      },
      data: {
        kind: 'script',
        title: '新剧本节点',
        params: { brief: '', tone: 'cinematic', length: 'short' },
        output: null,
        status: 'idle',
      },
    }
    set((s) => ({ nodes: [...s.nodes, newNode], selectedNodeId: id }))
    return id
  },

  addImageNode: (position) => {
    const id = `image-${Date.now()}`
    const newNode: PineNode = {
      id,
      type: 'image',
      position: position ?? {
        x: 600 + Math.random() * 80,
        y: 360 + Math.random() * 80,
      },
      data: {
        kind: 'image',
        title: '新概念图',
        params: { prompt: '', aspectRatio: '16:9' },
        output: null,
        status: 'idle',
      },
    }
    set((s) => ({ nodes: [...s.nodes, newNode], selectedNodeId: id }))
    return id
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

    set({ nodes: mutateNode(state.nodes, id, { status: 'running', error: undefined }) })

    try {
      if (node.data.kind === 'script') {
        const p = node.data.params as ScriptParams
        const res = await generateScript({
          brief: p.brief,
          tone: p.tone,
          length: p.length,
        })
        set((s) => ({
          nodes: mutateNode(s.nodes, id, { status: 'done', output: res.script }),
        }))
      } else {
        const p = node.data.params as ImageParams
        const upstream = getUpstreamOutput(state.nodes, state.edges, id)
        const prompt = p.prompt?.trim() || upstream || ''
        if (!prompt) throw new Error('缺少 prompt：请在节点内输入，或从上游节点连线')
        const res = await generateImage({
          prompt,
          referenceImage: p.referenceImage,
          aspectRatio: p.aspectRatio,
        })
        set((s) => ({
          nodes: mutateNode(s.nodes, id, { status: 'done', output: res.image }),
        }))
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      set((s) => ({
        nodes: mutateNode(s.nodes, id, { status: 'error', error: msg }),
      }))
    }
  },
}))
