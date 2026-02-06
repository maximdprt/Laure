import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Palette, Waves, ChevronRight } from 'lucide-react'

const Informations = () => {
  const sections = [
    { id: 'domicile', label: 'Massage à domicile', icon: Home },
    { id: 'chromo', label: 'Chromothérapie premium', icon: Palette },
    { id: 'surfers', label: 'Surfers & sportifs', icon: Waves },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sage via-sage to-sage-dark text-cream py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-cream blur-3xl" />
        </div>
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gold/90 hover:text-gold transition-colors mb-8 font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight">
              Informations<br />
              <span className="text-gold">& FAQ</span>
            </h1>
            <p className="text-cream/80 font-body text-lg max-w-xl">
              Massage à domicile, chromothérapie et massages pour les sportifs à Lacanau Océan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sommaire / ancres */}
      <section className="py-10 border-b border-sand/60 bg-cream/60">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <p className="text-dark/50 font-body text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
              Parcours rapide
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sections.map((s, i) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-soft border border-sand/60 px-5 py-4 flex items-center gap-4 hover:border-sage hover:shadow-soft-lg transition-all"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-sage/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-sage" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-xs text-dark/40 tracking-[0.18em] mb-1">
                        0{i + 1}
                      </p>
                      <p className="font-body text-sm text-dark/80 leading-snug">{s.label}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gold opacity-60 group-hover:translate-x-0.5 transition-transform" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-14 lg:space-y-16">
            {/* 01 — Massage à domicile */}
            <motion.article
              id="domicile"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-soft border border-sand/70">
                <div className="absolute -top-14 -right-14 w-40 h-40 bg-sage/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-gold/5 rounded-full blur-3xl" />
                <div className="relative p-7 sm:p-9 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-10">
                  <div className="flex flex-col items-start gap-4">
                    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-body uppercase tracking-[0.18em]">
                      <span className="font-heading text-[11px] text-gold">01</span>
                      Massage à domicile
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center">
                      <Home className="w-7 h-7 text-sage" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark">
                      Faites-vous des massages à domicile ?
                    </h2>
                    <p className="text-sage font-body text-sm uppercase tracking-[0.16em]">
                      Intervention à votre lieu de séjour
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] gap-6 md:gap-8 mt-4">
                      <div className="space-y-4 text-dark/80 font-body leading-relaxed text-base sm:text-lg">
                        <p>
                          <strong className="text-dark">Oui</strong>, nous intervenons à domicile sur tout{' '}
                          <strong className="text-sage">Lacanau, Lacanau Océan, Le Porge et Carcans</strong>.
                        </p>
                        <p>
                          Le massage à domicile vous offre <strong className="text-dark">relaxation et confort</strong>, 
                          sans avoir à vous déplacer. Idéal en vacances ou pour un moment de bien-être chez vous.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-sage/5 border border-sage/20 p-4 sm:p-5 space-y-2">
                        <p className="font-heading text-sm text-dark/70 tracking-wide uppercase">
                          En résumé
                        </p>
                        <ul className="space-y-1.5 text-sm font-body text-dark/80">
                          <li>• Déplacement sur votre lieu de séjour</li>
                          <li>• Idéal après le surf ou une journée active</li>
                          <li>• Tout le confort d&apos;un massage au cabinet, chez vous</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* 02 — Chromothérapie */}
            <motion.article
              id="chromo"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cream via-white to-cream shadow-soft border border-gold/30">
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gold/30 blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-sage/20 blur-3xl" />
                </div>
                <div className="relative p-7 sm:p-9 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-10">
                  <div className="flex flex-col items-start gap-4">
                    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-body uppercase tracking-[0.18em]">
                      <span className="font-heading text-[11px] text-gold/80">02</span>
                      Chromothérapie premium
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center">
                      <Palette className="w-7 h-7 text-gold" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-4">
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark">
                      Chromothérapie premium & soins sur-mesure
                    </h2>
                    <p className="text-gold font-body text-sm uppercase tracking-[0.16em]">
                      Produits et protocoles d&apos;exception
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.8fr)] gap-6 md:gap-8 mt-4">
                      <div className="relative pl-4 sm:pl-6 border-l-2 border-gold/40">
                        <p className="text-dark/85 font-body leading-relaxed text-base sm:text-lg italic">
                          Découvrez des{' '}
                          <strong className="text-dark not-italic">
                            massages uniques à Lacanau Océan
                          </strong>
                          , élaborés à partir de protocoles exclusifs développés au fil des années.
                          Chaque soin associe la puissance apaisante de la{' '}
                          <strong className="text-sage not-italic">chromothérapie</strong> à des techniques
                          de massage personnalisées, pour détendre, revitaliser et équilibrer le corps et
                          l&apos;esprit.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/70 border border-gold/30 p-4 sm:p-5 space-y-3">
                        <p className="font-heading text-sm text-dark/70 tracking-wide uppercase">
                          Pour qui ?
                        </p>
                        <ul className="space-y-1.5 text-sm font-body text-dark/80">
                          <li>• Besoin de récupération profonde et de lâcher-prise</li>
                          <li>• Périodes de stress, de fatigue ou de surmenage</li>
                          <li>• Envie d&apos;un soin énergétique complet, au-delà du physique</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* 03 — Surfers */}
            <motion.article
              id="surfers"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-sage/5 shadow-soft border border-sage/30">
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute -top-20 right-0 w-64 h-64 rounded-full bg-sage/20 blur-3xl" />
                </div>
                <div className="relative p-7 sm:p-9 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-10">
                  <div className="flex flex-col items-start gap-4">
                    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-sage/15 text-sage text-xs font-body uppercase tracking-[0.18em]">
                      <span className="font-heading text-[11px] text-gold/80">03</span>
                      Surfers & sportifs
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center">
                      <Waves className="w-7 h-7 text-sage" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-4">
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark">
                      Le massage est-il adapté aux surfers ?
                    </h2>
                    <p className="text-sage font-body text-sm uppercase tracking-[0.16em]">
                      Sportifs nautiques & glisse
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="rounded-2xl bg-white/70 border border-sage/30 p-5 space-y-3">
                        <p className="text-dark/90 font-body leading-relaxed text-base sm:text-lg font-medium">
                          <strong className="text-sage">Absolument !</strong> Le massage sportif à Lacanau
                          Océan est spécialement conçu pour les pratiquants de sports nautiques et de glisse.
                        </p>
                        <ul className="space-y-1.5 text-sm font-body text-dark/80">
                          <li>• Prévenir les blessures liées aux chocs et aux répétitions</li>
                          <li>• Soulager les tensions du dos, des épaules et des jambes</li>
                          <li>• Favoriser une récupération optimale entre deux sessions</li>
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-sage/10 border border-sage/30 p-5 space-y-3">
                        <p className="font-heading text-sm text-dark/80 tracking-wide uppercase">
                          Bénéfices pour votre surf
                        </p>
                        <p className="text-dark/80 font-body text-sm leading-relaxed">
                          Idéal avant ou après l&apos;effort, le massage sportif aide à améliorer la
                          performance, la souplesse et le bien-être général. Vous récupérez plus vite,
                          restez plus détendu et profitez davantage de chaque vague.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* CTA final */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-6 lg:pt-10"
            >
              <div className="text-center">
                <p className="text-dark/60 font-body mb-4">
                  Une question supplémentaire sur les massages ou les soins ?
                </p>
                <Link
                  to="/reservation"
                  className="inline-flex items-center gap-3 bg-sage text-cream font-body font-bold px-10 py-4 rounded-full hover:bg-sage-dark transition-all shadow-soft hover:shadow-lg hover:scale-[1.02]"
                >
                  Réserver un soin
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Informations
