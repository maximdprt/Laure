import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'

export default function Prestations() {
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
    <div className="min-h-screen bg-soft-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-16 text-center"
        >
          Nos 6 spécialités
        </motion.h1>

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
    </div>
  )
}