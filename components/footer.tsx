"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
    }
  }

  return (
    <footer className="bg-gray-950 border-t border-gray-900 py-12 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white relative inline-block mb-4">
              Economical War
              <span className="ml-2 text-xs text-red-500 font-medium">$TARIFF</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.5)]"></span>
            </h2>
            <p className="text-gray-400 mb-6">World's first protocol decoding tariffs. Trade war meets Web3.</p>

            <div className="flex gap-3">
              <a href="https://x.com/war_tariff" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gray-800 text-white hover:text-white hover:bg-gray-800 hover:border-red-800 transition-colors duration-300 relative group"
                >
                  <div className="relative w-5 h-5">
                    {/* X (Twitter) Logo */}
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dLH83VO8kV0DWfI0uPKRfYyiIljSP9.png"
                      alt="X Logo"
                      width={20}
                      height={20}
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300"></span>
                </Button>
              </a>
              <a href="https://t.me/EconomicalWar" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gray-800 text-white hover:text-white hover:bg-gray-800 hover:border-red-800 transition-colors duration-300 relative group"
                >
                  <div className="relative w-5 h-5">
                    {/* Telegram Logo */}
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ijz50fgu2Rd9mBGeY2RdRI9oiPHtFx.png"
                      alt="Telegram Logo"
                      width={20}
                      height={20}
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300"></span>
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 right-0 h-[1px] w-1/2 bg-red-600/50 shadow-[0_0_3px_rgba(220,38,38,0.3)]"></span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Tariff Timeline", href: "#trump-tariff-timeline" },
                { label: "Upcoming Rumors", href: "#upcoming-tariff-rumors" },
                { label: "Vote on Tariffs", href: "#voting-zone" },
                { label: "Make Predictions", href: "#predict-win" },
                { label: "Leaderboard", href: "#leaderboard" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-px bg-red-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-red-500/50 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest tariff news and predictions directly to your inbox.</p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border-gray-800 focus:border-red-600"
                  required
                />
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white group transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-red-950/30 border border-red-900/50 rounded-md text-center"
              >
                <p className="text-white">Thanks for subscribing!</p>
                <p className="text-sm text-gray-400 mt-1">
                  We'll keep you updated on the latest tariff news and market impacts.
                </p>
              </motion.div>
            )}

            <div className="mt-6 flex items-center">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <a
                href="mailto:contact@economicalwar.com"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              >
                contact@economicalwar.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 text-center">
          <p className="text-gray-500 text-sm">Built by Citizens of the Free Market</p>
          <p className="text-gray-600 text-xs mt-2">© 2025 Economical War | $TARIFF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

