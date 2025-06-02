"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Paperclip,
  Send,
  User,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Tipos para las actualizaciones y comentarios
interface Comment {
  id: number
  author: string
  role: 'client' | 'team'
  content: string
  timestamp: string
}

interface Update {
  id: number
  title: string
  date: string
  description: string
  imageUrl?: string
  status: 'pending' | 'in-review' | 'approved'
  comments: Comment[]
}

interface UpdatesListProps {
  limit?: number | null
  showSearch?: boolean
  title?: string
  showDescription?: boolean
}

// Componente para un comentario individual
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className={`flex gap-3 mb-4 ${comment.role === 'team' ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      <div className={`flex-1 p-3 rounded-lg ${
        comment.role === 'team' ? 'bg-alioshaBlue text-white' : 'bg-gray-100'
      }`}>
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium">{comment.author}</span>
          <span className="text-xs opacity-75">{comment.timestamp}</span>
        </div>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  )
}

// Componente para la sección de comentarios
function CommentSection({ updateId, comments }: { updateId: number; comments: Comment[] }) {
  const [newComment, setNewComment] = useState("")
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    // Aquí iría la lógica para enviar el comentario a la API
    console.log(`Comentario enviado para actualización ${updateId}:`, newComment)
    
    // Limpiar el campo después de enviar
    setNewComment("")
  }
  
  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h4 className="text-sm font-medium mb-3">Comentarios</h4>
      
      <div className="mb-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No hay comentarios aún</p>
        )}
      </div>
      
      <form onSubmit={handleSubmitComment}>
        <div className="flex gap-2">
          <Textarea
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-24 resize-none border-black rounded-lg"
          />
        </div>
        <div className="flex justify-between mt-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            className="text-gray-500"
          >
            <Paperclip className="h-4 w-4 mr-1" />
            Adjuntar
          </Button>
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

// Componente para una actualización individual
function UpdateItem({ update }: { update: Update }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getStatusBadge = () => {
    switch (update.status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs bg-alioshaGrayLight text-white rounded-md">Pendiente</span>
      case 'in-review':
        return <span className="px-2 py-1 text-xs bg-alioshaYellow text-white rounded-md">En Revisión</span>
      case 'approved':
        return <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-md">Aprobado</span>
      default:
        return null
    }
  }
  
  return (
    <div className="border border-black p-4 mb-6 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{update.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{update.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          <p className="text-sm mb-4">{update.description}</p>
          
          {update.imageUrl && (
            <div className="mt-4 mb-4">
              <Image
                src={update.imageUrl}
                alt={update.title}
                width={600}
                height={400}
                className="border border-gray-200 rounded-lg"
                style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
          )}
          
          <CommentSection
            updateId={update.id}
            comments={update.comments}
          />
        </div>
      )}
      
      {!isExpanded && update.comments.length > 0 && (
        <div 
          className="flex items-center text-xs text-alioshaBlue mt-2 cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <MessageSquare className="h-3 w-3 mr-1" />
          <span>{update.comments.length} comentario{update.comments.length !== 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  )
}

// Componente principal para la lista de actualizaciones
export default function UpdatesList({ 
  limit = null, 
  showSearch = true, 
  title = "Actualizaciones del Proyecto",
  showDescription = true 
}: UpdatesListProps) {
  // Datos mock para las actualizaciones
  const updates: Update[] = [
    {
      id: 1,
      title: "Diseño de UI Login y Dashboard",
      date: "1 May 2025",
      description: "Se ha completado el diseño de la interfaz de usuario para la página de login y el dashboard principal. El diseño sigue los lineamientos de la marca Aliosha System, utilizando componentes reutilizables y manteniendo la coherencia visual en toda la aplicación.",
      imageUrl: "/ejemplologin.png",
      status: 'approved',
      comments: [
        {
          id: 1,
          author: "Gabriel Gutiérrez",
          role: 'team',
          content: "Hemos terminado el diseño de las interfaces principales. Por favor revísalo y dinos si tienes algún comentario.",
          timestamp: "1 May, 15:30"
        },
        {
          id: 2,
          author: "Cliente",
          role: 'client',
          content: "Me gusta mucho el diseño, especialmente los colores y la disposición. Aprobado.",
          timestamp: "1 May, 18:45"
        }
      ]
    },
    {
      id: 2,
      title: "Implementación de autenticación",
      date: "5 May 2025",
      description: "Se ha implementado el sistema de autenticación para el portal de clientes. Incluye login con email y contraseña, recuperación de contraseña y mantenimiento de sesión. La autenticación utiliza JWT para mantener las sesiones seguras.",
      status: 'in-review',
      comments: [
        {
          id: 3,
          author: "Gabriel Gutiérrez",
          role: 'team',
          content: "Hemos completado la autenticación del sistema. Por favor, prueba el inicio de sesión y dinos si funciona correctamente en tu entorno.",
          timestamp: "5 May, 10:15"
        },
        {
          id: 4,
          author: "Cliente",
          role: 'client',
          content: "He probado el login y funciona bien, pero tuve problemas con la recuperación de contraseña. No recibí el correo electrónico.",
          timestamp: "5 May, 14:20"
        },
        {
          id: 5,
          author: "Gabriel Gutiérrez",
          role: 'team',
          content: "Gracias por informarnos. Revisaremos el sistema de envío de correos y lo solucionaremos pronto.",
          timestamp: "6 May, 09:05"
        }
      ]
    },
    {
      id: 3,
      title: "Vista de listado de actualizaciones",
      date: "8 May 2025",
      description: "Se ha desarrollado la vista de actualizaciones del proyecto, que muestra todas las entregas realizadas, su estado, y permite añadir comentarios a cada actualización. También incluye la visualización de imágenes adjuntas.",
      imageUrl: "/dashboardejemplo.png",
      status: 'pending',
      comments: []
    }
  ]

  // Filtrar actualizaciones según el límite
  const displayedUpdates = limit ? updates.slice(0, limit) : updates;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          {showDescription && (
            <p className="text-sm text-gray-500">
              Revisa las actualizaciones recientes de tu proyecto y deja tus comentarios
            </p>
          )}
        </div>
        {limit && (
          <Link href="/dashboard/updates">
            <Button variant="default" size="sm">
              Ver Todas
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>

      {showSearch && (
        <div className="mb-6">
          <Input
            placeholder="Buscar actualizaciones..."
            className="border-black rounded-lg"
          />
        </div>
      )}

      <div>
        {displayedUpdates.map(update => (
          <UpdateItem key={update.id} update={update} />
        ))}
      </div>
    </div>
  )
}