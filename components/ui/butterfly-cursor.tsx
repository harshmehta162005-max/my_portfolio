"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// ─── Custom Swallowtail Wing Shape ──────────────────────────
function createWingShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0.1, 0.1, 0.4, 0.5, 0.8, 0.6)
  shape.bezierCurveTo(1.2, 0.7, 1.5, 0.3, 1.4, -0.1)
  shape.bezierCurveTo(1.3, -0.4, 0.8, -0.6, 0.4, -0.4)
  shape.bezierCurveTo(0.6, -0.8, 0.7, -1.2, 0.4, -1.8)
  shape.bezierCurveTo(0.3, -2.0, 0.1, -1.8, 0.1, -1.4)
  shape.bezierCurveTo(0, -1.0, -0.1, -0.5, 0, 0)
  return shape
}

// ─── Butterfly Component ──────────────────────────────────
function Butterfly({ isFollowing, targetPos }: { isFollowing: boolean; targetPos: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Group>(null)
  const leftWingRef = useRef<THREE.Group>(null)
  const rightWingRef = useRef<THREE.Group>(null)
  const { viewport, camera } = useThree()
  
  const currentPos = useMemo(() => new THREE.Vector3(0, 5, 0), [])
  const noiseOffset = useMemo(() => Math.random() * 100, [])
  const wingShape = useMemo(() => createWingShape(), [])

  useFrame((state) => {
    if (!meshRef.current || !leftWingRef.current || !rightWingRef.current) return
    
    const t = state.clock.elapsedTime
    
    // 1. Wing Flapping - Calmed down speed
    const flapSpeed = isFollowing ? 24 : 3.5
    const flapAngle = Math.sin(t * flapSpeed) * (isFollowing ? 1.3 : 0.25)
    leftWingRef.current.rotation.y = flapAngle
    rightWingRef.current.rotation.y = -flapAngle

    // 2. PRECISION BOUNDARY CALCULATION
    const viewAtZ4 = viewport.getCurrentViewport(camera, [0, 0, 4])
    const margin = 0.8
    const limitX = (viewAtZ4.width / 2) - margin
    const limitY = (viewAtZ4.height / 2) - margin

    if (isFollowing) {
      // 3. CALMED ZIG-ZAG: Reduced frequency (speed) and amplitude (width)
      const flutterX = Math.sin(t * 2.5 + noiseOffset) * 0.5 
      const flutterY = Math.cos(t * 1.8 + noiseOffset) * 0.3
      
      let finalTarget = targetPos.clone().add(new THREE.Vector3(flutterX, flutterY, 0))
      
      // ABSOLUTE CLAMPING
      finalTarget.x = THREE.MathUtils.clamp(finalTarget.x, -limitX, limitX)
      finalTarget.y = THREE.MathUtils.clamp(finalTarget.y, -limitY, limitY)
      finalTarget.z = 4
      
      const dist = currentPos.distanceTo(finalTarget)
      // Smoother, lazier follow speed (reduced from 0.05-0.1 to 0.03-0.07)
      const lerpFactor = THREE.MathUtils.clamp(0.03 + dist * 0.008, 0.03, 0.07)
      
      currentPos.lerp(finalTarget, lerpFactor)
      
      meshRef.current.position.set(
        THREE.MathUtils.clamp(currentPos.x, -limitX, limitX),
        THREE.MathUtils.clamp(currentPos.y, -limitY, limitY),
        4
      )
      
      meshRef.current.lookAt(finalTarget)
      meshRef.current.rotateX(Math.PI / 2)
    } else {
      currentPos.lerp(targetPos, 0.08)
      meshRef.current.position.copy(currentPos)
      meshRef.current.rotation.set(0.3, 0.2, 0)
    }
  })

  return (
    <group ref={meshRef} scale={0.20}>
      <mesh>
        <capsuleGeometry args={[0.04, 0.3, 4, 8]} />
        <meshStandardMaterial color="#000000" metalness={1} roughness={0.1} />
      </mesh>
      <group position={[0, 0.15, 0]}>
         <mesh rotation={[0, 0, 0.4]} position={[0.05, 0.1, 0]}>
           <cylinderGeometry args={[0.005, 0.005, 0.2]} />
           <meshBasicMaterial color="#000000" />
         </mesh>
         <mesh rotation={[0, 0, -0.4]} position={[-0.05, 0.1, 0]}>
           <cylinderGeometry args={[0.005, 0.005, 0.2]} />
           <meshBasicMaterial color="#000000" />
         </mesh>
      </group>
      <group ref={leftWingRef} position={[-0.02, 0, 0]}>
        <mesh rotation={[0, Math.PI, 0]} scale={0.8}>
          <shapeGeometry args={[wingShape as any]} />
          <meshStandardMaterial color="#000000" side={THREE.DoubleSide} metalness={1} roughness={0.05} />
        </mesh>
      </group>
      <group ref={rightWingRef} position={[0.02, 0, 0]}>
        <mesh scale={0.8}>
          <shapeGeometry args={[wingShape as any]} />
          <meshStandardMaterial color="#000000" side={THREE.DoubleSide} metalness={1} roughness={0.05} />
        </mesh>
      </group>
    </group>
  )
}

export function ButterflyCursor() {
  const [isFollowing, setIsFollowing] = useState(false)
  const targetPos = useMemo(() => new THREE.Vector3(0, 10, 0), [])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    const timer = setTimeout(() => {
      setIsFollowing(true)
    }, 3000)

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timer)
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      const aspect = window.innerWidth / window.innerHeight
      // Reduced range from 6x5 to 4.5x3.8
      targetPos.set(x * 4.5 * aspect, y * 3.8, 4)
      if (!isFollowing) setIsFollowing(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      clearTimeout(timer)
      const touch = e.touches[0]
      const x = (touch.clientX / window.innerWidth) * 2 - 1
      const y = -(touch.clientY / window.innerHeight) * 2 + 1
      const aspect = window.innerWidth / window.innerHeight
      // Reduced range from 6x5 to 4.5x3.8
      targetPos.set(x * 4.5 * aspect, y * 3.8, 4)
      if (!isFollowing) setIsFollowing(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isFollowing, targetPos])

  useEffect(() => {
    if (!isFollowing) {
      const aspect = window.innerWidth / window.innerHeight
      if (isMobile) {
        // Bring it lower on the screen for mobile so it's not hidden at the very top
        targetPos.set(0, 1.5, 4)
      } else {
        targetPos.set(1.4 * aspect, 0.45, 4)
      }
    }
  }, [isMobile, isFollowing, targetPos])

  return (
    <div className="fixed inset-0 pointer-events-none z-[10]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }} 
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Butterfly isFollowing={isFollowing} targetPos={targetPos} />
      </Canvas>
    </div>
  )
}
