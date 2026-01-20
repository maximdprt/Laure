import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero : performance & océan */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img
            src="/images/person-ocean.jpg"
            alt="Océan au coucher du soleil"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.opacity = '0'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche : texte + CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-coral-pale/60 text-xs font-semibold tracking-[0.2em] uppercase text-gray-700">
                <span>Massages sportifs</span>
                <span className="w-1 h-1 rounded-full bg-gray-500" />
                <span>Soins énergétiques</span>
                <span className="w-1 h-1 rounded-full bg-gray-500" />
                <span>Lacanau</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                La performance au cœur de l&apos;océan
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                Massages sportifs de haute précision &amp; soins vibratoires pour les corps engagés,
                les esprits exigeants et les âmes en quête d&apos;alignement, à Lacanau.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <button className="px-8 py-4 rounded-full bg-coral-DEFAULT text-white font-semibold text-sm tracking-wide shadow-lg hover:bg-coral-light transition-colors">
                    Réserver un massage
                  </button>
                </Link>
                <Link to="/offres-tarifs">
                  <button className="px-8 py-4 rounded-full border border-gray-900 text-gray-900 font-semibold text-sm tracking-wide bg-white/70 hover:bg-gray-50 transition-colors">
                    Voir les tarifs
                  </button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 max-w-md">
                MASSAGE AURA PERFORMANCE LACANAU propose des protocoles sportifs ciblés et des soins
                énergétiques d&apos;exception pour optimiser votre récupération, votre vitalité et votre
                équilibre intérieur.
              </p>
            </motion.div>

            {/* Colonne droite : logo + carte courte */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 flex flex-col items-center lg:items-end"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/70 p-8 flex flex-col items-center">
                <img
                  src="/images/Gemini_Generated_Image_xspuf8xspuf8xspu_cleanup.png"
                  alt="Logo Massage Aura Performance Lacanau"
                  className="h-20 w-auto mb-4"
                />
                <p className="text-sm uppercase tracking-[0.22em] text-gray-600 text-center">
                  MASSAGE AURA PERFORMANCE LACANAU
                </p>
                <p className="mt-4 text-sm text-gray-700 text-center max-w-xs">
                  Une approche qui marie performance physique, précision du geste et rééquilibrage
                  énergétique profond.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section split : Performance sportive / Soin holistique */}
      <section className="py-20 bg-soft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-10 text-center"
          >
            Deux univers complémentaires
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance sportive */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-white"
            >
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                Performance sportive
              </h3>
              <p className="text-gray-700 mb-6">
                Des protocoles de massage sportif pensés pour préparer, activer, récupérer et optimiser
                votre potentiel, que vous soyez sportif amateur ou athlète confirmé.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• OCEAN PERFORMANCE – Activation 30’ (bas du corps, préparation à l&apos;effort)</li>
                <li>• OCEAN RECOVERY – Detox 30’ (récupération &amp; drainage)</li>
                <li>• OCEAN ATHLETIC – 60’ (massage sportif profond global)</li>
                <li>• OCEAN ELITE – 90’ (Deep Reset complet, expérience peak condition)</li>
              </ul>
              <Link to="/offres-tarifs">
                <button className="px-6 py-3 rounded-full bg-coral-DEFAULT text-white text-sm font-semibold hover:bg-coral-light transition-colors">
                  Découvrir les massages sportifs
                </button>
              </Link>
            </motion.div>

            {/* Soin holistique */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-white"
            >
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                Soin holistique &amp; vibratoire
              </h3>
              <p className="text-gray-700 mb-6">
                Des soins énergétiques profonds inspirés par l&apos;océan, les couleurs et les cristaux,
                pour réharmoniser le corps, le cœur et l&apos;esprit.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• OCEAN FLOW – Harmonisation &amp; circulation de l&apos;énergie vitale</li>
                <li>• OCEAN LUMINA – 90’ : soin d&apos;exception aux couleurs, cristaux &amp; huiles Aura-Soma®</li>
              </ul>
              <Link to="/offres-tarifs">
                <button className="px-6 py-3 rounded-full border border-gray-900 text-gray-900 text-sm font-semibold bg-white hover:bg-gray-50 transition-colors">
                  Voir les soins énergétiques
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section lieu : Espace HEAL LO Lacanau */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Espace HEAL LO LACANAU
              </h2>
              <p className="text-gray-700 mb-4">
                Vos séances se déroulent dans un cadre apaisant, à quelques minutes de l&apos;océan,
                pensé pour favoriser la récupération, le lâcher-prise et la connexion à soi.
              </p>
              <p className="text-gray-700 mb-4">
                Adresse :
                <br />
                Espace HEAL LO LACANAU
                <br />
                7 rue Jean Michel, 33680 LACANAU
              </p>
              <p className="text-gray-700">
                Séances possibles au cabinet ou à domicile (selon disponibilités et zones desservies).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white">
                <img
                  src="/images/contact-background.jpg"
                  alt="Ambiance océan et bien-être à Lacanau"
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}