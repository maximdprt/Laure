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

const RouteSeo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const titleByPath: Record<string, string> = {
      '/': 'Massage Lacanau | Sportif & Bien-être',
      '/massage-sportif': 'Massage Lacanau | Nos Massages Sportifs & Soins Énergétiques',
      '/contact': 'Massage Lacanau | Contact & Réservation',
      '/reservation': 'Massage Lacanau | Réservation en ligne',
      '/admin': 'Massage Lacanau | Administration',
      '/mentions-legales': 'Massage Lacanau | Mentions légales',
      '/politique-confidentialite': 'Massage Lacanau | Politique de confidentialité',
      '/cgv': 'Massage Lacanau | Conditions générales de vente',
      '/informations': 'Massage Lacanau | Informations & FAQ'
    }

    document.title = titleByPath[pathname] ?? 'Massage Lacanau'
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
