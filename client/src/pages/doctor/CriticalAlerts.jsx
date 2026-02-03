import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Check, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const INITIAL_ALERTS = [
    { id: 1, patient: 'Sarah Connor', issue: "Missed 'Post-Op Antibiotics' (2nd dose)", time: "20 mins ago", severity: 'critical' },
    { id: 2, patient: 'John Doe', issue: "Reported High Pain Level (8/10)", time: "1 hour ago", severity: 'critical' },
    { id: 3, patient: 'Linda Hamilton', issue: "Skipped Blood Pressure Check", time: "2 hours ago", severity: 'critical' },
];

const CriticalAlerts = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState(INITIAL_ALERTS);

    useEffect(() => {
        const resolved = JSON.parse(localStorage.getItem('resolvedAlerts') || '[]');
        if (resolved.length > 0) {
            setAlerts(prev => prev.filter(a => !resolved.includes(String(a.id))));
        }
    }, []);

    const handleDismiss = (id) => {
        // Persist dismissal
        const resolved = JSON.parse(localStorage.getItem('resolvedAlerts') || '[]');
        if (!resolved.includes(String(id))) {
            localStorage.setItem('resolvedAlerts', JSON.stringify([...resolved, String(id)]));
        }
        setAlerts(alerts.filter(a => a.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
            </button>

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                        Critical Alerts
                    </h1>
                    <p className="text-gray-500 mt-1">High-priority items requiring immediate attention.</p>
                </div>
                <span className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl text-sm">
                    {alerts.length} Active
                </span>
            </div>

            <div className="space-y-4 max-w-4xl">
                {alerts.map(alert => (
                    <div key={alert.id} className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-red-500 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-red-50 p-3 rounded-full hidden md:block">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{alert.patient}</h3>
                                <p className="text-gray-700 font-medium">{alert.issue}</p>
                                <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {alert.time}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 pl-12 md:pl-0">
                            <button
                                onClick={() => handleDismiss(alert.id)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-medium transition"
                            >
                                Review Later
                            </button>
                            <button
                                onClick={() => navigate(`/doctor/alerts/${alert.id}`)}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-sm transition flex items-center gap-2"
                            >
                                Act Now
                            </button>
                        </div>
                    </div>
                ))}

                {alerts.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 border-dashed">
                        <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">All Clear!</h3>
                        <p className="text-gray-500">No critical alerts pending review.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default CriticalAlerts;
