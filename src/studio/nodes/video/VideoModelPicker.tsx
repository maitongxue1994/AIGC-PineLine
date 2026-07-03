import { useState } from 'react'
import { Gem, Lock, Volume2 } from 'lucide-react'
import { VIDEO_MODELS } from '../../nodeCatalog'
import { TOKENS } from '../../designTokens'
import { Popover } from '../composerKit'

/**
 * 视频模型选择器（video-node-tools §7）：340px，两层行（名称+徽章+锁｜能力胶囊）。
 * 锁定行点击 = 蓝底态 + 解锁提示行（本地无会员体系，仅还原交互）。
 */
export default function VideoModelPicker({
  current,
  onPick,
}: {
  current: string
  onPick: (id: string) => void
}) {
  const [lockHint, setLockHint] = useState<string | null>(null)

  return (
    <Popover width={340}>
      <div className="p-3">
        {VIDEO_MODELS.map((m) => {
          const active = m.id === current
          const hinting = lockHint === m.id
          return (
            <div key={m.id}>
              <button
                onClick={() => {
                  if (m.locked) {
                    setLockHint(hinting ? null : m.id)
                    return
                  }
                  onPick(m.id)
                }}
                className="w-full rounded-[14px] p-3 text-left transition hover:bg-white/[0.05]"
                style={{
                  background: hinting
                    ? 'rgba(63,155,245,0.08)'
                    : active
                      ? 'rgba(255,255,255,0.05)'
                      : undefined,
                  boxShadow: hinting ? 'inset 0 0 0 1px #3F9BF5' : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  <Gem size={16} style={{ color: TOKENS.textMuted }} />
                  <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
                    {m.name}
                  </span>
                  {m.badge && (
                    <span
                      className="rounded-[6px] px-2 py-0.5 text-[11px] font-semibold text-white"
                      style={{
                        background: m.badge.kind === 'discount' ? '#B8860B' : '#1F8A5B',
                        fontStyle: m.badge.kind === 'discount' ? 'italic' : undefined,
                      }}
                    >
                      {m.badge.text}
                    </span>
                  )}
                  <span className="ml-auto" />
                  {m.locked && <Lock size={14} style={{ color: '#3F9BF5' }} />}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="rounded-full px-2.5 py-[3px] text-[12px]" style={{ background: 'rgba(255,255,255,0.07)', color: '#B8B8BF' }}>
                    ◇ {m.quality}
                  </span>
                  <span className="rounded-full px-2.5 py-[3px] text-[12px]" style={{ background: 'rgba(255,255,255,0.07)', color: '#B8B8BF' }}>
                    {m.durationRange}
                  </span>
                  {m.audio && (
                    <span className="flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[12px]" style={{ background: 'rgba(255,255,255,0.07)', color: '#B8B8BF' }}>
                      <Volume2 size={11} /> 音频
                    </span>
                  )}
                </div>
              </button>
              {hinting && (
                <div className="flex items-center gap-1.5 px-3 py-2 text-[13px]" style={{ color: '#3F9BF5' }}>
                  <Lock size={12} /> 任意一次付费即可全部解锁（演示环境无会员体系）
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Popover>
  )
}
