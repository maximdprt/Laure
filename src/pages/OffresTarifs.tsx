import { motion } from 'framer-motion'

export default function OffresTarifs() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Titre principal */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Offres &amp; Tarifs
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Massages sportifs de haute précision &amp; soins énergétiques d'exception à Lacanau.
          </p>
        </motion.header>

        {/* Section Massages Aura Performance */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-serif font-semibold text-gray-900"
          >
            Massages Aura Performance
          </motion.h2>
          <p className="text-gray-600 max-w-3xl">
            Une gamme de massages sportifs pensés pour la préparation, la récupération et l&apos;optimisation
            de la performance, inspirés par la puissance régénérante de l&apos;océan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ocean Performance */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-md border border-white/80 shadow-lg rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                  OCEAN PERFORMANCE – Activation 30’
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-coral-DEFAULT mb-3">
                  Massage sportif 30 min – Bas du corps
                </p>
                <p className="text-gray-700 mb-4">
                  Préparation ciblée des cuisses, mollets et pieds pour activer le bas du corps avant l&apos;effort.
                  Idéal en amont d&apos;une séance intense ou d&apos;une compétition.
                </p>
              </div>
              <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Durée : 30 min</span>
                <span className="text-xl font-semibold text-gray-900">45€</span>
              </div>
            </motion.article>

            {/* Ocean Recovery */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/70 backdrop-blur-md border border-white/80 shadow-lg rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                  OCEAN RECOVERY – Detox 30’
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-coral-DEFAULT mb-3">
                  Récupération – bas du corps &amp; drainage
                </p>
                <p className="text-gray-700 mb-4">
                  Massage de récupération ciblé du bas du corps, combinant acupressure et drainage pour favoriser
                  l&apos;élimination des toxines et un relâchement profond après l&apos;effort.
                </p>
              </div>
              <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Durée : 30 min</span>
                <span className="text-xl font-semibold text-gray-900">45€</span>
              </div>
            </motion.article>

            {/* Ocean Athletic */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-md border border-white/80 shadow-lg rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                  OCEAN ATHLETIC – 60’
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-coral-DEFAULT mb-3">
                  Massage sportif général ou ciblé
                </p>
                <p className="text-gray-700 mb-4">
                  Massage sportif profond et personnalisé « Athletic Balance », travaillant à la fois le haut et le bas
                  du corps, en préparation ou en récupération selon vos besoins.
                </p>
              </div>
              <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Durée : 60 min</span>
                <span className="text-xl font-semibold text-gray-900">85€</span>
              </div>
            </motion.article>

            {/* Ocean Elite */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-md border border-white/80 shadow-lg rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                  OCEAN ELITE – 90’
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-coral-DEFAULT mb-3">
                  Massage sportif complet 1h30
                </p>
                <p className="text-gray-700 mb-4">
                  L&apos;expérience ultime : préparation ou récupération complète du corps, massage Deep Reset du haut
                  et du bas du corps, acupressure et travail global pour une sensation de « peak condition ».
                </p>
              </div>
              <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Durée : 90 min</span>
                <span className="text-xl font-semibold text-gray-900">130€</span>
              </div>
            </motion.article>
          </div>

          {/* Option premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 bg-blue-grey-light/20 border border-blue-grey-light/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-900 mb-1">
                OCEAN CHROMOSPORT SIGNATURE
              </h3>
              <p className="text-sm uppercase tracking-[0.2em] text-coral-DEFAULT mb-3">
                Option premium – supplément 20€
              </p>
              <p className="text-gray-700 max-w-3xl">
                Tous nos massages peuvent être enrichis par ce protocole exclusif : huile bio personnalisée aux
                élixirs floraux et chromothérapie, inspirée de la Chromobioénergie® et des huiles Aura-Soma, pour
                une récupération encore plus profonde et vibratoire.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-coral-DEFAULT text-white text-sm font-semibold shadow-md">
                Option +20€
              </span>
            </div>
          </motion.div>
        </section>

        {/* Section Soins énergétiques */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-serif font-semibold text-gray-900"
          >
            Soins énergétiques Océan
          </motion.h2>
          <p className="text-gray-600 max-w-3xl">
            Des soins vibratoires profonds pour harmoniser l&apos;énergie vitale, apaiser le mental et réveiller
            l&apos;éclat intérieur, en résonance avec les couleurs, les cristaux et les fréquences de l&apos;océan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ocean Flow */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md border border-white/80 shadow-lg rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                  OCEAN FLOW
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-coral-DEFAULT mb-3">
                  Harmonisation &amp; circulation de l&apos;énergie vitale
                </p>
                <p className="text-gray-700 mb-4">
                  Soin énergétique d&apos;environ 60 minutes, pensé comme une vague de rééquilibrage profond pour
                  relancer l&apos;énergie vitale, apaiser le mental et retrouver un calme intérieur durable.
                </p>
                <p className="text-gray-700 mb-4">
                  À travers des appositions des mains, des mouvements fluides et un travail vibratoire subtil, ce
                  soin accompagne la circulation harmonieuse de l&apos;énergie dans tout le corps, favorisant un
                  état méditatif et le lâcher-prise.
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Rééquilibrage global de l&apos;énergie</li>
                  <li>• Apaisement du système nerveux</li>
                  <li>• Libération des tensions émotionnelles</li>
                  <li>• Amélioration de la circulation énergétique</li>
                  <li>• Sensation de calme, de stabilité et de fluidité intérieure</li>
                </ul>
              </div>
              <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Durée : ~60 min</span>
                <span className="text-sm text-gray-500 italic">Tarif communiqué lors de la prise de rendez-vous</span>
              </div>
            </motion.article>

            {/* Ocean Lumina */}
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-coral-pale/80 backdrop-blur-md border border-coral-light/70 shadow-xl rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                  OCEAN LUMINA – 90’
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-white mb-3">
                  Soin d&apos;exception aux couleurs, cristaux &amp; vibrations de l&apos;âme
                </p>
                <p className="text-gray-800 mb-4">
                  Une expérience énergétique rare et profondément transformatrice, inspirée par la sagesse des huiles
                  Aura-Soma®. Ocean Lumina allie chromothérapie, aromathérapie vibratoire et énergie des cristaux
                  pour réharmoniser tout votre être.
                </p>
                <p className="text-gray-800 mb-4">
                  Guidé par une sélection intuitive d&apos;essences colorées, ce rituel lent agit sur les plans
                  énergétique, émotionnel et spirituel : libération des blocages, apaisement du mental, alignement
                  intérieur et élévation de la conscience.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>• Harmonisation complète du champ énergétique</li>
                  <li>• Libération des blocages émotionnels</li>
                  <li>• Apaisement mental et clarté intérieure</li>
                  <li>• Éveil de la conscience et recentrage profond</li>
                  <li>• Sensation durable de paix, de vitalité et d&apos;alignement</li>
                </ul>
              </div>
              <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-coral-light/70">
                <span className="text-sm text-gray-800">Durée : 90 min</span>
                <span className="text-xl font-semibold text-gray-900">220€</span>
              </div>
            </motion.article>
          </div>
        </section>
      </div>
    </div>
  )
}

