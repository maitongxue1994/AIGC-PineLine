import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const ITEMS = [
  {
    quote:
      '以前一支 30 秒的品牌故事要跨 4 个团队协作两周。PineLine 把剧本到成片的 5 个阶段压进一个画布，客户连周五都能拿到终稿。',
    name: '林漫',
    role: '创意总监 · Noire Agency',
  },
  {
    quote:
      '多模型路由 + 角色一致性，是国内第一个真正让我敢在正片里落地 AIGC 的工具。',
    name: '许言',
    role: '导演 · 寒川映画',
  },
  {
    quote:
      '我们团队用 PineLine 同时推进 12 条短剧剧本，单集成本从 18 万降到 2 万。ROI 夸张到写不进预算表。',
    name: 'Sara W.',
    role: 'Head of Growth · 梨花工作室',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">From the field</div>
          <h2 className="section-title mt-3">
            一线团队的<span className="text-gradient">真话</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {ITEMS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card"
            >
              <Quote size={18} className="text-brand" />
              <p className="mt-4 text-sm leading-relaxed text-ink-1">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-brand-gradient" />
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-ink-2">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
