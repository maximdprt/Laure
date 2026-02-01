# Guide SEO – Massage Aura Performance / Lacanau

Ce document regroupe les bonnes pratiques SEO **sans modifier le contenu ni le design du site**. À utiliser en checklist et pour les outils webmaster (Google, Bing).

---

## 1. L’optimisation technique (la fondation)

### Vitesse de chargement (PageSpeed Insights)
- **Outil** : [PageSpeed Insights](https://pagespeed.web.dev/)  
- **URL à tester** : `https://aura-massage-lacanau.fr/` (en **Mobile** et **Desktop**).
- **Objectifs** :
  - Score Performance > 90
  - Core Web Vitals verts : **LCP** < 2,5 s, **INP** (ex-FID) < 200 ms, **CLS** < 0,1
- **Si le site est lent** (sans modifier le site vous-même) : optimiser les images en amont (compression, WebP), hébergement proche des utilisateurs (Vercel = CDN), lazy-loading déjà en place.

### Indexabilité : sitemap et Search Console
- **Sitemap** : à jour avec toutes les URLs publiques + `lastmod` + images (portrait, logo).  
  URL : `https://aura-massage-lacanau.fr/sitemap.xml`
- **robots.txt** : autorise l’indexation, exclut `/admin`, pointe vers le sitemap.  
  URL : `https://aura-massage-lacanau.fr/robots.txt`

#### Google Search Console – étapes précises
1. Aller sur [Google Search Console](https://search.google.com/search-console).
2. **Ajouter une propriété** : préfixe d’URL `https://aura-massage-lacanau.fr`.
3. **Vérification** (au choix) :
   - **Balise HTML** : ajouter une balise meta dans le `<head>` (là vous modifiez le site une fois pour la vérification, ou utilisez l’autre méthode).
   - **Fichier HTML** : télécharger le fichier fourni par Google et le placer à la racine du site (ex. `public/google123.html`) puis déployer.
   - **Google Analytics** : si déjà installé, lier le compte.
   - **Enregistrement DNS** : si vous gérez le domaine, ajouter l’enregistrement TXT proposé.
4. Une fois vérifié : **Sitemaps** → « Ajouter un sitemap » → saisir `sitemap.xml` (ou l’URL complète).
5. Vérifier régulièrement : **Couverture** (pages indexées / erreurs), **Améliorations** (mobile, Core Web Vitals), **Performances** (requêtes, clics, CTR).

#### Bing Webmaster Tools (optionnel mais utile)
1. [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Ajouter le site `https://aura-massage-lacanau.fr`.
3. Vérification : fichier XML ou balise meta (comme GSC).
4. Soumettre le même sitemap : `https://aura-massage-lacanau.fr/sitemap.xml`.

### Mobile-First
- Google indexe en priorité la version mobile. Tester sur smartphone ou Chrome DevTools (mode responsive).
- Vérifier : texte lisible sans zoom, boutons/liens assez grands, pas de défilement horizontal.

### HTTPS
- Vercel fournit HTTPS par défaut. S’assurer que l’URL finale est bien `https://aura-massage-lacanau.fr` (cadenas vert, pas d’avertissement).

---

## 2. Contenu et stratégie E-E-A-T

*Expérience, Expertise, Autorité, Fiabilité.*

### Recherche de mots-clés (longue traîne)
- Privilégier des requêtes précises plutôt que des mots trop génériques.  
  Exemples pour Lacanau :
  - « massage sportif récupération surfeur lacanau »
  - « massage à domicile lacanau océan »
  - « chromothérapie massage lacanau »
  - « massage après surf lacanau »
- **Outils** : Google Suggest, GSC (onglet Performances → requêtes), AnswerThePublic, Ubersuggest, Google Keyword Planner.

### Qualité > quantité
- Un contenu qui répond vraiment à une question (FAQ, page Infos) vaut mieux que plusieurs pages vides ou dupliquées.
- Les textes actuels (présentation, massages, infos) servent déjà l’E-E-A-T.

### Structure HTML
- **Une seule balise `<h1>` par page**, puis des `<h2>`, `<h3>` logiques.
- À garder en tête pour toute future page : titres clairs et hiérarchie cohérente.

### Images
- **Compresser** les images (TinyPNG, Squoosh, ou plugins de build).
- **Remplir l’attribut `alt`** pour chaque image : description courte et pertinente (ex. « Laure Dupuch, praticienne massage à Lacanau »). Bon pour l’accessibilité et le référencement des images (le sitemap inclut déjà des images clés avec titre/caption).

---

## 3. Popularité et maillage (le réseau)

### Netlinking (backlinks)
- Obtenir des **liens depuis des sites de qualité** : annuaires locaux (Lacanau, Gironde), bien-être, tourisme, blogs surf/sport.
- Thématique proche : massage, bien-être, Lacanau, Gironde, surf, récupération sportive.
- Éviter achats de liens et annuaires spam.

### Maillage interne
- Créer des **liens entre vos pages** : accueil → massage sportif → réservation → contact → informations.
- Menu et footer = maillage de base ; ajouter des liens contextuels dans les textes (ex. « Réserver une séance » vers `/reservation`) aide les robots et le temps passé sur le site.

### Signaux sociaux
- Partages Instagram, LinkedIn, etc. : pas de lien direct avec l’algorithme Google, mais **trafic et notoriété**, et possibilité de backlinks naturels.

---

## 4. Expérience utilisateur (UX)

- **Taux de rebond élevé** ou **temps sur la page très court** peut faire baisser le positionnement. Une UX claire et rassurante aide au SEO.

### Lisibilité
- Police aérée, paragraphes courts, listes à puces (déjà en place sur le site).

### Pas d’intrusions
- Éviter les **pop-ups agressives** qui masquent tout le contenu à l’arrivée (Google pénalise les interstitiels gênants sur mobile). Préférer des bannières discrètes ou en bas de page.

---

## Checklist rapide

| Action | Où / Comment |
|--------|----------------|
| Tester la vitesse | [PageSpeed Insights](https://pagespeed.web.dev/) sur l’URL en prod |
| Sitemap à jour | Déjà en place : `/sitemap.xml` (avec lastmod + images) |
| Soumettre le sitemap | GSC → Sitemaps → `sitemap.xml` |
| Vérifier HTTPS | Ouvrir le site, cadenas vert |
| Tester mobile | DevTools responsive ou smartphone |
| Mots-clés longue traîne | GSC Performances + outils de suggestions |
| Alt sur toutes les images | À vérifier dans le code / contenu |
| Backlinks qualité | Annuaires locaux, partenaires, presse |
| Liens internes | Menu + liens dans le contenu |
| Pas de pop-up agressive | Vérifier à l’arrivée sur le site |
| Bing Webmaster | Soumettre le site + sitemap (optionnel) |

---

## Fichiers SEO présents (sans modifier le site)

- **`public/sitemap.xml`** : URLs publiques, `lastmod`, extension images (portrait, logo) pour Google.
- **`public/robots.txt`** : Allow /, Disallow /admin, Sitemap, Host (Yandex).
- **`SEO-GUIDE.md`** : ce guide.

*Aucune modification du contenu ou du design du site n’a été faite pour ces optimisations.*
