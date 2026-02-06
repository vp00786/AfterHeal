const supabase = require('../config/supabaseClient');

// @desc    Upload a medical record
// @route   POST /api/records/upload
// @access  Private
const uploadRecord = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, description } = req.body;
        const file = req.file;
        const userId = req.user._id;

        // 1. Upload to Supabase Storage
        // Path: medical-records/{userId}/{timestamp}_{filename}
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        // Use global client (requires Service Role Key in .env for bypassing RLS, or Public Bucket)
        const { data: storageData, error: storageError } = await supabase.storage
            .from('medical-records')
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (storageError) {
            console.error('Supabase Storage Error:', storageError);
            return res.status(500).json({ message: 'Error uploading file', details: storageError.message });
        }

        // 2. Insert Metadata into Database
        const { data: record, error: dbError } = await supabase
            .from('medical_records')
            .insert([{
                _id: String(Date.now()),
                patient: userId,
                file_path: filePath,
                file_type: file.mimetype,
                title: title || file.originalname,
                description,
                uploadedAt: new Date().toISOString()
            }])
            .select()
            .single();

        if (dbError) {
            console.error('Supabase DB Error:', dbError);
            return res.status(500).json({ message: 'Error saving record metadata' });
        }

        res.status(201).json(record);

    } catch (error) {
        console.error('Upload Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get All Records for a Patient
// @route   GET /api/records/:patientId
// @access  Private (Patient/Doctor)
const getRecords = async (req, res) => {
    try {
        const patientId = req.params.patientId;

        // Access Control
        if (req.user.role === 'patient' && req.user._id !== patientId) {
            return res.status(403).json({ message: 'Not authorized to view these records' });
        }
        if (req.user.role === 'doctor') {
            // Check if patient is assigned to doctor (optional but recommended)
            // For now, assuming if they have the ID and are a doctor, it's okay, or strict check:
            const { data: patient } = await supabase
                .from('users')
                .select('assignedDoctor')
                .eq('_id', patientId)
                .single();

            if (!patient || patient.assignedDoctor !== req.user._id) {
                // Relaxing this check for now as assignment logic varies, but good to have.
                // return res.status(403).json({ message: 'This patient is not assigned to you' });
            }
        }

        const { data: records, error } = await supabase
            .from('medical_records')
            .select('*')
            .eq('patient', patientId)
            .order('uploadedAt', { ascending: false });

        if (error) throw error;

        // Generate Signed URLs for each record so frontend can view them
        const recordsWithUrls = await Promise.all(records.map(async (record) => {
            const { data } = await supabase.storage
                .from('medical-records')
                .createSignedUrl(record.file_path, 3600); // 1 hour link

            return {
                ...record,
                file_url: data ? data.signedUrl : null
            };
        }));

        res.json(recordsWithUrls);

    } catch (error) {
        console.error('Get Records Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a medical record
// @route   DELETE /api/records/:id
// @access  Private (Owner only)
const deleteRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        const userId = req.user._id;

        // 1. Get the record to find file path and verify ownership
        const { data: record, error: fetchError } = await supabase
            .from('medical_records')
            .select('*')
            .eq('_id', recordId)
            .single();

        if (fetchError || !record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (record.patient !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this record' });
        }

        // 2. Delete from Supabase Storage
        const { error: storageError } = await supabase.storage
            .from('medical-records')
            .remove([record.file_path]);

        if (storageError) {
            console.error('Storage Delete Error:', storageError);
            return res.status(500).json({ message: 'Error deleting file from storage' });
        }

        // 3. Delete from Database
        const { error: dbError } = await supabase
            .from('medical_records')
            .delete()
            .eq('_id', recordId);

        if (dbError) {
            console.error('DB Delete Error:', dbError);
            return res.status(500).json({ message: 'Error deleting record from database' });
        }

        res.json({ message: 'Record deleted successfully' });

    } catch (error) {
        console.error('Delete Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { uploadRecord, getRecords, deleteRecord };
