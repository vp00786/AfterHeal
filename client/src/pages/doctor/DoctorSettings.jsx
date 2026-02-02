import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DoctorSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">System Settings</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500">Profile and clinic preferences will appear here.</p>
            </div>
        </div>
    );
};
export default DoctorSettings;
