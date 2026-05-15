import { motion } from 'framer-motion'
import { ArrowRight, GitFork, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const RECIPES = [
  {
    title: '雨夜都市悬疑',
    meta: '6 镜头 · 角色一致性 · 冷蓝灯光',
    tone: 'from-[#111827] via-[#164E63] to-[#FF3D7F]',
  },
  {
    title: '高端腕表 TVC',
    meta: '产品微距 · 影棚反射 · 30s',
    tone: 'from-[#120B08] via-[#92400E] to-[#FDE68A]',
  },
  {
    title: '国风短剧预告',
    meta: '场景资产 · 角色 LoRA · 配乐',
    tone: 'from-[#0F172A] via-[#7C2D12] to-[#F97316]',
  },
  {
    title: '赛博城市片头',
    meta: '航拍运镜 · 霓虹雨景 · 12s',
    tone: 'from-[#020617] via-[#3730A3] to-[#22D3EE]',
  },
]

export default function CommunityRecipes() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow">PineLine Community</div>
            <h2 className="mt-4 font-display text-display-md text-white">
              发现专业配方，
              <br />
              <span className="text-gradient">克隆配方</span>再创作
            </h2>
            <p className="mt-4 max-w-md text-ink-1">
              TapNow 的社区价值在于公开画布、复用流程。PineLine 把它转成影视配方：
              你可以 fork 一套完整镜头、模型、角色和剪辑参数，而不是从空白开始。
            </p>
            <Link to="/showcase" className="btn-light mt-8">
              查看配方
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {RECIPES.map((recipe, index) => (
              <motion.div
                key={recipe.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E0E14]"
              >
                <div className={`relative h-36 bg-gradient-to-br ${recipe.tone}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.26),transparent_28%)]" />
                  <button className="absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white backdrop-blur">
                    <PlayCircle size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold text-white">{recipe.title}</h3>
                  <p className="mt-1 text-xs text-ink-2">{recipe.meta}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink-1">
                    <GitFork size={13} className="text-brand" />
                    Fork 到 Studio
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
