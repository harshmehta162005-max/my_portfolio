"use client"
import { motion } from "framer-motion"
import { Code2, BrainCircuit, GraduationCap, Laptop } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative circuits */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 245, 255, 0.4) 0%, transparent 50%)' }}></div>
           
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold font-sora tracking-tight">System<span className="text-pink-500">.Info</span></h2>
            <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent"></div>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Main About Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-span-2 md:row-span-2 glass-panel p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#00F5FF]"></div>
            <BrainCircuit className="w-10 h-10 text-cyan-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4 font-sora">Value Proposition</h3>
            <p className="text-lg text-white/80 leading-relaxed font-light">
              Software Engineering student at IILM University (B.Tech CSE 2023–Present) with hands-on experience building full-stack, real-time, and AI-powered web applications. Proficient in React, Next.js, Node.js, MongoDB, and emerging AI tech like RAG, LangChain, and NLP.
            </p>
            {/* Cyber hover effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
          </motion.div>

          {/* Education Mini Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-panel p-6 relative group flex flex-col justify-between"
          >
            <GraduationCap className="w-8 h-8 text-pink-500 mb-4" />
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Education</p>
              <p className="font-bold font-sora text-lg text-white">B.Tech CSE</p>
              <p className="text-sm text-pink-400">IILM University</p>
            </div>
            <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </motion.div>

          {/* Hobbies Mini Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-panel p-6 relative group flex flex-col justify-between overflow-hidden"
          >
            <Laptop className="w-8 h-8 text-purple-500 mb-4" />
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Interests</p>
              <p className="font-bold font-sora text-sm text-white">E-Sports & Outdoor Sports</p>
              <p className="text-xs text-purple-400 mt-1">(Cricket, Kabaddi)</p>
            </div>
            {/* Animated circuit line */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-purple-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
