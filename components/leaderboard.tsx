"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Medal, Search, ChevronDown, ChevronUp, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data
const leaderboardData = [
  {
    id: 1,
    address: "8xH7...j9Kz",
    correctPredictions: 2,
    totalPredictions: 3,
    accuracy: 67,
    rank: 1,
    lastPrediction: "April 2, 2025",
    streak: 1,
    isTeamMember: true,
  },
]

type SortField = "rank" | "accuracy" | "correctPredictions" | "streak"
type SortDirection = "asc" | "desc"

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [activeTab, setActiveTab] = useState("all-time")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredData = leaderboardData
    .filter((user) => user.address.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  return (
    <section id="leaderboard" className="py-16 relative" ref={ref}>
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
          Leaderboard
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 shadow-[0_0_10px_3px_rgba(220,38,38,0.7)]"></span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          Our top predictors with the most accurate tariff forecasts. Will you make it to the top?
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="all-time" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex justify-center">
            <TabsList className="bg-gray-900 border border-gray-800 p-1">
              <TabsTrigger
                value="all-time"
                className="data-[state=active]:bg-red-950 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                All Time
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className="data-[state=active]:bg-red-950 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                This Week
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-red-950 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                This Month
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="mb-4 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 focus:border-red-600"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900 border-gray-800 hover:border-red-800 transition-colors duration-300 relative scan-effect">
            <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

            <CardHeader>
              <CardTitle className="text-2xl">Top Predictors</CardTitle>
              <CardDescription className="text-gray-400">
                {activeTab === "all-time"
                  ? "All-time leaderboard based on prediction accuracy"
                  : activeTab === "weekly"
                    ? "This week's top performers"
                    : "This month's prediction champions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead
                        className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300"
                        onClick={() => handleSort("rank")}
                      >
                        <div className="flex items-center">
                          Rank
                          {sortField === "rank" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4 text-red-500" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4 text-red-500" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="text-gray-400">Address</TableHead>
                      <TableHead
                        className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300"
                        onClick={() => handleSort("correctPredictions")}
                      >
                        <div className="flex items-center">
                          Correct
                          {sortField === "correctPredictions" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4 text-red-500" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4 text-red-500" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="text-gray-400">Total</TableHead>
                      <TableHead
                        className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300"
                        onClick={() => handleSort("accuracy")}
                      >
                        <div className="flex items-center">
                          Accuracy
                          {sortField === "accuracy" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4 text-red-500" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4 text-red-500" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300"
                        onClick={() => handleSort("streak")}
                      >
                        <div className="flex items-center">
                          Streak
                          {sortField === "streak" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4 text-red-500" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4 text-red-500" />
                            ))}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((user) => (
                      <TableRow
                        key={user.id}
                        className="border-gray-800 hover:bg-gray-800/50 transition-colors duration-200 group"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {user.rank <= 3 && (
                              <Medal
                                className={`h-4 w-4 mr-2 ${
                                  user.rank === 1
                                    ? "text-red-500 group-hover:text-red-400"
                                    : user.rank === 2
                                      ? "text-gray-400 group-hover:text-gray-300"
                                      : "text-amber-700 group-hover:text-amber-600"
                                } transition-colors duration-300`}
                              />
                            )}
                            {user.rank}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                            {user.address}
                            {user.isTeamMember && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-950/50 border border-red-900/50 rounded text-red-400">
                                      Team
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-gray-800 border-gray-700">
                                    <p className="text-xs">Team member testing the platform</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{user.correctPredictions}</TableCell>
                        <TableCell>{user.totalPredictions}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-800 h-1.5 rounded-full mr-2">
                              <div
                                className="bg-red-600 h-1.5 rounded-full"
                                style={{ width: `${user.accuracy}%` }}
                              ></div>
                            </div>
                            <span className="text-red-400 group-hover:text-red-300 transition-colors duration-300">
                              {user.accuracy}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mr-1 ${
                                  i < user.streak ? "bg-red-500" : "bg-gray-700"
                                }`}
                              ></div>
                            ))}
                            <span className="ml-1">{user.streak}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No results found</p>
                  {searchTerm && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 border-red-600 text-red-400 hover:bg-red-950/30"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4 text-center">
              <div className="w-full flex flex-col items-center">
                <p className="text-gray-400 text-sm mb-2">
                  <Info className="inline h-4 w-4 mr-1 text-red-500" />
                  Leaderboard will be updated every 48 hours
                </p>
                <p className="text-gray-500 text-xs">
                  Our team members have tested the platform, so you can already see some entries in the leaderboard
                </p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

