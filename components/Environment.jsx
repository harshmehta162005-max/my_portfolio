'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Environment() {
  const gridRef = useRef();

  useFrame((state) => {
    if (gridRef.current) {
      // Subtle movement of the grid
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 1;
    }
  });

  return (
    <group>
      {/* Slow moving glowing particle nebula */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
      
      {/* Volumetric Fog */}
      <fog attach="fog" args={['#0A0A0A', 10, 60]} />

      {/* Ambient Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} color="#00F5FF" intensity={0.5} />
      <directionalLight position={[-10, 10, -10]} color="#FF007A" intensity={0.5} />

      {/* Faint neon grid floor */}
      <gridHelper 
        ref={gridRef} 
        args={[100, 100, '#FF007A', '#00F5FF']} 
        position={[0, -2.5, 0]} 
      />
      
      {/* Transparent plane under grid to catch shadows or fade to void */}
      <mesh position={[0, -2.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
