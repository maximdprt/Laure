# 🔧 Configuration Google Calendar - Quick Setup

Puisque vous avez déjà Google connecté à Supabase, voici les **3 étapes finales** pour synchroniser les réservations.

---

## 1️⃣ Obtenir le Service Account Google

**Dans Google Cloud Console** :

1. Aller sur **APIs & Services** → **Credentials**
2. Créer une nouvelle clé → **Service Account**
   - Service account name: `Aura Massage Calendar`
3. Créer une clé JSON
4. Télécharger le fichier JSON (vous l'utiliserez à l'étape 2)

---

## 2️⃣ Configurer Supabase

Dans le **Dashboard Supabase** de votre projet :

1. Aller dans **Settings** → **Edge Functions**
2. Ajouter cette variable d'environnement :

```
GOOGLE_SERVICE_ACCOUNT_KEY=<COLLER_TOUT_LE_CONTENU_DU_FICHIER_JSON_ICI>
```

**⚠️ Important** : Coller **tout le contenu JSON** du fichier téléchargé (incluant les accolades `{}`).

---

## 3️⃣ Déployer la fonction

```bash
cd c:\Users\coren\OneDrive\Bureau\Laure

# Login
supabase login

# Link to your project
supabase link --project-ref dejxkjxlefuxuuupkzqu

# Deploy
supabase functions deploy google-calendar-sync

# Check logs
supabase functions logs google-calendar-sync
```

---

## 4️⃣ Configurer le Webhook Supabase

Dans le **Dashboard Supabase** :

1. **Database** → **Webhooks**
2. **Create a new hook**
3. Configurer :
   ```
   Name: google-calendar-sync
   Table: reservations
   Events: INSERT, UPDATE, DELETE
   Type: Supabase Edge Functions
   Function: google-calendar-sync
   ```
4. **Save**

---

## ✅ Tester

1. **Faire une réservation** sur le site
2. **Vérifier Google Calendar** (5-10 secondes après)
3. ✅ L'événement doit s'afficher automatiquement

---

## 🐛 Déboguer

Voir les logs en temps réel :

```bash
supabase functions logs google-calendar-sync
```

Chercher les messages `✅` ou `❌`.

---

## 🎉 Résultat

Une fois configuré, **chaque nouvelle réservation** :
- ✅ Crée automatiquement un événement Google Calendar
- ✅ Envoie une invitation au client
- ✅ Synchronise les mises à jour
- ✅ Supprime l'événement si annulation
