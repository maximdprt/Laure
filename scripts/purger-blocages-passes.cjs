// Purge les créneaux bloqués dont la date est déjà passée.
//
// Pourquoi : chaque journée fermée coûte 23 lignes (13 cabinet + 10 domicile)
// et rien n'est jamais nettoyé. C'est cette accumulation qui a fait dépasser
// le plafond de lignes de l'API Supabase. La pagination corrige la lecture,
// mais garder la table petite reste plus sain (et plus rapide).
//
// Lancer :  node scripts/purger-blocages-passes.cjs
//
// Les lignes supprimées sont d'abord sauvegardées dans
// scripts/backup-creneaux-bloques-<date>.json, avec le SQL de restauration.

const fs = require('fs')
const path = require('path')

const env = Object.fromEntries(
  fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const i = l.indexOf('=')
      return [l.slice(0, i), l.slice(i + 1).replace(/^"|"$/g, '')]
    })
)

const URL = env.VITE_SUPABASE_URL
const KEY = env.VITE_SUPABASE_ANON_KEY
if (!URL || !KEY) throw new Error('VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY absents de .env.local')

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

// Date du jour (Europe/Paris) au format YYYY-MM-DD
const aujourdhui = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Paris' })

const lireTout = async () => {
  const rows = []
  let from = 0
  for (;;) {
    const res = await fetch(
      `${URL}/rest/v1/creneaux_bloques?select=*&date=lt.${aujourdhui}&order=date.asc,heure.asc,lieu.asc`,
      { headers: { ...headers, Range: `${from}-${from + 499}` } }
    )
    const batch = await res.json()
    rows.push(...batch)
    if (batch.length < 500) return rows
    from += batch.length
  }
}

const main = async () => {
  console.log(`Aujourd'hui (Paris) : ${aujourdhui}`)
  const rows = await lireTout()
  if (rows.length === 0) {
    console.log('Aucune ligne passée à purger.')
    return
  }

  const dates = [...new Set(rows.map(r => r.date))].sort()
  console.log(`${rows.length} lignes sur ${dates.length} dates (${dates[0]} -> ${dates[dates.length - 1]})`)

  // Sauvegarde : JSON + SQL de restauration
  const backup = path.join(__dirname, `backup-creneaux-bloques-${aujourdhui}.json`)
  const sql = 'INSERT INTO creneaux_bloques (date, heure, lieu) VALUES\n' +
    rows.map(r => `  ('${r.date}', '${String(r.heure).slice(0, 5)}', '${r.lieu}')`).join(',\n') +
    '\nON CONFLICT DO NOTHING;'
  fs.writeFileSync(backup, JSON.stringify({ genere_le: aujourdhui, lignes: rows, sql_restauration: sql }, null, 2))
  console.log(`Sauvegarde : ${backup}`)

  const res = await fetch(`${URL}/rest/v1/creneaux_bloques?date=lt.${aujourdhui}`, {
    method: 'DELETE',
    headers: { ...headers, Prefer: 'return=minimal' }
  })
  if (!res.ok) throw new Error(`Echec suppression (HTTP ${res.status}) : ${await res.text()}`)

  const restant = await fetch(`${URL}/rest/v1/creneaux_bloques?select=id`, {
    headers: { ...headers, Range: '0-0', Prefer: 'count=exact' }
  })
  console.log(`Supprime. Table : ${restant.headers.get('content-range')?.split('/')[1]} lignes restantes.`)
  console.log('Pour restaurer : le SQL est dans le champ "sql_restauration" du fichier de sauvegarde.')
}

main().catch(e => { console.error(e.message); process.exit(1) })
