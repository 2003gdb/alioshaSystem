"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageSwitcher({
  currentLang,
  label,
}: {
  currentLang: string
  label: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = () => {
    const currentLocale = currentLang
    const newLocale = currentLocale === "en" ? "es" : "en"

    // Get the path without the locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "")

    // Navigate to the new locale path
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <Button
      onClick={handleLanguageChange}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 bg-white/80 text-brand-dark border-purple-200 hover:bg-purple-50 hover:text-purple-700"
    >
      <Globe size={16} />
      {label}
    </Button>
  )
}

