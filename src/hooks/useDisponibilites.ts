// ==================== HOOK: useDdisponibilites ====================

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Disponibilite } from '../types/database'

export const useDisponibilites = () => {
  const [disponibilites, setDisponibilites] = useState<Disponibilite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDisponibilites = async () => {
      const { data, error } = await supabase
        .from('disponibilites')
        .select('*')
        .order('jour_semaine', { ascending: true })

      if (!error) {
        setDisponibilites(data || [])
      }
      setLoading(false)
    }

    fetchDisponibilites()

    // Souscrit aux changements
    const channel = supabase
      .channel('disponibilites-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'disponibilites' }, () => {
        fetchDisponibilites()
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return { disponibilites, loading }
}

// Fonction utilitaire pour convertir jour_semaine en nom français
export const getJourName = (jourSemaine: number) => {
  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  return jours[jourSemaine] || 'Inconnu'
}
