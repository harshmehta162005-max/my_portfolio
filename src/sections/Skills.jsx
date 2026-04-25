import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// SKILLS SECTION — Orbiting skill icons with
// animated progress rings and neon glows
// ============================================

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress ring fill
      gsap.fromTo(
        progressRef.current,
        { strokeDashoffset: 251 },
        {
          strokeDashoffset: 251 - (251 * skill.level) / 100,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger entry
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [skill.level, index]);

  return (
    <div
      ref={cardRef}
      className="glass-panel p-6 flex flex-col items-center gap-4 group hover:border-white/10 transition-all duration-500 hover:shadow-neon/20"
    >
      {/* Circular progress ring */}
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 86 86">
          {/* Background ring */}
          <circle
            cx="43"
            cy="43"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="3"
          />
          {/* Progress ring */}
          <circle
            ref={progressRef}
            cx="43"
            cy="43"
            r="40"
            fill="none"
            stroke={skill.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="251"
            strokeDashoffset="251"
            style={{
              filter: `drop-shadow(0 0 6px ${skill.color}80)`,
            }}
          />
        </svg>
        {/* Icon center */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          {skill.icon}
        </div>
      </div>

      {/* Skill info */}
      <div className="text-center">
        <p className="font-grotesk font-semibold text-white-800 text-sm tracking-wide">
          {skill.name}
        </p>
        <p
          className="font-mono text-xs mt-1"
          style={{ color: skill.color }}
        >
          {skill.level}%
        </p>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-title',
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
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 px-6 sm:px-10"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-magenta-glow opacity-20 pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto">
        {/* Title */}
        <div className="skills-title mb-16 text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-neon-violet/60 mb-3">
            // TECH ARSENAL
          </p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle mt-4 max-w-xl mx-auto">
            A curated set of tools and technologies I use to craft exceptional digital experiences.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
