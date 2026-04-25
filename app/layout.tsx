import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Harsh Mehta — Full-Stack & AI Engineer | Cybercore Nexus",
  description: "Specializing in React 19, Next.js 15, and AI-driven SaaS architectures. Software Engineering student building production-ready applications with high-performance real-time features.",
  keywords: ["Harsh Mehta", "Full-Stack Developer", "AI Engineer", "Next.js 15", "React 19", "Software Engineer Portfolio", "Cybercore Nexus", "RAG Pipelines", "Real-time Web Systems"],
  authors: [{ name: "Harsh Mehta" }],
  openGraph: {
    title: "Harsh Mehta — Full-Stack & AI Engineer | Cybercore Nexus",
    description: "Building the next generation of AI-powered web applications.",
    type: "website",
    url: "https://harshmehta.tech", // Placeholder for user's domain
    siteName: "Harsh Mehta Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harsh Mehta Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Mehta — Full-Stack & AI Engineer",
    description: "Software Engineering student building production-ready AI-powered applications.",
    images: ["/og-image.png"],
  },
  generator: 'Harsh Mehta Portfolio'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
