import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

const WORKS = [
  { title: '《无声之城》', author: '寒川映画', cat: '短片 · 科幻', tone: 'from-[#061127] via-[#0b2a3a] to-[#22d3ee]', ratio: 'aspect-[16/9]' },
  { title: 'Lumen Watch', author: 'Noire Agency', cat: '广告 · 品牌', tone: 'from-[#1a0a14] via-[#3a0c20] to-[#ff3d7f]', ratio: 'aspect-[4/5]' },
  { title: '《归鹿》', author: '梨花工作室', cat: '短剧 · 古风', tone: 'from-[#1a0f0a] via-[#2a160c] to-[#ff6a3d]', ratio: 'aspect-[9/16]' },
  { title: 'Hyperion', author: 'Studio Vega', cat: 'MV · 电子', tone: 'from-[#10081f] via-[#1d1040] to-[#7c5cff]', ratio: 'aspect-[16/9]' },
  { title: '夜行列车', author: 'Mira Films', cat: '短片 · 悬疑', tone: 'from-[#0a0a0a] via-[#1a1a1a] to-[#5a5a66]', ratio: 'aspect-[1/1]' },
  { title: 'Echo Chamber', author: 'Acoustic Lab', cat: 'MV · 实验', tone: 'from-[#04131a] via-[#07283a] to-[#b6ff5f]', ratio: 'aspect-[4/5]' },
]

export default function ShowcaseWall() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <div className="eyebrow">Showcase Wall</div>
            <h2 className="section-title mt-3">
              由 PineLine 生长的 <span className="text-gradient">真实作品</span>
            </h2>
          </div>
          <a href="/showcase" className="btn-ghost hidden md:inline-flex">
            查看全部
          </a>
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {WORKS.map((w, i) => (
            <motion.article
              key={w.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.07]"
            >
              <div className={`relative ${w.ratio} w-full`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${w.tone}`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
                {/* film grain */}
                <div className="noise absolute inset-0" />
                {/* play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                    <Play size={20} fill="#fff" className="text-white" />
                  </div>
                </div>
                {/* meta */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div>
                    <div className="font-display text-base font-semibold text-white">{w.title}</div>
                    <div className="text-xs text-ink-1">{w.author}</div>
                  </div>
                  <span className="chip !py-0.5 !text-[10px]">{w.cat}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
