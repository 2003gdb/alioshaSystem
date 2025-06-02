"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import ServicesCarousel from "@/components/landing-page/services"

export default function HeroSection() {
  return (
    <section className="w-full h-full relative overflow-hidden bg-alioshaWhite">
      <div className="container relative mx-auto flex flex-col p-6">
        <div className="flex-[0.6] mt-20" />
        <div className="flex justify-center">
          <Image
            src="/mainLogo.png"
            alt="Aliosha System Logo"
            width={200}
            height={200}
            className="z-20"
          />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className=" text-5xl md:text-6xl leading-tight tracking-tight">Aliosha System</h1>
          <p className="mb-10 text-xl">
            Building blocks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="z-15">
              <Button size="lg">
                CONTACT US
              </Button>
            </Link>
            <Link href="/portafolio" className="z-15">
              <Button size="lg" variant={"yellow"}>
                PORTAFOLIO
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1" />
      </div>
    </section>
  )
}