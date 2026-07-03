import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box, FileText, Image as ImageIcon, SlidersHorizontal, Video } from 'lucide-react'
import { SHADOWS, TOKENS } from '../designTokens'
import type { NodeKind, NodePreset } from '../types'

export type QuickAddChoice = { kind: NodeKind; preset: NodePreset }

/**
 * ⊕「引用该节点生成」菜单（TapNow 同款）：
 * 点击节点左右 ⊕ 弹出，选择后创建上/下游节点并自动连线。
 */
export default function QuickAddMenu({
  x,
  y,
  side,
  onPick,
  onClose,
}: {
  x: number
  y: number
  /** source=建下游（引用该节点生成）；target=建上游 */
  side: 'source' | 'target'
  onPick: (c: QuickAddChoice) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const { offsetWidth: w, offsetHeight: h } = el
    const margin = 8
    setPos({
      left: Math.max(margin, Math.min(x, window.innerWidth - w - margin)),
      top: Math.max(margin, Math.min(y, window.innerHeight - h - margin)),
    })
  }, [x, y])

  const items: {
    label: string
    subtitle?: string
    icon: React.ReactNode
    choice?: QuickAddChoice
    disabled?: boolean
  }[] = [
    {
      label: '文本生成',
      subtitle: '脚本、广告词、品牌文案',
      icon: <FileText size={16} />,
      choice: { kind: 'text', preset: side === 'source' ? 'free' : 'script' },
    },
    { label: '图片生成', icon: <ImageIcon size={16} />, choice: { kind: 'image', preset: 'single' } },
    { label: '视频生成', icon: <Video size={16} />, disabled: true },
    { label: '图片编辑器', icon: <SlidersHorizontal size={16} />, disabled: true },
    { label: '3D 世界', subtitle: 'Beta', icon: <Box size={16} />, disabled: true },
  ]

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[70]"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault()
          onClose()
        }}
      />
      <div
        ref={ref}
        className="fixed z-[71] w-[280px] rounded-[18px] border border-white/[0.08] p-2.5"
        style={{ ...pos, background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <div className="px-2 pb-1.5 pt-1 text-[13px]" style={{ color: TOKENS.textMuted }}>
          {side === 'source' ? '引用该节点生成' : '为该节点添加上游'}
        </div>
        {items.map((it) => (
          <button
            key={it.label}
            disabled={it.disabled}
            onClick={() => it.choice && onPick(it.choice)}
            className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.06]"
              style={{ color: TOKENS.textBody }}
            >
              {it.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px]" style={{ color: TOKENS.textBody }}>
                {it.label}
              </span>
              {it.subtitle && (
                <span className="block text-[12px]" style={{ color: TOKENS.textFaint }}>
                  {it.subtitle}
                </span>
              )}
            </span>
            {it.disabled && (
              <span className="shrink-0 text-[11px]" style={{ color: TOKENS.textDisabled }}>
                规划中
              </span>
            )}
          </button>
        ))}
      </div>
    </>,
    document.body,
  )
}
