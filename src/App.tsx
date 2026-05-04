import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const MassageSportif = lazy(() => import('./pages/MassageSportif'))
const Contact = lazy(() => import('./pages/Contact'))
const Reservation = lazy(() => import('./pages/Reservation'))
const Admin = lazy(() => import('./pages/Admin'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))
const CGV = lazy(() => import('./pages/CGV'))
const Informations = lazy(() => import('./pages/Informations'))

// Loader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-sage border-t-gold rounded-full animate-spin" />
      <p className="text-dark/60 font-body">Chargement...</p>
    </div>
  </div>
)

import ScrollToTop from './components/layout/ScrollToTop'

const setMetaContent = (attr: 'name' | 'property', key: string, value: string) => {
  const el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (el) el.setAttribute('content', value)
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

    document.title = title
    setMetaContent('name', 'description', description)
    setMetaContent('property', 'og:title', title)
    setMetaContent('property', 'og:description', description)
    setMetaContent('name', 'twitter:title', title)
    setMetaContent('name', 'twitter:description', description)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteSeo />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/massage-sportif" element={<MassageSportif />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/cgv" element={<CGV />} />
              <Route path="/informations" element={<Informations />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
