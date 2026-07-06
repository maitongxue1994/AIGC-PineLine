import { useEffect, useState } from 'react'
import { ArrowUp, Globe, Sparkles, X } from 'lucide-react'
import { useAgentStore } from './agent/agentStore'
import { SUGGESTIONS } from './agent/suggestions'
import { SHADOWS, TOKENS } from './designTokens'

/**
 * 进入页落地层（三段式，覆盖在画布之上、AgentPanel 之下）：
 * - 上半：透明穿透（画布连同已生成的图/工作流在下方可见可交互）
 * - 中间：醒目的大号 AI 助手输入框 + 3 个经典案例引导（解决「右下角 AI 太不明显」）
 * - 下半：留白
 * 发送 / 点引导 / 关闭后淡出，进入常规画布 + AgentPanel。
 */
export default function StudioLanding() {
  const [open, setOpen] = useState(true)
  const [draft, setDraft] = useState('')
  const send = useAgentStore((s) => s.send)
  const setPanelOpen = useAgentStore((s) => s.setOpen)
  const webSearch = useAgentStore((s) => s.webSearch)
  const setWebSearch = useAgentStore((s) => s.setWebSearch)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const go = (text: string) => {
    const t = text.trim()
    if (!t) return
    setPanelOpen(true) // 打开对话面板承接后续
    setOpen(false)
    void send(t)
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[35] flex flex-col">
      {/* 上半：透明穿透，画布（含已生成的图/工作流）在下方可见 */}
      <div className="flex-[0.9]" />

      {/* 中间：大输入框 + 引导（下方渐变遮住画布避免干扰阅读） */}
      <div
        className="pointer-events-auto px-6"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(11,11,12,0.86) 22%, rgba(11,11,12,0.96))',
        }}
      >
        <div className="mx-auto w-full max-w-[720px] pb-6 pt-10">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-[10px]" style={{ background: TOKENS.brandGradient }} />
              <span className="text-[22px] font-bold" style={{ color: TOKENS.textTitle }}>
                今天想创作点什么？
              </span>
            </div>
            <button
              title="进入空白画布"
              onClick={() => setOpen(false)}
              className="pointer-events-auto rounded-full p-2 transition hover:bg-white/[0.08]"
              style={{ color: TOKENS.textMuted }}
            >
              <X size={18} />
            </button>
          </div>

          {/* 大号输入框 */}
          <div
            className="rounded-[20px] border border-white/[0.1] p-3.5"
            style={{ background: 'rgba(28,28,31,0.92)', boxShadow: SHADOWS.modal }}
          >
            <textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  go(draft)
                }
              }}
              placeholder="用一句话描述你想做的片子，AI 助手会帮你搭好整条管线并生成…"
              className="block h-[76px] w-full resize-none bg-transparent px-1.5 text-[16px] leading-relaxed outline-none placeholder:text-white/30"
              style={{ color: TOKENS.textBody }}
            />
            <div className="flex items-center gap-2 px-1 pt-1">
              <button
                onClick={() => setWebSearch(!webSearch)}
                title="联网搜索"
                className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] transition hover:bg-white/[0.08]"
                style={{
                  color: webSearch ? '#8AB8FF' : TOKENS.textFaint,
                  background: webSearch ? 'rgba(46,155,255,0.12)' : undefined,
                }}
              >
                <Globe size={13} /> 联网
              </button>
              <span className="flex-1" />
              <button
                disabled={!draft.trim()}
                onClick={() => go(draft)}
                title="发送 (Enter)"
                className="flex h-9 w-9 items-center justify-center rounded-full transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: '#F5F5F7' }}
              >
                <ArrowUp size={16} stroke="#0B0B0C" strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* 3 个经典案例引导 */}
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.title}
                onClick={() => go(s.prompt)}
                className="rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-3 text-left transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} style={{ color: TOKENS.accent }} />
                  <span className="text-[13px] font-semibold" style={{ color: TOKENS.textBody }}>
                    {s.title}
                  </span>
                </div>
                <div className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
                  {s.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 下半：留白（深色，盖住画布下部） */}
      <div className="pointer-events-auto flex-1" style={{ background: 'rgba(11,11,12,0.96)' }} />
    </div>
  )
}
