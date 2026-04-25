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
  description: "Software Engineering student & Full-Stack AI Engineer. Building production-ready applications with React, Next.js, Node.js, and RAG pipelines.",
  keywords: ["Harsh Mehta", "developer", "portfolio", "full-stack", "AI engineer", "React", "Next.js", "Node.js"],
  authors: [{ name: "Harsh Mehta" }],
  openGraph: {
    title: "Harsh Mehta — Full-Stack & AI Engineer",
    description: "Software Engineering student building production-ready AI-powered applications.",
    type: "website",
  },
    generator: 'senotron'
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
