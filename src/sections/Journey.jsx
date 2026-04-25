import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeyData } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// JOURNEY SECTION — Energy beam timeline
// Vertical timeline with glowing nodes,
// connecting beam, and staggered reveals
// ============================================

const TimelineNode = ({ item, index, isLast }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodeRef.current,
        { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: nodeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, nodeRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={nodeRef} className="relative flex items-start gap-6 sm:gap-8">
      {/* Timeline line + node */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Glowing node */}
        <div className="relative">
          <div
            className="w-4 h-4 rounded-full border-2 z-10 relative"
            style={{
              borderColor: item.color,
              boxShadow: `0 0 15px ${item.color}60, 0 0 30px ${item.color}20`,
            }}
          >
            <div
              className="absolute inset-1 rounded-full animate-glow-pulse"
              style={{ backgroundColor: item.color }}
            />
          </div>
          {/* Pulse ring */}
          <div
            className="absolute -inset-2 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: item.color }}
          />
        </div>

        {/* Connecting beam */}
        {!isLast && (
          <div
            className="w-[2px] h-24 sm:h-32 mt-2"
            style={{
              background: `linear-gradient(180deg, ${item.color}60 0%, ${item.color}10 100%)`,
              boxShadow: `0 0 8px ${item.color}30`,
            }}
          />
        )}
      </div>

      {/* Content card */}
      <div className="glass-panel p-6 sm:p-8 flex-1 group hover:border-white/10 transition-all duration-500 -mt-1 mb-4">
        {/* Year badge */}
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider mb-4"
          style={{
            color: item.color,
            backgroundColor: `${item.color}15`,
            border: `1px solid ${item.color}25`,
          }}
        >
          {item.year}
        </div>

        <h3 className="font-outfit font-bold text-lg sm:text-xl text-white mb-3">
          {item.title}
        </h3>

        <p className="font-grotesk text-sm sm:text-base text-white-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const Journey = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 sm:px-10"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-neon-glow opacity-10 pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto">
        {/* Title */}
        <div className="journey-title mb-16 text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-neon-lime/60 mb-3">
            // EVOLUTION
          </p>
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle mt-4 max-w-xl mx-auto">
            From the first line of code to building immersive digital experiences — every step shapes the developer I am today.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-2">
          {journeyData.map((item, index) => (
            <TimelineNode
              key={item.id}
              item={item}
              index={index}
              isLast={index === journeyData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
