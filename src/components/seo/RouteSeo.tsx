import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_ORIGIN = 'https://massage-aura-performance.fr'

const setMetaContent = (attr: 'name' | 'property', key: string, value: string) => {
  const el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (el) el.setAttribute('content', value)
}

const ensureLinkRel = (rel: string, href: string) => {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

const breadcrumbLabel: Record<string, string> = {
  '/': 'Accueil',
  '/massage-sportif': 'Nos massages',
  '/contact': 'Contact',
  '/reservation': 'Réservation',
  '/admin': 'Administration',
  '/mentions-legales': 'Mentions légales',
  '/politique-confidentialite': 'Confidentialité',
  '/cgv': 'CGV',
  '/informations': 'Informations & FAQ'
}

const injectJsonLd = (id: string, data: object) => {
  const existing = document.getElementById(id)
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

const RouteSeo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const titleByPath: Record<string, string> = {
      '/': 'Massage Lacanau | Sportif, bien-être & soins à Lacanau Océan',
      '/massage-sportif': 'Massage Lacanau | Massages sportifs, relaxants & énergie',
      '/contact': 'Massage Lacanau | Contact & réservation à Lacanau Océan',
      '/reservation': 'Massage Lacanau | Réservation en ligne — cabinet ou domicile',
      '/admin': 'Massage Lacanau | Espace administration réservations',
      '/mentions-legales': 'Massage Lacanau | Mentions légales — Aura Massage',
      '/politique-confidentialite': 'Massage Lacanau | Politique de confidentialité & données',
      '/cgv': 'Massage Lacanau | Conditions générales de vente (CGV)',
      '/informations': 'Massage Lacanau | Informations pratiques, FAQ & domicile'
    }

    const descriptionByPath: Record<string, string> = {
      '/': 'Massage Lacanau Océan : massage sportif, bien-être et soins énergétiques. Laure Dupuch, praticienne certifiée. Cabinet ou domicile. Réservez au 07 59 70 19 41.',
      '/massage-sportif': 'Massage Lacanau : massages sportifs, relaxants et soins énergétiques à Lacanau Océan. Récupération, détente, prévention. Réservation en ligne.',
      '/contact': 'Massage Lacanau : contact Laure à Lacanau Océan (téléphone, email, adresse). Massage à domicile Lacanau, Le Porge, Carcans. Réponse rapide.',
      '/reservation': 'Réservez votre massage à Lacanau : soin, lieu (cabinet ou domicile), date et horaire. Paiement sécurisé de l\'acompte en ligne.',
      '/admin': 'Espace réservé à la gestion des réservations Aura Massage Lacanau.',
      '/mentions-legales': 'Mentions légales massage-aura-performance.fr : éditeur, hébergement, propriété intellectuelle et contact officiel.',
      '/politique-confidentialite': 'Politique de confidentialité : données personnelles, cookies et droits RGPD pour le site Aura Massage Lacanau.',
      '/cgv': 'CGV des prestations massage bien-être à Lacanau : réservation, tarifs, annulation, responsabilité et litiges.',
      '/informations': 'Massage Lacanau : infos pratiques, massage à domicile, chromothérapie, conseils sportifs et surfeurs. FAQ utile avant réservation.'
    }

    const title = titleByPath[pathname] ?? 'Massage Lacanau'
    const description = descriptionByPath[pathname] ?? descriptionByPath['/']
    const canonical =
      pathname === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname.replace(/\/$/, '')}`

    document.title = title
    setMetaContent('name', 'description', description)
    setMetaContent('property', 'og:title', title)
    setMetaContent('property', 'og:description', description)
    setMetaContent('property', 'og:url', canonical)
    setMetaContent('name', 'twitter:title', title)
    setMetaContent('name', 'twitter:description', description)
    ensureLinkRel('canonical', canonical)

    const pageName = breadcrumbLabel[pathname] ?? 'Page'
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement:
        pathname === '/'
          ? [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: `${SITE_ORIGIN}/`
              }
            ]
          : [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: `${SITE_ORIGIN}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: pageName,
                item: `${SITE_ORIGIN}${pathname}`
              }
            ]
    }
    injectJsonLd('jsonld-breadcrumb', breadcrumb)

    return () => {
      const el = document.getElementById('jsonld-breadcrumb')
      el?.remove()
    }
  }, [pathname])

  return null
}

export default RouteSeo
