import { motion } from 'framer-motion'

/** 服务流程四步（真实交付流程，替代虚构客户证言） */
const STEPS = [
  { n: '01', title: '需求与脚本', desc: '给一段主题或一篇文章，AI 改写为剧本，你确认方向与调性。' },
  { n: '02', title: '分镜与资产', desc: '自动拆分镜、提取角色/场景/道具生成一致性参考，逐镜确认。' },
  { n: '03', title: '生成与迭代', desc: '分镜图与镜头视频一键成片，按 Seedance 官方公式组装提示词，可反复调。' },
  { n: '04', title: '交付与存证', desc: '打包成片 + AI 生成标识 + 创作过程报告，可直接交付客户或发布。' },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">How it works</div>
          <h2 className="section-title mt-3">
            从一段文本到<span className="text-gradient">一条成片</span>
          </h2>
          <p className="mt-4 text-ink-1">四步走完剧本到交付，每一步都在你的确认下推进。</p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {STEPS.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card"
            >
              <div className="font-display text-2xl font-semibold text-gradient">{t.n}</div>
              <h3 className="mt-3 text-sm font-semibold text-white">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-1">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
