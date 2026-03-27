import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Avis } from '../types'
import type { AvisRecord } from '../types/database'

const toAvis = (row: AvisRecord): Avis => ({
  id: row.id,
  name: row.name,
  text: row.text,
  rating: row.rating,
  date: row.date
})

export const useAvis = () => {
  const [publishedAvis, setPublishedAvis] = useState<Avis[]>([])
  const [pendingAvis, setPendingAvis] = useState<Avis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAvis = async () => {
    const { data, error: fetchError } = await supabase
      .from('avis_clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      return
    }

    const rows = (data || []) as AvisRecord[]
    setPublishedAvis(rows.filter(r => r.is_published).map(toAvis))
    setPendingAvis(rows.filter(r => !r.is_published).map(toAvis))
  }

  useEffect(() => {
    const init = async () => {
      try {
        await fetchAvis()
      } catch (err) {
        console.error('Erreur récupération avis:', err)
        setError('Impossible de charger les avis')
      } finally {
        setLoading(false)
      }
    }

    init()

    const channel = supabase
      .channel('avis-clients-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'avis_clients' }, () => {
        fetchAvis()
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const createPendingAvis = async (avis: Omit<Avis, 'id'>) => {
    const { error: insertError } = await supabase
      .from('avis_clients')
      .insert([{
        name: avis.name,
        text: avis.text,
        rating: avis.rating,
        date: avis.date,
        is_published: false
      }])

    if (insertError) throw insertError
  }

  const addPublishedAvis = async (avis: Omit<Avis, 'id'>) => {
    const { error: insertError } = await supabase
      .from('avis_clients')
      .insert([{
        name: avis.name,
        text: avis.text,
        rating: avis.rating,
        date: avis.date,
        is_published: true
      }])

    if (insertError) throw insertError
  }

  const updatePublishedAvis = async (avis: Avis) => {
    const { error: updateError } = await supabase
      .from('avis_clients')
      .update({
        name: avis.name,
        text: avis.text,
        rating: avis.rating,
        date: avis.date,
        is_published: true
      })
      .eq('id', avis.id)

    if (updateError) throw updateError
  }

  const deleteAvis = async (id: string) => {
    const { error: deleteError } = await supabase
      .from('avis_clients')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError
  }

  const approvePendingAvis = async (pendingAvisId: string, replacePublishedAvisId?: string) => {
    const pending = pendingAvis.find(a => a.id === pendingAvisId)
    if (!pending) throw new Error('Avis en attente introuvable')

    if (replacePublishedAvisId) {
      const { error: replaceError } = await supabase
        .from('avis_clients')
        .update({
          name: pending.name,
          text: pending.text,
          rating: pending.rating,
          date: pending.date,
          is_published: true
        })
        .eq('id', replacePublishedAvisId)

      if (replaceError) throw replaceError

      await deleteAvis(pendingAvisId)
      return
    }

    const { error: publishError } = await supabase
      .from('avis_clients')
      .update({ is_published: true })
      .eq('id', pendingAvisId)

    if (publishError) throw publishError
  }

  const rejectPendingAvis = async (id: string) => {
    await deleteAvis(id)
  }

  return {
    publishedAvis,
    pendingAvis,
    loading,
    error,
    createPendingAvis,
    addPublishedAvis,
    updatePublishedAvis,
    deleteAvis,
    approvePendingAvis,
    rejectPendingAvis,
    refresh: fetchAvis
  }
}

