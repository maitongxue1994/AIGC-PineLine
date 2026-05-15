import { motion } from 'framer-motion'
import { Aperture, Box, Replace, SlidersHorizontal, SunMedium } from 'lucide-react'

const CONTROLS = [
  {
    icon: Aperture,
    title: '专业级镜头控制',
    desc: '把景别、焦段、机位、旋转、俯仰和缩放直接写进镜头节点，减少随机生成。',
    panel: 'lens',
  },
  {
    icon: SunMedium,
    title: '影棚级灯光控制',
    desc: '用主光、轮廓光、色温和全局亮度统一镜头质感，适合广告与短剧批量镜头。',
    panel: 'light',
  },
  {
    icon: Replace,
    title: '视频对象替换',
    desc: '替换角色、服装或道具，同时保留构图、光照、运镜和场景连续性。',
    panel: 'replace',
  },
]

export default function ProfessionalControls() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Creative Controls</div>
          <h2 className="section-title mt-3">
            从好看的生成，到<span className="text-gradient">可导演的镜头</span>
          </h2>
          <p className="mt-4 text-ink-1">
            对标 TapNow 的镜头、灯光与替换能力，PineLine 把控制项落到影视团队熟悉的镜头语言中。
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CONTROLS.map((control, index) => (
            <motion.div
              key={control.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] shadow-card"
            >
              <div className="p-6">
                <control.icon size={20} className="text-white" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">{control.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-1">{control.desc}</p>
              </div>
              <ControlPanel kind={control.panel} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ControlPanel({ kind }: { kind: string }) {
  if (kind === 'lens') {
    return (
      <div className="border-t border-white/[0.06] bg-black/30 p-5">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-ink-1">
          <Box size={14} className="text-brand" />
          镜头组合
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {['18mm', '35mm', '50mm', '85mm', '135mm', '200mm'].map((lens, index) => (
            <span
              key={lens}
              className={`rounded-full border px-3 py-2 ${
                index === 2 ? 'border-white bg-white text-black' : 'border-white/10 bg-white/[0.04] text-ink-1'
              }`}
            >
              {lens}
            </span>
          ))}
        </div>
        <Slider label="旋转" value="32%" />
        <Slider label="俯仰" value="62%" />
      </div>
    )
  }

  if (kind === 'light') {
    return (
      <div className="border-t border-white/[0.06] bg-black/30 p-5">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-ink-1">
          <SlidersHorizontal size={14} className="text-brand-cyan" />
          灯光参数
        </div>
        <Slider label="亮度" value="58%" />
        <Slider label="色温 5600K" value="72%" />
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-ink-1">
          {['主光', '轮廓光', '环境光'].map((light) => (
            <span key={light} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
              {light}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-white/[0.06] bg-black/30 p-5">
      <div className="relative h-40 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#101018,#29344A_40%,#FF6A3D_100%)]">
        <div className="absolute left-5 top-5 h-20 w-14 rounded-full border-2 border-dashed border-white/70" />
        <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Actor A</div>
        <div className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">Replace</div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-2">
        保留背景、构图与运镜，只替换选中主体。
      </p>
    </div>
  )
}

function Slider({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-xs text-ink-2">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-brand-gradient" style={{ width: value }} />
      </div>
    </div>
  )
}
