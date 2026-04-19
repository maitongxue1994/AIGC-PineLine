import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Image as ImageIcon, Play, Loader2, AlertCircle, Check } from 'lucide-react'
import { useStudioStore } from '../store'
import type { ImageParams, PineNode } from '../types'

export default function ImageNode({ id, data, selected }: NodeProps<PineNode>) {
  const runNode = useStudioStore((s) => s.runNode)
  const params = data.params as ImageParams
  const status = data.status

  const aspectClass =
    {
      '1:1': 'aspect-square',
      '16:9': 'aspect-video',
      '9:16': 'aspect-[9/16]',
      '4:3': 'aspect-[4/3]',
      '3:4': 'aspect-[3/4]',
    }[params.aspectRatio] ?? 'aspect-video'

  return (
    <div
      className={`w-[300px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#7C5CFF]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-bg-0 !bg-[#7C5CFF]"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0 !bg-[#7C5CFF]"
      />

      {/* header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7C5CFF]">
          <ImageIcon size={12} />
          IMAGE · {data.title}
        </span>
        <StatusBadge status={status} />
      </div>

      {/* preview */}
      <div className="p-3">
        <div
          className={`relative overflow-hidden rounded-md border border-white/[0.08] ${aspectClass}`}
        >
          {data.output ? (
            <img
              src={data.output}
              alt={data.title}
              className="h-full w-full object-cover"
            />
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

        {/* prompt preview */}
        <div className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-ink-2">
          {params.prompt?.trim() ? (
            params.prompt
          ) : (
            <span className="text-ink-3">（从上游节点读取 prompt）</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-ink-3">
          <span>{params.aspectRatio}</span>
          <span>·</span>
          <span>gemini-3.1-flash-image</span>
        </div>
      </div>

      {/* error */}
      {data.error && (
        <div className="border-t border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
          {data.error}
        </div>
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
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
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
  return <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFF]" />
}
