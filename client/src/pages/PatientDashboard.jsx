import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, LogOut, Pill, Activity, Sun } from 'lucide-react';
import clsx from 'clsx';

const PatientDashboard = () => {
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
                <div className="flex justify-between items-baseline mb-2">
                    <h2 className="text-2xl font-bold text-slate-800">Your Plan</h2>
                    <span className="text-slate-500 text-sm font-medium">
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </span>
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
            </main>
        </div>
    );
};

export default PatientDashboard;
