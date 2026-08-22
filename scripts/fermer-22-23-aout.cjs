// Ferme les journées du 22 et 23 août 2026 dans `creneaux_bloques`.
//
// Ces deux dates étaient fermées par du code écrit en dur
// (src/constants/blocagesManuels.ts, supprimé). Ce script recopie ce blocage
// dans la base pour que rien ne se rouvre — et, cette fois, il sera
// débloquable depuis l'espace admin.
//
// Lancer :  node scripts/fermer-22-23-aout.cjs
// Le script est idempotent : le relancer n'insère aucun doublon.

const fs = require('fs')
const path = require('path')

const DATES = ['2026-08-22', '2026-08-23']

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
const hhmm = v => String(v).slice(0, 5)

const main = async () => {
  // 1. Créneaux configurés (cabinet + domicile)
  const creneaux = await (await fetch(`${URL}/rest/v1/creneaux_horaires?select=lieu,heure`, { headers })).json()
  console.log(`${creneaux.length} créneaux configurés`)

  // 2. Ce qui est déjà bloqué sur ces dates
  const filtre = DATES.map(d => `"${d}"`).join(',')
  const deja = await (await fetch(
    `${URL}/rest/v1/creneaux_bloques?select=date,heure,lieu&date=in.(${filtre})`, { headers }
  )).json()
  console.log(`${deja.length} créneaux déjà bloqués sur ces dates`)

  // 3. Le complément
  const manquants = []
  for (const date of DATES) {
    for (const c of creneaux) {
      const existe = deja.some(r => r.date === date && hhmm(r.heure) === hhmm(c.heure) && r.lieu === c.lieu)
      if (!existe) manquants.push({ date, heure: hhmm(c.heure), lieu: c.lieu })
    }
  }

  if (manquants.length === 0) {
    console.log('Rien à faire : les deux journées sont déjà entièrement fermées.')
    return
  }

  console.log(`Insertion de ${manquants.length} lignes...`)
  const res = await fetch(`${URL}/rest/v1/creneaux_bloques`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=minimal,resolution=ignore-duplicates' },
    body: JSON.stringify(manquants)
  })

  if (!res.ok) throw new Error(`Echec (HTTP ${res.status}) : ${await res.text()}`)

  // 4. Vérification
  const apres = await (await fetch(
    `${URL}/rest/v1/creneaux_bloques?select=date,lieu&date=in.(${filtre})`, { headers }
  )).json()
  for (const date of DATES) {
    for (const lieu of ['cabinet', 'domicile']) {
      const bloques = apres.filter(r => r.date === date && r.lieu === lieu).length
      const total = creneaux.filter(c => c.lieu === lieu).length
      console.log(`${date} ${lieu} : ${bloques}/${total} ${bloques >= total ? '-> FERME' : '-> INCOMPLET'}`)
    }
  }
}

main().catch(e => { console.error(e.message); process.exit(1) })
