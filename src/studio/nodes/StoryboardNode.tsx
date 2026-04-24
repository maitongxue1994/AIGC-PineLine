import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Layers, Play, Loader2 } from 'lucide-react'
import { useStudioStore } from '../store'
import type { PineNode, StoryboardParams } from '../types'
import { ACCENTS, StatusBadge } from './shared'

export default function StoryboardNode({ id, data, selected }: NodeProps<PineNode>) {
  const runNode = useStudioStore((s) => s.runNode)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const updateNodeOutput = useStudioStore((s) => s.updateNodeOutput)
  const params = data.params as StoryboardParams
  const status = data.status
  const shots = data.shots ?? []

  return (
    <div
      className={`w-[380px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#FF6A3D]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.storyboard }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.storyboard }}
      />

      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: ACCENTS.storyboard }}
        >
          <Layers size={12} />
          STORYBOARD · {data.title}
        </span>
        <StatusBadge status={status} accent={ACCENTS.storyboard} />
      </div>

      <div className="px-3 py-2">
        <div className="mb-1 flex items-center justify-between text-[9px] font-semibold uppercase tracking-widest text-ink-3">
          <span>模式</span>
          <div className="flex gap-1">
            <ModeTab
              active={params.mode === 'auto'}
              onClick={() => updateNodeParams(id, { mode: 'auto' })}
            >
              自动
            </ModeTab>
            <ModeTab
              active={params.mode === 'manual'}
              onClick={() => updateNodeParams(id, { mode: 'manual' })}
            >
              分隔符
            </ModeTab>
          </div>
        </div>
        {params.mode === 'manual' && (
          <input
            value={params.splitter}
            onChange={(e) => updateNodeParams(id, { splitter: e.target.value })}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="如 === 或 \n---\n"
            className="nodrag mb-2 w-full rounded-md border border-white/[0.05] bg-bg-2/50 px-2 py-1.5 text-[11px] text-ink-0 outline-none transition focus:border-white/25"
          />
        )}

        <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-ink-3">
          剧本（可从上游读取）
        </div>
        <textarea
          value={params.screenplay}
          onChange={(e) => updateNodeParams(id, { screenplay: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
          rows={5}
          placeholder="留空则用上游「剧本」节点的输出…"
          className="nodrag nowheel w-full resize-none rounded-md border border-white/[0.05] bg-bg-2/50 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
        />
      </div>

      {(shots.length > 0 || data.output) && (
        <div className="border-t border-white/[0.06] bg-bg-2/40 px-3 py-2">
          <div className="mb-1 flex items-center justify-between text-[9px] font-semibold uppercase tracking-widest text-ink-3">
            <span>分镜列表</span>
            <span className="normal-case tracking-normal text-ink-2">
              {shots.length || 0} 条
            </span>
          </div>
          <textarea
            value={data.output ?? ''}
            onChange={(e) => updateNodeOutput(id, e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            rows={8}
            placeholder={status === 'running' ? '拆分中…' : ''}
            className="nodrag nowheel w-full resize-none rounded-md border border-white/[0.05] bg-bg-1/60 p-2 font-mono text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
        </div>
      )}

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
              拆分中…
            </>
          ) : (
            <>
              <Play size={11} fill="#fff" />
              拆分分镜
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ModeTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`rounded px-1.5 py-0.5 text-[9px] font-medium transition ${
        active
          ? 'bg-white/15 text-white'
          : 'bg-white/[0.03] text-ink-3 hover:text-ink-1'
      }`}
    >
      {children}
    </button>
  )
}
