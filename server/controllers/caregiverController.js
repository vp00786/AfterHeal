const supabase = require('../config/supabaseClient');

// @desc    Get the patient linked to the logged-in caregiver
// @route   GET /api/caregiver/patient
// @access  Caregiver
const getLinkedPatient = async (req, res) => {
    try {
        const caregiverId = req.user._id;
        const relatedPatientId = req.user.relatedPatient;

        if (!relatedPatientId) {
            return res.status(404).json({ message: 'No patient linked to this caregiver account.' });
        }

        const { data: patient, error } = await supabase
            .from('users')
            .select('_id, name, email, role, assignedDoctor, createdAt')
            .eq('_id', relatedPatientId)
            .single();

        if (error || !patient) {
            return res.status(404).json({ message: 'Linked patient not found.' });
        }

        // Also get adherence stats: completed vs total tasks for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const { data: todayTasks } = await supabase
            .from('tasks')
            .select('isCompleted')
            .eq('patient', relatedPatientId)
            .gte('scheduledTime', today.toISOString())
            .lt('scheduledTime', tomorrow.toISOString());

        const total = todayTasks ? todayTasks.length : 0;
        const completed = todayTasks ? todayTasks.filter(t => t.isCompleted).length : 0;
        const adherence = total > 0 ? Math.round((completed / total) * 100) : null;

        res.json({ ...patient, todayStats: { total, completed, adherence } });
    } catch (error) {
        console.error('Get Linked Patient Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all notes written by caregiver for their linked patient
// @route   GET /api/caregiver/notes
// @access  Caregiver
const getCaregiverNotes = async (req, res) => {
    try {
        const caregiverId = req.user._id;

        const { data: notes, error } = await supabase
            .from('caregiver_notes')
            .select('*')
            .eq('caregiver', caregiverId)
            .order('createdAt', { ascending: false });

        if (error) throw error;

        res.json(notes);
    } catch (error) {
        console.error('Get Caregiver Notes Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a new caregiver note
// @route   POST /api/caregiver/notes
// @access  Caregiver
const addCaregiverNote = async (req, res) => {
    const { content } = req.body;

    if (!content || !content.trim()) {
        return res.status(400).json({ message: 'Note content is required.' });
    }

    try {
        const caregiverId = req.user._id;
        const patientId = req.user.relatedPatient;

        if (!patientId) {
            return res.status(400).json({ message: 'No linked patient found for this caregiver.' });
        }

        const { data: note, error } = await supabase
            .from('caregiver_notes')
            .insert([{
                _id: String(Date.now()),
                caregiver: caregiverId,
                patient: patientId,
                content: content.trim(),
                status: 'open',
                createdAt: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(note);
    } catch (error) {
        console.error('Add Caregiver Note Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Resolve / archive a caregiver note
// @route   PUT /api/caregiver/notes/:id
// @access  Caregiver
const resolveNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const caregiverId = req.user._id;

        // Verify ownership
        const { data: note, error: fetchError } = await supabase
            .from('caregiver_notes')
            .select('*')
            .eq('_id', noteId)
            .single();

        if (fetchError || !note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        if (note.caregiver !== caregiverId) {
            return res.status(403).json({ message: 'Not authorized to update this note.' });
        }

        const newStatus = note.status === 'open' ? 'resolved' : 'open';

        const { data: updated, error: updateError } = await supabase
            .from('caregiver_notes')
            .update({ status: newStatus })
            .eq('_id', noteId)
            .select()
            .single();

        if (updateError) throw updateError;

        res.json(updated);
    } catch (error) {
        console.error('Resolve Note Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all tasks for the caregiver's linked patient (for medication timeline)
// @route   GET /api/caregiver/medications
// @access  Caregiver
const getPatientMedications = async (req, res) => {
    try {
        const patientId = req.user.relatedPatient;

        if (!patientId) {
            return res.status(400).json({ message: 'No linked patient.' });
        }

        const { data: tasks, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('patient', patientId)
            .order('scheduledTime', { ascending: false });

        if (error) throw error;

        res.json(tasks);
    } catch (error) {
        console.error('Get Patient Medications Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getLinkedPatient, getCaregiverNotes, addCaregiverNote, resolveNote, getPatientMedications };
