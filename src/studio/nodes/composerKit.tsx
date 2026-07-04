import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { SHADOWS, TOKENS } from '../designTokens'
import { useDismissable } from '../hooks/useDismissable'

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

/**
 * 参数弹层（Portal 版）：渲染到 body，彻底摆脱 React Flow renderer 的 z-index
 * 栈上下文（此前会被 TopBar/LeftRail/BottomControls 盖住）。
 * 以挂载处父容器（触发 chip 所在的 relative 包裹层）为锚：默认在其上方弹出，
 * 空间不足自动翻转到下方，左右夹取在视口内；点击外部/Esc 关闭（onClose）。
 */
export function Popover({
  width,
  style,
  children,
  onClose,
}: {
  width: number
  style?: CSSProperties
  children: ReactNode
  /** 点击外部 / Esc 时回调（不传则保持只能点触发钮关闭的旧行为） */
  onClose?: () => void
}) {
  const anchorRef = useRef<HTMLSpanElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)

  useLayoutEffect(() => {
    const wrapper = anchorRef.current?.parentElement
    const panel = panelRef.current
    if (!wrapper || !panel) return
    const r = wrapper.getBoundingClientRect()
    const ph = panel.offsetHeight
    const margin = 8
    // bottom-full 语义：优先在锚点上方；不够高翻转到下方并夹取
    let top = r.top - ph - margin
    if (top < margin) top = Math.min(r.bottom + margin, window.innerHeight - ph - margin)
    const left = Math.max(margin, Math.min(r.left, window.innerWidth - width - margin))
    setPos({ left, top })
  }, [width])

  useDismissable(!!onClose, onClose ?? (() => {}), () => [
    panelRef.current,
    // 锚点父容器含触发按钮：点它交给按钮自身的 toggle，避免关了又开
    anchorRef.current?.parentElement,
  ])

  return (
    <>
      <span ref={anchorRef} className="hidden" />
      {createPortal(
        <div
          ref={panelRef}
          className="nodrag nowheel pl-pop-in fixed z-[70] rounded-[20px] border border-white/[0.08]"
          style={{
            width,
            left: pos?.left ?? -9999,
            top: pos?.top ?? -9999,
            visibility: pos ? 'visible' : 'hidden',
            background: 'rgba(30,30,33,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: SHADOWS.menu,
            ...style,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  )
}
