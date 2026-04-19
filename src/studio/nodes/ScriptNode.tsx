import { Handle, Position, type NodeProps } from '@xyflow/react'
import { FileText, Play, Loader2, AlertCircle, Check } from 'lucide-react'
import { useStudioStore } from '../store'
import type { PineNode, ScriptParams } from '../types'

export default function ScriptNode({ id, data, selected }: NodeProps<PineNode>) {
  const runNode = useStudioStore((s) => s.runNode)
  const params = data.params as ScriptParams
  const status = data.status

  return (
    <div
      className={`w-[280px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#FF6A3D]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-bg-0 !bg-[#FF6A3D]"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0 !bg-[#FF6A3D]"
      />

      {/* header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FF6A3D]">
          <FileText size={12} />
          SCRIPT · {data.title}
        </span>
        <StatusBadge status={status} />
      </div>

      {/* params preview */}
      <div className="px-3 py-2">
        <div className="line-clamp-2 text-[11px] leading-relaxed text-ink-1">
          {params.brief || <span className="text-ink-3">未填写 brief…</span>}
        </div>
        <div className="mt-1.5 flex gap-2 text-[10px] text-ink-3">
          <span>{labelOfTone(params.tone)}</span>
          <span>·</span>
          <span>{labelOfLength(params.length)}</span>
        </div>
      </div>

      {/* output preview */}
      {data.output && (
        <div className="border-t border-white/[0.06] bg-bg-2/40 px-3 py-2">
          <div className="line-clamp-4 whitespace-pre-wrap text-[11px] leading-relaxed text-ink-0">
            {data.output}
          </div>
        </div>
      )}

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
              MiniMax 生成中…
            </>
          ) : (
            <>
              <Play size={11} fill="#fff" />
              生成脚本
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
  return <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A3D]" />
}

function labelOfTone(t: ScriptParams['tone']) {
  return (
    {
      cinematic: '电影级',
      commercial: '商业广告',
      drama: '短剧',
      documentary: '纪录片',
    }[t] ?? t
  )
}

function labelOfLength(l: ScriptParams['length']) {
  return { short: '短（1 段）', medium: '中（3 段）', long: '长（5 段）' }[l] ?? l
}
