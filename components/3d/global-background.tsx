"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const particlesCount = 800

  const positions = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00ffff" size={0.025} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

function MagentaDust() {
  const ref = useRef<THREE.Points>(null)
  const count = 300
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 25
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * -0.01
      ref.current.rotation.z = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#FF007A" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  )
}

function CodeConstellation() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <group ref={ref}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshBasicMaterial color="#B026FF" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

// CSS-based fallback
function FallbackParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            backgroundColor: i % 3 === 0 ? "#00F5FF" : i % 3 === 1 ? "#FF007A" : "#B026FF",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            opacity: 0.4 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  )
}

export default function GlobalBackground() {
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) setWebglSupported(false)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  if (!webglSupported || canvasError) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FallbackParticles />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        onError={() => { setCanvasError(true); setWebglSupported(false) }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ParticleField />
        <MagentaDust />
        <CodeConstellation />
      </Canvas>
    </div>
  )
}
