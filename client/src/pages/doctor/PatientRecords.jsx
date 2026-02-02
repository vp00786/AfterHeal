import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Eye, Lock } from "lucide-react";

const RECORDS = [
    { id: 1, title: 'Discharge Summary', type: 'PDF', date: '20 Oct 2023' },
    { id: 2, title: 'Blood Test Results (CBC)', type: 'PDF', date: '5 Nov 2023' },
    { id: 3, title: 'Prescription #4589', type: 'Digital', date: '12 Nov 2023' },
    { id: 4, title: 'MRI Scan Report', type: 'Imaging', date: '15 Nov 2023' },
];

const PatientRecords = () => {
    const navigate = useNavigate();

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
                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-64 p-2.5">
                            <option>Sarah Connor</option>
                            <option>John Doe</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {RECORDS.map(record => (
                        <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{record.title}</h4>
                                    <p className="text-xs text-gray-500">{record.type} • {record.date}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition">
                                    <Eye className="h-5 w-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                                    <Download className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PatientRecords;
