"use client"
import { Button } from "@/components/ui/button"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"
import ServicesCarousel from "@/components/services" 

export default function SoftwareHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-10">
        <InteractiveGridPattern
          className="opacity-60 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
          squaresClassName="stroke-gray-800/30 hover:fill-blue-300"
        />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 leading-tight tracking-wide">Aliosha System</h1>
          <p className="mb-10 text-xl text-muted-foreground">
            Building blocks. Streamlined, secure, and designed for
            maximum efficiency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="z-10 h-12 px-8 bg-black text-white hover:bg-gray-900 border border-gray-800">
              DOWNLOAD
            </Button>
            <Button size="lg" variant="outline" className="z-10 h-12 px-8 border-gray-800 hover:bg-gray-100">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>

      {/* Services Carousel - replacing the Feature highlights */}
      <ServicesCarousel />

      {/* Tech specs indicator */}
      <div className="container relative mx-auto mt-20 px-4 md:px-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 border border-gray-800 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <small className="uppercase tracking-wider">System Status: Operational</small>
          </div>
        </div>
      </div>
    </section>
  )
}