// middleware.ts - Actualizado para Supabase Auth
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClientForMiddleware } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = await createClientForMiddleware(request)
  
  const pathname = request.nextUrl.pathname
  console.log('Middleware - Path:', pathname)

  // Rutas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/profile']
  
  // Verificar si la ruta actual está protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Obtener usuario autenticado
  const { data: { user }, error } = await supabase.auth.getUser()
  
  console.log('Middleware - User:', user ? `Authenticated: ${user.email}` : 'Not authenticated')
  if (error) console.log('Middleware - Auth error:', error.message)

  if (isProtectedRoute) {
    if (!user) {
      console.log('Middleware - Redirecting to login from protected route')
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    } else {
      console.log('Middleware - Access granted to protected route')
    }
  }

  // Si el usuario está autenticado y trata de acceder a login, redirigir al dashboard
  if (pathname === '/login' && user) {
    console.log('Middleware - Authenticated user trying to access login, redirecting to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|mainLogo.png|apple-touch-icon.png).*)',
  ],
}