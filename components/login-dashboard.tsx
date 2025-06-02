"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

export default function LoginDashboard() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (username === "user" && password === "") {
      // Successful login - redirect to dashboard
      console.log("Login successful")
      router.push('/dashboard')
    } else {
      setError("Credenciales inválidas. Usuario: 'user', Contraseña: vacía")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-alioshaWhite flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <InteractiveGridPattern
          className="opacity-50"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-20 w-full max-w-md mx-4 z-10">
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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-medium text-alioshaBlack">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-none bg-white text-alioshaBlack placeholder:text-alioshaGrayLight focus:border-alioshaBlue focus:ring-1 focus:ring-alioshaBlue"
                placeholder="Ingresa tu usuario"
                required
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-alioshaGrayLight hover:text-alioshaBlack transition-colors"
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
              Demo: Usuario <span className="font-medium text-alioshaBlack">'user'</span>, 
              Contraseña <span className="font-medium text-alioshaBlack">vacía</span>
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