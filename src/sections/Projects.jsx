import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// PROJECTS SECTION — Floating holographic cards
// Glassmorphic project cards with neon frames,
// hover effects, and staggered GSAP reveal
// ============================================

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, rotateY: -5 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Neon border glow on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${project.color}40, transparent, ${project.color}20)`,
        }}
      />

      <div className="relative glass-panel-strong p-6 sm:p-8 h-full flex flex-col overflow-hidden">
        {/* Project image / spotlight */}
        <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden mb-6">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-surface-100/50 to-transparent" />

          {/* Project number badge */}
          <div
            className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
            style={{
              background: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {String(project.id).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <p
            className="font-mono text-xs tracking-wider uppercase mb-2"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </p>
          <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white mb-3">
            {project.title}
          </h3>
          <p className="font-grotesk text-sm text-white-600 leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono tracking-wide bg-white/5 text-white-600 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Live link */}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-grotesk text-sm font-semibold tracking-wide group/link"
            style={{ color: project.color }}
          >
            <span className="group-hover/link:tracking-wider transition-all duration-300">
              View Live
            </span>
            <svg
              className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </a>
        </div>

        {/* Floating particle on hover */}
        {isHovered && (
          <div
            className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: project.color }}
          />
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title',
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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 sm:px-10"
    >
      {/* Background glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neon-glow opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-magenta-glow opacity-15 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto">
        {/* Title */}
        <div className="projects-title mb-16 text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-neon-magenta/60 mb-3">
            // SELECTED WORK
          </p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mt-4 max-w-xl mx-auto">
            A collection of projects that showcase my passion for building beautiful, functional digital experiences.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;