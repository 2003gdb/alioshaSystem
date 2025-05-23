"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Clock, 
  FileText, 
  MessageSquare, 
  User, 
  LogOut,
  Menu,
  X,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Actualizaciones",
      href: "/dashboard/updates",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      label: "Documentos",
      href: "/dashboard/documents",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "Mensajes",
      href: "/dashboard/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Perfil",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-lightBackground flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-black h-16 flex items-center px-4 md:px-6">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button className="md:hidden" onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image 
                src="/mainLogo.png" 
                alt="Aliosha System" 
                width={40} 
                height={40} 
              />
              <span className="text-alioshaBlack font-medium hidden sm:inline">
                Aliosha System
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">Cliente</div>
              <div className="text-xs text-gray-500">cliente@ejemplo.com</div>
            </div>
            
            <Button variant="ghost" size="icon">
              <Link href="/login">
                <LogOut className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black/30" onClick={toggleSidebar}></div>
            <nav className="fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-black p-4 pt-16 overflow-y-auto">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-none transition-colors
                      ${pathname === item.href ? 'bg-alioshaBlue text-white' : 'hover:bg-gray-100'}`}
                    onClick={toggleSidebar}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="px-3 py-2">
                  <h4 className="text-sm font-medium">Proyecto Actual</h4>
                  <p className="text-sm">Dashboard de Clientes</p>
                </div>
                
                <div className="px-3 py-2">
                  <h4 className="text-sm font-medium">Project Manager</h4>
                  <p className="text-sm">Gabriel Gutiérrez</p>
                  <p className="text-xs text-alioshaBlue">alejandro@aliosha.com</p>
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <nav className="hidden md:block w-64 border-r border-black bg-white p-4">
          <div className="space-y-1 mt-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-none transition-colors
                  ${pathname === item.href ? 'bg-alioshaBlue text-white' : 'hover:bg-gray-100'}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="px-3 py-2">
              <h4 className="text-sm font-medium">Proyecto Actual</h4>
              <p className="text-sm">Dashboard de Clientes</p>
            </div>
            
            <div className="px-3 py-2">
              <h4 className="text-sm font-medium">Project Manager</h4>
              <p className="text-sm">Gabriel Gutiérrez</p>
              <p className="text-xs text-alioshaBlue">alejandro@aliosha.com</p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}