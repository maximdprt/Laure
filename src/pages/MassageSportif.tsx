import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { massagesSportifs, massagesRelaxants, soinsEnergetiques } from '../constants/services'
import { PUBLIC_IMAGES } from '../constants/images'

const benefitsCards = [
  { image: PUBLIC_IMAGES.telecharger2, title: 'Récupération', description: 'Améliorer la récupération musculaire après l\'effort' },
  { image: PUBLIC_IMAGES.gemini, title: 'Détente', description: 'Soulager les tensions profondes du corps' },
  { image: PUBLIC_IMAGES.secretYounger, title: 'Prévention', description: 'Prévenir les blessures liées à l\'effort' },
  { image: PUBLIC_IMAGES.spaBalinese, title: 'Mobilité', description: 'Optimiser la souplesse et la mobilité' },
  { image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', title: 'Bien-être', description: 'Favoriser un état de bien-être durable' },
  { image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=600&q=80', title: 'Énergie', description: 'Harmonisation du corps énergétique' }
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
                
                {/* Fond avec dégradé élégant */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage-dark to-sage opacity-95" />
                
                {/* Ligne décorative en haut */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0.5
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Effet de lumière subtil */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-cream/5 to-gold/10"
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0.3
                  }}
                  transition={{ duration: 0.5 }}
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
            <span className="inline-block text-sage font-body font-medium text-sm uppercase tracking-wider mb-3">
              Pour qui ?
            </span>
            <h2 className="font-heading font-bold text-3xl text-dark mb-4">
              Massages sportifs, bien-être & énergétiques à <span className="text-gold">Lacanau Océan</span>
            </h2>
            <p className="text-dark/70 font-body mb-6 leading-relaxed">
              Des soins sur-mesure, pensés pour vous. Chaque massage s'adapte à votre profil et à vos objectifs.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                <span className="text-dark/80 font-body">
                  <strong className="text-dark">Sportifs</strong> — surf, vélo, course, activités nautiques : récupération et préparation à l'effort
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                <span className="text-dark/80 font-body">
                  <strong className="text-dark">Vacanciers</strong> — en quête de relaxation et de lâcher-prise au bord de l'océan
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                <span className="text-dark/80 font-body">
                  <strong className="text-dark">Tous</strong> — soulager tensions, fatigue ou stress au quotidien
                </span>
              </li>
            </ul>
            <p className="text-dark/70 font-body italic border-l-2 border-gold pl-4">
              Afin de répondre au mieux à vos besoins physiques, émotionnels et énergétiques.
            </p>
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

    {/* Massages Relaxants */}
    <section className="py-24 bg-gradient-to-b from-cream to-sand/20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-5 tracking-wide">
            Bien-être
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark mb-5">
            Massages <span className="text-gold">Relaxants</span>
          </h2>
          <p className="text-dark/70 font-body max-w-2xl mx-auto text-lg leading-relaxed">
            Offrez-vous un moment de relaxation totale. Ces massages bien-être sont adaptés à vos besoins et à votre confort : vous choisissez la ou les zones que vous souhaitez et laissez-vous transporter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {massagesRelaxants.map((soin, i) => (
            <motion.article
              key={soin.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-300 border border-sand/50"
            >
              {/* Bandeau accent */}
              <div className="h-1 w-full bg-gradient-to-r from-sage via-sage-dark to-gold/60" />

              <div className="p-8 sm:p-10">
                {/* En-tête carte */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-1 tracking-tight">
                      {soin.name}
                    </h3>
                    <p className="text-gold font-body text-sm font-medium">{soin.subtitle}</p>
                  </div>
                  <div className="flex-shrink-0 text-right bg-sand/50 rounded-2xl px-5 py-3">
                    <span className="font-heading font-bold text-2xl text-gold block">{soin.price}€</span>
                    <span className="text-dark/60 text-sm font-body">{soin.duration} min</span>
                  </div>
                </div>

                {/* Intro */}
                <p className="text-dark/75 font-body leading-relaxed mb-6">
                  {soin.description}
                </p>

                {/* Zones / Combos en listes */}
                <div className="space-y-5 mb-8">
                  {soin.zonesSeules && soin.zonesSeules.length > 0 && (
                    <div>
                      <h4 className="font-heading font-semibold text-dark text-sm uppercase tracking-wider mb-3 text-sage">
                        Zones seules
                      </h4>
                      <ul className="space-y-2">
                        {soin.zonesSeules.map((zone, j) => (
                          <li key={j} className="flex items-center gap-2 text-dark/80 font-body text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                            {zone}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {soin.combos && soin.combos.length > 0 && (
                    <div>
                      <h4 className="font-heading font-semibold text-dark text-sm uppercase tracking-wider mb-3 text-sage">
                        {soin.zonesSeules ? 'Ou combos' : 'Combos proposés'}
                      </h4>
                      <ul className="space-y-2">
                        {soin.combos.map((combo, j) => (
                          <li key={j} className="flex items-center gap-2 text-dark/80 font-body text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                            {combo}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  to={`/reservation?soin=${soin.id}`}
                  className="inline-flex items-center gap-2 bg-sage text-cream font-body font-bold px-7 py-3.5 rounded-full hover:bg-sage-dark transition-all text-sm shadow-soft group-hover:shadow-gold/20"
                >
                  Réserver ce soin
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* Soins Énergétiques - Design avec Images */}
    <section className="py-24 bg-cream">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-sage/10 text-sage text-sm font-body font-medium rounded-full mb-4">
            Soins Holistiques
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark mb-4">
            Soins <span className="text-gold">Énergétiques</span>
          </h2>
          <p className="text-dark/70 font-body max-w-2xl mx-auto text-lg">
            Des soins d'exception pour harmoniser corps et esprit, 
            dans une dimension de bien-être profond.
          </p>
        </motion.div>

        {/* Soins avec images alternées */}
        <div className="space-y-20">
          {soinsEnergetiques.map((soin, i) => (
            <motion.div
              key={soin.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <motion.div 
                className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img 
                    src={i === 0 ? 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80' : 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'}
                    alt={soin.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
                  
                  {/* Badge prix */}
                  <div className="absolute top-6 right-6 bg-gold text-dark px-5 py-3 rounded-2xl shadow-gold">
                    <span className="font-heading font-bold text-2xl">{soin.price}€</span>
                    <span className="block text-xs text-dark/70">{soin.duration} min</span>
                  </div>
                </div>
                
                {/* Décoration */}
                <div className={`absolute -z-10 w-full h-full rounded-3xl bg-sage/20 
                              ${i % 2 === 0 ? '-bottom-4 -right-4' : '-bottom-4 -left-4'}`} />
              </motion.div>

              {/* Contenu */}
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-3">
                    {soin.name}
                  </h3>
                  <p className="text-gold font-body font-medium mb-4">{soin.subtitle}</p>
                  
                  {soin.tagline && (
                    <p className="text-dark/60 font-heading italic text-lg border-l-4 border-gold pl-4 mb-6">
                      "{soin.tagline}"
                    </p>
                  )}

                  <p className="text-dark/70 font-body leading-relaxed mb-8 text-lg">
                    {soin.description}
                  </p>

                  {/* Bienfaits */}
                  {soin.benefits && (
                    <div className="mb-8">
                      <h4 className="font-heading font-semibold text-dark mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-gold" />
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
                            className="flex items-start gap-3"
                          >
                            <div className="w-6 h-6 rounded-full bg-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-cream" />
                            </div>
                            <span className="text-dark/70 font-body text-sm">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bouton */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={`/reservation?soin=${soin.id}`}
                      className="inline-flex items-center gap-3 bg-sage text-cream font-body font-bold px-8 py-4 rounded-full 
                               hover:bg-sage-dark transition-all duration-300 shadow-soft group"
                    >
                      Réserver ce soin
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </motion.div>
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
            Au cabinet à Lacanau Océan (7 rue Jean Michel) ou à domicile sur Lacanau, Le Porge et Carcans. 
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
