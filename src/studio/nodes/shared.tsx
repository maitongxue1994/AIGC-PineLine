import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { AlertCircle, Check, Download, Maximize2, X } from 'lucide-react'
import type { AspectRatio, NodeStatus } from '../types'

export function StatusBadge({
  status,
  accent,
}: {
  status: NodeStatus
  accent: string
}) {
  if (status === 'running')
    return (
      <span className="flex items-center gap-1 text-[10px] text-white">
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand" />
        gen
      </span>
    )
  if (status === 'done')
    return (
      <span className="flex items-center gap-1 text-[10px] text-[#B6FF5F]">
        <Check size={10} />
        ready
      </span>
    )
  if (status === 'error')
    return (
      <span className="flex items-center gap-1 text-[10px] text-red-400">
        <AlertCircle size={10} />
        error
      </span>
    )
  return <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function IconButton({
  title,
  onClick,
  children,
}: {
  title: string
  onClick: (e: MouseEvent) => void
  children: ReactNode
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="rounded bg-black/60 p-1 text-white/90 backdrop-blur transition hover:bg-black/80 hover:text-white"
    >
      {children}
    </button>
  )
}

export function PreviewLightbox({
  src,
  filename,
  onClose,
}: {
  src: string
  filename: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-8 backdrop-blur"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt="preview"
          className="max-h-[85vh] max-w-full rounded-lg border border-white/10 object-contain shadow-2xl"
        />
        <div className="absolute right-2 top-2 flex gap-2">
          <button
            onClick={() => downloadDataUrl(src, filename)}
            className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[12px] text-white backdrop-blur transition hover:bg-white/20"
          >
            <Download size={13} />
            下载
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-white/10 px-3 py-1.5 text-[12px] text-white backdrop-blur transition hover:bg-white/20"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

export function ImageThumb({
  src,
  filename,
  aspectClass = 'aspect-square',
}: {
  src: string
  filename: string
  aspectClass?: string
}) {
  const [preview, setPreview] = useState(false)
  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-md border border-white/[0.08] ${aspectClass}`}
      >
        <img src={src} alt={filename} className="h-full w-full object-cover" />
        <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition group-hover:opacity-100 [.react-flow__node:hover_&]:opacity-100">
          <IconButton title="放大" onClick={(e) => { e.stopPropagation(); setPreview(true) }}>
            <Maximize2 size={10} />
          </IconButton>
          <IconButton
            title="下载"
            onClick={(e) => { e.stopPropagation(); downloadDataUrl(src, filename) }}
          >
            <Download size={10} />
          </IconButton>
        </div>
      </div>
      {preview && (
        <PreviewLightbox src={src} filename={filename} onClose={() => setPreview(false)} />
      )}
    </>
  )
}

export function ErrorBanner({
  message,
  onClear,
}: {
  message: string
  onClear?: () => void
}) {
  return (
    <div className="border-t border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
      <div className="flex items-start gap-2">
        <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">{message}</span>
        {onClear && (
          <button
            type="button"
            title="清除错误"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="shrink-0 rounded p-0.5 text-red-300/80 transition hover:bg-red-500/20 hover:text-red-200"
          >
            <X size={11} />
          </button>
        )}
      </div>
    </div>
  )
}

export const ACCENTS = {
  script: '#FF6A3D',
  image: '#7C5CFF',
  storyboard: '#FF6A3D',
  scene: '#2BE3C2',
  character: '#F4A64F',
  prop: '#B6FF5F',
  shot: '#7C5CFF',
} as const

export const ASPECT_TO_CLASS: Record<AspectRatio, string> = {
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
}
