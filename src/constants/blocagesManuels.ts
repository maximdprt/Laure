// ==================== BLOCAGES MANUELS (définis dans le code) ====================
//
// Ces blocages s'ajoutent à ceux gérés depuis l'espace admin (table Supabase
// `creneaux_bloques`). Ils sont appliqués côté client, sans aucun appel à la
// base : ils fonctionnent donc même si Supabase est indisponible.
//
// ⚠️ Ils ne peuvent PAS être retirés depuis l'espace admin : pour rouvrir une
// date listée ici, il faut supprimer sa ligne dans ce fichier puis redéployer.

import type { LocationType } from './services'

export interface CreneauBloqueManuel {
  date: string // YYYY-MM-DD
  heure: string // HH:MM
  lieu: LocationType
}

// Journées entièrement fermées (cabinet + domicile)
export const JOURS_BLOQUES_MANUELS: string[] = [
  '2026-08-22', // samedi 22 août 2026 — fermé toute la journée
  '2026-08-23'  // dimanche 23 août 2026 — fermé toute la journée
]

// Créneaux fermés à l'unité
const CRENEAUX_JEUDI_20_AOUT: CreneauBloqueManuel[] = ['17:00', '18:00', '19:00'].flatMap(heure => [
  { date: '2026-08-20', heure, lieu: 'cabinet' as LocationType },
  { date: '2026-08-20', heure, lieu: 'domicile' as LocationType }
])

export const CRENEAUX_BLOQUES_MANUELS: CreneauBloqueManuel[] = [
  ...CRENEAUX_JEUDI_20_AOUT // jeudi 20 août 2026 — 17h, 18h et 19h
]

export const estJourBloqueManuel = (dateKey: string) =>
  JOURS_BLOQUES_MANUELS.includes(dateKey)

export const estCreneauBloqueManuel = (dateKey: string, heure: string, lieu: LocationType) =>
  CRENEAUX_BLOQUES_MANUELS.some(c =>
    c.date === dateKey && c.heure === heure.slice(0, 5) && c.lieu === lieu
  )
