import { useEffect, useState } from 'react'

export const useScrollDepth = () => {
  const [maxScrollDepth, setMaxScrollDepth] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercent = Math.round((scrollTop / docHeight) * 100)
          
          setMaxScrollDepth(prev => Math.max(prev, scrollPercent))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return maxScrollDepth
}

