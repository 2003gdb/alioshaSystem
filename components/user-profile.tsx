"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Edit2, 
  Save, 
  X, 
  Camera, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Briefcase, 
  MapPin, 
  Calendar 
} from "lucide-react";
import { UserService } from "@/lib/services/userService";
import { UserProfile as UserProfileType } from "@/lib/models/User";

console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'OK' : 'MISSING');
interface EditableFieldProps {
  label: string;
  value: string;
  field: string;
  icon: React.ReactNode;
  onSave: (field: string, value: string) => void;
  isLoading?: boolean;
}

function EditableField({ label, value, field, icon, onSave, isLoading }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  // Actualizar editValue cuando value cambie
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = async () => {
    if (editValue.trim() !== value) {
      await onSave(field, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="group rounded-none border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-400">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            {icon}
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {label}
            </label>
            {isEditing ? (
              <div className="mt-2 space-y-3">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-lg focus:border-alioshaBlue focus:outline-none focus:ring-0"
                  autoFocus
                />
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-alioshaBlue hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Guardar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-lg text-gray-900">{value}</p>
            )}
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-100 rounded-full"
            disabled={isLoading}
          >
            <Edit2 className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const user = await UserService.getCurrentUser();
      if (user) {
        setUserData(user);
      } else {
        setError("No se pudo cargar la información del usuario");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setError("Error al cargar los datos del usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldSave = async (field: string, value: string) => {
    if (!userData) return;

    setIsUpdating(true);
    try {
      const updatedUser = await UserService.updateUser(
        parseInt(userData.id), 
        { [field]: value }
      );
      
      if (updatedUser) {
        setUserData(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error al actualizar la información");
      // Aquí podrías mostrar un toast o notificación de error
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userData) return;

    setAvatarUploading(true);
    try {
      const newAvatarUrl = await UserService.uploadAvatar(parseInt(userData.id), file);
      setUserData(prev => prev ? { ...prev, avatar: newAvatarUrl } : null);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setError("Error al subir la imagen");
    } finally {
      setAvatarUploading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-alioshaWhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-alioshaBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !userData) {
    return (
      <div className="min-h-screen bg-alioshaWhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadUserData} className="bg-alioshaBlue hover:bg-blue-700">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-alioshaWhite flex items-center justify-center">
        <p className="text-gray-600">No se encontró información del usuario</p>
      </div>
    );
  }

  const userFields = [
    { 
      label: "Nombre Completo", 
      field: "name", 
      value: userData.name, 
      icon: <UserIcon className="h-5 w-5 text-gray-600" /> 
    },
    { 
      label: "Correo Electrónico", 
      field: "email", 
      value: userData.email, 
      icon: <Mail className="h-5 w-5 text-gray-600" /> 
    },
    { 
      label: "Teléfono", 
      field: "phone", 
      value: userData.phone, 
      icon: <Phone className="h-5 w-5 text-gray-600" /> 
    },
    { 
      label: "Posición", 
      field: "position", 
      value: userData.position, 
      icon: <Briefcase className="h-5 w-5 text-gray-600" /> 
    },
    { 
      label: "Tipo de Usuario", 
      field: "department", 
      value: userData.department, 
      icon: <Briefcase className="h-5 w-5 text-gray-600" /> 
    },
    { 
      label: "Ubicación", 
      field: "location", 
      value: userData.location, 
      icon: <MapPin className="h-5 w-5 text-gray-600" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-alioshaWhite">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Error banner */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-none">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="text-red-800 underline text-sm mt-1"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-alioshaBlack mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
        </div>

        {/* Avatar Section */}
        <div className="mb-8 rounded-none border border-gray-200 bg-white p-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-200">
                <Image
                  src={userData.avatar}
                  alt="Avatar del usuario"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={avatarUploading}
                />
              </label>
              {avatarUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-alioshaBlue"></div>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-alioshaBlack">{userData.name}</h2>
              <p className="text-gray-600">{userData.position}</p>
              <p className="text-sm text-gray-500 mt-1">
                <Calendar className="inline h-4 w-4 mr-1" />
                Miembro desde {new Date(userData.joinDate).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-alioshaBlack mb-4">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userFields.map((field) => (
              <EditableField
                key={field.field}
                label={field.label}
                value={field.value}
                field={field.field}
                icon={field.icon}
                onSave={handleFieldSave}
                isLoading={isUpdating}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button className="bg-alioshaBlue hover:bg-blue-700">
            Cambiar Contraseña
          </Button>
          <Button 
            onClick={loadUserData}
            disabled={isLoading}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
          >
            Recargar Datos
          </Button>
        </div>
      </div>
    </div>
  );
}