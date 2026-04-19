import type { PineEdge, PineNode } from './types'

export const defaultNodes: PineNode[] = [
  {
    id: 'script-1',
    type: 'script',
    position: { x: 80, y: 120 },
    data: {
      kind: 'script',
      title: '剧本节点 · SC01',
      params: {
        brief: '雨夜的城市屋顶，一个撑伞的年轻人等着什么。远处霓虹闪烁，无人机群正缓缓升起。',
        tone: 'cinematic',
        length: 'short',
      },
      output: null,
      status: 'idle',
    },
  },
  {
    id: 'image-1',
    type: 'image',
    position: { x: 560, y: 120 },
    data: {
      kind: 'image',
      title: '概念图 · KEY01',
      params: {
        prompt: '',
        aspectRatio: '16:9',
      },
      output: null,
      status: 'idle',
    },
  },
]

export const defaultEdges: PineEdge[] = [
  {
    id: 'e-script-image',
    source: 'script-1',
    target: 'image-1',
    animated: true,
    style: { stroke: '#FF6A3D' },
  },
]
