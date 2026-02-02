/**
 * Chemins des images du dossier public.
 * Chaque image est utilisée une seule fois sur le site (pas de doublon).
 * Les noms avec espaces/caractères spéciaux sont encodés pour l'URL.
 */
const enc = (s: string) => encodeURI(s)

export const PUBLIC_IMAGES = {
  // Déjà utilisées ailleurs (logo, portrait, Gemini) – ne pas réattribuer
  logo: '/Logo-site.png',
  portrait: '/lauredupuch-dupuch-portrait.jpg',
  gemini: '/Gemini_Generated_Image_7ptbup7ptbup7ptb.png',

  // Images ajoutées par l'admin – une utilisation chacune
  massageRelaxant: `/${enc('Massage relaxant _ une pause bien-être à partager 💖.jpg')}`,
  reiki: '/Reiki.jpg',
  secretYounger: `/${enc('💆_♀️ The Secret to Feeling 10 Years Younger 💫.jpg')}`,
  brooklynSpa: `/${enc('24 Best Massage And Spa Spots Near Brooklyn, Ny (Relax Yourselves).jpg')}`,
  telecharger1: `/${enc('télécharger (1).jpg')}`,
  telecharger2: `/${enc('télécharger (2).jpg')}`,
  whatsApp1602: `/${enc('WhatsApp Image 2026-02-02 at 19.13.16.jpeg')}`,
  whatsApp2602: `/${enc('WhatsApp Image 2026-02-02 at 19.13.26.jpeg')}`,
  /** Section « Votre massage à Lacanau sur mesure » – image avec badge 100% Personnalisé */
  massage100Personnalise: '/massage-100-personnalise.png',
  spaBalinese: `/${enc('Sposób na weekendowy, szybki restart systemów_ 🔋😁_#Zaproszenie od @santai_spa_lodz zamieniło popołudnie w chwilę totalnego chillu 🧘_♀️ _Na masaże balijskie staramy się chodzić regularnie_ Stanowczo daleko im do .jpg')}`,
} as const
