"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Clock, 
  Check, 
  AlertCircle, 
  Calendar,
  ArrowRight,
  MessageSquare
} from "lucide-react"

interface ProjectStatusProps {
  value: number
  status: 'on-track' | 'at-risk' | 'delayed'
}

function ProjectStatus({ value, status }: ProjectStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'on-track':
        return 'text-green-600'
      case 'at-risk':
        return 'text-alioshaYellow'
      case 'delayed':
        return 'text-alioshaRed'
      default:
        return 'text-alioshaGrayDark'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'on-track':
        return <Check className="h-5 w-5" />
      case 'at-risk':
        return <AlertCircle className="h-5 w-5" />
      case 'delayed':
        return <Clock className="h-5 w-5" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'on-track':
        return 'En tiempo'
      case 'at-risk':
        return 'En riesgo'
      case 'delayed':
        return 'Retrasado'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Progreso General</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
      <div className={`flex items-center gap-2 text-sm ${getStatusColor()}`}>
        {getStatusIcon()}
        <span>{getStatusText()}</span>
      </div>
    </div>
  )
}

interface RecentUpdateProps {
  title: string
  date: string
  status: 'pending' | 'in-review' | 'approved'
  hasComments: boolean
}

function RecentUpdate({ title, date, status, hasComments }: RecentUpdateProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs bg-alioshaGrayLight text-white">Pendiente</span>
      case 'in-review':
        return <span className="px-2 py-1 text-xs bg-alioshaYellow text-white">En Revisión</span>
      case 'approved':
        return <span className="px-2 py-1 text-xs bg-green-600 text-white">Aprobado</span>
      default:
        return null
    }
  }

  return (
    <div className="border border-black p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        {getStatusBadge()}
      </div>
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{date}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          {hasComments && (
            <div className="flex items-center text-xs text-alioshaBlue">
              <MessageSquare className="h-3 w-3 mr-1" />
              <span>Comentarios nuevos</span>
            </div>
          )}
        </div>
        <Link href="/dashboard/updates">
          <Button variant="outline" size="sm" className="text-xs">
            Ver Detalle
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function DashboardOverview() {
  // En un escenario real, estos datos vendrían de una API
  const projectDetails = {
    name: "Dashboard de Clientes",
    progress: 68,
    status: 'on-track' as const,
    startDate: "15 Feb 2025",
    endDate: "30 Jun 2025",
    nextDelivery: "20 May 2025",
    recentUpdates: [
      {
        id: 1,
        title: "Diseño de UI Login y Dashboard",
        date: "1 May 2025",
        status: 'approved' as const,
        hasComments: false,
      },
      {
        id: 2,
        title: "Implementación de autenticación",
        date: "5 May 2025",
        status: 'in-review' as const,
        hasComments: true,
      },
      {
        id: 3,
        title: "Vista de listado de actualizaciones",
        date: "8 May 2025",
        status: 'pending' as const,
        hasComments: false,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{projectDetails.name}</h1>
          <p className="text-sm text-gray-500">
            Periodo: {projectDetails.startDate} - {projectDetails.endDate}
          </p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Contactar Project Manager
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-black p-4 col-span-1 md:col-span-2">
          <h2 className="text-lg font-medium mb-4">Estado del Proyecto</h2>
          <ProjectStatus 
            value={projectDetails.progress} 
            status={projectDetails.status} 
          />
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium mb-2">Próxima Entrega</h3>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-alioshaBlue" />
              <span>{projectDetails.nextDelivery}</span>
            </div>
          </div>
        </Card>

        <Card className="border border-black p-4">
          <h2 className="text-lg font-medium mb-4">Etapas</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Análisis</span>
              <span className="text-sm font-medium">100%</span>
            </div>
            <Progress value={100} className="h-1" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Diseño</span>
              <span className="text-sm font-medium">100%</span>
            </div>
            <Progress value={100} className="h-1" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Desarrollo</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <Progress value={65} className="h-1" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Pruebas</span>
              <span className="text-sm font-medium">20%</span>
            </div>
            <Progress value={20} className="h-1" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Despliegue</span>
              <span className="text-sm font-medium">0%</span>
            </div>
            <Progress value={0} className="h-1" />
          </div>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Últimas Actualizaciones</h2>
          <Link href="/dashboard/updates">
            <Button variant="outline" size="sm">
              Ver Todas
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div>
          {projectDetails.recentUpdates.map((update) => (
            <RecentUpdate
              key={update.id}
              title={update.title}
              date={update.date}
              status={update.status}
              hasComments={update.hasComments}
            />
          ))}
        </div>
      </div>
    </div>
  )
}