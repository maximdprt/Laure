import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  text: string
  service: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie L.',
    text: 'Une expérience transformante. Les séances de chromobioénergie m\'ont aidée à retrouver mon équilibre émotionnel. Laure est une praticienne exceptionnelle.',
    service: 'Chromobioénergie',
  },
  {
    id: 2,
    name: 'Pierre D.',
    text: 'Le massage sportif de Laure est incroyable. Après chaque séance, je me sens régénéré et prêt à repousser mes limites. Je recommande vivement !',
    service: 'Massage Sportif',
  },
  {
    id: 3,
    name: 'Sophie M.',
    text: 'Les soins des 7 chakras ont changé ma vie. Je ressens une harmonie intérieure que je n\'avais jamais connue. Merci Laure pour votre bienveillance.',
    service: 'Soin des 7 Chakras',
  },
  {
    id: 4,
    name: 'Thomas R.',
    text: 'Professionnelle et à l\'écoute, Laure a su adapter ses techniques à mes besoins. Les résultats sont visibles dès la première séance.',
    service: 'Accompagnement personnalisé',
  },
]

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-32 bg-gradient-to-br from-light-blue via-white to-light-green relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-energy-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-energy-violet rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Témoignages
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-energy-blue via-energy-violet to-energy-gold mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 font-light">
            Découvrez les expériences de nos clients
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-10 md:p-14 card-shadow border border-white/30 relative overflow-hidden"
            >
              {/* Décoration top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-energy-blue via-energy-violet to-energy-gold"></div>
              <div className="text-center relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-8"
                >
                  <svg
                    className="w-16 h-16 mx-auto text-energy-gold drop-shadow-sm"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>
                <p className="text-2xl md:text-3xl text-gray-800 italic mb-10 leading-relaxed font-light">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <p className="font-bold text-gray-800 text-xl mb-2">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-energy-violet font-medium">
                    {testimonials[currentIndex].service}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Témoignage précédent"
          >
            <svg
              className="w-6 h-6 text-energy-blue"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Témoignage suivant"
          >
            <svg
              className="w-6 h-6 text-energy-blue"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-energy-violet w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
