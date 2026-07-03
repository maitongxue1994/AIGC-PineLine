import type { CSSProperties, ReactNode } from 'react'
import { SHADOWS, TOKENS } from '../designTokens'

/** 生成输入栏共用件（图片 PromptComposer 与视频 VideoPromptBar 共用） */

/** 参数 chip（设计稿 §04：padding 8/12、radius 12、15px 文字、hover 白 6%） */
export function Chip({
  title,
  onClick,
  active,
  children,
}: {
  title?: string
  onClick?: () => void
  active?: boolean
  children: ReactNode
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={!onClick}
      className="flex shrink-0 items-center gap-2 rounded-[12px] px-3 py-2 text-[15px] transition enabled:hover:bg-white/[0.06] disabled:cursor-default"
      style={{ color: TOKENS.textBody, background: active ? 'rgba(255,255,255,0.06)' : undefined }}
    >
      {children}
    </button>
  )
}

export function VDivider({ h = 20 }: { h?: number }) {
  return <span className="shrink-0 bg-white/[0.12]" style={{ width: 1, height: h }} />
}

export function Popover({
  width,
  style,
  children,
}: {
  width: number
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <div
      className="nodrag nowheel absolute bottom-full left-0 z-30 mb-2 rounded-[20px] border border-white/[0.08]"
      style={{ width, background: TOKENS.popoverBg, boxShadow: SHADOWS.menu, ...style }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}
