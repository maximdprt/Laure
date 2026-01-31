# Guide SEO – Massage Aura Performance / Lacanau

Ce document regroupe les bonnes pratiques SEO **sans modifier le contenu ni le design du site**. À utiliser en checklist et pour la Search Console.

---

## 1. L’optimisation technique (la fondation)

### Vitesse de chargement
- **PageSpeed Insights** : [https://pagespeed.web.dev/](https://pagespeed.web.dev/)  
  Tester l’URL en production (ex. `https://aura-massage-lacanau.fr/`) en **Mobile** et **Desktop**.
- Objectif : score > 90 en performance, bon Core Web Vitals (LCP, FID, CLS).
- Si le site est lent : optimiser images (compression, formats WebP), réduire le JS/CSS non critique, utiliser le lazy-loading déjà en place.

### Indexabilité
- **Sitemap** : `sitemap.xml` est disponible à  
  `https://aura-massage-lacanau.fr/sitemap.xml`
- **Google Search Console** :  
  1. [Search Console](https://search.google.com/search-console) → Ajouter la propriété (URL : `https://aura-massage-lacanau.fr`).  
  2. Vérifier la propriété (balise HTML ou fichier).  
  3. **Soumettre le sitemap** : Sitemaps → Ajouter un sitemap → `https://aura-massage-lacanau.fr/sitemap.xml`  
  4. Contrôler régulièrement « Couverture » et « Améliorations » pour détecter erreurs d’indexation.

### Mobile-First
- Google indexe en priorité la version mobile. Tester le site sur smartphone (Chrome DevTools → mode responsive).
- Vérifier : texte lisible sans zoom, boutons/liens assez grands, pas de contenu horizontal qui dépasse.

### HTTPS
- Vercel fournit HTTPS par défaut. Vérifier que l’URL finale du site est bien `https://aura-massage-lacanau.fr` (sans avertissement de certificat).

---

## 2. Contenu et stratégie E-E-A-T

*Expérience, Expertise, Autorité, Fiabilité – ce que Google privilégie.*

### Recherche de mots-clés
- Privilégier la **longue traîne** plutôt que des mots trop génériques.  
  Exemples :  
  - « massage sportif récupération surfeur lacanau »  
  - « massage à domicile lacanau océan »  
  - « chromothérapie massage lacanau »
- Outils utiles : Google Suggest, Google Search Console (requêtes), AnswerThePublic, Ubersuggest.

### Qualité > quantité
- Un contenu utile qui répond vraiment à une question (ex. FAQ, page Infos) vaut mieux que plusieurs pages vides ou dupliquées.
- Les textes actuels (présentation, massages, infos pratiques) servent déjà l’E-E-A-T.

### Structure HTML
- **Une seule balise `<h1>` par page**, puis des `<h2>`, `<h3>` logiques.
- À garder en tête pour toute future page : titres clairs et hiérarchie cohérente.

### Images
- **Compresser** les images (TinyPNG, Squoosh, ou build Vite/plugins).
- **Remplir systématiquement l’attribut `alt`** pour chaque image : description courte et pertinente (ex. « Laure Dupuch, praticienne massage à Lacanau »). Bon pour l’accessibilité et le SEO.

---

## 3. Popularité et maillage (le réseau)

### Netlinking (backlinks)
- Obtenir des **liens depuis des sites de qualité** (annuaires locaux, bien-être, tourisme Lacanau, blogs surf/sport).
- Thématique proche : massage, bien-être, Lacanau, Gironde, surf.
- Éviter les achats de liens ou les annuaires spam.

### Maillage interne
- Créer des **liens entre vos pages** (accueil → massage sportif → réservation → contact → informations).
- Le menu et le footer font déjà partie du maillage ; ajouter des liens contextuels dans les textes (ex. « Réserver une séance » vers `/reservation`) renforce la découverte des pages par Google et le temps passé sur le site.

### Signaux sociaux
- Partages sur Instagram, LinkedIn, etc. : ils n’impactent pas directement l’algorithme Google mais apportent **trafic et notoriété**, et peuvent indirectement générer des backlinks.

---

## 4. Expérience utilisateur (UX)

- Un **taux de rebond élevé** ou un **temps sur la page très court** peut faire baisser le positionnement. Une UX claire et rassurante aide au SEO.

### Lisibilité
- Police aérée, paragraphes courts, listes à puces là où c’est pertinent (déjà en place sur le site).

### Pas d’intrusions
- Éviter les **pop-ups agressives** qui masquent tout le contenu à l’arrivée (Google pénalise les interstitiels gênants sur mobile). Préférer des bannières discrètes ou en bas de page si besoin.

---

## Checklist rapide

| Action | Où / Comment |
|--------|----------------|
| Tester la vitesse | PageSpeed Insights sur l’URL en prod |
| Sitemap à jour | Déjà en place : `/sitemap.xml` |
| Soumettre le sitemap | Search Console → Sitemaps |
| Vérifier HTTPS | Ouvrir le site, cadenas vert |
| Tester mobile | DevTools ou smartphone |
| Mots-clés longue traîne | Search Console + outils de suggestions |
| Alt sur toutes les images | À vérifier dans le code / contenu |
| Backlinks qualité | Annuaires locaux, partenaires, presse |
| Liens internes | Menu + liens dans le contenu |
| Pas de pop-up agressive | Vérifier à l’arrivée sur le site |

---

*Ce guide reste une référence ; aucune modification du contenu ou du design du site n’a été faite pour le rédiger. Les fichiers ajoutés sont uniquement : `public/sitemap.xml`, `public/robots.txt`, et ce document `SEO-GUIDE.md`.*
