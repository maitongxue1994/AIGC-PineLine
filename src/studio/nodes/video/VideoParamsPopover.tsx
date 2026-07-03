import { Info } from 'lucide-react'
import { useStudioStore } from '../../store'
import { TOKENS } from '../../designTokens'
import { Popover } from '../composerKit'
import type { PineNodeData, VideoDuration, VideoMode, VideoRatio } from '../../types'

const RATIOS: { value: Exclude<VideoRatio, 'auto'>; w: number; h: number }[] = [
  { value: '16:9', w: 16, h: 9 },
  { value: '9:16', w: 9, h: 16 },
  { value: '1:1', w: 13, h: 13 },
]

/**
 * 视频参数弹层（video-node-tools §6）：生成方式 / 比例（随方式联动）/ 清晰度 / 时长。
 * 参数变化即时换算积分（由 PromptBar 的 estimateCost 显示）。
 */
export default function VideoParamsPopover({ id, data }: { id: string; data: PineNodeData }) {
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const { params } = data
  const mode: VideoMode = params.videoMode ?? 'frames'

  const groupTitle = 'mb-2.5 text-[14px] font-semibold'

  return (
    <Popover width={320}>
      <div className="flex flex-col gap-[18px] p-[22px]">
        {/* 生成方式 */}
        <div>
          <div className={groupTitle} style={{ color: '#D6D6DB' }}>
            生成方式
          </div>
          <div className="flex rounded-[14px] p-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {(
              [
                ['frames', '首尾帧'],
                ['omni', '全能参考'],
              ] as const
            ).map(([v, label]) => {
              const on = mode === v
              return (
                <button
                  key={v}
                  onClick={() =>
                    updateNodeParams(id, {
                      videoMode: v,
                      // 方式切换 → 比例联动重置
                      videoRatio: v === 'frames' ? 'auto' : (params.videoRatio ?? '16:9'),
                    })
                  }
                  className="flex flex-1 items-center justify-center gap-1 rounded-[11px] py-2 text-[14px] font-semibold transition"
                  style={{
                    background: on ? 'rgba(255,255,255,0.12)' : undefined,
                    color: on ? TOKENS.textTitle : TOKENS.textMuted,
                  }}
                >
                  {label}
                  {v === 'omni' && <Info size={12} style={{ color: TOKENS.textFaint }} />}
                </button>
              )
            })}
          </div>
        </div>

        {/* 比例（联动） */}
        <div>
          <div className={groupTitle} style={{ color: '#D6D6DB' }}>
            比例
          </div>
          {mode === 'frames' ? (
            <div
              className="rounded-[14px] py-2.5 text-center text-[14px]"
              style={{ background: 'rgba(255,255,255,0.06)', color: TOKENS.textBody }}
            >
              自适应（跟随首帧）
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5 rounded-[14px] p-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {RATIOS.map((r) => {
                const on = (params.videoRatio ?? '16:9') === r.value
                return (
                  <button
                    key={r.value}
                    onClick={() => updateNodeParams(id, { videoRatio: r.value })}
                    className="flex flex-col items-center gap-1.5 rounded-[10px] px-1 py-2.5 transition"
                    style={{
                      color: on ? TOKENS.textTitle : TOKENS.textMuted,
                      background: on ? 'rgba(255,255,255,0.1)' : undefined,
                      fontWeight: on ? 600 : 400,
                    }}
                  >
                    <span
                      className="rounded-[3px]"
                      style={{ width: r.w, height: r.h, border: '1.6px solid currentColor' }}
                    />
                    <span className="text-[13px]">{r.value}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* 清晰度 */}
        <div>
          <div className={groupTitle} style={{ color: '#D6D6DB' }}>
            清晰度
          </div>
          <div
            className="rounded-[14px] py-2.5 text-center text-[14px]"
            style={{ background: 'rgba(255,255,255,0.06)', color: TOKENS.textBody }}
          >
            自适应
          </div>
        </div>

        {/* 生成时长 */}
        <div>
          <div className={groupTitle} style={{ color: '#D6D6DB' }}>
            生成时长
          </div>
          <div className="flex rounded-[14px] p-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {([5, 10] as VideoDuration[]).map((d) => {
              const on = (params.videoDuration ?? 10) === d
              return (
                <button
                  key={d}
                  onClick={() => updateNodeParams(id, { videoDuration: d })}
                  className="flex-1 rounded-[11px] py-2 text-[14px] font-semibold transition"
                  style={{
                    background: on ? 'rgba(255,255,255,0.12)' : undefined,
                    color: on ? TOKENS.textTitle : TOKENS.textMuted,
                  }}
                >
                  {d}s
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Popover>
  )
}
