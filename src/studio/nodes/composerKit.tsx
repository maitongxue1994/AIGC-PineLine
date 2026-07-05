import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Check, Copy } from 'lucide-react'
import { SHADOWS, TOKENS } from '../designTokens'
import { useDismissable } from '../hooks/useDismissable'

/** 生成输入栏共用件（图片 PromptComposer 与视频 VideoPromptBar 共用） */

/**
 * 半受控输入核心：DOM 不绑定 value（非受控 defaultValue），聚焦编辑期间 DOM 是唯一事实源。
 *
 * 背景：节点提示词的 value 走「zustand → ReactFlow nodes prop → RF 内部 store（layout-effect
 * 同步）→ data prop 回流」的异步链，受控写法下每次击键都会带着陈旧值先渲染一次，React 把
 * DOM value 强制回滚旧文本再写新文本——程序化赋值会杀掉 IME 合成会话（macOS Option 长按 /
 * 语音听写乱串），整串重写还会把光标甩到末尾。
 *
 * 方案：外部 value 变化只在「元素未聚焦且 DOM 值确实不同」时用 ref 直写 DOM（生成结果回填、
 * 切换版本仍然生效）；聚焦期间任何陈旧渲染都不再触碰 DOM → IME 合成不被打断、光标永不跳。
 * onBlur 时兜底同步一次（覆盖「聚焦期间外部写入」的罕见分歧）。
 */
function useDomValueSync<T extends HTMLInputElement | HTMLTextAreaElement>(value: string) {
  const ref = useRef<T | null>(null)
  const latest = useRef(value)
  useEffect(() => {
    latest.current = value
    const el = ref.current
    if (el && document.activeElement !== el && el.value !== value) el.value = value
  }, [value])
  return { ref, latest }
}

type SyncFieldProps<E extends HTMLElement> = {
  value: string
  onValueChange: (v: string) => void
} & Omit<React.TextareaHTMLAttributes<E> & React.InputHTMLAttributes<E>, 'value' | 'defaultValue' | 'onChange'>

/** 半受控 textarea（IME/光标安全，见 useDomValueSync） */
export const SyncTextarea = forwardRef<HTMLTextAreaElement, SyncFieldProps<HTMLTextAreaElement>>(
  function SyncTextarea({ value, onValueChange, onBlur, ...rest }, forwarded) {
    const { ref, latest } = useDomValueSync<HTMLTextAreaElement>(value)
    // ref 是稳定的 useRef 对象（出自自定义 hook，lint 识别不到稳定性），handle 仍只建一次
    useImperativeHandle(forwarded, () => ref.current!, [ref])
    return (
      <textarea
        {...rest}
        ref={ref}
        defaultValue={value}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={(e) => {
          const el = e.currentTarget
          if (el.value !== latest.current) el.value = latest.current
          onBlur?.(e)
        }}
      />
    )
  },
)

/** 半受控 input（IME/光标安全，见 useDomValueSync） */
export const SyncInput = forwardRef<HTMLInputElement, SyncFieldProps<HTMLInputElement>>(
  function SyncInput({ value, onValueChange, onBlur, ...rest }, forwarded) {
    const { ref, latest } = useDomValueSync<HTMLInputElement>(value)
    // 同上：ref 稳定，handle 只建一次
    useImperativeHandle(forwarded, () => ref.current!, [ref])
    return (
      <input
        {...rest}
        ref={ref}
        defaultValue={value}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={(e) => {
          const el = e.currentTarget
          if (el.value !== latest.current) el.value = latest.current
          onBlur?.(e)
        }}
      />
    )
  },
)

/**
 * 通用「复制到剪贴板」按钮：✓ 已复制 1.2s 复位（同历史面板 rid 复制交互）；
 * 剪贴板被浏览器拒绝时走 pineline:flash 提示。label 传入时带文字（如「复制全文」），否则纯图标。
 */
export function CopyButton({
  text,
  label,
  title = '复制',
  iconSize = 14,
  className,
  style,
}: {
  text: string
  label?: string
  title?: string
  iconSize?: number
  className?: string
  style?: CSSProperties
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <button
      title={copied ? '已复制' : title}
      onClick={(e) => {
        e.stopPropagation()
        if (!text) return
        navigator.clipboard?.writeText(text).then(
          () => {
            setCopied(true)
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => setCopied(false), 1200)
          },
          () => {
            window.dispatchEvent(
              new CustomEvent('pineline:flash', { detail: '复制失败：浏览器拒绝了剪贴板访问' }),
            )
          },
        )
      }}
      onMouseDown={(e) => e.stopPropagation()}
      className={className}
      style={style}
    >
      {copied ? <Check size={iconSize} style={{ color: '#4BBF6B' }} /> : <Copy size={iconSize} />}
      {label ? <span>{copied ? '已复制' : label}</span> : null}
    </button>
  )
}

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
