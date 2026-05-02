const supabase = require('../config/supabaseClient');

// @desc    Upload a medical record
// @route   POST /api/records/upload
// @access  Private (Patient only)
const uploadRecord = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, description } = req.body;
        const file = req.file;
        const userId = req.user._id;

        // 1. Upload to Supabase Storage
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

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
// @access  Private (Patient sees own / Doctor sees only records they have access to)
const getRecords = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const requesterId = req.user._id;
        const requesterRole = req.user.role;

        // Patients can only view their own records
        if (requesterRole === 'patient' && requesterId !== patientId) {
            return res.status(403).json({ message: 'Not authorized to view these records' });
        }

        // Doctors can only view records they were explicitly granted access to
        if (requesterRole === 'doctor') {
            // Get list of record_ids this doctor has access to for this patient
            const { data: accessRows, error: accessError } = await supabase
                .from('document_access')
                .select('record_id')
                .eq('patient_id', patientId)
                .eq('doctor_id', requesterId);

            if (accessError) throw accessError;

            if (!accessRows || accessRows.length === 0) {
                return res.json([]); // No access to any documents
            }

            const allowedRecordIds = accessRows.map(a => a.record_id);

            // Fetch only the allowed records
            const { data: records, error } = await supabase
                .from('medical_records')
                .select('*')
                .eq('patient', patientId)
                .in('_id', allowedRecordIds)
                .order('uploadedAt', { ascending: false });

            if (error) throw error;

            // Generate signed URLs
            const recordsWithUrls = await Promise.all(records.map(async (record) => {
                const { data } = await supabase.storage
                    .from('medical-records')
                    .createSignedUrl(record.file_path, 3600);

                return {
                    ...record,
                    file_url: data ? data.signedUrl : null
                };
            }));

            return res.json(recordsWithUrls);
        }

        // Patient fetching their own records — return all
        const { data: records, error } = await supabase
            .from('medical_records')
            .select('*')
            .eq('patient', patientId)
            .order('uploadedAt', { ascending: false });

        if (error) throw error;

        const recordsWithUrls = await Promise.all(records.map(async (record) => {
            const { data } = await supabase.storage
                .from('medical-records')
                .createSignedUrl(record.file_path, 3600);

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

// @desc    Delete a medical record (Patient only)
// @route   DELETE /api/records/:id
// @access  Private (Patient/Owner only)
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

        // 3. Delete from Database (cascades to document_access)
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

// @desc    Update a medical record's metadata (title / description)
// @route   PATCH /api/records/:id
// @access  Private (Patient/Owner only)
const updateRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        const userId = req.user._id;
        const { title, description } = req.body;

        if (!title && description === undefined) {
            return res.status(400).json({ message: 'Nothing to update. Provide title or description.' });
        }

        const { data: record, error: fetchError } = await supabase
            .from('medical_records')
            .select('*')
            .eq('_id', recordId)
            .maybeSingle();

        if (fetchError) throw fetchError;
        if (!record) return res.status(404).json({ message: 'Record not found' });
        if (record.patient !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this record' });
        }

        const updates = {};
        if (title !== undefined) updates.title = title.trim();
        if (description !== undefined) updates.description = description.trim();

        const { data: updated, error: updateError } = await supabase
            .from('medical_records')
            .update(updates)
            .eq('_id', recordId)
            .select()
            .single();

        if (updateError) throw updateError;

        res.json(updated);
    } catch (error) {
        console.error('Update Record Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Grant a doctor access to a specific document
// @route   POST /api/records/:id/access
// @access  Private (Patient/Owner only)
const grantAccess = async (req, res) => {
    try {
        const recordId = req.params.id;
        const patientId = req.user._id;
        const { doctorId } = req.body;

        if (!doctorId) {
            return res.status(400).json({ message: 'doctorId is required' });
        }

        // Verify the record belongs to this patient
        const { data: record, error: recordError } = await supabase
            .from('medical_records')
            .select('_id, patient')
            .eq('_id', recordId)
            .maybeSingle();

        if (recordError) throw recordError;
        if (!record) return res.status(404).json({ message: 'Record not found' });
        if (record.patient !== patientId) {
            return res.status(403).json({ message: 'Not authorized to share this record' });
        }

        // Verify the target user is actually a doctor
        const { data: doctor, error: doctorError } = await supabase
            .from('users')
            .select('_id, name, role')
            .eq('_id', doctorId)
            .maybeSingle();

        if (doctorError) throw doctorError;
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(400).json({ message: 'Target user is not a doctor' });
        }

        // Insert into document_access (ignore conflict if already granted)
        const { data: access, error: insertError } = await supabase
            .from('document_access')
            .upsert([{
                _id: `${recordId}_${doctorId}`,
                record_id: recordId,
                patient_id: patientId,
                doctor_id: doctorId,
                granted_at: new Date().toISOString()
            }], { onConflict: '_id' })
            .select()
            .single();

        if (insertError) throw insertError;

        res.status(201).json({ message: `Access granted to Dr. ${doctor.name}`, access });

    } catch (error) {
        console.error('Grant Access Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Revoke a doctor's access to a specific document
// @route   DELETE /api/records/:id/access/:doctorId
// @access  Private (Patient/Owner only)
const revokeAccess = async (req, res) => {
    try {
        const recordId = req.params.id;
        const doctorId = req.params.doctorId;
        const patientId = req.user._id;

        // Verify ownership
        const { data: record, error: recordError } = await supabase
            .from('medical_records')
            .select('_id, patient')
            .eq('_id', recordId)
            .maybeSingle();

        if (recordError) throw recordError;
        if (!record) return res.status(404).json({ message: 'Record not found' });
        if (record.patient !== patientId) {
            return res.status(403).json({ message: 'Not authorized to manage access for this record' });
        }

        const { error: deleteError } = await supabase
            .from('document_access')
            .delete()
            .eq('record_id', recordId)
            .eq('doctor_id', doctorId);

        if (deleteError) throw deleteError;

        res.json({ message: 'Access revoked successfully' });

    } catch (error) {
        console.error('Revoke Access Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get the list of doctors who have access to a specific document
// @route   GET /api/records/:id/access
// @access  Private (Patient/Owner only)
const getAccessList = async (req, res) => {
    try {
        const recordId = req.params.id;
        const patientId = req.user._id;

        // Verify ownership
        const { data: record, error: recordError } = await supabase
            .from('medical_records')
            .select('_id, patient')
            .eq('_id', recordId)
            .maybeSingle();

        if (recordError) throw recordError;
        if (!record) return res.status(404).json({ message: 'Record not found' });
        if (record.patient !== patientId) {
            return res.status(403).json({ message: 'Not authorized to view access list for this record' });
        }

        // Get access rows
        const { data: accessRows, error: accessError } = await supabase
            .from('document_access')
            .select('_id, doctor_id, granted_at')
            .eq('record_id', recordId);

        if (accessError) throw accessError;

        if (!accessRows || accessRows.length === 0) {
            return res.json([]);
        }

        // Fetch doctor info for each access row
        const doctorIds = accessRows.map(a => a.doctor_id);
        const { data: doctors, error: doctorsError } = await supabase
            .from('users')
            .select('_id, name, email')
            .in('_id', doctorIds);

        if (doctorsError) throw doctorsError;

        const doctorMap = {};
        (doctors || []).forEach(d => { doctorMap[d._id] = d; });

        const result = accessRows.map(a => ({
            ...a,
            doctor: doctorMap[a.doctor_id] || null
        }));

        res.json(result);

    } catch (error) {
        console.error('Get Access List Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get patients who have granted the requesting doctor access to at least one document
// @route   GET /api/records/accessible-patients
// @access  Private (Doctor only)
const getAccessiblePatients = async (req, res) => {
    try {
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Only doctors can access this endpoint' });
        }

        const doctorId = req.user._id;

        // Find all unique patient_ids that granted access to this doctor
        const { data: accessRows, error: accessError } = await supabase
            .from('document_access')
            .select('patient_id, granted_at')
            .eq('doctor_id', doctorId);

        if (accessError) throw accessError;

        if (!accessRows || accessRows.length === 0) {
            return res.json([]);
        }

        // Unique patient IDs
        const uniquePatientIds = [...new Set(accessRows.map(a => a.patient_id))];

        // Fetch patient info
        const { data: patients, error: patientsError } = await supabase
            .from('users')
            .select('_id, name, email, role')
            .in('_id', uniquePatientIds)
            .eq('role', 'patient');

        if (patientsError) throw patientsError;

        res.json(patients || []);

    } catch (error) {
        console.error('Get Accessible Patients Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    uploadRecord,
    getRecords,
    deleteRecord,
    updateRecord,
    grantAccess,
    revokeAccess,
    getAccessList,
    getAccessiblePatients
};
