import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implémenter l'inscription à la newsletter
    console.log('Newsletter subscription:', email)
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            SOUSCRIRE À NOTRE NEWSLETTER...
          </h3>
          <div className="w-24 h-1 bg-coral-DEFAULT mx-auto mb-6"></div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coral-DEFAULT focus:border-transparent text-gray-800"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-coral-DEFAULT text-white rounded-lg hover:bg-coral-light transition-colors font-medium"
            >
              {submitted ? 'Merci !' : "S'inscrire"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}