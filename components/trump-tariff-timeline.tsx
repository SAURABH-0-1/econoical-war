"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, ExternalLink, Globe, TrendingDown, TrendingUp, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Trump's Tariff Timeline data with real information
const tariffTimelineData = [
  {
    id: 1,
    date: "February 1, 2025",
    countries: ["China"],
    details: "10% tariff on all Chinese imports, with focus on electronics and tech products",
    impact: "S&P 500 dropped 0.8%, Bitcoin fell 6.2% as markets reacted to the news",
    source: "https://www.reuters.com/markets/currencies/bitcoin-slides-below-100000-tariffs-rattle-markets-2025-02-02/",
    negative: true,
    additionalInfo:
      "Executive Order 14195 imposed a 10% tariff on all Chinese imports, effective Feb. 4. China vowed to retaliate.",
  },
  {
    id: 2,
    date: "February 11, 2025",
    countries: ["Global"],
    details:
      "Reinstated 25% Section 232 tariffs on steel and raised aluminum tariffs to 25%, ending prior country exemptions",
    impact: "Markets largely unmoved as the move was expected",
    source:
      "https://www.whitehouse.gov/fact-sheets/2025/02/fact-sheet-president-donald-j-trump-restores-section-232-tariffs/",
    negative: false,
    additionalInfo:
      "This aimed to protect U.S. metal industries. Markets were largely unmoved, as the move was expected.",
  },
  {
    id: 3,
    date: "March 4, 2025",
    countries: ["Mexico", "Canada", "China"],
    details:
      "Mexico & Canada: 25% on all goods (Canadian energy exports: 10%)\nChina: Tariffs doubled to 20% on all goods",
    impact: "S&P 500 fell 1.2%, Bitcoin plunged 9.5% amid global risk-off move",
    source:
      "https://www.reuters.com/world/trade-wars-erupt-trump-hits-canada-mexico-china-with-steep-tariffs-2025-03-04/",
    negative: true,
    additionalInfo:
      "Imposed as pressure over immigration and fentanyl, this broad tax hit Mexican exports. Stocks tumbled on the escalation.",
  },
  {
    id: 4,
    date: "March 12, 2025",
    countries: ["Global"],
    details: "25% worldwide tariff on steel and aluminum took effect",
    impact: "Markets had largely priced it in; stocks ticked up slightly as attention shifted to negotiations",
    source: "https://apnews.com/article/trump-eu-tariffs-countermeasures-806a3b9bcc9cd4e45817e672d95f0070",
    negative: false,
    additionalInfo:
      "U.S. allies like the EU and Canada immediately condemned the blanket metal duties and prepared countermeasures.",
  },
  {
    id: 5,
    date: "April 1, 2025",
    countries: ["European Union (Retaliation)"],
    details:
      "EU implemented counter-tariffs targeting U.S. goods worth €26 billion, including motorcycles, bourbon, jeans, and agricultural products",
    impact: "Markets closed (weekend), but futures indicated pressure on U.S. exporters",
    source: "https://apnews.com/article/trump-eu-tariffs-countermeasures-806a3b9bcc9cd4e45817e672d95f0070",
    negative: true,
    additionalInfo:
      "This reinstated the 25% duties the EU first applied in 2018 and added new 25% tariffs on industrial and agricultural products.",
  },
  {
    id: 6,
    date: "April 2, 2025",
    countries: ["Multiple Global Partners"],
    details: '"Liberation Day" – Reciprocal tariffs matching each country\'s own tariff and non-tariff barriers',
    impact: "S&P 500 dropped 2.5%, Bitcoin fell 5% as investors feared broader economic fallout",
    source:
      "https://www.reuters.com/world/us/countries-can-avoid-trumps-april-tariffs-by-cutting-trade-barriers-bessent-says-2025-03-18/",
    negative: true,
    additionalInfo:
      'Trump warned that trading partners will each receive a "tariff number" and must cut their duties or face a U.S. "tariff wall".',
  },
]

export default function TrumpTariffTimeline() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const filteredData = activeFilter
    ? tariffTimelineData.filter((tariff) => tariff.countries.includes(activeFilter))
    : tariffTimelineData

  const uniqueCountries = Array.from(new Set(tariffTimelineData.flatMap((tariff) => tariff.countries)))

  return (
    <section id="trump-tariff-timeline" className="py-16 pt-24 relative" ref={ref}>
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center relative"
      >
        <h2 className="text-4xl font-bold mb-4 text-white relative z-10 inline-block">
          Trump's Tariff Timeline
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 shadow-[0_0_10px_3px_rgba(220,38,38,0.7)]"></span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          A chronological record of tariffs imposed during the Trump administration and their market impact.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveFilter(null)}
            className={`rounded-full text-xs relative overflow-hidden ${
              activeFilter === null
                ? "bg-red-950/30 border-red-600 text-white"
                : "border-gray-700 text-gray-400 hover:border-red-600 hover:text-red-400"
            }`}
          >
            <span className="relative z-10">All Countries</span>
            {activeFilter === null && (
              <motion.div
                className="absolute inset-0 -z-0 bg-red-950/30"
                animate={{
                  boxShadow: [
                    "inset 0 0 5px rgba(220,38,38,0.3)",
                    "inset 0 0 10px rgba(220,38,38,0.5)",
                    "inset 0 0 5px rgba(220,38,38,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </Button>
          {uniqueCountries.map((country) => (
            <Button
              key={country}
              variant="outline"
              size="sm"
              onClick={() => setActiveFilter(country)}
              className={`rounded-full text-xs relative overflow-hidden ${
                activeFilter === country
                  ? "bg-red-950/30 border-red-600 text-white"
                  : "border-gray-700 text-gray-400 hover:border-red-600 hover:text-red-400"
              }`}
            >
              <span className="relative z-10">{country}</span>
              {activeFilter === country && (
                <motion.div
                  className="absolute inset-0 -z-0 bg-red-950/30"
                  animate={{
                    boxShadow: [
                      "inset 0 0 5px rgba(220,38,38,0.3)",
                      "inset 0 0 10px rgba(220,38,38,0.5)",
                      "inset 0 0 5px rgba(220,38,38,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </Button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((tariff, index) => (
          <motion.div
            key={tariff.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
            layout
          >
            <Card
              className={`bg-gray-900 border-gray-800 h-full flex flex-col hover:border-red-800 transition-all duration-300 group relative ${
                expandedCard === tariff.id ? "ring-2 ring-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]" : ""
              } hover:shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:-translate-y-1`}
              onClick={() => setExpandedCard(expandedCard === tariff.id ? null : tariff.id)}
            >
              <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
              <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-red-500 mr-2 group-hover:text-red-400 transition-colors duration-300" />
                    <CardTitle className="text-lg">{tariff.date}</CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-gray-800 text-red-500 border-red-800 transition-all duration-300 group-hover:bg-red-900/20"
                  >
                    {tariff.negative ? "Negative Impact" : "Neutral Impact"}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400 flex items-center mt-1">
                  <Globe className="h-3 w-3 mr-1 text-gray-500" />
                  {tariff.countries.join(", ")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Tariff Details:</h4>
                    <p className="text-sm text-gray-300 whitespace-pre-line">{tariff.details}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Impact:</h4>
                    <div className="flex items-start">
                      {tariff.negative ? (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1 mt-0.5" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                      )}
                      <p className="text-sm text-gray-300">{tariff.impact}</p>
                    </div>
                  </div>

                  {expandedCard === tariff.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-800 pt-3 mt-3"
                    >
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Additional Information:</h4>
                      <p className="text-sm text-gray-300">{tariff.additionalInfo}</p>
                      <motion.div
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent mt-3"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </motion.div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t border-gray-800">
                <div className="w-full flex justify-between items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 p-0 h-auto">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 border-gray-700">
                        <p className="text-xs">Click card to see more details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-gray-700 hover:bg-red-950/30 group transition-all duration-300 hover:shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(tariff.source, "_blank")
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Source</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No tariffs found for the selected filter.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="mt-4 border-red-600 text-red-400 hover:bg-red-950/30"
          >
            Clear Filter
          </Button>
        </div>
      )}
    </section>
  )
}

