import { useState, type MouseEvent, type ReactNode } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import {
  ArrowDownToLine,
  Copy,
  Download,
  Loader2,
  Maximize2,
  Play,
  Trash2,
} from 'lucide-react'
import { useStudioStore } from '../store'
import type { NodeStatus } from '../types'

/** 状态徽章：全站唯一实现，统一中文四态（v3 规范） */
export function StatusBadge({ status }: { status: NodeStatus }) {
  const MAP: Record<NodeStatus, { label: string; cls: string; dot: string }> = {
    idle:    { label: '待运行', cls: 'text-ink-3',      dot: 'bg-ink-3' },
    running: { label: '生成中', cls: 'text-brand',      dot: 'animate-pulseDot bg-brand' },
    done:    { label: '完成',   cls: 'text-[#B6FF5F]',  dot: 'bg-[#B6FF5F]' },
    error:   { label: '失败',   cls: 'text-red-400',    dot: 'bg-red-400' },
  }
  const s = MAP[status] ?? MAP.idle
  return (
    <span className={`flex shrink-0 items-center gap-1.5 text-[10px] ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

/** 节点标题：双击进入重命名（TapNow 同款），Enter 确认 / Esc 取消 */
export function NodeTitle({ id, title }: { id: string; title: string }) {
  const updateNodeTitle = useStudioStore((s) => s.updateNodeTitle)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(title)

  if (editing)
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Enter') {
            if (draft.trim()) updateNodeTitle(id, draft.trim())
            setEditing(false)
          }
          if (e.key === 'Escape') setEditing(false)
        }}
        onBlur={() => {
          if (draft.trim()) updateNodeTitle(id, draft.trim())
          setEditing(false)
        }}
        className="nodrag w-full min-w-0 rounded border border-white/30 bg-bg-2 px-1 py-0.5 text-[11px] normal-case tracking-normal text-white outline-none"
      />
    )

  return (
    <span
      title="双击重命名"
      onDoubleClick={(e) => {
        e.stopPropagation()
        setDraft(title)
        setEditing(true)
      }}
      className="min-w-0 truncate"
    >
      {title}
    </span>
  )
}

/**
 * 上游输入指示条：把「prompt 留空自动用上游」的隐形规则显式化（v3 规范）。
 * 有入边才渲染；点击选中第一个上游节点。
 */
export function UpstreamIndicator({ nodeId }: { nodeId: string }) {
  const focusNode = useStudioStore((s) => s.focusNode)
  // selector 返回字符串，仅在摘要变化时重渲染
  const summary = useStudioStore((s) => {
    const ups = s.edges
      .filter((e) => e.target === nodeId)
      .map((e) => s.nodes.find((n) => n.id === e.source))
      .filter((n): n is NonNullable<typeof n> => !!n)
    if (!ups.length) return ''
    const texts = ups.filter((n) => n.data.kind === 'text').length
    const imgs = ups.length - texts
    const parts = [texts && `文本 ×${texts}`, imgs && `图 ×${imgs}`].filter(Boolean)
    return `${ups[0].id}|上游输入 ×${ups.length}（${parts.join(' · ')}，留空时自动使用）`
  })
  if (!summary) return null
  const [firstId, label] = summary.split('|')

  return (
    <button
      title="点击选中上游节点"
      onClick={(e) => {
        e.stopPropagation()
        focusNode(firstId)
      }}
      className="nodrag mx-3 mt-2 flex w-[calc(100%-24px)] items-center gap-1.5 rounded-md border border-dashed border-white/15 px-2 py-1 text-left text-[10px] text-ink-2 transition hover:border-white/30 hover:text-ink-1"
    >
      <ArrowDownToLine size={10} className="shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  )
}

/** 节点内紧凑参数下拉（v3：参数全部上节点） */
export function ParamSelect<T extends string>({
  value,
  options,
  onChange,
  title,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  title?: string
}) {
  return (
    <select
      title={title}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="nodrag rounded-md border border-white/[0.07] bg-bg-2 px-1.5 py-1 text-[10px] text-ink-1 outline-none transition hover:border-white/20 focus:border-white/30"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
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

// 配色语义收敛至 nodeCatalog.KIND_ACCENTS（文本=橙 / 图像=紫 / 素材=青）
