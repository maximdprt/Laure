import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coordonnées */}
          <div>
            <h3 className="font-serif font-semibold text-gray-800 text-lg mb-4">
              Coordonnées
            </h3>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>
                <strong>Téléphone :</strong>
                <br />
                <a
                  href="tel:0662099417"
                  className="hover:text-coral-DEFAULT transition-colors"
                >
                  06 62 09 94 17
                </a>
              </p>
              <p>
                <strong>Email :</strong>
                <br />
                <a
                  href="mailto:contact@nlight-lauredupuch.fr"
                  className="hover:text-coral-DEFAULT transition-colors"
                >
                  contact@nlight-lauredupuch.fr
                </a>
              </p>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-serif font-semibold text-gray-800 text-lg mb-4">
              Horaires
            </h3>
            <div className="text-gray-600 text-sm">
              <p>Lundi - Vendredi</p>
              <p>8h - 20h</p>
            </div>
          </div>

          {/* Localisation */}
          <div>
            <h3 className="font-serif font-semibold text-gray-800 text-lg mb-4">
              Localisation
            </h3>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>Lacanau</p>
              <p>Pessac</p>
              <p>Andernos</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif font-semibold text-gray-800 text-lg mb-4">
              Navigation
            </h3>
            <nav className="space-y-2">
              <Link
                to="/presentation"
                className="block text-gray-600 hover:text-coral-DEFAULT text-sm transition-colors"
              >
                Présentation
              </Link>
              <Link
                to="/prestations"
                className="block text-gray-600 hover:text-coral-DEFAULT text-sm transition-colors"
              >
                Prestations
              </Link>
              <Link
                to="/contact"
                className="block text-gray-600 hover:text-coral-DEFAULT text-sm transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-xs">
          <p>
            © {new Date().getFullYear()} NLIGHT - Laure Dupuch. Tous droits réservés.
          </p>
          <p className="mt-2">
            Praticienne en Chromobioénergie® - Mentions légales
          </p>
        </div>
      </div>
    </footer>
  )
}