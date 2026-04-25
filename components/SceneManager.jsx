'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

import RobotAvatar from './RobotAvatar';
import Environment from './Environment';
import FloatingPlatforms, { SECTION_COORDINATES } from './FloatingPlatforms';

gsap.registerPlugin(ScrollTrigger);

// Custom Camera Controller using GSAP Timeline
function CameraController({ containerRef, setActiveSection }) {
  const { camera, scene } = useThree();
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // We create a master timeline mapped to the scroll progress of the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          // Determine active section based on scroll progress
          const progress = self.progress;
          if (progress < 0.2) setActiveSection('hero');
          else if (progress < 0.4) setActiveSection('about');
          else if (progress < 0.6) setActiveSection('skills');
          else if (progress < 0.8) setActiveSection('projects');
          else setActiveSection('experience');
        }
      }
    });

    // The camera starts at Hero (0, 1, 8) looking at (0, 0, 0)
    camera.position.set(0, 1, 8);
    camera.lookAt(0, 0, 0);

    // Initial robot position
    const robot = scene.getObjectByName('RobotGroup') || new THREE.Group();

    // Fly to About
    tl.to(camera.position, {
      x: SECTION_COORDINATES.about.x,
      y: SECTION_COORDINATES.about.y + 1,
      z: SECTION_COORDINATES.about.z + 8,
      ease: 'power1.inOut',
    }, 0);
    
    // Fly to Skills
    tl.to(camera.position, {
      x: SECTION_COORDINATES.skills.x,
      y: SECTION_COORDINATES.skills.y + 1,
      z: SECTION_COORDINATES.skills.z + 8,
      ease: 'power1.inOut',
    }, 1);

    // Fly to Projects
    tl.to(camera.position, {
      x: SECTION_COORDINATES.projects.x,
      y: SECTION_COORDINATES.projects.y + 1,
      z: SECTION_COORDINATES.projects.z + 8,
      ease: 'power1.inOut',
    }, 2);

    // Fly to Experience
    tl.to(camera.position, {
      x: SECTION_COORDINATES.experience.x,
      y: SECTION_COORDINATES.experience.y + 1,
      z: SECTION_COORDINATES.experience.z + 8,
      ease: 'power1.inOut',
    }, 3);

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [camera, containerRef, setActiveSection, scene]);

  // Subtle mouse movement parallax on top of GSAP animation
  useFrame((state) => {
    // We add slight offset based on mouse pointer, relative to base position
    // To do this properly without breaking GSAP, we'd need a rig group. 
    // Since camera is animated directly, let's keep it simple or use camera rotation
    camera.rotation.y = -(state.pointer.x * 0.05);
    camera.rotation.x = (state.pointer.y * 0.05);
  });

  return null;
}

// Robot container to teleport it to the active platform
function RobotContainer({ activeSection, mousePos }) {
  const groupRef = useRef();

  // Smoothly move robot to current section coordinates
  useFrame(() => {
    if (!groupRef.current) return;
    const target = SECTION_COORDINATES[activeSection] || SECTION_COORDINATES.hero;
    
    groupRef.current.position.lerp(
      new THREE.Vector3(target.x, target.y, target.z),
      0.05
    );
  });

  return (
    <group ref={groupRef} name="RobotGroup">
      <RobotAvatar activeSection={activeSection} mousePos={mousePos} />
    </group>
  );
}

export default function SceneManager({ containerRef }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
      
      <Environment />
      <FloatingPlatforms />
      
      <RobotContainer activeSection={activeSection} mousePos={mousePos} />
      
      <CameraController containerRef={containerRef} setActiveSection={setActiveSection} />
    </Canvas>
  );
}
