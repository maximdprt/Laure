import { motion } from 'framer-motion'

export default function Elixirs() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche - Illustration lavande */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <svg viewBox="0 0 300 600" className="w-full max-w-md">
              {/* Tiges de lavande */}
              <path
                d="M 100 600 L 100 300 M 120 600 L 120 320 M 140 600 L 140 310 M 160 600 L 160 300 M 180 600 L 180 315"
                fill="none"
                stroke="#8DA089"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Fleurs de lavande (clusters) */}
              <g transform="translate(100, 300)">
                <ellipse cx="0" cy="0" rx="15" ry="8" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-10" rx="12" ry="6" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-20" rx="10" ry="5" fill="#8DA089" opacity="0.8" />
              </g>
              <g transform="translate(120, 320)">
                <ellipse cx="0" cy="0" rx="18" ry="10" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-12" rx="15" ry="8" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-24" rx="12" ry="6" fill="#8DA089" opacity="0.8" />
              </g>
              <g transform="translate(140, 310)">
                <ellipse cx="0" cy="0" rx="16" ry="9" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-11" rx="13" ry="7" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-22" rx="11" ry="6" fill="#8DA089" opacity="0.8" />
              </g>
              <g transform="translate(160, 300)">
                <ellipse cx="0" cy="0" rx="14" ry="8" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-10" rx="11" ry="6" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-20" rx="9" ry="5" fill="#8DA089" opacity="0.8" />
              </g>
              <g transform="translate(180, 315)">
                <ellipse cx="0" cy="0" rx="17" ry="9" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-12" rx="14" ry="7" fill="#8DA089" opacity="0.8" />
                <ellipse cx="0" cy="-24" rx="12" ry="6" fill="#8DA089" opacity="0.8" />
              </g>
            </svg>
          </motion.div>

          {/* Colonne droite - Texte et produit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-coral-pale rounded-lg p-10 md:p-12 border-2 border-coral-light"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-8">
              Trouvez votre équilibre grâce aux élixirs
            </h1>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-8">
              <p>
                Ce sont des produits naturels qui agissent de manière subtile en mettant en relation
                l'énergie d'une fleur, d'une plante, d'un cristal ou d'un son avec le cœur de nos
                cellules par effet de résonance.
              </p>
              <p>
                Les élixirs harmonisent les{' '}
                <strong style={{ color: '#C56B6B' }}>émotions et attitudes</strong> qui entravent
                votre épanouissement personnel et perturbent votre santé.
              </p>
              <p>
                Ils viennent rétablir un dysfonctionnement énergétique et agissent sur{' '}
                <strong style={{ color: '#C56B6B' }}>3 plans : physique, mental et spirituel</strong>.
              </p>
              <p>
                N.L.I.G.H.T. vous propose des{' '}
                <strong style={{ color: '#C56B6B' }}>préparations personnalisées</strong> qui
                peuvent être utilisées occasionnellement ou sur de plus longues périodes suivant la
                problématique.
              </p>
            </div>

            {/* Image produit */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/images/elixir-bottle.png"
                  alt="Bouteille élixir N.L.I.G.H.T."
                  className="h-64 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}