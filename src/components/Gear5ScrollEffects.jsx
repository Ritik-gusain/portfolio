// src/components/Gear5ScrollEffects.jsx
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lightning strike on scroll
export const ScrollLightning = () => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: [0, 1, 0.5, 1, 0],
        scale: 1.2,
        duration: 0.5,
        scrollTrigger: {
          trigger: element,
          start: 'top 60%',
          toggleActions: 'play restart none none'
        }
      }
    )
  }, [])

  return (
    <div 
      ref={ref} 
      className="absolute inset-0 pointer-events-none z-20"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.3) 50%, transparent 100%)',
        filter: 'blur(40px)',
        opacity: 0
      }}
    />
  )
}

// Heartbeat intensity based on scroll speed
export const ScrollHeartbeat = ({ children }) => {
  const ref = useRef()

  useEffect(() => {
    let lastScroll = 0
    let velocity = 0
    
    const updateHeartbeat = () => {
      const currentScroll = window.scrollY
      velocity = Math.abs(currentScroll - lastScroll)
      lastScroll = currentScroll
      
      // Faster scroll = faster heartbeat
      const beatSpeed = Math.max(0.5, 2 - velocity * 0.01)
      
      gsap.to(ref.current, {
        scale: 1 + Math.min(velocity * 0.002, 0.2),
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    window.addEventListener('scroll', updateHeartbeat, { passive: true })
    return () => window.removeEventListener('scroll', updateHeartbeat)
  }, [])

  return (
    <div ref={ref} style={{ transformOrigin: 'center center' }}>
      {children}
    </div>
  )
}

// Gear 5 "Nika" aura that expands on scroll
export const ScrollAura = () => {
  const ref = useRef()

  useEffect(() => {
    gsap.to(ref.current, {
      scale: 3,
      opacity: 0,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top center',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        transform: 'scale(0.5)'
      }}
    />
  )
}