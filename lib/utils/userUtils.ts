import { User, UserProfile } from '../models/User'

/**
 * Convierte un usuario de la base de datos al formato del frontend
 */
export function mapDatabaseUserToFrontend(dbUser: User): UserProfile {
  return {
    id: dbUser.ID_USUARIO.toString(),
    name: `${dbUser.NOMBRE_USUARIO || ''} ${dbUser.APELLIDOS || ''}`.trim() || 'Sin nombre',
    email: dbUser.EMAIL || 'sin@email.com',
    phone: dbUser.TELEFONO || 'Sin teléfono',
    position: dbUser.PUESTO || 'Sin puesto',
    department: dbUser.TIPO_USUARIO || 'Sin departamento',
    location: `${dbUser.CIUDAD || ''}, ${dbUser.PAIS || ''}`.replace(', ', '').trim() || 'Sin ubicación',
    avatar: dbUser.IMAGEN_USUARIO_URL || '/api/placeholder/150/150',
    joinDate: dbUser.FECHA_ALTA || new Date().toISOString(),
  }
}

/**
 * Convierte datos del frontend al formato de la base de datos para updates
 */
export function mapFrontendUserToDatabase(frontendUser: Partial<UserProfile>) {
  const updates: Partial<User> = {}
  
  if (frontendUser.name) {
    const nameParts = frontendUser.name.split(' ')
    updates.NOMBRE_USUARIO = nameParts[0] || null
    updates.APELLIDOS = nameParts.slice(1).join(' ') || null
  }
  
  if (frontendUser.email) updates.EMAIL = frontendUser.email
  if (frontendUser.phone) updates.TELEFONO = frontendUser.phone
  if (frontendUser.position) updates.PUESTO = frontendUser.position
  if (frontendUser.department) updates.TIPO_USUARIO = frontendUser.department
  if (frontendUser.avatar) updates.IMAGEN_USUARIO_URL = frontendUser.avatar
  
  return updates
}