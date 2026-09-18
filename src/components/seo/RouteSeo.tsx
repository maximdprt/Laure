import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_SEO, SEO_BY_PATH, SITE_ORIGIN, canonicalFor } from '../../constants/seo'

const setMetaContent = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
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
    const seo = SEO_BY_PATH[pathname] ?? DEFAULT_SEO
    const canonical = canonicalFor(pathname)

    document.title = seo.title
    setMetaContent('name', 'description', seo.description)
    setMetaContent('property', 'og:title', seo.title)
    setMetaContent('property', 'og:description', seo.description)
    setMetaContent('property', 'og:url', canonical)
    setMetaContent('name', 'twitter:title', seo.title)
    setMetaContent('name', 'twitter:description', seo.description)
    setMetaContent(
      'name',
      'robots',
      seo.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )
    ensureLinkRel('canonical', canonical)

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_ORIGIN}/` },
        ...(seo.breadcrumb
          ? [{ '@type': 'ListItem', position: 2, name: seo.breadcrumb, item: canonical }]
          : [])
      ]
    }
    injectJsonLd('jsonld-breadcrumb', breadcrumb)

    return () => {
      document.getElementById('jsonld-breadcrumb')?.remove()
    }
  }, [pathname])

  return null
}

export default RouteSeo
