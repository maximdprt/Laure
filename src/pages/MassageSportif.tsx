import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Check, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { massagesSportifs, soinsEnergetiques, PREMIUM_OPTION_PRICE } from '../constants/services'

const benefitsCards = [
  {
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    title: 'Récupération',
    description: 'Améliorer la récupération musculaire après l\'effort'
  },
  {
    image: '/Gemini_Generated_Image_7ptbup7ptbup7ptb.png',
    title: 'Détente',
    description: 'Soulager les tensions profondes du corps'
  },
  {
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    title: 'Prévention',
    description: 'Prévenir les blessures liées à l\'effort'
  },
  {
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    title: 'Mobilité',
    description: 'Optimiser la souplesse et la mobilité'
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    title: 'Bien-être',
    description: 'Favoriser un état de bien-être durable'
  },
  {
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=600&q=80',
    title: 'Énergie',
    description: 'Harmonisation de l\'aura et de l\'énergie'
  }
]

const BenefitsCarousel3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % benefitsCards.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + benefitsCards.length) % benefitsCards.length)
  }

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const normalizedDiff = ((diff + benefitsCards.length) % benefitsCards.length)
    
    // Calcul de la position pour effet 3D
    let translateX = 0
    let translateZ = 0
    let rotateY = 0
    let opacity = 1
    let scale = 1
    let zIndex = 0

    if (normalizedDiff === 0) {
      // Carte centrale
      translateX = 0
      translateZ = 0
      rotateY = 0
      opacity = 1
      scale = 1
      zIndex = 3
    } else if (normalizedDiff === 1 || normalizedDiff === benefitsCards.length - 1) {
      // Cartes adjacentes
      translateX = normalizedDiff === 1 ? 220 : -220
      translateZ = -100
      rotateY = normalizedDiff === 1 ? -25 : 25
      opacity = 0.7
      scale = 0.85
      zIndex = 2
    } else if (normalizedDiff === 2 || normalizedDiff === benefitsCards.length - 2) {
      // Cartes plus éloignées
      translateX = normalizedDiff === 2 ? 380 : -380
      translateZ = -200
      rotateY = normalizedDiff === 2 ? -35 : 35
      opacity = 0.4
      scale = 0.7
      zIndex = 1
    } else {
      // Cartes cachées
      opacity = 0
      scale = 0.5
      zIndex = 0
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    }
  }

  return (
    <section className="section-padding bg-sand overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-semibold text-3xl text-dark mb-4">
            Les <span className="text-gold">bénéfices</span> du massage sportif à Lacanau
          </h2>
          <p className="text-dark/60 font-body">Récupération optimale pour les sportifs du Médoc</p>
        </motion.div>

        {/* Carousel 3D */}
        <div className="relative h-[450px] flex items-center justify-center" style={{ perspective: '1000px' }}>
          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-sage/80 backdrop-blur-sm 
                     flex items-center justify-center hover:bg-sage transition-all duration-300 shadow-soft"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6 text-gold" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-sage/80 backdrop-blur-sm 
                     flex items-center justify-center hover:bg-sage transition-all duration-300 shadow-soft"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6 text-gold" />
          </button>

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {benefitsCards.map((card, index) => {
              const style = getCardStyle(index)
              return (
                <motion.div
                  key={index}
                  className="absolute w-64 sm:w-72 cursor-pointer"
                  animate={style}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  onClick={() => setCurrentIndex(index)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-card-hover">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-6 text-center">
                      <h3 className="font-heading font-bold text-xl text-gold mb-2">
                        {card.title}
                      </h3>
                      <p className="text-dark/70 font-body text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {benefitsCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gold w-8' 
                  : 'bg-gold/30 hover:bg-gold/50'
              }`}
              aria-label={`Aller à la carte ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const MassagesList = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-dark mb-4">
            Massages <span className="text-gold">Sportifs</span>
          </h2>
          <p className="text-dark/60 font-body">Préparation & Récupération</p>
        </motion.div>

        {/* Grille de cartes avec effet visuel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {massagesSportifs.map((massage, index) => (
            <motion.div
              key={massage.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 
                            ${hoveredIndex === index ? 'shadow-2xl scale-[1.02]' : 'shadow-soft'}`}>
                
                {/* Fond avec dégradé animé */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage-dark to-sage opacity-95" />
                
                {/* Cercles décoratifs animés */}
                <motion.div 
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/10"
                  animate={{ 
                    scale: hoveredIndex === index ? 1.2 : 1,
                    rotate: hoveredIndex === index ? 45 : 0
                  }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div 
                  className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-cream/10"
                  animate={{ 
                    scale: hoveredIndex === index ? 1.3 : 1,
                    rotate: hoveredIndex === index ? -30 : 0
                  }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-gold/20"
                  animate={{ 
                    scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                    opacity: hoveredIndex === index ? [0.2, 0.5, 0.2] : 0.2
                  }}
                  transition={{ duration: 2, repeat: hoveredIndex === index ? Infinity : 0 }}
                />

                {/* Contenu */}
                <div className="relative z-10 p-8 sm:p-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      {massage.popular && (
                        <motion.div 
                          className="inline-flex items-center gap-2 bg-gold text-dark px-3 py-1 rounded-full mb-3"
                          animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                        >
                          <Star className="w-3 h-3 fill-dark" />
                          <span className="font-body font-semibold text-xs">Populaire</span>
                        </motion.div>
                      )}
                      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-cream mb-2">
                        {massage.name}
                      </h3>
                      <p className="text-gold font-body text-sm">{massage.subtitle}</p>
                    </div>
                    
                    {/* Prix avec animation */}
                    <motion.div 
                      className="text-right"
                      animate={{ y: hoveredIndex === index ? -5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-gold/20 backdrop-blur-sm rounded-2xl px-5 py-3 border border-gold/30">
                        <span className="font-heading font-bold text-4xl text-gold">{massage.price}</span>
                        <span className="text-gold/80 text-lg">€</span>
                        <p className="text-cream/70 text-xs font-body">{massage.duration} min</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-cream/80 font-body leading-relaxed mb-8">
                    {massage.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cream/20">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="font-body text-cream text-sm">{massage.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cream/20">
                      <Check className="w-4 h-4 text-gold" />
                      <span className="font-body text-cream text-sm">Cabinet & domicile</span>
                    </div>
                  </div>

                  {/* Bouton */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={`/reservation?soin=${massage.id}`}
                      className="flex items-center justify-center gap-3 w-full bg-gold text-dark font-body font-bold 
                               py-4 rounded-2xl hover:bg-gold-dark transition-all duration-300 group"
                    >
                      Réserver maintenant
                      <motion.span
                        animate={{ x: hoveredIndex === index ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>

                {/* Numéro décoratif */}
                <div className="absolute top-6 left-6 font-heading font-bold text-8xl text-cream/5">
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const MassageSportif = () => (
  <div className="min-h-screen pt-24">
    {/* Header - SEO optimisé */}
    <section className="bg-sage text-cream py-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl mb-4">
            <span className="text-gold">Massage Sportif Lacanau</span>
            <br />
            <span className="text-cream text-3xl sm:text-4xl">& Soins Énergétiques</span>
          </h1>
          <p className="text-cream/80 text-lg font-body max-w-2xl mx-auto">
            Votre spécialiste du <strong className="text-gold">massage à Lacanau Océan</strong>. 
            Massage sportif premium pour surfeurs et sportifs, récupération musculaire et soins énergétiques.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Présentation */}
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-semibold text-3xl text-dark mb-6">
              Le <span className="text-gold">massage sportif à Lacanau</span> premium
            </h2>
            <div className="space-y-4 text-dark/70 font-body">
              <p>
                Le <strong className="text-sage">massage sportif à Lacanau Océan</strong> s'adresse à toutes les personnes actives 
                souhaitant prendre soin de leur corps, sans nécessité d'être un sportif de haut niveau.
                Idéal avant ou après vos sessions de surf sur les spots de Lacanau.
              </p>
              <p>
                Inspirés par les exigences des pratiques outdoor sur le littoral atlantique, nos <strong className="text-sage">massages à Lacanau</strong> visent à améliorer 
                la récupération musculaire, soulager les tensions profondes, prévenir les blessures 
                et optimiser la mobilité articulaire.
              </p>
              <p>
                Nos soins sont particulièrement appréciés par les <strong className="text-sage">surfeurs de Lacanau, 
                golfeurs du Golf de l'Ardilouse, cyclistes de la Vélodyssée, coureurs</strong> et passionnés d'activités outdoor 
                sur tout le bassin médocain.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-soft-lg aspect-[4/3] bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80')` }}
          />
        </div>
      </div>
    </section>

    {/* Bénéfices - Carousel 3D */}
    <BenefitsCarousel3D />

    {/* Massages Sportifs - Liste */}
    <MassagesList />

    {/* Soins Énergétiques - Design Premium */}
    <section className="relative py-24 overflow-hidden">
      {/* Fond avec dégradé mystique */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage via-sage-dark to-dark" />
      
      {/* Particules flottantes animées */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Cercles lumineux en arrière-plan */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cream/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gold/20 backdrop-blur-sm rounded-full border border-gold/30 mb-6"
          >
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold font-body font-medium">Expériences uniques</span>
          </motion.div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-cream mb-4">
            Soins <span className="text-gold">Énergétiques</span>
          </h2>
          <p className="text-cream/70 font-body max-w-2xl mx-auto text-lg">
            Des soins d'exception pour harmoniser corps et esprit, 
            dans une dimension de bien-être profond.
          </p>
        </motion.div>

        {/* Cartes des soins */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {soinsEnergetiques.map((soin, i) => (
            <motion.div
              key={soin.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative"
            >
              <div className={`relative overflow-hidden rounded-3xl backdrop-blur-xl 
                            ${soin.premium 
                              ? 'bg-gradient-to-br from-gold/20 via-cream/10 to-gold/10 border-2 border-gold/50' 
                              : 'bg-cream/10 border border-cream/20'
                            } p-8 sm:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
              >
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Header de la carte */}
                <div className="mb-8">
                  <h3 className="font-heading font-bold text-3xl text-cream mb-3">
                    {soin.name}
                  </h3>
                  <p className="text-gold font-body text-sm mb-4">{soin.subtitle}</p>
                  {soin.tagline && (
                    <motion.p 
                      className="text-cream/80 font-heading italic text-lg border-l-2 border-gold pl-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.2 }}
                    >
                      "{soin.tagline}"
                    </motion.p>
                  )}
                </div>

                {/* Description */}
                <p className="text-cream/70 font-body leading-relaxed mb-8">
                  {soin.description}
                </p>

                {/* Bienfaits avec animation */}
                {soin.benefits && (
                  <div className="mb-8">
                    <h4 className="font-heading font-semibold text-gold mb-4 flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        ✦
                      </motion.span>
                      Bienfaits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {soin.benefits.map((benefit, j) => (
                        <motion.div 
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * j }}
                          className="flex items-start gap-3 bg-cream/5 rounded-xl p-3 border border-cream/10"
                        >
                          <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-gold" />
                          </div>
                          <span className="text-cream/80 font-body text-sm">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer avec prix et durée */}
                <div className="flex items-center justify-between pt-6 border-t border-cream/20 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-cream/10 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="text-cream font-body text-sm">{soin.duration} min</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-bold text-4xl text-gold">{soin.price}</span>
                    <span className="text-gold/70 text-xl">€</span>
                  </div>
                </div>

                {/* Bouton de réservation */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/reservation?soin=${soin.id}`}
                    className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-body font-bold 
                              transition-all duration-300 group/btn
                              ${soin.premium 
                                ? 'bg-gold text-dark hover:bg-gold-dark' 
                                : 'bg-cream/20 text-cream border border-cream/30 hover:bg-cream/30'
                              }`}
                  >
                    Réserver cette expérience
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Décoration de coin */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-gold/30 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gold/30 rounded-br-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Approche globale */}
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-soft-lg aspect-video bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=800&q=80')` }}
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-semibold text-3xl text-dark mb-6">
              Une approche <span className="text-gold">globale</span>
            </h2>
            <div className="space-y-4 text-dark/70 font-body">
              <p>
                Le massage sportif premium ne se limite pas au travail musculaire. 
                Il agit en profondeur sur l'équilibre énergétique et l'aura de la personne.
              </p>
              <p>
                Lorsque le corps est détendu et énergétiquement équilibré, 
                il devient plus disponible à l'effort. Cette harmonie intérieure contribue à 
                améliorer la concentration et optimiser la récupération.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-sage">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading font-semibold text-3xl text-cream mb-4">
            Réservez votre <span className="text-gold">massage à Lacanau</span>
          </h2>
          <p className="text-cream/80 max-w-2xl mx-auto mb-8 font-body">
            Au cabinet à Lacanau Océan (7 rue Jean Michel) ou à domicile sur Lacanau, Le Porge, Carcans et Hourtin. 
            Votre massage sportif ou bien-être vous attend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation" className="btn-primary text-lg px-10 py-4">
              Réserver en ligne
            </Link>
            <a href="tel:+33759701941" className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold font-body font-bold px-8 py-4 rounded-full hover:bg-gold/10 transition-all">
              07 59 70 19 41
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
)

export default MassageSportif
