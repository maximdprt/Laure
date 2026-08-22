// ==================== SUPABASE CLIENT ====================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variables d\'environnement Supabase manquantes: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// ==================== PAGINATION ====================
//
// L'API Supabase plafonne le nombre de lignes renvoyees par requete
// (reglage "Max rows", 1000 par defaut). Sans pagination, un simple
// `.select('*')` sur une table qui grossit (creneaux bloques, reservations)
// renvoie une liste TRONQUEE en silence : certaines dates bloquees
// disparaissent alors de l'admin et du site, et rebloquer la date ne change
// rien (la ligne existe deja en base, elle n'est juste pas relue).
//
// fetchAllRows relit page par page jusqu'a epuisement. La requete DOIT etre
// triee de facon deterministe, sinon les pages peuvent se chevaucher.
const PAGE_SIZE = 500
const MAX_ROWS = 50000

export const fetchAllRows = async <T>(
  buildQuery: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>
): Promise<{ data: T[]; error: unknown }> => {
  const rows: T[] = []
  let from = 0

  while (from < MAX_ROWS) {
    const { data, error } = await buildQuery(from, from + PAGE_SIZE - 1)
    if (error) return { data: rows, error }

    const batch = data || []
    rows.push(...batch)
    // Page vide ou incomplete : on a tout recupere.
    if (batch.length < PAGE_SIZE) break
    from += batch.length
  }

  return { data: rows, error: null }
}
