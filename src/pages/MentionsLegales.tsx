import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Scale, Building2, Globe, Shield, Mail, Phone, MapPin } from 'lucide-react'

const MentionsLegales = () => {
  return (
    <div className="min-h-screen pt-24 bg-cream">
      {/* Header */}
      <section className="bg-sage text-cream py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4">
              Mentions <span className="text-gold">Légales</span>
            </h1>
            <p className="text-cream/80 font-body">
              Informations légales concernant le site Aura Massage Lacanau
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Éditeur du site */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Éditeur du site</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  <strong className="text-dark">Raison sociale :</strong> Aura Massage - Laure Dupuch
                </p>
                <p>
                  <strong className="text-dark">Statut :</strong> Entreprise individuelle / Auto-entrepreneur
                </p>
                <p>
                  <strong className="text-dark">Activité :</strong> Massage bien-être et soins énergétiques
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-dark">Adresse :</strong><br />
                    HEAL LO LACANAU<br />
                    7 rue Jean Michel<br />
                    33680 LACANAU, France
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gold" />
                  <span><strong className="text-dark">Téléphone :</strong> 07 59 70 19 41</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold" />
                  <span><strong className="text-dark">Email :</strong> massage.auraperformance@gmail.com</span>
                </p>
                <p>
                  <strong className="text-dark">Responsable de la publication :</strong> Laure Dupuch
                </p>
              </div>
            </motion.div>

            {/* Hébergement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Hébergement</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Le site aura-massage-lacanau.fr est hébergé par :
                </p>
                <p>
                  <strong className="text-dark">Vercel Inc.</strong><br />
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789, États-Unis<br />
                  Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">vercel.com</a>
                </p>
              </div>
            </motion.div>

            {/* Propriété intellectuelle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Propriété intellectuelle</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) 
                  est la propriété exclusive de Laure Dupuch / Aura Massage, sauf mention contraire.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                  des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, 
                  sauf autorisation écrite préalable de Laure Dupuch.
                </p>
                <p>
                  Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient 
                  sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux 
                  dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                </p>
              </div>
            </motion.div>

            {/* Protection des données */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Protection des données personnelles</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
                  « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez des droits suivants 
                  concernant vos données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement (droit à l'oubli)</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d'opposition</li>
                </ul>
                <p>
                  Pour exercer ces droits, vous pouvez nous contacter par email à : 
                  <a href="mailto:massage.auraperformance@gmail.com" className="text-gold hover:underline ml-1">
                    massage.auraperformance@gmail.com
                  </a>
                </p>
                <p>
                  Pour plus d'informations sur le traitement de vos données, consultez notre{' '}
                  <Link to="/politique-confidentialite" className="text-gold hover:underline">
                    Politique de Confidentialité
                  </Link>.
                </p>
              </div>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-heading font-bold text-2xl text-dark">Cookies</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Le site aura-massage-lacanau.fr peut utiliser des cookies pour améliorer l'expérience 
                  utilisateur et à des fins statistiques. Ces cookies ne collectent pas de données 
                  personnelles identifiables.
                </p>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté 
                  lorsqu'un cookie est envoyé.
                </p>
              </div>
            </motion.div>

            {/* Limitation de responsabilité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-heading font-bold text-2xl text-dark">Limitation de responsabilité</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et le site 
                  est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, 
                  des omissions ou des lacunes.
                </p>
                <p>
                  Aura Massage ne pourra être tenu responsable des dommages directs et indirects 
                  causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit 
                  de l'utilisation d'un matériel ne répondant pas aux spécifications techniques 
                  requises, soit de l'apparition d'un bug ou d'une incompatibilité.
                </p>
              </div>
            </motion.div>

            {/* Droit applicable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-heading font-bold text-2xl text-dark">Droit applicable</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Les présentes mentions légales sont soumises au droit français. En cas de litige, 
                  les tribunaux français seront seuls compétents.
                </p>
                <p className="text-dark/50 text-sm mt-6">
                  Dernière mise à jour : Janvier 2026
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default MentionsLegales
