import React, { useState, useRef, useEffect } from 'react';
import { navLinks } from '../constants/index.js';

// ============================================
// NAVBAR — Glassmorphic navigation overlay
// Minimal, neon-accented, with active section
// tracking and mobile hamburger menu
// ============================================

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-void/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="relative group"
          >
            <span className="font-outfit font-bold text-xl tracking-wider text-white group-hover:text-neon-cyan transition-colors duration-300">
              HARSH
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-4 py-2 font-grotesk text-sm tracking-wide transition-all duration-300 rounded-lg ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-neon-cyan'
                    : 'text-white-600 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-cyan shadow-neon" />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={toggleMenu}
            className="sm:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-[2.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-void/95 backdrop-blur-xl border-b border-white/5`}
      >
        <nav className="flex flex-col py-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              className={`py-3 font-grotesk text-base tracking-wide border-b border-white/5 last:border-0 transition-colors duration-300 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-neon-cyan'
                  : 'text-white-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;