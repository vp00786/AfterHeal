const express = require('express');
const router = express.Router();
const { createTask, getTasks, completeTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .post(protect, authorize('doctor'), createTask)
    .get(protect, getTasks);

router.put('/:id/complete', protect, authorize('patient'), completeTask);

module.exports = router;
