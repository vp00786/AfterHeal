import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Heart, LogOut, CheckCircle2, XCircle, AlertCircle, Clock, CalendarHeart } from 'lucide-react';
import clsx from 'clsx';

const CaregiverDashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.isCompleted).length,
        missed: tasks.filter(t => !t.isCompleted && new Date(t.scheduledTime) < new Date()).length
    };

    return (
        <div className="min-h-screen bg-pink-50/30">
            <nav className="bg-white px-6 py-4 shadow-sm border-b border-pink-100 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <div className="bg-pink-100 p-2 rounded-full">
                        <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
                    </div>
                    <span className="tracking-tight">Caregiver Portal</span>
                </h1>
                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut className="h-6 w-6" />
                </button>
            </nav>

            <main className="max-w-3xl mx-auto p-6 space-y-8">

                {/* Stats Section */}
                <section className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">Assignments</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-emerald-600">{stats.completed}</div>
                        <div className="text-xs text-emerald-600/70 uppercase font-bold tracking-wider mt-1">Completed</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className={clsx("text-3xl font-bold", stats.missed > 0 ? "text-red-500" : "text-gray-400")}>{stats.missed}</div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">Missed</div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="bg-white rounded-3xl shadow-card p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                        <CalendarHeart className="text-pink-500" />
                        <h2 className="text-xl font-bold text-gray-800">Patient Timeline</h2>
                    </div>

                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {loading ? <div className="text-center py-10 text-gray-400">Loading timeline...</div> : tasks.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">No linked patient data found.</div>
                        ) : (
                            tasks.map(task => {
                                const isMissed = !task.isCompleted && new Date(task.scheduledTime) < new Date();
                                return (
                                    <div key={task._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        {/* Timeline Dot */}
                                        <div className={clsx(
                                            "flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow bg-slate-200 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10",
                                            task.isCompleted ? "bg-emerald-500" : isMissed ? "bg-red-500" : "bg-blue-400"
                                        )}>
                                            {task.isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> :
                                                isMissed ? <AlertCircle className="w-5 h-5 text-white" /> :
                                                    <Clock className="w-5 h-5 text-white" />}
                                        </div>

                                        {/* Card */}
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-1">
                                                <time className="font-heading font-bold text-sm text-gray-500">
                                                    {new Date(task.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </time>
                                                {isMissed && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">MISSED</span>}
                                            </div>
                                            <div className="text-slate-800 font-bold text-lg leading-tight">{task.title}</div>
                                            <div className="text-slate-500 text-sm mt-1">{task.isCompleted ? `Completed at ${new Date(task.completedAt).toLocaleTimeString()}` : 'Pending completion'}</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CaregiverDashboard;
