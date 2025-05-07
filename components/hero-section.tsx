"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"
import ServicesCarousel from "@/components/services"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-lightBackground pt-10 pb-28">
      {/* Background Grid */}
      <div className="absolute inset-0 z-10">
        <InteractiveGridPattern
          className="opacity-60 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(1400px_circle_at_center,transparent,white)]"
          squaresClassName="stroke-gray-800/30 hover:fill-alioshaBlue"
        />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 md:px-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/mainLogo.png"
            alt="Aliosha System Logo"
            width={200}
            height={200}
            className="z-20"
          />
        </div>
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="mb-6 text-5xl md:text-6xl leading-tight tracking-tight">Aliosha System</h1>
          <p className="mb-10 text-xl">
            Building blocks. Streamlined, secure, and designed for maximum efficiency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="z-15">
              <Button size="lg">
                CONTACT US
              </Button>
            </Link>
            <Link href="/contact" className="z-15">
              <Button size="lg" variant={"yellow"}>
                PORTAFOLIO
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Section */}
        <ServicesCarousel />
        
      </div>
    </section>
  )
}