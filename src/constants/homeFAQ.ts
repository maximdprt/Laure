/** FAQ page d'accueil — réponses courtes (GEO / recherche vocale) + détail. */

export type HomeFaqItem = {
  question: string
  /** Réponse en une phrase, affichée tout le temps (featured snippet / voix). */
  directAnswer: string
  /** Détail complémentaire (accordéon). */
  answer: string
}

export const HOME_FAQ_ITEMS: HomeFaqItem[] = [
  {
    question: 'Où trouver un bon massage à Lacanau ?',
    directAnswer:
      'Aura Massage — Massage Aura Performance — accueille au 7 rue Jean Michel, centre HEAL LO LACANAU à Lacanau Océan, à environ 800 m de la plage ; massage à domicile possible sur Lacanau et alentours.',
    answer:
      'Nous proposons des massages sportifs, bien-être et chromothérapie. Le cabinet est facilement accessible depuis la station ; pour un massage à domicile, nous nous déplaçons sur tout Lacanau et ses environs selon disponibilités.'
  },
  {
    question: 'Quels types de massage proposez-vous à Lacanau Océan ?',
    directAnswer:
      'Massages sportifs (préparation et récupération), massages relaxants aux huiles, soins énergétiques et chromothérapie, adaptés notamment aux surfeurs et sportifs.',
    answer:
      'Chaque prestation est expliquée sur la page Nos Massages : durées, tarifs et objectifs (performance, récupération, détente). Nous adaptons le soin à votre activité et à votre ressenti du moment.'
  },
  {
    question: "Quel est le prix d'un massage à Lacanau ?",
    directAnswer:
      'Les séances démarrent à 45 € pour 30 minutes (formules activation ou récupération), 85 € pour un massage sportif 60 minutes, 130 € pour une formule premium 90 minutes ; soins énergétiques à partir de 90 €.',
    answer:
      'Les tarifs à jour figurent sur la page Nos Massages et à l’étape réservation. Un acompte peut être demandé en ligne pour confirmer le créneau.'
  },
  {
    question: 'Faites-vous des massages à domicile à Lacanau ?',
    directAnswer:
      'Oui : interventions à domicile sur Lacanau, Lacanau Océan, Le Porge et Carcans, dans le respect du cadre bien-être (non médical).',
    answer:
      'Le massage à domicile convient aux vacanciers et résidents qui préfèrent rester chez eux. Indiquez votre adresse et vos contraintes (étage, stationnement) lors de la réservation.'
  },
  {
    question: 'Le massage sportif à Lacanau est-il adapté aux surfeurs ?',
    directAnswer:
      'Oui : le massage sportif vise la préparation et la récupération musculaire — utile après le surf, le vélo ou toute activité intense à Lacanau.',
    answer:
      'Les techniques utilisées visent à relâcher les tensions, favoriser la récupération et accompagner la préparation à l’effort. Ce n’est pas un acte médical ni kinésithérapique.'
  },
  {
    question: 'Comment prendre rendez-vous pour un massage à Lacanau ?',
    directAnswer:
      'Réservez en ligne sur ce site, par téléphone au 07 59 70 19 41 ou par email ; en été, anticipez car les créneaux partent vite.',
    answer:
      'Choisissez le soin, le lieu (cabinet ou domicile), puis une date et un horaire disponibles. Vous recevrez une confirmation selon le processus indiqué à la réservation.'
  }
]
