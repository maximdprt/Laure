import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ServiceCardProps {
  number: number
  title: string
  description: string
  bgColor: 'blue-grey' | 'peach' | 'coral'
  link?: string
}

export default function ServiceCard({
  number,
  title,
  description,
  bgColor,
  link,
}: ServiceCardProps) {
  const bgColors = {
    'blue-grey': 'bg-blue-grey-light',
    peach: 'bg-coral-pale',
    coral: 'bg-coral-light',
  }

  const buttonColors = {
    'blue-grey': 'border-white text-white',
    peach: 'border-coral-light text-white bg-coral-light',
    coral: 'border-white text-white',
  }

  const cardContent = (
    <motion.div
      whileHover={{ y: -4 }}
      className={`${bgColors[bgColor]} rounded-lg p-8 h-full card-shadow ${link ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl font-bold text-gray-700">{number}.</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <div
        className={`px-6 py-2 rounded border-2 ${buttonColors[bgColor]} font-medium text-sm transition-all hover:opacity-90 inline-block`}
      >
        En savoir plus
      </div>
    </motion.div>
  )

  if (link) {
    return (
      <Link to={link} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}