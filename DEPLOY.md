# Déploiement sur Vercel

Deux façons de déployer le site sur Vercel.

---

## Option 1 : Connexion GitHub dans Vercel (recommandé, sans config)

Aucun secret à créer. Chaque push sur `main` déclenche un déploiement automatique.

1. Allez sur **[vercel.com](https://vercel.com)** et connectez-vous (ou créez un compte avec GitHub).
2. Cliquez sur **Add New…** → **Project**.
3. **Import** votre dépôt GitHub (ex. `LAURE`).
4. Vercel détecte **Vite** automatiquement.
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Cliquez sur **Deploy**.
6. Une fois le projet créé, dans **Settings → Domains**, vous pouvez ajouter `aura-massage-lacanau.fr`.

---

## Option 2 : Déploiement via GitHub Actions

Le workflow `.github/workflows/deploy-vercel.yml` déploie sur Vercel à chaque push sur `main`. Il faut configurer **3 secrets** dans GitHub.

### 1. Créer le projet sur Vercel (une fois)

- Allez sur [vercel.com](https://vercel.com) → **Add New** → **Project** → importez le dépôt GitHub et déployez une première fois (comme en option 1).  
  Ou, en local après `npx vercel login` :
  ```bash
  npx vercel link
  ```
  Choisissez votre compte/équipe et le projet (ou créez-en un).

### 2. Récupérer les IDs et le token

**VERCEL_ORG_ID et VERCEL_PROJECT_ID**

- En local : après `vercel link`, ouvrez `.vercel/project.json` → `orgId` et `projectId`.
- Sur le site : **Vercel** → votre projet → **Settings** → **General** → **Project ID**.  
  Pour l’**Org ID** : dans l’URL du projet (`vercel.com/xxx/yyy`), `xxx` est le slug d’équipe ; l’ID complet est dans **Settings** du compte/équipe, ou dans `.vercel/project.json` après `vercel link`.

**VERCEL_TOKEN**

- [vercel.com/account/tokens](https://vercel.com/account/tokens) → **Create** → donnez un nom (ex. `GitHub Actions`) → copiez le token.

### 3. Ajouter les secrets dans GitHub

- Repo GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
- Créez :
  - `VERCEL_TOKEN` (token copié)
  - `VERCEL_ORG_ID` (org ID)
  - `VERCEL_PROJECT_ID` (project ID)

### 4. Déployer

- Poussez sur `main` : le workflow se lance et déploie en production.
- Ou **Actions** → **Deploy to Vercel** → **Run workflow**.

---

## Résumé

| Méthode              | À faire une fois                         | Déploiement          |
|----------------------|------------------------------------------|----------------------|
| Option 1 (recommandé)| Import du repo dans Vercel + Deploy      | Auto à chaque push   |
| Option 2 (Actions)   | Créer le projet + 3 secrets dans GitHub  | Auto à chaque push   |

Le fichier `vercel.json` à la racine configure déjà les rewrites pour React Router (SPA).
