

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'

// Floating Gear 5 Energy Particles
function Gear5Particles() {
  const mesh = useRef()
  const mouse = useMousePosition()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 100; i++) {
      temp.push({
        // eslint-disable-next-line
        t: Math.random() * 100,
        // eslint-disable-next-line
        factor: 20 + Math.random() * 100,
        // eslint-disable-next-line
        speed: 0.01 + Math.random() / 200,
        // eslint-disable-next-line
        xFactor: -50 + Math.random() * 100,
        // eslint-disable-next-line
        yFactor: -50 + Math.random() * 100,
        // eslint-disable-next-line
        zFactor: -50 + Math.random() * 100,
        mx: 0,
        my: 0
      })
    }
    return temp
  }, []) // intentionally empty - only run once

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      particle.mx += (mouse.x - particle.mx) * 0.01
      particle.my += (mouse.y - particle.my) * 0.01
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      
      dummy.scale.setScalar(s * 2)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, 100]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  )
}

// Heartbeat Drum Effect
function HeartbeatDrum() {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const heartbeat = Math.sin(time * 4) * 0.5 + 0.5
    const scale = 1 + heartbeat * 0.1
    meshRef.current.scale.setScalar(scale)
    meshRef.current.material.opacity = 0.1 + heartbeat * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.1} 
        wireframe 
      />
    </mesh>
  )
}

// Lightning Bolts
function LightningBolts() {
  const groupRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.1
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          rotation={[0, (i * Math.PI) / 3, 0]}
          position={[0, 0, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 10, 8]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff2a6d" />
      <Gear5Particles />
      <HeartbeatDrum />
      <LightningBolts />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="block text-white"
            >
              Ritik Gusain
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="block gradient-text lightning-text mt-2"
            >
              Gear 5 Mode
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
          >
            Blockchain Developer · AI Engineer · Smart Contract Security
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#projects" className="btn-primary group">
              View Projects
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
          >
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '50+', label: 'Projects' },
              { value: '100%', label: 'Commitment' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gear5-dark to-transparent z-10" />
    </section>
  )
}
