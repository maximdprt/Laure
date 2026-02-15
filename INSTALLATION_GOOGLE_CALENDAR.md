# 🗓️ Installation Google Calendar - Étapes complètes

## ✅ Étape 1 : Obtenir les credentials Google

### 1.1 - Google Cloud Console
1. Aller sur [console.cloud.google.com](https://console.cloud.google.com)
2. Sélectionner votre projet (ou en créer un)
3. **APIs & Services** → **Library**
4. Rechercher `Google Calendar API` et l'activer (**ENABLE**)

### 1.2 - Créer un Service Account
1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **Service Account**
   - Service account name: `aura-massage-calendar`
   - Description: `Synchronize reservations with Google Calendar`
3. **Create and Continue**
4. **Create Key** → **JSON**
5. **Télécharger le fichier JSON** et l'ouvrir dans un éditeur texte

---

## ✅ Étape 2 : Configurer Supabase

1. Aller sur [app.supabase.com](https://app.supabase.com)
2. Sélectionner votre projet
3. **Project Settings** (bas à gauche) → **Edge Functions**
4. **New Secret**
   - Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
   - Value: **Coller TOUT le contenu du fichier JSON** (incluant `{` et `}`)
5. **Save**

---

## ✅ Étape 3 : Déployer la fonction

Dans votre terminal :

```bash
cd c:\Users\coren\OneDrive\Bureau\Laure

# Login Supabase
supabase login

# Lier le projet
supabase link --project-ref dejxkjxlefuxuuupkzqu

# Déployer
supabase functions deploy google-calendar-sync

# Vérifier les logs
supabase functions logs google-calendar-sync
```

---

## ✅ Étape 4 : Configurer le Webhook

**Dans le dashboard Supabase** (le seul truc à faire manuellement) :

1. **Database** → **Webhooks** (dans le menu de gauche)
2. **Create a new hook**
3. Remplir :
   ```
   Name: google-calendar-sync
   Table: reservations
   Events: INSERT, UPDATE, DELETE
   Type: Supabase Edge Functions
   Function: google-calendar-sync
   ```
4. **Save**

---

## 🧪 Tester

1. Aller sur votre site
2. Faire une réservation test
3. **Attendre 10-30 secondes**
4. Ouvrir Google Calendar
5. ✅ L'événement doit s'afficher

---

## 🐛 Déboguer

Si ça ne marche pas, voir les logs :

```bash
supabase functions logs google-calendar-sync
```

Chercher les messages:
- ✅ `✅ Created event` = succès
- ❌ `❌ Error` = problème (voir le message)

---

## 🎉 Résultat

Une fois configuré, chaque réservation créera automatiquement :
- ✅ Un événement dans votre Google Calendar
- ✅ Invitation email au client (depuis Google)
- ✅ Mise à jour automatique si modification
- ✅ Suppression si annulation
