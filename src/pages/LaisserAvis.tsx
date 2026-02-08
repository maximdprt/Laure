import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send, CheckCircle } from 'lucide-react'
import { getStoredAvisPending, setStoredAvisPending } from '../constants/services'
import type { Avis } from '../types'

const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const LaisserAvis = () => {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmedName = name.trim()
    const trimmedText = text.trim()
    if (!trimmedName) {
      setError('Merci d\'indiquer votre prénom ou un pseudo.')
      return
    }
    if (!trimmedText) {
      setError('Merci de rédiger votre avis.')
      return
    }
    const now = new Date()
    const dateStr = `${MONTHS_FR[now.getMonth()]} ${now.getFullYear()}`
    const newAvis: Avis = {
      id: `pending_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name: trimmedName,
      text: trimmedText,
      rating,
      date: dateStr
    }
    const pending = getStoredAvisPending()
    setStoredAvisPending([...pending, newAvis])
    setName('')
    setRating(5)
    setText('')
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-4">
              Témoignages
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-3">
              Laisser un <span className="text-gold">avis</span>
            </h1>
            <p className="text-dark/60 font-body">
              Vous avez reçu un massage à Lacanau ? Partagez votre expérience, elle sera modérée avant publication.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-sage mx-auto mb-4" />
              <h2 className="font-heading font-bold text-xl text-dark mb-2">Merci pour votre avis</h2>
              <p className="text-dark/70 font-body">
                Votre témoignage a bien été enregistré. Il sera vérifié avant d’être publié sur la page d’accueil.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="card p-6 sm:p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-body text-dark/70 mb-2">Votre prénom ou pseudo (ex. Sophie M.)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand font-body focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition"
                  placeholder="Prénom et initiale"
                  maxLength={80}
                />
              </div>

              <div>
                <label className="block text-sm font-body text-dark/70 mb-2">Votre note (1 à 5 étoiles)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`p-2 rounded-xl transition ${rating >= n ? 'bg-gold text-white' : 'bg-sand text-dark/40 hover:bg-sand-dark'}`}
                      aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-body text-dark/70 mb-2">Votre avis</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-sand font-body focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition resize-y"
                  placeholder="Décrivez votre expérience : le soin reçu, l’ambiance, ce qui vous a plu..."
                  maxLength={800}
                />
                <p className="text-xs text-dark/50 font-body mt-1">{text.length}/800 caractères</p>
              </div>

              {error && <p className="text-error text-sm font-body">{error}</p>}

              <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Envoyer mon avis
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default LaisserAvis
