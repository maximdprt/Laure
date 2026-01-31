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

// Massages Relaxants
export const massagesRelaxants: Soin[] = [
  {
    id: 'ocean-bliss',
    name: 'OCEAN BLISS',
    subtitle: '45 min – zones ou combos au choix',
    duration: 45,
    price: 59,
    category: 'relaxant',
    description: 'Offrez-vous un moment de relaxation totale. Ce massage bien-être est adapté à vos besoins et à votre confort : vous choisissez la ou les zones que vous souhaitez et laissez-vous transporter.',
    zonesSeules: ['Dos', 'Jambes / mollets / pieds', 'Bras / mains', 'Tête / nuque', 'Visage'],
    combos: ['Dos + Tête / Nuque', 'Dos + Bras + Tête', 'Jambes + Mollets + Pieds', 'Dos + Jambes / Mollets / Pieds', 'Visage + Tête / Nuque']
  },
  {
    id: 'ocean-serenity',
    name: 'OCEAN SERENITY',
    subtitle: '60 min – combos au choix',
    duration: 60,
    price: 79,
    category: 'relaxant',
    description: 'Massage relaxant 60 minutes. Un soin adapté à vos besoins pour une détente profonde.',
    combos: ['Dos + Bras + Tête', 'Dos + Jambes / Mollets / Pieds', 'Dos + Tête / Nuque + Visage', 'Dos + Bras + Visage']
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
      'Rééquilibrage énergétique',
      'Détente profonde',
      'Clarté mentale et émotionnelle',
      'Stimulation de la vitalité',
      'Harmonisation du corps et de l\'esprit'
    ]
  },
  {
    id: 'ocean-lumina',
    name: 'OCEAN LUMINA',
    subtitle: 'Soin aux couleurs, cristaux et vibrations',
    duration: 90,
    price: 220,
    category: 'energie',
    tagline: '',
    description: 'Plongez dans une expérience unique où couleurs, énergie et huiles premium AURA-SOMA se combinent pour offrir un soin profond ; un voyage à la rencontre de soi avec les couleurs, les sons, les cristaux, les plantes et la respiration.',
    benefits: [
      'Rééquilibrage énergétique puissant',
      'Détente absolue',
      'Clarté et sérénité intérieure',
      'Libération des blocages émotionnels',
      'Harmonie corps-esprit'
    ],
    premium: true
  }
]

// Tous les soins
export const allSoins: Soin[] = [...massagesSportifs, ...massagesRelaxants, ...soinsEnergetiques]

// Option Premium
export const PREMIUM_OPTION_PRICE = 20

// Pourcentage d'acompte
export const DEPOSIT_PERCENTAGE = 30

// Créneaux par défaut
export const DEFAULT_TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']

// Clés localStorage pour disponibilités Cabinet / Domicile
export const STORAGE_KEY_CABINET_SLOTS = 'aura_availability_cabinet'
export const STORAGE_KEY_DOMICILE_SLOTS = 'aura_availability_domicile'
export const STORAGE_KEY_BLOCKED_CABINET = 'aura_blocked_cabinet'
export const STORAGE_KEY_BLOCKED_DOMICILE = 'aura_blocked_domicile'

export type LocationType = 'cabinet' | 'domicile'

export function getStoredSlots(location: LocationType): string[] {
  const key = location === 'cabinet' ? STORAGE_KEY_CABINET_SLOTS : STORAGE_KEY_DOMICILE_SLOTS
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw) as string[]
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch (_) {}
  return [...DEFAULT_TIME_SLOTS]
}

export function getStoredBlocked(location: LocationType): Record<string, string[]> {
  const key = location === 'cabinet' ? STORAGE_KEY_BLOCKED_CABINET : STORAGE_KEY_BLOCKED_DOMICILE
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, string[]>
      if (parsed && typeof parsed === 'object') return parsed
    }
  } catch (_) {}
  return {}
}

export function setStoredSlots(location: LocationType, slots: string[]) {
  const key = location === 'cabinet' ? STORAGE_KEY_CABINET_SLOTS : STORAGE_KEY_DOMICILE_SLOTS
  localStorage.setItem(key, JSON.stringify(slots))
}

export function setStoredBlocked(location: LocationType, blocked: Record<string, string[]>) {
  const key = location === 'cabinet' ? STORAGE_KEY_BLOCKED_CABINET : STORAGE_KEY_BLOCKED_DOMICILE
  localStorage.setItem(key, JSON.stringify(blocked))
}

// Helpers
export const getSoinById = (id: string): Soin | undefined => allSoins.find(s => s.id === id)
export const getSoinsByCategory = (category: 'sportif' | 'energie' | 'relaxant'): Soin[] => allSoins.filter(s => s.category === category)
