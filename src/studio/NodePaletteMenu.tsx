import { useLayoutEffect, useRef, useState } from 'react'
import {
  Box,
  Camera,
  FileText,
  Image as ImageIcon,
  Layers,
  Megaphone,
  Mountain,
  Music,
  Package,
  Type,
  User,
  Video,
} from 'lucide-react'
import type { NodeKind, NodePreset } from './types'
import { KIND_ACCENTS } from './nodeCatalog'

export type PaletteChoice = { kind: NodeKind; preset: NodePreset | null }

type Props = {
  x: number
  y: number
  onPick: (choice: PaletteChoice) => void
  onClose: () => void
}

type Item = {
  choice?: PaletteChoice
  title: string
  desc: string
  color: string
  icon: React.ReactNode
  disabled?: boolean
}

type Group = { title: string; items: Item[] }

const GROUPS: Group[] = [
  {
    title: '文本',
    items: [
      {
        choice: { kind: 'text', preset: 'script' },
        title: '剧本',
        desc: '创意简述 → 完整剧本',
        color: KIND_ACCENTS.text,
        icon: <FileText size={14} />,
      },
      {
        choice: { kind: 'text', preset: 'storyboard' },
        title: '分镜',
        desc: '把剧本拆成镜头序列',
        color: KIND_ACCENTS.text,
        icon: <Layers size={14} />,
      },
      {
        choice: { kind: 'text', preset: 'ad-copy' },
        title: '广告词',
        desc: '主标语 / 品牌文案',
        color: KIND_ACCENTS.text,
        icon: <Megaphone size={14} />,
      },
      {
        choice: { kind: 'text', preset: 'free' },
        title: '自由文本',
        desc: '任意文字内容',
        color: KIND_ACCENTS.text,
        icon: <Type size={14} />,
      },
    ],
  },
  {
    title: '图片',
    items: [
      {
        choice: { kind: 'image', preset: 'single' },
        title: '单图',
        desc: '快速文生图 / 图生图',
        color: KIND_ACCENTS.image,
        icon: <ImageIcon size={14} />,
      },
      {
        choice: { kind: 'image', preset: 'shot' },
        title: '分镜图',
        desc: '多参考合成一张',
        color: KIND_ACCENTS.image,
        icon: <Camera size={14} />,
      },
      {
        choice: { kind: 'image', preset: 'scene-grid' },
        title: '场景四宫格',
        desc: '全景/侧视/特写/俯瞰',
        color: KIND_ACCENTS.image,
        icon: <Mountain size={14} />,
      },
      {
        choice: { kind: 'image', preset: 'char-triview' },
        title: '角色三视图',
        desc: '前/侧/背',
        color: KIND_ACCENTS.image,
        icon: <User size={14} />,
      },
      {
        choice: { kind: 'image', preset: 'prop-triview' },
        title: '道具三视图',
        desc: '正面/侧角/俯视',
        color: KIND_ACCENTS.image,
        icon: <Package size={14} />,
      },
    ],
  },
  {
    title: '更多',
    items: [
      { choice: { kind: 'video', preset: null }, title: '视频', desc: '上传/剪辑/截帧', color: KIND_ACCENTS.video, icon: <Video size={14} /> },
      { title: '音频', desc: '规划中', color: '#4A4A52', icon: <Music size={14} />, disabled: true },
      { title: '3D 世界', desc: 'Beta · 规划中', color: '#4A4A52', icon: <Box size={14} />, disabled: true },
    ],
  },
]

export default function NodePaletteMenu({ x, y, onPick, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const { offsetWidth: w, offsetHeight: h } = el
    const vw = window.innerWidth
    const vh = window.innerHeight
    const margin = 8
    const left = Math.max(margin, Math.min(x, vw - w - margin))
    const top = Math.max(margin, Math.min(y, vh - h - margin))
    setPos({ left, top })
  }, [x, y])

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault()
          onClose()
        }}
      />
      <div
        ref={ref}
        className="fixed z-50 max-h-[70vh] w-[240px] overflow-y-auto rounded-lg border border-white/[0.08] bg-bg-1/95 shadow-2xl backdrop-blur"
        style={pos}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/[0.06] bg-bg-1/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-ink-2 backdrop-blur">
          添加节点
        </div>
        {GROUPS.map((g) => (
          <div key={g.title} className="py-1">
            <div className="px-3 pb-0.5 pt-1 text-[9px] font-semibold uppercase tracking-widest text-ink-3">
              {g.title}
            </div>
            {g.items.map((it) => (
              <button
                key={it.title}
                disabled={it.disabled}
                onClick={() => it.choice && onPick(it.choice)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                  style={{ background: `${it.color}22`, color: it.color }}
                >
                  {it.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-medium text-ink-0">{it.title}</span>
                  <span className="block text-[10px] text-ink-3">{it.desc}</span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
