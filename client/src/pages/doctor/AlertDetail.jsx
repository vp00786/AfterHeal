import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, Phone, Activity } from "lucide-react";
import { useState } from "react";

// Mock Data Source (Replace with API fetch)
const ALERT_DETAILS = {
    '1': {
        id: '1',
        patientId: 'p1',
        patientName: 'Sarah Connor',
        age: 45,
        condition: 'Post-Op Recovery (ACL)',
        task: 'Post-Op Antibiotics',
        type: 'Medication',
        dosage: '500mg (Amoxicillin)',
        scheduledTime: 'Today, 09:00 AM',
        missedDuration: '4 hours ago',
        status: 'critical',
        adherenceRate: 65,
        recentMisses: 3,
        notes: 'Critical for preventing infection.'
    },
    '2': {
        id: '2',
        patientId: 'p2',
        patientName: 'John Doe',
        age: 32,
        condition: 'Chronic Pain Management',
        task: 'Pain Level Check-in',
        type: 'Vitals',
        dosage: 'N/A',
        scheduledTime: 'Today, 10:00 AM',
        missedDuration: '1 hour ago',
        status: 'critical',
        adherenceRate: 92,
        recentMisses: 1,
        notes: 'Required to adjust pain medication.'
    },
    '3': {
        id: '3',
        patientId: 'p3',
        patientName: 'Linda Hamilton',
        age: 62,
        condition: 'Hypertension',
        task: 'Blood Pressure Check',
        type: 'Vitals',
        dosage: 'N/A',
        scheduledTime: 'Today, 08:00 AM',
        missedDuration: '2 hours ago',
        status: 'critical',
        adherenceRate: 58,
        recentMisses: 4,
        notes: 'High risk of spike. Immediate check required.'
    },
    // Fallback for demo
    'default': {
        id: '0',
        patientName: 'Unknown Patient',
        patientId: 'unknown',
        age: 0,
        condition: 'Unknown',
        task: 'Unknown Task',
        type: 'Unknown',
        dosage: '',
        scheduledTime: '',
        missedDuration: '',
        status: 'warning',
        adherenceRate: 0,
        recentMisses: 0,
        notes: 'Alert not found.'
    }
};

const AlertDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reviewed, setReviewed] = useState(false);

    // In real app, fetch alert by ID
    const alertData = ALERT_DETAILS[id] || ALERT_DETAILS['default'];

    const handleMarkReviewed = () => {
        // Persist resolution to localStorage to update the list view
        if (id) {
            const resolved = JSON.parse(localStorage.getItem('resolvedAlerts') || '[]');
            if (!resolved.includes(id)) {
                localStorage.setItem('resolvedAlerts', JSON.stringify([...resolved, id]));
            }
        }

        setReviewed(true);
        setTimeout(() => {
            navigate('/doctor/alerts'); // Go back to list
        }, 1500);
    };

    if (reviewed) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-sm w-full">
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Alert Resolved</h2>
                    <p className="text-gray-500 mt-2">Returning to alert list...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back
            </button>

            <div className="max-w-3xl mx-auto space-y-6">

                {/* Section 1: Alert Summary */}
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                                    Critical Alert
                                </span>
                                <span className="text-red-600 text-sm font-medium flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> Missed {alertData.missedDuration}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Missed: {alertData.task}</h1>
                            <p className="text-gray-700 mt-1">Patient: <span className="font-bold">{alertData.patientName}</span></p>
                        </div>
                        <AlertTriangle className="h-10 w-10 text-red-500 opacity-20" />
                    </div>
                    <p className="mt-4 text-sm text-red-800 bg-red-100/50 p-3 rounded-lg border border-red-100">
                        ⚠️ <strong>Action Required:</strong> This task is critical for {alertData.condition.toLowerCase()}. Missed doses may lead to complications.
                    </p>
                </div>

                {/* Section 2: Patient Context */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Patient Snapshot</h3>
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl font-bold text-slate-500">
                            {alertData.patientName.charAt(0)}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-900">{alertData.patientName}</h2>
                            <p className="text-sm text-gray-500">{alertData.age} years • {alertData.condition}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${alertData.adherenceRate < 70 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    Adherence: {alertData.adherenceRate}%
                                </span>
                                <span className="text-xs text-gray-400">{alertData.recentMisses} recent misses</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Task Details */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Task Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Type</span>
                                <span className="font-medium text-gray-900">{alertData.type}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Dosage/Instruction</span>
                                <span className="font-medium text-gray-900">{alertData.dosage}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-500">Scheduled Time</span>
                                <span className="font-medium text-gray-900">{alertData.scheduledTime}</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-500 italic">
                                "{alertData.notes}"
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Actions */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Doctor Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/doctor/prescriptions')} // Theoretically pre-fill patient
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors"
                            >
                                <FileText className="h-4 w-4" /> Modify Prescription
                            </button>
                            <button
                                onClick={() => navigate('/doctor/adherence')}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors"
                            >
                                <Activity className="h-4 w-4" /> View Full History
                            </button>
                            <button
                                onClick={handleMarkReviewed}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:scale-[1.02]"
                            >
                                <CheckCircle className="h-4 w-4" /> Mark as Reviewed
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AlertDetail;
