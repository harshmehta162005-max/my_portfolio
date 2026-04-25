import React, { useEffect, useRef } from 'react';

// ============================================
// NEON CURSOR — Custom glowing cursor with trail
// Desktop-only, hidden on touch devices
// ============================================

const NeonCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursor.style.borderColor = 'rgba(255, 0, 122, 0.8)';
    };

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'rgba(0, 245, 255, 0.6)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth animation loop
    let animFrame;
    const animate = () => {
      // Cursor follows mouse with slight easing
      cursorPos.current.x += (mouse.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mouse.current.y - cursorPos.current.y) * 0.15;

      // Trail follows cursor with more easing (delayed)
      trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.08;

      cursor.style.left = `${cursorPos.current.x}px`;
      cursor.style.top = `${cursorPos.current.y}px`;

      trail.style.left = `${trailPos.current.x}px`;
      trail.style.top = `${trailPos.current.y}px`;

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '2px solid rgba(0, 245, 255, 0.6)',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease, border-color 0.2s ease',
          mixBlendMode: 'screen',
        }}
      />
      {/* Trailing glow orb */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] hidden md:block"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(4px)',
        }}
      />
    </>
  );
};

export default NeonCursor;
