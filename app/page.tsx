import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import ExperienceSection from "@/components/sections/experience-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"
import GlobalBackground from "@/components/3d/global-background"
import { ButterflyCursor } from "@/components/ui/butterfly-cursor"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      <GlobalBackground />
      <ButterflyCursor />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}
