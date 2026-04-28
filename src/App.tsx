import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Templates from './pages/Templates'
import Showcase from './pages/Showcase'
import Pricing from './pages/Pricing'

const Studio = lazy(() => import('./pages/Studio'))

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
          <Route path="/templates" element={<Templates />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </AnimatePresence>
      {!isStudio && <Footer />}
    </div>
  )
}
