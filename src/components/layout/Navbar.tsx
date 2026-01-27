import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useScroll from '../../hooks/useScroll'

const navLinks = [
  { path: '/', label: 'Accueil', title: 'Massage Lacanau - Accueil' },
  { path: '/massage-sportif', label: 'Nos Massages', title: 'Massage Sportif Lacanau' },
  { path: '/contact', label: 'Contact', title: 'Contact Massage Lacanau' },
  { path: '/reservation', label: 'Réserver', title: 'Réserver un massage à Lacanau' },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrolled } = useScroll(50)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-cream/95 backdrop-blur-md shadow-soft py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <nav className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - SEO optimisé */}
        <Link to="/" className="flex items-center gap-4 group" title="Massage Lacanau - Accueil">
          <div className={`relative transition-all duration-300 ${scrolled ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'}`}>
            <img
              src="/Logo-site.png"
              alt="Massage Lacanau - Aura Massage Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            {/* Texte TOUJOURS en or mat */}
            <span
              className={`font-heading font-bold text-gold transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl sm:text-3xl drop-shadow-lg'
                } group-hover:text-gold-dark uppercase tracking-wide`}
            >
              Aura Massage
            </span>
            <span className="text-xs font-body text-gold/80">
              Massage Lacanau - Lacanau Océan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - TOUT en or mat */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              title={link.title}
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
                  title={link.title}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-body font-medium py-3 px-4 rounded-lg transition-all duration-300 text-gold
                            ${isActive(link.path) ? 'bg-gold/10 font-bold' : 'hover:bg-gold/5'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
