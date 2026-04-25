import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { contactData } from '../constants/index';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONTACT SECTION — Clean neon-accented form
// with social links and glassmorphic styling
// ============================================

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-animate',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Harsh',
          from_email: form.email,
          to_email: contactData.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 4000);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert('Something went wrong. Please try again.');
      });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: contactData.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: contactData.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: contactData.twitter,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 px-6 sm:px-10"
    >
      {/* Background glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-glow opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-magenta-glow opacity-10 pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto">
        {/* Title */}
        <div className="contact-animate mb-16 text-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-neon-cyan/60 mb-3">
            // GET IN TOUCH
          </p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle mt-4 max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Drop me a message and let's build something incredible together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact form */}
          <div className="contact-animate lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-panel-strong p-8 sm:p-10 space-y-6"
            >
              {/* Name field */}
              <div>
                <label className="block font-grotesk text-sm text-white-600 mb-2 tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-surface-200 border border-white/5 rounded-xl px-5 py-3.5 text-white-800 font-outfit text-sm placeholder:text-white-500 focus:outline-none focus:border-neon-cyan/30 focus:shadow-neon/10 transition-all duration-300"
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block font-grotesk text-sm text-white-600 mb-2 tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-surface-200 border border-white/5 rounded-xl px-5 py-3.5 text-white-800 font-outfit text-sm placeholder:text-white-500 focus:outline-none focus:border-neon-cyan/30 focus:shadow-neon/10 transition-all duration-300"
                />
              </div>

              {/* Message field */}
              <div>
                <label className="block font-grotesk text-sm text-white-600 mb-2 tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-surface-200 border border-white/5 rounded-xl px-5 py-3.5 text-white-800 font-outfit text-sm placeholder:text-white-500 focus:outline-none focus:border-neon-cyan/30 focus:shadow-neon/10 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="neon-btn w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
                    Transmitting...
                  </>
                ) : success ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar — socials + info */}
          <div className="contact-animate lg:col-span-2 flex flex-col gap-4">
            {/* Email card */}
            <div className="glass-panel p-6">
              <p className="font-mono text-xs text-white-500 tracking-wider uppercase mb-2">
                Email
              </p>
              <p className="font-grotesk text-white-700 text-sm break-all">
                {contactData.email}
              </p>
            </div>

            {/* Location card */}
            <div className="glass-panel p-6">
              <p className="font-mono text-xs text-white-500 tracking-wider uppercase mb-2">
                Location
              </p>
              <p className="font-grotesk text-white-700 text-sm">
                Delhi, India 🇮🇳
              </p>
              <p className="font-mono text-xs text-neon-cyan/50 mt-1">
                Open to remote worldwide
              </p>
            </div>

            {/* Social links */}
            <div className="glass-panel p-6">
              <p className="font-mono text-xs text-white-500 tracking-wider uppercase mb-4">
                Connect
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="w-11 h-11 rounded-xl border border-white/5 flex items-center justify-center text-white-500 hover:text-neon-cyan hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <a
              href="/latestResume.pdf"
              download="Harsh_Resume.pdf"
              className="glass-panel p-6 group hover:border-neon-violet/20 transition-all duration-500 cursor-pointer flex items-center justify-between"
            >
              <div>
                <p className="font-grotesk text-sm font-semibold text-white-800 tracking-wide">
                  Download Resume
                </p>
                <p className="font-mono text-xs text-white-500 mt-1">
                  PDF • 2026
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-neon-violet/40 group-hover:bg-neon-violet/10 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-white-500 group-hover:text-neon-violet transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;