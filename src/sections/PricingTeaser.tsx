import { Check, Coins, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PRICING } from '../siteConfig'

/** 首页定价摘要：积分包 + 企业服务两张卡，详情跳 /pricing */
export default function PricingTeaser() {
  const featured = PRICING.creditPacks.find((p) => 'highlight' in p && p.highlight) ?? PRICING.creditPacks[0]

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Pricing</div>
          <h2 className="section-title mt-3">
            用<span className="text-gradient">积分</span>，按需创作
          </h2>
          <p className="mt-4 text-ink-1">
            充值积分或订阅按月产能，生成时按模型实际用量扣积分；企业批量制作可走定制服务。
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2">
          <div className="animated-border relative flex flex-col rounded-2xl border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7">
            <div className="flex items-center gap-2">
              <Coins size={18} className="text-brand" />
              <div className="font-display text-lg font-semibold text-white">积分自助购买</div>
            </div>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold text-gradient">¥{featured.priceCny}</span>
              <span className="ml-1 text-sm text-ink-2">/ {featured.credits.toLocaleString()} 积分</span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-1">
              {['充值即用，永不过期', '按模型实际用量扣费', '全模型可用', '生成前显示消耗'].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 text-brand" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/pricing" className="btn-primary mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold">
              查看套餐
            </Link>
          </div>

          <div className="relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-brand" />
              <div className="font-display text-lg font-semibold text-white">企业定制服务</div>
            </div>
            <div className="mt-5 font-display text-4xl font-semibold text-white">面议</div>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-1">
              {PRICING.service.items.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 text-brand" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/pricing" className="btn-ghost mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold">
              预约咨询
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
