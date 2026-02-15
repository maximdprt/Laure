// ==================== HELPER: Supabase API ====================

import { supabase } from '../lib/supabase'
import { Reservation, Disponibilite } from '../types/database'
import { parseLocalDate } from '../lib/dateUtils'

// ==================== RESERVATIONS ====================

export const createReservation = async (data: {
  nom: string
  prenom: string
  email: string
  telephone: string
  service_id: string
  date: string // YYYY-MM-DD
  heure: string // HH:MM
  lieu: 'cabinet' | 'domicile'
  duree: number
  notes?: string
}) => {
  // 1. Crée ou trouve l'utilisateur
  const { data: existingUsers } = await supabase
    .from('users')
    .select('id')
    .eq('email', data.email)

  let user_id: string

  if (existingUsers && existingUsers.length > 0) {
    user_id = existingUsers[0].id
  } else {
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email: data.email,
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone
        }
      ])
      .select('id')
      .single()

    if (error) throw error
    user_id = newUser!.id
  }

  // 2. Crée la réservation
  const { data: reservation, error } = await supabase
    .from('reservations')
    .insert([
      {
        user_id,
        service_id: data.service_id,
        date: data.date,
        heure: data.heure,
        lieu: data.lieu,
        duree: data.duree,
        notes: data.notes,
        statut: 'en attente'
      }
    ])
    .select('*')
    .single()

  if (error) {
    if (error.code === '23505') {
      throw new Error('Créneau déjà réservé')
    }
    throw error
  }

  return reservation
}

// Mettre à jour une réservation
export const updateReservation = async (reservationId: string, updates: Partial<Reservation>) => {
  const { error } = await supabase
    .from('reservations')
    .update(updates)
    .eq('id', reservationId)

  if (error) throw error
}

export const updateReservationStatus = async (id: string, statut: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .update({ statut, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data
}

export const deleteReservation = async (id: string) => {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getReservationsByDate = async (date: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, users(*), services(*)')
    .eq('date', date)
    .eq('statut', 'confirmée')

  if (error) throw error
  return data
}

// ==================== JOURS BLOQUES ====================

export const addJourBloque = async (date: string, raison?: string) => {
  const { data, error } = await supabase
    .from('jours_bloques')
    .insert([{ date, raison }])
    .select('*')
    .single()

  if (error) throw error
  return data
}

export const removeJourBloque = async (id: string) => {
  const { error } = await supabase
    .from('jours_bloques')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ==================== DISPONIBILITES ====================

export const updateDisponibilite = async (
  jour_semaine: number,
  heure_debut: string,
  heure_fin: string
) => {
  // Vérifie si existe
  const { data: existing } = await supabase
    .from('disponibilites')
    .select('id')
    .eq('jour_semaine', jour_semaine)
    .single()

  if (existing) {
    const { data, error } = await supabase
      .from('disponibilites')
      .update({ heure_debut, heure_fin })
      .eq('jour_semaine', jour_semaine)
      .select('*')
      .single()

    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
      .from('disponibilites')
      .insert([{ jour_semaine, heure_debut, heure_fin }])
      .select('*')
      .single()

    if (error) throw error
    return data
  }
}

export const getDisponibilitesByJour = async (jour_semaine: number) => {
  const { data, error } = await supabase
    .from('disponibilites')
    .select('*')
    .eq('jour_semaine', jour_semaine)
    .single()

  if (error) throw error
  return data
}

// ==================== UTILITIES ====================

// Retourne les créneaux disponibles pour une date
export const getCreneauxDisponibles = async (
  date: string,
  duree: number,
  disponibilites: Disponibilite[],
  reservations: Reservation[]
) => {
  const dateObj = parseLocalDate(date)
  const jourSemaine = dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1 // 0=Lundi

  const disponibilite = disponibilites.find(d => d.jour_semaine === jourSemaine)

  if (!disponibilite) {
    return [] // Jour fermé
  }

  const [startHour, startMin] = disponibilite.heure_debut.split(':').map(Number)
  const [endHour, endMin] = disponibilite.heure_fin.split(':').map(Number)

  const creneaux: string[] = []
  let current = new Date()
  current.setHours(startHour, startMin, 0, 0)

  const endTime = new Date()
  endTime.setHours(endHour, endMin, 0, 0)

  while (current < endTime) {
    const heureStr = `${String(current.getHours()).padStart(2, '0')}:${String(current.getMinutes()).padStart(2, '0')}`

    // Vérifie si le créneau est occupé
    const isOccupied = reservations.some(r => {
      const resStart = new Date(`${r.date}T${r.heure}`)
      const resEnd = new Date(resStart.getTime() + r.duree * 60000)
      const creneauStart = new Date(`${date}T${heureStr}`)
      const creneauEnd = new Date(creneauStart.getTime() + duree * 60000)

      return !(creneauEnd <= resStart || creneauStart >= resEnd)
    })

    if (!isOccupied) {
      creneaux.push(heureStr)
    }

    current.setMinutes(current.getMinutes() + 30) // Intervalle de 30 min
  }

  return creneaux
}
