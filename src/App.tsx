import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Newsletter from './components/Newsletter'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Presentation from './pages/Presentation'
import Contact from './pages/Contact'
import OffresTarifs from './pages/OffresTarifs'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offres-tarifs" element={<OffresTarifs />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Newsletter />
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App
