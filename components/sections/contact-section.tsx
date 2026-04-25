"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Send, MessageSquareCode, Github, Linkedin, Twitter } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAutoReply, setShowAutoReply] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setShowAutoReply(true)
    setFormData({ name: "", email: "", message: "" })
    
    // Auto-hide the reply simulation after 5 seconds
    setTimeout(() => {
      setShowAutoReply(false)
    }, 5000)
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
            <h2 className="text-4xl md:text-5xl font-bold font-sora tracking-tight">Open<span className="text-cyan-500">.Channel</span></h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </div>
          <p className="text-white/60 font-mono text-sm">Initiate communication protocol</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg"></div>
            <Card className="glass-panel relative h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-3 font-sora">
                  <MessageSquareCode className="w-6 h-6 text-cyan-400" />
                  Transmit Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/50 uppercase tracking-wider">Ident</label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-cyan-500/50 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/50 uppercase tracking-wider">Signal Address</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-cyan-500/50 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/50 uppercase tracking-wider">Data Payload</label>
                    <Textarea
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-cyan-500/50 min-h-[150px] resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden group bg-transparent border border-cyan-500 text-cyan-400 hover:text-black transition-all h-14 font-bold tracking-widest uppercase font-mono"
                  >
                    <span className="absolute inset-0 bg-cyan-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Initialize Transfer
                        </>
                      )}
                    </span>
                  </Button>
                </form>

                <AnimatePresence>
                  {showAutoReply && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-[#0A0A0A]/90 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/50">
                          <Send className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h4 className="text-xl font-bold font-sora text-white mb-2">Transmission Successful</h4>
                        <p className="text-white/70 text-sm mb-4">
                          [Auto-Reply] Data payload received. Analyzing request and formulating response. Expect a transmission back within 24 standard hours.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowAutoReply(false)}
                          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          Acknowledge
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links & Info Bento */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Main Info */}
            <div className="glass-panel p-8 relative overflow-hidden group border-purple-500/20 hover:border-purple-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-all"></div>
              
              <h3 className="text-2xl font-bold font-sora text-white mb-8">Node Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-1">Email Endpoint</p>
                    <a href="mailto:harshmehta.tech@gmail.com" className="text-white hover:text-cyan-400 transition-colors font-medium">harshmehta.tech@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-1">Physical Location</p>
                    <p className="text-white font-medium">New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com/harshm04" target="_blank" rel="noopener noreferrer" className="glass-panel p-6 flex flex-col items-center justify-center gap-3 border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group">
                <Github className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm text-white/70 group-hover:text-white">GitHub</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="glass-panel p-6 flex flex-col items-center justify-center gap-3 border-[#0077b5]/30 hover:border-[#0077b5]/60 hover:bg-[#0077b5]/10 transition-all group">
                <Linkedin className="w-8 h-8 text-[#0077b5] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm text-[#0077b5]">LinkedIn</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="glass-panel p-6 flex flex-col items-center justify-center gap-3 border-[#1DA1F2]/30 hover:border-[#1DA1F2]/60 hover:bg-[#1DA1F2]/10 transition-all group">
                <Twitter className="w-8 h-8 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm text-[#1DA1F2]">Twitter</span>
              </a>
              <div className="glass-panel p-6 flex flex-col items-center justify-center gap-3 border-green-500/20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                <span className="font-mono text-xs text-green-400 uppercase tracking-widest text-center">Status: Online<br/>Ready for Hire</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-white/40 text-sm font-mono">
            © {new Date().getFullYear()} Harsh Mehta.
          </div>

          <div className="flex items-center gap-3">
            <div className="h-1 w-1 rounded-full bg-cyan-500 animate-ping"></div>
            <span className="text-white/30 text-xs uppercase tracking-[0.2em]">Next.js 15 • Tailwind v4 • Framer</span>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
