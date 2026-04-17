import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Studio from './pages/Studio'
import Templates from './pages/Templates'
import Showcase from './pages/Showcase'
import Pricing from './pages/Pricing'

export default function App() {
  const location = useLocation()
  const isStudio = location.pathname.startsWith('/studio')

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isStudio && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </AnimatePresence>
      {!isStudio && <Footer />}
    </div>
  )
}
