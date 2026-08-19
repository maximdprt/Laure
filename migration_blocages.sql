-- ============================================================================
--  MIGRATION : BLOCAGE DES DATES ET CRÉNEAUX (espace admin)
--  À exécuter dans Supabase > SQL Editor. Le script est idempotent :
--  vous pouvez le relancer autant de fois que nécessaire.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Tables (créées si absentes)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS jours_bloques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  raison VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS creneaux_bloques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  heure TIME NOT NULL,
  lieu VARCHAR(20) NOT NULL CHECK (lieu IN ('cabinet', 'domicile')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, heure, lieu)
);

-- ---------------------------------------------------------------------------
-- 2. Contraintes d'unicité (obligatoires : le front utilise un upsert
--    "ON CONFLICT DO NOTHING" pour que rebloquer une date déjà bloquée
--    n'échoue jamais). Sur une base ancienne, elles peuvent manquer.
-- ---------------------------------------------------------------------------

-- jours_bloques : une seule ligne par date (on dédoublonne avant de contraindre)
DELETE FROM jours_bloques a
USING jours_bloques b
WHERE a.ctid > b.ctid AND a.date = b.date;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'jours_bloques'::regclass AND contype = 'u'
      AND conkey = ARRAY[(SELECT attnum FROM pg_attribute
                          WHERE attrelid = 'jours_bloques'::regclass AND attname = 'date')]
  ) THEN
    ALTER TABLE jours_bloques ADD CONSTRAINT jours_bloques_date_key UNIQUE (date);
  END IF;
END $$;

-- creneaux_bloques : une seule ligne par (date, heure, lieu)
DELETE FROM creneaux_bloques a
USING creneaux_bloques b
WHERE a.ctid > b.ctid
  AND a.date = b.date AND a.heure = b.heure AND a.lieu = b.lieu;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'creneaux_bloques'::regclass AND contype = 'u'
      AND pg_get_constraintdef(oid) ILIKE 'UNIQUE (date, heure, lieu)%'
  ) THEN
    ALTER TABLE creneaux_bloques
      ADD CONSTRAINT creneaux_bloques_date_heure_lieu_key UNIQUE (date, heure, lieu);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_jours_bloques_date ON jours_bloques(date);
CREATE INDEX IF NOT EXISTS idx_creneaux_bloques_date_lieu ON creneaux_bloques(date, lieu);

-- ---------------------------------------------------------------------------
-- 3. RLS : lecture publique (les visiteurs doivent voir les blocages)
--    + écriture depuis l'interface admin du site.
--    Sans la policy d'écriture, l'insertion échoue silencieusement côté admin.
-- ---------------------------------------------------------------------------
ALTER TABLE jours_bloques ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Jours bloqués publics" ON jours_bloques;
DROP POLICY IF EXISTS "Mise à jour des jours bloqués (UI admin)" ON jours_bloques;

CREATE POLICY "Jours bloqués publics"
  ON jours_bloques FOR SELECT
  USING (true);

CREATE POLICY "Mise à jour des jours bloqués (UI admin)"
  ON jours_bloques FOR ALL
  USING (true)
  WITH CHECK (true);

ALTER TABLE creneaux_bloques ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Créneaux bloqués lisibles par tous" ON creneaux_bloques;
DROP POLICY IF EXISTS "Admins peuvent gérer les créneaux bloqués" ON creneaux_bloques;
DROP POLICY IF EXISTS "Mise à jour des créneaux bloqués (UI admin)" ON creneaux_bloques;

CREATE POLICY "Créneaux bloqués lisibles par tous"
  ON creneaux_bloques FOR SELECT
  USING (true);

CREATE POLICY "Mise à jour des créneaux bloqués (UI admin)"
  ON creneaux_bloques FOR ALL
  USING (true)
  WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- 4. Temps réel : les blocages apparaissent immédiatement chez les visiteurs
--    déjà présents sur la page de réservation.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'jours_bloques'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE jours_bloques;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'creneaux_bloques'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE creneaux_bloques;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 5. Vérification
-- ---------------------------------------------------------------------------
SELECT 'jours_bloques' AS table_name, count(*) AS lignes FROM jours_bloques
UNION ALL
SELECT 'creneaux_bloques', count(*) FROM creneaux_bloques;
