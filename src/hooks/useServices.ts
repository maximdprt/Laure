// ==================== HOOK: useServices ====================

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Service } from '../types/database'

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('nom', { ascending: true })

      if (!error) {
        setServices(data || [])
      }
      setLoading(false)
    }

    fetchServices()

    // Souscrit aux changements
    const channel = supabase
      .channel('services-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
        fetchServices()
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return { services, loading }
}
