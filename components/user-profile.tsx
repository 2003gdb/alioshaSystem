"use client";
import { useState } from "react";
import { Edit2, Save, X, User, Mail, Phone, MapPin, Briefcase, Calendar, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Mock data - replace with actual API calls
const mockUserData = {
  id: "1",
  name: "Carlos Galvez",
  email: "carlos.galvez@examplee.com",
  phone: "+52 55 1234 5678",
  position: "Senior Developer",
  department: "Tecnología",
  location: "Ciudad de México, México",
  joinDate: "2023-03-15",
  avatar: "/carlos.png"
};

// API functions - replace with actual implementations
const userAPI = {
  async getUser(id: string) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUserData), 500);
    });
  },
  
  async updateUser(id: string, data: any) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockUserData, ...data }), 500);
    });
  },
  
  async uploadAvatar(id: string, file: File): Promise<string> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve("/api/placeholder/150/150"), 1000);
    });
  }
};

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
  const [userData, setUserData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleFieldSave = async (field: string, value: string) => {
    setIsLoading(true);
    try {
      const updatedUser = await userAPI.updateUser(userData.id, { [field]: value });
      setUserData(prev => ({ ...prev, [field]: value }));
    } catch (error) {
      console.error("Error updating user:", error);
      // Here you would typically show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatarUploading(true);
    try {
      const newAvatarUrl = await userAPI.uploadAvatar(userData.id, file) as string;
      setUserData(prev => ({ ...prev, avatar: newAvatarUrl }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setAvatarUploading(false);
    }
  };

  const userFields = [
    { label: "Nombre Completo", field: "name", value: userData.name, icon: <User className="h-5 w-5 text-gray-600" /> },
    { label: "Correo Electrónico", field: "email", value: userData.email, icon: <Mail className="h-5 w-5 text-gray-600" /> },
    { label: "Teléfono", field: "phone", value: userData.phone, icon: <Phone className="h-5 w-5 text-gray-600" /> },
    { label: "Posición", field: "position", value: userData.position, icon: <Briefcase className="h-5 w-5 text-gray-600" /> },
    { label: "Departamento", field: "department", value: userData.department, icon: <Briefcase className="h-5 w-5 text-gray-600" /> },
    { label: "Ubicación", field: "location", value: userData.location, icon: <MapPin className="h-5 w-5 text-gray-600" /> },
  ];

  return (
    <div className="min-h-screen bg-alioshaWhite">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button className="bg-alioshaBlue hover:bg-blue-700">
            Cambiar Contraseña
          </Button>
        </div>
      </div>
    </div>
  );
}