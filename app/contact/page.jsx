"use client";
import { useState } from "react";
import { Mail, Phone, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error: "Todos los campos son obligatorios"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        loading: false,
        success: false,
        error: "Por favor, introduce un correo electrónico válido"
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar el mensaje");
      }

      setStatus({
        loading: false,
        success: true,
        error: null
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.message
      });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-950 py-20">
      <div className="container mx-auto px-4 py-0 relative z-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4 text-white">Ponte en Contacto</h2>
          <p className="text-xl text-gray-400">
            ¿Listo para discutir tu proyecto? Contáctanos y creemos algo increíble juntos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-700 p-8 bg-gray-900 text-gray-400">
            <h3 className="text-2xl font-medium mb-8 text-white">Información de Contacto</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Correo Electrónico</h4>
                  <a href="mailto:contacto@alioshasystem.com" className="hover:underline text-gray-400">
                    contacto@alioshasystem.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Teléfono</h4>
                  <a href="tel:+524433381082" className="hover:underline text-gray-400">
                    +52 (443) 338-1082
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Ubicación</h4>
                  <p className="text-gray-400">
                    Ciudad de Mexico, CDMX<br />
                    Mexico
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 border border-gray-700 p-8 bg-gray-900">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-400">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-400">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Tu correo electrónico"
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-400">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Asunto"
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-400">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tu mensaje"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
                />
              </div>

              {status.error && (
                <div className="p-4 border border-red-700 bg-red-900 text-red-200">
                  {status.error}
                </div>
              )}

              {status.success && (
                <div className="p-4 border border-green-700 bg-green-900 text-green-200">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status.loading}
                className="w-full h-12 px-8 bg-black text-white font-medium transition-colors duration-300 hover:bg-white/50 hover:text-black disabled:bg-gray-700 disabled:text-gray-400"
              >
                {status.loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Enviar Mensaje
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
