import HeroSection from "@/components/landing-page/hero-section"
import Navbar from "@/components/ui/Navbar"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"

export default function Home() {
  return (
    <main>
      <div className="absolute inset-0 z-10">
        <InteractiveGridPattern
          className="opacity-60 [mask-image:radial-gradient(400px_circle_at_center,transparent,white)] sm:[mask-image:radial-gradient(600px_circle_at_center,transparent,white)]"
        />
      </div>
      <Navbar />
      <HeroSection />
    </main>
  )
}
