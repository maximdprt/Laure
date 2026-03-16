// Fuseau horaire de Paris
const PARIS_TZ = 'Europe/Paris'

// Obtenir la date/heure actuelle en fuseau horaire de Paris
export const getNowInParis = (): Date => {
  // Obtenir la date actuelle en fuseau horaire de Paris
  const nowStr = new Date().toLocaleString('en-US', { timeZone: PARIS_TZ })
  return new Date(nowStr)
}

// Obtenir la date du jour (00:00:00) en fuseau horaire de Paris
export const getTodayInParis = (): Date => {
  const now = getNowInParis()
  now.setHours(0, 0, 0, 0)
  return now
}

// Convertir une date en string YYYY-MM-DD pour Paris
export const toLocalDateKey = (value: Date) => {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Parser une date YYYY-MM-DD en objet Date (fuseau horaire local)
export const parseLocalDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}
