import { Soin } from '../types'

// Massages Sportifs
export const massagesSportifs: Soin[] = [
  {
    id: 'ocean-performance',
    name: 'OCEAN PERFORMANCE',
    subtitle: 'Activation 30\'',
    duration: 30,
    price: 45,
    category: 'sportif',
    description: 'Préparation – cuisses / mollets / pieds. Massage ciblé bas du corps – préparation musculaire – préparation à l\'effort.'
  },
  {
    id: 'ocean-recovery',
    name: 'OCEAN RECOVERY',
    subtitle: 'Detox 30\'',
    duration: 30,
    price: 45,
    category: 'sportif',
    description: 'Récupération – bas du corps + acupressure & drainage. Récupération sportive & élimination des toxines, relâchement profond.'
  },
  {
    id: 'ocean-athletic',
    name: 'OCEAN ATHLETIC',
    subtitle: 'Massage Sportif 60\'',
    duration: 60,
    price: 85,
    category: 'sportif',
    description: 'Massage sportif profond et personnalisé Athletic Balance. Haut du corps + bas du corps. En préparation ou récupération.',
    popular: true
  },
  {
    id: 'ocean-elite',
    name: 'OCEAN ELITE',
    subtitle: 'Massage Complet 90\'',
    duration: 90,
    price: 130,
    category: 'sportif',
    description: 'Préparation ou récupération complète du corps. Massage Deep Reset. Haut du corps, bas du corps, acupressure. Expérience peak condition.'
  }
]

// Soins Énergétiques
export const soinsEnergetiques: Soin[] = [
  {
    id: 'ocean-flow',
    name: 'OCEAN FLOW',
    subtitle: 'Harmonisation & circulation de l\'énergie vitale',
    duration: 60,
    price: 90,
    category: 'energie',
    tagline: 'Laissez l\'énergie circuler, comme une vague qui apaise et régénère.',
    description: 'Soin énergétique de 60 minutes, conçu comme une vague de rééquilibrage profond, idéale pour relancer l\'énergie vitale, apaiser le mental et retrouver un état de calme intérieur durable.',
    benefits: [
      'Rééquilibrage global de l\'énergie',
      'Apaisement du système nerveux',
      'Libération des tensions émotionnelles',
      'Amélioration de la circulation énergétique',
      'Sensation de calme, de stabilité et de fluidité intérieure'
    ]
  },
  {
    id: 'ocean-lumina',
    name: 'OCEAN LUMINA',
    subtitle: 'Soin aux couleurs, cristaux et vibrations',
    duration: 90,
    price: 220,
    category: 'energie',
    tagline: 'Là où la couleur devient lumière, et la lumière, transformation.',
    description: 'Expérience énergétique rare et profondément transformatrice, conçue pour éveiller votre éclat intérieur et réharmoniser votre être dans toutes ses dimensions.',
    benefits: [
      'Harmonisation complète du champ énergétique',
      'Libération des blocages émotionnels',
      'Apaisement mental et clarté intérieure',
      'Éveil de la conscience et recentrage profond',
      'Sensation durable de paix, de vitalité et d\'alignement'
    ],
    premium: true
  }
]

// Tous les soins
export const allSoins: Soin[] = [...massagesSportifs, ...soinsEnergetiques]

// Option Premium
export const PREMIUM_OPTION_PRICE = 20

// Pourcentage d'acompte
export const DEPOSIT_PERCENTAGE = 30

// Créneaux par défaut
export const DEFAULT_TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']

// Helpers
export const getSoinById = (id: string): Soin | undefined => allSoins.find(s => s.id === id)
export const getSoinsByCategory = (category: 'sportif' | 'energie'): Soin[] => allSoins.filter(s => s.category === category)
