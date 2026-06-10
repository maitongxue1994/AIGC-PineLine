import { useState, type MouseEvent, type ReactNode } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  Loader2,
  Maximize2,
  Play,
  Trash2,
} from 'lucide-react'
import { useStudioStore } from '../store'
import type { NodeStatus } from '../types'

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
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-8 backdrop-blur"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
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

/**
 * 选中节点时浮在节点上方的工具条（TapNow 同款交互）：
 * 运行 / 复制 / 下载（有图时）/ 删除，全部就地完成，不必去 Inspector。
 */
export function NodeActionBar({
  id,
  status,
  output,
  filename,
  runnable = true,
}: {
  id: string
  status: NodeStatus
  output?: string | null
  filename?: string
  runnable?: boolean
}) {
  const runNode = useStudioStore((s) => s.runNode)
  const duplicateNode = useStudioStore((s) => s.duplicateNode)
  const deleteNode = useStudioStore((s) => s.deleteNode)

  const btn =
    'rounded-md p-1.5 text-ink-1 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <NodeToolbar
      position={Position.Top}
      offset={10}
      className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-bg-2/95 p-1 shadow-xl backdrop-blur"
    >
      {runnable && (
        <button
          title="运行 (⌘/Ctrl+Enter)"
          disabled={status === 'running'}
          onClick={() => runNode(id)}
          className={btn}
        >
          {status === 'running' ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Play size={13} />
          )}
        </button>
      )}
      <button title="复制节点 (⌘/Ctrl+D)" onClick={() => duplicateNode(id)} className={btn}>
        <Copy size={13} />
      </button>
      {output?.startsWith('data:image') && (
        <button
          title="下载图片"
          onClick={() => downloadDataUrl(output, filename ?? 'pineline.png')}
          className={btn}
        >
          <Download size={13} />
        </button>
      )}
      <button
        title="删除节点 (Delete)"
        onClick={() => deleteNode(id)}
        className={`${btn} hover:!bg-red-500/15 hover:!text-red-300`}
      >
        <Trash2 size={13} />
      </button>
    </NodeToolbar>
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
  asset: '#22D3EE',
} as const
