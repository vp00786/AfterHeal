-- AfterHeal: Caregiver Module Migration
-- Run this in the Supabase SQL Editor

-- Caregiver Notes Table
CREATE TABLE IF NOT EXISTS caregiver_notes (
    _id          TEXT PRIMARY KEY,
    caregiver    TEXT NOT NULL,
    patient      TEXT NOT NULL,
    content      TEXT NOT NULL,
    status       TEXT DEFAULT 'open',
    "createdAt"  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by caregiver
CREATE INDEX IF NOT EXISTS idx_caregiver_notes_caregiver ON caregiver_notes(caregiver);
CREATE INDEX IF NOT EXISTS idx_caregiver_notes_patient ON caregiver_notes(patient);
