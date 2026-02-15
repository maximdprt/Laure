# 📧 Guide de configuration Resend

## ✅ Ce qui a été configuré

### 1. **Base de données Supabase**
- Table `contact_messages` créée dans [SQL_SUPABASE.sql](SQL_SUPABASE.sql)
- Politiques RLS configurées pour la sécurité
- Trigger automatique pour envoyer les emails

### 2. **Edge Functions Supabase**
- **contact-email** : Envoie les messages du formulaire de contact
- **reservation-email** : Envoie la confirmation de réservation aux clients

### 3. **Formulaires frontend**
- [Contact.tsx](src/pages/Contact.tsx) : Intégré avec Supabase
- [Reservation.tsx](src/pages/Reservation.tsx) : Prêt pour l'envoi automatique d'emails

---

## 🚀 Étapes de configuration (à faire)

### **1. Créer un compte Resend**

1. Aller sur [resend.com](https://resend.com)
2. S'inscrire (gratuit jusqu'à 3 000 emails/mois)
3. Vérifier votre email

### **2. Ajouter et vérifier votre domaine**

Dans le dashboard Resend :

1. Aller dans **Domains** → **Add Domain**
2. Entrer : `aura-massage.fr`
3. Resend va vous donner des enregistrements DNS à ajouter

**Enregistrements DNS à ajouter chez votre hébergeur** :

```
Type: TXT
Name: @
Value: resend-verification=XXXXXXXXXX

Type: MX
Name: @
Priority: 10
Value: feedback-smtp.resend.com

Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: p=XXXXX... (fourni par Resend)
```

> **⏱️ Temps de propagation** : 15 min à 48h (généralement 1-2h)

### **3. Récupérer votre API Key**

1. Dans Resend, aller dans **API Keys**
2. Cliquer sur **Create API Key**
3. Nom : `Aura Massage Production`
4. Permission : **Sending access**
5. Copier la clé (commence par `re_...`)

### **4. Configurer Supabase**

#### a) Dashboard Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Ouvrir votre projet
3. Aller dans **Settings** → **Edge Functions**
4. Ajouter la variable d'environnement :

```
RESEND_API_KEY=re_VotreCléAPIIci
```

#### b) Créer la table contact_messages

Dans **SQL Editor** de Supabase, copier-coller le contenu de [SQL_SUPABASE.sql](SQL_SUPABASE.sql) et exécuter.

#### c) Configurer les Database Webhooks

**Pour le formulaire de contact :**

1. Dans Supabase : **Database** → **Webhooks**
2. **Create a new hook**
   - Name : `contact-email-trigger`
   - Table : `contact_messages`
   - Events : `INSERT`
   - Type : `Supabase Edge Functions`
   - Edge Function : `contact-email`

**Pour les réservations :**

1. **Create a new hook**
   - Name : `reservation-email-trigger`
   - Table : `reservations`
   - Events : `INSERT`
   - Type : `Supabase Edge Functions`
   - Edge Function : `reservation-email`

### **5. Déployer les Edge Functions**

Dans votre terminal :

```bash
# Installer Supabase CLI (si pas déjà fait)
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier votre projet
supabase link --project-ref VOTRE_PROJECT_REF

# Déployer les fonctions
supabase functions deploy contact-email
supabase functions deploy reservation-email
```

> **Project Ref** : trouvable dans **Settings** → **General** (ex: `dejxkjxlefuxuuupkzqu`)

---

## 🧪 Tester l'envoi d'emails

### Test 1 : Formulaire de contact

1. Aller sur votre page Contact
2. Remplir le formulaire
3. Envoyer
4. Vérifier :
   - ✅ Message dans la table `contact_messages` (Supabase)
   - ✅ Email reçu à `massage.auraperformance@gmail.com`
   - ✅ Pas de spam

### Test 2 : Réservation

1. Faire une réservation test
2. Vérifier :
   - ✅ Email de confirmation reçu par le client
   - ✅ Statut `confirmée` dans la table `reservations`

---

## 🔍 Déboguer si ça ne marche pas

### Vérifier les logs Supabase

1. Dans Supabase : **Edge Functions** → Sélectionner la fonction
2. Onglet **Logs**
3. Regarder les erreurs

### Erreurs courantes

| Erreur | Solution |
|--------|----------|
| `Missing Resend API key` | Ajouter `RESEND_API_KEY` dans Supabase |
| `Domain not verified` | Attendre la propagation DNS (48h max) |
| `401 Unauthorized` | Vérifier la clé API Resend |
| Email dans spam | Vérifier SPF/DKIM dans Resend Dashboard |

---

## 📊 Statistiques et monitoring

### Dashboard Resend

- **Emails** → Voir tous les emails envoyés
- Taux de délivrabilité
- Bounces / Rejets
- Logs détaillés par email

### Recommandations

1. **Utilisez des adresses `no-reply@` ou `contact@` pour l'expéditeur**
   ```typescript
   from: "Aura Massage <no-reply@aura-massage.fr>"
   ```

2. **Configurez Reply-To pour les réponses**
   ```typescript
   reply_to: "massage.auraperformance@gmail.com"
   ```

3. **Activez DMARC** (optionnel mais recommandé)
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@aura-massage.fr
   ```

---

## 💰 Limites du plan gratuit

- **3 000 emails/mois** gratuits
- Au-delà : 0,10€ par 1000 emails
- Largement suffisant pour un site de massage

---

## 🔐 Sécurité

✅ **Déjà configuré :**
- Validation des champs (nom, email, message)
- Échappement HTML pour éviter XSS
- RLS Supabase pour protéger les données
- CORS configuré correctement

❌ **À ne PAS faire :**
- Ne jamais exposer `RESEND_API_KEY` côté frontend
- Ne jamais commit la clé API dans Git

---

## 📞 Support

Si vous avez des problèmes :

1. **Resend Support** : [resend.com/support](https://resend.com/support)
2. **Documentation Resend** : [resend.com/docs](https://resend.com/docs)
3. **Supabase Docs** : [supabase.com/docs](https://supabase.com/docs)

---

## 🎉 Une fois tout configuré

Vos emails seront automatiquement envoyés :
- ✅ Sans passer par les spams
- ✅ Avec une belle mise en page HTML
- ✅ Avec tracking et statistiques
- ✅ Authentification SPF/DKIM/DMARC

**Temps total de configuration : ~30 min** (+ propagation DNS)
