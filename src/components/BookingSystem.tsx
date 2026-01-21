import { useState } from 'react'

export interface Slot {
  id: string
  time: string
  isAvailable: boolean
}

const TIME_LABELS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const UNAVAILABLE_IDS = new Set(['10:00', '14:00', '16:00'])

const INITIAL_SLOTS: Slot[] = TIME_LABELS.map((time) => ({
  id: time,
  time,
  isAvailable: !UNAVAILABLE_IDS.has(time),
}))

export default function BookingSystem() {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)

  const handleSelect = (slot: Slot) => {
    if (!slot.isAvailable) return
    setSelectedSlotId((current) => (current === slot.id ? null : slot.id))
  }

  const handleConfirmReservation = () => {
    if (!selectedSlotId) return

    // Créer la date du rendez-vous (exemple : demain à l'heure sélectionnée)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [hours, minutes] = selectedSlotId.split(':')
    tomorrow.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    // Durée de 1h par défaut
    const endTime = new Date(tomorrow)
    endTime.setHours(endTime.getHours() + 1)

    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '')
    }

    const startISO = formatDateForGoogle(tomorrow)
    const endISO = formatDateForGoogle(endTime)

    // Détails de l'événement
    const eventTitle = 'Massage AURA Performance Lacanau'
    const eventLocation = 'Espace HEAL LO LACANAU, 7 rue Jean Michel, 33680 LACANAU'
    const eventDetails = 'Séance de massage sportif/bien-être.\n\nContact: 06 62 09 94 17\nEmail: contact.nlight@gmail.com'

    // Créer le lien Google Calendar
    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render')
    googleCalendarUrl.searchParams.append('action', 'TEMPLATE')
    googleCalendarUrl.searchParams.append('text', eventTitle)
    googleCalendarUrl.searchParams.append('dates', `${startISO}/${endISO}`)
    googleCalendarUrl.searchParams.append('details', eventDetails)
    googleCalendarUrl.searchParams.append('location', eventLocation)
    googleCalendarUrl.searchParams.append('ctz', 'Europe/Paris')

    // Ouvrir dans un nouvel onglet
    window.open(googleCalendarUrl.toString(), '_blank', 'noopener,noreferrer')

    // Afficher un message de confirmation
    alert(`✅ Réservation confirmée pour ${selectedSlotId} !\n\nGoogle Calendar va s'ouvrir pour ajouter l'événement à votre agenda.`)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-2xl border border-coral-pale/60 shadow-lg shadow-coral-pale/30 p-6 sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Réserver votre créneau</h2>
        <p className="mt-2 text-sm text-gray-600">Choisissez l'heure qui vous convient pour finaliser votre rendez-vous.</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {INITIAL_SLOTS.map((slot) => {
          const isSelected = selectedSlotId === slot.id
          const baseClasses = 'w-full rounded-lg border px-3 py-3 text-sm font-semibold transition-all duration-150'
          const availableClasses = 'border-blue-500 text-blue-600 hover:bg-blue-50 hover:shadow'
          const unavailableClasses = 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 border-gray-200'
          const selectedClasses = 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'

          const variantClasses = !slot.isAvailable
            ? unavailableClasses
            : isSelected
              ? selectedClasses
              : availableClasses

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => handleSelect(slot)}
              disabled={!slot.isAvailable}
              className={`${baseClasses} ${variantClasses}`}
            >
              {slot.time}
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={!selectedSlotId}
          onClick={handleConfirmReservation}
          className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 shadow-md border ${
            selectedSlotId
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-600 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed'
          }`}
        >
          ✅ Confirmer et ajouter au calendrier
        </button>
      </div>
    </div>
  )
}
