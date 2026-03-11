// src/components/Gear5Particles.jsx
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from '../hooks/useMousePosition'

function EnergyParticles({ count = 80 }) {
  const mesh = useRef()
  const mouse = useMousePosition()
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          // eslint-disable-next-line
          (Math.random() - 0.5) * 20,
          // eslint-disable-next-line
          (Math.random() - 0.5) * 20,
          // eslint-disable-next-line
          (Math.random() - 0.5) * 10
        ],
        // eslint-disable-next-line
        size: Math.random() * 0.3 + 0.1,
        // eslint-disable-next-line
        phase: Math.random() * Math.PI * 2,
        // eslint-disable-next-line
        speed: 0.5 + Math.random() * 1.5
      })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const [geometry, material] = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 16, 16)
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })
    return [geo, mat]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    particles.forEach((particle, i) => {
      const floatY = Math.sin(time * particle.speed + particle.phase) * 0.5
      const floatX = Math.cos(time * particle.speed * 0.7 + particle.phase) * 0.3
      
      const mouseInfluenceX = mouse.normalizedX * 2
      const mouseInfluenceY = mouse.normalizedY * 2
      
      dummy.position.set(
        particle.position[0] + floatX + mouseInfluenceX * 0.1,
        particle.position[1] + floatY + mouseInfluenceY * 0.1,
        particle.position[2]
      )
      
      const pulse = 1 + Math.sin(time * 4 + particle.phase) * 0.2
      dummy.scale.setScalar(particle.size * pulse)
      
      dummy.rotation.set(time * 0.5, time * 0.3, 0)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[geometry, material, count]} />
  )
}

function SunAura() {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const beat = (Math.sin(time * 3) + 1) / 2
    const scale = 1 + beat * 0.1
    meshRef.current.scale.setScalar(scale)
    meshRef.current.material.opacity = 0.05 + beat * 0.05
    meshRef.current.rotation.z = time * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <sphereGeometry args={[4, 64, 64]} />
      <meshBasicMaterial 
        color={0xffffff}
        transparent
        opacity={0.1}
        wireframe
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} color={0xffffff} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={0xff2a6d} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color={0x00d9ff} />
      
      <EnergyParticles count={80} />
      <SunAura />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </>
  )
}

export default function Gear5Particles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}