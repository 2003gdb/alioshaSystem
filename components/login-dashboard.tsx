"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { createClient } from '@/lib/supabase/client'

export default function LoginDashboard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        setSuccess("Login exitoso. Redirigiendo...")
        console.log('Login successful:', data.user.email)
        
        const redirectTo = searchParams.get('redirect') || '/dashboard'
        console.log('Redirecting to:', redirectTo)
        
        setTimeout(() => {
          router.push(redirectTo)
          router.refresh()
        }, 1000)
      }
    } catch (error) {
      console.error('Error en login:', error)
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        setError(error.message)
        setIsLoading(false)
      }
      // No need to set loading to false here as the page will redirect
    } catch (error) {
      console.error('Error en login con Google:', error)
      setError('Error al iniciar sesión con Google.')
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-alioshaWhite flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-10">
        <InteractiveGridPattern
          className="sm:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-20 w-full max-w-md mx-4">
        <div className="bg-white border border-black rounded-none p-8 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/mainLogo.png"
              alt="Aliosha System Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-alioshaBlack mb-2">
              Dashboard Login
            </h1>
            <p className="text-alioshaGrayLight text-sm">
              Accede al panel de administración
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-alioshaRed/10 border border-alioshaRed/30 rounded-none flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-alioshaRed flex-shrink-0" />
              <span className="text-sm text-alioshaRed">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-none flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}

          {/* Google Login Button */}
          <div className="mb-6">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-alioshaBlack border border-gray-300 font-medium py-2 px-4 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Iniciando...' : 'Continuar con Google'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-alioshaGrayLight">O continúa con email</span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium text-alioshaBlack">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-none bg-white text-alioshaBlack placeholder:text-alioshaGrayLight focus:border-alioshaBlue focus:ring-1 focus:ring-alioshaBlue"
                placeholder="Ingresa tu email"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium text-alioshaBlack">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-none bg-white text-alioshaBlack placeholder:text-alioshaGrayLight focus:border-alioshaBlue focus:ring-1 focus:ring-alioshaBlue"
                  placeholder="Ingresa tu contraseña"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-alioshaGrayLight hover:text-alioshaBlack transition-colors disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-alioshaBlue hover:bg-alioshaBlue/90 text-white font-medium py-2 px-4 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Iniciando sesión...
                </div>
              ) : (
                "INICIAR SESIÓN"
              )}
            </Button>
          </form>

          {/* Helper Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-alioshaGrayLight">
              ¿No tienes cuenta? <span className="font-medium text-alioshaBlack cursor-pointer hover:text-alioshaBlue transition-colors">Contacta al administrador</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-alioshaGrayLight">
            © 2025 Aliosha System. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}