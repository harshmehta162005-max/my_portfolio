'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SECTION_COORDINATES = {
  hero: { x: 0, y: 0, z: 0 },
  about: { x: 10, y: -5, z: -20 },
  skills: { x: -10, y: 5, z: -40 },
  projects: { x: 0, y: -10, z: -60 },
  experience: { x: 15, y: 10, z: -80 },
};

function Platform({ position, color, title }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Platform Ring 1 */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe />
      </mesh>
      
      {/* Platform Ring 2 (Inner, rotating opposite) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} transparent opacity={0.5} />
      </mesh>

      {/* Holographic Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[3, 2.5, 0.2, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function FloatingPlatforms() {
  return (
    <group>
      {/* Hero platform is implicit at 0,0,0 where robot is */}
      <Platform position={[SECTION_COORDINATES.about.x, SECTION_COORDINATES.about.y - 1, SECTION_COORDINATES.about.z]} color="#FF007A" title="About" />
      <Platform position={[SECTION_COORDINATES.skills.x, SECTION_COORDINATES.skills.y - 1, SECTION_COORDINATES.skills.z]} color="#00F5FF" title="Skills" />
      <Platform position={[SECTION_COORDINATES.projects.x, SECTION_COORDINATES.projects.y - 1, SECTION_COORDINATES.projects.z]} color="#B026FF" title="Projects" />
      <Platform position={[SECTION_COORDINATES.experience.x, SECTION_COORDINATES.experience.y - 1, SECTION_COORDINATES.experience.z]} color="#A3FF00" title="Experience" />
    </group>
  );
}
