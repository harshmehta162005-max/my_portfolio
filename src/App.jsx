import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import NeonCursor from './components/NeonCursor';
import LoadingScreen from './components/LoadingScreen';

// ============================================
// NEON NEURAL NEXUS — Main Application Shell
// Single-page immersive 3D portfolio experience
// ============================================

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Track active section for nav highlighting
  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Small delay to let DOM mount
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timer);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isLoaded]);

  return (
    <>
      {/* Custom neon cursor - desktop only */}
      <NeonCursor />

      {/* Loading screen with boot-up animation */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* Main content */}
      <main className="relative bg-void min-h-screen">
        <Navbar activeSection={activeSection} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default App;