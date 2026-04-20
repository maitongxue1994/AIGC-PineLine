import { FileText, Image as ImageIcon } from 'lucide-react'

export type PaletteChoice = 'script' | 'image'

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
    id: 'image',
    title: '图像 / Image',
    desc: 'Gemini Nano Banana Pro',
    color: '#7C5CFF',
    icon: <ImageIcon size={14} />,
  },
]

export default function NodePaletteMenu({ x, y, onPick, onClose }: Props) {
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
        className="fixed z-50 w-[220px] overflow-hidden rounded-lg border border-white/[0.08] bg-bg-1/95 shadow-2xl backdrop-blur"
        style={{ left: x, top: y }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/[0.06] px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-ink-2">
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
