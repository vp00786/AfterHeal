-- ============================================================
--  AfterHeal — Full Database Schema
--  Run this entire file in the Supabase SQL Editor
--  Project: https://lrlohhmyxmfswovlpnnb.supabase.co
-- ============================================================

-- ============================================================
-- 1. USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    _id             TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    email           TEXT UNIQUE NOT NULL,
    password        TEXT NOT NULL,
    role            TEXT NOT NULL CHECK (role IN ('patient', 'doctor', 'caregiver')),
    "assignedDoctor" TEXT,          -- doctor's _id (for patients)
    "relatedPatient" TEXT,          -- patient's _id (for caregivers)
    "createdAt"     TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes 
CREATE INDEX IF NOT EXISTS idx_users_email         ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role          ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_assignedDoctor ON users("assignedDoctor");
CREATE INDEX IF NOT EXISTS idx_users_relatedPatient ON users("relatedPatient");

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Service role (backend) can do everything — other clients are blocked by default
CREATE POLICY "Service role full access on users"
    ON users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================================
-- 2. TASKS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS tasks (
    _id             TEXT PRIMARY KEY,
    title           TEXT NOT NULL,
    description     TEXT,
    type            TEXT NOT NULL CHECK (type IN ('medication', 'exercise', 'lifestyle')),
    priority        TEXT NOT NULL DEFAULT 'non-critical'
                        CHECK (priority IN ('critical', 'non-critical', 'routine')),
    patient         TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    "assignedBy"    TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    "scheduledTime" TIMESTAMPTZ NOT NULL,
    "isCompleted"   BOOLEAN NOT NULL DEFAULT false,
    "completedAt"   TIMESTAMPTZ,
    "createdAt"     TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_patient        ON tasks(patient);
CREATE INDEX IF NOT EXISTS idx_tasks_assignedBy     ON tasks("assignedBy");
CREATE INDEX IF NOT EXISTS idx_tasks_scheduledTime  ON tasks("scheduledTime");
CREATE INDEX IF NOT EXISTS idx_tasks_isCompleted    ON tasks("isCompleted");

-- RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on tasks"
    ON tasks
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================================
-- 3. ALERTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS alerts (
    _id         TEXT PRIMARY KEY,
    task        TEXT NOT NULL REFERENCES tasks(_id) ON DELETE CASCADE,
    recipient   TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    message     TEXT NOT NULL,
    "isRead"    BOOLEAN NOT NULL DEFAULT false,
    severity    TEXT NOT NULL CHECK (severity IN ('critical', 'non-critical')),
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_alerts_recipient  ON alerts(recipient);
CREATE INDEX IF NOT EXISTS idx_alerts_task       ON alerts(task);
CREATE INDEX IF NOT EXISTS idx_alerts_isRead     ON alerts("isRead");

-- RLS
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on alerts"
    ON alerts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================================
-- 4. CAREGIVER NOTES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS caregiver_notes (
    _id         TEXT PRIMARY KEY,
    caregiver   TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    patient     TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_caregiver_notes_caregiver ON caregiver_notes(caregiver);
CREATE INDEX IF NOT EXISTS idx_caregiver_notes_patient   ON caregiver_notes(patient);

-- RLS
ALTER TABLE caregiver_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on caregiver_notes"
    ON caregiver_notes
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================================
-- 5. MEDICAL RECORDS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS medical_records (
    _id          TEXT PRIMARY KEY,
    patient      TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    file_path    TEXT NOT NULL,
    file_type    TEXT NOT NULL,
    title        TEXT,
    description  TEXT,
    "uploadedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_medical_records_patient    ON medical_records(patient);
CREATE INDEX IF NOT EXISTS idx_medical_records_uploadedAt ON medical_records("uploadedAt");

-- RLS
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on medical_records"
    ON medical_records
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================================
-- 6. STORAGE BUCKET — medical-records (PRIVATE)
-- ============================================================
-- Creates a PRIVATE bucket. Files are NOT publicly accessible.
-- Access is only via time-limited signed URLs generated by the backend.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'medical-records',
    'medical-records',
    false,                   -- PRIVATE: no public URL access
    52428800,                -- 50 MB max per file
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
)
ON CONFLICT (id) DO UPDATE
    SET public = false,
        file_size_limit = 52428800,
        allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS: only service_role can read/write/delete objects
CREATE POLICY "Service role: read medical-records"
    ON storage.objects FOR SELECT
    TO service_role
    USING (bucket_id = 'medical-records');

CREATE POLICY "Service role: upload medical-records"
    ON storage.objects FOR INSERT
    TO service_role
    WITH CHECK (bucket_id = 'medical-records');

CREATE POLICY "Service role: delete medical-records"
    ON storage.objects FOR DELETE
    TO service_role
    USING (bucket_id = 'medical-records');

-- ============================================================
-- Done! All AfterHeal tables are created with:
--   • Row Level Security ENABLED on every table
--   • Service role (backend) has full unrestricted access
--   • Anon / authenticated clients are blocked by default
--   • medical-records storage bucket is PRIVATE
--   • Files accessible only via signed URLs (1-hour expiry)
-- ============================================================
