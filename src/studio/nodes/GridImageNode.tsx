import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Play, Loader2, type LucideIcon } from 'lucide-react'
import { useStudioStore } from '../store'
import type { AspectRatio, NodeKind, PineNode } from '../types'
import { ImageThumb, StatusBadge } from './shared'

type GridParams = {
  description: string
  aspectRatio?: AspectRatio
  referenceImage?: string
}

type Props = NodeProps<PineNode> & {
  accent: string
  label: string
  kindLabel: string
  icon: LucideIcon
  cols: 2 | 3
  runLabel: string
  placeholder: string
  showAspectRatio?: boolean
  kind: NodeKind
}

export default function GridImageNode({
  id,
  data,
  selected,
  accent,
  kindLabel,
  icon: Icon,
  cols,
  runLabel,
  placeholder,
  showAspectRatio = false,
}: Props) {
  const runNode = useStudioStore((s) => s.runNode)
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

      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: accent }}
        >
          <Icon size={12} />
          {kindLabel} · {data.title}
        </span>
        <StatusBadge status={status} accent={accent} />
      </div>

      <div className="p-3">
        <div className={`grid ${gridCols} gap-1.5`}>
          {outputs.length > 0
            ? outputs.map((src, i) => (
                <ImageThumb key={i} src={src} filename={`${data.title}-${i + 1}.png`} />
              ))
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
          <div className="mt-1 text-[10px] text-ink-3">画幅：{params.aspectRatio}</div>
        )}
      </div>

      {data.error && (
        <div className="border-t border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
          {data.error}
        </div>
      )}

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
              {runLabel}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
