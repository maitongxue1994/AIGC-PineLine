import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    name: 'Creator',
    price: '¥0',
    unit: '/ 月',
    desc: '给独立创作者与学生的起步套餐',
    cta: '免费开始',
    features: ['每月 80 分钟生成', '720p 导出', '公共模型库', '3 个工作画布'],
  },
  {
    name: 'Studio',
    price: '¥599',
    unit: '/ 月',
    highlight: true,
    desc: '为 5–15 人的专业团队',
    cta: '开始 14 天试用',
    features: [
      '每月 1200 分钟生成',
      '4K·24/30/60fps 导出',
      '多模型路由 + 私有 LoRA',
      '10 人实时协作',
      '时间线导出 PR / DaVinci',
    ],
  },
  {
    name: 'Enterprise',
    price: '议价',
    unit: '',
    desc: '品牌方 / 广告公司 / 内容平台',
    cta: '预约 Demo',
    features: [
      '私有化 / VPC 部署',
      '企业 SSO + 审计日志',
      '专属算力池与 SLA',
      'IP 安全承诺与 C2PA 水印',
    ],
  },
]

export default function PricingTeaser() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Pricing</div>
          <h2 className="section-title mt-3">
            按<span className="text-gradient">团队规模</span>自由扩展
          </h2>
          <p className="mt-4 text-ink-1">
            所有方案都包含管线编排、模板库与多模型路由。付费方案解锁更高算力与商用授权。
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                p.highlight
                  ? 'animated-border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01]'
                  : 'border-white/[0.07] bg-white/[0.02]'
              }`}
            >
              {p.highlight && (
                <div className="absolute right-5 top-5 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Most Popular
                </div>
              )}
              <div className="font-display text-lg font-semibold text-white">{p.name}</div>
              <div className="mt-1 text-sm text-ink-2">{p.desc}</div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className={`font-display text-4xl font-semibold ${p.highlight ? 'text-gradient' : 'text-white'}`}>
                  {p.price}
                </span>
                <span className="text-sm text-ink-2">{p.unit}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/pricing"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  p.highlight ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
