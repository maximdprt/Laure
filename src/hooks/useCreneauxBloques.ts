import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { LocationType } from '../constants/services'
import { toLocalDateKey } from '../lib/dateUtils'
import type { CreneauBloque } from '../types/database'

export const useCreneauxBloques = () => {
  const [blockedSlots, setBlockedSlots] = useState<CreneauBloque[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlockedSlots = async () => {
    const { data, error: fetchError } = await supabase
      .from('creneaux_bloques')
      .select('*')

    if (fetchError) {
      setError(fetchError.message)
      return
    }

    setBlockedSlots((data || []) as CreneauBloque[])
  }

  useEffect(() => {
    const init = async () => {
      try {
        await fetchBlockedSlots()
      } catch (err) {
        console.error('Erreur récupération créneaux bloqués:', err)
        setError('Impossible de charger les créneaux bloqués')
      } finally {
        setLoading(false)
      }
    }

    init()

    const channel = supabase
      .channel('creneaux-bloques-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'creneaux_bloques' }, () => {
        fetchBlockedSlots()
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const isBlocked = (date: Date, heure: string, lieu: LocationType) => {
    const dateKey = toLocalDateKey(date)
    return blockedSlots.some(slot =>
      slot.date === dateKey &&
      slot.lieu === lieu &&
      slot.heure.slice(0, 5) === heure.slice(0, 5)
    )
  }

  const toggleBlockedSlot = async (date: Date, heure: string, lieu: LocationType) => {
    const dateKey = toLocalDateKey(date)
    const normalizedHeure = heure.slice(0, 5)

    const existing = blockedSlots.find(slot =>
      slot.date === dateKey &&
      slot.lieu === lieu &&
      slot.heure.slice(0, 5) === normalizedHeure
    )

    if (existing) {
      const { error: deleteError } = await supabase
        .from('creneaux_bloques')
        .delete()
        .eq('id', existing.id)

      if (deleteError) throw deleteError
      return
    }

    const { error: insertError } = await supabase
      .from('creneaux_bloques')
      .insert([{
        date: dateKey,
        heure: normalizedHeure,
        lieu
      }])

    if (insertError) throw insertError
  }

  return {
    blockedSlots,
    loading,
    error,
    isBlocked,
    toggleBlockedSlot,
    refresh: fetchBlockedSlots
  }
}

