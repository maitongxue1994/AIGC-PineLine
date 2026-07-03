import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { FileText, X } from 'lucide-react'
import { useStudioStore } from '../store'
import { activeContent, type PineNode } from '../types'
import { KIND_ACCENTS, TEXT_PRESETS, presetMeta } from '../nodeCatalog'
import { NodeActionBar, NodeTitle, ParamSelect, StatusBadge, UpstreamIndicator } from './shared'

/**
 * 文本内容节点（M1 过渡版，M2 按设计稿重制外观）。
 * preset 决定生成语义：剧本 / 分镜 / 广告词 / 自由文本。
 */
function TextNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const setPrompt = useStudioStore((s) => s.setPrompt)
  const setPreset = useStudioStore((s) => s.setPreset)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const updateActiveContent = useStudioStore((s) => s.updateActiveContent)
  const clearNodeError = useStudioStore((s) => s.clearNodeError)

  const meta = presetMeta(data.preset)
  const accent = KIND_ACCENTS.text
  const output = activeContent(data)

  return (
    <div
      className={`w-[360px] rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected ? 'border-white/60' : 'border-white/[0.08]'
      }`}
      style={selected ? { boxShadow: `0 0 0 3px ${accent}33` } : undefined}
    >
      <NodeActionBar id={id} status={data.status} output={output} />

      <div className="flex items-center gap-2 px-3 pt-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-1">
        <FileText size={12} style={{ color: accent }} className="shrink-0" />
        <NodeTitle id={id} title={data.title} />
        <span className="ml-auto" />
        <StatusBadge status={data.status} />
      </div>

      <UpstreamIndicator nodeId={id} />

      <div className="space-y-2 p-3">
        <textarea
          value={data.prompt}
          placeholder={meta?.promptPlaceholder}
          onChange={(e) => setPrompt(id, e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          className="nodrag nowheel h-16 w-full resize-none rounded-md border border-white/[0.07] bg-bg-2 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition placeholder:text-ink-3 focus:border-white/25"
        />

        <div className="flex flex-wrap items-center gap-1.5">
          <ParamSelect
            title="生成预设"
            value={data.preset ?? 'script'}
            options={TEXT_PRESETS.map((p) => ({ value: p.preset, label: p.label }))}
            onChange={(v) => setPreset(id, v)}
          />
          {data.preset === 'storyboard' ? (
            <>
              <ParamSelect
                title="拆分方式"
                value={data.params.splitMode ?? 'auto'}
                options={[
                  { value: 'auto', label: '自动拆分' },
                  { value: 'manual', label: '分隔符' },
                ]}
                onChange={(v) => updateNodeParams(id, { splitMode: v })}
              />
              {data.params.splitMode === 'manual' && (
                <input
                  value={data.params.splitter ?? ''}
                  placeholder="分隔符，如 ---"
                  onChange={(e) => updateNodeParams(id, { splitter: e.target.value })}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="nodrag w-20 rounded-md border border-white/[0.07] bg-bg-2 px-1.5 py-1 text-[10px] text-ink-1 outline-none focus:border-white/30"
                />
              )}
            </>
          ) : (
            <>
              {data.preset !== 'free' && (
                <ParamSelect
                  title="风格"
                  value={data.params.tone ?? 'cinematic'}
                  options={[
                    { value: 'cinematic', label: '电影级' },
                    { value: 'commercial', label: '商业广告' },
                    { value: 'drama', label: '短剧' },
                    { value: 'documentary', label: '纪录片' },
                  ]}
                  onChange={(v) => updateNodeParams(id, { tone: v })}
                />
              )}
              <ParamSelect
                title="篇幅"
                value={data.params.length ?? 'short'}
                options={[
                  { value: 'short', label: '短' },
                  { value: 'medium', label: '中' },
                  { value: 'long', label: '长' },
                ]}
                onChange={(v) => updateNodeParams(id, { length: v })}
              />
            </>
          )}
        </div>

        {output != null && (
          <textarea
            value={output}
            onChange={(e) => updateActiveContent(id, e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            className="nodrag nowheel h-36 w-full resize-none rounded-md border border-white/[0.07] bg-bg-1 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
        )}

        {data.error && (
          <div className="flex items-start gap-2 rounded-md border border-red-400/30 bg-red-500/10 p-2 text-[10px] leading-relaxed text-red-300">
            <span className="min-w-0 flex-1 break-all">{data.error}</span>
            <button
              title="清除错误"
              onClick={() => clearNodeError(id)}
              className="nodrag shrink-0 rounded p-0.5 text-red-300/80 transition hover:bg-red-500/20 hover:text-red-200"
            >
              <X size={11} />
            </button>
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !border-2 !border-white/40 !bg-bg-2" />
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !border-2 !border-white/40 !bg-bg-2" />
    </div>
  )
}

export default memo(TextNodeInner)
