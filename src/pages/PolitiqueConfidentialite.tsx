import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Database, Eye, Lock, UserCheck, Bell } from 'lucide-react'

const PolitiqueConfidentialite = () => {
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
              Politique de <span className="text-gold">Confidentialité</span>
            </h1>
            <p className="text-cream/80 font-body">
              Comment nous protégeons vos données personnelles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
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
                <h2 className="font-heading font-bold text-2xl text-dark">Introduction</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Aura Massage, représenté par Laure Dupuch, s'engage à protéger la vie privée des 
                  utilisateurs de son site internet aura-massage-lacanau.fr et de ses clients.
                </p>
                <p>
                  Cette politique de confidentialité explique comment nous collectons, utilisons, 
                  stockons et protégeons vos informations personnelles conformément au Règlement 
                  Général sur la Protection des Données (RGPD).
                </p>
              </div>
            </motion.div>

            {/* Données collectées */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Données collectées</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>Nous pouvons collecter les informations suivantes :</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong className="text-dark">Données d'identification :</strong> nom, prénom</li>
                  <li><strong className="text-dark">Coordonnées :</strong> adresse email, numéro de téléphone</li>
                  <li><strong className="text-dark">Données de réservation :</strong> date, heure, type de soin choisi</li>
                  <li><strong className="text-dark">Données de santé :</strong> informations relatives à votre état de santé 
                    communiquées lors de la prise de rendez-vous (contre-indications éventuelles)</li>
                  <li><strong className="text-dark">Données de navigation :</strong> adresse IP, type de navigateur, 
                    pages visitées (via cookies)</li>
                </ul>
              </div>
            </motion.div>

            {/* Finalités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Utilisation des données</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>Vos données personnelles sont utilisées pour :</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Gérer vos réservations et rendez-vous</li>
                  <li>Vous contacter concernant vos rendez-vous (confirmation, rappel, modification)</li>
                  <li>Personnaliser votre expérience et adapter les soins à vos besoins</li>
                  <li>Répondre à vos demandes de contact</li>
                  <li>Améliorer notre site web et nos services</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                </ul>
              </div>
            </motion.div>

            {/* Conservation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Conservation et sécurité</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  <strong className="text-dark">Durée de conservation :</strong> Vos données personnelles sont 
                  conservées pendant une durée de 3 ans à compter de votre dernier contact avec nous, 
                  sauf obligation légale de conservation plus longue.
                </p>
                <p>
                  <strong className="text-dark">Sécurité :</strong> Nous mettons en œuvre des mesures techniques 
                  et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, 
                  modification, divulgation ou destruction.
                </p>
                <p>
                  Vos données ne sont jamais vendues à des tiers et ne sont partagées qu'avec les 
                  prestataires techniques nécessaires au fonctionnement du site (hébergeur).
                </p>
              </div>
            </motion.div>

            {/* Vos droits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Vos droits</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong className="text-dark">Droit d'accès :</strong> obtenir la confirmation que vos données 
                    sont traitées et accéder à celles-ci</li>
                  <li><strong className="text-dark">Droit de rectification :</strong> demander la correction de 
                    données inexactes</li>
                  <li><strong className="text-dark">Droit à l'effacement :</strong> demander la suppression de vos données</li>
                  <li><strong className="text-dark">Droit à la limitation :</strong> demander la limitation du 
                    traitement de vos données</li>
                  <li><strong className="text-dark">Droit à la portabilité :</strong> recevoir vos données dans un 
                    format structuré</li>
                  <li><strong className="text-dark">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à : 
                  <a href="mailto:contact.nlight@gmail.com" className="text-gold hover:underline ml-1">
                    contact.nlight@gmail.com
                  </a>
                </p>
                <p>
                  Vous avez également le droit d'introduire une réclamation auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés) : 
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline ml-1">
                    www.cnil.fr
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Modifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-sage" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-dark">Modifications</h2>
              </div>
              <div className="space-y-4 text-dark/70 font-body">
                <p>
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                  Les modifications seront publiées sur cette page avec une date de mise à jour.
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

export default PolitiqueConfidentialite
