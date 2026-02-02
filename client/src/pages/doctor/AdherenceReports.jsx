import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart2, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const ADHERENCE_DATA = [
    { id: 1, name: 'Sarah Connor', adherence: 45, status: 'critical', missed: 5 },
    { id: 2, name: 'John Doe', adherence: 98, status: 'good', missed: 0 },
    { id: 3, name: 'Emily Blunt', adherence: 72, status: 'warning', missed: 2 },
    { id: 4, name: 'Michael Smith', adherence: 88, status: 'good', missed: 1 },
    { id: 5, name: 'Linda Hamilton', adherence: 60, status: 'critical', missed: 4 },
];

const AdherenceReports = () => {
    const navigate = useNavigate();

    // Sort by adherence lowest first
    const sortedData = [...ADHERENCE_DATA].sort((a, b) => a.adherence - b.adherence);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Adherence Overview</h1>
                <p className="text-gray-500 mt-1">Real-time tracking of patient compliance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400 font-medium uppercase">Avg. Adherence</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">72.6%</p>
                    </div>
                    <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400 font-medium uppercase">Critical Patients</p>
                        <p className="text-3xl font-bold text-red-600 mt-1">2</p>
                    </div>
                    <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400 font-medium uppercase">On Track</p>
                        <p className="text-3xl font-bold text-emerald-600 mt-1">3</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-900">Patient Compliance Ranking</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {sortedData.map((patient) => (
                        <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${patient.status === 'critical' ? 'bg-red-100 text-red-600' :
                                        patient.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    {patient.adherence}%
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{patient.name}</h4>
                                    <p className="text-xs text-gray-500">{patient.missed} tasks missed this week</p>
                                </div>
                            </div>

                            <div className="w-32 md:w-64">
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${patient.status === 'critical' ? 'bg-red-500' :
                                                patient.status === 'warning' ? 'bg-amber-500' :
                                                    'bg-emerald-500'
                                            }`}
                                        style={{ width: `${patient.adherence}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default AdherenceReports;
