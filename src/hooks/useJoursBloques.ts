// ==================== HOOK: useJoursBloques ====================

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { JourBloque } from '../types/database'

export const useJoursBloques = () => {
  const [joursBloques, setJoursBloques] = useState<JourBloque[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJoursBloques = async () => {
      const { data, error } = await supabase
        .from('jours_bloques')
        .select('*')
        .order('date', { ascending: true })

      if (!error) {
        setJoursBloques(data || [])
      }
      setLoading(false)
    }

    fetchJoursBloques()

    // Souscrit aux changements
    const channel = supabase
      .channel('jours_bloques-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jours_bloques' }, () => {
        fetchJoursBloques()
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  // Fonction utilitaire : vérifier si un jour est bloqué
  const isJourBloque = (date: string) => {
    return joursBloques.some(j => j.date === date)
  }

  return { joursBloques, loading, isJourBloque }
}
