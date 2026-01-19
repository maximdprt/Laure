import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Newsletter from './components/Newsletter'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Presentation from './pages/Presentation'
import MassageSportif from './pages/MassageSportif'
import Prestations from './pages/Prestations'
import Tarifs from './pages/Tarifs'
import Contact from './pages/Contact'
import Elixirs from './pages/Elixirs'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/massage-sportif" element={<MassageSportif />} />
            <Route path="/prestations" element={<Prestations />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/elixirs" element={<Elixirs />} />
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
