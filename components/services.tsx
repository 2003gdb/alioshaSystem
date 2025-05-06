"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Globe, Database, Paintbrush, MessageSquare, ArrowRight } from "lucide-react";

export default function ServicesCarousel() {
  // All services data
  const allServices = [
    {
      title: "Desarrollo de Software a Medida",
      description: "Soluciones personalizadas construidas desde cero para abordar los desafíos específicos de tu negocio.",
      icon: <Code className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Desarrollo de Aplicaciones Web",
      description: "Aplicaciones web responsivas e intuitivas que proporcionan experiencias de usuario fluidas en todos los dispositivos.",
      icon: <Globe className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Diseño y Optimización de Bases de Datos",
      description: "Arquitecturas de bases de datos eficientes que garantizan un rendimiento y escalabilidad óptimos.",
      icon: <Database className="h-8 w-8 text-green-500" />
    },
    {
      title: "Diseño UI/UX",
      description: "Interfaces hermosas e intuitivas que deleitan a los usuarios y mejoran la interacción con tu producto.",
      icon: <Paintbrush className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Servicios de Consultoría",
      description: "Orientación experta sobre estrategia tecnológica, arquitectura y enfoques de implementación.",
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />
    },
    {
      title: "Soporte y Mantenimiento Continuo",
      description: "Soporte técnico confiable y mejoras continuas para mantener tu software funcionando sin problemas.",
      icon: <ArrowRight className="h-8 w-8 text-white" />
    },
  ];

  // State to track current group of services
  const [currentGroup, setCurrentGroup] = useState(0);
  const groupCount = Math.ceil(allServices.length / 3);

  // Effect to rotate services every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGroup((prevGroup) => (prevGroup + 1) % groupCount);
    }, 7000);

    return () => clearInterval(timer);
  }, [groupCount]);

  // Get current services to display
  const getCurrentServices = () => {
    const startIndex = currentGroup * 3;
    return allServices.slice(startIndex, startIndex + 3);
  };

  return (
    <div className="container relative mx-auto mt-24 px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <AnimatePresence mode="wait">
          {getCurrentServices().map((service, index) => (
            <motion.div
              key={`${currentGroup}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-none bg-white/50 transition-all duration-300 hover:border-gray-600"
            >
              <div className="z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black">
                {service.icon}
              </div>
              <h3 className="mb-3 text-lg font-medium">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="mt-12 flex justify-center gap-2">
        {Array.from({ length: groupCount }).map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === currentGroup ? "bg-gray-800" : "bg-gray-300"
            } transition-all duration-300`}
            onClick={() => setCurrentGroup(i)}
            aria-label={`Go to service group ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}