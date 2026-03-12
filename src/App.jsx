// src/App.jsx
import { useEffect } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useVisitorTracking } from './hooks/useVisitorTracking'
import { useScrollDepth } from './hooks/useScrollDepth'
import { ScrollAura } from './components/Gear5ScrollEffects'
import Navigation from './components/Navigation'
import Hero3D from './components/Hero3D'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gear5Particles from './components/Gear5Particles'
import ScrollProgress from './components/ScrollProgress'
import VisitorTracker from './components/VisitorTracker'

function App() {
  useSmoothScroll() // Add smooth scroll
  useVisitorTracking()
  const scrollDepth = useScrollDepth()

  useEffect(() => {
    console.log('Max scroll depth:', scrollDepth + '%')
  }, [scrollDepth])

  return (
    <div className="relative min-h-screen bg-gear5-dark overflow-x-hidden">
      <ScrollAura /> {/* Add scroll aura effect */}
      <div className="fixed inset-0 gear5-bg opacity-20" />
      <Gear5Particles />
      <div className="noise-overlay" />
      
      <VisitorTracker />
      <ScrollProgress />
      <Navigation />
      
      <main>
        <Hero3D />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}

export default App