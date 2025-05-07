"use client";
import { useState } from "react";
import { Mail, Phone, Globe, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import your custom Button component

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

    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error: "Todos los campos son obligatorios"
      });
      return;
    }

    // Email validation
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

      // Success
      setStatus({
        loading: false,
        success: true,
        error: null
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      // Reset success message after 5 seconds
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
    // This uses the color defined by --background in your global CSS
    // Ensure --background is a dark color for the dark theme
    <section className="relative w-full min-h-screen bg-background py-20">
      {/* Placeholder for a potential background pattern like in the Hero */}
      {/* You would place your InteractiveGridPattern or similar component here */}
      {/* If bg-background is dark, ensure this pattern component is visible on it */}
      {/* <div className="absolute inset-0 z-10">
            <InteractiveGridPattern ... />
        </div> */}

      <div className="container mx-auto px-4 py-0 relative z-20"> {/* Added z-20 to ensure content is above pattern */}
        <div className="text-center mb-20">
          {/* Heading - text-foreground uses the color defined by --foreground */}
          {/* Ensure --foreground is a light color for the dark theme */}
          <h2 className="text-5xl font-bold mb-4 text-foreground">Ponte en Contacto</h2>
          {/* Paragraph - text-muted-foreground uses the color defined by --muted-foreground */}
          {/* Ensure --muted-foreground is a lighter text color for the dark theme */}
          <p className="text-xl text-muted-foreground">
            ¿Listo para discutir tu proyecto? Contáctanos y creemos algo increíble juntos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information Card */}
          {/* border-gray-800 needs to be defined as a dark gray in your tailwind.config.ts or global CSS */}
          {/* bg-background uses the color defined by --background */}
          <div className="border border-gray-800 p-8 bg-background text-muted-foreground"> {/* Default text color within the card */}
            {/* Heading - text-foreground uses the color defined by --foreground */}
            <h3 className="text-2xl font-medium mb-8 text-foreground">Información de Contacto</h3>

            <div className="space-y-8">
              <div className="flex items-start">
                 {/* Icon color uses text-foreground */}
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-foreground">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="ml-4">
                   {/* Heading - text-foreground */}
                  <h4 className="text-lg font-medium text-foreground">Correo Electrónico</h4>
                   {/* Link color uses text-muted-foreground */}
                  <a href="mailto:contacto@alioshasystem.com" className="hover:underline text-muted-foreground">
                    contacto@alioshasystem.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                 {/* Icon color */}
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-foreground">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                   {/* Heading - text-foreground */}
                  <h4 className="text-lg font-medium text-foreground">Teléfono</h4>
                   {/* Link color */}
                  <a href="tel:+524433381082" className="hover:underline text-muted-foreground">
                    +52 (443) 338-1082
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                 {/* Icon color */}
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-foreground">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="ml-4">
                   {/* Heading - text-foreground */}
                  <h4 className="text-lg font-medium text-foreground">Ubicación</h4>
                   {/* Paragraph color */}
                  <p className="text-muted-foreground">
                    Ciudad de Mexico, CDMX<br />
                    Mexico
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {/* Borders and background should match the theme */}
          <div className="md:col-span-2 border border-gray-800 p-8 bg-background">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   {/* Label text color uses text-muted-foreground */}
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Nombre
                  </label>
                   {/* Input styles: border-gray-800, darker background (bg-gray-900), text-muted-foreground for input text */}
                   {/* Ensure gray-800 and gray-900 are defined as dark grays in your config or global CSS */}
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-gray-800 bg-gray-900 text-muted-foreground placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-800"
                  />
                </div>
                <div>
                   {/* Label text color */}
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Correo Electrónico
                  </label>
                   {/* Input styles */}
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Tu correo electrónico"
                    className="w-full px-4 py-3 border border-gray-800 bg-gray-900 text-muted-foreground placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-800"
                  />
                </div>
              </div>

              <div>
                 {/* Label text color */}
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Asunto
                </label>
                 {/* Input styles */}
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Asunto"
                  className="w-full px-4 py-3 border border-gray-800 bg-gray-900 text-muted-foreground placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-800"
                />
              </div>

              <div>
                 {/* Label text color */}
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Mensaje
                </label>
                 {/* Textarea styles */}
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tu mensaje"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-800 bg-gray-900 text-muted-foreground placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-800"
                />
              </div>

              {status.error && (
                 <div className="p-4 border border-gray-800 bg-red-950 text-red-300">
                   {/* Status message styles - adjusted for visibility on dark theme */}
                   {status.error}
                 </div>
              )}

              {status.success && (
                 <div className="p-4 border border-gray-800 bg-green-950 text-green-300">
                   {/* Status message styles - adjusted for visibility on dark theme */}
                   ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                 </div>
              )}

              {/* Using the custom Button component with Hero's button styles */}
              <Button
                type="submit"
                size="lg"
                disabled={status.loading}
                // These classes should override the default Button styles to match the Hero's black button
                // Ensure 'black' is defined as your desired button color in tailwind.config.ts or global CSS
                className="w-full h-12 px-8 bg-black text-white font-medium transition-colors duration-300 hover:bg-white/50 hover:text-black disabled:bg-gray-400 disabled:text-gray-700"
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
