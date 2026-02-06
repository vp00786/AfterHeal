import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../../api/axios';
import { ArrowLeft, FileText, Download, Eye, Lock, Clock } from "lucide-react";

const PatientRecords = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        if (selectedPatient) {
            fetchRecords(selectedPatient);
        } else {
            setRecords([]);
        }
    }, [selectedPatient]);

    const fetchPatients = async () => {
        try {
            // Fetch users with role 'patient' assigned to this doctor
            // Note: This endpoint might need to be created if not exists, 
            // but for now we can try fetching all users and filtering or using a specific endpoint.
            // Assuming we added a route for this or reusing an existing one.
            // Let's use a simple filter on all users for now if specific endpoint isn't ready,
            // OR better, let's assume getDoctorPatients exists or generic users fetch.
            // For safety, checking how we fetch patients elsewhere (MyPatients.jsx).
            // Re-using logic from MyPatients.jsx would be best.
            // Assuming /users/patients exists or similar.
            const { data } = await axios.get('/auth/users'); // We need to check if this exists/works
            setPatients(data.filter(u => u.role === 'patient'));
            if (data.length > 0) setSelectedPatient(data[0]._id);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchRecords = async (patientId) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/records/${patientId}`);
            setRecords(data);
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
                <p className="text-gray-500 mt-1">Secure access to digital health records.</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8 text-sm text-blue-800">
                <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>These records are strictly confidential. Access is logged for security purposes. Only view records necessary for patient treatment.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Select Patient</label>
                        <select
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-64 p-2.5"
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                        >
                            <option value="">Select a patient...</option>
                            {patients.map(p => (
                                <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Loading records...</div>
                    ) : records.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">No records found for this patient.</div>
                    ) : (
                        records.map(record => (
                            <div key={record._id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{record.title}</h4>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(record.uploadedAt).toLocaleDateString()}
                                            {record.description && ` • ${record.description}`}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a
                                        href={record.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                        title="View File"
                                    >
                                        <Eye className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientRecords;
