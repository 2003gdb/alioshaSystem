"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface MobileMenuProps {
  items: { label: string; href: string }[]
  lang: string
}

export default function MobileMenu({ items, lang }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="text-brand-dark hover:bg-purple-100/50 relative z-[60] md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-3/4 md:w-2/5">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center text-brand-dark">
            <img src="/images/logo.png" alt="Logo" className="h-8 mr-2" />
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {items.map((item, index) => (
            <Link href={`/${lang}${item.href}`} key={index}>
              <Button
                variant="ghost"
                className="w-full justify-start text-brand-dark hover:text-purple-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

