import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/offres-tarifs', label: 'Offres & Tarifs' },
    { path: '/presentation', label: 'Présentation' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="backdrop-blur-md bg-soft-cream/90 border-b border-coral-pale/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Branding */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/Gemini_Generated_Image_xspuf8xspuf8xspu_cleanup.png"
              alt="Massage Aura Performance Lacanau - Logo"
              className="h-12 w-auto"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.18em] uppercase text-gray-700">
                MASSAGE AURA
              </span>
              <span className="text-xs font-medium tracking-[0.22em] uppercase text-gray-500">
                PERFORMANCE LACANAU
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    active
                      ? 'bg-coral-DEFAULT border-coral-DEFAULT text-white shadow-lg shadow-coral-DEFAULT/30'
                      : 'text-gray-800 border-coral-pale/70 hover:border-coral-DEFAULT hover:bg-coral-pale/60 hover:text-coral-DEFAULT hover:shadow-md hover:shadow-coral-DEFAULT/25'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/reservation"
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-coral-DEFAULT to-amber-400 shadow-lg shadow-coral-DEFAULT/35 hover:shadow-xl hover:from-coral-500 hover:to-amber-500 transition-transform duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-coral-200"
            >
              Réserver
            </Link>
            {/* Icône de recherche */}
            <button
              className="text-gray-700 hover:text-coral-DEFAULT transition-colors"
              aria-label="Rechercher"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-full text-base font-semibold border transition-all ${
                    active
                      ? 'bg-coral-DEFAULT border-coral-DEFAULT text-white shadow-md'
                      : 'text-gray-800 border-coral-pale/70 hover:border-coral-DEFAULT hover:bg-coral-pale/60 hover:text-coral-DEFAULT hover:shadow-md'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/reservation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-full text-base font-bold text-white bg-gradient-to-r from-coral-DEFAULT to-amber-400 shadow-lg hover:shadow-xl hover:from-coral-500 hover:to-amber-500 transition-transform duration-200 transform hover:-translate-y-0.5"
            >
              Réserver
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}