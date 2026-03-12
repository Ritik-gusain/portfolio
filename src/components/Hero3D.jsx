import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMousePosition } from "../hooks/useMousePosition"
import { SplitTextReveal } from "./ScrollReveal"

gsap.registerPlugin(ScrollTrigger)

/* ===============================
   Scroll Responsive Particles
================================*/
function ScrollResponsiveParticles() {
  const mesh = useRef()
  const mouse = useMousePosition()
  const scrollProgress = useRef(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    return () => trigger.kill()
  }, [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 150; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
        ],
        size: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 2 + 0.5,
        scrollSpeed: Math.random() * 5 + 2,
      })
    }
    return temp
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scroll = scrollProgress.current

    particles.forEach((particle, i) => {
      const floatY = Math.sin(time * particle.speed) * 0.3
      const floatX = Math.cos(time * particle.speed * 0.7) * 0.2

      const scrollOffset = scroll * particle.scrollSpeed * 10

      const mouseX = mouse?.normalizedX ? mouse.normalizedX * 3 : 0
      const mouseY = mouse?.normalizedY ? mouse.normalizedY * 3 : 0

      dummy.position.set(
        particle.position[0] + floatX + mouseX,
        particle.position[1] + floatY - scrollOffset + mouseY,
        particle.position[2] + scroll * 5
      )

      const heartbeat = 1 + Math.sin(time * 4 + i) * 0.2
      const scrollScale = 1 + scroll * 0.5

      dummy.scale.setScalar(particle.size * heartbeat * scrollScale)
      dummy.rotation.set(time * 0.5, time * 0.3, scroll * Math.PI)

      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, 150]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={0xffffff}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}

/* ===============================
   Heartbeat Drum
================================*/
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
      <meshBasicMaterial color="#ffffff" transparent opacity={0.1} wireframe />
    </mesh>
  )
}

/* ===============================
   Lightning Bolts
================================*/
function LightningBolts() {
  const groupRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.1
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 10, 8]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* ===============================
   Hero Section
================================*/
export default function Hero3D() {
  const heroRef = useRef()

  useEffect(() => {
    const anim = gsap.to(heroRef.current, {
      y: 200,
      opacity: 0,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    return () => anim.kill()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff2a6d" />

          <ScrollResponsiveParticles />
          <HeartbeatDrum />
          <LightningBolts />

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <SplitTextReveal text="Ritik Gusain" className="text-white justify-center" />
            <div className="mt-2">
              <SplitTextReveal
                text="Gear 5 Mode"
                className="gradient-text justify-center"
              />
            </div>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Blockchain Developer · AI Engineer · Smart Contract Security
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="btn-primary">
              View Projects →
            </a>

            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  )
}