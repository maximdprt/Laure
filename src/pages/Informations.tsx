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
      <section className="py-8 border-b border-sand">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-dark/50 font-body text-sm uppercase tracking-wider mb-4">Sommaire</p>
            <nav className="flex flex-wrap gap-3">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sand text-dark/70 font-body text-sm hover:border-sage hover:text-sage hover:bg-sage/5 transition-all"
                >
                  <span className="text-gold font-heading font-semibold">0{i + 1}</span>
                  {s.label}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-0">
            
            {/* 01 — Massage à domicile */}
            <motion.article
              id="domicile"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative py-16 border-b border-sand last:border-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-8">
                <div className="flex-shrink-0">
                  <span className="inline-block font-heading font-bold text-5xl text-gold/30 leading-none">01</span>
                  <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center mt-4">
                    <Home className="w-7 h-7 text-sage" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-3">
                    Faites-vous des massages à domicile ?
                  </h2>
                  <p className="text-sage font-body text-sm mb-6">Intervention à votre lieu de séjour</p>
                  <div className="space-y-5 text-dark/80 font-body leading-relaxed text-lg">
                    <p>
                      <strong className="text-dark">Oui</strong>, nous intervenons à domicile sur tout{' '}
                      <strong className="text-sage">Lacanau, Lacanau Océan, Le Porge et Carcans</strong>.
                    </p>
                    <p>
                      Le massage à domicile vous offre <strong className="text-dark">relaxation et confort</strong>, 
                      sans avoir à vous déplacer. Idéal en vacances ou pour un moment de bien-être chez vous.
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* 02 — Chromothérapie */}
            <motion.article
              id="chromo"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative py-16 border-b border-sand last:border-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-8">
                <div className="flex-shrink-0">
                  <span className="inline-block font-heading font-bold text-5xl text-gold/30 leading-none">02</span>
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mt-4">
                    <Palette className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-3">
                    Chromothérapie premium & soins sur-mesure
                  </h2>
                  <p className="text-gold font-body text-sm mb-6">Produits et protocoles d'exception</p>
                  <div className="relative pl-6 border-l-2 border-gold/40">
                    <p className="text-dark/85 font-body leading-relaxed text-lg italic">
                      Découvrez des <strong className="text-dark not-italic">massages uniques à Lacanau Océan</strong>, 
                      élaborés à partir de protocoles exclusifs développés au fil des années. Chaque soin associe 
                      la puissance apaisante de la <strong className="text-sage not-italic">chromothérapie</strong> à des 
                      techniques de massage personnalisées, pour détendre, revitaliser et équilibrer le corps et 
                      l'esprit directement là où vous séjournez.
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* 03 — Surfers */}
            <motion.article
              id="surfers"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative py-16"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-8">
                <div className="flex-shrink-0">
                  <span className="inline-block font-heading font-bold text-5xl text-gold/30 leading-none">03</span>
                  <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center mt-4">
                    <Waves className="w-7 h-7 text-sage" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-3">
                    Le massage est-il adapté aux surfers ?
                  </h2>
                  <p className="text-sage font-body text-sm mb-6">Sportifs nautiques & glisse</p>
                  <div className="rounded-2xl bg-sage/10 border border-sage/20 p-8">
                    <p className="text-dark/90 font-body leading-relaxed text-lg font-medium mb-4">
                      <strong className="text-sage">Absolument !</strong> Le massage sportif à Lacanau Océan est 
                      spécialement conçu pour les pratiquants de sports nautiques et de glisse. Il contribue à 
                      prévenir les blessures, soulager les tensions musculaires et favoriser une récupération 
                      optimale après vos sessions de surf.
                    </p>
                    <p className="text-dark/80 font-body leading-relaxed text-lg">
                      Idéal avant ou après l'effort, il aide à améliorer la performance, la souplesse et le 
                      bien-être général.
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* CTA final */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 pt-16 border-t border-sand"
            >
              <div className="text-center">
                <p className="text-dark/60 font-body mb-6">Prêt à réserver votre soin ?</p>
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
