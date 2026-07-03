import { useState } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import { ArrowUp, ChevronDown, X, Zap } from 'lucide-react'
import { useStudioStore } from '../../store'
import { SHADOWS, TOKENS } from '../../designTokens'
import type { PineNodeData } from '../../types'

const RES = ['1080p', '2K', '4K']
const FPS = ['自适应（原帧数）', '30fps', '60fps']
const SLOW = ['自适应（原速）', '放慢 2x', '放慢 4x']

/** 积分区间估算（README §9 示例 47~1706，随参数换算——本地模拟） */
function costRange(res: string, fps: string, slow: string): [number, number] {
  let lo = 47
  let hi = 400
  if (res === '2K') {
    lo *= 2
    hi *= 2
  }
  if (res === '4K') {
    lo *= 4
    hi *= 4.2
  }
  if (fps !== FPS[0]) hi *= 1.4
  if (slow !== SLOW[0]) hi *= 1.2
  return [Math.round(lo), Math.min(1706, Math.round(hi))]
}

function Dropdown({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative w-[200px] shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-[12px] border border-white/[0.08] px-3.5 py-2.5 text-[14px] transition hover:border-white/25"
        style={{ background: 'rgba(255,255,255,0.06)', color: TOKENS.textBody }}
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={13} style={{ color: TOKENS.textMuted }} />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-40 mt-1 w-full rounded-[12px] border border-white/[0.08] p-1.5"
          style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.menu }}
        >
          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                onChange(o)
                setOpen(false)
              }}
              className="block w-full truncate rounded-[9px] px-3 py-2 text-left text-[14px] transition hover:bg-white/[0.06]"
              style={{
                color: TOKENS.textBody,
                background: o === value ? 'rgba(255,255,255,0.07)' : undefined,
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 视频增强配置面板（video-node-tools §9）：420px，三行下拉 + 积分区间提交。
 * 增强后端接入规划中：提交给出诚实 Toast。
 */
export default function VideoEnhancePanel({
  id,
  data,
  thumb,
  onClose,
}: {
  id: string
  data: PineNodeData
  thumb: string | null
  onClose: () => void
}) {
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const [res, setRes] = useState(data.params.enhance?.resolution ?? '1080p')
  const [fps, setFps] = useState(data.params.enhance?.frameRate ?? FPS[0])
  const [slow, setSlow] = useState(data.params.enhance?.slowdown ?? SLOW[0])
  const [lo, hi] = costRange(res, fps, slow)

  const row = 'flex items-center justify-between gap-4'
  const label = 'text-[14px]'

  return (
    <NodeToolbar position={Position.Bottom} offset={14} className="nodrag">
      <div
        className="flex w-[420px] flex-col gap-4 rounded-[22px] border border-white/[0.08] p-[22px]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.panel }}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[16px] font-[650]" style={{ color: TOKENS.textTitle }}>
            视频增强
            <span className="rounded-full px-2.5 py-0.5 text-[12px] font-normal" style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textMuted }}>
              5-10 min
            </span>
          </span>
          <button onClick={onClose} className="rounded p-1 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
            <X size={16} />
          </button>
        </div>

        <div className={row}>
          <span className={label} style={{ color: TOKENS.textBody }}>
            视频高清分辨率
          </span>
          <Dropdown value={res} options={RES} onChange={setRes} />
        </div>
        <div className={row}>
          <span className={label} style={{ color: TOKENS.textBody }}>
            视频帧数（可选）
          </span>
          <Dropdown value={fps} options={FPS} onChange={setFps} />
        </div>
        <div className={row}>
          <span className={label} style={{ color: TOKENS.textBody }}>
            视频放慢倍率（可选）
          </span>
          <Dropdown value={slow} options={SLOW} onChange={setSlow} />
        </div>

        <div className="flex items-center gap-3 pt-1">
          {thumb ? (
            <img src={thumb} alt="源视频" className="h-10 w-10 shrink-0 rounded-[8px] object-cover" />
          ) : (
            <span className="h-10 w-10 shrink-0 rounded-[8px]" style={{ background: '#1A1A1C' }} />
          )}
          <span className="flex-1" />
          <div
            className="flex items-center gap-2.5 rounded-full py-[5px] pl-3.5 pr-1.5"
            style={{ background: '#2A2A2D' }}
            title="积分为本地模拟，随参数换算"
          >
            <span className="flex items-center gap-1 text-[14px] font-semibold" style={{ color: TOKENS.textBody }}>
              <Zap size={15} style={{ color: TOKENS.textMuted }} />
              {lo}~{hi}
            </span>
            <button
              onClick={() => {
                updateNodeParams(id, { enhance: { resolution: res, frameRate: fps, slowdown: slow } })
                window.dispatchEvent(
                  new CustomEvent('pineline:flash', { detail: '视频增强模型接入规划中，配置已保存' }),
                )
                onClose()
              }}
              title="提交增强"
              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white"
              style={{ background: '#F5F5F7' }}
            >
              <ArrowUp size={14} stroke="#0B0B0C" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </NodeToolbar>
  )
}
