import { useLayoutEffect, useRef, useState } from 'react'
import {
  FileText,
  Image as ImageIcon,
  Layers,
  Mountain,
  User,
  Package,
  Camera,
} from 'lucide-react'

export type PaletteChoice =
  | 'script'
  | 'image'
  | 'storyboard'
  | 'scene'
  | 'character'
  | 'prop'
  | 'shot'

type Props = {
  x: number
  y: number
  onPick: (choice: PaletteChoice) => void
  onClose: () => void
}

const ITEMS: {
  id: PaletteChoice
  title: string
  desc: string
  color: string
  icon: React.ReactNode
}[] = [
  {
    id: 'script',
    title: '剧本 / Script',
    desc: 'MiniMax-M2.7 生成剧本',
    color: '#FF6A3D',
    icon: <FileText size={14} />,
  },
  {
    id: 'storyboard',
    title: '分镜 / Storyboard',
    desc: '把剧本拆成镜头序列',
    color: '#FF6A3D',
    icon: <Layers size={14} />,
  },
  {
    id: 'scene',
    title: '场景 / Scene',
    desc: '四宫格视角',
    color: '#2BE3C2',
    icon: <Mountain size={14} />,
  },
  {
    id: 'character',
    title: '角色 / Character',
    desc: '三视图（前/侧/背）',
    color: '#F4A64F',
    icon: <User size={14} />,
  },
  {
    id: 'prop',
    title: '道具 / Prop',
    desc: '三视图',
    color: '#B6FF5F',
    icon: <Package size={14} />,
  },
  {
    id: 'shot',
    title: '分镜图 / Shot',
    desc: '多参考合成一张',
    color: '#7C5CFF',
    icon: <Camera size={14} />,
  },
  {
    id: 'image',
    title: '通用图像 / Image',
    desc: '快速单图生成',
    color: '#7C5CFF',
    icon: <ImageIcon size={14} />,
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
          新建节点
        </div>
        <div className="py-1">
          {ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => onPick(it.id)}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition hover:bg-white/[0.04]"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                style={{ background: `${it.color}22`, color: it.color }}
              >
                {it.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-medium text-ink-0">
                  {it.title}
                </span>
                <span className="block text-[10px] text-ink-3">{it.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
