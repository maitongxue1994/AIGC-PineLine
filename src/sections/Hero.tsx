import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clapperboard, Sparkles, Wand2 } from 'lucide-react'
import HeroCanvas from '../components/HeroCanvas'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-28 md:pt-32">
      {/* grid background */}
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-35 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_32%,#000_28%,transparent_78%)]" />

      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[480px] w-[1040px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.12] blur-[150px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="chip">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand" />
            PineLine Agentic Film Canvas
          </span>

          <h1 className="mt-7 max-w-4xl font-display text-display-xl font-semibold leading-[0.98] text-white [word-break:keep-all]">
            你的影视
            <br />
            <span className="text-gradient">智能体创意画布</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-1 md:text-lg">
            PineLine 是面向专业影视创作的 AI Agent 工作台。统一调度剧本、图像、音频与视频模型，
            把角色、分镜、镜头控制、生成与剪辑连成一张可复用的创意画布。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/studio" className="btn-light">
              <Sparkles size={14} />
              进入画布体验
              <ArrowRight size={14} />
            </Link>
            <Link to="/templates" className="btn-ghost">
              查看工作流模板
            </Link>
          </div>

          <div className="mt-8 grid max-w-3xl gap-3 text-xs text-ink-2 sm:grid-cols-3">
            <span className="flex items-center gap-1.5">
              <Wand2 size={13} className="text-brand" />
              Agent Router · 12+ 模型编排
            </span>
            <span className="flex items-center gap-1.5">
              <Clapperboard size={13} className="text-brand-cyan" />
              Shot Control · 镜头参数可控
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-brand-pink" />
              Recipe Clone · 公开画布可复用
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 md:mt-16"
        >
          <HeroCanvas />
        </motion.div>
      </div>
    </section>
  )
}
