import { motion } from 'framer-motion'
import Hero from '../sections/Hero'
import ModelMarquee from '../sections/ModelMarquee'
import Pipeline from '../sections/Pipeline'
import CanvasShowcase from '../sections/CanvasShowcase'
import FeatureGrid from '../sections/FeatureGrid'
import VirtualActors from '../sections/VirtualActors'
import ShowcaseWall from '../sections/ShowcaseWall'
import Testimonials from '../sections/Testimonials'
import PricingTeaser from '../sections/PricingTeaser'
import FAQ from '../sections/FAQ'
import CTA from '../sections/CTA'

export default function Landing() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex-1"
    >
      <Hero />
      <ModelMarquee />
      <Pipeline />
      <CanvasShowcase />
      <FeatureGrid />
      <VirtualActors />
      <ShowcaseWall />
      <Testimonials />
      <PricingTeaser />
      <FAQ />
      <CTA />
    </motion.main>
  )
}
