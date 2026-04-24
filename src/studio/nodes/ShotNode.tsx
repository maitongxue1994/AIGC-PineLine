import { useState } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import {
  Camera,
  Play,
  Loader2,
  Download,
  Maximize2,
} from 'lucide-react'
import { useStudioStore } from '../store'
import type { PineNode, ShotParams } from '../types'
import {
  ACCENTS,
  IconButton,
  PreviewLightbox,
  StatusBadge,
  downloadDataUrl,
} from './shared'

const HANDLES: { id: string; label: string; color: string; top: string }[] = [
  { id: 'scene', label: '场景', color: ACCENTS.scene, top: '30%' },
  { id: 'character', label: '角色', color: ACCENTS.character, top: '55%' },
  { id: 'prop', label: '道具', color: ACCENTS.prop, top: '80%' },
]

export default function ShotNode({ id, data, selected }: NodeProps<PineNode>) {
  const runNode = useStudioStore((s) => s.runNode)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const params = data.params as ShotParams
  const status = data.status
  const [preview, setPreview] = useState(false)

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
      className={`w-[340px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#7C5CFF]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      {/* upper text handle (from storyboard) */}
      <Handle
        id="text"
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.storyboard, top: '8%' }}
      />
      {HANDLES.map((h) => (
        <Handle
          key={h.id}
          id={h.id}
          type="target"
          position={Position.Left}
          className="!h-3 !w-3 !border-2 !border-bg-0"
          style={{ background: h.color, top: h.top }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0"
        style={{ background: ACCENTS.shot }}
      />

      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: ACCENTS.shot }}
        >
          <Camera size={12} />
          SHOT · {data.title}
        </span>
        <StatusBadge status={status} accent={ACCENTS.shot} />
      </div>

      {/* handle legend */}
      <div className="border-b border-white/[0.06] px-3 py-1.5 text-[9px] text-ink-3">
        <div className="flex flex-wrap gap-2">
          <Legend color={ACCENTS.storyboard} label="分镜描述" />
          <Legend color={ACCENTS.scene} label="场景" />
          <Legend color={ACCENTS.character} label="角色" />
          <Legend color={ACCENTS.prop} label="道具" />
        </div>
      </div>

      <div className="p-3">
        <div className={`relative overflow-hidden rounded-md border border-white/[0.08] ${aspectClass}`}>
          {data.output ? (
            <>
              <img src={data.output} alt={data.title} className="h-full w-full object-cover" />
              <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition [.react-flow__node:hover_&]:opacity-100">
                <IconButton title="放大" onClick={(e) => { e.stopPropagation(); setPreview(true) }}>
                  <Maximize2 size={11} />
                </IconButton>
                <IconButton
                  title="下载"
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadDataUrl(data.output!, `${data.title || 'shot'}.png`)
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
                  合成中…
                </div>
              ) : (
                <span>未生成</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-2">
          <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-ink-3">
            分镜图描述
          </div>
          <textarea
            value={params.shotDescription}
            onChange={(e) => updateNodeParams(id, { shotDescription: e.target.value })}
            onMouseDown={(e) => e.stopPropagation()}
            rows={3}
            placeholder="留空会从上游分镜节点取第一条描述…"
            className="nodrag nowheel w-full resize-none rounded-md border border-white/[0.05] bg-bg-2/50 p-2 text-[11px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
        </div>
        <div className="mt-1 text-[10px] text-ink-3">
          {params.aspectRatio} · 多参考：场景 / 角色 / 道具
        </div>
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
              生成分镜图
            </>
          )}
        </button>
      </div>

      {preview && data.output && (
        <PreviewLightbox
          src={data.output}
          filename={`${data.title || 'shot'}.png`}
          onClose={() => setPreview(false)}
        />
      )}
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
}
