import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

// ============================================
// LOADING SCREEN — Robot boot-up sequence
// Cinematic loading with guaranteed completion
// ============================================

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const hasCompleted = useRef(false);

  const triggerComplete = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setIsDone(true);

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    });

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = 'none';
          containerRef.current.style.display = 'none';
        }
      },
    });
  }, [onComplete]);

  // Progress simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(triggerComplete, 400);
      }
      setProgress(current);
    }, 120);

    // Safety timeout — always complete after 3 seconds
    const safety = setTimeout(triggerComplete, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, [triggerComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
    >
      <div ref={textRef} className="flex flex-col items-center gap-6">
        {/* Spinning neural rings */}
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 rounded-full border border-neon-cyan/30"
            style={{ animation: 'spin 3s linear infinite' }}
          />
          <div
            className="absolute inset-2 rounded-full border border-neon-violet/40"
            style={{ animation: 'spin 2s linear infinite reverse' }}
          />
          <div
            className="absolute inset-4 rounded-full border border-neon-magenta/50"
            style={{ animation: 'spin 1.5s linear infinite' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-neon-cyan animate-glow-pulse shadow-neon" />
          </div>
        </div>

        {/* Boot text */}
        <div className="text-center">
          <p className="font-mono text-xs text-neon-cyan/70 tracking-[0.3em] uppercase mb-2">
            Initializing Neural Nexus
          </p>
          <p className="font-mono text-[10px] text-white-500 tracking-wider">
            {progress < 30
              ? '> Loading core systems...'
              : progress < 60
              ? '> Connecting neural pathways...'
              : progress < 90
              ? '> Calibrating visual cortex...'
              : '> System ready.'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/5 rounded overflow-hidden">
          <div
            className="h-full rounded transition-all duration-200"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #00F5FF, #B026FF, #FF007A)',
            }}
          />
        </div>

        <p className="font-mono text-[10px] text-white-500">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
