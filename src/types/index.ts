// Types pour les soins
export interface Soin {
  id: string
  name: string
  subtitle: string
  duration: number
  price: number
  category: 'sportif' | 'energie'
  description?: string
  benefits?: string[]
  tagline?: string
  popular?: boolean
  premium?: boolean
}

// Types pour les réservations
export interface Reservation {
  id: string
  client: string
  email: string
  phone: string
  soin: string
  date: Date
  timeSlot: string
  price: number
  deposit: number
  status: 'pending' | 'confirmed' | 'cancelled'
}

// Types pour le booking
export interface BookingData {
  soin: Soin | null
  premiumOption: boolean
  date: Date | null
  timeSlot: string | null
  clientInfo: ClientInfo | null
}

export interface ClientInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

// Types pour l'admin
export interface BlockedSlots {
  [date: string]: string[]
}

export interface AdminStats {
  today: number
  week: number
  pending: number
  revenue: number
  deposits: number
}
