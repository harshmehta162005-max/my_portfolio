'use client';

import React from 'react';

// ============================================
// OVERLAY UI — The 2D Glassmorphic Interface
// This acts as the scroll container driving the 3D scene
// ============================================

export default function OverlayUI() {
  return (
    <div className="w-full text-white">
      {/* 
        We use height: 500vh to create scroll space.
        Each section roughly corresponds to 100vh of scroll progress.
      */}
      <div style={{ height: '500vh' }}>
        
        {/* HERO SECTION */}
        <section className="h-screen w-full flex items-center justify-start px-10 md:px-24 pointer-events-none sticky top-0">
          <div className="max-w-3xl pointer-events-auto glass-panel-strong p-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h1 className="font-outfit font-black text-6xl sm:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta mb-4">
              HARSH MEHTA
            </h1>
            <h2 className="font-grotesk text-xl sm:text-2xl text-white-700 mb-6 font-semibold">
              Software Engineering Student | Full-Stack & AI Engineer | Building Real-Time & Intelligent Web Experiences
            </h2>
            <p className="font-mono text-sm text-white-500 mb-8 leading-relaxed">
              Turning ideas into scalable, real-time, and AI-powered applications with React, Next.js, and modern tech.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="neon-btn">Enter the Core</button>
              <button className="px-6 py-2 rounded-xl border border-white/20 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all text-sm font-semibold tracking-wide">
                View Projects
              </button>
              <button className="px-6 py-2 rounded-xl border border-white/20 hover:border-neon-magenta hover:bg-neon-magenta/10 transition-all text-sm font-semibold tracking-wide">
                Download Resume
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex gap-6 text-sm font-mono text-white-600">
              <a href="mailto:harshmehta162005@gmail.com" className="hover:text-neon-cyan transition-colors">harshmehta162005@gmail.com</a>
              <span>|</span>
              <span>+91 8810592825</span>
              <span>|</span>
              <a href="#" className="hover:text-neon-cyan transition-colors">LinkedIn</a>
              <span>|</span>
              <a href="#" className="hover:text-neon-cyan transition-colors">GitHub</a>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION (Spaced out using margin top to let user scroll before it appears) */}
        <section className="h-screen w-full flex items-center justify-end px-10 md:px-24 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto glass-panel p-8">
            <h3 className="font-mono text-xs tracking-[0.4em] text-neon-magenta mb-2">ABOUT ME</h3>
            <p className="font-grotesk text-lg text-white-700 leading-relaxed">
              I’m a passionate Software Engineering student at IILM University (B.Tech CSE, 2023 – Present) with hands-on experience building full-stack, real-time, and AI-powered web applications. 
              <br/><br/>
              Proficient in React, Next.js, Node.js, and MongoDB, I love creating smooth user experiences with modern UI frameworks, secure authentication, cloud integrations, and real-time systems. 
              <br/><br/>
              Currently diving deep into emerging AI technologies like RAG pipelines, LangChain, and NLP to build intelligent, scalable solutions that actually solve real problems.
            </p>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="h-screen w-full flex items-center justify-start px-10 md:px-24 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto glass-panel-strong p-8">
            <h3 className="font-mono text-xs tracking-[0.4em] text-neon-cyan mb-6">TECH ARSENAL</h3>
            <div className="space-y-4 font-grotesk">
              <div className="flex gap-4"><span className="text-neon-cyan w-32 font-semibold">Languages:</span> <span className="text-white-600">C, C++, JavaScript, TypeScript, Python</span></div>
              <div className="flex gap-4"><span className="text-neon-cyan w-32 font-semibold">Frontend:</span> <span className="text-white-600">React.js, Next.js, HTML5, Tailwind CSS, Shadcn UI</span></div>
              <div className="flex gap-4"><span className="text-neon-cyan w-32 font-semibold">Backend:</span> <span className="text-white-600">Node.js, Express.js</span></div>
              <div className="flex gap-4"><span className="text-neon-cyan w-32 font-semibold">Databases:</span> <span className="text-white-600">MongoDB, Convex</span></div>
              <div className="flex gap-4"><span className="text-neon-cyan w-32 font-semibold">AI & Tech:</span> <span className="text-white-600">Prompt Engineering, RAG, LangChain, NLP</span></div>
              <div className="flex gap-4"><span className="text-neon-cyan w-32 font-semibold">Real-Time & Auth:</span> <span className="text-white-600">Socket.IO, JWT Authentication</span></div>
              <div className="flex gap-4"><span className="text-neon-cyan w-32 font-semibold">Tools:</span> <span className="text-white-600">Git, GitHub, VS Code, Cloudinary, ImageKit</span></div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="min-h-screen w-full flex items-center justify-end px-10 md:px-24 pointer-events-none">
          <div className="max-w-3xl pointer-events-auto flex flex-col gap-6">
            <h3 className="font-mono text-xs tracking-[0.4em] text-neon-violet mb-2">FEATURED PROJECTS</h3>
            
            {/* Project 1 */}
            <div className="glass-panel p-6 hover:border-neon-violet/50 transition-all">
              <h4 className="font-outfit text-xl font-bold text-white mb-1">VIBEON – Full-Stack Social Media Platform</h4>
              <p className="font-mono text-xs text-neon-cyan mb-4">React.js, Node.js, Express.js, MongoDB, Tailwind, Socket.IO, JWT</p>
              <ul className="list-disc list-inside font-grotesk text-sm text-white-700 space-y-1">
                <li>Built a feature-rich social media platform with secure authentication.</li>
                <li>Implemented real-time notifications and interactions using Socket.IO.</li>
                <li>Designed a modern, responsive UI using Tailwind CSS.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="glass-panel p-6 hover:border-neon-magenta/50 transition-all">
              <h4 className="font-outfit text-xl font-bold text-white mb-1">CREON – AI Creator Platform (CMS)</h4>
              <p className="font-mono text-xs text-neon-cyan mb-4">Next.js 15, Tailwind, Convex, Clerk Auth, React Quill, Shadcn</p>
              <ul className="list-disc list-inside font-grotesk text-sm text-white-700 space-y-1">
                <li>Developed a full-stack AI-powered content management system for creators.</li>
                <li>Integrated rich text editing and AI-assisted workflows.</li>
                <li>Used Convex backend for real-time data synchronization.</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="glass-panel p-6 hover:border-neon-lime/50 transition-all">
              <h4 className="font-outfit text-xl font-bold text-white mb-1">BeThere – AI Event Management SaaS</h4>
              <p className="font-mono text-xs text-neon-cyan mb-4">React 19, Next.js 16, Tailwind CSS, Convex, Clerk Auth, Shadcn</p>
              <ul className="list-disc list-inside font-grotesk text-sm text-white-700 space-y-1">
                <li>Built an AI-driven SaaS platform for event creation and engagement.</li>
                <li>Implemented secure authentication and real-time backend features.</li>
                <li>Focused on scalability and clean component architecture.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EXPERIENCE / EDUCATION SECTION */}
        <section className="h-screen w-full flex items-center justify-start px-10 md:px-24 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto glass-panel p-8">
            <h3 className="font-mono text-xs tracking-[0.4em] text-neon-lime mb-6">TIMELINE</h3>
            
            <div className="mb-8">
              <h4 className="font-outfit text-xl font-bold text-white mb-1">YBI Foundation – Intern</h4>
              <p className="font-grotesk text-sm text-white-700">
                • Developed a Twitter Sentiment Analysis project using NLP.<br/>
                • Gained hands-on experience in Generative AI.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="font-outfit text-xl font-bold text-white mb-1">IILM University</h4>
              <p className="font-grotesk text-sm text-white-700">
                Bachelor of Technology (B.Tech) – Computer Science & Engineering<br/>
                2023 – Present
              </p>
            </div>

            <div>
              <h4 className="font-outfit text-xl font-bold text-white mb-1">Certifications</h4>
              <p className="font-grotesk text-sm text-white-700">
                • Completed a 22-week DSA Challenge on GeeksforGeeks
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
