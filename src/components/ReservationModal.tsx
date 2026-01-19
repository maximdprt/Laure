import { motion, AnimatePresence } from 'framer-motion'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl p-8 max-w-md w-full relative border border-white/20">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">
                  Réserver un Créneau
                </h2>

                <div className="space-y-4 text-white/90">
                  <p>
                    Pour réserver un créneau, merci de me contacter par téléphone
                    ou email pour valider votre disponibilité.
                  </p>

                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-cyan-400">
                      Système d'acompte
                    </h3>
                    <p className="text-sm">
                      Une fois le créneau validé, un acompte sera demandé pour
                      confirmer votre réservation. Le reste du paiement se fera
                      lors de la séance.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/70">
                      <strong>Note :</strong> Le système de paiement en ligne
                      pour l'acompte sera disponible prochainement.
                    </p>
                    {/* TODO: Intégrer système de paiement (Stripe/PayPal) pour acompte */}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    Fermer
                  </button>
                  <a
                    href="/contact"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-400 hover:to-cyan-500 text-center transition-all"
                  >
                    Aller au Contact
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
