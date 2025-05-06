import { Aldrich, Oxanium } from "next/font/google"

// Using Aldrich for headings
export const aldrich = Aldrich({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-aldrich",
  display: "swap",
})

// Using Oxanium for body text
// Note: Using local font as a fallback since we're importing via CSS
export const oxanium = Oxanium({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-aldrich",
  display: "swap",
})

