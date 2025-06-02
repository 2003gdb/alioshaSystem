"use client";
import { useState } from "react";
import { Mail, Phone, Globe, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar"
import { FormInput, FormTextarea } from "@/components/ui/form-input";
import { BorderBeam } from "@/components/magicui/border-beam";

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
      setStatus({ loading: false, success: false, error: "Todos los campos son obligatorios" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ loading: false, success: false, error: "Correo electrónico inválido" });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al enviar el mensaje");

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-alioshaWhite px-05 py-10 md:py-20 md:px-30 text-alioshaBlack">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="text-center py-10">
          <h2 className="text-4xl font-semibold mb-2">Ponte en Contacto</h2>
          <p className="text-base text-alioshaBlack">Contáctanos para comenzar tu proyecto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-sm relative p-6 border border-alioshaGrayLight group hover:border-alioshaGrayLight/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
            <div className="space-y-6 text-sm">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3" />
                <p href="mailto:contacto@alioshasystem.com" className="hover:text-alioshaYellow">contacto@alioshasystem.com</p>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3" />
                <p href="tel:+524433381082" className="hover:text-alioshaYellow">+52 (443) 338-1082</p>
              </div>
              <div className="flex items-start">
                <Globe className="h-5 w-5 mr-3" />
                <p>Ciudad de México, CDMX<br />México</p>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
              <BorderBeam
                duration={4}
                size={400}
                className="from-transparent via-alioshaYellow to-transparent md:size-[500px]"
              />
            </div>
          </div>

          <div className="rounded-sm md:col-span-2 relative border border-alioshaGrayLight p-6 bg-white group hover:border-alioshaGrayLight/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Nombre"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  isFilled={!!formData.name}
                  variant="name"
                />
                <FormInput
                  label="Correo Electrónico"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Tu correo"
                  isFilled={!!formData.email}
                  variant="email"
                />
              </div>
              <FormInput
                label="Asunto"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Asunto"
                isFilled={!!formData.subject}
                customIcon={<FileText className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />}
              />
              <FormTextarea
                label="Mensaje"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tu mensaje"
                rows={5}
                isFilled={!!formData.message}
              />

              {status.error && (
                <div className="p-3 border border-red-500 bg-red-100 text-red-800">{status.error}</div>
              )}

              {status.success && (
                <div className="p-3 border border-green-500 bg-green-100 text-green-800">
                  ¡Mensaje enviado con éxito!
                </div>
              )}

              <Button
                type="submit"
                disabled={status.loading}
                size="lg"
                variant="default"
                hoverIcon={ArrowRight}
              >
                {status.loading ? (
                  <>
                    <svg className="animate-spin mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar Mensaje"
                )}
              </Button>
            </form>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
              <BorderBeam
                duration={4}
                size={400}
                className="from-transparent via-alioshaRed to-transparent md:size-[800px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}