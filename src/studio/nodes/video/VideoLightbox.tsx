import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { SHADOWS, TOKENS } from '../../designTokens'

/** 视频全屏查看：portal 真全屏 + Esc 关闭 + 原生控制条 */
export default function VideoLightbox({
  src,
  title,
  onClose,
}: {
  src: string
  title: string
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-8 backdrop-blur-sm"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} 全屏查看`}
        className="relative max-h-full w-[min(1100px,92vw)] overflow-hidden rounded-[26px] border border-white/[0.08] outline-none"
        style={{ background: '#0A0A0B', boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="关闭 (Esc)"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/55 p-2 text-white/85 backdrop-blur transition hover:bg-black/75"
        >
          <X size={16} />
        </button>
        <video src={src} controls autoPlay className="block max-h-[84vh] w-full" style={{ background: '#060607' }} />
        <div className="px-5 py-3 text-[13px]" style={{ color: TOKENS.textMuted }}>
          {title}
        </div>
      </div>
    </div>,
    document.body,
  )
}
