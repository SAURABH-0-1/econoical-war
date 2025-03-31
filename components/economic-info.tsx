"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingDown, AlertCircle, BarChart3, Globe, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EconomicInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="economic-info" className="py-16 relative" ref={ref}>
      {/* Red neon glow effect */}
      <div className="section-divider"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
          Economic War Insights
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 shadow-[0_0_10px_3px_rgba(220,38,38,0.7)]"></span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-6">
          Understanding the global economic landscape and the impact of tariffs on markets and economies.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="tariffs" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-900 border border-gray-800 p-1">
              <TabsTrigger
                value="tariffs"
                className="data-[state=active]:bg-red-950 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                Tariff Impact
              </TabsTrigger>
              <TabsTrigger
                value="markets"
                className="data-[state=active]:bg-red-950 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                Market Effects
              </TabsTrigger>
              <TabsTrigger
                value="crypto"
                className="data-[state=active]:bg-red-950 data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                Crypto Correlation
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tariffs" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-800 transition-colors duration-300 relative scan-effect">
                  <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
                  <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-red-500 mr-2" />
                      <CardTitle className="text-xl">Global Supply Chains</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      How tariffs disrupt international trade flows and supply networks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Tariffs create immediate disruptions in global supply chains, forcing companies to reconsider
                      sourcing strategies and manufacturing locations. When the U.S. imposed steel and aluminum tariffs
                      in 2018, manufacturers faced higher input costs and scrambled to find alternative suppliers.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Supply Chain Disruption Level:</span>
                        <span className="text-red-400 font-medium">High</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-white mb-2">Key Affected Industries:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Automotive", "Electronics", "Agriculture", "Steel"].map((industry) => (
                          <span key={industry} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-800 transition-colors duration-300 relative scan-effect">
                  <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
                  <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-red-500 mr-2" />
                      <CardTitle className="text-xl">Consumer Price Impact</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      How tariffs translate to higher prices for everyday goods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Tariffs typically result in higher prices for consumers as businesses pass on increased costs.
                      Studies show that the 2018-2019 tariffs on Chinese goods cost the average American household
                      approximately $800 annually through higher prices on everyday products.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Consumer Price Increase:</span>
                        <span className="text-red-400 font-medium">Moderate to High</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-white mb-2">Most Affected Consumer Goods:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Electronics", "Appliances", "Clothing", "Food"].map((category) => (
                          <span key={category} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="markets" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-800 transition-colors duration-300 relative scan-effect">
                  <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
                  <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <BarChart3 className="h-5 w-5 text-red-500 mr-2" />
                      <CardTitle className="text-xl">Stock Market Volatility</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      How tariff announcements create market uncertainty and price swings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Tariff announcements typically trigger immediate market volatility. When major tariffs are
                      announced, markets often experience sharp selloffs followed by periods of heightened volatility as
                      investors reassess corporate earnings potential and global growth prospects.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Market Volatility Increase:</span>
                        <span className="text-red-400 font-medium">Significant</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-white mb-2">Most Vulnerable Sectors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Technology", "Manufacturing", "Retail", "Transportation"].map((sector) => (
                          <span key={sector} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-800 transition-colors duration-300 relative scan-effect">
                  <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
                  <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                      <CardTitle className="text-xl">Currency Fluctuations</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      How trade tensions impact forex markets and currency values
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Trade wars often lead to significant currency fluctuations. When tariffs are imposed, the targeted
                      country's currency typically weakens as export prospects diminish. Meanwhile, safe-haven
                      currencies like the USD, JPY, and CHF tend to strengthen during periods of trade tension.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Currency Impact Severity:</span>
                        <span className="text-red-400 font-medium">High</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-white mb-2">Most Affected Currencies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["CNY", "EUR", "MXN", "CAD"].map((currency) => (
                          <span key={currency} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
                            {currency}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-800 transition-colors duration-300 relative scan-effect">
                  <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
                  <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      <CardTitle className="text-xl">Crypto as a Safe Haven</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Examining Bitcoin's role during economic uncertainty
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Bitcoin and other cryptocurrencies have shown mixed responses to tariff announcements. While
                      sometimes acting as a safe haven during economic uncertainty, crypto markets can also experience
                      selloffs as investors move to traditional safe assets like gold and USD during severe market
                      stress.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Safe Haven Correlation:</span>
                        <span className="text-red-400 font-medium">Moderate</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-white mb-2">Crypto Market Behavior:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Volatility Spike", "Correlation Break", "Volume Increase", "Liquidity Shifts"].map(
                          (behavior) => (
                            <span key={behavior} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
                              {behavior}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-800 transition-colors duration-300 relative scan-effect">
                  <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>
                  <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-red-600 shadow-[0_0_5px_2px_rgba(220,38,38,0.5)]"></div>

                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <BarChart3 className="h-5 w-5 text-red-500 mr-2" />
                      <CardTitle className="text-xl">Crypto-Tariff Correlation</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Statistical relationship between tariff announcements and crypto prices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Analysis of major tariff announcements since 2018 shows that Bitcoin has a -0.32 correlation with
                      major tariff announcements in the first 24 hours, but this often reverses in the following week as
                      market participants reassess the long-term implications.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Initial Price Impact:</span>
                        <span className="text-red-400 font-medium">Negative</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-white mb-2">Most Affected Cryptocurrencies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Bitcoin", "Ethereum", "Solana", "BNB"].map((crypto) => (
                          <span key={crypto} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
                            {crypto}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

