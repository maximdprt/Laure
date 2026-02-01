// ==================== SUPABASE CLIENT ====================

import { createClient } from '@supabase/supabase-js'

// Charger depuis les variables d'environnement avec fallback
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL
let supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si les variables d'environnement ne sont pas chargées, utiliser les valeurs hardcodées
if (!supabaseUrl || supabaseUrl.includes('your-project')) {
  supabaseUrl = 'https://dejxkjxlefuxuuupkzqu.supabase.co'
  console.warn('⚠️ Utilisation des credentials hardcodées (env non chargées)')
}

if (!supabaseKey || supabaseKey.length < 50) {
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlanhranhsZWZ1eHV1dXBrenF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NjQ3OTMsImV4cCI6MjA4NTQ0MDc5M30.cJAWpmRTdOsy79P582G3R8N0FRtdA6MSNmXoka2Q9Jo'
  console.warn('⚠️ Utilisation de la clé hardcodée (env non chargée)')
}

// Debug: Log des variables d'environnement
console.log('✅ Supabase URL:', supabaseUrl)
console.log('✅ Supabase Key chargée:', supabaseKey ? 'OUI' : 'NON')

export const supabase = createClient(supabaseUrl, supabaseKey)
