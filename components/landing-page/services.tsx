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
      icon: <Code className="h-8 w-8 text-black" />
    },
    {
      title: "Desarrollo de Aplicaciones Web",
      description: "Aplicaciones web responsivas e intuitivas que proporcionan experiencias de usuario fluidas en todos los dispositivos.",
      icon: <Globe className="h-8 w-8 text-black" />
    },
    {
      title: "Diseño y Optimización de Bases de Datos",
      description: "Arquitecturas de bases de datos eficientes que garantizan un rendimiento y escalabilidad óptimos.",
      icon: <Database className="h-8 w-8 text-black" />
    },
    {
      title: "Diseño UI/UX",
      description: "Interfaces hermosas e intuitivas que deleitan a los usuarios y mejoran la interacción con tu producto.",
      icon: <Paintbrush className="h-8 w-8 text-black" />
    },
    {
      title: "Servicios de Consultoría",
      description: "Orientación experta sobre estrategia tecnológica, arquitectura y enfoques de implementación.",
      icon: <MessageSquare className="h-8 w-8 text-black" />
    },
    {
      title: "Soporte y Mantenimiento Continuo",
      description: "Soporte técnico confiable y mejoras continuas para mantener tu software funcionando sin problemas.",
      icon: <ArrowRight className="h-8 w-8 text-black" />
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
    <div className="container relative mx-auto px-4 sm:px-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <AnimatePresence mode="wait">
          {getCurrentServices().map((service, index) => (
            <motion.div
              key={`${currentGroup}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-sm bg-white border border-black p-4 transition-all duration-300 hover:border-gray-600"
            >
              <div className="z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                {service.icon}
              </div>
              <h3 className="mb-3 text-lg font-medium">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}