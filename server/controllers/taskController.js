// const Task = require('../models/Task');
// const User = require('../models/User');
// const Alert = require('../models/Alert');
const { tasks, alerts, users } = require('../data/mockStore');

// @desc    Create a new task (Doctor only)
// @route   POST /api/tasks
// @access  Doctor
const createTask = async (req, res) => {
    const { title, description, type, priority, patientId, scheduledTime } = req.body;

    try {
        const newTask = {
            _id: String(Date.now()),
            title,
            description,
            type,
            priority,
            patient: patientId, // ID string
            assignedBy: req.user._id,
            scheduledTime: new Date(scheduledTime),
            isCompleted: false,
            createdAt: new Date()
        };

        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: 'Invalid task data' });
    }
};

// @desc    Get All Tasks (Role based)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        let resultTasks = [];
        if (req.user.role === 'patient') {
            resultTasks = tasks.filter(t => t.patient === req.user._id);
        } else if (req.user.role === 'doctor') {
            // Filter by doctor? or patientId?
            const patientId = req.query.patientId;
            resultTasks = tasks.filter(t => t.assignedBy === req.user._id);
            if (patientId) {
                resultTasks = resultTasks.filter(t => t.patient === patientId);
            }

            // Populate patient name manually
            resultTasks = resultTasks.map(t => {
                const p = users.find(u => u._id === t.patient);
                return { ...t, patient: { name: p ? p.name : 'Unknown' } };
            });
        } else if (req.user.role === 'caregiver') {
            const patientId = req.user.relatedPatient;
            if (!patientId) {
                return res.status(400).json({ message: 'No patient linked to caregiver' });
            }
            resultTasks = tasks.filter(t => t.patient === patientId);
        }

        // Sort
        resultTasks.sort((a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime));

        res.json(resultTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Mark task as completed
// @route   PUT /api/tasks/:id/complete
// @access  Patient
const completeTask = async (req, res) => {
    try {
        const task = tasks.find(t => t._id === req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.patient !== req.user._id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.isCompleted = true;
        task.completedAt = new Date();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// SYSTEM FUNCTION: Check for missed tasks (To be called by Cron)
const checkOverdueTasks = async () => {
    try {
        const now = new Date();

        const overdueTasks = tasks.filter(t =>
            !t.isCompleted && new Date(t.scheduledTime) < now
        );

        for (const task of overdueTasks) {
            // Check if alert already exists for this task
            const existingAlert = alerts.find(a => a.task === task._id);
            if (existingAlert) continue;

            let recipientId;
            let message;
            let severity;

            if (task.priority === 'critical') {
                // Notify Doctor
                recipientId = task.assignedBy;
                message = `CRITICAL: Patient missed ${task.title} scheduled at ${task.scheduledTime}`;
                severity = 'critical';
            } else {
                // Notify Caregiver
                // FIND caregiver linked to this patient in users array
                const caregiver = users.find(u => u.relatedPatient === task.patient && u.role === 'caregiver');
                if (caregiver) {
                    recipientId = caregiver._id;
                    message = `Patient missed ${task.title}. Please check in.`;
                    severity = 'non-critical';
                }
            }

            if (recipientId) {
                const newAlert = {
                    _id: String(Date.now() + Math.random()),
                    task: task._id,
                    recipient: recipientId,
                    message,
                    severity,
                    createdAt: new Date()
                };
                alerts.push(newAlert);
                console.log(`Alert sent to ${recipientId} for task ${task.title}`);
            }
        }
    } catch (error) {
        console.error('Error checking overdue tasks:', error);
    }
};

module.exports = { createTask, getTasks, completeTask, checkOverdueTasks };
