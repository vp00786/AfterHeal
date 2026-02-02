import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Plus, Users, LogOut, Activity, AlertTriangle, FileText, ChevronRight, Bell, Calendar, Search, User, ClipboardList, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalPatients: 0,
        activeAlerts: 0,
        pendingReviews: 0
    });

    // Mock fetching simplified stats
    useEffect(() => {
        // In a real app, fetch dashboard stats from API
        // For now, we mock it based on loaded tasks or hardcode for visual logic
        setStats({
            totalPatients: 12,
            activeAlerts: 3,
            pendingReviews: 5
        });
    }, []);

    const QuickActionCard = ({ title, desc, icon: Icon, color, onClick }) => (
        <motion.div
            whileHover={{ y: -4, shadow: "lg" }}
            onClick={onClick}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
            <div className={`h-12 w-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center justify-between">
                {title}
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </motion.div>
    );

    const StatCard = ({ label, value, icon: Icon, color }) => (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`h-10 w-10 ${color} bg-opacity-10 rounded-full flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            </div>
        </div>
    );

    const AlertItem = ({ patient, issue, time, severity }) => (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-red-50/50 transition-colors border-l-4 border-l-red-500">
            <div className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full mt-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{patient}</h4>
                    <p className="text-sm text-gray-600">{issue}</p>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <ClockWrapper className="h-3 w-3" /> {time}
                    </span>
                </div>
            </div>
            <button
                onClick={() => alert("Viewing priority alert. Detailed page coming soon.")}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 px-3 py-1.5 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
                View
            </button>
        </div>
    );
    // Helper specifically for icon in sub-component to avoid clutter
    const ClockWrapper = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Navbar - Simplified for Dashboard */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                                <Stethoscope className="h-6 w-6 text-primary-600" />
                            </div>
                            <span className="font-heading font-bold text-xl text-gray-900 tracking-tight">AfterHeal <span className="text-gray-400 font-normal ml-1">MD</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-gray-900">Dr. {user && user.name}</div>
                                <div className="text-xs text-gray-500">Cardiology Dept</div>
                            </div>
                            <div className="h-9 w-9 bg-primary-50 rounded-full flex items-center justify-center border border-primary-100">
                                <User className="h-5 w-5 text-primary-600" />
                            </div>
                            <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors ml-2" title="Logout">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Welcome & Context */}
                <header>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. {user ? user.name.split(' ')[0] : 'Doctor'}</h1>
                    <p className="text-gray-500 mt-2 max-w-2xl">
                        Monitor patient adherence, manage prescriptions, and track recovery tasks from your central command center.
                    </p>
                </header>

                {/* Snapshot Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Total Patients" value={stats.totalPatients} icon={Users} color="bg-blue-500" />
                    <StatCard label="Critical Alerts" value={stats.activeAlerts} icon={AlertTriangle} color="bg-red-500" />
                    <StatCard label="Reviews Pending" value={stats.pendingReviews} icon={ClipboardList} color="bg-amber-500" />
                    <StatCard label="Adherence Rate" value="92%" icon={Activity} color="bg-emerald-500" />
                </section>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Actions Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Actions Grid */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary-500" /> Quick Actions
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <QuickActionCard
                                    title="My Patients"
                                    desc="View assigned patients, history & analytics."
                                    icon={Users}
                                    color="bg-blue-500"
                                    onClick={() => navigate('/doctor/patients')}
                                />
                                <QuickActionCard
                                    title="Create Prescription"
                                    desc="Assign medicines & tasks to patients."
                                    icon={Plus}
                                    color="bg-indigo-500"
                                    onClick={() => navigate('/doctor/prescriptions')}
                                />
                                <QuickActionCard
                                    title="Adherence Reports"
                                    desc="Visualize recovery trends over time."
                                    icon={FileText}
                                    color="bg-emerald-500"
                                    onClick={() => navigate('/doctor/adherence')}
                                />
                                <QuickActionCard
                                    title="Patient Records"
                                    desc="Access digital health records securely."
                                    icon={ClipboardList}
                                    color="bg-slate-500"
                                    onClick={() => navigate('/doctor/records')}
                                />
                            </div>
                        </section>

                        {/* Recent Activity / Tasks Preview (Optional - Keeping simple for now) */}
                    </div>

                    {/* Alerts Panel - Priority Based */}
                    <div className="lg:col-span-1">
                        <section className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-red-500" /> Priority Alerts
                                </h2>
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">3 New</span>
                            </div>

                            <div className="space-y-4">
                                <AlertItem
                                    patient="Sarah Connor"
                                    issue="Missed 'Post-Op Antibiotics' (2nd dose)"
                                    time="20 mins ago"
                                    severity="critical"
                                />
                                <AlertItem
                                    patient="John Doe"
                                    issue="Reported High Pain Level (8/10)"
                                    time="1 hour ago"
                                    severity="critical"
                                />
                                <AlertItem
                                    patient="Emily Blunt"
                                    issue="Missed Physiotherapy Session"
                                    time="3 hours ago"
                                    severity="warning"
                                />
                            </div>

                            <button
                                onClick={() => navigate('/doctor/alerts')}
                                className="w-full mt-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                View All Alerts
                            </button>
                        </section>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default DoctorDashboard;
