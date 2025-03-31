"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    // Only access window in useEffect (client-side only)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div id="hero" className="relative min-h-screen flex items-center overflow-hidden" ref={ref}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Interactive spotlight effect that follows mouse */}
      <div
        className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent opacity-70 pointer-events-none"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.15), transparent)`,
          transition: "background 0.1s",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: Math.random() * (windowSize.width || 1000),
              y: Math.random() * (windowSize.height || 800),
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * (windowSize.width || 1000),
              y: Math.random() * (windowSize.height || 800),
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.7, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: i % 5 === 0 ? "#ef4444" : "#ffffff",
              boxShadow: i % 5 === 0 ? "0 0 8px rgba(220, 38, 38, 0.9)" : "0 0 5px rgba(255, 255, 255, 0.7)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 mt-16">
        <div className="max-w-4xl">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white relative">
              <span className="inline-block text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                Economical War
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.9)] animate-neon-pulse"></span>
            </h1>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl text-white mb-10 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
              <span className="text-red-400 font-semibold drop-shadow-[0_0_5px_rgba(220,38,38,0.7)]">Track</span> global
              tariffs.{" "}
              <span className="text-red-400 font-semibold drop-shadow-[0_0_5px_rgba(220,38,38,0.7)]">Predict</span> the
              next economic move.{" "}
              <span className="text-red-400 font-semibold drop-shadow-[0_0_5px_rgba(220,38,38,0.7)]">Earn</span>{" "}
              bragging rights.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 group relative overflow-hidden hover:shadow-[0_0_15px_rgba(220,38,38,0.7)]"
              onClick={() => scrollToSection("trump-tariff-timeline")}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-700 group-hover:opacity-0 transition-opacity duration-300"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <motion.span
                className="relative flex items-center font-semibold"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Explore Tariffs{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-950 rounded-full px-8 group relative overflow-hidden hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              onClick={() => scrollToSection("voting-zone")}
            >
              <span className="absolute inset-0 w-full h-full bg-red-950/0 group-hover:bg-red-950/50 transition-colors duration-300"></span>
              <motion.span
                className="relative flex items-center font-semibold"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Predict & Vote{" "}
                <Globe className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              </motion.span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
            </Button>
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex flex-col items-center">
              <div className="text-xs text-white uppercase tracking-wider mb-2 font-semibold drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
                Real-time tariff data
              </div>
              <div className="flex space-x-1">
                {["S&P -1.2%", "BTC -9.5%", "EU +25%", "China +20%"].map((item, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-red-950/50 border border-red-900/70 rounded text-xs text-white font-semibold shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="cursor-pointer flex flex-col items-center"
          onClick={() => scrollToSection("trump-tariff-timeline")}
        >
          <span className="text-white text-sm mb-2 font-semibold drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
            Scroll to explore
          </span>
          <ChevronDown className="h-6 w-6 text-red-500 drop-shadow-[0_0_5px_rgba(220,38,38,0.7)]" />
        </motion.div>
      </motion.div>
    </div>
  )
}

