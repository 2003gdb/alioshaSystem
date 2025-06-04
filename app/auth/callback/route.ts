// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // DEBUGGING: Log everything first
  console.log('=== AUTH CALLBACK CALLED ===')
  console.log('Request URL:', request.url)
  console.log('Request method:', request.method)
  console.log('Headers:', Object.fromEntries(request.headers.entries()))
  
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin
  const error = requestUrl.searchParams.get('error')
  const state = requestUrl.searchParams.get('state')

  console.log('URL Parameters:', { 
    code: code ? 'EXISTS' : 'MISSING', 
    error, 
    state,
    origin,
    fullSearchParams: requestUrl.searchParams.toString()
  })

  // Si hay error en OAuth
  if (error) {
    console.error('OAuth error detected:', error)
    return NextResponse.redirect(`${origin}/login?error=oauth_error&message=${encodeURIComponent(error)}`)
  }

  if (code) {
    console.log('Code found, attempting to exchange for session...')
    
    try {
      const supabase = await createClient()
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Exchange error:', exchangeError)
        return NextResponse.redirect(`${origin}/login?error=auth_callback_error&message=${encodeURIComponent(exchangeError.message)}`)
      }

      if (data.user) {
        console.log('Session exchange successful!')
        console.log('User ID:', data.user.id)
        console.log('User email:', data.user.email)
        
        // Crear respuesta de redirección
        const response = NextResponse.redirect(`${origin}/dashboard`)
        console.log('Redirecting to dashboard...')
        return response
      } else {
        console.error('No user data received after session exchange')
        return NextResponse.redirect(`${origin}/login?error=no_user_data`)
      }
    } catch (error) {
      console.error('Unexpected error during session exchange:', error)
      return NextResponse.redirect(`${origin}/login?error=unexpected_error&message=${encodeURIComponent(String(error))}`)
    }
  }

  // Si no hay código
  console.log('No code parameter found, redirecting to login')
  return NextResponse.redirect(`${origin}/login?error=no_code`)
}

// Agregar método POST por si acaso
export async function POST(request: NextRequest) {
  console.log('POST request received at callback, redirecting to GET')
  return GET(request)
}