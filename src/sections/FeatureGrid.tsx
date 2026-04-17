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
    icon: Clapperboard,
    title: '电影级画质',
    desc: 'HDR · 24/30/60fps · 最高 4K 输出，支持 ProRes / H.265 / DNxHR。',
    tone: 'from-[#FF6A3D]/20 to-transparent',
  },
  {
    icon: Workflow,
    title: '多模型路由',
    desc: '按镜头语言自动匹配最佳模型，并行渲染，画质 / 成本智能平衡。',
    tone: 'from-[#7C5CFF]/20 to-transparent',
  },
  {
    icon: Users,
    title: '角色一致性',
    desc: '训练专属角色 LoRA，全片统一面部、服装与身材比例。',
    tone: 'from-[#FF3D7F]/20 to-transparent',
  },
  {
    icon: Palette,
    title: '风格参考',
    desc: '上传参考片、剧照或大师画作，AI 提取色调、构图与节奏。',
    tone: 'from-[#22D3EE]/20 to-transparent',
  },
  {
    icon: Languages,
    title: '多语言配音',
    desc: '40+ 语种唇形对齐的克隆配音，保留原声情绪与韵律。',
    tone: 'from-[#B6FF5F]/20 to-transparent',
  },
  {
    icon: Timer,
    title: '极速交付',
    desc: '首稿 5 分钟完成，替代传统 2 周分镜 + 3 周拍摄周期。',
    tone: 'from-[#FF6A3D]/20 to-transparent',
  },
  {
    icon: Cpu,
    title: '企业私有部署',
    desc: '支持本地 GPU 集群 / VPC 部署，IP 与素材不出库。',
    tone: 'from-[#7C5CFF]/20 to-transparent',
  },
  {
    icon: Shield,
    title: '内容合规',
    desc: '内置 C2PA 水印、AIGC 标注与版权审核，商业级安全。',
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
