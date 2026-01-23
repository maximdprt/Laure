import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Check, Sparkles, Star } from 'lucide-react'
import { massagesSportifs, soinsEnergetiques, PREMIUM_OPTION_PRICE } from '../constants/services'

const benefits = [
  'Améliorer la récupération musculaire',
  'Soulager les tensions profondes',
  'Prévenir les blessures liées à l\'effort',
  'Optimiser la mobilité et la souplesse',
  'Favoriser un état de bien-être durable',
  'Accompagner la préparation et la performance',
  'Offrir un véritable moment de lâcher-prise',
  'Harmonisation de l\'aura et de l\'énergie'
]

const MassageSportif = () => (
  <div className="min-h-screen pt-24">
    {/* Header */}
    <section className="bg-sage text-cream py-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl mb-4">
            Massages <span className="text-gold">Aura</span> Performance
          </h1>
          <p className="text-cream/80 text-lg font-body max-w-2xl mx-auto">
            Massage sportif premium & soins énergétiques à Lacanau Océan.
            Offrez à votre corps l'exigence qu'il mérite.
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
              Le massage sportif <span className="text-gold">premium</span>
            </h2>
            <div className="space-y-4 text-dark/70 font-body">
              <p>
                Le massage sportif à Lacanau Océan s'adresse à toutes les personnes actives 
                souhaitant prendre soin de leur corps, sans nécessité d'être un sportif de haut niveau.
              </p>
              <p>
                Inspirés par les exigences des pratiques outdoor, les soins visent à améliorer 
                la récupération musculaire, soulager les tensions profondes, prévenir les blessures 
                et optimiser la mobilité.
              </p>
              <p>
                Ces soins sont particulièrement appréciés par les <strong className="text-sage">surfeurs, 
                golfeurs, cyclistes, coureurs</strong> et passionnés d'activités outdoor.
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

    {/* Bénéfices */}
    <section className="section-padding bg-sand">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-semibold text-3xl text-dark mb-4">
            Les <span className="text-gold">bénéfices</span> du massage sportif
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 bg-white rounded-xl"
            >
              <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-dark/80 text-sm font-body">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Massages Sportifs */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {massagesSportifs.map((massage, i) => (
            <motion.div
              key={massage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card p-6 relative ${massage.popular ? 'ring-2 ring-gold' : ''}`}
            >
              {massage.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-dark text-xs font-body font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Populaire
                  </span>
                </div>
              )}
              <div className="text-center mb-4">
                <h3 className="font-heading font-semibold text-lg text-dark">{massage.name}</h3>
                <p className="text-sage text-sm font-body">{massage.subtitle}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-dark/60 text-sm mb-4">
                <Clock className="w-4 h-4" />
                <span>{massage.duration} min</span>
              </div>
              <div className="text-center mb-4">
                <span className="font-heading font-semibold text-3xl text-gold">{massage.price}€</span>
              </div>
              <p className="text-dark/70 text-sm text-center font-body">{massage.description}</p>
              <Link
                to={`/reservation?soin=${massage.id}`}
                className="mt-6 block w-full text-center py-2 rounded-lg bg-sage text-cream font-body font-medium hover:bg-sage-dark transition-colors"
              >
                Réserver
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

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
            Prêt à prendre soin de vous ?
          </h2>
          <p className="text-cream/80 max-w-2xl mx-auto mb-8 font-body">
            Au cabinet à Lacanau Océan ou à domicile, chaque séance est un moment privilégié.
          </p>
          <Link to="/reservation" className="btn-primary text-lg px-10 py-4">
            Réserver maintenant
          </Link>
        </motion.div>
      </div>
    </section>
  </div>
)

export default MassageSportif
