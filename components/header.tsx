"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = [
        "hero",
        "trump-tariff-timeline",
        "upcoming-tariff-rumors",
        "tariff-timeline",
        "rumored-tariffs",
        "voting-zone",
        "predict-win",
        "leaderboard",
      ]

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md border-b border-red-900/50 py-2" : "bg-transparent py-4"
      }`}
      style={{
        backgroundImage: isScrolled
          ? "radial-gradient(circle at 50% 50%, rgba(220,38,38,0.03) 0%, rgba(0,0,0,0) 70%)"
          : "none",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70 shadow-[0_0_8px_rgba(220,38,38,0.7)]"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center group">
              <div className="relative overflow-hidden">
                {/* Premium 3D layered effect with background integration */}
                <div className="relative">
                  {/* Main text layer with white color */}
                  <h1 className="text-xl md:text-2xl font-bold text-white relative">
                    Economical War
                    {/* Premium underline effect */}
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_8px_rgba(220,38,38,0.9)] group-hover:shadow-[0_0_15px_rgba(220,38,38,1)] transition-all duration-300"></span>
                  </h1>

                  {/* Simple premium glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    animate={{
                      filter: [
                        "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
                        "drop-shadow(0 0 5px rgba(255,255,255,0.5))",
                        "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </div>
              <div className="ml-2 px-2 py-0.5 bg-black/80 border border-red-900/70 rounded-md relative overflow-hidden group-hover:border-red-700 transition-all duration-300">
                <span className="text-xs text-red-500 font-medium relative z-10">$TARIFF</span>
                <motion.div
                  className="absolute inset-0 bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    boxShadow: [
                      "inset 0 0 0px rgba(220,38,38,0)",
                      "inset 0 0 10px rgba(220,38,38,0.3)",
                      "inset 0 0 0px rgba(220,38,38,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center"
            >
              {[
                { id: "trump-tariff-timeline", label: "Tariff Timeline" },
                { id: "upcoming-tariff-rumors", label: "Upcoming Rumors" },
                { id: "voting-zone", label: "Vote" },
                { id: "predict-win", label: "Predict" },
                { id: "leaderboard", label: "Leaderboard" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm rounded-md transition-all duration-300 relative group ${
                    activeSection === item.id
                      ? "text-white bg-red-950/50 border border-red-900/70 shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection !== item.id && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full opacity-70"></span>
                  )}
                  <span className="absolute inset-0 rounded-md bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-300"></span>
                </button>
              ))}
            </motion.nav>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-white hover:text-white hover:bg-red-950/50 transition-all duration-300 ${
                isMobileMenuOpen ? "bg-red-950/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]" : ""
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/95 backdrop-blur-md border-b border-red-900/50"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-1">
              {[
                { id: "trump-tariff-timeline", label: "Tariff Timeline" },
                { id: "upcoming-tariff-rumors", label: "Upcoming Rumors" },
                { id: "voting-zone", label: "Vote" },
                { id: "predict-win", label: "Predict" },
                { id: "leaderboard", label: "Leaderboard" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between p-3 rounded-md transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-red-950/50 border border-red-900/70 shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                      : "text-gray-300 hover:text-white hover:bg-gray-900/70"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeSection === item.id ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}

