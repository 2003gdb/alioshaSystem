import { supabase } from '../supabase'
import { User, UserProfile } from '../models/User'
import { mapDatabaseUserToFrontend, mapFrontendUserToDatabase } from '../utils/userUtils'

export class UserService {
  
  /**
   * Obtiene un usuario por ID usando la función stored procedure
   */
  static async getUser(userId: number): Promise<UserProfile | null> {
    try {
      console.log('🔍 Intentando obtener usuario con ID:', userId);
      
      const { data, error } = await supabase
        .rpc('sp_get_user', { p_id_usuario: userId })

      console.log('📊 Respuesta de Supabase:', { data, error });

      if (error) {
        console.error('❌ Error de Supabase:', error);
        console.error('❌ Error completo:', JSON.stringify(error, null, 2));
        return null
      }

      if (!data || data.length === 0) {
        console.log('⚠️ No se encontraron datos para el usuario');
        return null
      }

      console.log('✅ Datos obtenidos:', data[0]);
      
      // La función retorna un array, tomamos el primer elemento
      const mappedUser = mapDatabaseUserToFrontend(data[0] as User);
      console.log('🔄 Usuario mapeado:', mappedUser);
      
      return mappedUser;
    } catch (error) {
      console.error('💥 Error inesperado:', error);
      return null
    }
  }

  /**
   * Actualiza un usuario
   */
  static async updateUser(userId: number, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const dbUpdates = mapFrontendUserToDatabase(updates)
      
      const { data, error } = await supabase
        .from('TM_USUARIOS')
        .update(dbUpdates)
        .eq('ID_USUARIO', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error)
        throw new Error('Error al actualizar usuario')
      }

      return mapDatabaseUserToFrontend(data as User)
    } catch (error) {
      console.error('Unexpected error updating user:', error)
      throw error
    }
  }

  /**
   * Sube una imagen de avatar (por ahora solo retorna URL placeholder)
   */
  static async uploadAvatar(userId: number, file: File): Promise<string> {
    try {
      // TODO: Implementar subida real de archivos a Supabase Storage
      // Por ahora retornamos placeholder
      
      // Simular delay de subida
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const avatarUrl = `/api/placeholder/150/150?t=${Date.now()}`
      
      // Actualizar URL en base de datos
      await supabase
        .from('TM_USUARIOS')
        .update({ IMAGEN_USUARIO_URL: avatarUrl })
        .eq('ID_USUARIO', userId)

      return avatarUrl
    } catch (error) {
      console.error('Error uploading avatar:', error)
      throw new Error('Error al subir imagen')
    }
  }

  /**
   * Obtiene el usuario actual (por ahora hardcodeado, después integrarás autenticación)
   */
  static async getCurrentUser(): Promise<UserProfile | null> {
    // TODO: Integrar con sistema de autenticación
    // Por ahora retornamos el usuario con ID 1
    return await this.getUser(1)
  }
}