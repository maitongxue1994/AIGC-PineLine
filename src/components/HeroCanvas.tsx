import { motion } from 'framer-motion'
import { FileText, Clapperboard, Film, Sparkles, Image as ImageIcon } from 'lucide-react'

/**
 * Hero's mockup of the infinite Tapflow-style creation canvas.
 * Pure SVG + DOM — not a real editor, but visually rich.
 */
export default function HeroCanvas() {
  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-[1120px] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-bg-2 to-bg-1 shadow-card">
      {/* top chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-3 text-xs text-ink-2">PineLine · Untitled Project · Canvas</div>
        <div className="ml-auto flex items-center gap-2 text-[10px] text-ink-2">
          <span className="chip !py-0.5 !text-[10px]">
            <Sparkles size={10} className="text-brand" />
            Auto-Save
          </span>
          <span className="chip !py-0.5 !text-[10px]">4 Collaborators</span>
        </div>
      </div>

      {/* body: canvas */}
      <div className="relative h-[calc(100%-40px)]">
        {/* grid / dot backdrop */}
        <div className="absolute inset-0 dot-bg opacity-60" />
        <div className="absolute inset-0 bg-radial-fade opacity-70" />

        {/* connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1120 620" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6A3D" />
              <stop offset="100%" stopColor="#7C5CFF" />
            </linearGradient>
            <linearGradient id="wire2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C5CFF" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path
            d="M 300 190 C 380 190, 380 300, 460 300"
            stroke="url(#wire)"
            strokeWidth="1.6"
            fill="none"
            strokeDasharray="4 4"
          />
          <path
            d="M 720 300 C 800 300, 800 200, 880 200"
            stroke="url(#wire2)"
            strokeWidth="1.6"
            fill="none"
            strokeDasharray="4 4"
          />
          <path
            d="M 720 320 C 800 320, 800 430, 880 430"
            stroke="url(#wire2)"
            strokeWidth="1.6"
            fill="none"
            strokeDasharray="4 4"
          />
          <path
            d="M 300 210 C 380 210, 380 430, 460 430"
            stroke="url(#wire)"
            strokeWidth="1.6"
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Node: Script */}
        <NodeCard x="3%" y="18%" accent="#FF6A3D" label="SCRIPT" icon={<FileText size={12} />}>
          <div className="text-[11px] leading-relaxed text-ink-1">
            <div className="text-ink-0">[SCENE 07 · 雨夜屋顶]</div>
            <div className="mt-1 text-ink-2">
              林夜独自伫立霓虹边缘，雨水沿着风衣滑落，远处无人机群亮起……
            </div>
          </div>
          <div className="mt-3 flex gap-1.5">
            <span className="chip !py-0 text-[9px]">chapter 2</span>
            <span className="chip !py-0 text-[9px]">zh · 120字</span>
          </div>
        </NodeCard>

        {/* Node: Storyboard */}
        <NodeCard x="38%" y="40%" accent="#7C5CFF" label="STORYBOARD" icon={<Clapperboard size={12} />} wide>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative aspect-video overflow-hidden rounded-md border border-white/10"
                style={{
                  background:
                    i === 0
                      ? 'linear-gradient(135deg,#2a1a3a,#ff6a3d22,#7c5cff55)'
                      : i === 1
                      ? 'linear-gradient(135deg,#11253a,#22d3ee55,#7c5cff55)'
                      : 'linear-gradient(135deg,#2a0a14,#ff3d7f55,#ff6a3d55)',
                }}
              >
                <div className="absolute left-1 top-1 rounded-sm bg-black/50 px-1 text-[8px] text-white">
                  SHOT-0{i + 1}
                </div>
                <div className="absolute bottom-1 right-1 rounded-sm bg-black/50 px-1 text-[8px] text-white">
                  {['wide', 'medium', 'close'][i]}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-ink-2">
            <span>3 shots · 14s</span>
            <span className="text-brand">●  generating...</span>
          </div>
        </NodeCard>

        {/* Node: Model Router */}
        <NodeCard x="73%" y="18%" accent="#22D3EE" label="MODEL · VIDEO" icon={<Film size={12} />}>
          <div className="text-[11px] text-ink-1">
            <Row k="Model" v="Sora Turbo" />
            <Row k="Motion" v="Cinematic" />
            <Row k="Res" v="3840×1608" />
            <Row k="FPS" v="24" />
          </div>
          <button className="mt-3 w-full rounded-md bg-brand-gradient py-1.5 text-[10px] font-semibold text-white">
            Generate
          </button>
        </NodeCard>

        {/* Node: Final Shot */}
        <NodeCard x="73%" y="58%" accent="#FF3D7F" label="PREVIEW" icon={<ImageIcon size={12} />}>
          <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg,#090618 0%, #2a0a3a 30%, #ff3d7f 70%, #ff6a3d 100%)',
              }}
            />
            {/* scanline */}
            <div className="animate-scan absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-1 left-1 rounded-sm bg-black/50 px-1 text-[8px] text-white">
              00:06 / 00:14
            </div>
          </div>
        </NodeCard>

        {/* cursor */}
        <motion.div
          initial={{ x: 340, y: 220 }}
          animate={{ x: [340, 560, 820, 820, 560, 340], y: [220, 310, 230, 430, 310, 220] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-0 top-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1 L1 13 L5 9 L8 15 L10 14 L7 8 L13 8 Z" fill="#fff" stroke="#000" strokeWidth="1" />
          </svg>
          <div className="ml-3 mt-0.5 rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-medium text-white shadow">
            Mira · 导演
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] py-1 text-[11px] last:border-0">
      <span className="text-ink-2">{k}</span>
      <span className="text-ink-0">{v}</span>
    </div>
  )
}

function NodeCard({
  x,
  y,
  accent,
  label,
  icon,
  children,
  wide,
}: {
  x: string
  y: string
  accent: string
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.random() * 0.3 }}
      style={{ left: x, top: y }}
      className={`absolute ${
        wide ? 'w-[260px]' : 'w-[220px]'
      } rounded-xl border border-white/10 bg-[#0E0E14]/85 p-3 shadow-card backdrop-blur-xl`}
    >
      <div
        className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em]"
        style={{ color: accent }}
      >
        <span className="flex items-center gap-1.5">{icon}{label}</span>
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full" style={{ background: accent }} />
      </div>
      {children}
    </motion.div>
  )
}
