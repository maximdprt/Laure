// ==================== HOOK: useJoursBloques ====================

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { toLocalDateKey } from '../lib/dateUtils'
import { estJourBloqueManuel } from '../constants/blocagesManuels'
import { JourBloque } from '../types/database'

export const useJoursBloques = () => {
  const [joursBloques, setJoursBloques] = useState<JourBloque[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJoursBloques = async () => {
    const { data, error: fetchError } = await supabase
      .from('jours_bloques')
      .select('*')
      .order('date', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
      console.error('Erreur récupération jours bloqués:', fetchError)
      return
    }

    setError(null)
    setJoursBloques(data || [])
  }

  useEffect(() => {
    const init = async () => {
      await fetchJoursBloques()
      setLoading(false)
    }

    init()

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

  // Blocage manuel (défini dans le code) : non modifiable depuis l'espace admin
  const isJourBloqueManuel = (date: Date | string) => {
    const key = typeof date === 'string' ? date : toLocalDateKey(date)
    return estJourBloqueManuel(key)
  }

  const isJourBloque = (date: Date | string) => {
    const key = typeof date === 'string' ? date : toLocalDateKey(date)
    return estJourBloqueManuel(key) || joursBloques.some(j => j.date === key)
  }

  // Bloque/débloque un jour de façon idempotente : on cible la date, pas l'id local,
  // pour ne jamais échouer si l'état du navigateur est décalé par rapport à la base.
  const setJourBloque = async (date: Date, block: boolean, raison?: string) => {
    const dateKey = toLocalDateKey(date)

    if (block) {
      // ON CONFLICT DO NOTHING : rebloquer une date déjà bloquée ne renvoie plus d'erreur 23505
      const { error: upsertError } = await supabase
        .from('jours_bloques')
        .upsert([{ date: dateKey, raison: raison ?? null }], {
          onConflict: 'date',
          ignoreDuplicates: true
        })

      if (upsertError) throw upsertError
    } else {
      const { error: deleteError } = await supabase
        .from('jours_bloques')
        .delete()
        .eq('date', dateKey)

      if (deleteError) throw deleteError
    }

    // Re-synchronise depuis la base : l'UI reflète toujours l'état réel,
    // même si le temps réel Supabase n'est pas actif sur la table.
    await fetchJoursBloques()
  }

  const toggleJourBloque = async (date: Date, raison?: string) => {
    await setJourBloque(date, !isJourBloque(date), raison)
  }

  return {
    joursBloques,
    loading,
    error,
    isJourBloque,
    isJourBloqueManuel,
    setJourBloque,
    toggleJourBloque,
    refresh: fetchJoursBloques
  }
}
