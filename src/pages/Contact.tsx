import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implémenter l'envoi du formulaire
    console.log('Form submitted:', formData)
    alert('Formulaire soumis (fonctionnalité à implémenter)')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header corail rose */}
      <section className="relative bg-coral-DEFAULT py-20 overflow-hidden">
        {/* Décoration gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-64 opacity-30">
          <svg viewBox="0 0 200 400" className="w-full h-full">
            <path
              d="M 0 200 Q 50 150, 100 200 Q 150 250, 200 200"
              fill="none"
              stroke="#F7A7A7"
              strokeWidth="3"
              opacity="0.5"
            />
            <path
              d="M 20 180 L 20 220 M 40 160 L 40 240 M 60 140 L 60 260"
              fill="none"
              stroke="#F7A7A7"
              strokeWidth="2"
              opacity="0.4"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-sans font-bold text-white"
            >
              Parlez-nous de vous...
            </motion.h1>
            <motion.a
              href="#formulaire"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button className="bg-white text-black px-8 py-4 border-2 border-black font-semibold uppercase hover:bg-gray-100 transition-colors">
                CONTACTEZ-NOUS
              </button>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Section avec image de fond */}
      <section className="relative min-h-[600px] flex items-center">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="/images/contact-background.jpg"
            alt="Personne face à l'eau avec bras ouverts"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Texte overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-10 md:p-12"
          >
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6">
              Que vous soyez un enfant, un adolescent ou un adulte, mon objectif reste identique :
              vous faire bénéficier de ma meilleure expertise et vous proposer des recommandations
              pertinentes adaptées à vos besoins et à vos attentes afin d'améliorer votre bien-être.
            </p>
            <p className="text-2xl font-bold text-gray-800">Laure Dupuch</p>
          </motion.div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section id="formulaire" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-serif font-bold text-gray-800 mb-12 text-center"
          >
            Contactez-nous
          </motion.h2>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nom *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-DEFAULT focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-DEFAULT focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-DEFAULT focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-DEFAULT focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-coral-DEFAULT text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-light transition-colors"
            >
              Envoyer
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}