const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const {
    uploadRecord,
    getRecords,
    deleteRecord,
    updateRecord,
    grantAccess,
    revokeAccess,
    getAccessList,
    getAccessiblePatients
} = require('../controllers/recordController');

// Multer Configuration (Memory Storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB to match Supabase bucket limit
});

// ── Core record routes ──────────────────────────────────────────────────────
router.post('/upload', protect, upload.single('file'), uploadRecord);

// IMPORTANT: /accessible-patients must come BEFORE /:patientId to avoid route conflict
router.get('/accessible-patients', protect, getAccessiblePatients);

router.get('/:patientId', protect, getRecords);
router.patch('/:id', protect, updateRecord);
router.delete('/:id', protect, deleteRecord);

// ── Document Access Control routes ──────────────────────────────────────────
router.post('/:id/access', protect, grantAccess);           // Grant a doctor access
router.delete('/:id/access/:doctorId', protect, revokeAccess); // Revoke a doctor's access
router.get('/:id/access', protect, getAccessList);           // List who has access

module.exports = router;
