import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function MassageSportif() {
  const objectifs = [
    'Chauffer et détendre les muscles en préparation ou après l\'effort.',
    'Assouplir les articulations en éliminant les toxines générées par l\'effort.',
    'Libérer les nœuds de contractures et de courbatures.',
    'Agir en prévention des crampes et d\'éventuels accidents musculo-tendineux.',
    'Retrouver la vitalité, la souplesse et la mobilité musculaire.',
    'Relaxer le mental stressé et apaiser l\'émotionnel compétiteur.',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Image de fond noir et blanc */}
        <div className="absolute inset-0">
          <img
            src="/images/massage-sportif-hero.jpg"
            alt="Massage sportif"
            className="w-full h-full object-cover grayscale"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Contenu overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Ligne verticale rose */}
            <div className="w-1 h-20 bg-coral-light mb-6"></div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4"
            >
              Massage sportif
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">DEEP TISSUE</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white mb-8"
            >
              Massage tonique pour une détente en profondeur
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/contact">
                <button className="bg-coral-light text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-coral-DEFAULT transition-colors">
                  Prendre rendez-vous
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Objectifs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image gauche */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Illustration plante */}
              <div className="absolute -left-8 top-0 w-32 h-64 opacity-30">
                <svg viewBox="0 0 100 200" className="w-full h-full">
                  <path
                    d="M 50 200 L 50 50 M 30 80 L 20 100 L 40 110 M 70 90 L 80 120 L 60 130"
                    fill="none"
                    stroke="#7FB3A3"
                    strokeWidth="2"
                  />
                  <ellipse cx="25" cy="105" rx="8" ry="15" fill="#7FB3A3" opacity="0.4" />
                  <ellipse cx="75" cy="125" rx="8" ry="15" fill="#7FB3A3" opacity="0.4" />
                </svg>
              </div>
              <img
                src="/images/massage-back.jpg"
                alt="Massage du dos"
                className="w-full rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </motion.div>

            {/* Liste objectifs droite */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-8">
                Objectifs du massage sportif :
              </h2>
              <ul className="space-y-4">
                {objectifs.map((objectif, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-coral-DEFAULT mr-3 text-xl">✓</span>
                    <span className="text-gray-700 text-lg leading-relaxed">{objectif}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section "Un massage tonique" */}
      <section className="py-20 bg-coral-pale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texte gauche */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
                Un massage tonique
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Même ceux qui ne sont pas de grands sportifs sont adeptes de ce{' '}
                  <em className="italic">massage tonique</em> qui apporte une excellente détente.
                </p>
                <p>
                  C'est un massage profond libérateur des zones engorgées de toxines car il apporte
                  un réel confort surtout après un effort intense prolongé.
                </p>
                <p>
                  Le travail se fait sur tout le{' '}
                  <span className="text-coral-DEFAULT font-semibold">
                    système musculo-tendineux
                  </span>{' '}
                  et permet aux sportifs de retrouver une souplesse musculaire et articulaire et
                  de les libérer de leurs contractures.
                </p>
              </div>
            </motion.div>

            {/* Image droite */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="border-4 border-coral-DEFAULT rounded-lg p-2">
                <img
                  src="/images/massage-tonique.jpg"
                  alt="Massage tonique"
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
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