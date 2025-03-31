"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Analyzing global tariff impacts...")

  useEffect(() => {
    // Set mounted state to true when component mounts (client-side only)
    setIsMounted(true)

    // Start with logo reveal
    setTimeout(() => {
      setShowLogo(true)
    }, 300)

    // Simulate loading progress
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        return newProgress > 100 ? 100 : newProgress
      })
    }, 200)

    // Complete loading
    const timer = setTimeout(() => {
      if (progressInterval.current) clearInterval(progressInterval.current)
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }, 2500)

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const messages = [
      "Analyzing global tariff impacts...",
      "Calculating market correlations...",
      "Predicting economic outcomes...",
      "Scanning trade policy changes...",
      "Monitoring international reactions...",
    ]

    const messageInterval = setInterval(() => {
      setLoadingMessage(messages[Math.floor(Math.random() * messages.length)])
    }, 2000)

    return () => clearInterval(messageInterval)
  }, [])

  // Format the progress as a percentage with dollar sign to match the tariff theme
  const formattedProgress = `$${Math.floor(progress)}%`

  // Don't render anything during SSR
  if (!isMounted) return null

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center max-w-md w-full px-4">
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="mb-8 relative"
                >
                  <div className="relative w-24 h-24 mb-4 mx-auto">
                    <Image
                      src="/images/site-logo.png"
                      alt="Economical War"
                      width={96}
                      height={96}
                      className="rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.7)]"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      animate={{
                        boxShadow: [
                          "0 0 5px rgba(220,38,38,0.7)",
                          "0 0 20px rgba(220,38,38,0.9)",
                          "0 0 5px rgba(220,38,38,0.7)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                  <motion.h1
                    className="text-2xl font-bold text-white text-center"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(255,255,255,0.5)",
                        "0 0 15px rgba(255,255,255,0.8)",
                        "0 0 5px rgba(255,255,255,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Economical War
                  </motion.h1>
                  <motion.p
                    className="text-red-500 text-center font-semibold"
                    animate={{
                      color: ["#ef4444", "#dc2626", "#ef4444"],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    $TARIFF
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Loading market data...</span>
                <span className="text-red-500 font-mono font-bold">{formattedProgress}</span>
              </div>

              <div className="relative w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-700 via-red-600 to-red-500"
                  style={{ width: `${progress}%` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />

                {/* Enhanced animated scan line with glow effect */}
                <motion.div
                  className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
                  animate={{ x: [-80, 400] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(220,38,38,0.7))",
                  }}
                />
              </div>

              <div className="flex justify-center space-x-3 mt-6">
                {/* Enhanced animated tariff bars - mimicking stock chart with glow effects */}
                <div className="flex items-end space-x-1">
                  {[40, 25, 60, 30, 70, 45, 55].map((height, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 rounded-t-sm ${index % 3 === 0 ? "bg-red-600" : "bg-green-600"}`}
                      initial={{ height: 0 }}
                      animate={{
                        height: height,
                        boxShadow:
                          index % 3 === 0
                            ? [
                                "0 0 2px rgba(220,38,38,0.5)",
                                "0 0 8px rgba(220,38,38,0.8)",
                                "0 0 2px rgba(220,38,38,0.5)",
                              ]
                            : [
                                "0 0 2px rgba(34,197,94,0.5)",
                                "0 0 8px rgba(34,197,94,0.8)",
                                "0 0 2px rgba(34,197,94,0.5)",
                              ],
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        repeatDelay: 1,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center mt-4">
                <motion.p
                  className="text-xs text-gray-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {loadingMessage}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

