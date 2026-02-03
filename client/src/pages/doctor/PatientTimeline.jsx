import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Clock, CheckCircle, XCircle, AlertCircle, Calendar } from "lucide-react";
import { useState } from "react";

// Mock Data
const TIMELINE_DATA = [
    {
        id: 1, date: 'Today', tasks: [
            { id: 't1', time: '09:00 AM', name: 'Post-Op Antibiotics (500mg)', status: 'missed', priority: 'critical', type: 'medication' },
            { id: 't2', time: '08:00 AM', name: 'Blood Pressure Check', status: 'completed', priority: 'critical', type: 'vitals' },
            { id: 't3', time: '07:30 AM', name: 'Morning Stretching', status: 'completed', priority: 'routine', type: 'exercise' },
        ]
    },
    {
        id: 2, date: 'Yesterday (Oct 24)', tasks: [
            { id: 't4', time: '09:00 PM', name: 'Evening Pain Meds', status: 'completed', priority: 'critical', type: 'medication' },
            { id: 't5', time: '06:00 PM', name: 'Walk (15 mins)', status: 'missed', priority: 'routine', type: 'exercise' },
            { id: 't6', time: '09:00 AM', name: 'Post-Op Antibiotics', status: 'completed', priority: 'critical', type: 'medication' },
        ]
    },
    {
        id: 3, date: 'Oct 23', tasks: [
            { id: 't7', time: '09:00 AM', name: 'Post-Op Antibiotics', status: 'completed', priority: 'critical', type: 'medication' },
        ]
    }
];

const PatientTimeline = () => {
    const navigate = useNavigate();
    const { patientId } = useParams();
    // In real app, fetch patient details and tasks by ID

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
            case 'missed': return <XCircle className="h-5 w-5 text-red-500" />;
            default: return <AlertCircle className="h-5 w-5 text-amber-500" />;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-50 border-emerald-100 text-emerald-700';
            case 'missed': return 'bg-red-50 border-red-100 text-red-700';
            default: return 'bg-amber-50 border-amber-100 text-amber-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Overview
            </button>

            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sarah Connor</h1>
                    <p className="text-gray-500 flex items-center gap-2 mt-1">
                        <User className="h-4 w-4" /> Patient ID: #{patientId || '1024'}
                    </p>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-gray-900">Overall Adherence</div>
                    <div className="text-2xl font-bold text-emerald-600">84%</div>
                </div>
            </header>

            <div className="space-y-8 max-w-3xl mx-auto">
                {TIMELINE_DATA.map((day) => (
                    <div key={day.id} className="relative">
                        <div className="sticky top-20 z-10 bg-slate-50 py-2 mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> {day.date}
                            </h3>
                        </div>

                        <div className="space-y-4 pl-4 border-l-2 border-gray-200 ml-2">
                            {day.tasks.map((task) => (
                                <div key={task.id} className={`relative p-5 rounded-2xl border shadow-sm flex items-center justify-between group transition-all hover:shadow-md bg-white ${task.status === 'missed' ? 'border-red-100' : 'border-gray-100'}`}>

                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[25px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-4 border-slate-50 ${task.status === 'completed' ? 'bg-emerald-500' :
                                        task.status === 'missed' ? 'bg-red-500' : 'bg-amber-500'
                                        }`}></div>

                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${getStatusClass(task.status)} bg-opacity-50`}>
                                            {getStatusIcon(task.status)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-900">{task.name}</h4>
                                                {task.priority === 'critical' && (
                                                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        Critical
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Clock className="h-3 w-3" /> {task.time}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${getStatusClass(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientTimeline;
