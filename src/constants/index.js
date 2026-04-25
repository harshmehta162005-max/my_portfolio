// ============================================
// NEON NEURAL NEXUS — Constants & Content Data
// All personal content for Harsh's portfolio
// ============================================

export const navLinks = [
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'About', href: '#about' },
  { id: 3, name: 'Skills', href: '#skills' },
  { id: 4, name: 'Projects', href: '#projects' },
  { id: 5, name: 'Journey', href: '#journey' },
  { id: 6, name: 'Contact', href: '#contact' },
];

export const heroData = {
  greeting: 'नमस्ते',
  name: 'HARSH',
  tagline: 'Full-Stack Developer & Creative Technologist',
  location: 'Delhi, India',
  cta1: 'Enter the Core',
  cta2: 'View Projects',
};

export const aboutData = {
  title: 'About Me',
  bio: `I'm a passionate full-stack developer based in Delhi, India — building digital experiences that merge cutting-edge technology with thoughtful design. I thrive at the intersection of creativity and engineering, turning complex problems into elegant solutions.`,
  bio2: `When I'm not coding, you'll find me exploring new frameworks, contributing to open-source, or sketching out ideas for my next project. I believe great software should feel alive.`,
  stats: [
    { label: 'Projects Built', value: '20+' },
    { label: 'Technologies', value: '15+' },
    { label: 'Cups of Coffee', value: '∞' },
  ],
};

export const skillsData = [
  { name: 'React', level: 90, color: '#00F5FF', icon: '⚛️' },
  { name: 'Node.js', level: 85, color: '#A3FF00', icon: '🟢' },
  { name: 'TypeScript', level: 80, color: '#B026FF', icon: '📘' },
  { name: 'Three.js', level: 75, color: '#FF007A', icon: '🎨' },
  { name: 'MongoDB', level: 82, color: '#00F5FF', icon: '🍃' },
  { name: 'Next.js', level: 85, color: '#B026FF', icon: '▲' },
  { name: 'TailwindCSS', level: 90, color: '#00F5FF', icon: '🎐' },
  { name: 'GSAP', level: 78, color: '#A3FF00', icon: '✨' },
];

export const projectsData = [
  {
    id: 1,
    title: 'Snapgram',
    subtitle: 'Social Media Platform',
    description: 'A powerful social media app built with React, TypeScript, and Appwrite. Features infinite scrolling, role-based access, and responsive design.',
    tech: ['React', 'TypeScript', 'Appwrite', 'TailwindCSS'],
    href: 'https://snapgram-beryl-nine.vercel.app/',
    image: '/assets/spotlight1.png',
    color: '#FF007A',
  },
  {
    id: 2,
    title: 'PingMe',
    subtitle: 'Real-time Chat App',
    description: 'Modern real-time chat application built with the MERN stack and Socket.IO, featuring instant messaging and a sleek responsive interface.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    href: 'https://fullstack-chat-app-xoai.onrender.com/',
    image: '/assets/spotlight3.png',
    color: '#00F5FF',
  },
  {
    id: 3,
    title: 'Craftr',
    subtitle: 'Blogging Platform',
    description: 'A React-based blogging platform using Redux and Appwrite, with a Twitter-like feel designed for seamless user interactions.',
    tech: ['React', 'Redux', 'Appwrite', 'JavaScript'],
    href: 'https://craftr-zeta.vercel.app/',
    image: '/assets/spotlight2.png',
    color: '#B026FF',
  },
  {
    id: 4,
    title: 'LocoJS',
    subtitle: 'Award-Winning UI Clone',
    description: 'A frontend UI clone featuring smooth animations powered by GSAP and Locomotive Scroll, with custom CSS styling.',
    tech: ['JavaScript', 'GSAP', 'CSS', 'Locomotive'],
    href: 'https://samverse.github.io/LocoJS-SITE/',
    image: '/assets/spotlight4.png',
    color: '#A3FF00',
  },
];

export const journeyData = [
  {
    id: 1,
    year: '2023',
    title: 'The Beginning',
    description: 'Started my coding journey — dove deep into HTML, CSS, JavaScript, and fell in love with web development.',
    color: '#00F5FF',
  },
  {
    id: 2,
    year: '2024',
    title: 'Full-Stack Mastery',
    description: 'Mastered the MERN stack. Built real-time apps, social platforms, and discovered the power of modern frameworks.',
    color: '#B026FF',
  },
  {
    id: 3,
    year: '2025',
    title: 'Creative Engineering',
    description: 'Explored Three.js, GSAP, and immersive web experiences. Started blending art with engineering.',
    color: '#FF007A',
  },
  {
    id: 4,
    year: '2026',
    title: 'The Neural Nexus',
    description: 'Building the future — AI-powered applications, 3D web, and pushing the boundaries of what\'s possible on the browser.',
    color: '#A3FF00',
  },
];

export const contactData = {
  email: 'harsh@example.com',
  github: 'https://github.com/harsh',
  linkedin: 'https://linkedin.com/in/harsh',
  twitter: 'https://x.com/harsh',
};

// Helper to calculate responsive sizes for 3D elements
export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -6.2, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 7, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -11, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-16, -13, -10],
  };
};