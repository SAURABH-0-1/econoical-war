"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Updated tariff data based on 2025 real events
const tariffData = [
  {
    id: 1,
    date: "Feb 1, 2025",
    country: "China",
    category: "All Imports",
    description: "10% tariff on all Chinese imports, with focus on electronics and tech products",
    cryptoImpact: -6.2,
    stockImpact: -0.8,
    newsSource:
      "https://www.reuters.com/markets/currencies/bitcoin-slides-below-100000-tariffs-rattle-markets-2025-02-02/",
    chartData: [
      { date: "Jan 31", value: 0 },
      { date: "Feb 1", value: 0 },
      { date: "Feb 2", value: -0.3 },
      { date: "Feb 3", value: -0.8 },
      { date: "Feb 4", value: -0.7 },
      { date: "Feb 5", value: -0.5 },
      { date: "Feb 6", value: -0.4 },
    ],
  },
  {
    id: 2,
    date: "Feb 11, 2025",
    country: "Global",
    category: "Steel & Aluminum",
    description:
      "Reinstated 25% Section 232 tariffs on steel and raised aluminum tariffs to 25%, ending prior country exemptions",
    cryptoImpact: -0.2,
    stockImpact: -0.1,
    newsSource:
      "https://www.whitehouse.gov/fact-sheets/2025/02/fact-sheet-president-donald-j-trump-restores-section-232-tariffs/",
    chartData: [
      { date: "Feb 10", value: 0 },
      { date: "Feb 11", value: 0 },
      { date: "Feb 12", value: -0.1 },
      { date: "Feb 13", value: -0.1 },
      { date: "Feb 14", value: 0 },
      { date: "Feb 15", value: 0.1 },
      { date: "Feb 16", value: 0.2 },
    ],
  },
  {
    id: 3,
    date: "Mar 4, 2025",
    country: "Multiple",
    category: "Broad Tariffs",
    description:
      "Mexico & Canada: 25% on all goods (Canadian energy exports: 10%). China: Tariffs doubled to 20% on all goods",
    cryptoImpact: -9.5,
    stockImpact: -1.2,
    newsSource:
      "https://www.reuters.com/world/trade-wars-erupt-trump-hits-canada-mexico-china-with-steep-tariffs-2025-03-04/",
    chartData: [
      { date: "Mar 3", value: 0 },
      { date: "Mar 4", value: 0 },
      { date: "Mar 5", value: -1.2 },
      { date: "Mar 6", value: -1.5 },
      { date: "Mar 7", value: -1.3 },
      { date: "Mar 8", value: -1.0 },
      { date: "Mar 9", value: -0.8 },
    ],
  },
  {
    id: 4,
    date: "Mar 12, 2025",
    country: "Global",
    category: "Steel & Aluminum",
    description: "25% worldwide tariff on steel and aluminum took effect",
    cryptoImpact: 1.0,
    stockImpact: 0.5,
    newsSource: "https://apnews.com/article/trump-eu-tariffs-countermeasures-806a3b9bcc9cd4e45817e672d95f0070",
    chartData: [
      { date: "Mar 11", value: 0 },
      { date: "Mar 12", value: 0 },
      { date: "Mar 13", value: 0.5 },
      { date: "Mar 14", value: 0.7 },
      { date: "Mar 15", value: 0.6 },
      { date: "Mar 16", value: 0.4 },
      { date: "Mar 17", value: 0.3 },
    ],
  },
  {
    id: 5,
    date: "Mar 26, 2025",
    country: "Global",
    category: "Automobiles",
    description: "25% tariff on all vehicle and parts imports, sparking concern among car manufacturers and dealers",
    cryptoImpact: -0.8,
    stockImpact: -2.5,
    newsSource: "https://www.wsj.com/politics/policy/trump-says-he-couldnt-care-less-if-car-prices-go-up-b9b4a211",
    chartData: [
      { date: "Mar 25", value: 0 },
      { date: "Mar 26", value: 0 },
      { date: "Mar 27", value: -2.5 },
      { date: "Mar 28", value: -2.3 },
      { date: "Mar 29", value: -2.0 },
      { date: "Mar 30", value: -1.8 },
      { date: "Mar 31", value: -1.5 },
    ],
  },
  {
    id: 6,
    date: "Mar 30, 2025",
    country: "Russia",
    category: "Crude Oil",
    description:
      "25%-50% tariff on Russian oil exports with possible secondary sanctions for countries purchasing Russian crude",
    cryptoImpact: -1.6,
    stockImpact: 0.3,
    newsSource:
      "https://www.reuters.com/world/trump-threatens-secondary-tariffs-russian-oil-if-unable-make-deal-ukraine-2025-03-30/",
    chartData: [
      { date: "Mar 29", value: 0 },
      { date: "Mar 30", value: 0 },
      { date: "Mar 31", value: 0.3 },
      { date: "Apr 1", value: 0.5 },
      { date: "Apr 2", value: 0.4 },
      { date: "Apr 3", value: 0.2 },
      { date: "Apr 4", value: 0.1 },
    ],
  },
  {
    id: 7,
    date: "Apr 1, 2025",
    country: "European Union (Retaliation)",
    category: "Various",
    description:
      "EU implemented counter-tariffs targeting U.S. goods worth €26 billion, including motorcycles, bourbon, jeans, and agricultural products",
    cryptoImpact: -1.5,
    stockImpact: -0.8,
    newsSource: "https://apnews.com/article/trump-eu-tariffs-countermeasures-806a3b9bcc9cd4e45817e672d95f0070",
    chartData: [
      { date: "Mar 31", value: 0 },
      { date: "Apr 1", value: 0 },
      { date: "Apr 2", value: -0.8 },
      { date: "Apr 3", value: -1.0 },
      { date: "Apr 4", value: -0.9 },
      { date: "Apr 5", value: -0.7 },
      { date: "Apr 6", value: -0.5 },
    ],
  },
]

export default function TariffTimeline() {
  const [activeTab, setActiveTab] = useState("crypto")
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("tariff-timeline-container")
    if (!container) return

    const scrollAmount = 400
    const newPosition =
      direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  return (
    <section id="tariff-timeline" className="py-16 relative">
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Tariff Timeline Tracker</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Track the impact of tariffs on global markets in real-time. See how crypto and stock markets react to trade
          policy changes.
        </p>
      </motion.div>

      <Tabs defaultValue="crypto" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="flex justify-center">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="crypto" className="data-[state=active]:bg-emerald-900 data-[state=active]:text-white">
              Crypto View
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:bg-emerald-900 data-[state=active]:text-white">
              Stock Market View
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-gray-700 text-white"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          id="tariff-timeline-container"
          className="flex overflow-x-auto scrollbar-hide py-4 px-8 gap-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tariffData.map((tariff) => (
            <motion.div
              key={tariff.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <Card className="w-[350px] bg-gray-900 border-gray-800 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{tariff.date}</CardTitle>
                      <CardDescription className="text-gray-400">Target: {tariff.country}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-800 text-emerald-400 border-emerald-800">
                      {tariff.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{tariff.description}</p>

                  {activeTab === "crypto" ? (
                    <div>
                      <div className="h-[150px] mt-4">
                        <ChartContainer
                          config={{
                            value: {
                              label: "Crypto Impact",
                              color: tariff.cryptoImpact < 0 ? "hsl(0, 100%, 50%)" : "hsl(130, 100%, 50%)",
                            },
                          }}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={tariff.chartData.map((item) => ({
                                ...item,
                                value: item.value * (tariff.cryptoImpact / tariff.stockImpact),
                              }))}
                              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                              <defs>
                                <linearGradient id={`gradientCrypto${tariff.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop
                                    offset="0%"
                                    stopColor={
                                      tariff.cryptoImpact < 0 ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 0, 0.5)"
                                    }
                                  />
                                  <stop
                                    offset="100%"
                                    stopColor={
                                      tariff.cryptoImpact < 0 ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 255, 0, 0.1)"
                                    }
                                  />
                                </linearGradient>
                              </defs>
                              <XAxis
                                dataKey="date"
                                tick={{ fontSize: 10, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis hide domain={["dataMin", "dataMax"]} />
                              <Tooltip
                                content={<ChartTooltipContent />}
                                cursor={{ stroke: "#4b5563", strokeWidth: 1, strokeDasharray: "5 5" }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke={tariff.cryptoImpact < 0 ? "#ff0000" : "#00ff00"}
                                fillOpacity={1}
                                fill={`url(#gradientCrypto${tariff.id})`}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400">Impact</span>
                        <div
                          className={`flex items-center ${tariff.cryptoImpact < 0 ? "text-red-500" : "text-green-500"}`}
                        >
                          {tariff.cryptoImpact < 0 ? (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-semibold">{tariff.cryptoImpact}%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="h-[150px] mt-4">
                        <ChartContainer
                          config={{
                            value: {
                              label: "Stock Impact",
                              color: tariff.stockImpact < 0 ? "hsl(0, 100%, 50%)" : "hsl(130, 100%, 50%)",
                            },
                          }}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={tariff.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id={`gradientStock${tariff.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop
                                    offset="0%"
                                    stopColor={tariff.stockImpact < 0 ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 0, 0.5)"}
                                  />
                                  <stop
                                    offset="100%"
                                    stopColor={tariff.stockImpact < 0 ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 255, 0, 0.1)"}
                                  />
                                </linearGradient>
                              </defs>
                              <XAxis
                                dataKey="date"
                                tick={{ fontSize: 10, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis hide domain={["dataMin", "dataMax"]} />
                              <Tooltip
                                content={<ChartTooltipContent />}
                                cursor={{ stroke: "#4b5563", strokeWidth: 1, strokeDasharray: "5 5" }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke={tariff.stockImpact < 0 ? "#ff0000" : "#00ff00"}
                                fillOpacity={1}
                                fill={`url(#gradientStock${tariff.id})`}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400">Impact</span>
                        <div
                          className={`flex items-center ${tariff.stockImpact < 0 ? "text-red-500" : "text-green-500"}`}
                        >
                          {tariff.stockImpact < 0 ? (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-semibold">{tariff.stockImpact}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <a
                    href={tariff.newsSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 underline block text-right mt-2"
                  >
                    View Source
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-gray-700 text-white"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

