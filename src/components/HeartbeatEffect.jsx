// src/components/HeartbeatEffect.jsx
import { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from 'framer-motion'

// Gear 5 "Drums of Liberation" heartbeat effect
export default function HeartbeatEffect({ children, className = '' }) {
  const controls = useAnimation()
  
  useEffect(() => {
    // Gear 5 heartbeat pattern: ba-dum... ba-dum... (2 beats then pause)
    const heartbeat = async () => {
      while (true) {
        // First beat (strong)
        await controls.start({
          scale: [1, 1.05, 1],
          filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
          transition: { duration: 0.3, ease: "easeInOut" }
        })
        
        // Second beat (weaker)
        await controls.start({
          scale: [1, 1.02, 1],
          filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'],
          transition: { duration: 0.2, ease: "easeInOut" }
        })
        
        // Pause (rest between heartbeats)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    heartbeat()
    
    return () => controls.stop()
  }, [controls])

  return (
    <motion.div
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text with lightning/heartbeat glow
export function Gear5Text({ children, className = '' }) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        textShadow: [
          '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(0,217,255,0.3)',
          '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(0,217,255,0.5), 0 0 60px rgba(255,42,109,0.3)',
          '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(0,217,255,0.3)',
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.span>
  )
}

// Pulsing ring effect (for buttons, avatars, etc)
export function PulseRing({ children, color = 'cyan' }) {
  const colorClasses = {
    cyan: 'border-cyan-400 shadow-cyan-400/50',
    pink: 'border-pink-400 shadow-pink-400/50',
    white: 'border-white shadow-white/50'
  }
  
  return (
    <div className="relative">
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${colorClasses[color]} shadow-lg`}
        animate={{
          scale: [1, 1.2, 1.4],
          opacity: [0.5, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${colorClasses[color]} shadow-lg`}
        animate={{
          scale: [1, 1.2, 1.4],
          opacity: [0.5, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}