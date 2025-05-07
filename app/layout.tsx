import type React from "react"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Aldrich } from "next/font/google"

// Using Aldrich for headings
export const aldrich = Aldrich({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-aldrich",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Aliosha System",
  description: "Building blocks. Streamlined, secure, and designed for maximum efficiency.",
  icons: {
    icon: "/mainLogo.png", 
    apple: "/apple-touch-icon.png", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${aldrich.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Aldrich:700" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
