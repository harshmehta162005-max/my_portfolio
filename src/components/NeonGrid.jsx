import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// NEON GRID FLOOR — Infinite reactive grid
// Subtle perspective floor that pulses and
// responds to camera movement
// ============================================

const NeonGrid = () => {
  const gridRef = useRef();

  // Create grid geometry with custom shader material
  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00F5FF') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vFade;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          float dist = length(worldPos.xz);
          vFade = smoothstep(40.0, 5.0, dist);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        varying float vFade;

        float grid(vec2 st, float res) {
          vec2 grid = fract(st * res);
          return (step(res, grid.x) + step(res, grid.y));
        }

        void main() {
          vec2 uv = vUv * 80.0;
          
          // Main grid lines
          float mainGrid = 1.0 - grid(uv, 0.95);
          
          // Sub grid for detail
          float subGrid = 1.0 - grid(uv * 4.0, 0.97);
          
          // Combine grids
          float combinedGrid = mainGrid * 0.5 + subGrid * 0.15;
          
          // Pulse effect
          float pulse = sin(uTime * 0.5) * 0.15 + 0.85;
          
          // Distance fade
          float alpha = combinedGrid * vFade * pulse * 0.3;
          
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (gridMaterial.uniforms) {
      gridMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={gridRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -8, 0]}
      material={gridMaterial}
    >
      <planeGeometry args={[100, 100, 1, 1]} />
    </mesh>
  );
};

export default NeonGrid;
