'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

export default function RobotAvatar({ activeSection, mousePos }) {
  const group = useRef();

  // Load model and clone it so it's fresh
  const { scene } = useGLTF('/models/animations/Developer.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Load animations
  const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx');
  const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
  const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx');
  const { animations: pointingAnimation } = useFBX('/models/animations/Pointing_Forward.fbx');

  // Assign names to animation clips
  idleAnimation[0].name = 'idle';
  saluteAnimation[0].name = 'salute';
  victoryAnimation[0].name = 'victory';
  pointingAnimation[0].name = 'pointing';

  const { actions } = useAnimations(
    [idleAnimation[0], saluteAnimation[0], victoryAnimation[0], pointingAnimation[0]],
    group
  );

  const [currentAction, setCurrentAction] = useState('idle');

  // Handle animation changes based on section
  useEffect(() => {
    let actionName = 'idle';
    if (activeSection === 'hero') actionName = 'salute';
    if (activeSection === 'about') actionName = 'idle';
    if (activeSection === 'skills') actionName = 'pointing';
    if (activeSection === 'projects') actionName = 'victory';
    
    if (actions[actionName]) {
      actions[actionName].reset().fadeIn(0.5).play();
    }
    setCurrentAction(actionName);

    return () => {
      if (actions[actionName]) {
        actions[actionName].fadeOut(0.5);
      }
    };
  }, [activeSection, actions]);

  // Make materials glow neon (Cybernetic modifications)
  useEffect(() => {
    Object.values(materials).forEach((mat) => {
      if (mat.name.toLowerCase().includes('shirt') || mat.name.toLowerCase().includes('body')) {
        mat.emissive = new THREE.Color('#00F5FF');
        mat.emissiveIntensity = 0.2;
      }
    });
  }, [materials]);

  // Head and eyes follow mouse
  useFrame((state) => {
    if (!group.current) return;
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;

    // Find the head bone or spine
    const spine = group.current.getObjectByName('Spine2') || group.current.getObjectByName('Head');
    if (spine) {
      spine.rotation.y = THREE.MathUtils.lerp(spine.rotation.y, targetX, 0.1);
      spine.rotation.x = THREE.MathUtils.lerp(spine.rotation.x, -targetY, 0.1);
    }

    // Gentle hover
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 - 1.5;
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={clone} scale={1.8} position={[0, -1.5, 0]} />
      {/* Floating energy core in chest */}
      <pointLight position={[0, 0.5, 0.5]} color="#00F5FF" intensity={2} distance={3} />
      <mesh position={[0, 0.5, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={5} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/animations/Developer.glb');
