// src/components/ScrollReveal.jsx
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const ScrollReveal = ({ 
  children, 
  className = '',
  direction = 'up', // up, down, left, right
  delay = 0,
  duration = 1,
  distance = 100
}) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    
    const getFrom = () => {
      switch(direction) {
        case 'up': return { y: distance, opacity: 0 }
        case 'down': return { y: -distance, opacity: 0 }
        case 'left': return { x: distance, opacity: 0 }
        case 'right': return { x: -distance, opacity: 0 }
        default: return { y: distance, opacity: 0 }
      }
    }

    gsap.fromTo(element, 
      getFrom(),
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [direction, delay, duration, distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Text split animation (like nvg8.io)
export const SplitTextReveal = ({ text, className = '' }) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    const chars = element.querySelectorAll('.char')
    
    gsap.fromTo(chars,
      { 
        y: 100, 
        opacity: 0,
        rotateX: -90
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  // Split text into characters
  const characters = text.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ transformStyle: 'preserve-3d' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ perspective: '1000px' }}>
      <div className="flex flex-wrap">
        {characters}
      </div>
    </div>
  )
}

// Parallax layer
export const ParallaxLayer = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    
    gsap.to(element, {
      y: () => (1 - speed) * 200,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Sticky section (like nvg8.io pinned sections)
export const StickySection = ({ children, className = '' }) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true
    })
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}