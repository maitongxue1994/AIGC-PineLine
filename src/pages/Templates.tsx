import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Sparkles, Clock, Users2 } from 'lucide-react'

const CATS = ['全部', '短片', '广告 / TVC', '短剧', 'MV', '电商', '预告片', '社交媒体']

const TEMPLATES = [
  { title: '电影级品牌 TVC · 30s',  cat: '广告 / TVC', stages: 6, est: '12 分钟', uses: 2148, tone: 'from-[#1a0a14] to-[#ff3d7f]' },
  { title: '雨夜都市独白短片',       cat: '短片',      stages: 8, est: '18 分钟', uses: 1320, tone: 'from-[#061127] to-[#22d3ee]' },
  { title: '古风短剧 · 1 集 3 分钟',  cat: '短剧',      stages: 9, est: '25 分钟', uses: 876,  tone: 'from-[#1a0f0a] to-[#ff6a3d]' },
  { title: '电子 MV · 节奏卡点',      cat: 'MV',        stages: 7, est: '15 分钟', uses: 542,  tone: 'from-[#10081f] to-[#7c5cff]' },
  { title: '电商主图视频 · 15s',      cat: '电商',      stages: 4, est: '5 分钟',  uses: 4210, tone: 'from-[#0a1f0a] to-[#b6ff5f]' },
  { title: '院线预告片节奏',          cat: '预告片',    stages: 8, est: '20 分钟', uses: 312,  tone: 'from-[#0a0a0a] to-[#ff6a3d]' },
  { title: '小红书竖屏种草',          cat: '社交媒体',  stages: 5, est: '8 分钟',  uses: 3180, tone: 'from-[#1a0a20] to-[#ff3d7f]' },
  { title: '科幻世界观预告',          cat: '预告片',    stages: 9, est: '30 分钟', uses: 198,  tone: 'from-[#04131a] to-[#22d3ee]' },
  { title: '悬疑短剧 · 开场钩子',     cat: '短剧',      stages: 7, est: '14 分钟', uses: 624,  tone: 'from-[#0a0a0a] to-[#5a5a66]' },
]

export default function Templates() {
  const [cat, setCat] = useState('全部')
  const [q, setQ] = useState('')

  const filtered = TEMPLATES.filter(
    (t) => (cat === '全部' || t.cat === cat) && t.title.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 pt-28"
    >
      <section className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Templates</div>
          <h1 className="section-title mt-3">
            从一个<span className="text-gradient">模板</span>，到一部成片
          </h1>
          <p className="mt-4 text-ink-1">
            官方与社区共建的工作流模板。加载即用，画布上所有节点、参数与资产都已预配置。
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索模板、风格或品类"
              className="w-full rounded-full border border-white/[0.07] bg-white/[0.03] py-2.5 pl-9 pr-4 text-sm text-white outline-none transition focus:border-white/20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  cat === c ? 'bg-white/[0.08] text-white' : 'text-ink-1 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="card group overflow-hidden"
            >
              <div className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${t.tone}`}>
                <div className="absolute inset-0 noise" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[10px] text-white/70">
                  {t.stages} stages · preset
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="chip">{t.cat}</span>
                <span className="flex items-center gap-1 text-[11px] text-ink-2">
                  <Users2 size={11} /> {t.uses.toLocaleString()}
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-white">
                {t.title}
              </h3>
              <div className="mt-2 flex items-center justify-between text-[11px] text-ink-2">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> 首稿约 {t.est}
                </span>
                <Link
                  to="/studio"
                  className="flex items-center gap-1 text-brand transition hover:text-white"
                >
                  <Sparkles size={11} /> 加载到 Studio
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.main>
  )
}
