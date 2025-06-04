/**
 * Modelo de Usuario tal como existe en la base de datos
 */
export interface User {
  ID_USUARIO: number;
  NOMBRE_USUARIO: string | null;
  APELLIDOS: string | null;
  EMAIL: string | null;
  TELEFONO: string | null;
  FECHA_NACIMIENTO: string | null; // timestamp como ISO string
  PASSWORD_HASH: string | null;
  TIPO_USUARIO: string | null;
  ID_STATUS: number | null;
  NOTIFICACIONES: boolean | null;
  FECHA_ALTA: string | null;
  PUESTO: string | null;
  IMAGEN_USUARIO_URL: string | null;
  CIUDAD: string | null;
  PAIS: string | null;
}

/**
 * Modelo de Usuario para el frontend (formato simplificado)
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  avatar: string;
  joinDate: string;
}