"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, GraduationCap, Code, Rocket } from "lucide-react"

const timelineData = [
  {
    id: 1,
    type: "experience",
    title: "Freelance Full Stack Web Developer",
    organization: "Self-Employed",
    date: "Aug 2023 – Present",
    description: "Developed and deployed multiple full-stack web applications for clients, focusing on scalable architecture and responsive design. Integrated real-time features and secure payment gateways.",
    icon: <Code className="w-5 h-5 text-cyan-400" />,
    color: "cyan"
  },
  {
    id: 2,
    type: "education",
    title: "B.Tech Computer Science Engineering",
    organization: "IILM University, Greater Noida",
    date: "2023 – Present",
    description: "Pursuing a comprehensive curriculum covering algorithms, data structures, full-stack development, and artificial intelligence. Active participant in coding hackathons.",
    icon: <GraduationCap className="w-5 h-5 text-pink-500" />,
    color: "pink"
  },
  {
    id: 3,
    type: "experience",
    title: "Project Lead: VIBEON & CREON",
    organization: "Independent Development",
    date: "2024",
    description: "Architected and built two major platforms from scratch: a real-time social media application and an AI-powered content management system for creators.",
    icon: <Rocket className="w-5 h-5 text-purple-500" />,
    color: "purple"
  },
  {
    id: 4,
    type: "education",
    title: "Senior Secondary Education (PCM)",
    organization: "Green Field School, Delhi",
    date: "2022",
    description: "Completed 12th grade with a strong foundation in Physics, Chemistry, and Mathematics. Scored 82%.",
    icon: <GraduationCap className="w-5 h-5 text-lime-400" />,
    color: "lime"
  }
]

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-sora tracking-tight mb-4">
            System<span className="text-cyan-500">.Log</span>
          </h2>
          <p className="text-white/60 font-mono text-sm max-w-xl mx-auto">
            Execution history and skill acquisition timeline
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Robotic vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#0A0A0A] border-2 border-white/20 z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className={`w-full h-full rounded-full flex items-center justify-center border border-${item.color}-500/50 shadow-[0_0_15px_rgba(var(--${item.color}-500),0.5)]`}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}
                >
                  <div className={`glass-panel p-6 relative group border-${item.color}-500/30 hover:border-${item.color}-500/60 transition-colors`}>
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-1 h-full bg-${item.color}-500`}></div>
                    
                    <span className={`inline-block px-3 py-1 mb-4 rounded-full bg-${item.color}-500/10 text-${item.color}-400 text-xs font-mono border border-${item.color}-500/20`}>
                      {item.date}
                    </span>
                    
                    <h3 className="text-xl font-bold font-sora text-white mb-1">{item.title}</h3>
                    <h4 className="text-sm font-medium text-white/70 mb-4 flex items-center">
                      {item.type === 'experience' ? <Briefcase className="w-4 h-4 mr-2" /> : null}
                      {item.organization}
                    </h4>
                    
                    <p className="text-white/60 font-light leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
