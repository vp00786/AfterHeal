-- ============================================================
--  AfterHeal — Migration 002: Document Access Control
--  Run this file in the Supabase SQL Editor
-- ============================================================

-- ============================================================
-- document_access TABLE
-- Tracks which doctors a patient has granted access to
-- for each specific medical record/document.
-- ============================================================
CREATE TABLE IF NOT EXISTS document_access (
    _id         TEXT PRIMARY KEY,
    record_id   TEXT NOT NULL REFERENCES medical_records(_id) ON DELETE CASCADE,
    patient_id  TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    doctor_id   TEXT NOT NULL REFERENCES users(_id) ON DELETE CASCADE,
    granted_at  TIMESTAMPTZ DEFAULT NOW(),

    -- A doctor can only be granted access once per document
    UNIQUE(record_id, doctor_id)
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_doc_access_record_id  ON document_access(record_id);
CREATE INDEX IF NOT EXISTS idx_doc_access_patient_id ON document_access(patient_id);
CREATE INDEX IF NOT EXISTS idx_doc_access_doctor_id  ON document_access(doctor_id);

-- RLS
ALTER TABLE document_access ENABLE ROW LEVEL SECURITY;

-- Service role (backend) can do everything
CREATE POLICY "Service role full access on document_access"
    ON document_access
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- Done! Run this migration in Supabase SQL Editor.
-- ============================================================
