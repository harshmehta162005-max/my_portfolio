import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// ABOUT SECTION — Glassmorphic bio panel
// Reveals on scroll with staggered animations
// ============================================

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 sm:px-10"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-glow opacity-30 pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto">
        {/* Section heading */}
        <div className="about-animate mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-neon-cyan/60 mb-3">
            // WHO AM I
          </p>
          <h2 className="section-title">{aboutData.title}</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main bio panel */}
          <div className="about-animate lg:col-span-3 glass-panel-strong p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-neon-cyan animate-glow-pulse" />
              <span className="font-mono text-xs text-neon-cyan/70 tracking-wider uppercase">
                System.identity
              </span>
            </div>

            <p className="font-outfit text-white-700 text-base sm:text-lg leading-relaxed mb-6">
              {aboutData.bio}
            </p>

            <p className="font-outfit text-white-600 text-sm sm:text-base leading-relaxed">
              {aboutData.bio2}
            </p>

            {/* Location badge */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-grotesk text-sm text-white-600">
                Based in Delhi, India — Available for remote work worldwide
              </span>
            </div>
          </div>

          {/* Stats cards */}
          <div className="about-animate lg:col-span-2 flex flex-col gap-4">
            {aboutData.stats.map((stat, index) => (
              <div
                key={index}
                className="glass-panel p-6 group hover:border-neon-cyan/20 transition-all duration-500"
              >
                <p className="font-outfit font-bold text-3xl sm:text-4xl neon-text-cyan mb-1">
                  {stat.value}
                </p>
                <p className="font-grotesk text-sm text-white-500 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}

            {/* Resume download */}
            <a
              href="/latestResume.pdf"
              download="Harsh_Resume.pdf"
              className="glass-panel p-6 flex items-center justify-between group hover:border-neon-violet/30 transition-all duration-500 cursor-pointer"
            >
              <div>
                <p className="font-grotesk font-semibold text-white-800 text-sm tracking-wide">
                  Download Resume
                </p>
                <p className="font-mono text-xs text-white-500 mt-1">
                  PDF • Updated 2026
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon-violet/50 group-hover:bg-neon-violet/10 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-white-600 group-hover:text-neon-violet transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
