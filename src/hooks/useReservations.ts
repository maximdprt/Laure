// ==================== HOOK: useReservations (Temps réel) ====================

import { useEffect, useState } from 'react'
import { supabase, fetchAllRows } from '../lib/supabase'
import { ReservationWithDetails } from '../types/database'

export const useReservations = () => {
  const [reservations, setReservations] = useState<ReservationWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const compareByDateTime = (a: { date: string; heure: string }, b: { date: string; heure: string }) => {
      const keyA = `${a.date} ${a.heure.slice(0, 5)}`
      const keyB = `${b.date} ${b.heure.slice(0, 5)}`
      return keyA.localeCompare(keyB)
    }

    // Récupère les réservations initiales
    const fetchReservations = async () => {
      try {
        // Pagination : sans elle, l'API Supabase tronque la liste au-delà de son
        // plafond de lignes et les réservations les plus lointaines disparaissent.
        const { data, error: fetchError } = await fetchAllRows<ReservationWithDetails>((from, to) =>
          supabase
            .from('reservations')
            .select('*, services(*)')
            .not('statut', 'in', '("annulée","no-show")')
            .order('date', { ascending: true })
            .order('heure', { ascending: true })
            .order('id', { ascending: true })
            .range(from, to)
        )

        if (fetchError) {
          setError((fetchError as { message?: string }).message || 'Erreur inconnue')
          console.error('Erreur fetch:', fetchError)
        } else {
          setReservations(data)
        }
      } catch (err) {
        setError('Erreur lors de la récupération')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()

    // Souscrit aux changements EN TEMPS RÉEL
    const channel = supabase
      .channel('reservations-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'reservations'
        },
        async (payload) => {
          // Récupère les infos complètes du changement
          const newData = payload.new as { id?: string } | null
          const oldData = payload.old as { id?: string } | null
          const reservationId = newData?.id || oldData?.id
          if (!reservationId) return

          const { data, error } = await supabase
            .from('reservations')
            .select('*, services(*)')
            .eq('id', reservationId)
            .single()

          if (error || !data) {
            console.error('Erreur récupération détails:', error)
            return
          }

          if (payload.eventType === 'INSERT') {
            // Affiche toutes les nouvelles réservations sauf annulées/no-show
            if (data.statut !== 'annulée' && data.statut !== 'no-show') {
              setReservations(prev => [...prev, data].sort(compareByDateTime))
            }
          } else if (payload.eventType === 'UPDATE') {
            setReservations(prev => {
              const filtered = prev.filter(r => r.id !== data.id)
              // Ajoute si pas annulée/no-show, sinon retire de la liste
              if (data.statut !== 'annulée' && data.statut !== 'no-show') {
                return [...filtered, data].sort(compareByDateTime)
              }
              return filtered
            })
          } else if (payload.eventType === 'DELETE') {
            setReservations(prev => prev.filter(r => r.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return { reservations, loading, error }
}
