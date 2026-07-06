import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Coins, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTA from '../sections/CTA'
import FAQ from '../sections/FAQ'
import { CONTACT, PAYMENTS, PRICING } from '../siteConfig'

/**
 * 定价页（双轨）：①积分与订阅（自助购买，Paddle 上线前显示「联系购买」）
 * ②企业定制服务（面议）。真实可交付能力，无未实现功能的宣称。
 */
export default function Pricing() {
  const [tab, setTab] = useState<'credits' | 'subscription'>('credits')
  const buyLabel = PAYMENTS.paddleEnabled ? '立即购买' : '联系购买'

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 pt-28"
    >
      <section className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Pricing</div>
          <h1 className="section-title mt-3">
            用<span className="text-gradient">积分</span>，按需创作
          </h1>
          <p className="mt-4 text-ink-1">
            充值积分或订阅按月产能，生成时按模型实际用量扣积分；企业批量制作可走定制服务。
          </p>
        </div>

        {/* 积分 / 订阅 切换 */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 text-xs">
            {(
              [
                ['credits', '积分包'],
                ['subscription', '月订阅'],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-full px-4 py-1.5 transition ${
                  tab === k ? 'bg-white/[0.08] text-white' : 'text-ink-1'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 积分包 / 订阅 卡片 */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tab === 'credits'
            ? PRICING.creditPacks.map((p) => (
                <PlanCard
                  key={p.id}
                  name={p.name}
                  priceCny={p.priceCny}
                  priceUsd={p.priceUsd}
                  unit=""
                  highlight={'highlight' in p && p.highlight}
                  lines={[`${p.credits.toLocaleString()} 积分`, p.tag, '永不过期', '全模型可用']}
                  cta={buyLabel}
                />
              ))
            : PRICING.subscriptions.map((p) => (
                <PlanCard
                  key={p.id}
                  name={p.name}
                  priceCny={p.priceCnyM}
                  priceUsd={p.priceUsdM}
                  unit="/ 月"
                  highlight={'highlight' in p && p.highlight}
                  lines={[...p.features]}
                  cta={buyLabel}
                />
              ))}
        </div>

        <p className="mt-6 text-center text-[13px] text-ink-2">
          <Coins size={13} className="mr-1 inline" />
          生成按模型实际用量扣积分（如短视频约 100 积分/5 秒、生图约 5 积分/张）；具体消耗在生成前显示。
        </p>

        {/* 企业定制服务 */}
        <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8">
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-brand" />
            <h2 className="font-display text-xl font-semibold text-white">企业定制服务</h2>
          </div>
          <p className="mt-2 text-sm text-ink-1">
            出版社、杂志社、教育机构、MCN 等批量视频需求，提供服务式交付与定制工作流。
          </p>
          <ul className="mt-5 grid gap-2.5 text-sm text-ink-1 sm:grid-cols-2">
            {PRICING.service.items.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 text-brand" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${CONTACT.email}`}
            className="btn-primary mt-7 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            预约咨询 · {CONTACT.email}
          </a>
        </div>
      </section>

      <FAQ />
      <CTA />
    </motion.main>
  )
}

function PlanCard({
  name,
  priceCny,
  priceUsd,
  unit,
  highlight,
  lines,
  cta,
}: {
  name: string
  priceCny: number
  priceUsd: number
  unit: string
  highlight?: boolean
  lines: string[]
  cta: string
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 ${
        highlight
          ? 'animated-border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01]'
          : 'border-white/[0.07] bg-white/[0.02]'
      }`}
    >
      {highlight && (
        <div className="absolute right-5 top-5 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
          推荐
        </div>
      )}
      <div className="font-display text-lg font-semibold text-white">{name}</div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className={`font-display text-4xl font-semibold ${highlight ? 'text-gradient' : 'text-white'}`}>
          ¥{priceCny}
        </span>
        {unit && <span className="text-sm text-ink-2">{unit}</span>}
        <span className="ml-1.5 text-xs text-ink-3">约 ${priceUsd}</span>
      </div>
      <ul className="mt-6 space-y-2.5 text-sm text-ink-1">
        {lines.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check size={14} className="mt-0.5 text-brand" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        to="/studio"
        className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
          highlight ? 'btn-primary' : 'btn-ghost'
        }`}
      >
        {cta}
      </Link>
    </div>
  )
}
