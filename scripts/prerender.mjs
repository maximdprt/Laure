/**
 * Prérendu statique du <head> pour chaque route + génération du sitemap.
 *
 * Pourquoi : le site est une SPA React. Sans ce script, chaque URL renvoie le
 * même `dist/index.html`, donc `/massage-sportif` et `/informations` sont
 * servies avec le <title> et la description de l'accueil. Les titres ne sont
 * corrigés qu'après exécution du JavaScript — ce que Bingbot et la plupart des
 * robots d'IA (GPTBot, PerplexityBot…) ne font pas.
 *
 * Ce script écrit `dist/<route>/index.html` avec les bonnes balises et un bloc
 * <noscript> reprenant le contenu réel de la page. Vercel consulte le système
 * de fichiers avant d'appliquer les `rewrites`, donc ces fichiers sont servis
 * en priorité sur le fallback vers `/index.html`.
 *
 * Le corps de page reste `<div id="root">` : React reste maître du rendu,
 * aucun risque de désynchronisation entre le HTML statique et l'application.
 */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import * as esbuild from 'esbuild'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const CACHE = path.join(ROOT, 'node_modules', '.cache', 'prerender')

/** Transpile un module TypeScript et l'importe depuis Node. */
async function loadTs(relativePath) {
  const outfile = path.join(CACHE, relativePath.replace(/[\\/]/g, '_').replace(/\.ts$/, '.mjs'))
  await esbuild.build({
    entryPoints: [path.join(ROOT, relativePath)],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent'
  })
  return import(`${pathToFileURL(outfile).href}?t=${Date.now()}`)
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Échappe le contenu d'un <script> JSON-LD (évite la fermeture prématurée). */
const escapeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

/**
 * Remplace le contenu d'une balise meta existante, ou l'ajoute avant </head>.
 */
function setMeta(html, attr, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 'i')
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeHtml(value)}$2`)
  return html.replace(
    '</head>',
    `    <meta ${attr}="${key}" content="${escapeHtml(value)}" />\n  </head>`
  )
}

function setCanonical(html, href) {
  const pattern = /(<link\s+rel="canonical"\s+href=")[^"]*(")/i
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeHtml(href)}$2`)
  return html.replace('</head>', `    <link rel="canonical" href="${escapeHtml(href)}" />\n  </head>`)
}

function appendToHead(html, snippet) {
  return html.replace('</head>', `${snippet}\n  </head>`)
}

function buildNoscript(seo, origin) {
  const paragraphs = seo.noscript.paragraphs
    .map((p) => `      <p>${escapeHtml(p)}</p>`)
    .join('\n')
  // Liens internes : les robots sans JS ne voient pas le routeur React.
  const links = [
    ['/', 'Massage à Lacanau'],
    ['/massage-sportif', 'Nos massages'],
    ['/informations', 'Massage à domicile & FAQ'],
    ['/reservation', 'Réserver'],
    ['/contact', 'Contact']
  ]
    .filter(([href]) => href !== seo.path)
    .map(([href, label]) => `<li><a href="${origin}${href === '/' ? '/' : href}">${escapeHtml(label)}</a></li>`)
    .join('')

  return `    <noscript>
      <h1>${escapeHtml(seo.noscript.h1)}</h1>
${paragraphs}
      <ul>${links}</ul>
    </noscript>`
}

function renderRoute(template, seo, helpers) {
  const { SITE_ORIGIN, canonicalFor } = helpers
  const canonical = canonicalFor(seo.path)
  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
  html = setMeta(html, 'name', 'description', seo.description)
  html = setMeta(html, 'property', 'og:title', seo.title)
  html = setMeta(html, 'property', 'og:description', seo.description)
  html = setMeta(html, 'property', 'og:url', canonical)
  html = setMeta(html, 'name', 'twitter:title', seo.title)
  html = setMeta(html, 'name', 'twitter:description', seo.description)
  html = setMeta(
    html,
    'name',
    'robots',
    seo.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  )
  html = setCanonical(html, canonical)

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
  html = appendToHead(
    html,
    `    <script type="application/ld+json">${escapeJsonLd(breadcrumb)}</script>`
  )

  if (helpers.faqJsonLd && seo.path === '/') {
    html = appendToHead(
      html,
      `    <script type="application/ld+json">${escapeJsonLd(helpers.faqJsonLd)}</script>`
    )
  }

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n${buildNoscript(seo, SITE_ORIGIN)}`
  )

  return html
}

function buildSitemap(routes, origin) {
  const today = new Date().toISOString().slice(0, 10)
  const entries = routes
    .filter((r) => !r.noindex && r.sitemap)
    .map((r) => {
      const loc = r.path === '/' ? `${origin}/` : `${origin}${r.path}`
      const images =
        r.path === '/'
          ? `
    <image:image>
      <image:loc>${origin}/lauredupuch-dupuch-portrait.jpg</image:loc>
      <image:title>Laure Dupuch — praticienne massage sportif et bien-être à Lacanau Océan</image:title>
      <image:caption>Massage Aura Performance — massage à Lacanau, récupération surfeurs, chromothérapie</image:caption>
    </image:image>
    <image:image>
      <image:loc>${origin}/Logo-site.png</image:loc>
      <image:title>Massage Aura Performance — logo Lacanau</image:title>
    </image:image>`
          : ''
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.sitemap.changefreq}</changefreq>
    <priority>${r.sitemap.priority}</priority>${images}
  </url>`
    })
    .join('\n\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>
`
}

/**
 * Chaque route prérendue a besoin d'un rewrite explicite vers son fichier, placé
 * avant le fallback SPA — sinon Vercel sert `/index.html` et la page récupère le
 * <title> de l'accueil. Ce contrôle fait échouer le build en cas d'oubli.
 */
async function assertVercelRewrites(routes) {
  const config = JSON.parse(await readFile(path.join(ROOT, 'vercel.json'), 'utf8'))
  const rewrites = config.rewrites ?? []
  const manquantes = routes
    .filter((r) => r.path !== '/')
    .filter(
      (r) =>
        !rewrites.some(
          (rw) => rw.source === r.path && rw.destination === `${r.path}/index.html`
        )
    )
    .map((r) => r.path)

  if (manquantes.length) {
    throw new Error(
      `vercel.json : rewrite manquant pour ${manquantes.join(', ')}.\n` +
        manquantes
          .map((p) => `  { "source": "${p}", "destination": "${p}/index.html" },`)
          .join('\n') +
        '\nÀ placer avant le fallback SPA.'
    )
  }
  console.log(`vercel     ${routes.length - 1} rewrites vérifiés`)
}

async function main() {
  await rm(CACHE, { recursive: true, force: true })
  await mkdir(CACHE, { recursive: true })

  const seoModule = await loadTs(path.join('src', 'constants', 'seo.ts'))
  const faqModule = await loadTs(path.join('src', 'constants', 'homeFAQ.ts'))

  const { ROUTE_SEO, SITE_ORIGIN, canonicalFor } = seoModule
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqModule.HOME_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.directAnswer} ${item.answer}`.trim()
      }
    }))
  }

  const template = await readFile(path.join(DIST, 'index.html'), 'utf8')
  const helpers = { SITE_ORIGIN, canonicalFor, faqJsonLd }

  for (const seo of ROUTE_SEO) {
    const html = renderRoute(template, seo, helpers)
    if (seo.path === '/') {
      await writeFile(path.join(DIST, 'index.html'), html, 'utf8')
    } else {
      const dir = path.join(DIST, seo.path.replace(/^\//, ''))
      await mkdir(dir, { recursive: true })
      await writeFile(path.join(dir, 'index.html'), html, 'utf8')
    }
    console.log(`prerender  ${seo.path.padEnd(28)} ${seo.title}`)
  }

  await assertVercelRewrites(ROUTE_SEO)

  const sitemap = buildSitemap(ROUTE_SEO, SITE_ORIGIN)
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8')
  console.log(`sitemap    ${ROUTE_SEO.filter((r) => !r.noindex && r.sitemap).length} URLs`)

  await rm(CACHE, { recursive: true, force: true })
}

main().catch((error) => {
  console.error('[prerender] echec :', error)
  process.exit(1)
})
