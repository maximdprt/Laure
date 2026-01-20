import { motion } from 'framer-motion'

export default function Newsletter() {
  return (
    <section className="bg-soft-cream py-12 border-t border-coral-pale/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="text-center md:text-left space-y-3">
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              Contacter MASSAGE AURA PERFORMANCE LACANAU
            </h3>
            <p className="text-gray-700 text-sm md:text-base">
              Une question sur un massage sportif, un soin énergétique ou un rendez-vous ?
              Vous pouvez joindre Laure directement par téléphone, email ou via ses réseaux.
            </p>
          </div>

          <div className="space-y-3 text-sm md:text-base text-gray-800 text-center md:text-left">
            <p>
              <span className="font-semibold">Téléphone :</span>{' '}
              <a
                href="tel:+33662099417"
                className="text-coral-DEFAULT hover:text-coral-light underline underline-offset-2"
              >
                06 62 09 94 17
              </a>
            </p>
            <p>
              <span className="font-semibold">Email :</span>{' '}
              <a
                href="mailto:contact.nlight@gmail.com"
                className="text-coral-DEFAULT hover:text-coral-light underline underline-offset-2"
              >
                contact.nlight@gmail.com
              </a>
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <a
                href="https://www.instagram.com/laure_dupuch/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-coral-DEFAULT text-white text-xs font-semibold hover:bg-coral-light transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/laure-dupuch-179019207/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-coral-DEFAULT text-white text-xs font-semibold hover:bg-coral-light transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}