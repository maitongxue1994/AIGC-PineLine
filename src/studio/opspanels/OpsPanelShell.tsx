import type { ReactNode } from 'react'
import { ArrowUp, Loader2, X, Zap } from 'lucide-react'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 高级操作面板通用外壳（设计稿 §05）：
 * #1B1B1E r22 p24 容器 + 标题/✕ + 右下统一「积分 + 白色提交圆」。
 */
export default function OpsPanelShell({
  title,
  hint,
  cost,
  running,
  onSubmit,
  onClose,
  headerExtra,
  children,
}: {
  title: string
  hint?: string
  cost: number
  running?: boolean
  onSubmit: () => void
  onClose: () => void
  headerExtra?: ReactNode
  children: ReactNode
}) {
  return (
    <div
      className="rounded-[22px] border border-white/[0.08] p-6"
      style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.panel, width: 560 }}
      onDoubleClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[16px] font-semibold" style={{ color: TOKENS.textTitle }}>
          {title}
          {hint && (
            <span className="ml-2 text-[12px] font-normal" style={{ color: TOKENS.textFaint }}>
              {hint}
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          {headerExtra}
          <button
            title="关闭"
            onClick={onClose}
            className="rounded p-1 transition hover:bg-white/[0.06]"
            style={{ color: TOKENS.textMuted }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {children}

      <div className="mt-5 flex items-center justify-end">
        <div
          className="flex items-center gap-2.5 rounded-full py-[5px] pl-3.5 pr-1.5"
          style={{ background: '#2A2A2D' }}
          title={`预计消耗 ${cost} 积分（本地模拟）`}
        >
          <span className="flex items-center gap-1 text-[14px] font-semibold" style={{ color: TOKENS.textBody }}>
            <Zap size={15} style={{ color: TOKENS.textMuted }} />
            {cost}
          </span>
          <button
            disabled={running}
            onClick={onSubmit}
            title={running ? '生成中…' : '应用（生成新版本，可回退）'}
            className="flex h-8 w-8 items-center justify-center rounded-full transition enabled:hover:bg-white disabled:cursor-not-allowed"
            style={{ background: '#F5F5F7' }}
          >
            {running ? (
              <Loader2 size={14} className="animate-spin" stroke="#0B0B0C" />
            ) : (
              <ArrowUp size={14} stroke="#0B0B0C" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/** 面板通用滑杆行（标签 + 轨道 + 数值） */
export function SliderRow({
  label,
  min,
  max,
  step = 1,
  value,
  format,
  trackStyle,
  onChange,
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  format: (v: number) => string
  trackStyle?: React.CSSProperties
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 shrink-0 text-[14px]" style={{ color: TOKENS.textBody }}>
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="studio-zoom-slider min-w-0 flex-1"
        style={trackStyle}
      />
      <span
        className="w-14 shrink-0 text-right font-mono text-[14px] font-semibold"
        style={{ color: TOKENS.textTitle }}
      >
        {format(value)}
      </span>
    </div>
  )
}

/** 面板通用开关（设计稿 44×26 胶囊） */
export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative h-[26px] w-11 shrink-0 rounded-full transition-colors"
      style={{ background: on ? '#F5F5F7' : 'rgba(255,255,255,0.15)' }}
    >
      <span
        className="absolute top-[3px] h-5 w-5 rounded-full transition-all"
        style={{ left: on ? 21 : 3, background: on ? '#0B0B0C' : '#F5F5F7' }}
      />
    </button>
  )
}
