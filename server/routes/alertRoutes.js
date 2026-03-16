const express = require('express');
const router = express.Router();
const { getAlerts, markAlertRead } = require('../controllers/alertController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, getAlerts);

router.put('/:id/read', protect, markAlertRead);

module.exports = router;
