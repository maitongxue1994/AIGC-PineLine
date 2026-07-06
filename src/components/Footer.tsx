import { Link } from 'react-router-dom'
import Logo from './Logo'
import { CONTACT } from '../siteConfig'

const COLS = [
  {
    title: '产品',
    links: [
      { label: 'Studio 工作台', to: '/studio' },
      { label: '模板库', to: '/templates' },
      { label: '精选作品', to: '/showcase' },
      { label: '定价方案', to: '/pricing' },
    ],
  },
  {
    title: '能力',
    links: [
      { label: '剧本到分镜', to: '/studio' },
      { label: '多模型视频生成', to: '/studio' },
      { label: '角色/场景一致性', to: '/studio' },
      { label: '分镜一键成片', to: '/studio' },
    ],
  },
  {
    title: '条款',
    links: [
      { label: '服务条款', to: '/terms' },
      { label: '隐私政策', to: '/privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06] bg-bg-0">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
              PineLine 是节点画布式 AIGC 视频创作管线：从剧本到分镜、分镜图、镜头视频，
              连线即上游产出自动喂下游，一键搭建完整生成链。
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-5 inline-block text-sm text-ink-1 transition hover:text-white"
            >
              {CONTACT.email}
            </a>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-2">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-1 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-grad my-10" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-ink-2 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} PineLine Studio. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="transition hover:text-white">隐私政策</Link>
            <Link to="/terms" className="transition hover:text-white">服务条款</Link>
            <span className="text-ink-3">v0.1 · Cinematic Pipeline</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
