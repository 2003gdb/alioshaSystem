import { locales } from "@/middleware"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

