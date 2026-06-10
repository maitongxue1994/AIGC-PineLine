import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Loader2, type LucideIcon } from 'lucide-react'
import { useStudioStore } from '../store'
import type { AspectRatio, PineNode } from '../types'
import {
  ImageThumb,
  NodeActionBar,
  NodeTitle,
  ParamSelect,
  StatusBadge,
  UpstreamIndicator,
} from './shared'

type GridParams = {
  description: string
  aspectRatio?: AspectRatio
}

const ASPECT_OPTIONS: { value: AspectRatio; label: string }[] = [
  { value: '16:9', label: '16:9' },
  { value: '9:16', label: '9:16' },
  { value: '1:1', label: '1:1' },
  { value: '4:3', label: '4:3' },
  { value: '3:4', label: '3:4' },
]

type Props = NodeProps<PineNode> & {
  accent: string
  icon: LucideIcon
  cols: 2 | 3
  placeholder: string
  showAspectRatio?: boolean
}

export default function GridImageNode({
  id,
  data,
  selected,
  accent,
  icon: Icon,
  cols,
  placeholder,
  showAspectRatio = false,
}: Props) {
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const params = data.params as GridParams
  const status = data.status
  const outputs = data.outputs ?? []

  const gridCols = cols === 2 ? 'grid-cols-2' : 'grid-cols-3'
  const width = cols === 2 ? 'w-[320px]' : 'w-[360px]'

  return (
    <div
      className={`${width} overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_currentColor]'
          : 'border-white/10 hover:border-white/25'
      }`}
      style={{ color: accent }}
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
        style={{ background: accent }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: accent }}
      />

      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2">
        <span
          className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: accent }}
        >
          <Icon size={12} className="shrink-0" />
          <NodeTitle id={id} title={data.title} />
        </span>
        <StatusBadge status={status} />
      </div>

      <UpstreamIndicator nodeId={id} />

      <div className="p-3">
        <div className={`grid ${gridCols} gap-1.5`}>
          {outputs.length > 0
            ? outputs.map((src, i) =>
                src ? (
                  <ImageThumb key={i} src={src} filename={`${data.title}-${i + 1}.png`} />
                ) : (
                  <div
                    key={i}
                    title={data.outputErrors?.[i] ?? '生成失败'}
                    className="flex aspect-square items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-[9px] text-red-300"
                  >
                    失败
                  </div>
                ),
              )
            : Array.from({ length: cols === 2 ? 4 : 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-md border border-dashed border-white/[0.06] bg-bg-2/30 text-[10px] text-ink-3"
                >
                  {status === 'running' ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
              ))}
        </div>

        <div className="mt-2">
          <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-ink-3">
            描述
          </div>
          <textarea
            value={params.description}
            onChange={(e) => updateNodeParams(id, { description: e.target.value })}
            onMouseDown={(e) => e.stopPropagation()}
            rows={3}
            placeholder={placeholder}
            className="nodrag nowheel w-full resize-none rounded-md border border-white/[0.05] bg-bg-2/50 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
        </div>
        {showAspectRatio && (
          <div className="mt-1.5">
            <ParamSelect
              title="画幅"
              value={params.aspectRatio ?? '16:9'}
              options={ASPECT_OPTIONS}
              onChange={(aspectRatio) => updateNodeParams(id, { aspectRatio })}
            />
          </div>
        )}
      </div>

      {data.error && (
        <div className="border-t border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
          {data.error}
        </div>
      )}
    </div>
  )
}
