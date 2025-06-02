"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Upload,
  Download,
  FileText,
  Image as ImageIcon,
  File,
  Trash2,
  Eye,
  Calendar,
  Search,
  Plus
} from "lucide-react"

// Tipos para los documentos
interface Document {
  id: number
  name: string
  type: 'pdf' | 'image' | 'document' | 'other'
  size: string
  uploadDate: string
  downloadUrl: string
  previewUrl?: string
}

// Componente para obtener el icono según el tipo de archivo
function getFileIcon(type: string, size: string = "h-8 w-8") {
  const mimeType = type.toLowerCase()
  
  if (mimeType.includes('pdf')) {
    return <FileText className={`${size} text-alioshaRed`} />
  } else if (mimeType.includes('image')) {
    return <ImageIcon className={`${size} text-alioshaBlue`} />
  } else if (mimeType.includes('doc') || mimeType.includes('txt')) {
    return <FileText className={`${size} text-alioshaYellow`} />
  } else {
    return <File className={`${size} text-alioshaBlack`} />
  }
}

// Componente para formatear el tamaño del archivo
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Componente para una tarjeta de documento individual
function DocumentCard({ document, onDelete, onDownload, onPreview }: {
  document: Document
  onDelete: (id: number) => void
  onDownload: (document: Document) => void
  onPreview: (document: Document) => void
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white hover:border-alioshaBlue hover:shadow-lg transition-all duration-200 aspect-square flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {getFileIcon(document.type, "h-8 w-8")}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate mb-1" title={document.name}>
              {document.name}
            </h3>
            <div className="text-xs text-gray-500">
              <span>{document.size}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <Button
            size="icon"
            onClick={() => onPreview(document)}
            className="h-7 w-7 bg-transparent hover:bg-gray-100 text-gray-700 hover:text-alioshaBlue border-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => onDownload(document)}
            className="h-7 w-7 bg-transparent hover:bg-gray-100 text-gray-700 hover:text-alioshaBlue border-0"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => onDelete(document.id)}
            className="h-7 w-7 bg-transparent hover:bg-red-50 text-gray-700 hover:text-alioshaRed border-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {document.previewUrl && document.type === 'image' ? (
        <div className="flex-1 mt-2">
          <img
            src={document.previewUrl}
            alt={document.name}
            className="w-full h-full object-cover rounded-lg border border-gray-100"
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-end mt-2">
          <div className="text-xs text-gray-400 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{document.uploadDate}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente principal para la gestión de documentos
export default function DocumentsManager() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Propuesta_Proyecto_Final.pdf",
      type: 'pdf',
      size: "2.4 MB",
      uploadDate: "15 May 2025",
      downloadUrl: "/documents/Calculo.gabriel.pdf",
    },
    {
      id: 2,
      name: "Inicio_Aliosha.png",
      type: 'image',
      size: "1.8 MB",
      uploadDate: "12 May 2025",
      downloadUrl: "/documents/wireframes.png",
      previewUrl: "/inicio_aliosha.png"
    },
    {
      id: 3,
      name: "Especificaciones_Tecnicas.docx",
      type: 'document',
      size: "890 KB",
      uploadDate: "10 May 2025",
      downloadUrl: "/documents/especificaciones.docx",
    },
    {
      id: 4,
      name: "Base_Datos_Schema.sql",
      type: 'other',
      size: "156 KB",
      uploadDate: "8 May 2025",
      downloadUrl: "/documents/schema.sql",
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filtrar documentos según el término de búsqueda
  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Función para manejar la subida de archivos
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      // Procesar cada archivo
      for (const file of Array.from(files)) {
        // Crear FormData para enviar al backend
        const formData = new FormData()
        formData.append('file', file)
        formData.append('projectId', '1') // ID del proyecto actual

        // TODO: Enviar al backend
        // const response = await fetch('/api/documents/upload', {
        //   method: 'POST',
        //   body: formData
        // })
        // const result = await response.json()

        // Por ahora, simular la subida y agregar al estado local
        const newDocument: Document = {
          id: Date.now() + Math.random(), // ID temporal
          name: file.name,
          type: getFileType(file.type),
          size: formatFileSize(file.size),
          uploadDate: new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          downloadUrl: URL.createObjectURL(file), // URL temporal
          previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        }

        setDocuments(prev => [newDocument, ...prev])
      }

      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

    } catch (error) {
      console.error('Error al subir archivo:', error)
      // TODO: Mostrar mensaje de error al usuario
    } finally {
      setIsUploading(false)
    }
  }

  // Función para determinar el tipo de archivo
  const getFileType = (mimeType: string): Document['type'] => {
    if (mimeType.includes('pdf')) return 'pdf'
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.includes('doc') || mimeType.includes('text')) return 'document'
    return 'other'
  }

  // Función para descargar un documento
  const handleDownload = async (document: Document) => {
    try {
      // TODO: Implementar descarga desde el backend
      // const response = await fetch(`/api/documents/download/${document.id}`)
      // const blob = await response.blob()
      // const url = window.URL.createObjectURL(blob)
      
      // Por ahora, usar la URL directa
      const link = window.document.createElement('a')
      link.href = document.downloadUrl
      link.download = document.name
      window.document.body.appendChild(link)
      link.click()
      window.document.body.removeChild(link)
    } catch (error) {
      console.error('Error al descargar archivo:', error)
    }
  }

  // Función para previsualizar un documento
  const handlePreview = (document: Document) => {
    // Abrir en nueva pestaña para previsualización
    window.open(document.downloadUrl, '_blank')
  }

  // Función para eliminar un documento
  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este documento?')) {
      return
    }

    try {
      // TODO: Eliminar del backend
      // await fetch(`/api/documents/delete/${id}`, { method: 'DELETE' })
      
      // Eliminar del estado local
      setDocuments(prev => prev.filter(doc => doc.id !== id))
    } catch (error) {
      console.error('Error al eliminar archivo:', error)
    }
  }

  // Función para preparar datos para enviar al backend
  const prepareBackendData = (document: Partial<Document>) => {
    return {
      name: document.name,
      type: document.type,
      size: document.size,
      projectId: 1, // ID del proyecto actual
      uploadedAt: new Date().toISOString(),
      // Agregar más campos según necesidades del backend
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-1">Gestión de Documentos</h1>
          <p className="text-sm text-gray-500">
            Sube, descarga y gestiona todos los documentos del proyecto
          </p>
        </div>
        
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.sql,.js,.ts,.json"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-alioshaBlue hover:bg-alioshaBlue/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isUploading ? 'Subiendo...' : 'Subir Documentos'}
          </Button>
        </div>
      </div>

      {/* Zona de arrastre para subir archivos */}
      <div 
        className="border-2 border-dashed border-gray-300 p-8 text-center bg-gray-50 hover:border-alioshaBlue hover:bg-alioshaBlue/5 transition-colors duration-200 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          e.currentTarget.classList.add('border-alioshaBlue', 'bg-alioshaBlue/10')
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.currentTarget.classList.remove('border-alioshaBlue', 'bg-alioshaBlue/10')
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.currentTarget.classList.remove('border-alioshaBlue', 'bg-alioshaBlue/10')
          const files = Array.from(e.dataTransfer.files)
          if (files.length > 0) {
            const mockEvent = {
              target: { files: e.dataTransfer.files }
            } as React.ChangeEvent<HTMLInputElement>
            handleFileUpload(mockEvent)
          }
        }}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
        <p className="text-sm text-gray-500">
          Soporta: PDF, DOC, DOCX, TXT, PNG, JPG, SQL, JS, TS, JSON
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar documentos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-black"
        />
      </div>

      {/* Lista de documentos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(document => (
            <DocumentCard
              key={document.id}
              document={document}
              onDelete={handleDelete}
              onDownload={handleDownload}
              onPreview={handlePreview}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-500 mb-2">
              {searchTerm ? 'No se encontraron documentos' : 'No hay documentos aún'}
            </p>
            <p className="text-sm text-gray-400">
              {searchTerm 
                ? 'Intenta con otro término de búsqueda' 
                : 'Sube tu primer documento para comenzar'
              }
            </p>
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{filteredDocuments.length} documento{filteredDocuments.length !== 1 ? 's' : ''}</span>
          <span>Última actualización: {new Date().toLocaleDateString('es-ES')}</span>
        </div>
      </div>
    </div>
  )
}