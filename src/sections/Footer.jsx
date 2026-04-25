import React from 'react';

// ============================================
// FOOTER — Minimal, neon-accented bottom bar
// ============================================

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-8 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-glow-pulse" />
          <span className="font-outfit font-semibold text-sm text-white-700 tracking-wide">
            HARSH
          </span>
          <span className="font-mono text-xs text-white-500">
            — Neon Neural Nexus
          </span>
        </div>

        {/* Copyright */}
        <p className="font-mono text-xs text-white-500 tracking-wide">
          © {new Date().getFullYear()} Harsh. Crafted with{' '}
          <span className="neon-text-cyan">♦</span> in Delhi.
        </p>

        {/* Back to top */}
        <a
          href="#home"
          className="group flex items-center gap-2 font-mono text-xs text-white-500 hover:text-neon-cyan transition-colors duration-300"
        >
          Back to top
          <svg
            className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;