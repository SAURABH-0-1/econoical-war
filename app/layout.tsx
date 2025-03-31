import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Economical War | Real-time Tariff Tracking & Predictions",
  description:
    "Track global tariffs in real-time. Predict economic impacts. Vote on upcoming trade policies. The ultimate platform for tariff intelligence.",
  keywords: "tariffs, economic war, trade policy, market impact, predictions, Trump tariffs, global trade",
  authors: [{ name: "Economical War Team" }],
  openGraph: {
    title: "Economical War | Real-time Tariff Tracking",
    description: "Track global tariffs in real-time. Predict economic impacts. Vote on upcoming trade policies.",
    images: [{ url: "/images/site-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Economical War | $TARIFF",
    description: "The ultimate platform for tariff intelligence and market impact predictions.",
    images: ["/images/site-logo.png"],
  },
  icons: {
    icon: "/images/site-logo.png",
    apple: "/images/site-logo.png",
  },
  themeColor: "#dc2626",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'