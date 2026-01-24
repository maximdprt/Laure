import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Waves } from 'lucide-react'

const carouselItems = [
  {
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    title: 'Massage Sportif',
    words: 'Performance · Récupération · Énergie'
  },
  {
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
    title: 'Soins Énergétiques',
    words: 'Harmonie · Équilibre · Sérénité'
  },
  {
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    title: 'Chromothérapie',
    words: 'Couleurs · Lumière · Bien-être'
  },
  {
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    title: 'Massage aux Huiles',
    words: 'Détente · Douceur · Relaxation'
  }
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
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
              backgroundImage: `url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1920&q=80')`,
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

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
                       text-cream mb-6 leading-tight"
            >
              Massage{' '}
              <span className="text-gold drop-shadow-lg">Aura</span>
              <br />
              <span className="text-sand">Performance</span>
            </motion.h1>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gold mb-4 font-heading italic"
            >
              "Là où le corps s'apaise, l'âme s'élève"
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-cream/80 mb-12 max-w-2xl mx-auto leading-relaxed font-body"
            >
              Massage sportif premium et soins énergétiques d'exception. 
              Une approche holistique pour votre récupération et votre bien-être.
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
                Notre approche
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-6">
                Une approche <span className="text-gold">holistique</span> du bien-être
              </h2>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Le <strong className="text-sage font-semibold">massage sportif</strong> est une technique spécialisée 
                  destinée aux personnes actives, qu'elles soient sportives de haut niveau ou amateurs passionnés. 
                  Il prépare le corps à l'effort, optimise la récupération et prévient les blessures.
                </p>
                <p>
                  Le <strong className="text-sage font-semibold">massage aux huiles</strong> associe les bienfaits du toucher 
                  aux propriétés thérapeutiques des huiles essentielles et de la chromothérapie. 
                  Une expérience sensorielle complète qui harmonise le corps et l'esprit.
                </p>
                <p>
                  Chaque soin est personnalisé selon vos besoins, votre activité et vos objectifs, 
                  dans le respect de votre corps et de son rythme naturel.
                </p>
              </div>
              <Link to="/massage-sportif" className="inline-flex items-center gap-2 mt-6 text-gold font-body font-semibold hover:gap-4 transition-all">
                En savoir plus <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
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
                  backgroundImage: `url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute -bottom-4 -right-4 bg-gold text-dark p-4 rounded-xl shadow-gold">
                <p className="font-heading font-bold text-2xl">100%</p>
                <p className="text-xs">Personnalisé</p>
              </div>
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
                Qui je suis
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-2">
                Laure Dupuch
              </h2>
              <p className="text-gold font-heading italic text-xl mb-6">
                Praticienne holistique
              </p>
              <div className="space-y-4 text-dark/70 font-body leading-relaxed">
                <p>
                  Professionnelle du bien-être, attirée par le savoir des anciens dont nous nous 
                  sommes éloignés au fil du temps, fascinée par tout ce que nous offre la nature 
                  et l'océan, j'ai toujours utilisé les médecines douces.
                </p>
                <p>
                  Convaincue que nous devons prendre soin de notre corps sans le dissocier de notre 
                  esprit, et en ayant fait l'expérience à titre personnel, j'ai découvert la 
                  <strong className="text-sage"> Chromothérapie</strong> à la suite d'une chute et j'ai été surprise par le pouvoir des 
                  couleurs et des résultats obtenus.
                </p>
                <p>
                  Il n'en fallut pas plus pour éveiller ma curiosité sur cette thérapie naturelle 
                  reconnue par l'OMS en 1976 et me donner l'envie de la partager en vous proposant 
                  un accompagnement sérieux et durable.
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
                    src="/lauredupuch-dupuch-portrait.jpg" 
                    alt="Laure Dupuch - Praticienne holistique"
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

    </div>
  )
}

export default Home
