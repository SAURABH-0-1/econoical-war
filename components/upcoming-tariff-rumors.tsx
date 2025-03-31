"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AlertCircle, Calendar, ExternalLink, Globe, Filter, Search, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Updated Upcoming Tariff Rumors data with post-March 30 rumors
const upcomingRumorsData = [
  {
    id: 1,
    date: "April 2, 2025",
    targets: ["EU", "South Korea", "Brazil", "India"],
    rumor:
      '"Liberation Day" tariffs - Reciprocal tariffs matching each country\'s own tariff and non-tariff barriers. Targeting copper, pharmaceuticals, automobiles, and lumber. Trump labeled April 2 as "Liberation Day" for American industry.',
    source: "https://apnews.com/article/118d73f50e5133ef3d9598aed6661a6c",
    confidence: 95,
    category: "Various",
    impact: "High",
  },
  {
    id: 2,
    date: "April 13, 2025",
    targets: ["European Union (Retaliation)"],
    rumor:
      "EU's second-stage retaliation will slap extra duties on $19.6 billion worth of U.S. exports – including tech products like computers, servers, displays, and other goods",
    source: "https://apnews.com/article/trump-eu-tariffs-countermeasures-806a3b9bcc9cd4e45817e672d95f0070",
    confidence: 90,
    category: "Tech",
    impact: "High",
  },
  {
    id: 3,
    date: "April 30, 2025",
    targets: ["Russia"],
    rumor:
      "25%-50% tariff on Russian oil exports with possible secondary sanctions for countries purchasing Russian crude. Response to Russia's inaction on Ukraine ceasefire deal.",
    source:
      "https://www.reuters.com/world/trump-threatens-secondary-tariffs-russian-oil-if-unable-make-deal-ukraine-2025-03-30/",
    confidence: 85,
    category: "Oil & Gas",
    impact: "Medium",
  },
  {
    id: 4,
    date: "May 2025",
    targets: ["United Kingdom"],
    rumor:
      "Potential tariffs on UK goods if negotiations fail. Trump hinted that 'tariffs on UK goods might happen' as part of his trade measures, though he suggested 'that one can be worked out' via a deal",
    source: "https://en.wikipedia.org/wiki/2025_United_States_tariffs_against_the_European_Union",
    confidence: 60,
    category: "General",
    impact: "Low",
  },
]

export default function UpcomingTariffRumors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeImpact, setActiveImpact] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const categories = Array.from(new Set(upcomingRumorsData.map((rumor) => rumor.category)))
  const impacts = Array.from(new Set(upcomingRumorsData.map((rumor) => rumor.impact)))

  const filteredRumors = upcomingRumorsData.filter((rumor) => {
    const matchesSearch =
      searchTerm === "" ||
      rumor.rumor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rumor.targets.some((target) => target.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = activeCategory === null || rumor.category === activeCategory
    const matchesImpact = activeImpact === null || rumor.impact === activeImpact

    return matchesSearch && matchesCategory && matchesImpact
  })

  const clearFilters = () => {
    setSearchTerm("")
    setActiveCategory(null)
    setActiveImpact(null)
  }

  return (
    <section id="upcoming-tariff-rumors" className="py-16 relative" ref={ref}>
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-8 text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
          Upcoming Tariff Rumors
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 shadow-[0_0_10px_3px_rgba(220,38,38,0.7)]"></span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          Potential future tariffs based on market intelligence and policy signals.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search rumors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 focus:border-red-600 w-full"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-white"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-800 text-gray-400 hover:text-white hover:border-red-600"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            {(activeCategory || activeImpact || searchTerm) && (
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveCategory(null)}
                    className={`rounded-full text-xs ${
                      activeCategory === null
                        ? "bg-red-950/30 border-red-600 text-white"
                        : "border-gray-700 text-gray-400 hover:border-red-600 hover:text-red-400"
                    }`}
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full text-xs ${
                        activeCategory === category
                          ? "bg-red-950/30 border-red-600 text-white"
                          : "border-gray-700 text-gray-400 hover:border-red-600 hover:text-red-400"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Impact Level</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveImpact(null)}
                    className={`rounded-full text-xs ${
                      activeImpact === null
                        ? "bg-red-950/30 border-red-600 text-white"
                        : "border-gray-700 text-gray-400 hover:border-red-600 hover:text-red-400"
                    }`}
                  >
                    All
                  </Button>
                  {impacts.map((impact) => (
                    <Button
                      key={impact}
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveImpact(impact)}
                      className={`rounded-full text-xs ${
                        activeImpact === impact
                          ? "bg-red-950/30 border-red-600 text-white"
                          : "border-gray-700 text-gray-400 hover:border-red-600 hover:text-red-400"
                      }`}
                    >
                      {impact}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {filteredRumors.map((rumor, index) => (
          <motion.div
            key={rumor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
            layout
          >
            <Card className="bg-gray-900 border-gray-800 h-full flex flex-col hover:border-red-800 transition-colors duration-300 group relative scan-effect animated-border">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-red-500 mr-2 group-hover:text-red-400 transition-colors duration-300" />
                    <CardTitle className="text-lg">{rumor.date}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="bg-gray-800 text-red-500 border-red-800 transition-all duration-300 hover:bg-red-900/20 group-hover:shadow-[0_0_5px_rgba(220,38,38,0.5)]"
                    >
                      Rumor
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="outline"
                            className={`bg-gray-800 border-gray-700 transition-all duration-300 ${
                              rumor.impact === "High"
                                ? "text-red-500"
                                : rumor.impact === "Medium"
                                  ? "text-amber-500"
                                  : "text-blue-500"
                            }`}
                          >
                            {rumor.impact}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700">
                          <p className="text-xs">Impact Level: {rumor.impact}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <CardDescription className="text-gray-400 flex items-center">
                    <Globe className="h-3 w-3 mr-1 text-gray-500" />
                    Target: {rumor.targets.join(", ")}
                  </CardDescription>
                  <Badge className="bg-gray-800 text-xs border-0">{rumor.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-300">{rumor.rumor}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Confidence Level</span>
                      <span className="font-medium text-red-400">{rumor.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-red-600 h-1.5 rounded-full" style={{ width: `${rumor.confidence}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t border-gray-800">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-500 border-gray-700 hover:bg-red-950/30 group transition-all duration-300 hover:shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                  onClick={() => window.open(rumor.source, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Source</span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredRumors.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No rumors found matching your filters.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="mt-4 border-red-600 text-red-400 hover:bg-red-950/30"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </section>
  )
}

