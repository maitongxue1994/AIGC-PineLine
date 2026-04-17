import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Heart, Eye } from 'lucide-react'

const FILTERS = ['全部', '短片', '广告', '短剧', 'MV', '实验艺术']

const WORKS = [
  { title: '《无声之城》',     author: '寒川映画',     cat: '短片', tone: 'from-[#061127] via-[#0b2a3a] to-[#22d3ee]', ratio: 'aspect-[16/9]', likes: 2180, views: '42.1k' },
  { title: 'Lumen Watch',     author: 'Noire Agency',  cat: '广告', tone: 'from-[#1a0a14] via-[#3a0c20] to-[#ff3d7f]', ratio: 'aspect-[4/5]',  likes: 1512, views: '21.8k' },
  { title: '《归鹿》',         author: '梨花工作室',    cat: '短剧', tone: 'from-[#1a0f0a] via-[#2a160c] to-[#ff6a3d]', ratio: 'aspect-[9/16]', likes: 986,  views: '18.2k' },
  { title: 'Hyperion',         author: 'Studio Vega',   cat: 'MV',   tone: 'from-[#10081f] via-[#1d1040] to-[#7c5cff]', ratio: 'aspect-[16/9]', likes: 742,  views: '11.4k' },
  { title: '夜行列车',         author: 'Mira Films',    cat: '短片', tone: 'from-[#0a0a0a] via-[#1a1a1a] to-[#5a5a66]', ratio: 'aspect-[1/1]',  likes: 621,  views: '9.4k'  },
  { title: 'Echo Chamber',     author: 'Acoustic Lab',  cat: '实验艺术', tone: 'from-[#04131a] via-[#07283a] to-[#b6ff5f]', ratio: 'aspect-[4/5]', likes: 540, views: '7.1k' },
  { title: '《旧日方舟》',     author: '孤岛 Studio',    cat: '短片', tone: 'from-[#140a1a] via-[#320c42] to-[#ff6a3d]', ratio: 'aspect-[16/9]', likes: 1220, views: '16.9k' },
  { title: 'Neon Drive',       author: 'Palette',       cat: 'MV',   tone: 'from-[#04081a] via-[#120a3a] to-[#22d3ee]', ratio: 'aspect-[16/9]', likes: 860,  views: '12.0k' },
  { title: '《第七次浪潮》',   author: '铃木 Jun',      cat: '实验艺术', tone: 'from-[#060c0c] via-[#0f2e2e] to-[#b6ff5f]', ratio: 'aspect-[3/4]',  likes: 412,  views: '5.3k' },
]

export default function Showcase() {
  const [f, setF] = useState('全部')
  const list = WORKS.filter((w) => f === '全部' || w.cat === f)

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
            由 PineLine 生长的<span className="text-gradient">真实作品</span>
          </h1>
          <p className="mt-4 text-ink-1">
            所有作品均可查看工作画布、模板来源与镜头参数，可 fork 为你的新项目。
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-1">
          {FILTERS.map((c) => (
            <button
              key={c}
              onClick={() => setF(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                f === c ? 'bg-white/[0.08] text-white' : 'text-ink-1 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {list.map((w, i) => (
            <motion.article
              key={w.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.04 }}
              className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.07]"
            >
              <div className={`relative ${w.ratio} w-full`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${w.tone}`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.55)_100%)]" />
                <div className="noise absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                    <Play size={20} fill="#fff" className="text-white" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent p-4">
                  <div>
                    <div className="font-display text-base font-semibold text-white">{w.title}</div>
                    <div className="text-xs text-ink-1">{w.author}</div>
                  </div>
                  <span className="chip !py-0.5 !text-[10px]">{w.cat}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] bg-bg-1/80 px-3 py-2 text-[11px] text-ink-2">
                <span className="flex items-center gap-1"><Eye size={11} /> {w.views}</span>
                <span className="flex items-center gap-1"><Heart size={11} /> {w.likes}</span>
                <button className="text-brand hover:text-white">Fork 画布</button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.main>
  )
}
