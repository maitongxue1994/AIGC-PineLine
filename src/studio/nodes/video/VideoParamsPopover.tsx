import { Info } from 'lucide-react'
import { useStudioStore } from '../../store'
import { DEFAULT_VIDEO_MODEL, VIDEO_MODELS } from '../../nodeCatalog'
import { SliderRow } from '../../opspanels/OpsPanelShell'
import { TOKENS } from '../../designTokens'
import { Popover } from '../composerKit'
import type { PineNodeData, VideoMode, VideoRatio, VideoResolution } from '../../types'

/** 6 个固定比例的图形化尺寸（'auto' 自适应单独整行呈现） */
const RATIOS: { value: Exclude<VideoRatio, 'auto'>; w: number; h: number }[] = [
  { value: '16:9', w: 18, h: 10 },
  { value: '4:3', w: 16, h: 12 },
  { value: '1:1', w: 13, h: 13 },
  { value: '3:4', w: 12, h: 16 },
  { value: '9:16', w: 10, h: 18 },
  { value: '21:9', w: 20, h: 9 },
]
const ALL_RESOLUTIONS: VideoResolution[] = ['480p', '720p', '1080p', '4k']

/**
 * 视频参数弹层（video-node-tools §6）：生成方式 / 比例 / 清晰度 / 时长，随所选模型能力联动。
 * Seedance 2.0 官方对齐：全能参考仅 2.0 系列；比例 7 值；清晰度 480p~4k 按模型禁用；时长 [min,max] 滑块。
 * 参数变化即时换算积分（由 PromptBar 的 estimateCost 显示）。
 */
export default function VideoParamsPopover({ id, data }: { id: string; data: PineNodeData }) {
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const { params } = data
  const mode: VideoMode = params.videoMode ?? 'frames'
  const model =
    VIDEO_MODELS.find((m) => m.id === (params.videoModel ?? DEFAULT_VIDEO_MODEL)) ?? VIDEO_MODELS[0]
  const canOmni = !!model.omniReference

  const groupTitle = 'mb-2.5 text-[14px] font-semibold'

  const curRatio = params.videoRatio ?? 'auto'
  // 当前分辨率不被模型支持时，高亮回落到首个支持档（切模型时 params 已由 PromptBar 修正，这里为双保险）
  const curRes: VideoResolution = model.resolutions.includes(params.videoResolution ?? '720p')
    ? (params.videoResolution ?? '720p')
    : model.resolutions[0]
  const dur = Math.min(model.durationMax, Math.max(model.durationMin, params.videoDuration ?? 5))

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
              const disabled = v === 'omni' && !canOmni
              return (
                <button
                  key={v}
                  disabled={disabled}
                  title={disabled ? '仅 Seedance 2.0 系列支持全能参考' : undefined}
                  onClick={() =>
                    updateNodeParams(id, {
                      videoMode: v,
                      // 方式切换 → 比例联动重置（首尾帧自适应；全能参考默认 16:9）
                      videoRatio: v === 'frames' ? 'auto' : (params.videoRatio ?? '16:9'),
                    })
                  }
                  className="flex flex-1 items-center justify-center gap-1 rounded-[11px] py-2 text-[14px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
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
            <div className="flex flex-col gap-1.5">
              {/* 自适应（adaptive）整行 */}
              <button
                onClick={() => updateNodeParams(id, { videoRatio: 'auto' })}
                className="rounded-[12px] py-2 text-center text-[13px] transition"
                style={{
                  background:
                    curRatio === 'auto' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                  color: curRatio === 'auto' ? TOKENS.textTitle : TOKENS.textMuted,
                  fontWeight: curRatio === 'auto' ? 600 : 400,
                }}
              >
                自适应
              </button>
              {/* 6 个固定比例 */}
              <div
                className="grid grid-cols-3 gap-1.5 rounded-[14px] p-2.5"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {RATIOS.map((r) => {
                  const on = curRatio === r.value
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
            </div>
          )}
        </div>

        {/* 清晰度（按模型支持档位联动禁用） */}
        <div>
          <div className={groupTitle} style={{ color: '#D6D6DB' }}>
            清晰度
          </div>
          <div
            className="grid grid-cols-4 gap-1 rounded-[14px] p-1"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            {ALL_RESOLUTIONS.map((r) => {
              const supported = model.resolutions.includes(r)
              const on = supported && curRes === r
              return (
                <button
                  key={r}
                  disabled={!supported}
                  title={!supported ? `${model.name} 不支持 ${r}` : undefined}
                  onClick={() => updateNodeParams(id, { videoResolution: r })}
                  className="rounded-[11px] py-2 text-[13px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-30"
                  style={{
                    background: on ? 'rgba(255,255,255,0.12)' : undefined,
                    color: on ? TOKENS.textTitle : TOKENS.textMuted,
                  }}
                >
                  {r}
                </button>
              )
            })}
          </div>
        </div>

        {/* 生成时长（滑块，范围随模型：Seedance 2.0 为 4-15s） */}
        <div>
          <div className={groupTitle} style={{ color: '#D6D6DB' }}>
            生成时长
          </div>
          <SliderRow
            label=""
            min={model.durationMin}
            max={model.durationMax}
            step={1}
            value={dur}
            format={(v) => `${v}s`}
            onChange={(v) => updateNodeParams(id, { videoDuration: v })}
          />
        </div>
      </div>
    </Popover>
  )
}
