// ==================== HOOK: useCreneauxHoraires (Temps réel) ====================

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { LocationType } from '../constants/services'

export interface CreneauHoraire {
  id: string
  lieu: 'cabinet' | 'domicile'
  heure: string
  actif: boolean
  ordre: number
  created_at: string
  updated_at: string
}

export const useCreneauxHoraires = (lieu: LocationType) => {
  const [creneaux, setCreneaux] = useState<CreneauHoraire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Récupère les créneaux initiaux
    const fetchCreneaux = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('creneaux_horaires')
          .select('*')
          .eq('lieu', lieu)
          .eq('actif', true)
          .order('ordre', { ascending: true })

        if (fetchError) {
          setError(fetchError.message)
          console.error('Erreur fetch créneaux:', fetchError)
        } else {
          setCreneaux(data || [])
        }
      } catch (err) {
        setError('Erreur lors de la récupération des créneaux')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCreneaux()

    // Souscrit aux changements EN TEMPS RÉEL
    const channel = supabase
      .channel(`creneaux-${lieu}-realtime`)
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'creneaux_horaires',
          filter: `lieu=eq.${lieu}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newCreneau = payload.new as CreneauHoraire
            if (newCreneau.actif) {
              setCreneaux(prev => [...prev, newCreneau].sort((a, b) => a.ordre - b.ordre))
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedCreneau = payload.new as CreneauHoraire
            setCreneaux(prev => {
              const filtered = prev.filter(c => c.id !== updatedCreneau.id)
              if (updatedCreneau.actif) {
                return [...filtered, updatedCreneau].sort((a, b) => a.ordre - b.ordre)
              }
              return filtered
            })
          } else if (payload.eventType === 'DELETE') {
            const oldData = payload.old as { id: string }
            setCreneaux(prev => prev.filter(c => c.id !== oldData.id))
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [lieu])

  return { 
    creneaux, 
    heures: creneaux.map(c => c.heure),
    loading, 
    error 
  }
}

// Hook pour récupérer tous les créneaux (admin)
export const useAllCreneauxHoraires = (lieu: LocationType) => {
  const [creneaux, setCreneaux] = useState<CreneauHoraire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCreneaux = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('creneaux_horaires')
        .select('*')
        .eq('lieu', lieu)
        .order('ordre', { ascending: true })

      if (fetchError) {
        setError(fetchError.message)
        console.error('Erreur fetch créneaux:', fetchError)
      } else {
        setCreneaux(data || [])
      }
    } catch (err) {
      setError('Erreur lors de la récupération des créneaux')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCreneaux()

    // Souscrit aux changements EN TEMPS RÉEL
    const channel = supabase
      .channel(`all-creneaux-${lieu}-realtime`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'creneaux_horaires',
          filter: `lieu=eq.${lieu}`
        },
        () => {
          fetchCreneaux()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [lieu])

  const toggleCreneau = async (creneauId: string, actif: boolean) => {
    const { error } = await supabase
      .from('creneaux_horaires')
      .update({ actif })
      .eq('id', creneauId)

    if (error) {
      console.error('Erreur toggle créneau:', error)
      throw error
    }
  }

  const ajouterCreneau = async (heure: string) => {
    // Trouve l'ordre max actuel
    const maxOrdre = creneaux.length > 0 ? Math.max(...creneaux.map(c => c.ordre)) : 0
    
    const { error } = await supabase
      .from('creneaux_horaires')
      .insert([{
        lieu,
        heure,
        actif: true,
        ordre: maxOrdre + 1
      }])

    if (error) {
      console.error('Erreur ajout créneau:', error)
      throw error
    }
  }

  const supprimerCreneau = async (creneauId: string) => {
    const { error } = await supabase
      .from('creneaux_horaires')
      .delete()
      .eq('id', creneauId)

    if (error) {
      console.error('Erreur suppression créneau:', error)
      throw error
    }
  }

  return { 
    creneaux,
    heures: creneaux.filter(c => c.actif).map(c => c.heure),
    loading, 
    error,
    toggleCreneau,
    ajouterCreneau,
    supprimerCreneau,
    refresh: fetchCreneaux
  }
}
