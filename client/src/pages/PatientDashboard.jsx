import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, LogOut, Pill, Activity, Sun, Upload, FileText, Stethoscope, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleComplete = async (taskId) => {
        try {
            await api.put(`/tasks/${taskId}/complete`);
            setTasks(tasks.map(t => t._id === taskId ? { ...t, isCompleted: true, completedAt: new Date() } : t));
        } catch (error) {
            console.error("Failed to complete task", error);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getIcon = (type) => {
        if (type === 'medication') return <Pill className="h-6 w-6 text-white" />;
        return <Activity className="h-6 w-6 text-white" />;
    };

    const getTypeColor = (type) => {
        if (type === 'medication') return 'bg-blue-500';
        return 'bg-secondary';
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="bg-white shadow-soft sticky top-0 z-20">
                <div className="max-w-xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                            <Sun className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 leading-none">Good Day,</h1>
                            <p className="text-slate-500 text-lg">{user.name.split(' ')[0]}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-red-500"
                        aria-label="Logout"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6 max-w-xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Your Plan</h2>
                        <span className="text-slate-500 text-sm font-medium">
                            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/patient/checklist')}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors"
                    >
                        View Checklist
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
                        <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-12 w-12 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">All Clear!</h3>
                        <p className="text-gray-500 mt-2">No tasks assigned for today. Relax.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {tasks.map(task => (
                                <motion.div
                                    key={task._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    layout
                                    className={clsx(
                                        "relative overflow-hidden rounded-3xl p-6 shadow-card transition-all duration-300",
                                        task.isCompleted ? "bg-slate-100 border border-slate-200" : "bg-white border border-transparent"
                                    )}
                                >
                                    {/* Critical Banner */}
                                    {task.priority === 'critical' && !task.isCompleted && (
                                        <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-bl-xl">
                                            IMPORTANT
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4">
                                        {/* Icon Box */}
                                        <div className={clsx(
                                            "flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center shadow-md",
                                            task.isCompleted ? "bg-slate-300" : getTypeColor(task.type)
                                        )}>
                                            {getIcon(task.type)}
                                        </div>

                                        <div className="flex-1 min-w-0 pt-1">
                                            <div className="flex items-center text-slate-500 text-sm font-medium mb-1">
                                                <Clock className="w-4 h-4 mr-1.5" />
                                                {formatDate(task.scheduledTime)}
                                            </div>
                                            <h3 className={clsx(
                                                "text-xl font-bold truncate leading-tight",
                                                task.isCompleted ? "text-slate-400 line-through" : "text-slate-900"
                                            )}>
                                                {task.title}
                                            </h3>
                                            {task.description && (
                                                <p className="text-slate-500 text-sm mt-1 line-clamp-2">{task.description}</p>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => !task.isCompleted && handleComplete(task._id)}
                                            disabled={task.isCompleted}
                                            className={clsx(
                                                "flex-shrink-0 ml-2 h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90",
                                                task.isCompleted ? "text-emerald-500 bg-emerald-50" : "text-gray-200 hover:text-primary-600 hover:bg-blue-50"
                                            )}
                                            aria-label={task.isCompleted ? "Completed" : "Mark as Complete"}
                                        >
                                            {task.isCompleted ? (
                                                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                                                    <CheckCircle2 className="w-12 h-12" />
                                                </motion.div>
                                            ) : (
                                                <Circle className="w-12 h-12 stroke-2" />
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* My Care Team Section */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">My Care Team</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div
                            onClick={() => navigate('/patient/doctor/d1')}
                            className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-emerald-100 h-12 w-12 rounded-full flex items-center justify-center text-emerald-600">
                                    <Stethoscope className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Dr. Emily Chen</h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Orthopedics</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-full">
                                    3 active
                                </span>
                                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/patient/doctor/d2')}
                            className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center text-blue-600">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Dr. Michael Ross</h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Cardiology</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                                    2 active
                                </span>
                                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Reports Section */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Upload Medical Reports</h2>

                    <div className="bg-white p-6 rounded-3xl border border-dashed border-gray-300 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-900">Tap to Upload</h3>
                        <p className="text-sm text-gray-500 mt-1">Prescriptions, Lab Results, or X-Rays</p>
                        <input type="file" className="hidden" />
                    </div>

                    <div className="mt-4 space-y-3">
                        {/* Mock Recent Upload */}
                        <div className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-100">
                            <div className="bg-purple-100 p-3 rounded-xl">
                                <FileText className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-sm">Blood_Test_Results.pdf</h4>
                                <p className="text-xs text-gray-500">Uploaded Today, 10:30 AM</p>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                Sent
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PatientDashboard;
