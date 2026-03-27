import { supabase } from './supabase'
import type { Avis } from '../types'

export const submitPendingAvis = async (avis: Omit<Avis, 'id'>) => {
  const { error } = await supabase
    .from('avis_clients')
    .insert([{
      name: avis.name,
      text: avis.text,
      rating: avis.rating,
      date: avis.date,
      is_published: false
    }])

  if (error) throw error
}

