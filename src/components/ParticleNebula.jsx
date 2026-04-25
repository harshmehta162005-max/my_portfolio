import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// PARTICLE NEBULA — Infinite star field with
// slow-moving neon particles + energy streaks
// Uses InstancedMesh for 60fps performance
// ============================================

const PARTICLE_COUNT = 2000;

const ParticleNebula = () => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate random particle data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80
        ),
        speed: Math.random() * 0.003 + 0.001,
        scale: Math.random() * 0.08 + 0.02,
        // Choose a neon color randomly
        colorIndex: Math.floor(Math.random() * 3),
        offset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  const neonColors = useMemo(() => [
    new THREE.Color('#00F5FF'),
    new THREE.Color('#B026FF'),
    new THREE.Color('#FF007A'),
  ], []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];

      // Slow orbital movement
      dummy.position.set(
        p.position.x + Math.sin(time * p.speed + p.offset) * 2,
        p.position.y + Math.cos(time * p.speed * 0.7 + p.offset) * 1.5,
        p.position.z + Math.sin(time * p.speed * 0.5 + p.offset) * 2
      );

      // Pulsing scale
      const pulse = Math.sin(time * 1.5 + p.offset) * 0.3 + 0.7;
      dummy.scale.setScalar(p.scale * pulse);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Set color for each instance
      meshRef.current.setColorAt(i, neonColors[p.colorIndex]);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.7} toneMapped={false} />
    </instancedMesh>
  );
};

export default ParticleNebula;
