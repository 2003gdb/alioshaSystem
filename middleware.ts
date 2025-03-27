import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const locales = ["en", "es"]
export const defaultLocale = "en"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocaleFromRequest(request) || defaultLocale

  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url))
}

function getLocaleFromRequest(request: NextRequest): string | undefined {
  // Check for Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].trim().split(";")[0].toLowerCase().substring(0, 2)

    if (locales.includes(preferredLocale)) {
      return preferredLocale
    }
  }

  return undefined
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

