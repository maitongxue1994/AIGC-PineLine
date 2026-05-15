import { motion } from 'framer-motion'
import { ArrowRight, Bot, Film, MessageSquareText, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const STEPS = [
  {
    title: '读懂上下文',
    desc: '选择剧本、参考图、角色或旧镜头，Agent 会把它们作为下一次生成的上下文。',
  },
  {
    title: '拆成任务',
    desc: '自动把一句创意拆成分镜、镜头、角色、光线、音效和剪辑节点。',
  },
  {
    title: '路由模型',
    desc: '按任务类型选择图像、视频、音频模型，并保留参数、版本与产物依赖。',
  },
]

export default function AgentWorkspace() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow">PineLine Agent</div>
            <h2 className="section-title mt-3">
              你的 <span className="text-gradient">AI 执行导演</span>
            </h2>
            <p className="mt-4 max-w-lg text-ink-1">
              TapNow 用自然对话驱动画布，PineLine 在此基础上加入影视生产语义：
              Agent 不只生成素材，还会管理场景、镜头、角色一致性与下游剪辑依赖。
            </p>
            <div className="mt-8 space-y-4">
              {STEPS.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/studio" className="btn-primary mt-8">
              试用 PineLine Agent
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#08080B] p-5 shadow-card"
          >
            <div className="absolute inset-0 dot-bg opacity-50" />
            <div className="absolute inset-x-10 top-10 h-44 rounded-full bg-brand-gradient opacity-10 blur-[90px]" />

            <div className="relative ml-auto mt-10 max-w-[460px] rounded-3xl border border-white/[0.08] bg-[#1A1A1F] p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Bot size={16} className="text-brand" />
                  Agent 控制台
                </div>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-ink-2">
                  Context aware
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <Bubble icon={<MessageSquareText size={13} />} text="把这段都市悬疑独白拆成 6 个可生成镜头，并保留女主角色一致性。" />
                <Bubble icon={<Sparkles size={13} />} text="已生成：剧本解析、角色参考、S35 镜头组、雨夜灯光方案。" active />
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Film size={13} className="text-brand-cyan" />
                  下一步推荐
                </div>
                <div className="mt-3 grid gap-2 text-xs text-ink-1 sm:grid-cols-2">
                  <span className="rounded-xl bg-white/[0.04] px-3 py-2">生成分镜草图</span>
                  <span className="rounded-xl bg-white/[0.04] px-3 py-2">训练角色 LoRA</span>
                  <span className="rounded-xl bg-white/[0.04] px-3 py-2">创建镜头控制</span>
                  <span className="rounded-xl bg-white/[0.04] px-3 py-2">预估渲染成本</span>
                </div>
              </div>
            </div>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
              {['SCRIPT', 'SCENE', 'SHOT'].map((label, index) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {label}
                  </div>
                  <div className="mt-8 h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${76 - index * 18}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-ink-2">
                    {['语义拆解', '资产绑定', '模型路由'][index]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Bubble({ icon, text, active }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <div className={`flex gap-3 rounded-2xl p-3 ${active ? 'bg-white text-black' : 'bg-white/[0.04] text-ink-1'}`}>
      <span className={active ? 'text-black' : 'text-brand'}>{icon}</span>
      <span className="text-sm leading-relaxed">{text}</span>
    </div>
  )
}
