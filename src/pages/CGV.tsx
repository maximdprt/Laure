import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, CreditCard, Calendar, XCircle, AlertTriangle, CheckCircle } from 'lucide-react'

const CGV = () => {
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
              Conditions Générales <span className="text-gold">de Vente</span>
            </h1>
            <p className="text-cream/80 font-body">
              Conditions applicables aux prestations de massage Aura Massage Lacanau
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Objet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Article 1 - Objet</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
                  entre Laure Dupuch, exerçant sous le nom commercial "Aura Massage", et ses clients, 
                  pour toute prestation de massage bien-être et soins énergétiques.
                </p>
                <p>
                  Toute réservation implique l'acceptation sans réserve des présentes CGV.
                </p>
              </div>
            </motion.div>

            {/* Prestations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Article 2 - Prestations</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Aura Massage propose des prestations de massage bien-être à visée non thérapeutique :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Massages sportifs (préparation et récupération)</li>
                  <li>Massages relaxants aux huiles</li>
                  <li>Soins énergétiques</li>
                  <li>Chromothérapie</li>
                </ul>
                <p className="mt-4 p-4 bg-gold/10 rounded-lg border-l-4 border-gold">
                  <strong className="text-dark">Important :</strong> Les massages proposés sont des massages 
                  de bien-être et ne se substituent en aucun cas à un traitement médical. Il est conseillé 
                  de consulter un médecin en cas de problème de santé.
                </p>
              </div>
            </motion.div>

            {/* Réservation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Article 3 - Réservation</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Les réservations peuvent être effectuées :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Par téléphone au 07 59 70 19 41</li>
                  <li>Par email à contact.nlight@gmail.com</li>
                  <li>Via le formulaire de réservation en ligne sur le site</li>
                </ul>
                <p>
                  <strong className="text-dark">Acompte :</strong> Un acompte de 30% du montant de la prestation 
                  peut être demandé pour confirmer la réservation. Cet acompte sera déduit du montant total 
                  lors du règlement.
                </p>
                <p>
                  La réservation n'est définitive qu'après confirmation par Aura Massage (par email, 
                  SMS ou téléphone).
                </p>
              </div>
            </motion.div>

            {/* Tarifs et paiement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Article 4 - Tarifs et paiement</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Les tarifs sont indiqués en euros TTC sur le site internet et peuvent être modifiés 
                  à tout moment. Les tarifs applicables sont ceux en vigueur au moment de la réservation.
                </p>
                <p>
                  <strong className="text-dark">Moyens de paiement acceptés :</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Espèces</li>
                  <li>Carte bancaire</li>
                  <li>Virement bancaire</li>
                </ul>
                <p>
                  Le paiement est exigible à la fin de la prestation, sauf en cas de règlement anticipé 
                  de l'acompte.
                </p>
                <p>
                  <strong className="text-dark">Déplacement à domicile :</strong> Des frais de déplacement 
                  peuvent s'appliquer pour les interventions à domicile en dehors de Lacanau. Ces frais 
                  seront communiqués lors de la réservation.
                </p>
              </div>
            </motion.div>

            {/* Annulation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Article 5 - Annulation et report</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p><strong className="text-dark">Par le client :</strong></p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Annulation plus de 48h avant le rendez-vous : remboursement intégral de l'acompte 
                    ou report sans frais</li>
                  <li>Annulation entre 24h et 48h avant : l'acompte est conservé mais peut être utilisé 
                    pour un report</li>
                  <li>Annulation moins de 24h avant ou absence : l'acompte reste acquis et 50% de la 
                    prestation pourra être facturé</li>
                </ul>
                <p className="mt-4"><strong className="text-dark">Par Aura Massage :</strong></p>
                <p>
                  En cas d'annulation par Aura Massage (maladie, force majeure), le client sera prévenu 
                  dans les meilleurs délais et l'acompte sera intégralement remboursé ou un nouveau 
                  rendez-vous sera proposé.
                </p>
              </div>
            </motion.div>

            {/* Contre-indications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Article 6 - Contre-indications</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Le client s'engage à informer Aura Massage de tout problème de santé pouvant 
                  constituer une contre-indication au massage :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Fièvre, infection</li>
                  <li>Problèmes cardiaques graves</li>
                  <li>Phlébite, thrombose</li>
                  <li>Cancer en phase active</li>
                  <li>Grossesse (premier trimestre notamment)</li>
                  <li>Fracture récente, blessure ouverte</li>
                  <li>Allergie cutanée</li>
                </ul>
                <p>
                  Aura Massage se réserve le droit de refuser une prestation si les conditions de 
                  sécurité ne sont pas réunies, sans que cela ne puisse donner lieu à un quelconque 
                  dédommagement.
                </p>
              </div>
            </motion.div>

            {/* Responsabilité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-heading font-bold text-2xl text-dark">Article 7 - Responsabilité</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Aura Massage s'engage à apporter tout le soin et le professionnalisme nécessaires 
                  à la réalisation des prestations.
                </p>
                <p>
                  La responsabilité d'Aura Massage ne saurait être engagée en cas de :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Dissimulation par le client d'informations médicales importantes</li>
                  <li>Non-respect par le client des recommandations données</li>
                  <li>Force majeure</li>
                </ul>
              </div>
            </motion.div>

            {/* Litiges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-heading font-bold text-2xl text-dark">Article 8 - Litiges</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  En cas de litige, une solution amiable sera recherchée en priorité. À défaut, 
                  les tribunaux compétents seront ceux du ressort du siège social d'Aura Massage.
                </p>
                <p>
                  Conformément à l'article L.612-1 du Code de la consommation, le client peut 
                  recourir gratuitement au service de médiation MEDICYS dont nous relevons.
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

export default CGV
