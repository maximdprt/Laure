import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'

export default function Home() {
  const services = [
    {
      number: 1,
      title: 'BILAN',
      description: 'Bilan énergétique personnalisé.',
      bgColor: 'blue-grey' as const,
    },
    {
      number: 2,
      title: 'ACCOMPAGNEMENT',
      description: 'Un accompagnement sur mesure.',
      bgColor: 'blue-grey' as const,
    },
    {
      number: 3,
      title: 'LES ENFANTS',
      description: 'Des solutions et des soins adaptés à leur sensibilité.',
      bgColor: 'peach' as const,
    },
    {
      number: 4,
      title: 'GEOBIOLOGIE',
      description: 'Mieux vivre avec son environnement.',
      bgColor: 'peach' as const,
    },
    {
      number: 5,
      title: 'FENG SHUI',
      description: 'Faire circuler l\'énergie dans votre lieu de vie.',
      bgColor: 'peach' as const,
    },
    {
      number: 6,
      title: 'MASSAGE SPORTIF',
      description: 'Détente profonde et relaxation.',
      bgColor: 'coral' as const,
      link: '/massage-sportif',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Section principale 2 colonnes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Image femme avec ananas */}
              <div className="relative">
                <img
                  src="/images/woman-pineapple.jpg"
                  alt="Femme souriante avec ananas"
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    // Placeholder si l'image n'existe pas
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Ligne verticale rose */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-coral-light"></div>
              </div>

              {/* Citation Platon */}
              <div className="pl-8">
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  « Les maux du corps sont les mots de l'âme, ainsi on ne doit pas chercher
                  à guérir le corps sans chercher à guérir l'âme »
                </p>
                <p className="text-gray-600 mt-2">- Platon</p>
              </div>
            </motion.div>

            {/* Colonne droite */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Bloc texte rose */}
              <div className="bg-coral-pale rounded-lg p-10">
                <h2 className="text-3xl md:text-4xl font-sans font-semibold text-gray-800 leading-relaxed">
                  Pour retrouver un équilibre physique énergétique et émotionnel, donnez des
                  couleurs à votre âme.
                </h2>
              </div>

              {/* Image personne face à l'océan */}
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/person-ocean.jpg"
                  alt="Personne face à l'océan au coucher du soleil"
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6 spécialités */}
      <section className="py-20 bg-soft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-16 text-center"
          >
            Nos 6 spécialités
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Élixirs (aperçu) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
                Trouvez votre équilibre grâce aux élixirs
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Produits naturels agissant sur 3 plans : physique, mental et spirituel.
                Harmonisation des émotions par effet de résonance.
              </p>
              <Link to="/elixirs">
                <button className="bg-coral-DEFAULT text-white px-8 py-4 rounded-lg font-semibold hover:bg-coral-light transition-colors">
                  En savoir plus
                </button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src="/images/elixir-bottle.png"
                alt="Élixirs N.L.I.G.H.T."
                className="h-64 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}