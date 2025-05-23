"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Valida campos
    if (!email || !password) {
      setError('Por favor complete todos los campos')
      return
    }
    
    // En una implementación real, aquí iría la lógica de autenticación
    // Por ahora, para el MVP, simplemente redirigimos al dashboard
    try {
      // Simula una llamada a API con un pequeño retraso
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Redirige al dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Error al iniciar sesión. Intente nuevamente.')
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-lightBackground flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-10">
        <InteractiveGridPattern
          className="opacity-60 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(1400px_circle_at_center,transparent,white)]"
          squaresClassName="stroke-gray-800/30 hover:fill-alioshaBlue"
        />
      </div>

      {/* Login Form */}
      <div className="relative z-20 w-full max-w-md px-6 py-12 bg-white border border-black shadow-md mx-4">
        <div className="flex justify-center mb-8">
          <Image
            src="/mainLogo.png"
            alt="Aliosha System Logo"
            width={120}
            height={120}
            className="z-20"
          />
        </div>
        
        <h1 className="text-2xl text-center mb-8">Portal de Clientes</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black"
              />
            </div>
            
            {error && (
              <div className="text-alioshaRed text-sm mt-2">
                {error}
              </div>
            )}
            
            <div>
              <Button
                type="submit"
                className="w-full"
              >
                INICIAR SESIÓN
              </Button>
            </div>
            
            <div className="text-center">
              <a href="#" className="text-sm text-alioshaBlue hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}