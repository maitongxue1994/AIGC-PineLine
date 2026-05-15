import { motion } from 'framer-motion'
import {
  Camera,
  FileText,
  Image as ImageIcon,
  Mic2,
  MousePointer2,
  Sparkles,
  Video,
  Wand2,
} from 'lucide-react'

/**
 * TapNow-style infinite canvas mockup tailored for film production.
 * It presents media nodes, model routing, and an agent prompt composer.
 */
export default function HeroCanvas() {
  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050506] shadow-card">
      <div className="absolute inset-0 dot-bg opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(255,255,255,0.06),transparent_65%)]" />

      <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[11px] text-ink-1 backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-brand" />
        PineLine Canvas · Agent mode
      </div>

      <div className="absolute bottom-5 left-5 z-20 hidden flex-col gap-2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-xl md:flex">
        {[ImageIcon, Wand2, Camera, Mic2].map((Icon, index) => (
          <span
            key={index}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              index === 1 ? 'bg-white text-black' : 'bg-white/[0.05] text-ink-1'
            }`}
          >
            <Icon size={15} />
          </span>
        ))}
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1180 664" preserveAspectRatio="none">
        <defs>
          <linearGradient id="heroWireA" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#FF6A3D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="heroWireB" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d="M 260 245 C 360 245 430 180 532 178" stroke="url(#heroWireA)" strokeWidth="1.4" fill="none" />
        <path d="M 302 468 C 420 430 498 382 592 356" stroke="url(#heroWireA)" strokeWidth="1.4" fill="none" />
        <path d="M 745 215 C 842 245 865 315 936 338" stroke="url(#heroWireB)" strokeWidth="1.4" fill="none" />
        <path d="M 735 382 C 840 430 858 494 936 512" stroke="url(#heroWireB)" strokeWidth="1.4" fill="none" />
      </svg>

      <MediaNode
        x="7%"
        y="24%"
        title="Reference frame"
        subtitle="雨夜霓虹 · 角色气质"
        icon={<ImageIcon size={13} />}
        tone="warm"
      />
      <TextNode />
      <MediaNode
        x="43%"
        y="13%"
        title="图像生成"
        subtitle="角色定妆照 · 4 variants"
        icon={<Sparkles size={13} />}
        tone="portrait"
        large
      />
      <VideoNode />
      <AudioNode />
      <AgentComposer />

      <motion.div
        initial={{ x: 314, y: 250 }}
        animate={{ x: [314, 550, 702, 938, 620, 314], y: [250, 178, 356, 338, 520, 250] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-0 top-0 z-30"
      >
        <MousePointer2 className="fill-white text-black drop-shadow" size={18} />
        <div className="ml-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black shadow">
          Agent
        </div>
      </motion.div>
    </div>
  )
}

function MediaNode({
  x,
  y,
  title,
  subtitle,
  icon,
  tone,
  large,
}: {
  x: string
  y: string
  title: string
  subtitle: string
  icon: React.ReactNode
  tone: 'warm' | 'portrait'
  large?: boolean
}) {
  const toneClass =
    tone === 'warm'
      ? 'bg-[radial-gradient(circle_at_30%_25%,#FFE8A3_0%,#F3A66C_28%,#6D283E_58%,#071018_100%)]'
      : 'bg-[radial-gradient(circle_at_45%_18%,#F9D6BD_0%,#D78B92_26%,#7047A8_58%,#101019_100%)]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: large ? 0.16 : 0.05 }}
      style={{ left: x, top: y }}
      className={`absolute z-10 ${large ? 'w-[310px]' : 'w-[260px]'} overflow-hidden rounded-2xl border border-white/10 bg-[#101014]/90 shadow-card backdrop-blur-xl`}
    >
      <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-ink-1">
        <span className="text-brand">{icon}</span>
        {title}
      </div>
      <div className={`${large ? 'h-[150px]' : 'h-[118px]'} ${toneClass} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-40" />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2 py-1 text-[10px] text-white">
          {subtitle}
        </div>
      </div>
    </motion.div>
  )
}

function TextNode() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.12 }}
      className="absolute left-[12%] top-[62%] z-10 w-[270px] rounded-2xl border border-white/10 bg-[#101014]/90 p-4 shadow-card backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase text-brand">
        <FileText size={13} />
        Script context
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-1">
        女主穿过雨夜天桥，城市屏幕在她身后熄灭。保留冷蓝主色与湿润地面反光。
      </p>
      <div className="mt-3 flex gap-1.5 text-[10px] text-ink-2">
        <span className="rounded-full border border-white/10 px-2 py-0.5">Chapter 02</span>
        <span className="rounded-full border border-white/10 px-2 py-0.5">Neo noir</span>
      </div>
    </motion.div>
  )
}

function VideoNode() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.24 }}
      className="absolute right-[7%] top-[35%] z-10 w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#101014]/90 shadow-card backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-ink-1">
        <Video size={13} className="text-brand-cyan" />
        视频生成
      </div>
      <div className="relative h-[120px] bg-[linear-gradient(135deg,#06070C_0%,#142A35_34%,#22D3EE_58%,#FF3D7F_100%)]">
        <div className="animate-scan absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white">
          24fps · 6s · dolly in
        </span>
      </div>
    </motion.div>
  )
}

function AudioNode() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.32 }}
      className="absolute right-[11%] top-[70%] z-10 w-[230px] rounded-2xl border border-white/10 bg-[#101014]/90 p-4 shadow-card backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-[11px] text-ink-1">
        <Mic2 size={13} className="text-brand-lime" />
        音频生成
      </div>
      <div className="mt-4 flex h-12 items-end gap-1">
        {[18, 30, 22, 42, 28, 48, 35, 25, 40, 20, 32, 26].map((height, index) => (
          <span
            key={index}
            className="w-full rounded-t bg-brand-gradient opacity-80"
            style={{ height }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function AgentComposer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.38 }}
      className="absolute bottom-[9%] left-1/2 z-20 w-[430px] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#1A1A1E]/95 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-white">
        <Sparkles size={14} className="text-brand" />
        PineLine Agent
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-ink-2">
        Describe your scene or pick nodes as context...
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-2">
        <span>已选择 Reference frame + Script context</span>
        <button className="rounded-full bg-white px-3 py-1 font-semibold text-black">生成下一步</button>
      </div>
    </motion.div>
  )
}
