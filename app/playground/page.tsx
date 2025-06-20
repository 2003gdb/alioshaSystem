"use client"

import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"

export default function PlaygroundPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-alioshaWhite">
      <InteractiveGridPattern
        className="absolute inset-0 w-full h-full opacity-100"
        width={150}
        height={150}
        squares={[20, 20]}
      />
    </main>
  )
}
