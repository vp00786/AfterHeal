const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { uploadRecord, getRecords, deleteRecord } = require('../controllers/recordController');

// Multer Configuration (Memory Storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/upload', protect, upload.single('file'), uploadRecord);
router.get('/:patientId', protect, getRecords);
router.delete('/:id', protect, deleteRecord);

module.exports = router;
