import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, Heart, Waves, Star } from 'lucide-react'

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

            {/* CTA Buttons - Fond sage avec texte or pour visibilité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/reservation"
                className="group bg-sage text-gold border-2 border-gold font-body font-bold text-lg px-10 py-4 rounded-full 
                         shadow-soft hover:bg-sage-dark hover:scale-105 transition-all duration-300
                         flex items-center gap-2"
              >
                <Star className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform" />
                Réserver un soin
              </Link>
              <Link
                to="/massage-sportif"
                className="border-2 border-gold text-gold font-body font-semibold text-lg px-10 py-4 
                         rounded-full hover:bg-gold hover:text-dark hover:scale-105 transition-all duration-300"
              >
                Découvrir les soins
              </Link>
            </motion.div>
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

      {/* Services Overview */}
      <section className="section-padding bg-sage">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-gold/20 text-gold text-sm font-body font-medium rounded-full mb-4">
              Nos soins
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-cream mb-4">
              Mes <span className="text-gold">spécialités</span>
            </h2>
            <p className="text-cream/70 max-w-2xl mx-auto font-body">
              Des soins d'exception inspirés par la puissance de l'océan et la sagesse des traditions ancestrales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Waves,
                title: 'Massages Sportifs',
                description: 'Préparation, récupération et performance. Des techniques adaptées aux sportifs et personnes actives.',
                color: 'gold'
              },
              {
                icon: Sparkles,
                title: 'Soins Énergétiques',
                description: 'Rééquilibrage, harmonisation et élévation. Une approche subtile pour votre bien-être profond.',
                color: 'sand'
              },
              {
                icon: Heart,
                title: 'Chromothérapie',
                description: 'Le pouvoir des couleurs au service de votre équilibre. Huiles Aura-Soma et élixirs floraux.',
                color: 'cream'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark/20 backdrop-blur-sm rounded-2xl p-8 text-center group hover:bg-dark/30 transition-all duration-300 border border-cream/10"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${service.color}/20 
                              flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-8 h-8 text-${service.color}`} />
                </div>
                <h3 className="font-heading font-bold text-xl text-cream mb-3">
                  {service.title}
                </h3>
                <p className="text-cream/70 font-body text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/massage-sportif" className="inline-flex items-center gap-2 bg-dark text-gold border-2 border-gold font-body font-bold px-8 py-4 rounded-full hover:bg-sage-dark transition-all duration-300">
              Découvrir tous les soins
            </Link>
          </motion.div>
        </div>
      </section>

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
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Me contacter
                </Link>
                <Link to="/reservation" className="btn-secondary">
                  Prendre rendez-vous
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

      {/* CTA Section */}
      <section className="section-padding bg-gold">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-4">
              Offrez à votre corps l'exigence qu'il mérite
            </h2>
            <p className="text-dark/80 mb-8 font-body text-lg">
              Une signature bien-être haut de gamme. Réservez votre soin et découvrez 
              une approche unique du massage sportif et de l'énergie.
            </p>
            <Link to="/reservation" className="inline-flex items-center gap-2 bg-sage text-gold border-2 border-gold font-body font-bold text-lg px-10 py-4 rounded-full hover:bg-sage-dark transition-all duration-300 shadow-soft">
              <Star className="w-5 h-5 text-gold" />
              Réserver maintenant
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
