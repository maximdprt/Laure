-- ==================== TABLES SUPABASE ====================

-- 1. TABLE UTILISATEURS (Clients)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLE SERVICES
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  duree INTEGER NOT NULL, -- en minutes
  prix DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLE DISPONIBILITES (horaires par jour de la semaine)
CREATE TABLE IF NOT EXISTS disponibilites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jour_semaine INTEGER NOT NULL, -- 0=Lundi, 1=Mardi, ..., 4=Vendredi, 5=Samedi, 6=Dimanche
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLE JOURS BLOQUES
CREATE TABLE IF NOT EXISTS jours_bloques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  raison VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLE RESERVATIONS
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  date DATE NOT NULL,
  heure TIME NOT NULL,
  lieu VARCHAR(255) NOT NULL, -- cabinet, domicile
  duree INTEGER NOT NULL, -- en minutes
  statut VARCHAR(50) DEFAULT 'en attente', -- en attente, confirmée, complétée, annulée, no-show
  google_event_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== INDEXES ====================
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_service ON reservations(service_id);
CREATE INDEX idx_reservations_statut ON reservations(statut);
-- Empêche les doubles réservations sur un même créneau (tous lieux confondus)
CREATE UNIQUE INDEX IF NOT EXISTS uniq_reservations_date_heure ON reservations(date, heure);
CREATE INDEX idx_disponibilites_jour ON disponibilites(jour_semaine);
CREATE INDEX idx_jours_bloques_date ON jours_bloques(date);

-- ==================== INSERTION DONNEES INITIALES ====================

-- Insère les services
INSERT INTO services (nom, description, duree, prix) VALUES
('Massage sportif', 'Massage de récupération musculaire pour athlètes', 60, 60.00),
('Massage sportif', 'Massage de récupération musculaire pour athlètes', 90, 85.00),
('Soins énergétiques', 'Chromothérapie et rééquilibrage énergétique', 60, 70.00),
('Soins énergétiques', 'Chromothérapie et rééquilibrage énergétique', 90, 100.00)
ON CONFLICT DO NOTHING;

-- Insère les horaires (Lundi-Vendredi 8h-20h)
INSERT INTO disponibilites (jour_semaine, heure_debut, heure_fin) VALUES
(0, '08:00', '20:00'), -- Lundi
(1, '08:00', '20:00'), -- Mardi
(2, '08:00', '20:00'), -- Mercredi
(3, '08:00', '20:00'), -- Jeudi
(4, '08:00', '20:00')  -- Vendredi
ON CONFLICT DO NOTHING;

-- ==================== RLS (Row Level Security) ====================

-- Active RLS sur users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Les utilisateurs voient leurs propres données"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Active RLS sur reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Les utilisateurs voient leurs réservations"
  ON reservations FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Les admins voient tout"
  ON reservations FOR SELECT
  USING (auth.role() = 'authenticated');

-- Active RLS sur services (lecture publique)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services publics"
  ON services FOR SELECT
  USING (true);

-- Active RLS sur disponibilites (lecture publique)
ALTER TABLE disponibilites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Disponibilités publiques"
  ON disponibilites FOR SELECT
  USING (true);

-- Active RLS sur jours_bloques (lecture publique)
ALTER TABLE jours_bloques ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jours bloqués publics"
  ON jours_bloques FOR SELECT
  USING (true);

-- ==================== TABLE CONTACT MESSAGES ====================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour rechercher les messages non envoyés
CREATE INDEX idx_contact_messages_sent ON contact_messages(sent);

-- RLS sur contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Les admins peuvent voir les messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Tout le monde peut insérer un message"
  ON contact_messages FOR INSERT
  WITH CHECK (true);
