import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Linkedin, Clock, Send, Home, Waves, Star, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getStoredAvisPending, setStoredAvisPending } from '../constants/services'
import { supabase } from '../lib/supabase'
import type { Avis } from '../types'

const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const Contact = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (location.hash === '#avis') {
      const el = document.getElementById('avis')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])
  const [avisName, setAvisName] = useState('')
  const [avisRating, setAvisRating] = useState(5)
  const [avisText, setAvisText] = useState('')
  const [avisSubmitted, setAvisSubmitted] = useState(false)
  const [avisError, setAvisError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Insérer le message dans la base de données
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message
        }])

      if (insertError) {
        throw insertError
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err)
      setError('Une erreur est survenue. Veuillez réessayer ou me contacter directement par téléphone.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAvisSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAvisError('')
    const trimmedName = avisName.trim()
    const trimmedText = avisText.trim()
    if (!trimmedName) {
      setAvisError('Merci d\'indiquer votre prénom ou un pseudo.')
      return
    }
    if (!trimmedText) {
      setAvisError('Merci de rédiger votre avis.')
      return
    }
    const now = new Date()
    const dateStr = `${MONTHS_FR[now.getMonth()]} ${now.getFullYear()}`
    const newAvis: Avis = {
      id: `pending_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name: trimmedName,
      text: trimmedText,
      rating: avisRating,
      date: dateStr
    }
    const pending = getStoredAvisPending()
    setStoredAvisPending([...pending, newAvis])
    setAvisName('')
    setAvisRating(5)
    setAvisText('')
    setAvisSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="bg-sage text-cream py-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 text-gold text-sm font-body font-medium rounded-full mb-6">
              <Waves className="w-4 h-4" />
              Massage Lacanau Océan
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4">
              Contact <span className="text-gold">Massage Lacanau</span>
            </h1>
            <p className="text-cream/80 text-lg font-body">
              Besoin d'un massage à Lacanau ? Contactez-moi pour réserver votre séance 
              au cabinet ou à domicile sur Lacanau et ses environs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-8">
                Informations de <span className="text-gold">contact</span>
              </h2>

              <div className="space-y-4">
                {/* Phone */}
                <div className="card p-5 flex items-center gap-4 border-l-4 border-gold">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sage mb-1">Téléphone</h3>
                    <a href="tel:+33759701941" className="text-dark hover:text-gold transition-colors text-lg font-body font-medium">
                      07 59 70 19 41
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="card p-5 flex items-center gap-4 border-l-4 border-sage">
                  <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sage mb-1">Email</h3>
                    <a href="mailto:massage.auraperformance@gmail.com" className="text-dark hover:text-gold transition-colors font-body">
                      massage.auraperformance@gmail.com
                    </a>
                  </div>
                </div>

                {/* Cabinet */}
                <div className="card p-5 flex items-start gap-4 border-l-4 border-gold">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sage mb-1">Cabinet</h3>
                    <p className="text-dark/70 font-body">
                      <span className="text-sage font-medium">HEAL LO LACANAU</span><br />
                      7 rue Jean Michel<br />
                      33680 LACANAU
                    </p>
                  </div>
                </div>

                {/* Domicile */}
                <div className="card p-5 flex items-start gap-4 border-l-4 border-sage">
                  <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sage mb-1">À domicile</h3>
                    <p className="text-dark/70 font-body">
                      Déplacement possible sur Lacanau et ses environs
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="card p-5 flex items-start gap-4 border-l-4 border-gold">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sage mb-1">Disponibilités</h3>
                    <p className="text-dark/70 font-body">
                      Sur rendez-vous uniquement<br />
                      <span className="text-gold font-medium">7j/7 selon disponibilités</span>
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-sage rounded-2xl p-6 mt-6">
                  <h3 className="font-heading font-semibold text-cream mb-4">Suivez-moi</h3>
                  <div className="flex gap-3">
                    <a
                      href="https://www.instagram.com/laure_dupuch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 rounded-xl bg-cream/10 hover:bg-gold transition-colors group"
                    >
                      <Instagram className="w-5 h-5 text-cream group-hover:text-dark" />
                      <span className="text-cream group-hover:text-dark font-body text-sm font-medium">@laure_dupuch</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/laure-dupuch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 rounded-xl bg-cream/10 hover:bg-gold transition-colors group"
                    >
                      <Linkedin className="w-5 h-5 text-cream group-hover:text-dark" />
                      <span className="text-cream group-hover:text-dark font-body text-sm font-medium">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-8">
                Envoyez-moi un <span className="text-gold">message</span>
              </h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center bg-sage">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-cream mb-2">Message envoyé !</h3>
                  <p className="text-cream/80 font-body">Je vous répondrai dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-gold hover:text-cream transition-colors text-sm font-body"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-8 border-2 border-sage/20">
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-body">
                      {error}
                    </div>
                  )}
                  <div className="space-y-5">
                    <div>
                      <label className="block font-body font-medium text-sage text-sm mb-2">Nom complet *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required
                        disabled={isSubmitting}
                        placeholder="Votre nom"
                        className="w-full px-4 py-3 rounded-xl border-2 border-sand focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body bg-white disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sage text-sm mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required
                        disabled={isSubmitting}
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-sand focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body bg-white disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sage text-sm mb-2">Téléphone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="06 00 00 00 00"
                        className="w-full px-4 py-3 rounded-xl border-2 border-sand focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-body bg-white disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sage text-sm mb-2">Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                        disabled={isSubmitting}
                        placeholder="Votre message..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-sand focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none font-body bg-white disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-gold text-dark font-body font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-dark transition-colors shadow-gold disabled:opacity-50 disabled:cursor-not-allowed">
                      <Send className="w-5 h-5" />
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Laisser un avis - entre infos et carte */}
          <section id="avis" className="mt-16 pt-16 border-t border-sand/60">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-3">
                  Témoignages
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-2">
                  Laisser un <span className="text-gold">avis</span>
                </h2>
                <p className="text-dark/60 font-body text-sm">
                  Vous avez reçu un massage à Lacanau ? Partagez votre expérience, elle sera modérée avant publication.
                </p>
              </div>

              {avisSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-8 text-center"
                >
                  <CheckCircle className="w-14 h-14 text-sage mx-auto mb-3" />
                  <h3 className="font-heading font-bold text-lg text-dark mb-2">Merci pour votre avis</h3>
                  <p className="text-dark/70 font-body text-sm">
                    Votre témoignage a bien été enregistré. Il sera vérifié avant d'être publié sur la page d'accueil.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleAvisSubmit}
                  className="card p-6 sm:p-8 space-y-5"
                >
                  <div>
                    <label className="block text-sm font-body text-dark/70 mb-1">Votre prénom ou pseudo (ex. Sophie M.)</label>
                    <input
                      type="text"
                      value={avisName}
                      onChange={(e) => setAvisName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-sand font-body focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition"
                      placeholder="Prénom et initiale"
                      maxLength={80}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body text-dark/70 mb-1">Votre note (1 à 5 étoiles)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setAvisRating(n)}
                          className={`p-2 rounded-xl transition ${avisRating >= n ? 'bg-gold text-white' : 'bg-sand text-dark/40 hover:bg-sand-dark'}`}
                          aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-body text-dark/70 mb-1">Votre avis</label>
                    <textarea
                      value={avisText}
                      onChange={(e) => setAvisText(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-sand font-body focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition resize-y"
                      placeholder="Décrivez votre expérience : le soin reçu, l'ambiance, ce qui vous a plu..."
                      maxLength={800}
                    />
                    <p className="text-xs text-dark/50 font-body mt-1">{avisText.length}/800 caractères</p>
                  </div>
                  {avisError && <p className="text-error text-sm font-body">{avisError}</p>}
                  <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Envoyer mon avis
                  </button>
                </motion.form>
              )}
            </div>
          </section>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-80 bg-sand relative">
        <iframe
          src="https://maps.google.com/maps?q=HEAL%20LO%20LACANAU%207%20rue%20Jean%20Michel%2033680%20LACANAU&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" title="Massage Lacanau - Localisation du cabinet Aura Massage à Lacanau Océan"
        />
      </section>
    </div>
  )
}

export default Contact
