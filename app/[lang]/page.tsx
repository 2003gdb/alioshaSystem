"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, Database, Globe, Mail, MessageSquare, Phone, Sparkles } from "lucide-react"
import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import LanguageSwitcher from "@/components/language-switcher"
import MobileMenu from "@/components/mobile-menu"

export default function Home({ params }: { params: { lang: string } }) {
  const [scrollY, setScrollY] = useState(0)
  const dict = getDictionary(params.lang)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Email sent successfully!")
        // Limpiar el formulario después de enviar
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        alert("Error sending email.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error sending email.")
    }
  }

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
            <Link href={`/${params.lang}`} className="flex items-center">
              <img src="/images/logo.png" alt={dict.title} className="h-10 md:h-12" />
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 hidden sm:inline-block">
                {dict.title}
              </span>
            </Link>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            <a href="#services" className="text-purple-800 hover:text-purple-600 transition-colors">
              {dict.nav.services}
            </a>
            <a href="#expertise" className="text-purple-800 hover:text-purple-600 transition-colors">
              {dict.nav.expertise}
            </a>
            <a href="#contact" className="text-purple-800 hover:text-purple-600 transition-colors">
              {dict.nav.contact}
            </a>
          </motion.nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLang={params.lang} label={dict.languageSwitcher.label} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:block"
            >
              <a
                href="#contact"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-md hover:shadow-lg"
              >
                {dict.nav.getInTouch}
              </a>
            </motion.div>
            <MobileMenu
              items={[
                { label: dict.nav.services, href: "#services" },
                { label: dict.nav.expertise, href: "#expertise" },
                { label: dict.nav.contact, href: "#contact" },
                { label: dict.nav.getInTouch, href: "#contact" },
              ]}
              lang={params.lang}
            />
          </div>
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
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-purple-800"
              >
                {dict.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-purple-900/80 mb-10 max-w-3xl mx-auto"
              >
                {dict.hero.subtitle}
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
                  {dict.hero.exploreServices}
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  className="bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  {dict.hero.contactUs}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">{dict.services.title}</h2>
              <p className="text-lg text-purple-700/70 max-w-2xl mx-auto">{dict.services.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dict.services.items.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:bg-purple-100/50 border border-purple-100"
                >
                  <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    {
                      [
                        <Code key="code" className="text-purple-500" size={28} />,
                        <Globe key="globe" className="text-purple-500" size={28} />,
                        <Database key="database" className="text-purple-500" size={28} />,
                        <Sparkles key="sparkles" className="text-purple-500" size={28} />,
                        <MessageSquare key="message" className="text-purple-500" size={28} />,
                        <ArrowRight key="arrow" className="text-purple-500" size={28} />,
                      ][index]
                    }
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">{dict.expertise.title}</h2>
              <p className="text-lg text-purple-700/70 max-w-2xl mx-auto">{dict.expertise.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: scrollY > 700 ? 1 : 0, x: scrollY > 700 ? 0 : -50 }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-800">{dict.expertise.technologyStack}</h3>

                {dict.expertise.skills.map((skill, index) => (
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
                <h3 className="text-2xl font-bold mb-6 text-purple-800">{dict.expertise.approach.title}</h3>

                {dict.expertise.approach.steps.map((step, index) => (
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">{dict.contact.title}</h2>
              <p className="text-lg text-purple-700/70 max-w-2xl mx-auto">{dict.contact.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: scrollY > 1300 ? 1 : 0, x: scrollY > 1300 ? 0 : -50 }}
                transition={{ duration: 0.7 }}
                className="bg-purple-50 p-8 rounded-xl shadow-sm border border-purple-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-800">{dict.contact.info.title}</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-purple-800">{dict.contact.info.email.label}</h4>
                      <Link
                        href={`mailto:${dict.contact.info.email.value}`}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        {dict.contact.info.email.value}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-purple-800">{dict.contact.info.phone.label}</h4>
                      <Link
                        href={`tel:${dict.contact.info.phone.value}`}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        {dict.contact.info.phone.value}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-purple-800">{dict.contact.info.location.label}</h4>
                      <p className="text-purple-700/70">
                        {dict.contact.info.location.value[0]}
                        <br />
                        {dict.contact.info.location.value[1]}
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-purple-800 mb-2">
                        {dict.contact.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        placeholder={dict.contact.form.namePlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-purple-800 mb-2">
                        {dict.contact.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        placeholder={dict.contact.form.emailPlaceholder}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-purple-800 mb-2">
                      {dict.contact.form.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      placeholder={dict.contact.form.subjectPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-purple-800 mb-2">
                      {dict.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                      placeholder={dict.contact.form.messagePlaceholder}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {dict.contact.form.send}
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
              <div className="flex items-center mb-4">
                <img src="/images/logo.png" alt={dict.title} className="h-10 mr-3" />
                <h2 className="text-2xl font-bold">{dict.title}</h2>
              </div>
              <p className="text-purple-200 max-w-md">{dict.footer.subtitle}</p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <p className="text-purple-200 mb-2">
                © {new Date().getFullYear()} {dict.title}. {dict.footer.rights}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  {dict.footer.terms}
                </a>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  {dict.footer.privacy}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

