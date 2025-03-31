"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Check, Trophy, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PredictWin() {
  const [date, setDate] = useState<Date>()
  const [solanaAddress, setSolanaAddress] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [confidence, setConfidence] = useState<string>("medium")
  const [predictionType, setPredictionType] = useState<string>("tariff")
  const [loading, setLoading] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <section id="predict-win" className="py-16 relative" ref={ref}>
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
          Predict & Win
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 shadow-[0_0_10px_3px_rgba(220,38,38,0.7)]"></span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          Predict the next major tariff announcement and win bragging rights. Top predictors featured on our
          leaderboard.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900 border-gray-800 hover:border-red-800 transition-colors duration-300 relative scan-effect">
            <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-red-500" />
                Make Your Prediction
              </CardTitle>
              <CardDescription className="text-gray-400">
                Winners announced weekly. No wallet connection required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Label>What type of prediction are you making?</Label>
                    <RadioGroup
                      value={predictionType}
                      onValueChange={setPredictionType}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tariff" id="tariff" className="border-red-600 text-red-600" />
                        <Label htmlFor="tariff" className="cursor-pointer">
                          New Tariff Announcement
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="retaliation" id="retaliation" className="border-red-600 text-red-600" />
                        <Label htmlFor="retaliation" className="cursor-pointer">
                          Country Retaliation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="market" id="market" className="border-red-600 text-red-600" />
                        <Label htmlFor="market" className="cursor-pointer">
                          Market Reaction ({">"}5% move)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="prediction-date">When will it happen?</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              <Info className="h-4 w-4 text-gray-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 border-gray-700">
                            <p className="text-xs max-w-xs">
                              Select the date you predict the event will occur. More accurate predictions earn higher
                              points.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal border-gray-700 bg-gray-800 hover:bg-gray-700 group ${
                            !date ? "text-gray-500" : "text-white"
                          }`}
                        >
                          <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300 text-red-500" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="bg-gray-800 text-white"
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>How confident are you in this prediction?</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["low", "medium", "high"].map((level) => (
                        <Button
                          key={level}
                          type="button"
                          variant="outline"
                          className={`border-gray-700 capitalize ${
                            confidence === level
                              ? "bg-red-950/30 border-red-600 text-white"
                              : "text-gray-400 hover:text-red-400 hover:border-red-600"
                          }`}
                          onClick={() => setConfidence(level)}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="solana-address">Solana Address (optional)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              <Info className="h-4 w-4 text-gray-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 border-gray-700">
                            <p className="text-xs max-w-xs">
                              Your address is only used for the leaderboard. No wallet connection required.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="solana-address"
                      placeholder="Enter your Solana address to be featured on the leaderboard"
                      value={solanaAddress}
                      onChange={(e) => setSolanaAddress(e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:border-red-600 transition-colors duration-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white group transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                    disabled={!date || loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Submit Prediction
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/50 mb-4 animate-neon-pulse">
                    <Check className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Prediction Submitted!</h3>
                  <p className="text-gray-400 mb-6">
                    Your {predictionType} prediction for {date && format(date, "MMMM d, yyyy")} has been recorded with{" "}
                    {confidence} confidence.
                  </p>
                  <div className="p-4 bg-gray-800/50 rounded-md border border-gray-700 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Prediction ID:</span>
                      <span className="text-red-400 font-mono">
                        #PRD-
                        {Math.floor(Math.random() * 10000)
                          .toString()
                          .padStart(4, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Potential Points:</span>
                      <span className="text-white font-semibold">
                        {confidence === "high" ? "100-500" : confidence === "medium" ? "50-250" : "25-100"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Check back weekly to see if you've won. Winners are announced every Sunday.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 border-red-600 text-red-400 hover:bg-red-950/30"
                    onClick={() => {
                      setSubmitted(false)
                      setDate(undefined)
                      setSolanaAddress("")
                      setConfidence("medium")
                      setPredictionType("tariff")
                    }}
                  >
                    Make Another Prediction
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

