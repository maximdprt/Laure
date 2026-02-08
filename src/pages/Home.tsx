import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Waves, MapPin, Star, Quote, Plus, Minus } from 'lucide-react'
import { getStoredAvis } from '../constants/services'
import { PUBLIC_IMAGES } from '../constants/images'

const carouselItems = [
  { image: PUBLIC_IMAGES.whatsApp1602, title: 'Massage Sportif', words: 'Performance · Récupération · Énergie' },
  { image: PUBLIC_IMAGES.reiki, title: 'Soins Énergétiques', words: 'Harmonie · Équilibre · Sérénité' },
  { image: PUBLIC_IMAGES.telecharger1, title: 'Chromothérapie', words: 'Couleurs · Fréquences · Bien-être' },
  { image: PUBLIC_IMAGES.massageRelaxant, title: 'Massage aux Huiles', words: 'Détente · Douceur · Relaxation' }
]

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === carouselItems.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? carouselItems.length - 1 : prev - 1
    })
  }

  return (
    <section className="section-padding bg-sage overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gold mb-4">
            Mes spécialités
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-md mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10
                     w-12 h-12 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center
                     hover:bg-gold/40 transition-all duration-300"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6 text-gold" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10
                     w-12 h-12 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center
                     hover:bg-gold/40 transition-all duration-300"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6 text-gold" />
          </button>

          {/* Carousel Slide */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft-lg">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <img
                  src={carouselItems[currentIndex].image}
                  alt={carouselItems[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gold mb-3">
                    {carouselItems[currentIndex].title}
                  </h3>
                  <p className="text-cream font-body text-base">
                    {carouselItems[currentIndex].words}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-6">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-gold w-8'
                    : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${PUBLIC_IMAGES.brooklynSpa}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sage/80 via-sage/60 to-dark/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-body font-medium 
                       text-gold bg-dark/40 backdrop-blur-md rounded-full border border-gold/40"
            >
              <Waves className="w-4 h-4" />
              Lacanau Océan - À 800m de la plage
            </motion.div>

            {/* Main Title - H1 optimisé SEO "massage lacanau" */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                       text-cream mb-6 leading-tight"
            >
              <span className="text-gold drop-shadow-lg">Massage Lacanau</span>
              <br />
              <span className="text-sand text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Sportif & Bien-être</span>
            </motion.h1>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gold-light mb-4 font-heading italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
            >
              "Là où le corps s'apaise, l'âme s'élève"
            </motion.p>

            {/* Description optimisée SEO */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-cream/80 mb-12 max-w-2xl mx-auto leading-relaxed font-body"
            >
              Votre bien-être, entre les mains d'une praticienne certifiée.
              <br />
              Massages sportifs, bien-être et soins énergétiques à Lacanau Océan
              <br />
              <br />
              – Cabinet & domicile
            </motion.p>

          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.button
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="p-2 rounded-full bg-gold/20 backdrop-blur-sm hover:bg-gold/40 transition-colors"
            >
              <ChevronDown className="w-6 h-6 text-gold" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Qu'est-ce que c'est Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-4">
                Massage Lacanau - Notre approche
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-6">
                Votre <span className="text-gold">massage à Lacanau</span> sur mesure
              </h2>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Vous cherchez un <strong className="text-sage font-semibold">massage à Lacanau</strong> de qualité ?
                  Notre cabinet situé à Lacanau Océan vous accueille pour des soins personnalisés.
                  Le <strong className="text-sage font-semibold">massage sportif à Lacanau</strong> est une technique spécialisée
                  destinée aux personnes actives : surfeurs, golfeurs, cyclistes ou simples amateurs de sport.
                </p>
                <p>
                  Le <strong className="text-sage font-semibold">massage bien-être à Lacanau</strong> associe les bienfaits du toucher
                  aux propriétés thérapeutiques des élixirs floraux et de la chromothérapie.
                  Les vacances sont le moment idéal pour <strong className="text-dark">ralentir, se recentrer et prendre soin de soi.</strong>
                </p>
                <p>
                  Offrez-vous un massage bien-être ou un massage énergétique pour relâcher les tensions, apaiser le
                  mental et retrouver une sensation de légèreté.
                </p>
                <p>
                  Chaque <strong className="text-sage font-semibold">massage à Lacanau Océan</strong> est personnalisé selon vos besoins,
                  votre activité et vos objectifs.
                </p>
                <p className="text-dark font-medium">
                  Disponible en <strong>cabinet à Lacanau Océan</strong> ou directement à votre <strong>lieu de séjour</strong>, pour une expérience
                  simple et sans contrainte.
                </p>
              </div>
              <Link to="/massage-sportif" className="inline-flex items-center gap-2 mt-6 text-gold font-body font-semibold hover:gap-4 transition-all">
                Découvrir nos massages à Lacanau <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="rounded-2xl overflow-hidden shadow-soft-lg aspect-[4/3] bg-cover bg-center"
                style={{
                  backgroundImage: `url('${PUBLIC_IMAGES.massage100Personnalise}')`
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <ServicesCarousel />

      {/* Qui je suis Section */}
      <section className="section-padding bg-sand">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <span className="inline-block px-4 py-1 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-4">
                Votre masseuse à Lacanau
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-2">
                Laure Dupuch
              </h2>
              <p className="text-gold font-heading italic text-xl mb-6">
                Praticienne holistique certifiée à Lacanau Océan
              </p>
              <div className="space-y-4 text-dark/70 font-body leading-relaxed">
                <p>
                  Professionnelle du bien-être installée à <strong className="text-sage">Lacanau</strong>, j'ai toujours été fascinée par les savoirs anciens, la
                  nature et l'océan, et j'ai naturellement intégré les médecines douces à ma pratique. Convaincue que
                  le corps et l'esprit ne peuvent être dissociés, j'ai découvert la chromothérapie après une chute, et ai
                  été émerveillée par le pouvoir des couleurs et les résultats obtenus.
                </p>
                <p>
                  Je propose depuis plusieurs années des massages exclusifs à <strong className="text-sage">Lacanau Océan</strong>, associés à la
                  chromothérapie et huiles premium d'exception pour détendre votre corps, apaiser votre esprit et
                  éveiller vos sens.
                </p>
                <p>
                  Laissez-vous envelopper par cette harmonie de lumière, de douceur et de parfum et offrez-vous un
                  instant de sérénité sur-mesure au cœur de notre station balnéaire.
                </p>
                <p>
                  Un moment privilégié, pensé pour vous ressourcer et vous émerveiller.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-sage text-gold border-2 border-gold 
                           font-body font-bold px-8 py-4 rounded-full shadow-soft
                           hover:bg-sage-dark hover:shadow-lg transition-all duration-300"
                >
                  Me contacter
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-soft-lg border-4 border-cream">
                  <img
                    src={PUBLIC_IMAGES.portrait}
                    alt="Laure Dupuch - Masseuse professionnelle à Lacanau Océan"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-sage text-cream p-6 rounded-xl shadow-soft">
                  <p className="font-heading font-bold text-lg">Lacanau Océan</p>
                  <p className="text-sm text-cream/80">Cabinet & Domicile</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section FAQ SEO - Questions fréquentes massage lacanau */}
      <FAQSection />

      {/* Section Avis Clients - Social Proof SEO */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-4">
              Témoignages
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-4">
              Avis sur nos <span className="text-gold">massages à Lacanau</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {(() => {
                const avis = getStoredAvis()
                const count = avis.length
                const avg = count ? (avis.reduce((s, a) => s + a.rating, 0) / count).toFixed(1) : '0'
                const fullStars = Math.round(Number(avg))
                return (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < fullStars ? 'fill-gold text-gold' : 'fill-gold/50 text-gold/50'}`} />
                    ))}
                    <span className="ml-2 text-dark/70 font-body">{avg}/5 basé sur {count} avis</span>
                  </>
                )
              })()}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getStoredAvis().map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-soft"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gold/30 mb-3" />
                <p className="text-dark/70 font-body mb-4 italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-dark">{review.name}</span>
                  <span className="text-dark/50 text-sm font-body">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="section-padding bg-sage">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-cream mb-4">
              Réservez votre <span className="text-gold">massage à Lacanau</span>
            </h2>
            <p className="text-cream/80 font-body max-w-2xl mx-auto mb-6">
              Cabinet à Lacanau Océan ou intervention à domicile sur Lacanau, Le Porge et Carcans.
              Massage sportif, bien-être, chromothérapie - trouvez le soin qui vous correspond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/reservation"
                className="inline-flex items-center gap-3 bg-gold text-dark font-body font-bold px-8 py-4 rounded-full shadow-gold hover:bg-gold-dark transition-all"
              >
                Réserver maintenant
              </Link>
              <a
                href="tel:+33759701941"
                className="inline-flex items-center gap-3 border-2 border-gold text-gold font-body font-bold px-8 py-4 rounded-full hover:bg-gold/10 transition-all"
              >
                07 59 70 19 41
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-cream/70">
              <MapPin className="w-4 h-4" />
              <span className="font-body text-sm">7 rue Jean Michel, 33680 Lacanau - HEAL LO LACANAU</span>
            </div>
            <p className="mt-6 text-cream/70 font-body text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Conformément à la législation française, les massages proposés ne sont ni thérapeutiques ni sexuels et ne s’apparentent à aucune pratique médicale ou paramédicale.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

// Composant FAQ avec Schema.org
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Où trouver un bon massage à Lacanau ?",
      answer: "Aura Massage est situé au 7 rue Jean Michel à Lacanau Océan, dans le centre HEAL LO LACANAU, à seulement 800m de la plage. Nous proposons des massages sportifs, bien-être et chromothérapie. Vous pouvez également bénéficier d'un massage à domicile sur tout Lacanau et ses environs."
    },
    {
      question: "Quels types de massage proposez-vous à Lacanau Océan ?",
      answer: "Nous proposons plusieurs types de massages à Lacanau : massage sportif (préparation et récupération), massage relaxant aux huiles, soins énergétiques et chromothérapie. Nos massages sont particulièrement adaptés aux surfeurs et sportifs pratiquant à Lacanau."
    },
    {
      question: "Quel est le prix d'un massage à Lacanau ?",
      answer: "Nos massages à Lacanau débutent à 45€ pour une séance de 30 minutes (activation ou récupération). Le massage sportif complet de 60 minutes est à 85€, et le soin premium de 90 minutes à 130€. Nous proposons également des soins énergétiques à partir de 90€."
    },
    {
      question: "Faites-vous des massages à domicile à Lacanau ?",
      answer: "Oui, nous intervenons à domicile sur tout Lacanau, Lacanau Océan, Le Porge et Carcans. Le massage à domicile vous permet de profiter d'un moment de détente dans le confort de votre location de vacances ou de votre résidence."
    },
    {
      question: "Le massage sportif à Lacanau est-il adapté aux surfeurs ?",
      answer: "Absolument ! Le massage sportif à Lacanau est spécialement conçu pour les pratiquants de sports nautiques et de glisse. Il aide à prévenir les blessures, améliore la récupération musculaire après une session de surf, et optimise vos performances. Idéal avant ou après vos sessions à la plage centrale ou au spot du Lion."
    },
    {
      question: "Comment prendre rendez-vous pour un massage à Lacanau ?",
      answer: "Vous pouvez réserver votre massage à Lacanau directement en ligne sur notre site, par téléphone au 07 59 70 19 41, ou par email. Nous vous recommandons de réserver à l'avance, surtout en période estivale où la demande est forte."
    }
  ]

  return (
    <section className="section-padding bg-sand">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-4">
            Questions fréquentes
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-4">
            Tout savoir sur le <span className="text-gold">massage à Lacanau</span>
          </h2>
          <p className="text-dark/60 font-body max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus fréquentes sur nos massages à Lacanau Océan.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-soft"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h3 className="font-heading font-semibold text-dark pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === i ? (
                    <Minus className="w-5 h-5 text-gold" />
                  ) : (
                    <Plus className="w-5 h-5 text-sage" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-dark/70 font-body leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
