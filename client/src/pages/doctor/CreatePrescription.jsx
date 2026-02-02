import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Clock, AlertTriangle } from "lucide-react";

// Mock Patients
const PATIENTS = [
    { id: '1', name: 'Sarah Connor' },
    { id: '2', name: 'John Doe' },
    { id: '3', name: 'Emily Blunt' },
];

const CreatePrescription = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        patientId: '',
        medicationName: '',
        dosage: '',
        frequency: '',
        duration: '',
        priority: 'non-critical',
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Prescription saved successfully! Tasks synced with patient dashboard.");
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
            </button>

            <div className="max-w-3xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create Prescription</h1>
                    <p className="text-gray-500 mt-1">Assign medications and recovery tasks to patients.</p>
                </header>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8 space-y-8">

                        {/* Patient Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Select Patient</label>
                            <select
                                required
                                className="input-field"
                                value={formData.patientId}
                                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                            >
                                <option value="">-- Choose Patient --</option>
                                {PATIENTS.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Medication Details */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Plus className="h-5 w-5 text-primary-500" /> Medication Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Amoxicillin"
                                        className="input-field"
                                        value={formData.medicationName}
                                        onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: 500mg"
                                        className="input-field"
                                        value={formData.dosage}
                                        onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Twice daily"
                                        className="input-field"
                                        value={formData.frequency}
                                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: 7 days"
                                        className="input-field"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                                    <select
                                        className="input-field"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    >
                                        <option value="non-critical">Routine (Standard)</option>
                                        <option value="critical">Critical (High Alert)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions / Notes</label>
                            <textarea
                                className="input-field h-32 resize-none"
                                placeholder="Take after meals. Avoid alcohol..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
                        <span className="text-xs text-gray-500">
                            <AlertTriangle className="inline h-4 w-4 mr-1 text-amber-500" />
                            Critical tasks trigger immediate alerts.
                        </span>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">Cancel</button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2"
                            >
                                {loading ? 'Saving...' : <><Save className="h-4 w-4" /> Save Prescription</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreatePrescription;
