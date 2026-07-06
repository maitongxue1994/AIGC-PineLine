import { motion } from 'framer-motion'
import {
  Clapperboard,
  Palette,
  Users,
  Languages,
  Shield,
  Workflow,
  Cpu,
  Timer,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Workflow,
    title: '节点画布管线',
    desc: '剧本 → 分镜 → 分镜图 → 视频，连线即上游产出自动喂下游，一键跑通整条链。',
    tone: 'from-[#7C5CFF]/20 to-transparent',
  },
  {
    icon: Cpu,
    title: '多模型接入',
    desc: '文本 MiniMax / 豆包、图像 Gemini / Seedream、视频 Seedance / 海螺，按需切换。',
    tone: 'from-[#FF6A3D]/20 to-transparent',
  },
  {
    icon: Users,
    title: '角色/场景一致性',
    desc: '从剧本提取角色、场景、道具生成三视图/宫格参考，派生分镜图时自动挂载。',
    tone: 'from-[#FF3D7F]/20 to-transparent',
  },
  {
    icon: Clapperboard,
    title: '分镜一键成片',
    desc: '分镜图批量派生镜头视频，按 Seedance 官方公式组装提示词，含音色一致性与纯净模式。',
    tone: 'from-[#22D3EE]/20 to-transparent',
  },
  {
    icon: Palette,
    title: '全能参考',
    desc: '图片、视频、音频多模态参考生视频，锁定画面风格、运镜与音色。',
    tone: 'from-[#B6FF5F]/20 to-transparent',
  },
  {
    icon: Timer,
    title: 'AI 助手编排',
    desc: '一句话让助手搭建/修改/运行管线，支持联网、传图分析、记忆你的偏好。',
    tone: 'from-[#FF6A3D]/20 to-transparent',
  },
  {
    icon: Languages,
    title: '本地留存',
    desc: '画布、素材、生成历史全存本机浏览器，项目档案完整保留媒体，刷新不丢。',
    tone: 'from-[#7C5CFF]/20 to-transparent',
  },
  {
    icon: Shield,
    title: 'AI 生成标识',
    desc: '下载图片自动烧「AI 生成」角标，交付含标识与创作过程存证，合规送审。',
    tone: 'from-[#FF3D7F]/20 to-transparent',
  },
]

export default function FeatureGrid() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Why PineLine</div>
          <h2 className="section-title mt-3">
            为<span className="text-gradient">专业影视</span>而生，
            而非玩具
          </h2>
          <p className="mt-4 text-ink-1">
            广告公司、短剧厂牌、品牌创意部门的真实工作流被完整映射到产品之中。
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="card group relative overflow-hidden"
            >
              <div className={`pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br ${f.tone} opacity-60 transition group-hover:opacity-100`} />
              <div className="relative">
                <f.icon size={18} className="text-white" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
