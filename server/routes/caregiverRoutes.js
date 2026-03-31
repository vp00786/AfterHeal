const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getLinkedPatient,
    getCaregiverNotes,
    addCaregiverNote,
    resolveNote,
    getPatientMedications
} = require('../controllers/caregiverController');

// All routes require auth and caregiver role
router.use(protect, authorize('caregiver'));

router.get('/patient', getLinkedPatient);
router.get('/medications', getPatientMedications);
router.route('/notes')
    .get(getCaregiverNotes)
    .post(addCaregiverNote);
router.put('/notes/:id', resolveNote);

module.exports = router;
