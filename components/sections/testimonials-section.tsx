"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "Harsh is an exceptionally talented developer who consistently delivers high-quality code. His ability to quickly grasp complex AI concepts and implement them in full-stack applications is truly impressive.",
    author: "Dr. Alok Kumar",
    role: "Professor of Computer Science, IILM University",
    cardClass: "border-cyan-500/20 hover:border-cyan-500/50",
    quoteClass: "text-cyan-500/30 group-hover:text-cyan-400",
    roleClass: "text-cyan-400",
    glowClass: "from-cyan-500/0 via-cyan-500/10 to-cyan-500/0",
  },
  {
    id: 2,
    quote: "Working with Harsh on VIBEON was a great experience. He architected a scalable real-time backend that handles thousands of concurrent connections flawlessly. A true full-stack engineer.",
    author: "Rohan Sharma",
    role: "Senior Developer & Mentor",
    cardClass: "border-pink-500/20 hover:border-pink-500/50",
    quoteClass: "text-pink-500/30 group-hover:text-pink-400",
    roleClass: "text-pink-400",
    glowClass: "from-pink-500/0 via-pink-500/10 to-pink-500/0",
  },
  {
    id: 3,
    quote: "The BeThere platform Harsh developed exceeded our expectations. His attention to detail in UI/UX combined with robust Convex database integration resulted in a seamless SaaS product.",
    author: "Priya Patel",
    role: "Event Tech Consultant",
    cardClass: "border-purple-500/20 hover:border-purple-500/50",
    quoteClass: "text-purple-500/30 group-hover:text-purple-400",
    roleClass: "text-purple-400",
    glowClass: "from-purple-500/0 via-purple-500/10 to-purple-500/0",
  }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold font-sora tracking-tight">Peer<span className="text-lime-400">.Reviews</span></h2>
          </div>
          <p className="text-white/60 font-mono text-sm max-w-xl mx-auto">
            Testimonials from mentors and collaborators
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`glass-panel p-8 relative group ${item.cardClass} transition-all duration-300`}
            >
              <Quote className={`w-10 h-10 ${item.quoteClass} mb-6 transition-colors`} />
              
              <p className="text-white/80 leading-relaxed font-light mb-8 relative z-10">
                &ldquo;{item.quote}&rdquo;
              </p>
              
              <div className="mt-auto relative z-10 border-t border-white/10 pt-4">
                <h4 className="font-bold font-sora text-white">{item.author}</h4>
                <p className={`text-sm ${item.roleClass}`}>{item.role}</p>
              </div>

              {/* Hover Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${item.glowClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl pointer-events-none`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
