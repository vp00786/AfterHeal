import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, Pill, RefreshCw, Filter } from 'lucide-react';
import api from '../../api/axios';
import clsx from 'clsx';

const FILTERS = ['All', 'Completed', 'Missed', 'Pending'];

const CaregiverMedications = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeds = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/caregiver/medications');
                setTasks(data);
            } catch (err) {
                setError('Could not load medications.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMeds();
    }, []);

    const getStatus = (task) => {
        if (task.isCompleted) return 'completed';
        if (new Date(task.scheduledTime) < new Date()) return 'missed';
        return 'pending';
    };

    const filtered = filter === 'All' ? tasks : tasks.filter(t => getStatus(t) === filter.toLowerCase());

    // Group by date
    const grouped = filtered.reduce((acc, task) => {
        const date = new Date(task.scheduledTime).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' });
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
    }, {});

    const statusConfig = {
        completed: { icon: <CheckCircle2 className="h-5 w-5 text-white" />, bg: 'bg-emerald-500', card: 'border-emerald-100 bg-emerald-50/30', badge: 'bg-emerald-100 text-emerald-700' },
        missed: { icon: <AlertCircle className="h-5 w-5 text-white" />, bg: 'bg-red-400', card: 'border-red-100 bg-red-50/30', badge: 'bg-red-100 text-red-700' },
        pending: { icon: <Clock className="h-5 w-5 text-white" />, bg: 'bg-blue-400', card: 'border-gray-100 bg-white', badge: 'bg-blue-100 text-blue-700' },
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 pb-24">
            <header className="flex items-center mb-6">
                <button onClick={() => navigate('/dashboard')} className="p-2 mr-4 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Medication Timeline</h1>
                    <p className="text-gray-500 text-sm">Patient's complete task history</p>
                </div>
            </header>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={clsx(
                            "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                            filter === f ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20 text-gray-400">
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading...
                </div>
            ) : error ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-center">{error}</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <Pill className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-semibold">No tasks found</p>
                    <p className="text-sm mt-1">No {filter.toLowerCase()} tasks for this patient.</p>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto space-y-8">
                    {Object.entries(grouped).map(([date, dayTasks]) => (
                        <div key={date}>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{date}</h3>
                            <div className="space-y-3">
                                {dayTasks.map(task => {
                                    const st = getStatus(task);
                                    const cfg = statusConfig[st];
                                    return (
                                        <div key={task._id} className={clsx("flex gap-4 p-4 rounded-2xl border", cfg.card)}>
                                            <div className={clsx("flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center", cfg.bg)}>
                                                {cfg.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-bold text-gray-800 leading-tight">{task.title}</h4>
                                                    <span className={clsx("flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full", cfg.badge)}>{st}</span>
                                                </div>
                                                {task.description && <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>}
                                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(task.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                    {task.isCompleted && task.completedAt && (
                                                        <span className="text-emerald-600">
                                                            ✓ Completed {new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    )}
                                                    <span className={clsx("capitalize px-1.5 py-0.5 rounded text-[10px] font-bold",
                                                        task.priority === 'critical' ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                                                    )}>{task.priority}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CaregiverMedications;
