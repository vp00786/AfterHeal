import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Heart, Users, ArrowRight, Play, CheckCircle, Clock, Smartphone, Bell, Database, Lock, UserPlus, ChevronDown, Zap } from 'lucide-react';
import { useState } from 'react';

const featuresData = [
    {
        id: 'records',
        title: 'Digital Health Records',
        icon: <Database className="h-6 w-6" />,
        color: 'bg-blue-500',
        desc: 'Securely store and access prescriptions and history.',
        details: {
            howItWorks: [
                'Doctors upload prescriptions digitally',
                'System organizes history by timeline',
                'Instant retrieval for authorized users'
            ],
            whyItMatters: 'Eliminates lost paperwork and ensures doctors always have full context.'
        }
    },
    {
        id: 'reminders',
        title: 'Smart Medication Reminders',
        icon: <Clock className="h-6 w-6" />,
        color: 'bg-indigo-500',
        desc: 'Automated notifications that adapt to your schedule.',
        details: {
            howItWorks: [
                'Schedule based on prescription frequency',
                'Push notifications with "Mark Taken" actions',
                'Snooze options for flexibility'
            ],
            whyItMatters: 'Drastically reduces missed doses and improves recovery outcomes.'
        }
    },
    {
        id: 'alerts',
        title: 'Priority-Based Alerts',
        icon: <Bell className="h-6 w-6" />,
        color: 'bg-red-500',
        desc: 'Intelligent escalation ensures critical focus.',
        details: {
            howItWorks: [
                'Missed critical tasks notify Doctors immediately',
                'Routine misses notify Caregivers first',
                'Escalation logic prevents alert fatigue'
            ],
            whyItMatters: 'Ensures urgent medical issues get attention while preventing nuisance alarms.'
        }
    },
    {
        id: 'monitoring',
        title: 'Doctor Monitoring Dashboard',
        icon: <Activity className="h-6 w-6" />,
        color: 'bg-emerald-500',
        desc: 'Real-time adherence tracking for professionals.',
        details: {
            howItWorks: [
                'Aggregate view of all assigned patients',
                'Visual charts for adherence trends',
                'One-click intervention for at-risk patients'
            ],
            whyItMatters: 'Enables proactive care management rather than reactive emergency visits.'
        }
    },
    {
        id: 'caregiver',
        title: 'Caregiver Notifications',
        icon: <Users className="h-6 w-6" />,
        color: 'bg-teal-500',
        desc: 'Keep loved ones in the loop seamlessly.',
        details: {
            howItWorks: [
                'Receive notifications for missed routine tasks',
                'View daily completion summaries',
                'Coordinate support without intruding'
            ],
            whyItMatters: 'Provides a safety net and peace of mind for families.'
        }
    },
    {
        id: 'privacy',
        title: 'Privacy First Security',
        icon: <Lock className="h-6 w-6" />,
        color: 'bg-slate-800',
        desc: 'Your health data is encrypted and secure.',
        details: {
            howItWorks: [
                'End-to-end encryption for all records',
                'Strict Role-Based Access Control (RBAC)',
                'HIPAA compliant data storage standards'
            ],
            whyItMatters: 'Trust and confidentiality are the foundations of effective healthcare.'
        }
    }
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [activeRole, setActiveRole] = useState('patient');
    const [expandedFeature, setExpandedFeature] = useState(null);

    const toggleFeature = (id) => {
        setExpandedFeature(expandedFeature === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Navbar */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2">
                            <div
                                onClick={() => navigate('/')}
                                className="bg-gradient-to-tr from-primary-500 to-indigo-600 p-2 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <span onClick={() => navigate('/')} className="font-heading font-bold text-2xl text-slate-900 tracking-tight cursor-pointer">AfterHeal</span>
                        </div>
                        <div className="hidden md:flex gap-8">
                            <a href="#how-it-works" className="text-slate-500 hover:text-slate-900 font-medium transition-colors">How it Works</a>
                            <a href="#features" className="text-slate-500 hover:text-slate-900 font-medium transition-colors">Features</a>
                            <a href="#roles" className="text-slate-500 hover:text-slate-900 font-medium transition-colors">For You</a>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="hidden md:block text-slate-700 font-semibold px-4 hover:text-primary-600 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Live Beta
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
                            Care That Continues After <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Consultation</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                            Smart medication reminders, recovery task tracking, and intelligent alerts for caregivers and doctors — all in one accessible app.
                        </p>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => navigate('/register')} className="btn-primary flex items-center justify-center gap-2 text-lg">
                                    Continue as Patient
                                </button>
                                <button onClick={() => navigate('/register')} className="px-8 py-3 rounded-xl font-semibold text-slate-700 bg-white border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                    Login as Doctor
                                </button>
                            </div>
                            <button onClick={() => navigate('/register')} className="text-slate-500 hover:text-primary-600 font-medium text-sm flex items-center gap-1 w-fit">
                                <UserPlus className="h-4 w-4" /> Join as Caregiver
                            </button>
                        </div>

                        <div className="pt-4 flex items-center gap-4 text-sm text-slate-500">
                            <ShieldCheck className="h-5 w-5 text-emerald-500" />
                            <p>HIPAA Compliant & Secure Data Encryption</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-teal-100 rounded-[3rem] transform rotate-3 blur-3xl opacity-60"></div>
                        <img
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                            alt="Healthcare Professional"
                            className="relative rounded-[2.5rem] shadow-2xl border-4 border-white/50 object-cover h-[500px] w-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">A seamless loop of care from the clinic to the living room.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>

                        <div className="text-center group">
                            <div className="h-24 w-24 bg-white rounded-full border-4 border-primary-100 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <Activity className="h-10 w-10 text-primary-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Doctor Assigns</h3>
                            <p className="text-slate-500 text-sm px-4">Prescribes medications and recovery exercises digitally.</p>
                        </div>

                        <div className="text-center group">
                            <div className="h-24 w-24 bg-white rounded-full border-4 border-teal-100 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <Smartphone className="h-10 w-10 text-teal-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Patient Completes</h3>
                            <p className="text-slate-500 text-sm px-4">Receives timely reminders and marks tasks as done in one tap.</p>
                        </div>

                        <div className="text-center group">
                            <div className="h-24 w-24 bg-white rounded-full border-4 border-pink-100 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <Bell className="h-10 w-10 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Alerts Sent</h3>
                            <p className="text-slate-500 text-sm px-4">Family notified for missed routines; Doctors alerted for critical issues.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Role-Based Preview Section */}
            <section id="roles" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Tailored Experience for Everyone</h2>
                        <div className="inline-flex bg-slate-100 p-1 rounded-xl">
                            {['patient', 'doctor', 'caregiver'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setActiveRole(role)}
                                    className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeRole === role ? 'bg-white shadow text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                        {activeRole === 'patient' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row items-center gap-12">
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900">Stay on Track Effortlessly</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="text-green-500 h-6 w-6" />
                                            <span className="text-slate-600">Simple 'One-Tap' completion for seniors.</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Clock className="text-blue-500 h-6 w-6" />
                                            <span className="text-slate-600">Timely reminders for meds and exercises.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-white p-6 rounded-2xl shadow-card w-full max-w-sm border border-slate-100">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-blue-500 p-3 rounded-xl"><Clock className="text-white" /></div>
                                        <div><div className="font-bold text-gray-900">Morning Meds</div><div className="text-xs text-gray-500">8:00 AM</div></div>
                                    </div>
                                    <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
                                </div>
                            </motion.div>
                        )}

                        {activeRole === 'doctor' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row items-center gap-12">
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900">Monitor Adherence at Scale</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <Database className="text-indigo-500 h-6 w-6" />
                                            <span className="text-slate-600">Real-time dashboard of all patient activities.</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Bell className="text-red-500 h-6 w-6" />
                                            <span className="text-slate-600">Get alerted ONLY for critical misses to avoid fatigue.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-white p-6 rounded-2xl shadow-card w-full max-w-sm border border-slate-100">
                                    <div className="flex justify-between border-b pb-2 mb-2">
                                        <span className="font-bold text-gray-700">Patient Dashboard</span>
                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">1 Critical Alert</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-8 bg-gray-50 rounded w-full"></div>
                                        <div className="h-8 bg-gray-50 rounded w-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeRole === 'caregiver' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row items-center gap-12">
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900">Peace of Mind for Families</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <Heart className="text-pink-500 h-6 w-6" />
                                            <span className="text-slate-600">Know exactly when your loved one takes their meds.</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Bell className="text-orange-500 h-6 w-6" />
                                            <span className="text-slate-600">Receive nudges if routine tasks are forgotten.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-white p-6 rounded-2xl shadow-card w-full max-w-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-pink-100 p-2 rounded-full"><Heart className="text-pink-500 h-5 w-5" /></div>
                                        <span className="font-bold text-gray-800">Mom's Status</span>
                                    </div>
                                    <div className="bg-green-50 text-green-700 p-3 rounded-xl border border-green-100 text-sm font-medium flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" /> All tasks completed today
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Grid with Expandable Cards */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need</h2>
                        <p className="text-lg text-slate-500">Tap on a feature to explore how it helps you.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {featuresData.map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                feature={feature}
                                isOpen={expandedFeature === feature.id}
                                onClick={() => toggleFeature(feature.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-12 text-slate-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                                <Activity className="text-primary-500" /> AfterHeal
                            </h3>
                            <p className="text-sm leading-relaxed max-w-sm">
                                Bridging the gap between hospital and home. A final year academic project demonstrating scalable adherence technology.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">For Users</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Patients</a></li>
                                <li><a href="#" className="hover:text-white">Caregivers</a></li>
                                <li><a href="#" className="hover:text-white">Doctors</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Research Data</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center text-xs">
                        &copy; 2026 AfterHeal System. All rights reserved. Academic Project.
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ feature, isOpen, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`p-6 rounded-2xl bg-white border shadow-sm transition-all cursor-pointer overflow-hidden ${isOpen ? 'border-primary-500 shadow-xl ring-1 ring-primary-50' : 'border-gray-100 hover:border-primary-100 hover:shadow-md'}`}
        >
            <motion.div layout="position" className="flex items-start justify-between">
                <div className={`h-12 w-12 ${feature.color} rounded-xl flex items-center justify-center text-white shadow-md mb-4`}>
                    {feature.icon}
                </div>
                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                </div>
            </motion.div>

            <motion.h3 layout="position" className="text-lg font-bold text-slate-900 mb-2">{feature.title}</motion.h3>
            <motion.p layout="position" className="text-sm text-slate-500 leading-relaxed mb-2">
                {feature.desc}
            </motion.p>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-2 border-t border-slate-50 space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Zap className="h-3 w-3 text-amber-500" /> How it Works
                                </h4>
                                <ul className="space-y-1">
                                    {feature.details.howItWorks.map((item, idx) => (
                                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                            <span className="block h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
                                    Why it Matters
                                </h4>
                                <p className="text-sm text-slate-700 italic">
                                    "{feature.details.whyItMatters}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default LandingPage;
