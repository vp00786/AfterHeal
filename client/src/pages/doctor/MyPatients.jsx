import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, User, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_PATIENTS = [
    { id: '1', name: 'Sarah Connor', age: 45, condition: 'Post-Op Recovery', status: 'critical', adherence: 65, lastVisit: '2 days ago' },
    { id: '2', name: 'John Doe', age: 32, condition: 'Hypertension', status: 'good', adherence: 95, lastVisit: '1 week ago' },
    { id: '3', name: 'Emily Blunt', age: 28, condition: 'Physiotherapy', status: 'warning', adherence: 78, lastVisit: '3 days ago' },
    { id: '4', name: 'Michael Smith', age: 55, condition: 'Diabetes Type 2', status: 'good', adherence: 92, lastVisit: '5 days ago' },
    { id: '5', name: 'Linda Hamilton', age: 62, condition: 'Cardiac Rehab', status: 'critical', adherence: 58, lastVisit: '1 day ago' },
];

const MyPatients = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all"); // all, good, warning, critical
    const [patients, setPatients] = useState(MOCK_PATIENTS);

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || patient.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'good': return 'text-emerald-600 bg-emerald-100';
            case 'warning': return 'text-amber-600 bg-amber-100';
            case 'critical': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
                    <p className="text-gray-500 mt-1">Manage {patients.length} assigned patients</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search name or condition..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="good">On Track</option>
                        <option value="warning">Needs Attention</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                    <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => alert(`Open details for ${patient.name}`)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                                    {patient.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{patient.name}</h3>
                                    <p className="text-xs text-gray-500">ID: #{patient.id} • {patient.age} yrs</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(patient.status)}`}>
                                {patient.status}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Condition</span>
                                <span className="font-medium text-gray-900">{patient.condition}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Last Visit</span>
                                <span className="font-medium text-gray-900">{patient.lastVisit}</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Adherence</span>
                                    <span className="font-bold text-gray-900">{patient.adherence}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${patient.adherence > 90 ? 'bg-emerald-500' : patient.adherence > 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                                        style={{ width: `${patient.adherence}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredPatients.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400">No patients found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};
export default MyPatients;
