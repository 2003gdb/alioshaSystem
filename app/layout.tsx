import type React from "react"
import { aldrich, oxanium } from "./fonts"
import "@/styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aliosha System",
  description: "Building blocks. Streamlined, secure, and designed for maximum efficiency."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${aldrich.variable} ${oxanium.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Aldrich:700|Oxanium:400" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
