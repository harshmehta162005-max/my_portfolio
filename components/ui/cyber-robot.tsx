"use client"

import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"

// ─── Glowing Eye ──────────────────────────────────────────
function GlowingEye({ position }: { position: [number, number, number] }) {
  const eyeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!eyeRef.current) return
    // INCREASED TRACKING INTENSITY: and fixed mapping
    const px = state.pointer.x * 0.08 
    const py = state.pointer.y * 0.06
    eyeRef.current.position.x = THREE.MathUtils.lerp(eyeRef.current.position.x, position[0] + px, 0.15)
    eyeRef.current.position.y = THREE.MathUtils.lerp(eyeRef.current.position.y, position[1] + py, 0.15)
  })

  return (
    <group ref={eyeRef} position={position}>
      <mesh>
        <capsuleGeometry args={[0.035, 0.05, 16, 16]} />
        <meshStandardMaterial
          color="#0088ff"
          emissive="#0088ff"
          emissiveIntensity={6}
        />
      </mesh>
      <group position={[0, 0, 0.02]}>
        {[-0.03, -0.01, 0.01, 0.03].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.06, 0.005, 0.01]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// ─── Joint ──────────────────────────────────────────────────
function Joint({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.045, 32, 32]} />
      <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

// ─── Limb Segment ───────────────────────────────────────────
function LimbSegment({ position, rotation, args }: { position: [number, number, number]; rotation?: [number, number, number]; args: [number, number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <capsuleGeometry args={args} />
      <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

// ─── Arm ────────────────────────────────────────────────────
function Arm({ side }: { side: "left" | "right" }) {
  const shoulderRef = useRef<THREE.Group>(null)
  const elbowRef = useRef<THREE.Group>(null)
  const x = side === "left" ? -0.15 : 0.15
  const dir = side === "right" ? 1 : -1

  useFrame((state) => {
    if (!shoulderRef.current || !elbowRef.current) return
    const t = state.clock.elapsedTime
    shoulderRef.current.rotation.z = dir * (0.2 + Math.sin(t * 1.5) * 0.05)
    shoulderRef.current.rotation.x = Math.sin(t * 1.5 + (side === "left" ? 0 : Math.PI)) * 0.05
    elbowRef.current.rotation.z = THREE.MathUtils.lerp(elbowRef.current.rotation.z, 0, 0.1)
  })

  return (
    <group ref={shoulderRef} position={[x, 0.1, 0]}>
      <Joint position={[0, 0, 0]} scale={1.1} />
      <LimbSegment position={[0, -0.07, 0]} args={[0.028, 0.06, 16, 16]} />
      <group ref={elbowRef} position={[0, -0.15, 0]}>
         <Joint position={[0, 0, 0]} />
         <LimbSegment position={[0, -0.09, 0]} args={[0.038, 0.08, 16, 16]} />
         <mesh position={[0, -0.2, 0]}>
           <sphereGeometry args={[0.05, 16, 16]} />
           <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
         </mesh>
      </group>
    </group>
  )
}

// ─── Leg ────────────────────────────────────────────────────
function Leg({ side }: { side: "left" | "right" }) {
  const ref = useRef<THREE.Group>(null)
  const x = side === "left" ? -0.08 : 0.08

  return (
    <group ref={ref} position={[x, -0.12, 0]}>
      <Joint position={[0, 0, 0]} />
      <LimbSegment position={[0, -0.1, 0]} args={[0.035, 0.08, 16, 16]} />
      <Joint position={[0, -0.2, 0]} />
      <LimbSegment position={[0, -0.3, 0.02]} args={[0.045, 0.1, 16, 16]} />
      <mesh position={[0, -0.4, 0.04]}>
        <boxGeometry args={[0.1, 0.04, 0.14]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// ─── Main Robot ─────────────────────────────────────────────
export function CyberRobot() {
  const group = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current || !headRef.current) return
    const t = state.clock.elapsedTime
    group.current.position.y = Math.sin(t * 1.5) * 0.03 - 0.2
    
    // SMOOTHER HEAD TRACKING
    const targetRotY = state.pointer.x * 0.6
    const targetRotX = -state.pointer.y * 0.4
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.12)
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.12)
  })

  return (
    <group
      ref={group}
      scale={1.9}
      position={[0, -0.3, 0]}
    >
      <Environment preset="city" />

      {/* ══════════ HEAD ══════════ */}
      <group ref={headRef} position={[0, 0.6, 0]}>
        <mesh>
          <sphereGeometry args={[0.35, 64, 64]} />
          <meshStandardMaterial color="#020202" metalness={1} roughness={0.02} envMapIntensity={2} />
        </mesh>
        <mesh position={[0, -0.02, 0.32]}>
          <circleGeometry args={[0.26, 64]} />
          <meshStandardMaterial color="#080808" metalness={0.2} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0.31]}>
           <torusGeometry args={[0.26, 0.015, 32, 64]} />
           <meshStandardMaterial color="#050505" metalness={1} roughness={0.05} />
        </mesh>
        <group position={[0, 0.02, 0.34]}>
          <GlowingEye position={[-0.1, 0, 0]} />
          <GlowingEye position={[0.1, 0, 0]} />
        </group>
        
        <group position={[0, -0.1, 0.34]}>
           <mesh rotation={[0, 0, -Math.PI * 0.8]}>
              <torusGeometry args={[0.08, 0.01, 8, 32, Math.PI * 0.6]} />
              <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={3} transparent opacity={0.6} />
           </mesh>
        </group>
      </group>

      {/* ══════════ NECK ══════════ */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.08, 32]} />
        <meshStandardMaterial color="#020202" metalness={1} roughness={0.1} />
      </mesh>

      {/* ══════════ BODY ══════════ */}
      <group position={[0, 0.1, 0]}>
        <mesh>
          <sphereGeometry args={[0.18, 64, 64]} />
          <meshStandardMaterial color="#020202" metalness={1} roughness={0.05} />
        </mesh>
      </group>

      {/* ══════════ ARMS ══════════ */}
      <Arm side="left" />
      <Arm side="right" />

      {/* ══════════ LEGS ══════════ */}
      <Leg side="left" />
      <Leg side="right" />

      {/* ══════════ SHADOW GLOW ══════════ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={1} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}
