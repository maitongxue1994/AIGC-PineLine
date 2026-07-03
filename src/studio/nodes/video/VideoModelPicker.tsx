import { useEffect, useState } from 'react'
import { Gem, KeyRound, Volume2 } from 'lucide-react'
import { VIDEO_MODELS } from '../../nodeCatalog'
import { useStudioStore } from '../../store'
import { TOKENS } from '../../designTokens'
import { Popover } from '../composerKit'

/**
 * 视频模型选择器（video-node-tools §7）：340px，两层行（名称+徽章｜能力胶囊）。
 * 真实 provider 映射：密钥未配置的行显示 🔑 与接入指引（就绪状态来自
 * /api/generate/video-status readiness，本地无 Worker 时按未知处理不拦选）。
 */
export default function VideoModelPicker({
  current,
  onPick,
}: {
  current: string
  onPick: (id: string) => void
}) {
  const readiness = useStudioStore((s) => s.videoReadiness)
  const loadVideoReadiness = useStudioStore((s) => s.loadVideoReadiness)
  const [keyHint, setKeyHint] = useState<string | null>(null)

  useEffect(() => {
    void loadVideoReadiness()
  }, [loadVideoReadiness])

  return (
    <Popover width={340}>
      <div className="p-3">
        {VIDEO_MODELS.map((m) => {
          const active = m.id === current
          const needsKey = readiness ? !readiness[m.provider] : false
          const hinting = keyHint === m.id
          return (
            <div key={m.id}>
              <button
                onClick={() => {
                  if (needsKey) {
                    setKeyHint(hinting ? null : m.id)
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
                  {needsKey && <KeyRound size={14} style={{ color: '#3F9BF5' }} />}
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
                  {m.lastFrame && (
                    <span className="rounded-full px-2.5 py-[3px] text-[12px]" style={{ background: 'rgba(255,255,255,0.07)', color: '#B8B8BF' }}>
                      首尾帧
                    </span>
                  )}
                </div>
              </button>
              {hinting && (
                <div className="flex items-center gap-1.5 px-3 py-2 text-[13px]" style={{ color: '#3F9BF5' }}>
                  <KeyRound size={12} /> 未配置 API Key：见 docs/视频生成接入指南.md
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Popover>
  )
}
