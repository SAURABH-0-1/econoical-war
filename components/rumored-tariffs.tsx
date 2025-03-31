"use client"

import { motion } from "framer-motion"
import { AlertCircle, Calendar, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Updated rumored tariff data with post-March 30 rumors
const rumoredTariffs = [
  {
    id: 1,
    expectedDate: "April 2, 2025",
    country: "Multiple Global Partners",
    sector: "Various",
    confidence: 95,
    trendScore: 9.2,
    newsOrigin: "Reuters",
    impact: "negative",
    description:
      '"Liberation Day" – Reciprocal tariffs matching each country\'s own tariff and non-tariff barriers. Trading partners will each receive a "tariff number" and must cut their duties or face a U.S. "tariff wall".',
  },
  {
    id: 2,
    expectedDate: "April 13, 2025",
    country: "European Union (Retaliation)",
    sector: "Technology",
    confidence: 90,
    trendScore: 8.5,
    newsOrigin: "AP News",
    impact: "negative",
    description:
      "EU's second-stage retaliation will slap extra duties on $19.6 billion worth of U.S. exports – including tech products like computers, servers, displays, and other goods.",
  },
  {
    id: 3,
    expectedDate: "April 2025",
    country: "India & Brazil",
    sector: "Pharmaceuticals",
    confidence: 75,
    trendScore: 7.3,
    newsOrigin: "Reuters",
    impact: "negative",
    description:
      'Tariffs on Indian pharmaceuticals and Brazilian ethanol as part of the reciprocal strategy. Part of the April 2 "Liberation Day" tariffs but may be implemented with specific focus on these sectors.',
  },
  {
    id: 4,
    expectedDate: "April 30, 2025",
    country: "Russia",
    sector: "Oil & Gas",
    confidence: 85,
    trendScore: 8.8,
    newsOrigin: "Reuters",
    impact: "negative",
    description:
      "25%-50% tariff on Russian oil exports with possible secondary sanctions for countries purchasing Russian crude. Response to Russia's inaction on Ukraine ceasefire deal.",
  },
]

export default function RumoredTariffs() {
  return (
    <section id="rumored-tariffs" className="py-16 relative">
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Rumored Tariffs</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stay ahead of the market with predictions on upcoming tariffs. Community-sourced intelligence on potential
          trade actions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rumoredTariffs.map((tariff, index) => (
          <motion.div
            key={tariff.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 border-gray-800 h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-emerald-400 mr-2" />
                    <CardTitle className="text-lg">{tariff.expectedDate}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-gray-800 text-emerald-400 border-emerald-800">
                    {tariff.sector}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">Target: {tariff.country}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">{tariff.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Community Confidence</span>
                    <span className="font-medium">{tariff.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${tariff.confidence}%` }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-2">Trend Score</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className="h-3 w-3 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700">
                          <p className="text-xs">Based on social media mentions and news coverage</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-1">{tariff.trendScore}</span>
                    <span className="text-xs text-gray-400">/10</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                  <span className="text-xs text-gray-500">Source: {tariff.newsOrigin}</span>
                  <div className="flex items-center text-red-500">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-xs">Predicted Impact</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

