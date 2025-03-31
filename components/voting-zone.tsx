"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ThumbsDown, ThumbsUp, Share2, Calendar, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for multiple rumors
const rumorData = [
  {
    id: 1,
    title: "25% Tariff on European Automobiles",
    description:
      "Trump threatened a 25% tariff on imports from the EU 'generally speaking, and that'll be on cars and all other things,' blaming unfair EU duties",
    expectedDate: "Q2 2025",
    yesVotes: 12,
    noVotes: 8,
    source: "Reuters",
    category: "Automotive",
  },
  {
    id: 2,
    title: "EU Retaliation on Tech Exports",
    description:
      "EU's second-stage retaliation will slap extra duties on $19.6 billion worth of U.S. exports – including tech products like computers, servers, displays, and other goods",
    expectedDate: "April 13, 2025",
    yesVotes: 9,
    noVotes: 6,
    source: "AP News",
    category: "Technology",
  },
  {
    id: 3,
    title: "Tariffs on Indian Pharmaceuticals",
    description:
      "Tariffs on Indian pharmaceuticals as part of the reciprocal strategy. Trump warned that trading partners will each receive a 'tariff number' and must cut their duties or face a U.S. 'tariff wall'",
    expectedDate: "April 2025",
    yesVotes: 6,
    noVotes: 3,
    source: "Reuters",
    category: "Pharmaceuticals",
  },
]

export default function VotingZone() {
  const [votes, setVotes] = useState(
    rumorData.map((rumor) => ({
      id: rumor.id,
      yes: rumor.yesVotes,
      no: rumor.noVotes,
    })),
  )
  const [userVoted, setUserVoted] = useState<{ [key: number]: "yes" | "no" | null }>({})
  const [activeTab, setActiveTab] = useState("1")
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const handleVote = (rumorId: number, vote: "yes" | "no") => {
    if (userVoted[rumorId]) return

    setUserVoted((prev) => ({
      ...prev,
      [rumorId]: vote,
    }))

    setVotes((prev) =>
      prev.map((item) =>
        item.id === rumorId
          ? {
              ...item,
              yes: vote === "yes" ? item.yes + 1 : item.yes,
              no: vote === "no" ? item.no + 1 : item.no,
            }
          : item,
      ),
    )
  }

  const handleShare = () => {
    const currentRumor = rumorData.find((rumor) => rumor.id.toString() === activeTab)
    if (currentRumor) {
      navigator.clipboard.writeText(
        `Check out this tariff rumor: ${currentRumor.title} - Expected: ${currentRumor.expectedDate} - Vote now at economicalwar.com`,
      )
      setShowShareTooltip(true)
      setTimeout(() => setShowShareTooltip(false), 2000)
    }
  }

  const getVotePercentages = (rumorId: number) => {
    const rumorVotes = votes.find((v) => v.id === rumorId)
    if (!rumorVotes) return { yesPercentage: 0, noPercentage: 0 }

    const totalVotes = rumorVotes.yes + rumorVotes.no
    const yesPercentage = Math.round((rumorVotes.yes / totalVotes) * 100)
    const noPercentage = Math.round((rumorVotes.no / totalVotes) * 100)

    return { yesPercentage, noPercentage }
  }

  return (
    <section id="voting-zone" className="py-16 relative" ref={ref}>
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
          Anonymous Voting Zone
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 shadow-[0_0_10px_3px_rgba(220,38,38,0.7)]"></span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          Cast your vote on the latest tariff rumors. No wallet connection required. Completely anonymous.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="1" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-gray-900 border border-gray-800 p-1">
              {rumorData.map((rumor) => (
                <TabsTrigger
                  key={rumor.id}
                  value={rumor.id.toString()}
                  className="data-[state=active]:bg-red-950 data-[state=active]:text-white data-[state=active]:shadow-none px-4"
                >
                  Rumor {rumor.id}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {rumorData.map((rumor) => {
            const { yesPercentage, noPercentage } = getVotePercentages(rumor.id)

            return (
              <TabsContent key={rumor.id} value={rumor.id.toString()} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-red-800 transition-colors duration-300 relative scan-effect">
                    <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
                    <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl">{rumor.title}</CardTitle>
                        <Badge className="bg-gray-800 text-red-400 border-0 text-xs">{rumor.category}</Badge>
                      </div>
                      <CardDescription className="text-gray-400">{rumor.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-red-500" />
                          <span>Expected Date: {rumor.expectedDate}</span>
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          <span>Source: {rumor.source}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-4">Do you believe this rumor?</h3>
                        <div className="flex justify-center gap-4">
                          <Button
                            variant={userVoted[rumor.id] === "yes" ? "default" : "outline"}
                            className={`rounded-full px-6 group ${
                              userVoted[rumor.id] === "yes"
                                ? "bg-red-600 hover:bg-red-700"
                                : "border-red-600 text-red-400 hover:bg-red-950"
                            } transition-all duration-300 ${userVoted[rumor.id] !== "yes" ? "hover:shadow-[0_0_10px_rgba(220,38,38,0.5)]" : ""}`}
                            onClick={() => handleVote(rumor.id, "yes")}
                            disabled={userVoted[rumor.id] !== undefined}
                          >
                            <ThumbsUp className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">Yes</span>
                          </Button>
                          <Button
                            variant={userVoted[rumor.id] === "no" ? "default" : "outline"}
                            className={`rounded-full px-6 group ${
                              userVoted[rumor.id] === "no"
                                ? "bg-red-600 hover:bg-red-700"
                                : "border-red-600 text-red-400 hover:bg-red-950"
                            } transition-all duration-300 ${userVoted[rumor.id] !== "no" ? "hover:shadow-[0_0_10px_rgba(220,38,38,0.5)]" : ""}`}
                            onClick={() => handleVote(rumor.id, "no")}
                            disabled={userVoted[rumor.id] !== undefined}
                          >
                            <ThumbsDown className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">No</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <div className="flex justify-between text-sm">
                          <span>
                            Yes: {votes.find((v) => v.id === rumor.id)?.yes || 0} votes ({yesPercentage}%)
                          </span>
                          <span>
                            No: {votes.find((v) => v.id === rumor.id)?.no || 0} votes ({noPercentage}%)
                          </span>
                        </div>
                        <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden flex">
                          <div className="bg-red-600 h-full" style={{ width: `${yesPercentage}%` }}></div>
                          <div className="bg-gray-600 h-full" style={{ width: `${noPercentage}%` }} />
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xs text-gray-500">
                            {userVoted[rumor.id]
                              ? "Thank you for voting!"
                              : "Your vote is anonymous and cannot be changed"}
                          </p>

                          <TooltipProvider>
                            <Tooltip open={showShareTooltip}>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-red-400"
                                  onClick={handleShare}
                                >
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 border-gray-700">
                                <p className="text-xs">Copied to clipboard!</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}

// Custom Badge component for this section
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-2 py-1 rounded text-xs font-medium ${className}`}>{children}</div>
}

