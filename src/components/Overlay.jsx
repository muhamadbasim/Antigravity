import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Komponen Efek Ketikan (Typing Effect)
const TypingText = ({ text, speed = 100, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let index = 0
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index))
      index++
      if (index === text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, started])

  return (
    <span className="font-mono text-google-green">
      {displayedText}
      <span className="animate-blink text-white">|</span>
    </span>
  )
}

export default function Overlay() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-8 md:p-16">
      
      {/* Header / Navbar */}
      <header className="flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-2">
           <div className="w-4 h-4 bg-google-blue rounded-full"></div>
           <span className="font-sans font-bold text-xl tracking-tight">antigravity.google</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Use Cases</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Resources</a>
        </nav>
        <button className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all text-white">
            Sign In
        </button>
      </header>

      {/* Hero Content */}
      <main className="flex flex-col gap-6 max-w-4xl mt-20 pointer-events-auto">
        
        {/* Code Badge */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="self-start px-3 py-1 bg-google-card border border-gray-700 rounded-md flex items-center gap-2"
        >
            <span className="w-2 h-2 bg-google-green rounded-full"></span>
            <span className="text-xs font-mono text-gray-300">v2.0.4 stable</span>
        </motion.div>

        {/* Headline Besar */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Build for the <br/>
          Agent-First Era
        </h1>

        {/* Subtitle dengan Typing Effect */}
        <div className="text-xl md:text-2xl h-16">
            <span className="text-gray-400 mr-2">{'>'}</span>
            <TypingText text="Initializing antigravity environment..." speed={50} delay={1000} />
        </div>

        {/* Call to Action Buttons */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex flex-wrap gap-4 mt-4"
        >
            <button className="bg-google-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20">
                Start Building
            </button>
            <button className="group bg-transparent border border-gray-600 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-full font-medium text-lg transition-all flex items-center gap-2">
                Read Documentation
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="text-gray-500 text-xs font-mono pointer-events-auto">
        <p>© 2025 Google Antigravity Clone. Termux Edition.</p>
        <p className="mt-1">System Status: <span className="text-google-green">Operational</span></p>
      </footer>
    </div>
  )
}
