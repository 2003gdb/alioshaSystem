"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, Database, Globe, Mail, MessageSquare, Phone, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
              Aliosha System
            </span>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            <a href="#services" className="text-purple-800 hover:text-purple-600 transition-colors">
              Services
            </a>
            <a href="#expertise" className="text-purple-800 hover:text-purple-600 transition-colors">
              Expertise
            </a>
            <a href="#contact" className="text-purple-800 hover:text-purple-600 transition-colors">
              Contact
            </a>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500"
              >
                Transforming Ideas into Elegant Software Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-purple-900/80 mb-10 max-w-3xl mx-auto"
              >
                Aliosha System specializes in crafting beautiful, high-performance software tailored to your unique
                business needs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="#services"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Explore Services
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  className="bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: scrollY > 100 ? 1 : 0, y: scrollY > 100 ? 0 : 30 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">Our Services</h2>
              <p className="text-lg text-purple-700/70 max-w-2xl mx-auto">
                We deliver comprehensive software solutions designed to elevate your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Code className="text-purple-500" size={28} />,
                  title: "Custom Software Development",
                  description:
                    "Tailored solutions built from the ground up to address your specific business challenges.",
                },
                {
                  icon: <Globe className="text-purple-500" size={28} />,
                  title: "Web Application Development",
                  description:
                    "Responsive, intuitive web applications that provide seamless user experiences across all devices.",
                },
                {
                  icon: <Database className="text-purple-500" size={28} />,
                  title: "Database Design & Optimization",
                  description: "Efficient database architectures that ensure optimal performance and scalability.",
                },
                {
                  icon: <Sparkles className="text-purple-500" size={28} />,
                  title: "UI/UX Design",
                  description:
                    "Beautiful, intuitive interfaces that delight users and enhance engagement with your product.",
                },
                {
                  icon: <MessageSquare className="text-purple-500" size={28} />,
                  title: "Consultation Services",
                  description: "Expert guidance on technology strategy, architecture, and implementation approaches.",
                },
                {
                  icon: <ArrowRight className="text-purple-500" size={28} />,
                  title: "Ongoing Support & Maintenance",
                  description:
                    "Reliable technical support and continuous improvements to keep your software running smoothly.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:bg-purple-100/50 border border-purple-100"
                >
                  <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-800">{service.title}</h3>
                  <p className="text-purple-700/70">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section with Animation */}
        <section id="expertise" className="py-20 bg-gradient-to-br from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: scrollY > 600 ? 1 : 0, y: scrollY > 600 ? 0 : 30 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">Our Expertise</h2>
              <p className="text-lg text-purple-700/70 max-w-2xl mx-auto">
                Leveraging cutting-edge technologies to build robust, scalable solutions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: scrollY > 700 ? 1 : 0, x: scrollY > 700 ? 0 : -50 }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-800">Technology Stack</h3>

                {[
                  { name: "Frontend Development", percentage: 95 },
                  { name: "Backend Systems", percentage: 90 },
                  { name: "Database Architecture", percentage: 85 },
                  { name: "Cloud Infrastructure", percentage: 88 },
                  { name: "DevOps & CI/CD", percentage: 82 },
                ].map((skill, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-purple-800">{skill.name}</span>
                      <span className="text-purple-600">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-purple-100 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: scrollY > 750 + index * 30 ? `${skill.percentage}%` : 0 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-purple-600 to-purple-400 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: scrollY > 700 ? 1 : 0, x: scrollY > 700 ? 0 : 50 }}
                transition={{ duration: 0.7 }}
                className="bg-white p-8 rounded-xl shadow-md border border-purple-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-800">Our Approach</h3>

                {[
                  {
                    title: "Discovery & Planning",
                    description:
                      "We begin by understanding your business goals and requirements to create a comprehensive roadmap.",
                  },
                  {
                    title: "Design & Architecture",
                    description:
                      "Our team designs intuitive interfaces and robust system architectures tailored to your needs.",
                  },
                  {
                    title: "Development & Testing",
                    description:
                      "We employ agile methodologies to deliver high-quality code with thorough testing at every stage.",
                  },
                  {
                    title: "Deployment & Support",
                    description:
                      "We ensure smooth deployment and provide ongoing support to keep your software running optimally.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: scrollY > 800 + index * 50 ? 1 : 0, y: scrollY > 800 + index * 50 ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="mb-6 last:mb-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-purple-800">{step.title}</h4>
                        <p className="text-purple-700/70">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: scrollY > 1200 ? 1 : 0, y: scrollY > 1200 ? 0 : 30 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">Get In Touch</h2>
              <p className="text-lg text-purple-700/70 max-w-2xl mx-auto">
                Ready to discuss your project? Reach out to us and let's create something amazing together.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: scrollY > 1300 ? 1 : 0, x: scrollY > 1300 ? 0 : -50 }}
                transition={{ duration: 0.7 }}
                className="bg-purple-50 p-8 rounded-xl shadow-sm border border-purple-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-800">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-purple-800">Email</h4>
                      <Link
                        href="mailto:contact@alioshasystem.com"
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        contact@alioshasystem.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-purple-800">Phone</h4>
                      <Link href="tel:+1234567890" className="text-purple-600 hover:text-purple-800 transition-colors">
                        +1 (234) 567-890
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-purple-800">Location</h4>
                      <p className="text-purple-700/70">
                        San Francisco, CA
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: scrollY > 1300 ? 1 : 0, x: scrollY > 1300 ? 0 : 50 }}
                transition={{ duration: 0.7 }}
              >
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-purple-800 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-purple-800 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-purple-800 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      placeholder="Subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-purple-800 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Send Message
                    <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Aliosha System</h2>
              <p className="text-purple-200 max-w-md">
                Transforming ideas into elegant software solutions that drive business growth.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <p className="text-purple-200 mb-2">© {new Date().getFullYear()} Aliosha System. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

