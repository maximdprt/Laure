import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Tarifs() {
  const tarifs = [
    {
      service: 'Test de Profil Chromatique',
      prix: '50€',
      duree: '1h30',
    },
    {
      service: 'Étude essence personnelle',
      prix: '50€',
      duree: '1h',
    },
    {
      service: 'Séance Chromothérapie',
      prix: '35€',
      duree: '30 min',
    },
    {
      service: 'Chromo-bio-puncture / Auriculothérapie',
      prix: '75€',
      duree: '',
    },
    {
      service: 'Soin Chromo-énergétique',
      prix: '50€',
      duree: '',
    },
    {
      service: 'Soin des 7 chakras',
      prix: '135€',
      duree: '',
    },
    {
      service: 'Préparation personnalisée (Florathérapie)',
      prix: '18€',
      duree: '',
    },
    {
      service: 'Massage Sportif - 30 min',
      prix: '30€',
      duree: '30 min',
    },
    {
      service: 'Massage Sportif - 1h',
      prix: '60€',
      duree: '1h',
    },
    {
      service: 'Massage Sportif - 1h30',
      prix: '90€',
      duree: '1h30',
    },
  ]

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            Tarifs
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez nos tarifs pour tous nos soins
          </p>
        </motion.section>

        {/* Tarifs Table */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 md:p-12 card-shadow mb-12 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-serif font-semibold text-gray-800 text-lg">
                  Prestation
                </th>
                <th className="text-right py-4 px-4 font-serif font-semibold text-gray-800 text-lg">
                  Durée
                </th>
                <th className="text-right py-4 px-4 font-serif font-semibold text-gray-800 text-lg">
                  Prix
                </th>
              </tr>
            </thead>
            <tbody>
              {tarifs.map((tarif, index) => (
                <motion.tr
                  key={tarif.service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-coral-pale/30 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-700">{tarif.service}</td>
                  <td className="py-4 px-4 text-right text-gray-600">
                    {tarif.duree || '-'}
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-800">
                    {tarif.prix}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.section>

        {/* Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-coral-pale rounded-2xl p-8 text-center"
        >
          <p className="text-lg text-gray-700 mb-6">
            Pour toute question sur nos tarifs ou pour réserver une séance, n'hésitez pas
            à nous contacter.
          </p>
          <Link to="/contact">
            <button className="bg-coral-DEFAULT text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-light transition-colors">
              Nous contacter
            </button>
          </Link>
        </motion.section>
      </div>
    </div>
  )
}