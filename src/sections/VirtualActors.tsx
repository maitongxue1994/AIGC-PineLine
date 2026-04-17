import { motion } from 'framer-motion'
import { Wand2, UserPlus, Sparkles } from 'lucide-react'

const ACTORS = [
  { name: '林夜', role: '都市 · 男主', tone: 'from-[#1a0f2a] to-[#ff3d7f]' },
  { name: 'Aria',  role: 'Sci-Fi · 女主', tone: 'from-[#071029] to-[#22d3ee]' },
  { name: '苏白', role: '古风 · 少女', tone: 'from-[#2a0f12] to-[#ff6a3d]' },
  { name: '老K',  role: '悬疑 · 配角', tone: 'from-[#161616] to-[#7c5cff]' },
]

export default function VirtualActors() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow">Virtual Actors</div>
            <h2 className="section-title mt-3">
              可签约的<span className="text-gradient">数字演员</span>，
              <br />
              横跨全片保持一致性
            </h2>
            <p className="mt-4 max-w-md text-ink-1">
              训练一位属于你项目的数字演员，面部、体型、声线、表演风格可控。
              不同镜头、不同模型下，她 / 他始终是同一个人。
            </p>

            <ul className="mt-6 space-y-3 text-sm text-ink-1">
              <li className="flex items-start gap-3">
                <Sparkles size={14} className="mt-0.5 text-brand" />
                上传 3~10 张照片，10 分钟完成定制训练
              </li>
              <li className="flex items-start gap-3">
                <Sparkles size={14} className="mt-0.5 text-brand" />
                跨模型迁移：同一角色可在 Sora / Kling / Veo 下统一
              </li>
              <li className="flex items-start gap-3">
                <Sparkles size={14} className="mt-0.5 text-brand" />
                声纹克隆 + 情绪曲线：台词按情绪节奏自动生成
              </li>
            </ul>

            <div className="mt-7 flex gap-3">
              <button className="btn-primary">
                <UserPlus size={14} />
                训练我的数字演员
              </button>
              <button className="btn-ghost">
                <Wand2 size={14} />
                从公共演员库选择
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {ACTORS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.07]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${a.tone}`} />
                {/* face suggestion */}
                <div className="absolute inset-x-0 top-[18%] mx-auto h-[38%] w-[46%] rounded-full bg-gradient-to-b from-white/25 to-transparent blur-2xl" />
                <div className="absolute inset-x-0 bottom-[26%] mx-auto h-[22%] w-[34%] rounded-full bg-gradient-to-b from-white/15 to-transparent blur-2xl" />
                {/* scanline */}
                <div className="animate-scan absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                {/* overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-sm font-semibold text-white">{a.name}</div>
                      <div className="text-[11px] text-ink-1">{a.role}</div>
                    </div>
                    <span className="chip !py-0.5 !text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      LoRA·v3
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
