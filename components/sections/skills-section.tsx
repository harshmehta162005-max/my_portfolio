"use client"

import { motion } from "framer-motion"
import { Database, Layout, Server, Cpu, Wrench, Shield, Languages } from "lucide-react"

const skillCategories = [
  {
    title: "Languages",
    icon: <Languages className="w-6 h-6 text-cyan-400" />,
    skills: [
      { name: "C / C++", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 80 }
    ],
    className: "md:col-span-1 border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]"
  },
  {
    title: "Frontend",
    icon: <Layout className="w-6 h-6 text-pink-500" />,
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Shadcn UI", level: 85 }
    ],
    className: "md:col-span-2 border-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(255,0,122,0.1)]"
  },
  {
    title: "Backend & DBs",
    icon: <Server className="w-6 h-6 text-purple-500" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Convex", level: 75 }
    ],
    className: "md:col-span-2 border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(176,38,255,0.1)]"
  },
  {
    title: "AI & Modern Tech",
    icon: <Cpu className="w-6 h-6 text-lime-400" />,
    skills: [
      { name: "Prompt Eng.", level: 90 },
      { name: "RAG", level: 80 },
      { name: "LangChain", level: 75 },
      { name: "NLP", level: 70 }
    ],
    className: "md:col-span-1 border-lime-400/20 hover:border-lime-400/50 hover:shadow-[0_0_30px_rgba(163,255,0,0.1)]"
  },
  {
    title: "Real-Time & Auth",
    icon: <Shield className="w-6 h-6 text-yellow-400" />,
    skills: [
      { name: "Socket.IO", level: 85 },
      { name: "JWT Auth", level: 90 },
      { name: "Clerk", level: 85 }
    ],
    className: "md:col-span-1 border-yellow-400/20 hover:border-yellow-400/50 hover:shadow-[0_0_30px_rgba(255,234,0,0.1)]"
  },
  {
    title: "Tools & DevOps",
    icon: <Wrench className="w-6 h-6 text-blue-400" />,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Cloudinary", level: 85 },
      { name: "ImageKit", level: 80 }
    ],
    className: "md:col-span-2 border-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(0,191,255,0.1)]"
  }
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center justify-end gap-4 mb-4 text-right">
            <div className="h-px flex-1 bg-gradient-to-l from-cyan-500/50 to-transparent"></div>
            <h2 className="text-4xl md:text-5xl font-bold font-sora tracking-tight">Tech<span className="text-cyan-500">.Arsenal</span></h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`glass-panel p-6 relative group transition-all duration-300 ${category.className}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold font-sora">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-white/90">{skill.name}</span>
                      <span className="font-mono text-white/50">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-white/20 to-current rounded-full"
                        style={{ color: category.icon.props.className.match(/text-(\w+)-400|500/)?.[0].replace('text-', 'bg-') || 'bg-cyan-500' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
