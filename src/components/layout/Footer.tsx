import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Linkedin, Waves } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sage text-cream">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description - SEO optimisé */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-6 group">
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src="/Logo-site.png"
                  alt="Massage Lacanau - Aura Massage Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-gold group-hover:text-gold-light transition-colors block">
                  Massage Lacanau
                </span>
                <span className="text-gold/80 text-sm font-body">Aura Massage - Lacanau Océan</span>
              </div>
            </Link>
            <p className="text-cream/80 leading-relaxed text-sm">
              Votre spécialiste du <strong className="text-gold">massage à Lacanau Océan</strong>.
              Massage sportif, bien-être, chromothérapie et soins énergétiques.
              Cabinet et interventions à domicile sur Lacanau, Le Porge, Carcans.
            </p>
            <div className="flex items-center gap-2 mt-4 text-gold">
              <Waves className="w-4 h-4" />
              <span className="text-xs font-body">À 800m de la plage centrale de Lacanau</span>
            </div>
          </div>

          {/* Navigation - SEO optimisé */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-gold flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold rounded-full" />
              Nos Massages à Lacanau
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Massage Lacanau - Accueil' },
                { to: '/massage-sportif', label: 'Massage Sportif Lacanau' },
                { to: '/informations', label: 'Massage à domicile & FAQ' },
                { to: '/contact', label: 'Contact Lacanau Océan' },
                { to: '/reservation', label: 'Réserver un massage' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-cream/80 hover:text-gold hover:pl-2 transition-all text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-gold flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold rounded-full" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <span className="text-cream/80 text-sm">
                  HEAL LO LACANAU<br />
                  7 rue Jean Michel<br />
                  33680 LACANAU
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <a href="tel:+33759701941" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium">
                  07 59 70 19 41
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <a href="mailto:contact.nlight@gmail.com" className="text-cream/80 hover:text-gold transition-colors text-sm">
                  contact.nlight@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-gold flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold rounded-full" />
              Suivez-moi
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/laure_dupuch/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center 
                         hover:bg-gold transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-cream group-hover:text-sage transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/laure-dupuch/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center 
                         hover:bg-gold transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-cream group-hover:text-sage transition-colors" />
              </a>
            </div>
            <div className="bg-sage-dark/30 rounded-xl p-4">
              <h5 className="font-body font-semibold text-gold text-sm mb-2">Horaires</h5>
              <p className="text-cream/80 text-sm">
                Sur rendez-vous uniquement<br />
                <span className="text-gold">Cabinet ou domicile</span>
              </p>
            </div>
          </div>
        </div>

        {/* Zone d'intervention SEO */}
        <div className="mt-12 pt-8 border-t border-cream/20">
          <div className="text-center mb-6">
            <p className="text-cream/70 text-sm font-body">
              <strong className="text-gold">Massage à domicile</strong> : Lacanau · Lacanau Océan · Le Porge · Carcans
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-cream/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/60 text-xs">
              © {currentYear} <span className="text-gold">Massage Lacanau - Aura Massage</span> - Laure Dupuch. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-xs">
              <Link to="/mentions-legales" className="text-cream/60 hover:text-gold transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-cream/60 hover:text-gold transition-colors">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-cream/60 hover:text-gold transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
