import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-soft-cream border-t border-coral-pale/50 mt-20">
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
                  href="tel:+33662099417"
                  className="hover:text-coral-DEFAULT transition-colors"
                >
                  06 62 09 94 17
                </a>
              </p>
              <p>
                <strong>Email :</strong>
                <br />
                <a
                  href="mailto:contact.nlight@gmail.com"
                  className="hover:text-coral-DEFAULT transition-colors"
                >
                  contact.nlight@gmail.com
                </a>
              </p>
              <p>
                <strong>Site du centre :</strong>
                <br />
                <a
                  href="https://heal-lo.fr"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-coral-DEFAULT transition-colors"
                >
                  heal-lo.fr
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
              <p>Lundi - Dimanche</p>
              <p>07h30 - 20h00</p>
              <p className="mt-2 text-xs text-gray-500">
                Horaires basés sur le centre de bien-être Heal.LO - Lacanau.
              </p>
            </div>
          </div>

          {/* Localisation */}
          <div>
            <h3 className="font-serif font-semibold text-gray-800 text-lg mb-4">
              Localisation
            </h3>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>
                Espace HEAL LO LACANAU
                <br />
                7 rue Jean Michel
                <br />
                33680 LACANAU
              </p>
              <p className="mt-2">Séances au cabinet ou à domicile</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif font-semibold text-gray-800 text-lg mb-4">
              Navigation
            </h3>
            <nav className="space-y-2">
              <Link
                to="/"
                className="block text-gray-600 hover:text-coral-DEFAULT text-sm transition-colors"
              >
                Accueil
              </Link>
              <Link
                to="/offres-tarifs"
                className="block text-gray-600 hover:text-coral-DEFAULT text-sm transition-colors"
              >
                Offres &amp; Tarifs
              </Link>
              <Link
                to="/presentation"
                className="block text-gray-600 hover:text-coral-DEFAULT text-sm transition-colors"
              >
                Présentation
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
            © {new Date().getFullYear()} MASSAGE AURA PERFORMANCE LACANAU. Tous droits réservés.
          </p>
          <p className="mt-2">
            Massages sportifs &amp; soins énergétiques - Espace HEAL LO LACANAU
          </p>
        </div>
      </div>
    </footer>
  )
}