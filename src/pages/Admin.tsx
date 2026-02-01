import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, LogOut, Calendar, Clock, User, Euro, TrendingUp, Users, Check, X, ChevronLeft, ChevronRight, Settings, Ban, CalendarCheck, MapPin, Home } from 'lucide-react'
import { getStoredBlocked, setStoredBlocked } from '../constants/services'
import { useReservations } from '../hooks/useReservations'
import { useAllCreneauxHoraires } from '../hooks/useCreneauxHoraires'
import ReservationsList from '../components/ReservationsList'
import type { Reservation, BlockedSlots } from '../types'
import type { LocationType } from '../constants/services'

const ADMIN_CODE = 'AURA2024'

const Admin = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState('')
  const { reservations } = useReservations()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [locationCalendarType, setLocationCalendarType] = useState<LocationType>('cabinet')
  const [blockedSlotsCabinet, setBlockedSlotsCabinet] = useState<BlockedSlots>(() => getStoredBlocked('cabinet'))
  const [blockedSlotsDomicile, setBlockedSlotsDomicile] = useState<BlockedSlots>(() => getStoredBlocked('domicile'))
  const [activeTab, setActiveTab] = useState<'calendar' | 'reservations' | 'settings'>('calendar')
  const [newTimeSlotCabinet, setNewTimeSlotCabinet] = useState('')
  const [newTimeSlotDomicile, setNewTimeSlotDomicile] = useState('')

  // Utilise le hook pour gérer les créneaux depuis Supabase
  const {
    creneaux: creneauxCabinet,
    heures: heuresCabinet,
    loading: loadingCabinet,
    toggleCreneau: toggleCreneauCabinet,
    ajouterCreneau: ajouterCreneauCabinet,
    supprimerCreneau: supprimerCreneauCabinet
  } = useAllCreneauxHoraires('cabinet')

  const {
    creneaux: creneauxDomicile,
    heures: heuresDomicile,
    loading: loadingDomicile,
    toggleCreneau: toggleCreneauDomicile,
    ajouterCreneau: ajouterCreneauDomicile,
    supprimerCreneau: supprimerCreneauDomicile
  } = useAllCreneauxHoraires('domicile')

  useEffect(() => {
    setStoredBlocked('cabinet', blockedSlotsCabinet)
  }, [blockedSlotsCabinet])
  useEffect(() => {
    setStoredBlocked('domicile', blockedSlotsDomicile)
  }, [blockedSlotsDomicile])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === ADMIN_CODE) { setIsAuth(true); setError('') }
    else setError('Code incorrect')
  }

  const blockedSlotsCurrent = locationCalendarType === 'cabinet' ? blockedSlotsCabinet : blockedSlotsDomicile
  const setBlockedSlotsCurrent = locationCalendarType === 'cabinet' ? setBlockedSlotsCabinet : setBlockedSlotsDomicile
  const heuresCurrent = locationCalendarType === 'cabinet' ? heuresCabinet : heuresDomicile

  const handleAjouterCreneau = async (lieu: LocationType, valeur: string) => {
    const normalized = valeur?.slice(0, 5)
    if (!normalized || !/^\d{2}:\d{2}$/.test(normalized)) {
      alert('Format invalide. Utilisez HH:MM (ex: 14:30)')
      return
    }
    try {
      if (lieu === 'cabinet') {
        if (creneauxCabinet.some(c => c.heure.substring(0, 5) === normalized)) {
          alert('Ce créneau existe déjà.')
          return
        }
        await ajouterCreneauCabinet(normalized)
        setNewTimeSlotCabinet('')
      } else {
        if (creneauxDomicile.some(c => c.heure.substring(0, 5) === normalized)) {
          alert('Ce créneau existe déjà.')
          return
        }
        await ajouterCreneauDomicile(normalized)
        setNewTimeSlotDomicile('')
      }
    } catch (err) {
      alert('Erreur lors de l\'ajout du créneau')
      console.error(err)
    }
  }

  const handleSupprimerCreneau = async (lieu: LocationType, creneauId: string) => {
    if (!confirm('Supprimer définitivement ce créneau ?')) return
    try {
      if (lieu === 'cabinet') {
        await supprimerCreneauCabinet(creneauId)
      } else {
        await supprimerCreneauDomicile(creneauId)
      }
    } catch (err) {
      alert('Erreur lors de la suppression du créneau')
      console.error(err)
    }
  }

  const toggleBlockSlot = (date: Date, time: string) => {
    const key = date.toISOString().split('T')[0]
    setBlockedSlotsCurrent(prev => {
      const current = prev[key] || []
      return { ...prev, [key]: current.includes(time) ? current.filter(t => t !== time) : [...current, time] }
    })
  }

  const isSlotBlocked = (date: Date, time: string) => blockedSlotsCurrent[date.toISOString().split('T')[0]]?.includes(time) || false
  const getReservationsForDate = (date: Date, location?: LocationType) => reservations.filter(r => {
    const reservationDate = new Date(r.date)
    const sameDay = reservationDate.toDateString() === date.toDateString()
    if (!sameDay) return false
    return location ? r.lieu === location : true
  })

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear(), month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0)
    let startDay = firstDay.getDay() - 1
    if (startDay < 0) startDay = 6
    const days: (Date | null)[] = []
    for (let i = 0; i < startDay; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d))
    return days
  }, [currentMonth])

  const stats = {
    today: reservations.filter(r => {
      const reservationDate = new Date(r.date)
      return reservationDate.toDateString() === new Date().toDateString()
    }).length,
    week: reservations.filter(r => { 
      const now = new Date()
      const week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      const reservationDate = new Date(r.date)
      return reservationDate >= now && reservationDate <= week 
    }).length,
    pending: reservations.filter(r => r.statut === 'en attente').length,
    revenue: reservations.filter(r => r.statut === 'confirmée').reduce((s, r) => s + (r.services?.prix || 0), 0),
    deposits: reservations.filter(r => r.statut === 'confirmée').reduce((s, r) => s + ((r.services?.prix || 0) * 0.3), 0)
  }

  // Login Screen
  if (!isAuth) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-cream flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md px-4">
          <div className="card p-8">
            <div className="flex justify-center mb-6">
              <img src="/Logo-site.png" alt="Logo" className="w-48 h-48 object-cover rounded-full" />
            </div>
            <h1 className="font-heading font-semibold text-2xl text-dark text-center mb-2">Espace Administration</h1>
            <p className="text-dark/60 text-center mb-8 font-body text-sm">Entrez votre code d'accès</p>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block mb-2 font-body text-sm text-dark"><Lock className="w-4 h-4 inline mr-1" /> Code d'accès</label>
                <div className="relative">
                  <input type={showCode ? 'text' : 'password'} value={code} onChange={(e) => { setCode(e.target.value); setError('') }}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border font-body ${error ? 'border-error' : 'border-sand focus:border-sage'}`} />
                  <button type="button" onClick={() => setShowCode(!showCode)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/50">
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-error">{error}</p>}
              </div>
              <button type="submit" className="w-full btn-primary py-4">Accéder</button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream">
      <div className="container-custom px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-semibold text-3xl text-dark mb-1">Administration</h1>
            <p className="text-dark/60 font-body">Gérez vos réservations</p>
          </div>
          <button onClick={() => setIsAuth(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sand text-dark/70 hover:bg-sand-dark">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { icon: Calendar, label: "Aujourd'hui", value: stats.today },
            { icon: TrendingUp, label: 'Cette semaine', value: stats.week },
            { icon: Users, label: 'En attente', value: stats.pending },
            { icon: Euro, label: 'Acomptes', value: `${stats.deposits}€` },
            { icon: Euro, label: 'CA confirmé', value: `${stats.revenue}€` }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-4">
              <stat.icon className="w-6 h-6 mb-2 text-sage" />
              <p className="text-2xl font-heading font-semibold text-dark">{stat.value}</p>
              <p className="text-xs text-dark/50 font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[{ id: 'calendar', label: 'Calendrier', icon: Calendar }, { id: 'reservations', label: 'Réservations', icon: CalendarCheck }, { id: 'settings', label: 'Paramètres', icon: Settings }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body ${activeTab === tab.id ? 'bg-sage text-cream' : 'bg-white text-dark/70 hover:bg-sand'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex gap-2">
              <button
                onClick={() => setLocationCalendarType('cabinet')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body ${locationCalendarType === 'cabinet' ? 'bg-sage text-cream' : 'bg-white text-dark/70 hover:bg-sand'}`}
              >
                <MapPin className="w-4 h-4" /> Calendrier Cabinet
              </button>
              <button
                onClick={() => setLocationCalendarType('domicile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body ${locationCalendarType === 'domicile' ? 'bg-sage text-cream' : 'bg-white text-dark/70 hover:bg-sand'}`}
              >
                <Home className="w-4 h-4" /> Calendrier Domicile
              </button>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <p className="text-dark/60 text-sm font-body mb-4">
                {locationCalendarType === 'cabinet' ? 'Bloquez des créneaux pour le cabinet (7 rue Jean Michel).' : 'Bloquez des créneaux pour les interventions à domicile.'}
              </p>
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() - 1))} className="p-2 rounded-lg hover:bg-sand"><ChevronLeft className="w-5 h-5 text-dark" /></button>
                <h3 className="font-heading font-semibold text-xl text-dark capitalize">{currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() + 1))} className="p-2 rounded-lg hover:bg-sand"><ChevronRight className="w-5 h-5 text-dark" /></button>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <div key={i} className="text-center text-xs font-body text-dark/50 py-2">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((date, i) => {
                  if (!date) return <div key={`e-${i}`} />
                  const dayRes = getReservationsForDate(date, locationCalendarType)
                  const isSelected = selectedDate?.toDateString() === date.toDateString()
                  const isToday = date.toDateString() === new Date().toDateString()
                  return (
                    <button key={date.toISOString()} onClick={() => setSelectedDate(date)}
                      className={`aspect-square rounded-lg text-sm font-body relative ${isSelected ? 'bg-sage text-cream' : isToday ? 'bg-gold/20 text-dark' : 'hover:bg-sand text-dark'}`}>
                      {date.getDate()}
                      {dayRes.length > 0 && <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cream' : 'bg-gold'}`} />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="card p-6">
              {selectedDate ? (
                <>
                  <h3 className="font-heading font-semibold text-dark mb-4">{selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                  <div className="mb-6">
                    <h4 className="text-sm font-body text-dark/60 mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> Créneaux ({locationCalendarType === 'cabinet' ? 'Cabinet' : 'Domicile'})</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {heuresCurrent.map(time => {
                        const res = getReservationsForDate(selectedDate, locationCalendarType).find(r => {
                          const heureFormatted = r.heure.substring(0, 5)
                          return heureFormatted === time && r.lieu === locationCalendarType
                        })
                        const blocked = isSlotBlocked(selectedDate, time)
                        return (
                          <button key={time} onClick={() => !res && toggleBlockSlot(selectedDate, time)} disabled={!!res}
                            className={`py-2 px-3 rounded-lg text-xs font-body ${res ? 'bg-gold/20 text-gold cursor-not-allowed' : blocked ? 'bg-error/10 text-error' : 'bg-sand text-dark hover:bg-sage/20'}`}>
                            {time}
                            {res && <span className="block text-[10px]">Réservé</span>}
                            {blocked && !res && <span className="block text-[10px]">Bloqué</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-body text-dark/60 mb-2">Réservations</h4>
                    {getReservationsForDate(selectedDate, locationCalendarType).length === 0 ? (
                      <p className="text-sm text-dark/50 italic font-body">Aucune réservation</p>
                    ) : (
                      <div className="space-y-2">
                        {getReservationsForDate(selectedDate, locationCalendarType).map(r => (
                          <div key={r.id} className="bg-sand rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="font-body font-medium text-dark text-sm">{r.heure.substring(0, 5)}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${r.statut === 'confirmée' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                {r.statut === 'confirmée' ? 'Confirmé' : 'En attente'}
                              </span>
                            </div>
                            <p className="text-sm text-dark/70 font-body">{r.users?.prenom} {r.users?.nom}</p>
                            <p className="text-xs text-dark/50 font-body">{r.services?.nom}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-dark/30 mx-auto mb-2" />
                  <p className="text-dark/50 font-body">Sélectionnez une date</p>
                </div>
              )}
            </div>
          </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <ReservationsList />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="card p-6 max-w-4xl space-y-8">
            <h3 className="font-heading font-semibold text-xl text-dark">Horaires et jours disponibles</h3>
            <p className="text-dark/60 font-body text-sm">Définissez les créneaux proposés pour le cabinet et pour les interventions à domicile. Les clients verront uniquement les créneaux que vous activez ici.</p>

            <div>
              <h4 className="font-body font-medium text-dark mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-sage" /> Heures disponibles – Cabinet (Lacanau Océan)</h4>
              {loadingCabinet ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sage mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {creneauxCabinet.map(creneau => (
                    <div key={creneau.id} className="flex items-center gap-1">
                      <button
                        onClick={() => toggleCreneauCabinet(creneau.id, !creneau.actif)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-body ${creneau.actif ? 'bg-sage text-cream' : 'bg-sand text-dark/60 hover:bg-sand-dark'}`}
                      >
                        {creneau.heure.substring(0, 5)}
                      </button>
                      <button
                        onClick={() => handleSupprimerCreneau('cabinet', creneau.id)}
                        className="p-2 rounded-lg bg-sand text-dark/60 hover:bg-error/10 hover:text-error"
                        aria-label="Supprimer le créneau"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <input
                  type="time"
                  value={newTimeSlotCabinet}
                  onChange={(e) => setNewTimeSlotCabinet(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-sand"
                />
                <button
                  onClick={() => handleAjouterCreneau('cabinet', newTimeSlotCabinet)}
                  className="btn-primary px-4 py-2"
                >
                  + Ajouter
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-body font-medium text-dark mb-3 flex items-center gap-2"><Home className="w-5 h-5 text-sage" /> Heures disponibles – À domicile</h4>
              {loadingDomicile ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sage mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {creneauxDomicile.map(creneau => (
                    <div key={creneau.id} className="flex items-center gap-1">
                      <button
                        onClick={() => toggleCreneauDomicile(creneau.id, !creneau.actif)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-body ${creneau.actif ? 'bg-sage text-cream' : 'bg-sand text-dark/60 hover:bg-sand-dark'}`}
                      >
                        {creneau.heure.substring(0, 5)}
                      </button>
                      <button
                        onClick={() => handleSupprimerCreneau('domicile', creneau.id)}
                        className="p-2 rounded-lg bg-sand text-dark/60 hover:bg-error/10 hover:text-error"
                        aria-label="Supprimer le créneau"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <input
                  type="time"
                  value={newTimeSlotDomicile}
                  onChange={(e) => setNewTimeSlotDomicile(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-sand"
                />
                <button
                  onClick={() => handleAjouterCreneau('domicile', newTimeSlotDomicile)}
                  className="btn-primary px-4 py-2"
                >
                  + Ajouter
                </button>
              </div>
            </div>

            <div className="border-t border-sand pt-6">
              <h4 className="font-body font-medium text-dark mb-3 flex items-center gap-2"><Ban className="w-5 h-5" /> Bloquer des créneaux</h4>
              <p className="text-sm text-dark/60 font-body">Utilisez l’onglet Calendrier pour bloquer des créneaux spécifiques (Cabinet ou Domicile selon le calendrier sélectionné).</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
