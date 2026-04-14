import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, TrendingUp, CheckCircle2, XCircle, Clock, RefreshCw, UserX, AlertTriangle } from 'lucide-react';
import api from '../../api/axios';
import clsx from 'clsx';

const CaregiverOverview = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorType, setErrorType] = useState(null); // 'no_patient' | 'server'

    const fetchPatient = async () => {
        setLoading(true);
        setError(null);
        setErrorType(null);
        try {
            const { data } = await api.get('/caregiver/patient');
            setPatient(data);
        } catch (err) {
            const serverMsg = err?.response?.data?.message || '';
            const isNoPatient = err?.response?.status === 404 ||
                serverMsg.toLowerCase().includes('no patient') ||
                serverMsg.toLowerCase().includes('not linked');
            setErrorType(isNoPatient ? 'no_patient' : 'server');
            setError(serverMsg || 'Could not load patient data.');
            console.error('[CaregiverOverview]', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, []);

    const adherence = patient?.todayStats?.adherence;

    return (
        <div className="min-h-screen bg-slate-50 p-6 pb-24">
            <header className="flex items-center mb-8">
                <button onClick={() => navigate('/dashboard')} className="p-2 mr-4 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Patient Overview</h1>
                    <p className="text-gray-500 text-sm">Full profile & today's progress</p>
                </div>
            </header>

            {loading ? (
                <div className="flex items-center justify-center py-20 text-gray-400">
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading...
                </div>
            ) : error ? (
                <div className="max-w-2xl mx-auto">
                    {errorType === 'no_patient' ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserX className="h-8 w-8 text-amber-500" />
                            </div>
                            <h3 className="text-lg font-bold text-amber-900 mb-2">No Patient Linked</h3>
                            <p className="text-amber-700 text-sm leading-relaxed mb-5">
                                Your caregiver account isn't linked to a patient yet.<br />
                                Please ask your administrator to set the <code className="bg-amber-100 px-1 rounded">relatedPatient</code> field on your account.
                            </p>
                            <button
                                onClick={fetchPatient}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors text-sm"
                            >
                                <RefreshCw className="h-4 w-4" /> Retry
                            </button>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-red-900 mb-2">Something went wrong</h3>
                            <p className="text-red-600 text-sm mb-5">{error}</p>
                            <button
                                onClick={fetchPatient}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors text-sm"
                            >
                                <RefreshCw className="h-4 w-4" /> Try Again
                            </button>
                        </div>
                    )}
                </div>
            ) : patient ? (
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Patient Profile Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-5">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {patient.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Patient</p>
                                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                                <p className="text-gray-500 text-sm mt-1">{patient.email}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50">
                            <p className="text-xs text-gray-400">
                                Member since {new Date(patient.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Today's Adherence */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-5">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                            <h3 className="text-lg font-bold text-gray-800">Today's Adherence</h3>
                        </div>

                        {patient.todayStats.total === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4 bg-gray-50 rounded-2xl">No tasks scheduled for today.</p>
                        ) : (
                            <>
                                <div className="flex items-end gap-3 mb-4">
                                    <span className={clsx("text-5xl font-black", adherence >= 80 ? "text-emerald-500" : adherence >= 50 ? "text-amber-500" : "text-red-500")}>
                                        {adherence ?? 0}%
                                    </span>
                                    <span className="text-gray-500 pb-1 text-sm">medication adherence</span>
                                </div>
                                {/* Progress bar */}
                                <div className="w-full bg-gray-100 rounded-full h-3 mb-5">
                                    <div
                                        className={clsx("h-3 rounded-full transition-all duration-700", adherence >= 80 ? "bg-emerald-500" : adherence >= 50 ? "bg-amber-400" : "bg-red-400")}
                                        style={{ width: `${adherence ?? 0}%` }}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div className="bg-slate-50 rounded-2xl p-3">
                                        <div className="text-2xl font-bold text-gray-800">{patient.todayStats.total}</div>
                                        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-0.5">Total</div>
                                    </div>
                                    <div className="bg-emerald-50 rounded-2xl p-3">
                                        <div className="text-2xl font-bold text-emerald-600">{patient.todayStats.completed}</div>
                                        <div className="text-xs text-emerald-600/70 font-semibold uppercase tracking-wide mt-0.5">Done</div>
                                    </div>
                                    <div className="bg-red-50 rounded-2xl p-3">
                                        <div className="text-2xl font-bold text-red-500">{patient.todayStats.total - patient.todayStats.completed}</div>
                                        <div className="text-xs text-red-400 font-semibold uppercase tracking-wide mt-0.5">Remaining</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Medications', path: '/caregiver/medications', color: 'from-blue-500 to-blue-600' },
                            { label: 'Notes', path: '/caregiver/notes', color: 'from-purple-500 to-purple-600' },
                        ].map(btn => (
                            <button
                                key={btn.label}
                                onClick={() => navigate(btn.path)}
                                className={`bg-gradient-to-br ${btn.color} text-white p-5 rounded-2xl font-bold shadow-md hover:opacity-90 transition-opacity`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CaregiverOverview;
