import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Agentation } from 'agentation'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Templates from './pages/Templates'
import Showcase from './pages/Showcase'
import Pricing from './pages/Pricing'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

const Studio = lazy(() => import('./pages/Studio'))
const Projects = lazy(() => import('./pages/Projects'))

// Agentation 注释工具栏：dev 恒开；线上仅当 URL 带 ?agentation=1 时开（隐藏开关，避免普通用户看到）
const AGENTATION_ENABLED =
  import.meta.env.DEV ||
  (typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('agentation'))

function StudioFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-bg-0 text-ink-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 animate-pulseDot rounded-full bg-brand" />
        加载 Studio…
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isStudio = location.pathname.startsWith('/studio')

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isStudio && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route
            path="/studio"
            element={
              <Suspense fallback={<StudioFallback />}>
                <Studio />
              </Suspense>
            }
          />
          <Route
            path="/studio/projects"
            element={
              <Suspense fallback={<StudioFallback />}>
                <Projects />
              </Suspense>
            }
          />
          <Route path="/templates" element={<Templates />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </AnimatePresence>
      {!isStudio && <Footer />}
      {AGENTATION_ENABLED && <Agentation endpoint="http://localhost:4747" />}
    </div>
  )
}
