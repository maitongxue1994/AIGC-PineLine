import type { PineEdge, PineNode, PineNodeData } from './types'

export type TemplateId = 'drama' | 'product-ad' | 'mv'

export const TEMPLATES: {
  id: TemplateId
  emoji: string
  title: string
  desc: string
}[] = [
  { id: 'drama', emoji: '🎬', title: '短剧', desc: '剧本 → 分镜 → 分镜图' },
  { id: 'product-ad', emoji: '📦', title: '产品广告', desc: '场景 + 道具 → 合成镜头' },
  { id: 'mv', emoji: '🎵', title: 'MV', desc: '场景四宫格 → 分镜图' },
]

function node(
  kind: PineNodeData['kind'],
  title: string,
  params: PineNodeData['params'],
  x: number,
  y: number,
): PineNode {
  return {
    id: `${kind}-${crypto.randomUUID()}`,
    type: kind,
    position: { x, y },
    data: { kind, title, params, output: null, status: 'idle' },
  }
}

function edge(source: PineNode, target: PineNode): PineEdge {
  return {
    id: `e-${source.id}-${target.id}`,
    source: source.id,
    target: target.id,
    animated: true,
    style: { stroke: '#FF6A3D' },
  }
}

/** 按模板铺出预连好、预填示例内容的节点链（落点由调用方平移） */
export function buildTemplate(id: TemplateId): {
  nodes: PineNode[]
  edges: PineEdge[]
} {
  switch (id) {
    case 'drama': {
      const script = node(
        'script',
        '剧本 · SC01',
        {
          brief:
            '雨夜的城市屋顶，一个撑伞的年轻人等着什么。远处霓虹闪烁，无人机群正缓缓升起。',
          tone: 'cinematic',
          length: 'short',
        },
        80,
        80,
      )
      const storyboard = node(
        'storyboard',
        '分镜 · 自动拆分',
        { screenplay: '', splitter: '', mode: 'auto' },
        560,
        80,
      )
      const shot = node(
        'shot',
        '分镜图 · 首镜',
        { shotDescription: '', aspectRatio: '16:9' },
        1040,
        80,
      )
      return {
        nodes: [script, storyboard, shot],
        edges: [edge(script, storyboard), edge(storyboard, shot)],
      }
    }
    case 'product-ad': {
      const scene = node(
        'scene',
        '场景 · 摄影棚',
        { description: '极简摄影棚，柔光，浅灰背景台面，商业产品摄影布光', aspectRatio: '16:9' },
        80,
        60,
      )
      const prop = node(
        'prop',
        '道具 · 产品',
        { description: '一瓶磨砂玻璃香水，金色瓶盖，刻字细节' },
        80,
        560,
      )
      const shot = node(
        'shot',
        '合成镜头 · 主画面',
        {
          shotDescription: '香水置于台面中央，柔光环绕，浅景深，广告级质感',
          aspectRatio: '16:9',
        },
        560,
        300,
      )
      return {
        nodes: [scene, prop, shot],
        edges: [edge(scene, shot), edge(prop, shot)],
      }
    }
    case 'mv': {
      const scene = node(
        'scene',
        '场景 · 霓虹雨夜',
        { description: '霓虹雨夜街头，蒸汽升腾，电影感逆光，青橙色调', aspectRatio: '9:16' },
        80,
        80,
      )
      const shot = node(
        'shot',
        '分镜图 · 开场',
        {
          shotDescription: '歌手剪影走过霓虹灯牌下，雨水反光，慢门拖影',
          aspectRatio: '9:16',
        },
        560,
        80,
      )
      return { nodes: [scene, shot], edges: [edge(scene, shot)] }
    }
  }
}
