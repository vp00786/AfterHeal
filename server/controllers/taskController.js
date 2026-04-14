const supabase = require('../config/supabaseClient');
const { randomUUID } = require('crypto');

// @desc    Create a new task (Doctor only)
// @route   POST /api/tasks
// @access  Doctor
const createTask = async (req, res) => {
    const { title, description, type, priority, patientId, scheduledTime } = req.body;

    try {
        const newTaskCtx = {
            _id: String(Date.now()),
            title,
            description,
            type,
            priority,
            patient: patientId,
            assignedBy: req.user._id,
            scheduledTime,
            isCompleted: false,
            createdAt: new Date().toISOString()
        };

        const { data: task, error } = await supabase
            .from('tasks')
            .insert([newTaskCtx])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(task);
    } catch (error) {
        console.error('Create Task Error:', error.message);
        res.status(400).json({ message: 'Invalid task data' });
    }
};

// @desc    Create a new reminder (Patient only)
// @route   POST /api/tasks/patient-reminder
// @access  Patient
const createPatientReminder = async (req, res) => {
    const { title, description, type, scheduledTime } = req.body;

    try {
        const newTaskCtx = {
            _id: String(Date.now()),
            title,
            description,
            type: type || 'medication',
            priority: 'routine',
            patient: req.user._id,
            assignedBy: req.user._id, // Self assigned
            scheduledTime,
            isCompleted: false,
            createdAt: new Date().toISOString()
        };

        const { data: task, error } = await supabase
            .from('tasks')
            .insert([newTaskCtx])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(task);
    } catch (error) {
        console.error('Create Reminder Error:', error.message);
        res.status(400).json({ message: 'Invalid reminder data' });
    }
};

// @desc    Get All Tasks (Role based)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        // Ensuring we fetch patient details (name) similar to population
        let query = supabase.from('tasks').select('*, patient:users!patient(name, _id)');

        if (req.user.role === 'patient') {
            query = query.eq('patient', req.user._id);
        } else if (req.user.role === 'doctor') {
            query = query.eq('assignedBy', req.user._id);
            if (req.query.patientId) {
                query = query.eq('patient', req.query.patientId);
            }
        } else if (req.user.role === 'caregiver') {
            if (!req.user.relatedPatient) {
                return res.status(400).json({ message: 'No patient linked to caregiver' });
            }
            query = query.eq('patient', req.user.relatedPatient);
        }

        const { data: tasks, error } = await query.order('scheduledTime', { ascending: false });
        if (error) throw error;

        res.json(tasks);
    } catch (error) {
        console.error('Get Tasks Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Mark task as completed
// @route   PUT /api/tasks/:id/complete
// @access  Patient
const completeTask = async (req, res) => {
    try {
        // Fetch first to check ownership
        const { data: task, error: fetchError } = await supabase
            .from('tasks')
            .select('*')
            .eq('_id', req.params.id)
            .single();

        if (fetchError || !task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.patient !== req.user._id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { data: updatedTask, error: updateError } = await supabase
            .from('tasks')
            .update({
                isCompleted: true,
                completedAt: new Date().toISOString()
            })
            .eq('_id', req.params.id)
            .select()
            .single();

        if (updateError) throw updateError;

        res.json(updatedTask);
    } catch (error) {
        console.error('Complete Task Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// SYSTEM FUNCTION: Check for missed tasks (To be called by Cron)
const checkOverdueTasks = async () => {
    try {
        const now = new Date().toISOString();

        const { data: overdueTasks } = await supabase
            .from('tasks')
            .select('*')
            .eq('isCompleted', false)
            .lt('scheduledTime', now);

        if (!overdueTasks || overdueTasks.length === 0) return;

        for (const task of overdueTasks) {
            // Check if ANY alert already exists for this task — use maybeSingle() to
            // avoid PGRST116 error when no rows are found.
            const { data: existingAlert } = await supabase
                .from('alerts')
                .select('_id')
                .eq('task', task._id)
                .maybeSingle();

            if (existingAlert) continue;

            const missedTime = new Date(task.scheduledTime).toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit'
            });
            const alertsToInsert = [];

            // Always notify the caregiver (if linked) for every missed dose.
            const { data: caregiver } = await supabase
                .from('users')
                .select('_id')
                .eq('relatedPatient', task.patient)
                .eq('role', 'caregiver')
                .maybeSingle();

            if (caregiver) {
                const severity = task.priority === 'critical' ? 'critical' : 'non-critical';
                const message = task.priority === 'critical'
                    ? `CRITICAL: Patient missed ${task.title} scheduled at ${missedTime}. Immediate attention required.`
                    : `Patient missed "${task.title}" scheduled at ${missedTime}. Please check in.`;

                alertsToInsert.push({
                    _id: randomUUID(),
                    task: task._id,
                    recipient: caregiver._id,
                    message,
                    severity,
                    isRead: false,
                    createdAt: new Date().toISOString()
                });
            }

            // Also notify the assigning doctor for critical tasks.
            if (task.priority === 'critical' && task.assignedBy) {
                alertsToInsert.push({
                    _id: randomUUID(),
                    task: task._id,
                    recipient: task.assignedBy,
                    message: `CRITICAL: Patient missed ${task.title} scheduled at ${missedTime}.`,
                    severity: 'critical',
                    isRead: false,
                    createdAt: new Date().toISOString()
                });
            }

            if (alertsToInsert.length > 0) {
                const { error: insertError } = await supabase
                    .from('alerts')
                    .insert(alertsToInsert);

                if (insertError) {
                    console.error(`Alert insert error for task ${task.title}:`, insertError.message);
                } else {
                    console.log(`Alerts created for task "${task.title}" — ${alertsToInsert.length} recipient(s).`);
                }
            }
        }
    } catch (error) {
        console.error('Error checking overdue tasks:', error.message);
    }
};

module.exports = { createTask, createPatientReminder, getTasks, completeTask, checkOverdueTasks };
