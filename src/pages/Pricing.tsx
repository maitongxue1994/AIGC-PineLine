import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTA from '../sections/CTA'
import FAQ from '../sections/FAQ'

const PLANS = [
  {
    name: 'Creator',
    priceM: 0,
    priceY: 0,
    desc: '给独立创作者与学生的起步套餐',
    cta: '免费开始',
    features: [
      '80 分钟 / 月 视频生成',
      '720p 导出 · 水印可选',
      '公共模型库 + 10 个模板',
      '3 个工作画布',
      '1 人账号',
    ],
  },
  {
    name: 'Studio',
    priceM: 599,
    priceY: 499,
    highlight: true,
    desc: '为 5–15 人的专业团队',
    cta: '14 天免费试用',
    features: [
      '1200 分钟 / 月 · 可叠加',
      '4K·24/30/60fps · 无水印',
      '多模型路由 · 私有 LoRA',
      '10 人实时协作',
      '导出 PR / DaVinci 时间线',
      '优先排队 · 算力加速',
    ],
  },
  {
    name: 'Enterprise',
    priceM: null,
    priceY: null,
    desc: '品牌方 / 广告公司 / 内容平台',
    cta: '预约 Demo',
    features: [
      '私有化 / VPC 部署',
      '企业 SSO + 审计日志',
      '专属算力池与 SLA',
      '商用授权 + IP 安全承诺',
      '定制模型与训练',
      '专属客户成功经理',
    ],
  },
]

const COMPARE: [string, (string | boolean)[]][] = [
  ['每月生成时长', ['80 分钟', '1200 分钟', '自定义']],
  ['最高导出分辨率', ['720p', '4K HDR', '8K 定制']],
  ['水印 / AIGC 标注', ['可选 C2PA', 'C2PA · 可选隐藏', 'C2PA · 企业配置']],
  ['多模型路由', [false, true, true]],
  ['数字演员 LoRA', [false, true, true]],
  ['实时协作人数', ['1', '10', '无限']],
  ['时间线导出 (PR/DaVinci)', [false, true, true]],
  ['私有化 / VPC 部署', [false, false, true]],
  ['SSO · SAML · 审计', [false, false, true]],
  ['商用授权', [false, true, true]],
  ['优先算力 · SLA', [false, '标准', '专属']],
]

export default function Pricing() {
  const [yearly, setYearly] = useState(true)

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
            按<span className="text-gradient">团队规模</span>自由扩展
          </h1>
          <p className="mt-4 text-ink-1">
            从独立创作者到全球广告公司，都能在 PineLine 找到合适的管线形态。
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 text-xs">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 transition ${
                !yearly ? 'bg-white/[0.08] text-white' : 'text-ink-1'
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-1.5 transition ${
                yearly ? 'bg-white/[0.08] text-white' : 'text-ink-1'
              }`}
            >
              年付 <span className="ml-1 text-brand">省 17%</span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => {
            const price = p.priceM == null ? '议价' : `¥${yearly ? p.priceY : p.priceM}`
            return (
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
                    {price}
                  </span>
                  {p.priceM != null && <span className="text-sm text-ink-2">/ 月</span>}
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
                  to="/studio"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    p.highlight ? 'btn-primary' : 'btn-ghost'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            )
          })}
        </div>

        {/* comparison table */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-white/[0.07]">
          <div className="grid grid-cols-4 border-b border-white/[0.06] bg-white/[0.02] px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-ink-2">
            <div>能力对比</div>
            <div className="text-center">Creator</div>
            <div className="text-center">Studio</div>
            <div className="text-center">Enterprise</div>
          </div>
          {COMPARE.map((row, i) => (
            <div
              key={row[0]}
              className={`grid grid-cols-4 border-b border-white/[0.04] px-6 py-4 text-sm last:border-0 ${
                i % 2 ? 'bg-white/[0.015]' : ''
              }`}
            >
              <div className="text-ink-1">{row[0]}</div>
              {row[1].map((v, j) => (
                <div key={j} className="flex justify-center text-ink-0">
                  {v === true ? (
                    <Check size={16} className="text-brand" />
                  ) : v === false ? (
                    <Minus size={16} className="text-ink-3" />
                  ) : (
                    <span className="text-xs">{v}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <FAQ />
      <CTA />
    </motion.main>
  )
}
