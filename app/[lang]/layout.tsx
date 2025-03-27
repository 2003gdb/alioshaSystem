import type React from "react"
import "../globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { getDictionary } from "@/dictionaries"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = getDictionary(params.lang)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

