import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Layers, MousePointer2, Users2, History, ArrowUpRight } from 'lucide-react'

const FEATURES = [
  {
    icon: Layers,
    title: '无限画布',
    desc: '任意缩放的工作板，把整部片子铺成一张"地图"。',
  },
  {
    icon: MousePointer2,
    title: '节点化编排',
    desc: '节点连线即为依赖，参数改动自动向下游传播。',
  },
  {
    icon: Users2,
    title: '实时协作',
    desc: '导演、编剧、制片同框评论，评论即批注、版本自动分叉。',
  },
  {
    icon: History,
    title: '全链路回溯',
    desc: '每次生成都带时间线、Seed 与参数，一键回到任意历史版本。',
  },
]

export default function CanvasShowcase() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow">PineLine Board</div>
            <h2 className="section-title mt-3">
              像<span className="text-gradient">剪辑台</span>一样的
              <br />
              AIGC 工作画布
            </h2>
            <p className="mt-4 max-w-md text-ink-1">
              灵感来自专业后期工程文件的可视化工作板。节点代表一次创作动作——
              文本、分镜、镜头、模型、剪辑——它们通过连线组织依赖，
              并把整部作品的创作过程变成可回放、可分支的时间线。
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="card">
                  <f.icon size={16} className="text-brand" />
                  <div className="mt-3 text-sm font-semibold text-white">{f.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-ink-2">{f.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Link to="/studio" className="btn-primary">
                打开 Studio
                <ArrowUpRight size={14} />
              </Link>
              <Link to="/templates" className="btn-ghost">
                浏览模板
              </Link>
            </div>
          </motion.div>

          {/* right: schematic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-bg-2 to-bg-1 shadow-card"
          >
            <div className="absolute inset-0 dot-bg opacity-60" />
            {/* simplified nodes */}
            <SvgSchematic />
            {/* bottom bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/[0.07] bg-[#0a0a10]/80 px-4 py-2 text-[11px] text-ink-2 backdrop-blur">
              <span>18 nodes · 4 chapters · 02:34</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand" />
                Rendering 3 shots · ETA 42s
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SvgSchematic() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="w1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#FF6A3D" />
          <stop offset="100%" stopColor="#7C5CFF" />
        </linearGradient>
        <linearGradient id="w2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#7C5CFF" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* wires */}
      <path d="M 110 140 C 200 140 200 210 290 210" stroke="url(#w1)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <path d="M 110 260 C 200 260 200 210 290 210" stroke="url(#w1)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <path d="M 390 210 C 480 210 480 140 530 140" stroke="url(#w2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <path d="M 390 230 C 480 230 480 310 530 310" stroke="url(#w2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />

      {/* nodes */}
      <Node x={30} y={100} color="#FF6A3D" w={160} h={80} title="SCRIPT · Ch.2" sub="雨夜屋顶 · 120 字" />
      <Node x={30} y={220} color="#FF6A3D" w={160} h={80} title="CHARACTER" sub="林夜 · 亚洲男 · 风衣" />
      <Node x={230} y={170} color="#7C5CFF" w={160} h={80} title="STORYBOARD" sub="3 shots · wide/med/close" />
      <Node x={470} y={100} color="#22D3EE" w={140} h={80} title="VIDEO · Sora" sub="24fps · 4K" />
      <Node x={470} y={270} color="#B6FF5F" w={140} h={80} title="AUDIO · FX" sub="雨声 + 环境低频" />

      {/* sparkle */}
      <circle cx="320" cy="220" r="3" fill="#fff">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function Node({
  x,
  y,
  w,
  h,
  color,
  title,
  sub,
}: {
  x: number
  y: number
  w: number
  h: number
  color: string
  title: string
  sub: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#0E0E14" stroke="rgba(255,255,255,0.12)" />
      <rect x={x} y={y} width={w} height={3} rx={2} fill={color} />
      <text x={x + 12} y={y + 28} fill={color} fontSize="10" fontFamily="Space Grotesk" fontWeight="700" letterSpacing="1.2">
        {title}
      </text>
      <text x={x + 12} y={y + 50} fill="#C4C4CF" fontSize="11" fontFamily="Inter">
        {sub}
      </text>
      <circle cx={x + w - 12} cy={y + 14} r="3" fill={color}>
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}
