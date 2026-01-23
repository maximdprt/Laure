import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useScroll from '../../hooks/useScroll'

const navLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/massage-sportif', label: 'Massage Sportif' },
  { path: '/contact', label: 'Contact' },
  { path: '/reservation', label: 'Réservation' },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrolled } = useScroll(50)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-soft py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className={`relative transition-all duration-300 ${scrolled ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'}`}>
            <img 
              src="/Gemini_Generated_Image_h1myfqh1myfqh1my.png" 
              alt="Aura Massage Logo" 
              className="w-full h-full object-contain rounded-full shadow-soft border-2 border-gold/30"
            />
          </div>
          <div className="flex flex-col">
            {/* Texte TOUJOURS en or mat */}
            <span 
              className={`font-heading font-bold text-gold transition-all duration-300 ${
                scrolled ? 'text-xl' : 'text-2xl sm:text-3xl drop-shadow-lg'
              } group-hover:text-gold-dark`}
            >
              Aura Massage
            </span>
            <span className="text-xs font-body text-gold/80">
              Lacanau Océan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - TOUT en or mat */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body font-medium text-sm lg:text-base text-gold transition-all duration-300 relative py-2 
                        hover:text-gold-dark ${isActive(link.path) ? 'font-bold' : ''}`}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
          {/* CTA Button - Fond sage avec texte or */}
          <Link
            to="/reservation"
            className="ml-2 px-6 py-2.5 rounded-full font-body font-bold text-sm transition-all duration-300 
                     bg-sage text-gold border-2 border-gold 
                     hover:bg-sage-dark shadow-soft"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile Menu Button - en or */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-colors duration-300 text-gold hover:bg-gold/10"
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-cream/98 backdrop-blur-md border-t border-sand"
          >
            <div className="container-custom px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-body font-medium py-3 px-4 rounded-lg transition-all duration-300 text-gold
                            ${isActive(link.path) ? 'bg-gold/10 font-bold' : 'hover:bg-gold/5'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-sage text-gold border-2 border-gold font-body font-bold px-6 py-3 rounded-lg text-center mt-4
                         transition-all duration-300 hover:bg-sage-dark"
              >
                Réserver maintenant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
