/**
 * Source unique de vérité SEO pour chaque route.
 *
 * Consommée à deux endroits :
 *  - `src/components/seo/RouteSeo.tsx` (mise à jour du <head> côté client)
 *  - `scripts/prerender.mjs` (génération du HTML statique + sitemap au build)
 *
 * Ciblage volumétrique (Semrush, FR, sept. 2026) :
 *  - « massage lacanau » / « lacanau massage » ... 260/mois, KD 15  -> accueil
 *  - « massage lacanau océan » / « ... ocean » ... 80/mois          -> accueil
 *  - « massage lacanau plage » ........................ 30/mois    -> accueil
 *  - « spa massage lacanau » .......................... 30/mois    -> accueil (FAQ)
 *  - « massage sportif lacanau », « massage surf » .... longue traîne -> /massage-sportif
 *  - « massage à domicile lacanau » ................... longue traîne -> /informations
 *
 * Volontairement NON ciblés :
 *  - « lacanau beach massage » (+ « avis ») : nom commercial d'un concurrent.
 *  - « massage lacanau de mios » : autre commune (Lacanau-de-Mios, près de Mios).
 */

export const SITE_ORIGIN = 'https://massage-aura-performance.fr'
export const SITE_NAME = 'Massage Aura Performance'
export const PHONE_DISPLAY = '07 59 70 19 41'
export const PHONE_E164 = '+33759701941'

export type RouteSeo = {
  path: string
  /** Balise <title> — ≤ 60 caractères, mot-clé en tête, distinct des autres pages. */
  title: string
  /** Meta description — ≤ 155 caractères, avec bénéfice + appel à l'action. */
  description: string
  /** Libellé du fil d'Ariane (null pour l'accueil). */
  breadcrumb: string | null
  /**
   * Contenu servi dans <noscript> aux robots qui n'exécutent pas JavaScript
   * (Bingbot, GPTBot, PerplexityBot, facebookexternalhit…). Il reprend
   * fidèlement le contenu réellement affiché par React.
   */
  noscript: {
    h1: string
    paragraphs: string[]
  }
  /** Exclu du sitemap et marqué noindex. */
  noindex?: boolean
  sitemap?: {
    changefreq: 'weekly' | 'monthly' | 'yearly'
    priority: string
  }
}

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: '/',
    title: 'Massage Lacanau Océan : sportif, bien-être & énergétique',
    description:
      'Massage à Lacanau Océan à 800 m de la plage : massage sportif, relaxant et soins énergétiques. Cabinet ou domicile, dès 45 €. Réservez au 07 59 70 19 41.',
    breadcrumb: null,
    sitemap: { changefreq: 'weekly', priority: '1.0' },
    noscript: {
      h1: 'Massage Lacanau — sportif & bien-être à Lacanau Océan',
      paragraphs: [
        "Vous cherchez un massage à Lacanau ? Laure Dupuch, praticienne certifiée, vous reçoit au centre HEAL LO LACANAU, 7 rue Jean Michel à Lacanau Océan, à environ 800 m de la plage centrale. Massage à domicile également possible sur Lacanau, Lacanau Océan, Le Porge et Carcans.",
        "Trois familles de soins : le massage sportif à Lacanau (préparation et récupération musculaire, pensé pour les surfeurs, cyclistes et golfeurs), le massage bien-être et relaxant aux huiles, et les soins énergétiques avec chromothérapie.",
        "Tarifs : massage 30 minutes à partir de 45 €, massage sportif 60 minutes à 85 €, formule complète 90 minutes à 130 €, soins énergétiques à partir de 90 €. Réservation en ligne, ou au 07 59 70 19 41."
      ]
    }
  },
  {
    path: '/massage-sportif',
    title: 'Massage sportif Lacanau — récupération surf & sport',
    description:
      'Massage sportif à Lacanau Océan : préparation à l’effort et récupération après le surf, le vélo ou le golf. Séances de 30 à 90 min, dès 45 €. Réservez en ligne.',
    breadcrumb: 'Nos massages',
    sitemap: { changefreq: 'monthly', priority: '0.9' },
    noscript: {
      h1: 'Massage sportif à Lacanau Océan & soins énergétiques',
      paragraphs: [
        "Le massage sportif à Lacanau s'adresse aux personnes actives : surfeurs, cyclistes, golfeurs, coureurs ou amateurs de sport en vacances. Il vise la préparation à l'effort et la récupération musculaire après une session.",
        "Formules sportives : Ocean Performance (activation 30 min, 45 €), Ocean Recovery (récupération et drainage 30 min, 45 €), Ocean Athletic (massage sportif complet 60 min, 85 €) et Ocean Elite (90 min, 130 €).",
        "Massages relaxants : Ocean Bliss (45 min, 59 €) et Ocean Serenity (60 min, 79 €), avec choix des zones. Soins énergétiques : Ocean Flow (60 min, 90 €) et Ocean Lumina, soin aux couleurs et cristaux (90 min, 220 €).",
        "Il s'agit de massages de bien-être : ce ne sont ni des actes médicaux ni des actes de kinésithérapie."
      ]
    }
  },
  {
    path: '/informations',
    title: 'Massage à domicile Lacanau — tarifs, FAQ & infos',
    description:
      'Massage à domicile à Lacanau, Le Porge et Carcans : déroulé d’une séance, tarifs, chromothérapie et réponses aux questions fréquentes avant de réserver.',
    breadcrumb: 'Informations & FAQ',
    sitemap: { changefreq: 'monthly', priority: '0.8' },
    noscript: {
      h1: 'Massage à domicile à Lacanau — informations pratiques',
      paragraphs: [
        "Le massage à domicile à Lacanau convient aux vacanciers en location comme aux résidents : Laure se déplace avec sa table sur Lacanau, Lacanau Océan, Le Porge et Carcans, selon les disponibilités.",
        "Vous trouverez ici le déroulé d'une séance, les informations sur la chromothérapie et les soins énergétiques, les conseils destinés aux sportifs et aux surfeurs, ainsi que les questions fréquentes sur les tarifs et l'annulation.",
        "Pour réserver : en ligne sur ce site, par téléphone au 07 59 70 19 41 ou par email à massage.auraperformance@gmail.com. En juillet et août, anticipez : les créneaux partent vite."
      ]
    }
  },
  {
    path: '/reservation',
    title: 'Réserver un massage à Lacanau — en ligne',
    description:
      'Réservez votre massage à Lacanau Océan en ligne : choisissez le soin, le lieu (cabinet ou domicile), la date et l’horaire. Acompte sécurisé, confirmation immédiate.',
    breadcrumb: 'Réservation',
    sitemap: { changefreq: 'weekly', priority: '0.9' },
    noscript: {
      h1: 'Réserver un massage à Lacanau Océan',
      paragraphs: [
        "Réservation en ligne en quatre étapes : le soin souhaité, le lieu (cabinet à Lacanau Océan ou massage à domicile), puis la date et l'horaire parmi les créneaux disponibles.",
        "Un acompte est réglé en ligne de façon sécurisée pour confirmer le rendez-vous. Vous pouvez aussi réserver par téléphone au 07 59 70 19 41."
      ]
    }
  },
  {
    path: '/contact',
    title: 'Contact — masseuse à Lacanau Océan',
    description:
      'Contactez Laure Dupuch, praticienne en massage à Lacanau Océan : téléphone, email et adresse du cabinet. Massage à domicile sur Lacanau, Le Porge et Carcans.',
    breadcrumb: 'Contact',
    sitemap: { changefreq: 'monthly', priority: '0.8' },
    noscript: {
      h1: 'Contacter votre masseuse à Lacanau Océan',
      paragraphs: [
        "Laure Dupuch, praticienne en massage bien-être — centre HEAL LO LACANAU, 7 rue Jean Michel, 33680 Lacanau.",
        "Téléphone : 07 59 70 19 41. Email : massage.auraperformance@gmail.com. Massage à domicile sur Lacanau, Lacanau Océan, Le Porge et Carcans."
      ]
    }
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales — Massage Aura Performance',
    description:
      'Mentions légales du site massage-aura-performance.fr : éditeur, hébergeur, propriété intellectuelle et coordonnées de contact.',
    breadcrumb: 'Mentions légales',
    sitemap: { changefreq: 'yearly', priority: '0.3' },
    noscript: {
      h1: 'Mentions légales',
      paragraphs: ['Éditeur, hébergement, propriété intellectuelle et contact du site massage-aura-performance.fr.']
    }
  },
  {
    path: '/politique-confidentialite',
    title: 'Politique de confidentialité — données & cookies',
    description:
      'Politique de confidentialité : données personnelles collectées, cookies, durée de conservation et exercice de vos droits RGPD.',
    breadcrumb: 'Confidentialité',
    sitemap: { changefreq: 'yearly', priority: '0.3' },
    noscript: {
      h1: 'Politique de confidentialité',
      paragraphs: ['Données personnelles, cookies et droits RGPD applicables au site massage-aura-performance.fr.']
    }
  },
  {
    path: '/cgv',
    title: 'Conditions générales de vente (CGV)',
    description:
      'CGV des prestations de massage bien-être à Lacanau : réservation, tarifs, acompte, annulation, responsabilité et règlement des litiges.',
    breadcrumb: 'CGV',
    sitemap: { changefreq: 'yearly', priority: '0.3' },
    noscript: {
      h1: 'Conditions générales de vente',
      paragraphs: ['Réservation, tarifs, acompte, annulation et responsabilité pour les prestations de massage bien-être à Lacanau.']
    }
  },
  {
    path: '/admin',
    title: 'Espace administration',
    description: 'Espace réservé à la gestion des réservations.',
    breadcrumb: 'Administration',
    noindex: true,
    noscript: {
      h1: 'Espace administration',
      paragraphs: ['Accès réservé.']
    }
  }
]

export const SEO_BY_PATH: Record<string, RouteSeo> = Object.fromEntries(
  ROUTE_SEO.map((route) => [route.path, route])
)

export const DEFAULT_SEO = SEO_BY_PATH['/']

export const canonicalFor = (pathname: string): string =>
  pathname === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname.replace(/\/$/, '')}`
