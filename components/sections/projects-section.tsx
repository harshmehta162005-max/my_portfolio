"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Activity, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: "vibeon",
    title: "VIBEON",
    tagline: "Full-Stack Social Media Platform",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind", "Socket.IO", "JWT"],
    description: "Built a feature-rich social media platform with secure authentication. Implemented real-time notifications and interactions using Socket.IO. Designed a modern, responsive UI using Tailwind CSS.",
    color: "from-cyan-500 to-blue-600",
    shadow: "hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]",
    border: "border-cyan-500/30",
    metrics: [
      { label: "Latency", value: "<50ms" },
      { label: "Concurrent", value: "10k+" }
    ],
    aiNotes: "AI Content moderation system planned for v2."
  },
  {
    id: "creon",
    title: "CREON",
    tagline: "AI Creator Platform (CMS)",
    tech: ["Next.js 15", "React 19", "Convex", "Clerk", "Shadcn", "React Quill"],
    description: "Developed a full-stack AI-powered content management system for creators. Integrated rich text editing and AI-assisted workflows. Used Convex backend for real-time data synchronization.",
    color: "from-pink-500 to-purple-600",
    shadow: "hover:shadow-[0_0_30px_rgba(255,0,122,0.2)]",
    border: "border-pink-500/30",
    metrics: [
      { label: "Sync", value: "Real-time" },
      { label: "Auth", value: "Clerk JWT" }
    ],
    aiNotes: "Utilizes LLMs for intelligent text generation and semantic content suggestions."
  },
  {
    id: "bethere",
    title: "BeThere",
    tagline: "AI Event Management SaaS",
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "Convex", "Clerk Auth", "Shadcn"],
    description: "Built an AI-driven SaaS platform for event creation and engagement. Implemented secure authentication and real-time backend features. Focused on scalability and clean component architecture.",
    color: "from-lime-400 to-green-600",
    shadow: "hover:shadow-[0_0_30px_rgba(163,255,0,0.2)]",
    border: "border-lime-400/30",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "DB", value: "Convex" }
    ],
    aiNotes: "AI-driven event recommendation engine based on user activity."
  }
]

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="projects" className="py-24 relative min-h-screen overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold font-sora tracking-tight">Active<span className="text-purple-500">.Deployments</span></h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setExpandedId(project.id)}
              className={`glass-panel p-6 cursor-pointer border ${project.border} ${project.shadow} transition-all duration-300 group flex flex-col h-full relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold font-sora">{project.title}</motion.h3>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
              
              <motion.p layoutId={`tagline-${project.id}`} className="text-sm font-mono text-white/50 mb-4 h-10">{project.tagline}</motion.p>
              
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span key={i} className="px-2 py-1 text-xs font-mono bg-white/5 rounded border border-white/10">{t}</span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 text-xs font-mono bg-white/5 rounded border border-white/10">+{project.tech.length - 3}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Case Study Modal */}
        <AnimatePresence>
          {expandedId && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedId(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                <motion.div
                  layoutId={`card-${expandedId}`}
                  className="bg-[#0A0A0A] border border-white/10 w-full max-w-3xl rounded-2xl p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] pointer-events-auto relative"
                >
                  {(() => {
                    const project = projects.find(p => p.id === expandedId)!
                    return (
                      <>
                        <button 
                          onClick={() => setExpandedId(null)}
                          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        
                        <motion.h3 layoutId={`title-${project.id}`} className={`text-4xl font-bold font-sora mb-2 text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>
                          {project.title}
                        </motion.h3>
                        <motion.p layoutId={`tagline-${project.id}`} className="text-lg font-mono text-white/70 mb-8">{project.tagline}</motion.p>
                        
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                          <div className="md:col-span-2">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">About the Project</h4>
                            <p className="text-white/80 leading-relaxed font-light mb-6">{project.description}</p>
                            
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((t, i) => (
                                <span key={i} className={`px-3 py-1 text-sm font-mono bg-white/5 rounded-md border ${project.border}`}>{t}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">System Metrics</h4>
                              <div className="space-y-3">
                                {project.metrics.map((m, i) => (
                                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-sm text-white/60"><Activity className="w-4 h-4 inline mr-2" />{m.label}</span>
                                    <span className="font-mono font-bold">{m.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 border-l-4 border-l-blue-500">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">AI Transparency</h4>
                              <p className="text-xs text-white/70">{project.aiNotes}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-white/10">
                          <Button className="flex-1 bg-white text-black hover:bg-white/90">
                            <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                          </Button>
                          <Button variant="outline" className="flex-1 border-white/20 hover:bg-white/5">
                            <Github className="w-4 h-4 mr-2" /> Source Code
                          </Button>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
