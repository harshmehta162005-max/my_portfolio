import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// NEURAL CORE — Central cybernetic avatar
// Procedural metallic core with:
// - Floating energy rings
// - Glowing neon circuit lines
// - Pulsing inner core
// - Mouse-tracking rotation
// - Idle breathing animation
// ============================================

const NeuralCore = ({ mouseX = 0, mouseY = 0, scale = 1 }) => {
  const groupRef = useRef();
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const innerCoreRef = useRef();
  const outerShellRef = useRef();

  // Emissive neon materials
  const cyanMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#001520',
    emissive: '#00F5FF',
    emissiveIntensity: 2,
    metalness: 0.9,
    roughness: 0.1,
    toneMapped: false,
  }), []);

  const magentaMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#200010',
    emissive: '#FF007A',
    emissiveIntensity: 1.5,
    metalness: 0.9,
    roughness: 0.1,
    toneMapped: false,
  }), []);

  const violetMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#100020',
    emissive: '#B026FF',
    emissiveIntensity: 1.5,
    metalness: 0.9,
    roughness: 0.1,
    toneMapped: false,
  }), []);

  const shellMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0A0A0E',
    metalness: 1,
    roughness: 0.15,
    transparent: true,
    opacity: 0.4,
  }), []);

  const innerCoreMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00F5FF',
    transparent: true,
    opacity: 0.8,
    toneMapped: false,
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Smooth mouse tracking for the whole group
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-mouseY * 0.3 - groupRef.current.rotation.x) * 0.05;
    }

    // Idle breathing — gentle hover
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time * 1.2) * 0.15;
    }

    // Rotating rings at different speeds & axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.z = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.5;
      ring2Ref.current.rotation.x = time * -0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.35;
      ring3Ref.current.rotation.y = time * -0.25;
    }

    // Pulsing inner core
    if (innerCoreRef.current) {
      const pulse = Math.sin(time * 2) * 0.15 + 0.85;
      innerCoreRef.current.scale.setScalar(pulse);
      innerCoreRef.current.material.opacity = 0.5 + Math.sin(time * 2) * 0.3;
    }

    // Outer shell rotation
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = time * 0.15;
      outerShellRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main core body */}
      <group ref={coreRef}>
        {/* Central energy sphere */}
        <mesh ref={innerCoreRef} material={innerCoreMat}>
          <sphereGeometry args={[0.35, 32, 32]} />
        </mesh>

        {/* Inner icosahedron frame */}
        <mesh material={cyanMat}>
          <icosahedronGeometry args={[0.6, 0]} />
        </mesh>

        {/* Outer shell — translucent metallic dodecahedron */}
        <mesh ref={outerShellRef} material={shellMat}>
          <dodecahedronGeometry args={[0.9, 0]} />
        </mesh>

        {/* Energy node points on vertices */}
        {[
          [0, 1.1, 0], [0, -1.1, 0],
          [1.1, 0, 0], [-1.1, 0, 0],
          [0, 0, 1.1], [0, 0, -1.1],
          [0.7, 0.7, 0.7], [-0.7, -0.7, -0.7],
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#00F5FF' : i % 3 === 1 ? '#B026FF' : '#FF007A'}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Orbiting ring 1 — Cyan */}
      <mesh ref={ring1Ref} material={cyanMat}>
        <torusGeometry args={[1.6, 0.015, 16, 100]} />
      </mesh>

      {/* Orbiting ring 2 — Magenta */}
      <mesh ref={ring2Ref} material={magentaMat}>
        <torusGeometry args={[2.0, 0.012, 16, 100]} />
      </mesh>

      {/* Orbiting ring 3 — Violet */}
      <mesh ref={ring3Ref} material={violetMat}>
        <torusGeometry args={[2.4, 0.01, 16, 100]} />
      </mesh>

      {/* Floating geometric orbitals */}
      {[0, 1, 2, 3].map((i) => (
        <FloatingOrbital key={i} index={i} />
      ))}
    </group>
  );
};

// Small floating geometric shapes that orbit the core
const FloatingOrbital = ({ index }) => {
  const ref = useRef();
  const speed = 0.3 + index * 0.15;
  const radius = 2.8 + index * 0.5;
  const offset = (index * Math.PI) / 2;

  const colors = ['#00F5FF', '#FF007A', '#B026FF', '#A3FF00'];

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.x = Math.cos(time * speed + offset) * radius;
      ref.current.position.z = Math.sin(time * speed + offset) * radius;
      ref.current.position.y = Math.sin(time * speed * 2 + offset) * 0.5;
      ref.current.rotation.x = time * 1.5;
      ref.current.rotation.y = time * 1.2;
    }
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.08, 0]} />
      <meshBasicMaterial color={colors[index]} toneMapped={false} />
    </mesh>
  );
};

export default NeuralCore;
