"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Reviews", href: "#testimonials", id: "testimonials" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100 // Offset for fixed nav

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-panel shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-cyan-500/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.a href="#home" whileHover={{ scale: 1.05 }} className="text-2xl font-bold font-sora tracking-tighter">
              HARSH<span className="text-cyan-500">.</span>MEHTA
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.1 }}
                  className={`text-sm font-mono tracking-widest uppercase transition-colors relative px-2 py-1 ${
                    activeSection === item.id ? "text-cyan-400 font-bold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_#00F5FF]"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-white/10 hover:text-cyan-400">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              className="md:hidden mt-4 glass-panel rounded-lg p-4 border border-cyan-500/20 flex flex-col gap-2"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block py-3 px-4 rounded-md font-mono text-sm tracking-widest uppercase transition-colors ${
                    activeSection === item.id ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400" : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>
      
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left z-[60] shadow-[0_0_10px_rgba(0,245,255,0.5)]"
        style={{ scaleX }}
      />
    </>
  )
}
