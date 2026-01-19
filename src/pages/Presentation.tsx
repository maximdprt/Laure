import { motion } from 'framer-motion'

export default function Presentation() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Barre bleu-gris verticale */}
            <div className="absolute -left-4 top-0 bottom-0 w-2 bg-blue-grey-light"></div>
            <img
              src="/images/laure-portrait.jpg"
              alt="Laure Dupuch - Praticienne holistique"
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </motion.div>

          {/* Colonne droite - Texte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Forme bleu-gris en arrière-plan */}
            <div className="absolute top-0 right-0 w-64 h-96 bg-blue-grey-light opacity-20 rounded-lg -z-10"></div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-light text-blue-grey mb-6">
              Laure
              <br />
              Dupuch
            </h1>
            <h2 className="text-2xl font-sans font-medium text-blue-grey mb-8">
              Praticienne holistique
            </h2>
            <p className="text-lg text-blue-grey leading-relaxed mb-6">
              Professionnelle du bien-être, attirée par le savoir des anciens dont nous nous
              sommes éloignés au fil du temps, fascinée par tout ce que nous offre la nature et
              l'océan j'ai toujours utilisé les médecines douces.
            </p>
            <p className="text-lg text-blue-grey leading-relaxed">
              Que vous soyez un enfant, un adolescent ou un adulte, mon objectif reste identique :
              vous faire bénéficier de ma meilleure expertise et vous proposer des recommandations
              pertinentes adaptées à vos besoins et à vos attentes afin d'améliorer votre bien-être.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}