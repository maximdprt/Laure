import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Check, Sparkles, Star, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
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

const MassagesAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-semibold text-3xl text-dark mb-4">
            Massages <span className="text-gold">Sportifs</span>
          </h2>
          <p className="text-dark/60 font-body">Préparation & Récupération</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {massagesSportifs.map((massage, index) => (
            <motion.div
              key={massage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex items-center justify-between p-5 rounded-xl transition-all duration-300
                          ${openIndex === index 
                            ? 'bg-sage text-cream rounded-b-none' 
                            : 'bg-white hover:bg-sand shadow-soft'
                          }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-heading font-semibold text-lg ${openIndex === index ? 'text-gold' : 'text-dark'}`}>
                        {massage.name}
                      </h3>
                      {massage.popular && (
                        <span className="bg-gold text-dark text-xs font-body font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" /> Populaire
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-body ${openIndex === index ? 'text-cream/80' : 'text-sage'}`}>
                      {massage.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`font-heading font-bold text-2xl ${openIndex === index ? 'text-gold' : 'text-gold'}`}>
                      {massage.price}€
                    </span>
                    <p className={`text-xs font-body ${openIndex === index ? 'text-cream/70' : 'text-dark/50'}`}>
                      {massage.duration} min
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-6 h-6 ${openIndex === index ? 'text-gold' : 'text-sage'}`} />
                  </motion.div>
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white p-6 rounded-b-xl shadow-soft border-t-0">
                      <p className="text-dark/70 font-body mb-6 leading-relaxed">
                        {massage.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-dark/60">
                          <Clock className="w-5 h-5" />
                          <span className="font-body">{massage.duration} minutes</span>
                        </div>
                        <Link
                          to={`/reservation?soin=${massage.id}`}
                          className="inline-flex items-center gap-2 bg-sage text-cream font-body font-semibold 
                                   px-6 py-3 rounded-full hover:bg-sage-dark transition-all duration-300 shadow-soft"
                        >
                          Réserver
                        </Link>
                      </div>
                    </div>
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

    {/* Massages Sportifs - Accordion */}
    <MassagesAccordion />

    {/* Option Premium */}
    <section className="py-12 bg-gold">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <Sparkles className="w-10 h-10 text-dark" />
            <div>
              <h3 className="font-heading font-semibold text-xl text-dark">OCEAN CHROMOSPORT SIGNATURE</h3>
              <p className="text-dark/80 text-sm font-body">Option Premium disponible sur tous les massages</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="font-heading font-semibold text-2xl text-dark">+{PREMIUM_OPTION_PRICE}€</p>
            <p className="text-dark/70 text-xs font-body">Huile bio personnalisée aux élixirs floraux et chromothérapie</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Soins Énergétiques */}
    <section className="section-padding bg-sand">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-semibold text-3xl text-dark mb-4">
            Soins <span className="text-gold">Énergétiques</span>
          </h2>
          <p className="text-dark/60 font-body max-w-2xl mx-auto">
            Des soins d'exception pour harmoniser corps et esprit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {soinsEnergetiques.map((soin, i) => (
            <motion.div
              key={soin.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card p-8 ${soin.premium ? 'bg-gradient-to-br from-cream to-sand ring-2 ring-gold' : ''}`}
            >
              {soin.premium && (
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span className="text-gold text-sm font-body font-semibold">Soin Signature</span>
                </div>
              )}
              <h3 className="font-heading font-semibold text-2xl text-dark mb-2">{soin.name}</h3>
              <p className="text-sage font-body text-sm mb-4">{soin.subtitle}</p>
              {soin.tagline && <p className="text-gold font-heading italic mb-4">"{soin.tagline}"</p>}
              <p className="text-dark/70 font-body text-sm mb-6">{soin.description}</p>
              
              {soin.benefits && (
                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-dark mb-3">Bienfaits</h4>
                  <ul className="space-y-2">
                    {soin.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-dark/70 font-body">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-dark/10">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-dark/60" />
                  <span className="text-dark/60 text-sm font-body">{soin.duration} min</span>
                </div>
                <span className="font-heading font-semibold text-2xl text-gold">{soin.price}€</span>
              </div>
              <Link
                to={`/reservation?soin=${soin.id}`}
                className="mt-6 block w-full text-center py-3 rounded-lg bg-gold text-dark font-body font-semibold hover:bg-gold-dark transition-colors"
              >
                Réserver ce soin
              </Link>
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
