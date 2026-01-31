import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, LogOut, Calendar, Clock, User, Euro, TrendingUp, Users, Check, X, ChevronLeft, ChevronRight, Settings, Ban, CalendarCheck, MapPin, Home } from 'lucide-react'
import { getStoredSlots, getStoredBlocked, setStoredSlots, setStoredBlocked } from '../constants/services'
import type { Reservation, BlockedSlots } from '../types'
import type { LocationType } from '../constants/services'

const ADMIN_CODE = 'AURA2024'

// Mock data
const mockReservations: Reservation[] = [
  { id: '1', client: 'Thomas Martin', email: 'thomas@email.com', phone: '06 12 34 56 78', soin: 'OCEAN ATHLETIC', date: new Date(Date.now() + 86400000), timeSlot: '10:00', price: 85, deposit: 26, status: 'confirmed' },
  { id: '2', client: 'Marie Dupont', email: 'marie@email.com', phone: '06 98 76 54 32', soin: 'OCEAN FLOW', date: new Date(Date.now() + 86400000), timeSlot: '14:00', price: 90, deposit: 27, status: 'pending' },
  { id: '3', client: 'Pierre Bernard', email: 'pierre@email.com', phone: '06 11 22 33 44', soin: 'OCEAN LUMINA', date: new Date(Date.now() + 172800000), timeSlot: '11:00', price: 220, deposit: 66, status: 'confirmed' },
  { id: '4', client: 'Sophie Legrand', email: 'sophie@email.com', phone: '06 55 44 33 22', soin: 'OCEAN PERFORMANCE', date: new Date(Date.now() + 259200000), timeSlot: '16:00', price: 45, deposit: 14, status: 'pending' }
]

const Admin = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState('')
  const [reservations, setReservations] = useState(mockReservations)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [locationCalendarType, setLocationCalendarType] = useState<LocationType>('cabinet')
  const [blockedSlotsCabinet, setBlockedSlotsCabinet] = useState<BlockedSlots>(() => getStoredBlocked('cabinet'))
  const [blockedSlotsDomicile, setBlockedSlotsDomicile] = useState<BlockedSlots>(() => getStoredBlocked('domicile'))
  const [activeTab, setActiveTab] = useState<'calendar' | 'reservations' | 'settings'>('calendar')
  const [customSlotsCabinet, setCustomSlotsCabinet] = useState<string[]>(() => getStoredSlots('cabinet'))
  const [customSlotsDomicile, setCustomSlotsDomicile] = useState<string[]>(() => getStoredSlots('domicile'))

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

  const updateStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const blockedSlotsCurrent = locationCalendarType === 'cabinet' ? blockedSlotsCabinet : blockedSlotsDomicile
  const setBlockedSlotsCurrent = locationCalendarType === 'cabinet' ? setBlockedSlotsCabinet : setBlockedSlotsDomicile
  const customSlotsCurrent = locationCalendarType === 'cabinet' ? customSlotsCabinet : customSlotsDomicile

  const toggleBlockSlot = (date: Date, time: string) => {
    const key = date.toISOString().split('T')[0]
    setBlockedSlotsCurrent(prev => {
      const current = prev[key] || []
      return { ...prev, [key]: current.includes(time) ? current.filter(t => t !== time) : [...current, time] }
    })
  }

  const isSlotBlocked = (date: Date, time: string) => blockedSlotsCurrent[date.toISOString().split('T')[0]]?.includes(time) || false
  const getReservationsForDate = (date: Date) => reservations.filter(r => r.date.toDateString() === date.toDateString())

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
    today: reservations.filter(r => r.date.toDateString() === new Date().toDateString()).length,
    week: reservations.filter(r => { const now = new Date(), week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); return r.date >= now && r.date <= week }).length,
    pending: reservations.filter(r => r.status === 'pending').length,
    revenue: reservations.filter(r => r.status === 'confirmed').reduce((s, r) => s + r.price, 0),
    deposits: reservations.filter(r => r.status === 'confirmed').reduce((s, r) => s + r.deposit, 0)
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
                  const dayRes = getReservationsForDate(date)
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
                      {customSlotsCurrent.map(time => {
                        const res = getReservationsForDate(selectedDate).find(r => r.timeSlot === time)
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
                    {getReservationsForDate(selectedDate).length === 0 ? (
                      <p className="text-sm text-dark/50 italic font-body">Aucune réservation</p>
                    ) : (
                      <div className="space-y-2">
                        {getReservationsForDate(selectedDate).map(r => (
                          <div key={r.id} className="bg-sand rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="font-body font-medium text-dark text-sm">{r.timeSlot}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                {r.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                              </span>
                            </div>
                            <p className="text-sm text-dark/70 font-body">{r.client}</p>
                            <p className="text-xs text-dark/50 font-body">{r.soin}</p>
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
          <div className="space-y-4">
            {reservations.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-semibold text-dark">{r.soin}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${r.status === 'confirmed' ? 'bg-success/10 text-success' : r.status === 'cancelled' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>
                        {r.status === 'confirmed' ? 'Confirmé' : r.status === 'cancelled' ? 'Annulé' : 'En attente'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-body">
                      <div className="flex items-center gap-2 text-dark/60"><User className="w-4 h-4" /> {r.client}</div>
                      <div className="flex items-center gap-2 text-dark/60"><Calendar className="w-4 h-4" /> {r.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                      <div className="flex items-center gap-2 text-dark/60"><Clock className="w-4 h-4" /> {r.timeSlot}</div>
                      <div className="flex items-center gap-2 text-dark/60"><Euro className="w-4 h-4" /> {r.price}€ (acompte: {r.deposit}€)</div>
                    </div>
                  </div>
                  {r.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateStatus(r.id, 'confirmed')} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20"><Check className="w-5 h-5" /></button>
                      <button onClick={() => updateStatus(r.id, 'cancelled')} className="p-2 rounded-lg bg-error/10 text-error hover:bg-error/20"><X className="w-5 h-5" /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="card p-6 max-w-3xl space-y-8">
            <h3 className="font-heading font-semibold text-xl text-dark">Horaires et jours disponibles</h3>
            <p className="text-dark/60 font-body text-sm">Définissez les créneaux proposés pour le cabinet et pour les interventions à domicile. Les clients verront uniquement les créneaux que vous activez ici.</p>

            <div>
              <h4 className="font-body font-medium text-dark mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-sage" /> Heures disponibles – Cabinet (Lacanau Océan)</h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(time => {
                  const isActive = customSlotsCabinet.includes(time)
                  return (
                    <button
                      key={time}
                      onClick={() => {
                        const next = isActive ? customSlotsCabinet.filter(t => t !== time) : [...customSlotsCabinet, time].sort()
                        setCustomSlotsCabinet(next)
                        setStoredSlots('cabinet', next)
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-body ${isActive ? 'bg-sage text-cream' : 'bg-sand text-dark/60 hover:bg-sand-dark'}`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <h4 className="font-body font-medium text-dark mb-3 flex items-center gap-2"><Home className="w-5 h-5 text-sage" /> Heures disponibles – À domicile</h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(time => {
                  const isActive = customSlotsDomicile.includes(time)
                  return (
                    <button
                      key={time}
                      onClick={() => {
                        const next = isActive ? customSlotsDomicile.filter(t => t !== time) : [...customSlotsDomicile, time].sort()
                        setCustomSlotsDomicile(next)
                        setStoredSlots('domicile', next)
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-body ${isActive ? 'bg-sage text-cream' : 'bg-sand text-dark/60 hover:bg-sand-dark'}`}
                    >
                      {time}
                    </button>
                  )
                })}
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
