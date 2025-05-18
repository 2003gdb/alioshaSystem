import HeroSection from "@/components/landing-page/hero-section"
import Navbar from "@/components/ui/Navbar"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"

export default function Home() {
  return (
    <main>
      <div className="absolute inset-0 z-10">
        <InteractiveGridPattern
          className="opacity-60 [mask-image:radial-gradient(1400px_circle_at_center,transparent,white)]"
          squaresClassName="stroke-gray-800/30 hover:fill-alioshaBlue"
        />
      </div>
      <Navbar />
      <HeroSection />
    </main>
  )
}
