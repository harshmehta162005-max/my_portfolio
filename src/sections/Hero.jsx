import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

import NeuralCore from '../components/NeuralCore';
import ParticleNebula from '../components/ParticleNebula';
import NeonGrid from '../components/NeonGrid';
import CanvasLoader from '../components/CanvasLoader';
import CanvasErrorBoundary from '../components/CanvasErrorBoundary';
import { heroData } from '../constants/index';

gsap.registerPlugin(TextPlugin);

// ============================================
// HERO SECTION — Dramatic 3D power-up reveal
// Central Neural Core + glitch text + particles
// Full-screen immersive canvas experience
// ============================================

// Camera rig that follows mouse
const CameraRig = ({ children }) => {
  const { camera } = useThree();

  useFrame((state) => {
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.5 + 1;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return <group>{children}</group>;
};

// Post-processing wrapper — loaded dynamically to avoid SSR issues
const PostEffects = () => {
  const [PostModule, setPostModule] = useState(null);

  useEffect(() => {
    import('@react-three/postprocessing').then((mod) => {
      setPostModule(mod);
    }).catch(() => {
      console.warn('Post-processing not available');
    });
  }, []);

  if (!PostModule) return null;

  const { EffectComposer, Bloom, Vignette } = PostModule;

  return (
    <EffectComposer>
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.65} />
    </EffectComposer>
  );
};

// The 3D Scene component
const HeroScene = ({ mousePos }) => {
  return (
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1, 8], fov: 50 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} color="#00F5FF" intensity={3} distance={20} />
        <pointLight position={[-5, 3, -5]} color="#FF007A" intensity={2} distance={15} />
        <pointLight position={[0, -3, 3]} color="#B026FF" intensity={1.5} distance={12} />

        <CameraRig>
          <NeuralCore mouseX={mousePos.x} mouseY={mousePos.y} scale={1.3} />
          <ParticleNebula />
          <NeonGrid />
        </CameraRig>

        <PostEffects />
      </Suspense>
    </Canvas>
  );
};

const Hero = () => {
  const taglineRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showContent, setShowContent] = useState(false);

  // Track mouse for the NeuralCore
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

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // GSAP tagline typewriter
  useEffect(() => {
    if (!taglineRef.current || !showContent) return;
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      taglineRef.current,
      { text: '', opacity: 1 },
      { text: heroData.tagline, duration: 2, ease: 'none' }
    );

    return () => tl.kill();
  }, [showContent]);

  // GSAP entry for hero text
  useEffect(() => {
    if (!showContent) return;
    gsap.fromTo(
      '.hero-animate',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, [showContent]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Full-screen 3D Canvas with error boundary */}
      <div className="absolute inset-0 z-0">
        <CanvasErrorBoundary>
          <HeroScene mousePos={mousePos} />
        </CanvasErrorBoundary>
      </div>

      {/* 2D HTML overlay — always renders regardless of Canvas state */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pointer-events-none">
        <div className={`text-center transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {/* Greeting */}
          <p className="hero-animate font-grotesk text-sm sm:text-base tracking-[0.4em] uppercase text-neon-cyan/70 mb-4">
            {heroData.greeting} — {heroData.location}
          </p>

          {/* Name — Glitch effect */}
          <h1
            className="hero-animate glitch-text font-outfit font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none mb-6 select-none"
            data-text={heroData.name}
          >
            {heroData.name}
          </h1>

          {/* Tagline — Typewriter */}
          <p
            ref={taglineRef}
            className="hero-animate font-grotesk text-lg sm:text-xl md:text-2xl text-white-700 mb-10 font-light tracking-wide min-h-[2em]"
          />

          {/* CTA Buttons */}
          <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <a href="#about" className="neon-btn magnetic-hover">
              {heroData.cta1}
            </a>
            <a
              href="#projects"
              className="px-8 py-3 font-grotesk font-semibold text-sm tracking-wider uppercase text-white-600 hover:text-neon-magenta border border-white/10 hover:border-neon-magenta/30 rounded-xl transition-all duration-300"
            >
              {heroData.cta2}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto">
          <span className="font-mono text-[10px] text-white-500 tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-neon-cyan/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
