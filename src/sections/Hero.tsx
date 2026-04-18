import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Sparkles, Film } from 'lucide-react'
import HeroCanvas from '../components/HeroCanvas'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-36">
      {/* grid background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_30%,transparent_75%)]" />

      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.18] blur-[140px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="chip">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand" />
            PineLine v0.1 · Cinematic AIGC Pipeline
          </span>

          <h1 className="mt-6 font-display text-display-xl font-semibold leading-[1] text-white [word-break:keep-all]">
            从<span className="text-gradient">剧本</span>到<span className="text-gradient">成片</span>，
            <br />
            只需一条<span className="text-gradient">管线</span>。
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-1 md:text-lg">
            PineLine 是为专业影视团队打造的 AIGC 创作管线。无限画布上，
            把剧本、分镜、角色、镜头、生成、剪辑与声效连成一条可视化工作流，
            由多模型协同，一键产出影院级成片。
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link to="/studio" className="btn-primary">
              <Sparkles size={14} />
              进入 Studio 创作
              <ArrowRight size={14} />
            </Link>
            <a href="#pipeline" className="btn-ghost">
              <Play size={14} />
              观看 2 分钟演示
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-2">
            <span className="flex items-center gap-1.5">
              <Film size={12} className="text-brand" />
              支持 4K·24/30/60fps
            </span>
            <span>·</span>
            <span>12+ 视频大模型协同</span>
            <span>·</span>
            <span>90% 成本下降</span>
            <span>·</span>
            <span>5 分钟首稿交付</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 md:mt-20"
        >
          <HeroCanvas />
        </motion.div>
      </div>
    </section>
  )
}
