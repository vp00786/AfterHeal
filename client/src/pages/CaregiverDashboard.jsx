import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart, LogOut, User, Pill, StickyNote, Bell,
    CheckCircle2, AlertCircle, Clock, TrendingUp, ChevronRight, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import clsx from 'clsx';

const NavCard = ({ icon, title, desc, path, color, badge }) => {
    const navigate = useNavigate();
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(path)}
            className="w-full bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-left hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
                        {icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-800">{title}</p>
                            {badge > 0 && (
                                <span className="h-5 min-w-5 px-1.5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                                    {badge}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300" />
            </div>
        </motion.button>
    );
};

const CaregiverDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [patientRes, alertsRes, tasksRes] = await Promise.allSettled([
                api.get('/caregiver/patient'),
                api.get('/alerts'),
                api.get('/caregiver/medications'),
            ]);
            if (patientRes.status === 'fulfilled') setPatient(patientRes.value.data);
            if (alertsRes.status === 'fulfilled') setAlerts(alertsRes.value.data);
            if (tasksRes.status === 'fulfilled') setTasks(tasksRes.value.data);
        } catch (err) {
            console.error('Dashboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const unreadAlerts = alerts.filter(a => !a.isRead).length;
    const missedDoses = alerts.filter(a =>
        !a.isRead && (a.severity === 'critical' || a.message?.toLowerCase().includes('missed'))
    ).length;

    const todayStats = patient?.todayStats;
    const adherence = todayStats?.adherence;

    const recentAlerts = alerts.slice(0, 3);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navbar */}
            <nav className="bg-white px-6 py-4 shadow-sm border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-2 rounded-full">
                        <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-gray-900 leading-none">Caregiver Portal</h1>
                        <p className="text-xs text-gray-400 mt-0.5">{user?.name}</p>
                    </div>
                </div>
                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                    <LogOut className="h-5 w-5" />
                </button>
            </nav>

            <main className="max-w-2xl mx-auto p-6 space-y-6 pb-16">

                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-400">
                        <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading your dashboard...
                    </div>
                ) : (
                    <>
                        {/* Patient Banner */}
                        {patient ? (
                            <motion.section
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-6 shadow-lg shadow-blue-200"
                            >
                                <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Caring For</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-black">
                                            {patient.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black leading-none">{patient.name}</h2>
                                            <p className="text-blue-200 text-sm mt-1">{patient.email}</p>
                                        </div>
                                    </div>
                                    {todayStats && (
                                        <div className="text-right">
                                            <div className={clsx(
                                                "text-3xl font-black",
                                                adherence >= 80 ? "text-emerald-300" : adherence >= 50 ? "text-amber-200" : "text-red-200"
                                            )}>
                                                {adherence ?? 0}%
                                            </div>
                                            <p className="text-blue-200 text-xs">adherence today</p>
                                        </div>
                                    )}
                                </div>
                            </motion.section>
                        ) : (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-700 text-sm text-center">
                                No patient linked to your account. Please contact your administrator.
                            </div>
                        )}

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'Tasks Today', value: todayStats?.total ?? '—', color: 'text-gray-800' },
                                { label: 'Completed', value: todayStats?.completed ?? '—', color: 'text-emerald-600' },
                                { label: 'Unread Alerts', value: unreadAlerts, color: unreadAlerts > 0 ? 'text-red-500' : 'text-gray-400' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                                    <div className={clsx("text-2xl font-black", stat.color)}>{stat.value}</div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1 leading-tight">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Cards */}
                        <section>
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Manage</h2>
                            <div className="space-y-3">
                                <NavCard
                                    icon={<User className="h-6 w-6 text-blue-600" />}
                                    title="Patient Overview"
                                    desc="Full profile & compliance"
                                    path="/caregiver/overview"
                                    color="bg-blue-50"
                                />
                                <NavCard
                                    icon={<Pill className="h-6 w-6 text-emerald-600" />}
                                    title="Medication Timeline"
                                    desc="Track all doses and tasks"
                                    path="/caregiver/medications"
                                    color="bg-emerald-50"
                                />
                                <NavCard
                                    icon={<StickyNote className="h-6 w-6 text-purple-600" />}
                                    title="Care Notes"
                                    desc="Document patient observations"
                                    path="/caregiver/notes"
                                    color="bg-purple-50"
                                />
                                <NavCard
                                    icon={<Bell className="h-6 w-6 text-orange-500" />}
                                    title="Alerts"
                                    desc="Missed doses & notifications"
                                    path="/caregiver/alerts"
                                    color="bg-orange-50"
                                    badge={unreadAlerts}
                                />
                            </div>
                        </section>

                        {/* Recent Alerts Preview */}
                        {recentAlerts.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Alerts</h2>
                                    <button onClick={() => navigate('/caregiver/alerts')} className="text-xs text-blue-600 font-semibold hover:underline">
                                        View all
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {recentAlerts.map(alert => {
                                        const isMissed = alert.severity === 'critical' || alert.message?.toLowerCase().includes('missed');
                                        return (
                                            <div
                                                key={alert._id}
                                                className={clsx(
                                                    "flex gap-3 p-3.5 rounded-xl border text-sm",
                                                    isMissed ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100",
                                                    alert.isRead && "opacity-60"
                                                )}
                                            >
                                                <div className="flex-shrink-0 mt-0.5">
                                                    {isMissed
                                                        ? <AlertCircle className="h-4 w-4 text-red-500" />
                                                        : <Clock className="h-4 w-4 text-blue-500" />
                                                    }
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-800 truncate">{alert.message}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                        {new Date(alert.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                {!alert.isRead && <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1.5" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default CaregiverDashboard;
