import { Link } from 'react-router-dom'
import { Github, Twitter, Youtube, Linkedin } from 'lucide-react'
import Logo from './Logo'

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
    title: '管线',
    links: [
      { label: '剧本到分镜', to: '/studio' },
      { label: '多模型视频生成', to: '/studio' },
      { label: '虚拟演员 / 数字人', to: '/studio' },
      { label: '镜头剪辑与声效', to: '/studio' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '更新日志', to: '/' },
      { label: '教程与指南', to: '/' },
      { label: 'API 文档', to: '/' },
      { label: '创作者社区', to: '/' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '关于 PineLine', to: '/' },
      { label: '合作伙伴', to: '/' },
      { label: '加入我们', to: '/' },
      { label: '联系商务', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06] bg-bg-0">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
              PineLine 是面向专业影视与品牌创意的 AIGC 创作管线。从一段文本到一条成片，
              由 AI 自动贯通分镜、角色、镜头、生成、剪辑、调色与声效。
            </p>
            <div className="mt-5 flex gap-2">
              {[Github, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full border border-white/10 p-2 text-ink-1 transition hover:border-white/25 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
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
            <span>隐私政策</span>
            <span>服务条款</span>
            <span>内容合规</span>
            <span className="text-ink-3">v0.1 · Cinematic Pipeline</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
