// ==================== COMPOSANT: ReservationsList (Admin) ====================

import { motion } from 'framer-motion'
import { useReservations } from '../hooks/useReservations'
import { Calendar, MapPin, Clock, Mail, Phone } from 'lucide-react'
import { parseLocalDate } from '../lib/dateUtils'

const ReservationsList = () => {
  const { reservations, loading, error } = useReservations()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        <span className="ml-3">Chargement des réservations...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Erreur: {error}
      </div>
    )
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Aucune réservation confirmée</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading font-bold text-2xl text-dark mb-6">
        Réservations <span className="text-gold">en temps réel</span>
      </h2>

      {reservations.map((reservation, index) => (
        <motion.div
          key={reservation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="card p-6 border-l-4 border-gold hover:shadow-lg transition-shadow"
        >
          {/* Header avec nom et service */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-dark">
                {reservation.users?.prenom} {reservation.users?.nom}
              </h3>
              <p className="text-gold font-medium">{reservation.services?.nom}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              reservation.statut === 'confirmée' ? 'bg-green-100 text-green-700' :
              reservation.statut === 'en attente' ? 'bg-yellow-100 text-yellow-700' :
              reservation.statut === 'complétée' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {reservation.statut}
            </span>
          </div>

          {/* Grid d'infos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Date et heure */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Date & Heure</p>
                <p className="font-medium text-dark">
                  {parseLocalDate(reservation.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}{' '}
                  à {reservation.heure}
                </p>
              </div>
            </div>

            {/* Durée */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Durée</p>
                <p className="font-medium text-dark">{reservation.duree} minutes</p>
              </div>
            </div>

            {/* Lieu */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Lieu</p>
                <p className="font-medium text-dark capitalize">{reservation.lieu}</p>
              </div>
            </div>

            {/* Prix */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-gold font-bold">€</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Prix</p>
                <p className="font-medium text-dark">{reservation.services?.prix.toFixed(2)}€</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail className="w-4 h-4 text-gold" />
              <a href={`mailto:${reservation.users?.email}`} className="hover:text-gold transition-colors">
                {reservation.users?.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4 text-gold" />
              <a href={`tel:${reservation.users?.telephone}`} className="hover:text-gold transition-colors">
                {reservation.users?.telephone}
              </a>
            </div>
          </div>

          {/* Notes */}
          {reservation.notes && (
            <div className="mt-4 p-3 bg-sage/10 rounded text-sm text-dark">
              <p className="font-semibold mb-1">Notes:</p>
              <p>{reservation.notes}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default ReservationsList
