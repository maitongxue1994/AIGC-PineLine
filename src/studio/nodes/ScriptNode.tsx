import { Handle, Position, type NodeProps } from '@xyflow/react'
import { FileText } from 'lucide-react'
import { useStudioStore } from '../store'
import type { PineNode, ScriptParams } from '../types'
import {
  ACCENTS,
  NodeActionBar,
  NodeTitle,
  ParamSelect,
  StatusBadge,
  UpstreamIndicator,
} from './shared'

const TONE_OPTIONS: { value: ScriptParams['tone']; label: string }[] = [
  { value: 'cinematic', label: '电影级' },
  { value: 'commercial', label: '商业广告' },
  { value: 'drama', label: '短剧' },
  { value: 'documentary', label: '纪录片' },
]

const LENGTH_OPTIONS: { value: ScriptParams['length']; label: string }[] = [
  { value: 'short', label: '短 · 1 场' },
  { value: 'medium', label: '中 · 3 场' },
  { value: 'long', label: '长 · 5 场' },
]

export default function ScriptNode({ id, data, selected }: NodeProps<PineNode>) {
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const updateNodeOutput = useStudioStore((s) => s.updateNodeOutput)
  const params = data.params as ScriptParams
  const status = data.status

  return (
    <div
      className={`w-[360px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#FF6A3D]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      <NodeActionBar id={id} status={status} output={data.output} />
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.script }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.script }}
      />

      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2">
        <span className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FF6A3D]">
          <FileText size={12} className="shrink-0" />
          <NodeTitle id={id} title={data.title} />
        </span>
        <StatusBadge status={status} />
      </div>

      <UpstreamIndicator nodeId={id} />

      {/* brief + 参数（v3：tone/length 上节点，不再去 Inspector） */}
      <div className="px-3 py-2">
        <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-ink-3">
          Brief
        </div>
        <textarea
          value={params.brief}
          onChange={(e) => updateNodeParams(id, { brief: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
          rows={4}
          placeholder="一两句话的创意简述…"
          className="nodrag nowheel w-full resize-none rounded-md border border-white/[0.05] bg-bg-2/50 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
        />
        <div className="mt-1.5 flex gap-1.5">
          <ParamSelect
            title="风格"
            value={params.tone}
            options={TONE_OPTIONS}
            onChange={(tone) => updateNodeParams(id, { tone })}
          />
          <ParamSelect
            title="篇幅"
            value={params.length}
            options={LENGTH_OPTIONS}
            onChange={(length) => updateNodeParams(id, { length })}
          />
        </div>
      </div>

      {/* output editor */}
      {(data.output || status === 'running') && (
        <div className="border-t border-white/[0.06] bg-bg-2/40 px-3 py-2">
          <div className="mb-1 flex items-center justify-between text-[9px] font-semibold uppercase tracking-widest text-ink-3">
            <span>剧本</span>
            {data.output && <span className="normal-case tracking-normal text-ink-2">{data.output.length} 字</span>}
          </div>
          <textarea
            value={data.output ?? ''}
            onChange={(e) => updateNodeOutput(id, e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            rows={8}
            placeholder={status === 'running' ? 'MiniMax 生成中…' : ''}
            className="nodrag nowheel w-full resize-none rounded-md border border-white/[0.05] bg-bg-1/60 p-2 font-mono text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
        </div>
      )}

      {/* error */}
      {data.error && (
        <div className="border-t border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
          {data.error}
        </div>
      )}
    </div>
  )
}
