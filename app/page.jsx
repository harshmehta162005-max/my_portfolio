'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import OverlayUI from '../components/OverlayUI';

const SceneManager = dynamic(() => import('../components/SceneManager'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Smooth scroll config for body
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-void text-neon-cyan font-mono text-sm tracking-widest">
        INITIALIZING NEURAL NEXUS...
      </div>
    );
  }

  return (
    <main className="relative w-full bg-void selection:bg-neon-cyan/30 selection:text-neon-cyan">
      {/* 3D Canvas Layer (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneManager containerRef={containerRef} />
      </div>

      {/* 2D HTML Scrollable Overlay Layer */}
      <div
        ref={containerRef}
        className="relative z-10 w-full"
      >
        <OverlayUI />
      </div>
    </main>
  );
}
