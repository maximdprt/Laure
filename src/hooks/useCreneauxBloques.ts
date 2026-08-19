import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { LocationType } from '../constants/services'
import { toLocalDateKey } from '../lib/dateUtils'
import { estCreneauBloqueManuel } from '../constants/blocagesManuels'
import type { CreneauBloque } from '../types/database'

const normalizeHeure = (value: string) => value.slice(0, 5)

// La colonne `heure` est de type TIME : elle peut revenir en "14:00" ou "14:00:00".
// On envoie les deux formes aux filtres pour ne rien rater.
const heureVariants = (heures: string[]) =>
  Array.from(new Set(heures.flatMap(h => [normalizeHeure(h), `${normalizeHeure(h)}:00`])))

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
      console.error('Erreur récupération créneaux bloqués:', fetchError)
      return
    }

    setError(null)
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

  // Blocage manuel (défini dans le code) : non modifiable depuis l'espace admin
  const isBlockedManuel = (date: Date, heure: string, lieu: LocationType) =>
    estCreneauBloqueManuel(toLocalDateKey(date), heure, lieu)

  const isBlocked = (date: Date, heure: string, lieu: LocationType) => {
    const dateKey = toLocalDateKey(date)
    const heureKey = normalizeHeure(heure)
    if (estCreneauBloqueManuel(dateKey, heureKey, lieu)) return true
    return blockedSlots.some(slot =>
      slot.date === dateKey &&
      slot.lieu === lieu &&
      normalizeHeure(slot.heure) === heureKey
    )
  }

  const isDayFullyBlocked = (date: Date, heures: string[], lieu: LocationType) => {
    if (heures.length === 0) return false
    return heures.every(h => isBlocked(date, h, lieu))
  }

  // Coeur du blocage : idempotent et piloté par (date, heure, lieu) plutôt que par un id local.
  // Bloquer une date déjà bloquée dans la base ne lève plus d'erreur de contrainte unique,
  // et débloquer fonctionne même si la ligne n'a jamais été chargée dans cet onglet.
  const setSlotsBlocked = async (
    date: Date,
    heures: string[],
    lieu: LocationType,
    block: boolean
  ) => {
    const dateKey = toLocalDateKey(date)
    const normalizedHeures = Array.from(new Set(heures.map(normalizeHeure))).filter(Boolean)

    if (normalizedHeures.length === 0) return

    // Mise à jour optimiste pour un retour visuel immédiat
    const previous = blockedSlots
    if (block) {
      const missing = normalizedHeures
        .filter(h => !isBlocked(date, h, lieu))
        .map((h, i) => ({
          id: `temp-${dateKey}-${lieu}-${h}-${i}`,
          date: dateKey,
          heure: h,
          lieu,
          created_at: new Date().toISOString()
        })) as CreneauBloque[]
      if (missing.length > 0) setBlockedSlots(prev => [...prev, ...missing])
    } else {
      setBlockedSlots(prev => prev.filter(slot => !(
        slot.date === dateKey &&
        slot.lieu === lieu &&
        normalizedHeures.includes(normalizeHeure(slot.heure))
      )))
    }

    try {
      if (block) {
        const rows = normalizedHeures.map(h => ({ date: dateKey, heure: h, lieu }))

        const { error: upsertError } = await supabase
          .from('creneaux_bloques')
          .upsert(rows, { onConflict: 'date,heure,lieu', ignoreDuplicates: true })

        if (upsertError) throw upsertError
      } else {
        const { error: deleteError } = await supabase
          .from('creneaux_bloques')
          .delete()
          .eq('date', dateKey)
          .eq('lieu', lieu)
          .in('heure', heureVariants(normalizedHeures))

        if (deleteError) throw deleteError
      }
    } catch (err) {
      setBlockedSlots(previous)
      throw err
    }

    // Re-synchronise depuis la base (indispensable si le temps réel n'est pas activé sur la table)
    await fetchBlockedSlots()
  }

  const toggleBlockedSlot = async (date: Date, heure: string, lieu: LocationType) => {
    await setSlotsBlocked(date, [heure], lieu, !isBlocked(date, heure, lieu))
  }

  const setDayBlocked = async (date: Date, heures: string[], lieu: LocationType, block: boolean) => {
    await setSlotsBlocked(date, heures, lieu, block)
  }

  return {
    blockedSlots,
    loading,
    error,
    isBlocked,
    isBlockedManuel,
    isDayFullyBlocked,
    toggleBlockedSlot,
    setSlotsBlocked,
    setDayBlocked,
    refresh: fetchBlockedSlots
  }
}
