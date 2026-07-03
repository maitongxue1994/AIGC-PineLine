import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { NodeVersion } from '../types'
import { downloadDataUrl } from '../nodes/shared'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 全屏查看（设计稿 §06）：沉浸式容器 + 右侧 250px 信息栏。
 * createPortal 到 body（修复：原实现被节点 containing block 裁剪无法真全屏）；
 * Esc 关闭、←→ 切换批次、aria-modal + 焦点管理。
 */
export default function PreviewLightbox({
  versions,
  index,
  title,
  prompt,
  quality,
  onIndexChange,
  onClose,
}: {
  versions: NodeVersion[]
  index: number
  title: string
  prompt?: string
  quality?: string
  onIndexChange: (i: number) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const current = versions[index]
  const imgVersions = versions

  const step = useCallback(
    (dir: 1 | -1) => {
      const n = imgVersions.length
      if (n <= 1) return
      onIndexChange((index + dir + n) % n)
    },
    [imgVersions.length, index, onIndexChange],
  )

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null
    ref.current?.focus()
    return () => restoreRef.current?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose, step])

  const created = current?.createdAt ? new Date(current.createdAt) : null

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} 全屏查看`}
        className="flex max-h-[92vh] w-[min(1200px,94vw)] overflow-hidden rounded-[26px] border border-white/[0.08] outline-none"
        style={{ background: '#0A0A0B', boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 左：图片区 */}
        <div className="relative flex min-h-[420px] flex-1 items-center justify-center bg-[#060607] p-7">
          {current?.content ? (
            <img
              src={current.content}
              alt={current.label ?? title}
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
          ) : (
            <div className="text-sm" style={{ color: TOKENS.textFaint }}>
              {current?.error ? `生成失败：${current.error}` : '暂无内容'}
            </div>
          )}

          {imgVersions.length > 1 && (
            <>
              <button
                title="上一张 (←)"
                onClick={() => step(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                title="下一张 (→)"
                onClick={() => step(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-[12px] text-white/80">
                {index + 1} / {imgVersions.length}
                {current?.label ? ` · ${current.label}` : ''}
              </div>
            </>
          )}
        </div>

        {/* 右：信息栏 250px */}
        <div
          className="flex w-[250px] shrink-0 flex-col gap-4 border-l border-white/[0.07] p-5"
          style={{ background: '#0A0A0B' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold" style={{ color: TOKENS.textTitle }}>
              提示词
            </span>
            <button
              title="关闭 (Esc)"
              onClick={onClose}
              className="rounded p-1 transition hover:bg-white/[0.06]"
              style={{ color: TOKENS.textMuted }}
            >
              <X size={16} />
            </button>
          </div>
          <div
            className="h-24 overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.04] p-3 text-[13px] leading-relaxed"
            style={{ color: prompt ? TOKENS.textBody : TOKENS.textFaint }}
          >
            {prompt || '暂无提示词'}
          </div>

          <div>
            <div className="mb-2 text-[14px] font-semibold" style={{ color: TOKENS.textTitle }}>
              信息
            </div>
            <div className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.04] p-3.5 text-[13px]">
              {quality && (
                <div className="flex justify-between">
                  <span style={{ color: TOKENS.textMuted }}>质量</span>
                  <span style={{ color: TOKENS.textBody }}>{quality}</span>
                </div>
              )}
              {current?.label && (
                <div className="flex justify-between">
                  <span style={{ color: TOKENS.textMuted }}>视角</span>
                  <span style={{ color: TOKENS.textBody }}>{current.label}</span>
                </div>
              )}
              {created && (
                <div className="flex justify-between">
                  <span style={{ color: TOKENS.textMuted }}>日期</span>
                  <span style={{ color: TOKENS.textBody }}>
                    {created.toLocaleDateString('zh-CN')}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span style={{ color: TOKENS.textMuted }}>创建者</span>
                <span style={{ color: TOKENS.textBody }}>本地工程</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button
              disabled={!current?.content}
              onClick={() => current?.content && downloadDataUrl(current.content, `${title}.png`)}
              className="w-full rounded-xl bg-white/10 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/[0.16] disabled:cursor-not-allowed disabled:opacity-40"
            >
              下载
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
