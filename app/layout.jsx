import './globals.css';

export const metadata = {
  title: 'HARSH | Neon Neural Nexus — Portfolio',
  description: 'Turning ideas into scalable, real-time, and AI-powered applications with React, Next.js, and modern tech.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-white font-sans antialiased selection:bg-neon-cyan/30 selection:text-neon-cyan overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
