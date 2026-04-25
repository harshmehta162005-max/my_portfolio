"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Rocket, AlertCircle, ChevronDown } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { CyberRobot } from "@/components/ui/cyber-robot"
import { isWebGLSupported } from "@/lib/webgl-utils"

export default function HeroSection() {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    setWebglSupported(isWebGLSupported())
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background is now global — see GlobalBackground component */}

      {/* WebGL Warning */}
      {!webglSupported && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 z-20"
        >
          <div className="glass-morphism border-yellow-400/50 rounded-lg p-3 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">3D features unavailable - displaying in 2D mode</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center lg:flex lg:items-center lg:justify-between lg:text-left mt-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl lg:w-1/2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-sm"
          >
            Software Engineering Student
          </motion.div>

          {/* Name with Liquid Gradient */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-4 font-sora tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          >
            HARSH MEHTA
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white mb-4 font-medium"
          >
            Full-Stack & AI Engineer
          </motion.h2>

          {/* Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-white/70 mb-10 font-light leading-relaxed max-w-xl"
          >
            Turning ideas into production-ready AI-powered applications with React, Next.js, real-time systems, and RAG pipelines.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-start items-center"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-transparent border-2 border-cyan-500 text-cyan-400 hover:text-black transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] px-8 py-6 text-lg font-bold w-full sm:w-auto rounded-xl"
              asChild
            >
              <a href="#about">
                <span className="absolute inset-0 bg-cyan-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                <span className="relative z-10 flex items-center">
                  <Rocket className="mr-2 h-5 w-5" /> Explore Nexus
                </span>
              </a>
            </Button>
            <Button
              size="lg"
              className="glass-panel hover:border-pink-500/50 text-white px-8 py-6 text-lg font-medium w-full sm:w-auto rounded-xl"
              variant="outline"
              asChild
            >
              <a href="/resume.pdf" download="Harsh_Mehta_Resume.pdf">
                <Download className="mr-2 h-5 w-5 text-pink-500" /> Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Robot Container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="hidden lg:block lg:w-1/2 h-[600px] relative pointer-events-auto"
        >
          {webglSupported && (
            <div className="absolute inset-0 z-20">
              <Canvas camera={{ position: [0, 0.5, 4.5], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} color="#00F5FF" />
                <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#FF007A" />
                <directionalLight position={[0, -3, 5]} intensity={0.4} color="#B026FF" />
                <fog attach="fog" args={["#0A0A0A", 6, 15]} />
                <CyberRobot />
              </Canvas>
            </div>
          )}
          {/* Decorative glowing rings around the robot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/20 opacity-50 shadow-[0_0_50px_rgba(0,245,255,0.1)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-pink-500/20 opacity-50 shadow-[0_0_50px_rgba(255,0,122,0.1)] animate-pulse"></div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-500 font-mono">System Online</span>
        <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center backdrop-blur-md">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1.5 h-3 bg-cyan-400 rounded-full mt-1.5 shadow-[0_0_10px_rgba(0,245,255,0.8)]"
          />
        </div>
      </motion.div>
    </section>
  )
}
