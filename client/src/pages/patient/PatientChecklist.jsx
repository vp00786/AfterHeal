import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, Clock, AlertTriangle, Pill, Activity, RefreshCw } from "lucide-react";
import api from "../../api/axios";
import clsx from "clsx";

const PatientChecklist = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completing, setCompleting] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
            setError("Could not load your tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleComplete = async (taskId) => {
        if (completing) return;
        setCompleting(taskId);
        try {
            const { data: updated } = await api.put(`/tasks/${taskId}/complete`);
            setTasks(prev => prev.map(t => t._id === taskId ? updated : t));
        } catch (err) {
            console.error("Failed to complete task", err);
        } finally {
            setCompleting(null);
        }
    };

    const getStatus = (task) => {
        if (task.isCompleted) return 'completed';
        if (new Date(task.scheduledTime) < new Date()) return 'missed';
        return 'pending';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'border-emerald-200 bg-emerald-50';
            case 'missed': return 'border-red-200 bg-red-50';
            default: return 'border-gray-100 bg-white hover:shadow-md border-l-4 border-l-amber-400';
        }
    };

    const getIcon = (type) => {
        if (type === 'medication') return <Pill className="h-5 w-5" />;
        return <Activity className="h-5 w-5" />;
    };

    const allDone = tasks.length > 0 && tasks.every(t => t.isCompleted);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-gray-500 flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Loading your tasks...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans pb-24">
            <header className="flex items-center mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 mr-4 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">Today's Checklist</h1>
                    <p className="text-gray-500 text-sm">Stay on track with your recovery.</p>
                </div>
                <button onClick={fetchTasks} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-500 transition-colors">
                    <RefreshCw className="h-5 w-5" />
                </button>
            </header>

            {error && (
                <div className="max-w-lg mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm text-center">
                    {error}
                </div>
            )}

            <div className="space-y-4 max-w-lg mx-auto">
                {tasks.length === 0 && !error ? (
                    <div className="text-center py-16 text-gray-400">
                        <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-semibold">No tasks assigned yet.</p>
                        <p className="text-sm mt-1">Your doctor hasn't added any tasks for you.</p>
                    </div>
                ) : (
                    tasks.map((task) => {
                        const status = getStatus(task);
                        return (
                            <div
                                key={task._id}
                                className={clsx(
                                    "relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 shadow-sm",
                                    getStatusColor(status)
                                )}
                            >
                                {task.priority === 'critical' && status !== 'completed' && (
                                    <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                                        Critical
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleComplete(task._id)}
                                        disabled={status === 'missed' || status === 'completed' || completing === task._id}
                                        className={clsx(
                                            "flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center transition-all",
                                            status === 'completed' ? "bg-emerald-500 text-white shadow-emerald-200" :
                                                status === 'missed' ? "bg-red-100 text-red-400 cursor-not-allowed" :
                                                    "bg-white border-2 border-gray-200 text-gray-300 hover:border-emerald-400 hover:text-emerald-400"
                                        )}
                                    >
                                        {completing === task._id ? <RefreshCw className="h-6 w-6 animate-spin" /> :
                                            status === 'completed' ? <CheckCircle className="h-8 w-8" /> :
                                                status === 'missed' ? <AlertTriangle className="h-6 w-6" /> :
                                                    <Circle className="h-8 w-8" />}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {new Date(task.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <h3 className={clsx(
                                            "text-lg font-bold leading-tight",
                                            status === 'completed' ? "text-gray-500 line-through decoration-emerald-500/50" : "text-gray-900",
                                            status === 'missed' && "text-red-700"
                                        )}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                                                task.type === 'medication' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                            )}>
                                                {getIcon(task.type)} {task.type}
                                            </span>
                                            <span className={clsx(
                                                "text-xs font-bold capitalize px-2 py-0.5 rounded-full",
                                                status === 'completed' ? "bg-emerald-100 text-emerald-700" :
                                                    status === 'missed' ? "bg-red-100 text-red-700" :
                                                        "bg-amber-100 text-amber-700"
                                            )}>
                                                {status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}

                {allDone && (
                    <div className="mt-8 p-6 text-center bg-emerald-500 text-white rounded-3xl shadow-xl shadow-emerald-500/20">
                        <CheckCircle className="h-12 w-12 mx-auto mb-2 text-emerald-100" />
                        <h2 className="text-2xl font-bold">All Tasks Complete!</h2>
                        <p className="text-emerald-100">Great job today. Keep it up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientChecklist;
