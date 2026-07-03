import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Image as ImageIcon, Loader2, X } from 'lucide-react'
import { useStudioStore } from '../store'
import { activeContent, type AspectRatio, type PineNode } from '../types'
import { IMAGE_PRESETS, KIND_ACCENTS, presetMeta } from '../nodeCatalog'
import { ImageThumb, NodeActionBar, NodeTitle, ParamSelect, StatusBadge, UpstreamIndicator } from './shared'

const ASPECT_OPTIONS: { value: AspectRatio; label: string }[] = [
  { value: '16:9', label: '16:9' },
  { value: '9:16', label: '9:16' },
  { value: '1:1', label: '1:1' },
  { value: '4:3', label: '4:3' },
  { value: '3:4', label: '3:4' },
  { value: '3:2', label: '3:2' },
  { value: '2:3', label: '2:3' },
  { value: '5:4', label: '5:4' },
  { value: '4:5', label: '4:5' },
  { value: '21:9', label: '21:9' },
]

const ASPECT_TO_CLASS: Record<string, string> = {
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '3:2': 'aspect-[3/2]',
  '2:3': 'aspect-[2/3]',
  '5:4': 'aspect-[5/4]',
  '4:5': 'aspect-[4/5]',
  '21:9': 'aspect-[21/9]',
}

/**
 * 图片内容节点（M1 过渡版，M2 按设计稿重制外观）。
 * versions 承载 批量出图 / 三视图 / 四宫格 的多版本，缩略条切换激活版本。
 */
function ImageNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const setPrompt = useStudioStore((s) => s.setPrompt)
  const setPreset = useStudioStore((s) => s.setPreset)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const setActiveVersion = useStudioStore((s) => s.setActiveVersion)
  const clearNodeError = useStudioStore((s) => s.clearNodeError)

  const meta = presetMeta(data.preset)
  const accent = KIND_ACCENTS.image
  const output = activeContent(data)
  const active = data.versions[data.activeVersion]
  const aspectClass = ASPECT_TO_CLASS[data.params.aspectRatio ?? ''] ?? 'aspect-video'
  const canBatch = data.preset === 'single' || data.preset === 'shot'
  const hasAspect = data.preset !== 'char-triview' && data.preset !== 'prop-triview'

  return (
    <div
      className={`w-[340px] rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected ? 'border-white/60' : 'border-white/[0.08]'
      }`}
      style={selected ? { boxShadow: `0 0 0 3px ${accent}33` } : undefined}
    >
      <NodeActionBar id={id} status={data.status} output={output} filename={`${data.title}.png`} />

      <div className="flex items-center gap-2 px-3 pt-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-1">
        <ImageIcon size={12} style={{ color: accent }} className="shrink-0" />
        <NodeTitle id={id} title={data.title} />
        <span className="ml-auto" />
        <StatusBadge status={data.status} />
      </div>

      <UpstreamIndicator nodeId={id} />

      <div className="space-y-2 p-3">
        {/* 主图 / 占位 */}
        {output ? (
          <ImageThumb src={output} filename={`${data.title}.png`} aspectClass={aspectClass} />
        ) : active?.error ? (
          <div className={`flex items-center justify-center rounded-md border border-red-400/25 bg-red-500/10 p-2 text-center text-[10px] leading-relaxed text-red-300 ${aspectClass}`}>
            {active.error}
          </div>
        ) : (
          <div
            className={`flex items-center justify-center rounded-md border border-white/[0.06] bg-gradient-to-br from-bg-2 to-bg-1 text-[10px] text-ink-3 ${aspectClass}`}
          >
            {data.status === 'running' ? (
              <Loader2 size={16} className="animate-spin text-ink-2" />
            ) : (
              '未生成'
            )}
          </div>
        )}

        {/* 版本缩略条（多版本时展示） */}
        {data.versions.length > 1 && (
          <div className="nodrag flex gap-1 overflow-x-auto">
            {data.versions.map((v, i) => (
              <button
                key={v.id}
                title={v.label ?? `版本 ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveVersion(id, i)
                }}
                className={`relative h-10 w-14 shrink-0 overflow-hidden rounded border transition ${
                  i === data.activeVersion ? 'border-white/70' : 'border-white/[0.08] opacity-70 hover:opacity-100'
                }`}
              >
                {v.content ? (
                  <img src={v.content} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-red-500/10 text-[8px] text-red-300">
                    失败
                  </span>
                )}
                {v.label && (
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-center text-[8px] leading-3 text-white/90">
                    {v.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        <textarea
          value={data.prompt}
          placeholder={meta?.promptPlaceholder}
          onChange={(e) => setPrompt(id, e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          className="nodrag nowheel h-14 w-full resize-none rounded-md border border-white/[0.07] bg-bg-2 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition placeholder:text-ink-3 focus:border-white/25"
        />

        <div className="flex flex-wrap items-center gap-1.5">
          <ParamSelect
            title="生成预设"
            value={data.preset ?? 'single'}
            options={IMAGE_PRESETS.map((p) => ({ value: p.preset, label: p.label }))}
            onChange={(v) => setPreset(id, v)}
          />
          {hasAspect && (
            <ParamSelect
              title="画幅"
              value={data.params.aspectRatio ?? '16:9'}
              options={ASPECT_OPTIONS}
              onChange={(v) => updateNodeParams(id, { aspectRatio: v })}
            />
          )}
          <ParamSelect
            title="画质"
            value={data.params.quality ?? '1K'}
            options={[
              { value: '1K', label: '1K' },
              { value: '2K', label: '2K' },
              { value: '4K', label: '4K' },
            ]}
            onChange={(v) => updateNodeParams(id, { quality: v })}
          />
          {canBatch && (
            <ParamSelect
              title="出图数"
              value={String(data.params.batch ?? 1)}
              options={[
                { value: '1', label: '1×' },
                { value: '2', label: '2×' },
                { value: '4', label: '4×' },
              ]}
              onChange={(v) => updateNodeParams(id, { batch: Number(v) as 1 | 2 | 4 })}
            />
          )}
        </div>

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

export default memo(ImageNodeInner)
