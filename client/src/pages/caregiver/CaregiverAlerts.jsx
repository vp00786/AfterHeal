import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, AlertCircle, Info, CheckCircle2, RefreshCw, Filter } from 'lucide-react';
import api from '../../api/axios';
import clsx from 'clsx';

const TABS = ['All', 'Unread', 'Missed Doses'];

const CaregiverAlerts = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('All');
    const [marking, setMarking] = useState(null);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/alerts');
            setAlerts(data);
        } catch (err) {
            console.error('Failed to fetch alerts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const handleMarkRead = async (alertId) => {
        if (marking) return;
        setMarking(alertId);
        try {
            const { data: updated } = await api.put(`/alerts/${alertId}/read`);
            // Merge the server-returned updated alert back into state
            setAlerts(prev => prev.map(a => a._id === alertId ? { ...a, ...updated, isRead: true } : a));
        } catch (err) {
            console.error('Failed to mark alert as read:', err);
        } finally {
            setMarking(null);
        }
    };

    const isMissedDose = (a) =>
        a.severity === 'critical' || a.message?.toLowerCase().includes('missed');

    const filtered = alerts.filter(a => {
        if (tab === 'Unread') return !a.isRead;
        if (tab === 'Missed Doses') return isMissedDose(a);
        return true;
    });

    const unreadCount = alerts.filter(a => !a.isRead).length;

    const getAlertStyle = (alert) => {
        if (isMissedDose(alert)) {
            return {
                card: 'border-red-100 bg-red-50/40',
                icon: <AlertCircle className="h-5 w-5 text-red-500" />,
                iconBg: 'bg-red-100',
                badge: 'bg-red-100 text-red-700',
                label: 'Missed Dose',
                btn: 'bg-red-100 text-red-700 hover:bg-red-200',
            };
        }
        return {
            card: 'border-blue-100 bg-blue-50/30',
            icon: <Info className="h-5 w-5 text-blue-500" />,
            iconBg: 'bg-blue-100',
            badge: 'bg-blue-100 text-blue-700',
            label: 'Alert',
            btn: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        };
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 pb-24">
            <header className="flex items-center mb-6">
                <button onClick={() => navigate('/dashboard')} className="p-2 mr-4 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
                    <p className="text-gray-500 text-sm">
                        {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
                    </p>
                </div>
                <button onClick={fetchAlerts} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-500 transition-colors">
                    <RefreshCw className="h-4 w-4" />
                </button>
            </header>

            {/* Tab Bar */}
            <div className="flex gap-2 mb-6">
                {TABS.map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={clsx(
                            "relative px-4 py-2 rounded-full text-sm font-semibold transition-all",
                            tab === t ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                        )}
                    >
                        {t}
                        {t === 'Unread' && unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20 text-gray-400">
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading...
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <Bell className="h-12 w-12 mx-auto mb-3 text-gray-200" />
                    <p className="font-semibold text-gray-500">
                        {tab === 'Missed Doses' ? 'No missed dose alerts' : 'No alerts here'}
                    </p>
                    <p className="text-sm mt-1 max-w-xs mx-auto">
                        {tab === 'Unread'
                            ? 'All caught up — every alert has been read.'
                            : tab === 'Missed Doses'
                            ? 'Alerts are automatically generated when your patient misses a scheduled dose. Check back soon.'
                            : 'No alerts have been sent to you yet.'}
                    </p>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto space-y-3">
                    {filtered.map(alert => {
                        const style = getAlertStyle(alert);
                        return (
                            <div
                                key={alert._id}
                                className={clsx(
                                    "flex gap-4 p-4 rounded-2xl border shadow-sm transition-all",
                                    style.card,
                                    alert.isRead && "opacity-60",
                                    !alert.isRead && "shadow-md"
                                )}
                            >
                                <div className={clsx("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center", style.iconBg)}>
                                    {style.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                        <span className={clsx("text-xs font-bold px-2 py-0.5 rounded-full", style.badge)}>
                                            {style.label}
                                        </span>
                                        {!alert.isRead && <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1" />}
                                    </div>
                                    <p className="text-gray-800 font-semibold text-sm leading-snug">{alert.message}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-xs text-gray-400">
                                            {new Date(alert.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {!alert.isRead && (
                                            <button
                                                onClick={() => handleMarkRead(alert._id)}
                                                disabled={marking === alert._id}
                                                className={clsx("flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors", style.btn)}
                                            >
                                                {marking === alert._id ? <RefreshCw className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                                                Mark Read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CaregiverAlerts;
