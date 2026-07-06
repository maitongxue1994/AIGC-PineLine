import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clapperboard, Sparkles } from 'lucide-react'
import { CONTACT } from '../siteConfig'

/** 精选作品：真实作品陆续上传中的占位页（不放假数据/假点赞） */
export default function Showcase() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 pt-28"
    >
      <section className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Showcase</div>
          <h1 className="section-title mt-3">
            由 PineLine 生长的<span className="text-gradient">作品</span>
          </h1>
          <p className="mt-4 text-ink-1">
            我们正在整理用 PineLine 制作的真实案例，陆续上传中。
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient">
            <Clapperboard size={24} className="text-white" />
          </div>
          <h2 className="mt-5 font-display text-lg font-semibold text-white">作品陆续上传中</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-1">
            想让你的作品或案例出现在这里？或有批量制作需求，欢迎联系我们。
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/studio" className="btn-primary inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold">
              <Sparkles size={14} /> 进入 Studio 创作
            </Link>
            <a href={`mailto:${CONTACT.email}`} className="btn-ghost inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold">
              联系我们
            </a>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
