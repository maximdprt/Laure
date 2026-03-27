// ==================== TYPES SUPABASE ====================

export interface User {
  id: string
  email: string
  nom: string
  prenom: string
  telephone: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  nom: string
  description?: string
  duree: number // en minutes
  prix: number
  created_at: string
}

export interface Disponibilite {
  id: string
  jour_semaine: number // 0=Lundi, 1=Mardi, ..., 4=Vendredi
  heure_debut: string // format HH:MM
  heure_fin: string // format HH:MM
  created_at: string
}

export interface JourBloque {
  id: string
  date: string // format YYYY-MM-DD
  raison?: string
  created_at: string
}

export interface CreneauHoraire {
  id: string
  lieu: 'cabinet' | 'domicile'
  heure: string // format HH:MM
  actif: boolean
  ordre: number
  created_at: string
  updated_at: string
}

export interface Reservation {
  id: string
  user_id?: string | null
  service_id: string
  date: string // format YYYY-MM-DD
  heure: string // format HH:MM
  lieu: 'cabinet' | 'domicile'
  duree: number // en minutes
  statut: 'en attente' | 'confirmée' | 'complétée' | 'annulée' | 'no-show'
  // Infos client stockées directement
  client_nom?: string | null
  client_prenom?: string | null
  client_email?: string | null
  client_telephone?: string | null
  google_event_id?: string
  payment_status?: 'pending' | 'paid' | 'failed' | 'canceled'
  stripe_payment_intent_id?: string
  deposit_amount_cents?: number | null
  total_amount_cents?: number | null
  notes?: string
  created_at: string
  updated_at: string
  // Relation service (optionnelle si joinée)
  services?: Service
}

export interface ReservationWithDetails extends Reservation {
  services: Service
}

export interface AvisRecord {
  id: string
  name: string
  text: string
  rating: number
  date: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface CreneauBloque {
  id: string
  date: string // YYYY-MM-DD
  heure: string // HH:MM
  lieu: 'cabinet' | 'domicile'
  created_at: string
}
