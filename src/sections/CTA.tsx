import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="animated-border relative overflow-hidden rounded-3xl border border-transparent bg-[#0E0E16] p-10 text-center md:p-16">
          {/* bg glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-[300px] w-[900px] rounded-full bg-brand-gradient opacity-20 blur-[120px]" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent)]" />

          <span className="chip relative">
            <Sparkles size={12} className="text-brand" />
            你的下一部片子，从一条管线开始
          </span>
          <h2 className="relative mt-6 font-display text-display-lg font-semibold text-white [word-break:keep-all]">
            准备好把<span className="text-gradient">剧本</span>变成<span className="text-gradient">电影</span>了吗？
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-ink-1">
            14 天免费试用完整 Studio 权限。无需信用卡，打开浏览器就能开始。
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/studio" className="btn-primary">
              进入 Studio
              <ArrowRight size={14} />
            </Link>
            <Link to="/pricing" className="btn-ghost">
              查看所有方案
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
