import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Menu, X } from 'lucide-react'
import Logo from './Logo'

const NAV = [
  { to: '/', label: '首页' },
  { to: '/studio', label: 'Studio' },
  { to: '/templates', label: '模板' },
  { to: '/showcase', label: '精选' },
  { to: '/pricing', label: '定价' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? 'border-b border-white/[0.06] bg-bg-0/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-ink-1 hover:text-white'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://docs.tapnow.ai/en/docs"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-ink-1 transition hover:text-white"
          >
            文档
          </a>
          <Link to="/studio" className="btn-primary">
            <Sparkles size={14} />
            开始创作
          </Link>
        </div>

        <button
          aria-label="toggle menu"
          className="rounded-full border border-white/10 p-2 md:hidden"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-bg-0/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-white/[0.06] text-white' : 'text-ink-1'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/studio" className="btn-primary mt-2 justify-center">
              <Sparkles size={14} />
              开始创作
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  )
}
