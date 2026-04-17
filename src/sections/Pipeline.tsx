import { motion } from 'framer-motion'
import {
  FileText,
  Clapperboard,
  Camera,
  Wand2,
  Scissors,
  Music2,
  ArrowRight,
} from 'lucide-react'

const STAGES = [
  {
    icon: FileText,
    title: '剧本 · Script',
    desc: '粘贴剧本或输入一段描述，AI 自动解析场景、角色、节奏与情绪。',
    tag: 'NLP · Scene Graph',
    color: '#FF6A3D',
  },
  {
    icon: Clapperboard,
    title: '分镜 · Storyboard',
    desc: '自动生成分镜草图，可拖拽调整镜头顺序、景别与时长。',
    tag: 'Shot Graph',
    color: '#FF8A3D',
  },
  {
    icon: Camera,
    title: '镜头 · Shot Design',
    desc: '设定机位、焦距、运镜、光线与色调，一键对标导演参考。',
    tag: 'Cinematography',
    color: '#FF3D7F',
  },
  {
    icon: Wand2,
    title: '生成 · Generate',
    desc: '按镜头智能路由最佳模型，分布式并行生成，支持风格一致性。',
    tag: 'Multi-Model',
    color: '#7C5CFF',
  },
  {
    icon: Scissors,
    title: '剪辑 · Edit',
    desc: 'AI 剪辑节奏，镜头连接与转场，导出时间线到 DaVinci / PR。',
    tag: 'NLE · Timeline',
    color: '#22D3EE',
  },
  {
    icon: Music2,
    title: '音画 · Sound',
    desc: '台词配音、配乐、环境音与音效，一体化混音输出。',
    tag: 'TTS · SFX · Score',
    color: '#B6FF5F',
  },
]

export default function Pipeline() {
  return (
    <section id="pipeline" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">The PineLine</div>
          <h2 className="section-title mt-3">
            一条贯穿全流程的 <span className="text-gradient">影视创作管线</span>
          </h2>
          <p className="mt-4 text-ink-1">
            从文字到成片的六个阶段，每一步都由专用 AI 模块完成，节点与节点之间可视化连接，
            状态、版本、参数全程可追溯。
          </p>
        </div>

        <div className="relative mt-16">
          {/* connecting rail */}
          <div className="pointer-events-none absolute inset-x-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card group overflow-hidden"
              >
                <div
                  className="absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-[0.18] blur-3xl transition group-hover:opacity-40"
                  style={{ background: s.color }}
                />
                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}22, transparent)`,
                      color: s.color,
                    }}
                  >
                    <s.icon size={18} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="relative mt-5 font-display text-xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-1">{s.desc}</p>
                <div className="relative mt-5 flex items-center justify-between text-xs">
                  <span className="chip">{s.tag}</span>
                  <ArrowRight size={14} className="text-ink-3 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
