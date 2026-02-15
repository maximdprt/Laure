import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, Calendar, User, Phone, Mail, ChevronLeft, ChevronRight, CreditCard, Shield, CalendarCheck, Euro, MapPin, Home } from 'lucide-react'
import { allSoins, PREMIUM_OPTION_PRICE, DEPOSIT_PERCENTAGE, getSoinById, getStoredBlocked } from '../constants/services'
import { useReservations } from '../hooks/useReservations'
import { useCreneauxHoraires } from '../hooks/useCreneauxHoraires'
import { createReservation } from '../lib/supabaseAPI'
import { toLocalDateKey } from '../lib/dateUtils'
import type { Soin, ClientInfo } from '../types'

interface BookingData {
  soins: Soin[]
  locationType: 'cabinet' | 'domicile' | null
  premiumOption: boolean
  date: Date | null
  timeSlot: string | null
  clientInfo: ClientInfo | null
}

const steps = [
  { id: 1, label: 'Soins' },
  { id: 2, label: 'Lieu' },
  { id: 3, label: 'Date' },
  { id: 4, label: 'Coordonnées' },
  { id: 5, label: 'Acompte' }
]

const Reservation = () => {
  const [searchParams] = useSearchParams()
  const { reservations } = useReservations()
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [premiumOption, setPremiumOption] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [formData, setFormData] = useState<ClientInfo>({ firstName: '', lastName: '', email: '', phone: '' })
  const [bookingData, setBookingData] = useState<BookingData>({
    soins: [], locationType: null, premiumOption: false, date: null, timeSlot: null, clientInfo: null
  })

  // Récupère les créneaux horaires depuis Supabase en fonction du lieu
  const { heures: heuresCabinet, loading: loadingCabinet } = useCreneauxHoraires('cabinet')
  const { heures: heuresDomicile, loading: loadingDomicile } = useCreneauxHoraires('domicile')

  // Pre-select soin from URL
  useEffect(() => {
    const soinId = searchParams.get('soin')
    if (soinId) {
      const soin = getSoinById(soinId)
      if (soin) setBookingData(prev => ({ ...prev, soins: [soin] }))
    }
  }, [searchParams])

  // Toggle soin selection
  const toggleSoin = (soin: Soin) => {
    setBookingData(prev => {
      const isSelected = prev.soins.some(s => s.id === soin.id)
      if (isSelected) {
        return { ...prev, soins: prev.soins.filter(s => s.id !== soin.id) }
      } else {
        return { ...prev, soins: [...prev.soins, soin] }
      }
    })
  }

  // Calendar generation
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    let startDay = firstDay.getDay() - 1
    if (startDay < 0) startDay = 6
    const days: (Date | null)[] = []
    for (let i = 0; i < startDay; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d))
    return days
  }, [currentMonth])

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today && date.getDay() !== 0
  }

  const isSameDay = (d1: Date, d2: Date | null) => d2 && d1.toDateString() === d2.toDateString()

  // Price calculations
  const soinsTotal = bookingData.soins.reduce((sum, soin) => sum + soin.price, 0)
  const hasSportifSoin = bookingData.soins.some(s => s.category === 'sportif')
  const totalPrice = soinsTotal + (premiumOption && hasSportifSoin ? PREMIUM_OPTION_PRICE : 0)
  const depositAmount = Math.ceil(totalPrice * DEPOSIT_PERCENTAGE / 100)
  const totalDuration = bookingData.soins.reduce((sum, soin) => sum + soin.duration, 0)

  // Utilise les créneaux horaires depuis Supabase selon le lieu choisi
  const timeSlotsForLocation = useMemo(() => {
    if (!bookingData.locationType) return []
    
    if (bookingData.locationType === 'cabinet') {
      return loadingCabinet ? [] : heuresCabinet
    } else {
      return loadingDomicile ? [] : heuresDomicile
    }
  }, [bookingData.locationType, heuresCabinet, heuresDomicile, loadingCabinet, loadingDomicile])

  const blockedForLocation = bookingData.locationType ? getStoredBlocked(bookingData.locationType) : {}
  const normalizeTime = (value: string) => value.slice(0, 5)
  const isSlotBlocked = (date: Date, time: string) => {
    const key = toLocalDateKey(date)
    
    // Vérifie les créneaux bloqués manuellement
    const manuallyBlocked = (blockedForLocation[key] || []).includes(time)
    if (manuallyBlocked) return true
    
    // Vérifie les créneaux occupés par des réservations confirmées
    const isReserved = reservations.some(r => {
      const resDate = r.date
      return resDate === key && normalizeTime(r.heure) === normalizeTime(time)
    })
    
    return isReserved
  }

  // Step validation
  const canProceed = () => {
    switch (currentStep) {
      case 1: return bookingData.soins.length > 0
      case 2: return bookingData.locationType !== null
      case 3: return bookingData.date && bookingData.timeSlot
      case 4: return formData.firstName && formData.lastName && formData.email && formData.phone
      default: return true
    }
  }

  const handleNext = () => {
    if (!canProceed()) return
    if (currentStep === 1) setBookingData(prev => ({ ...prev, premiumOption }))
    if (currentStep === 4) setBookingData(prev => ({ ...prev, clientInfo: formData }))
    if (currentStep < 5) setCurrentStep(prev => prev + 1)
  }

  const setLocationType = (type: 'cabinet' | 'domicile') => {
    setBookingData(prev => ({ ...prev, locationType: type, date: null, timeSlot: null }))
  }

  const handleSubmit = async () => {
    const clientInfo = bookingData.clientInfo ?? formData
    if (!bookingData.date || !bookingData.timeSlot || bookingData.soins.length === 0) {
      return
    }
    if (!clientInfo.firstName || !clientInfo.lastName || !clientInfo.email || !clientInfo.phone) {
      return
    }

    setIsSubmitting(true)
    try {
      // Calcule le prix total et l'acompte
      const soinsTotal = bookingData.soins.reduce((sum, soin) => sum + soin.price, 0)
      const totalPrice = soinsTotal + (premiumOption && bookingData.soins.some(s => s.category === 'sportif') ? PREMIUM_OPTION_PRICE : 0)

      // Crée la réservation pour chaque soin sélectionné
      for (const soin of bookingData.soins) {
        await createReservation({
          nom: clientInfo.lastName,
          prenom: clientInfo.firstName,
          email: clientInfo.email,
          telephone: clientInfo.phone,
          service_id: soin.id,
          date: toLocalDateKey(bookingData.date),
          heure: bookingData.timeSlot,
          lieu: bookingData.locationType === 'cabinet' ? 'cabinet' : 'domicile',
          duree: soin.duration,
          notes: `Prix total: ${totalPrice}€${premiumOption && soin.category === 'sportif' ? ' (avec Option Premium)' : ''}`
        })
      }

      setBookingComplete(true)
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      console.error('Erreur lors de la création de la réservation:', error)
      if (message === 'Créneau déjà réservé') {
        alert('Ce créneau vient d’être réservé par une autre personne. Merci de choisir un autre horaire.')
      } else {
        alert('Une erreur est survenue lors de la sauvegarde de votre réservation. Veuillez réessayer.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confirmation screen
  if (bookingComplete) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-cream">
        <div className="container-custom px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 sm:p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center">
              <CalendarCheck className="w-10 h-10 text-sage" />
            </div>
            <h2 className="font-heading font-semibold text-2xl text-dark mb-4">Réservation confirmée !</h2>
            <p className="text-dark/70 mb-6 font-body">
              Merci {bookingData.clientInfo?.firstName} ! Votre rendez-vous a bien été enregistré.
            </p>
            <div className="bg-sand rounded-lg p-4 mb-6 text-left">
              <div className="space-y-2 text-sm font-body">
                <div className="mb-3 pb-3 border-b border-dark/10">
                  <span className="text-dark/60 block mb-2">Soins réservés :</span>
                  {bookingData.soins.map(soin => (
                    <div key={soin.id} className="font-medium text-dark">{soin.name}</div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="text-dark/60">Lieu</span>
                  <span className="font-medium text-dark">{bookingData.locationType === 'cabinet' ? 'Cabinet (7 rue Jean Michel, Lacanau Océan)' : 'À domicile'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark/60">Date</span>
                  <span className="font-medium text-dark">{bookingData.date?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark/60">Heure</span>
                  <span className="font-medium text-dark">{bookingData.timeSlot}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-dark/10">
                  <span className="text-dark/60">Acompte versé</span>
                  <span className="font-semibold text-sage">{depositAmount}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-dark">Reste à payer</span>
                  <span className="font-bold text-gold">{totalPrice - depositAmount}€</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-dark/50 font-body">
              Un email de confirmation a été envoyé à <span className="font-medium">{bookingData.clientInfo?.email}</span>
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream">
      <div className="container-custom px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-heading font-semibold text-4xl text-dark mb-4">
            Réserver un <span className="text-gold">soin</span>
          </h1>
          <p className="text-dark/60 max-w-2xl mx-auto font-body">
            Choisissez votre soin, sélectionnez un créneau et versez un acompte pour confirmer.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-10 flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold transition-all ${
                    currentStep > step.id ? 'bg-sage text-cream' : currentStep === step.id ? 'bg-gold text-dark' : 'bg-sand text-dark/40'
                  }`}>
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`mt-2 text-xs font-body ${currentStep >= step.id ? 'text-dark' : 'text-dark/40'}`}>{step.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${currentStep > step.id ? 'bg-sage' : 'bg-sand'}`} />}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                
                {/* Step 1: Select Soins */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-dark mb-2">Choisissez vos soins</h2>
                    <p className="text-dark/60 text-sm font-body mb-6">Vous pouvez sélectionner plusieurs soins</p>
                    
                    {['sportif', 'relaxant', 'energie'].map(category => (
                      <div key={category} className="mb-6">
                        <h3 className="font-body font-medium text-sage text-sm uppercase tracking-wider mb-3">
                          {category === 'sportif' ? 'Massages Sportifs' : category === 'relaxant' ? 'Massages Relaxants' : 'Soins Énergétiques'}
                        </h3>
                        <div className="space-y-2">
                          {allSoins.filter(s => s.category === category).map(soin => {
                            const isSelected = bookingData.soins.some(s => s.id === soin.id)
                            return (
                              <motion.button
                                key={soin.id}
                                onClick={() => toggleSoin(soin)}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                                  isSelected 
                                    ? 'border-sage bg-sage text-cream shadow-lg scale-[1.02]' 
                                    : 'border-sand hover:border-sage/50 bg-white'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                      isSelected ? 'bg-gold border-gold' : 'border-dark/30'
                                    }`}>
                                      {isSelected && <Check className="w-4 h-4 text-dark" />}
                                    </div>
                                    <div>
                                      <span className={`font-heading font-semibold block ${isSelected ? 'text-cream' : 'text-dark'}`}>
                                        {soin.name}
                                      </span>
                                      <span className={`text-sm font-body ${isSelected ? 'text-cream/80' : 'text-dark/60'}`}>
                                        {soin.subtitle}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className={`font-heading font-semibold ${isSelected ? 'text-gold' : 'text-gold'}`}>
                                      {soin.price}€
                                    </span>
                                    <div className={`text-xs font-body flex items-center gap-1 ${isSelected ? 'text-cream/70' : 'text-dark/50'}`}>
                                      <Clock className="w-3 h-3" /> {soin.duration} min
                                    </div>
                                  </div>
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    ))}

                    {hasSportifSoin && (
                      <div className="mt-4 p-4 rounded-xl bg-gold/10 border border-gold/30">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={premiumOption} onChange={(e) => setPremiumOption(e.target.checked)}
                            className="w-5 h-5 rounded border-gold text-gold focus:ring-gold" />
                          <div>
                            <span className="font-body font-medium text-dark">Option Premium (+{PREMIUM_OPTION_PRICE}€)</span>
                            <p className="text-xs text-dark/60">Huile bio aux élixirs floraux et chromothérapie</p>
                          </div>
                        </label>
                      </div>
                    )}

                    {/* Total */}
                    <div className="mt-6 pt-6 border-t-2 border-sage/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-heading font-bold text-lg text-dark">TOTAL</span>
                          {bookingData.soins.length > 0 && (
                            <span className="text-dark/50 text-sm ml-2">
                              ({bookingData.soins.length} soin{bookingData.soins.length > 1 ? 's' : ''} · {totalDuration} min)
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-heading font-bold text-3xl text-gold">{totalPrice}€</span>
                        </div>
                      </div>
                      {bookingData.soins.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {bookingData.soins.map(soin => (
                            <div key={soin.id} className="flex justify-between text-sm text-dark/60">
                              <span>{soin.name}</span>
                              <span>{soin.price}€</span>
                            </div>
                          ))}
                          {premiumOption && hasSportifSoin && (
                            <div className="flex justify-between text-sm text-dark/60">
                              <span>Option Premium</span>
                              <span>+{PREMIUM_OPTION_PRICE}€</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Lieu (Cabinet ou Domicile) */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-dark mb-2">Où souhaitez-vous être reçu ?</h2>
                    <p className="text-dark/60 text-sm font-body mb-6">Les disponibilités diffèrent selon le lieu.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setLocationType('cabinet')}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          bookingData.locationType === 'cabinet' ? 'border-sage bg-sage text-cream' : 'border-sand hover:border-sage/50 bg-white'
                        }`}
                      >
                        <MapPin className={`w-10 h-10 mb-3 ${bookingData.locationType === 'cabinet' ? 'text-gold' : 'text-sage'}`} />
                        <h3 className="font-heading font-semibold text-lg mb-1">Au cabinet</h3>
                        <p className={`text-sm font-body ${bookingData.locationType === 'cabinet' ? 'text-cream/80' : 'text-dark/60'}`}>
                          7 rue Jean Michel, Lacanau Océan<br />HEAL LO LACANAU
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocationType('domicile')}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          bookingData.locationType === 'domicile' ? 'border-sage bg-sage text-cream' : 'border-sand hover:border-sage/50 bg-white'
                        }`}
                      >
                        <Home className={`w-10 h-10 mb-3 ${bookingData.locationType === 'domicile' ? 'text-gold' : 'text-sage'}`} />
                        <h3 className="font-heading font-semibold text-lg mb-1">À domicile</h3>
                        <p className={`text-sm font-body ${bookingData.locationType === 'domicile' ? 'text-cream/80' : 'text-dark/60'}`}>
                          Lacanau, Le Porge, Carcans<br />Intervention à votre lieu de séjour
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-dark mb-2">Choisissez votre créneau</h2>
                    <p className="text-dark/60 text-sm font-body mb-4">
                      {bookingData.locationType === 'cabinet' ? 'Créneaux disponibles au cabinet.' : 'Créneaux disponibles pour une intervention à domicile.'}
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Calendar */}
                      <div className="bg-sand rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() - 1))} className="p-2 rounded-lg hover:bg-white">
                            <ChevronLeft className="w-5 h-5 text-dark" />
                          </button>
                          <h3 className="font-heading font-semibold text-dark capitalize">
                            {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                          </h3>
                          <button onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() + 1))} className="p-2 rounded-lg hover:bg-white">
                            <ChevronRight className="w-5 h-5 text-dark" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                            <div key={i} className="text-center text-xs font-body text-dark/50 py-2">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((date, i) => {
                            if (!date) return <div key={`e-${i}`} />
                            const available = isDateAvailable(date)
                            const isSelected = isSameDay(date, bookingData.date)
                            return (
                              <button
                                key={date.toISOString()}
                                onClick={() => available && setBookingData(prev => ({ ...prev, date, timeSlot: null }))}
                                disabled={!available}
                                className={`aspect-square rounded-lg text-sm font-body ${
                                  isSelected ? 'bg-sage text-cream' : available ? 'hover:bg-white text-dark' : 'text-dark/20 cursor-not-allowed'
                                }`}
                              >
                                {date.getDate()}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                      {/* Time Slots */}
                      <div>
                        <h3 className="font-body font-medium text-dark mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Créneaux disponibles
                        </h3>
                        {bookingData.date ? (
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlotsForLocation.map(time => {
                              const blocked = isSlotBlocked(bookingData.date!, time)
                              return (
                                <button
                                  key={time}
                                  onClick={() => !blocked && setBookingData(prev => ({ ...prev, timeSlot: time }))}
                                  disabled={blocked}
                                  className={`py-3 rounded-lg text-sm font-body transition-all ${
                                    bookingData.timeSlot === time ? 'bg-sage text-cream' : blocked ? 'bg-sand/50 text-dark/30 cursor-not-allowed' : 'bg-sand text-dark hover:bg-gold/20'
                                  }`}
                                >
                                  {time}
                                  {blocked && <span className="block text-xs opacity-70">Indisponible</span>}
                                </button>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="bg-sand rounded-xl p-8 text-center">
                            <Calendar className="w-8 h-8 text-dark/30 mx-auto mb-2" />
                            <p className="text-dark/50 text-sm font-body">Sélectionnez une date</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Client Info */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-dark mb-6">Vos coordonnées</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-sm text-dark mb-2"><User className="w-4 h-4 inline mr-1" /> Prénom *</label>
                          <input type="text" value={formData.firstName} onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg border border-sand focus:border-sage outline-none font-body" />
                        </div>
                        <div>
                          <label className="block font-body text-sm text-dark mb-2"><User className="w-4 h-4 inline mr-1" /> Nom *</label>
                          <input type="text" value={formData.lastName} onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg border border-sand focus:border-sage outline-none font-body" />
                        </div>
                      </div>
                      <div>
                        <label className="block font-body text-sm text-dark mb-2"><Mail className="w-4 h-4 inline mr-1" /> Email *</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-sand focus:border-sage outline-none font-body" />
                      </div>
                      <div>
                        <label className="block font-body text-sm text-dark mb-2"><Phone className="w-4 h-4 inline mr-1" /> Téléphone *</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-sand focus:border-sage outline-none font-body" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Payment */}
                {currentStep === 5 && (
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-dark mb-6">Acompte de réservation</h2>
                    <div className="bg-sand rounded-xl p-6 mb-6">
                      <h3 className="font-heading font-semibold text-dark mb-4">Récapitulatif</h3>
                      <div className="space-y-2 text-sm font-body">
                        {bookingData.soins.map(soin => (
                          <div key={soin.id} className="flex justify-between">
                            <span className="text-dark/60">{soin.name}</span>
                            <span className="text-dark">{soin.price}€</span>
                          </div>
                        ))}
                        {premiumOption && hasSportifSoin && (
                          <div className="flex justify-between"><span className="text-dark/60">Option Premium</span><span className="text-dark">+{PREMIUM_OPTION_PRICE}€</span></div>
                        )}
                        <div className="flex justify-between"><span className="text-dark/60">Durée totale</span><span className="text-dark">{totalDuration} min</span></div>
                        <div className="flex justify-between"><span className="text-dark/60">Lieu</span><span className="text-dark">{bookingData.locationType === 'cabinet' ? 'Cabinet (7 rue Jean Michel, Lacanau Océan)' : 'À domicile'}</span></div>
                        <div className="flex justify-between"><span className="text-dark/60">Date</span><span className="text-dark">{bookingData.date?.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span></div>
                        <div className="flex justify-between"><span className="text-dark/60">Heure</span><span className="text-dark">{bookingData.timeSlot}</span></div>
                        <div className="border-t border-dark/10 pt-3 mt-3">
                          <div className="flex justify-between"><span className="text-dark/60">Total</span><span className="font-semibold text-dark">{totalPrice}€</span></div>
                          <div className="flex justify-between mt-2"><span className="font-semibold text-dark">Acompte ({DEPOSIT_PERCENTAGE}%)</span><span className="font-bold text-gold text-lg">{depositAmount}€</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-sand rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4"><CreditCard className="w-5 h-5 text-sage" /><span className="font-body font-medium text-dark">Paiement sécurisé</span></div>
                      <div className="space-y-4">
                        <input type="text" placeholder="Numéro de carte" className="w-full px-4 py-3 rounded-lg border border-sand focus:border-sage outline-none font-body" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-lg border border-sand focus:border-sage outline-none font-body" />
                          <input type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-lg border border-sand focus:border-sage outline-none font-body" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-xs text-dark/50"><Shield className="w-4 h-4 text-sage" /> Paiement 100% sécurisé</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-sand">
              <button
                onClick={() => currentStep > 1 && setCurrentStep(p => p - 1)}
                disabled={currentStep === 1}
                className={`px-6 py-3 font-body font-medium rounded-lg ${currentStep === 1 ? 'bg-sand/50 text-dark/30' : 'bg-sand text-dark hover:bg-sand-dark'}`}
              >
                Retour
              </button>
              {currentStep < 5 ? (
                <button onClick={handleNext} disabled={!canProceed()}
                  className={`px-8 py-3 font-body font-semibold rounded-lg ${canProceed() ? 'btn-primary' : 'bg-sand text-dark/30'}`}>
                  Continuer
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={isSubmitting} className={`px-8 py-3 flex items-center gap-2 ${isSubmitting ? 'bg-sand text-dark/30' : 'btn-primary'}`}>
                  <Euro className="w-5 h-5" /> {isSubmitting ? 'Paiement en cours...' : `Payer ${depositAmount}€`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation
