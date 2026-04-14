const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { uploadRecord, getRecords, deleteRecord, updateRecord } = require('../controllers/recordController');

// Multer Configuration (Memory Storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB to match Supabase bucket limit
});

router.post('/upload', protect, upload.single('file'), uploadRecord);
router.get('/:patientId', protect, getRecords);
router.patch('/:id', protect, updateRecord);
router.delete('/:id', protect, deleteRecord);

module.exports = router;
