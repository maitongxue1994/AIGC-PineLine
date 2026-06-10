import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Image as ImageIcon, Loader2 } from 'lucide-react'
import { useStudioStore } from '../store'
import type { AspectRatio, ImageParams, PineNode } from '../types'
import {
  ACCENTS,
  ImageThumb,
  NodeActionBar,
  NodeTitle,
  ParamSelect,
  StatusBadge,
  UpstreamIndicator,
} from './shared'

const ASPECT_OPTIONS: { value: AspectRatio; label: string }[] = [
  { value: '16:9', label: '16:9' },
  { value: '9:16', label: '9:16' },
  { value: '1:1', label: '1:1' },
  { value: '4:3', label: '4:3' },
  { value: '3:4', label: '3:4' },
]

const ASPECT_CLASS: Record<AspectRatio, string> = {
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
}

export default function ImageNode({ id, data, selected }: NodeProps<PineNode>) {
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const params = data.params as ImageParams
  const status = data.status
  const aspectClass = ASPECT_CLASS[params.aspectRatio] ?? 'aspect-video'

  return (
    <div
      className={`w-[320px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#7C5CFF]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      <NodeActionBar
        id={id}
        status={status}
        output={data.output}
        filename={`${data.title || 'pineline'}.png`}
      />
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

      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2">
        <span className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7C5CFF]">
          <ImageIcon size={12} className="shrink-0" />
          <NodeTitle id={id} title={data.title} />
        </span>
        <StatusBadge status={status} />
      </div>

      <UpstreamIndicator nodeId={id} />

      <div className="p-3">
        {data.output ? (
          <ImageThumb
            src={data.output}
            filename={`${data.title || 'pineline'}.png`}
            aspectClass={aspectClass}
          />
        ) : (
          <div
            className={`flex items-center justify-center rounded-md border border-white/[0.08] bg-gradient-to-br from-[#1a0a14] via-[#2a0f3a] to-[#071029] text-[10px] text-ink-3 ${aspectClass}`}
          >
            {status === 'running' ? (
              <div className="flex items-center gap-2 text-ink-1">
                <Loader2 size={14} className="animate-spin" />
                生成中…
              </div>
            ) : (
              <span>未生成</span>
            )}
          </div>
        )}

        {/* prompt + 画幅（v3：参数全部上节点） */}
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
        <div className="mt-1.5">
          <ParamSelect
            title="画幅"
            value={params.aspectRatio}
            options={ASPECT_OPTIONS}
            onChange={(aspectRatio) => updateNodeParams(id, { aspectRatio })}
          />
        </div>
      </div>

      {/* error */}
      {data.error && (
        <div className="border-t border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
          {data.error}
        </div>
      )}
    </div>
  )
}
