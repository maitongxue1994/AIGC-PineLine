import { useState } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import {
  Image as ImageIcon,
  Play,
  Loader2,
  Download,
  Maximize2,
} from 'lucide-react'
import { useStudioStore } from '../store'
import type { ImageParams, PineNode } from '../types'
import {
  ACCENTS,
  ASPECT_TO_CLASS,
  ErrorBanner,
  IconButton,
  PreviewLightbox,
  StatusBadge,
  downloadDataUrl,
} from './shared'

export default function ImageNode({ id, data, selected }: NodeProps<PineNode>) {
  const runNode = useStudioStore((s) => s.runNode)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const clearNodeError = useStudioStore((s) => s.clearNodeError)
  const params = data.params as ImageParams
  const status = data.status
  const [preview, setPreview] = useState(false)

  const aspectClass = ASPECT_TO_CLASS[params.aspectRatio] ?? 'aspect-video'

  return (
    <div
      className={`w-[320px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#7C5CFF]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.image }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.image }}
      />

      {/* header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: ACCENTS.image }}
        >
          <ImageIcon size={12} />
          IMAGE · {data.title}
        </span>
        <StatusBadge status={status} accent={ACCENTS.image} />
      </div>

      {/* preview */}
      <div className="p-3">
        <div
          className={`relative overflow-hidden rounded-md border border-white/[0.08] ${aspectClass}`}
        >
          {data.output ? (
            <>
              <img
                src={data.output}
                alt={data.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition group-hover:opacity-100 [.react-flow__node:hover_&]:opacity-100">
                <IconButton
                  title="放大预览"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPreview(true)
                  }}
                >
                  <Maximize2 size={11} />
                </IconButton>
                <IconButton
                  title="下载图片"
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadDataUrl(data.output!, `${data.title || 'pineline'}.png`)
                  }}
                >
                  <Download size={11} />
                </IconButton>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1a0a14] via-[#2a0f3a] to-[#071029] text-[10px] text-ink-3">
              {status === 'running' ? (
                <div className="flex items-center gap-2 text-ink-1">
                  <Loader2 size={14} className="animate-spin" />
                  Nano Banana 生成中…
                </div>
              ) : (
                <span>未生成</span>
              )}
            </div>
          )}
          {status === 'running' && data.output && (
            <div className="animate-scan absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          )}
        </div>

        {/* prompt editor */}
        <div className="mt-2">
          <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-ink-3">
            Prompt
          </div>
          <textarea
            value={params.prompt ?? ''}
            onChange={(e) => updateNodeParams(id, { prompt: e.target.value })}
            onMouseDown={(e) => e.stopPropagation()}
            rows={3}
            placeholder="留空则自动使用上游节点的输出…"
            className="nodrag nowheel w-full resize-none rounded-md border border-white/[0.05] bg-bg-2/50 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
        </div>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-ink-3">
          <span>{params.aspectRatio}</span>
          <span>·</span>
          <span>gemini-3.1-flash-image</span>
        </div>
      </div>

      {data.error && (
        <ErrorBanner message={data.error} onClear={() => clearNodeError(id)} />
      )}

      {/* run button */}
      <div className="border-t border-white/[0.06] bg-bg-1/50 px-3 py-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            runNode(id)
          }}
          disabled={status === 'running'}
          className="flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-gradient py-1.5 text-[11px] font-semibold text-white disabled:opacity-50"
        >
          {status === 'running' ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              生成中…
            </>
          ) : (
            <>
              <Play size={11} fill="#fff" />
              生成图片
            </>
          )}
        </button>
      </div>

      {preview && data.output && (
        <PreviewLightbox
          src={data.output}
          filename={`${data.title || 'pineline'}.png`}
          onClose={() => setPreview(false)}
        />
      )}
    </div>
  )
}
