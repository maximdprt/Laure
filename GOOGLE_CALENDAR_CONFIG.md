# 🗓️ Guide Google Calendar - Aura Massage

## ✅ Ce qui est prêt

- ✅ Edge Function Supabase pour synchronisation Google Calendar
- ✅ Création/modification d'événements automatiques
- ✅ Champ `google_event_id` dans la table reservations

---

## 🚀 Configuration (étapes à faire)

### **Étape 1 : Créer un projet Google Cloud**

1. Aller sur [console.cloud.google.com](https://console.cloud.google.com)
2. Créer un nouveau projet
   - Nom : `Aura Massage`
3. Attendre que le projet soit créé

### **Étape 2 : Activer l'API Google Calendar**

1. Aller sur **APIs & Services** → **Library**
2. Rechercher `Google Calendar API`
3. Cliquer dessus et **Enable**
4. Attendre quelques secondes pour l'activation

### **Étape 3 : Créer des credentials OAuth 2.0**

1. Aller sur **APIs & Services** → **Credentials**
2. Cliquer **Create Credentials** → **OAuth 2.0 Client IDs**
3. Choisir **Web Application**
4. Ajouter les URI autorisés :
   ```
   http://localhost:3000
   http://localhost:5173
   https://aura-massage.fr
   https://www.aura-massage.fr
   https://your-vercel-domain.vercel.app
   ```
5. **Create**
6. Copier le fichier JSON :
   - Vous aurez : **Client ID** et **Client Secret**

### **Étape 4 : Obtenir un Refresh Token**

Pour que l'Edge Function puisse accéder à Google Calendar sans intervention manuelle :

```bash
# Installer le package OAuth2
npm install google-auth-library

# Créer un fichier get-google-token.js
```

Créer `get-google-token.js` à la racine :

```javascript
const { google } = require('google-auth-library');
const fs = require('fs');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUrl = 'http://localhost:3000/auth/callback';

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);

// URL pour que l'utilisateur accepte les permissions
const scopes = ['https://www.googleapis.com/auth/calendar'];
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Visit this URL to authorize:', url);
console.log('Paste the authorization code below:');

// Attendre le code du navigateur
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Paste authorization code: ', async (code) => {
  try {
    const { credentials } = await oauth2Client.getToken(code);
    console.log('\n✅ Refresh Token:');
    console.log(credentials.refresh_token);
    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
});
```

**Utilisation** :
```bash
node get-google-token.js
```

1. Une URL s'affiche → copier dans le navigateur
2. Accepter les permissions pour Aura Massage
3. Vous recevrez un code → copier dans le terminal
4. Le **Refresh Token** s'affiche → **Copier et sauvegarder** 🔒

---

### **Étape 5 : Configurer Supabase**

Dans le dashboard Supabase de votre projet :

**Settings** → **Edge Functions** → **Add Secret**

Ajouter 3 variables :

```
GOOGLE_CLIENT_ID=votre_client_id_ici
GOOGLE_CLIENT_SECRET=votre_client_secret_ici
GOOGLE_REFRESH_TOKEN=votre_refresh_token_ici
```

---

### **Étape 6 : Déployer la fonction**

```bash
supabase login
supabase link --project-ref dejxkjxlefuxuuupkzqu
supabase functions deploy google-calendar-sync
```

---

### **Étape 7 : Configurer le Webhook Supabase**

1. Dans Supabase : **Database** → **Webhooks**
2. **Create a new hook**
   - Name : `google-calendar-sync`
   - Table : `reservations`
   - Events : `INSERT, UPDATE`
   - Type : `Supabase Edge Functions`
   - Edge Function : `google-calendar-sync`

---

## 🧪 Tester la synchronisation

### Test 1 : Créer une réservation

1. Aller sur votre site
2. Faire une réservation test
3. Vérifier :
   - ✅ Événement créé dans Google Calendar
   - ✅ `google_event_id` rempli dans Supabase

### Test 2 : Modifier une réservation (Admin)

1. Modifier les détails dans l'admin
2. L'événement Google Calendar se met à jour automatiquement ✅

### Test 3 : Supprimer une réservation

Ajouter cette fonction pour supprimer l'événement Google :

```typescript
// Dans supabaseAPI.ts
export const deleteReservation = async (reservationId: string) => {
  const { data: reservation } = await supabase
    .from('reservations')
    .select('google_event_id')
    .eq('id', reservationId)
    .single()

  if (reservation?.google_event_id) {
    // L'Edge Function supprimera l'événement Google
  }

  await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId)
}
```

---

## 📊 Vérifier sur Google Calendar

1. Aller sur [calendar.google.com](https://calendar.google.com)
2. Vos réservations doivent s'afficher automatiquement
3. Les clients reçoivent une invitation par email

---

## 🔒 Sécurité - IMPORTANT

✅ **Déjà configuré** :
- Refresh token stocké dans Supabase (pas exposé)
- Access token généré dynamiquement
- Edge Function en tant que service server-side

❌ **À ne PAS faire** :
- Ne jamais partager le Refresh Token
- Ne jamais le commit dans Git
- Garder le Client Secret secret

---

## 🐛 Déboguer

### Logs Supabase

```bash
supabase functions logs google-calendar-sync
```

### Erreurs courantes

| Erreur | Solution |
|--------|----------|
| `Missing Google credentials` | Ajouter les variables d'environnement Supabase |
| `Failed to refresh token` | Vérifier le Refresh Token n'a pas expiré |
| `Calendar API not enabled` | Aller sur Google Cloud Console → APIs → Enable Calendar |
| `Unauthorized` | Vérifier les scopes dans le Refresh Token |

---

## 💡 Options avancées

### Ajouter des paramètres personnalisés

- **Couleur événement** : Rouge pour sportif, bleu pour énergétique
- **Notifications** : Rappels 24h et 1h avant
- **Inviter d'autres collaborateurs** : Partager le calendrier

### Exemple avec couleurs

```typescript
const eventData: GoogleCalendarEvent = {
  summary: `${service.nom} - ${user.prenom} ${user.nom}`,
  colorId: record.category === 'sportif' ? '4' : '5', // 4=rouge, 5=bleu
  // ... reste de la config
}
```

---

## 📞 Liens utiles

- **Google Cloud Console** : [console.cloud.google.com](https://console.cloud.google.com)
- **Google Calendar API Docs** : [developers.google.com/calendar](https://developers.google.com/calendar)
- **OAuth 2.0 Guide** : [developers.google.com/identity/oauth2](https://developers.google.com/identity/oauth2)

---

## ✨ Une fois configuré

Vous aurez automatiquement :
- ✅ Toutes les réservations dans Google Calendar
- ✅ Invitations email pour les clients
- ✅ Synchronisation en temps réel
- ✅ Les clients peuvent accepter/refuser l'invitation
- ✅ Rappels automatiques 24h et 1h avant

**Temps total de configuration : ~30 min**
