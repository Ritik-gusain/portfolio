// src/hooks/useMousePosition.js
import { useState, useEffect, useRef } from 'react'

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 })
  const rafRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      
      rafRef.current = requestAnimationFrame(() => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
          normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
          normalizedY: -(e.clientY / window.innerHeight) * 2 + 1
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return position
}

export const useRelativeMousePosition = (ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0, isInside: false, rect: null })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
      
      setPosition({ x, y, isInside, rect })
    }

    const handleMouseLeave = () => {
      setPosition(prev => ({ ...prev, isInside: false }))
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])

  return position
}