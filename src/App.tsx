import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const MassageSportif = lazy(() => import('./pages/MassageSportif'))
const Contact = lazy(() => import('./pages/Contact'))
const Reservation = lazy(() => import('./pages/Reservation'))
const Admin = lazy(() => import('./pages/Admin'))

// Loader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-sage border-t-gold rounded-full animate-spin" />
      <p className="text-dark/60 font-body">Chargement...</p>
    </div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
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
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
