"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Header from "@/components/header"
import TariffTimeline from "@/components/tariff-timeline"
import RumoredTariffs from "@/components/rumored-tariffs"
import VotingZone from "@/components/voting-zone"
import PredictWin from "@/components/predict-win"
import Leaderboard from "@/components/leaderboard"
import TrumpTariffTimeline from "@/components/trump-tariff-timeline"
import UpcomingTariffRumors from "@/components/upcoming-tariff-rumors"
import EconomicInfo from "@/components/economic-info"
import Footer from "@/components/footer"
import type React from "react"

// Dynamically import components that use window/browser APIs with ssr: false
const Hero = dynamic(() => import("@/components/hero"), { ssr: false })
const LoadingScreen = dynamic(() => import("@/components/loading-screen"), { ssr: false })

export default function Home() {
  // Add subtle parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const sections = document.querySelectorAll(".parallax-section")
    const mouseX = e.clientX / window.innerWidth - 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5

    sections.forEach((section) => {
      const sectionEl = section as HTMLElement
      sectionEl.style.transform = `translateX(${mouseX * -10}px) translateY(${mouseY * -10}px)`
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Loading Screen - client-side only */}
      <Suspense fallback={null}>
        <LoadingScreen />
      </Suspense>

      {/* Enhanced background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0.9)_100%)]"></div>
        <div className="absolute inset-0 bg-black opacity-40 mix-blend-overlay"></div>

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        ></div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>

        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_100%)]"></div>
      </div>

      <Header />
      <Suspense fallback={<div className="min-h-screen"></div>}>
        <Hero />
      </Suspense>
      <div
        className="container mx-auto px-4 py-8 space-y-24 relative z-10 overflow-x-hidden"
        onMouseMove={handleMouseMove}
      >
        <TrumpTariffTimeline className="parallax-section" />
        <UpcomingTariffRumors className="parallax-section" />
        <TariffTimeline className="parallax-section" />
        <RumoredTariffs className="parallax-section" />
        <EconomicInfo className="parallax-section" />
        <VotingZone className="parallax-section" />
        <PredictWin className="parallax-section" />
        <Leaderboard className="parallax-section" />
      </div>
      <Footer />
    </div>
  )
}

