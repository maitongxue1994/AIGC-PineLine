import { useState } from 'react'
import { TEMPLATES } from '../templates'
import { useStudioStore } from '../store'
import { useUIStore } from '../uiStore'
import { SHADOWS, TOKENS } from '../designTokens'

/** 左栏「模板」面板：公共模板卡片网格；应用 = 清空并替换画布（⌘Z 可撤） */
export default function TemplatePanel() {
  const applyTemplate = useStudioStore((s) => s.applyTemplate)
  const hasNodes = useStudioStore((s) => s.nodes.length > 0)
  const setActivePanel = useUIStore((s) => s.setActivePanel)
  const [tab, setTab] = useState<'public' | 'mine'>('public')

  const handlePick = (id: (typeof TEMPLATES)[number]['id']) => {
    if (
      hasNodes &&
      !window.confirm('应用模板会清空当前画布（可先「导出」备份，⌘/Ctrl+Z 可撤销）。继续？')
    )
      return
    applyTemplate(id)
    setActivePanel(null)
  }

  return (
    <div
      className="w-[300px] rounded-[20px] border border-white/[0.07] p-3"
      style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.panel }}
    >
      <div className="flex items-center gap-4 border-b border-white/[0.07] px-1.5 pb-2.5">
        <button
          onClick={() => setTab('public')}
          className="text-[14px] font-semibold transition"
          style={{
            color: tab === 'public' ? TOKENS.textTitle : TOKENS.textMuted,
            borderBottom: tab === 'public' ? '2px solid #F5F5F7' : '2px solid transparent',
            paddingBottom: 4,
          }}
        >
          公共模板
        </button>
        <button
          disabled
          title="我的模板（规划中）"
          className="cursor-not-allowed text-[14px] opacity-50"
          style={{ color: TOKENS.textMuted }}
        >
          我的模板
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => handlePick(t.id)}
            className="flex items-center gap-3 rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-3 text-left transition hover:border-white/25 hover:bg-white/[0.05]"
          >
            <span className="text-xl">{t.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold" style={{ color: TOKENS.textTitle }}>
                {t.title}
              </span>
              <span className="block text-[12px]" style={{ color: TOKENS.textMuted }}>
                {t.desc}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-2 px-1 text-[11px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
        应用模板会替换当前画布，⌘/Ctrl+Z 可一步撤回。
      </div>
    </div>
  )
}
