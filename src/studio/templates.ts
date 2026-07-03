import { buildNode } from './nodeCatalog'
import type { PineEdge, PineNode } from './types'

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

function edge(source: PineNode, target: PineNode): PineEdge {
  return { id: `e-${source.id}-${target.id}`, source: source.id, target: target.id }
}

/** 按模板铺出预连好、预填示例内容的节点链（落点由调用方平移） */
export function buildTemplate(id: TemplateId): {
  nodes: PineNode[]
  edges: PineEdge[]
} {
  switch (id) {
    case 'drama': {
      const script = buildNode('text', 'script', { x: 80, y: 80 }, {
        title: '剧本 · SC01',
        prompt:
          '雨夜的城市屋顶，一个撑伞的年轻人等着什么。远处霓虹闪烁，无人机群正缓缓升起。',
      })
      const storyboard = buildNode('text', 'storyboard', { x: 560, y: 80 }, {
        title: '分镜 · 自动拆分',
      })
      const shot = buildNode('image', 'shot', { x: 1040, y: 80 }, {
        title: '分镜图 · 首镜',
      })
      return {
        nodes: [script, storyboard, shot],
        edges: [edge(script, storyboard), edge(storyboard, shot)],
      }
    }
    case 'product-ad': {
      const scene = buildNode('image', 'scene-grid', { x: 80, y: 60 }, {
        title: '场景 · 摄影棚',
        prompt: '极简摄影棚，柔光，浅灰背景台面，商业产品摄影布光',
      })
      const prop = buildNode('image', 'prop-triview', { x: 80, y: 560 }, {
        title: '道具 · 产品',
        prompt: '一瓶磨砂玻璃香水，金色瓶盖，刻字细节',
      })
      const shot = buildNode('image', 'shot', { x: 560, y: 300 }, {
        title: '合成镜头 · 主画面',
        prompt: '香水置于台面中央，柔光环绕，浅景深，广告级质感',
      })
      return {
        nodes: [scene, prop, shot],
        edges: [edge(scene, shot), edge(prop, shot)],
      }
    }
    case 'mv': {
      const scene = buildNode('image', 'scene-grid', { x: 80, y: 80 }, {
        title: '场景 · 霓虹雨夜',
        prompt: '霓虹雨夜街头，蒸汽升腾，电影感逆光，青橙色调',
        params: { aspectRatio: '9:16' },
      })
      const shot = buildNode('image', 'shot', { x: 560, y: 80 }, {
        title: '分镜图 · 开场',
        prompt: '歌手剪影走过霓虹灯牌下，雨水反光，慢门拖影',
        params: { aspectRatio: '9:16' },
      })
      return { nodes: [scene, shot], edges: [edge(scene, shot)] }
    }
  }
}
