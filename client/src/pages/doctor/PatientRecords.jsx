import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import {
    ArrowLeft, FileText, FileImage, File, Eye, Download,
    Lock, Clock, Search, RefreshCw, FolderOpen, Shield, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Helpers ────────────────────────────────────────────────────────────────

const FILE_META = {
    'application/pdf':                                   { icon: FileText, bg: 'bg-red-50',    text: 'text-red-500',    label: 'PDF'     },
    'image/jpeg':                                        { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image'   },
    'image/png':                                         { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image'   },
    'image/webp':                                        { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image'   },
    'image/gif':                                         { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image'   },
    'application/msword':                                { icon: File,      bg: 'bg-blue-50',   text: 'text-blue-500',   label: 'Word Doc'},
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                                         { icon: File,      bg: 'bg-blue-50',   text: 'text-blue-500',   label: 'Word Doc'},
    default:                                             { icon: File,      bg: 'bg-gray-50',   text: 'text-gray-500',   label: 'Document'},
};

const getMeta = (mime) => FILE_META[mime] || FILE_META.default;

const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// ─── Record Row ──────────────────────────────────────────────────────────────

const RecordRow = ({ record }) => {
    const { icon: Icon, bg, text, label } = getMeta(record.file_type);
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-gray-100 last:border-0"
        >
            <div className={`flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`h-5 w-5 ${text}`} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">{record.title}</h4>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${bg} ${text}`}>{label}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {fmtDate(record.uploadedAt)}
                    </span>
                    {record.description && (
                        <span className="text-xs text-gray-500 truncate max-w-xs">{record.description}</span>
                    )}
                </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
                {record.file_url && (
                    <>
                        <a
                            href={record.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View file"
                            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                            <Eye className="h-4 w-4" />
                        </a>
                        <a
                            href={record.file_url}
                            download
                            title="Download file"
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            <Download className="h-4 w-4" />
                        </a>
                    </>
                )}
            </div>
        </motion.div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

const PatientRecords = () => {
    const navigate = useNavigate();
    const [patients, setPatients]           = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [records, setRecords]             = useState([]);
    const [loadingPatients, setLoadingPatients] = useState(true);
    const [loadingRecords, setLoadingRecords]   = useState(false);
    const [search, setSearch]               = useState('');

    // ── Fetch the doctor's patient list ──────────────────────────────────────
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await api.get('/auth/users');
                const pts = data.filter(u => u.role === 'patient');
                setPatients(pts);
                if (pts.length > 0) setSelectedPatient(pts[0]._id);
            } catch (err) {
                console.error('Error fetching patients:', err);
            } finally {
                setLoadingPatients(false);
            }
        };
        fetchPatients();
    }, []);

    // ── Fetch records when patient selection changes ──────────────────────────
    useEffect(() => {
        if (!selectedPatient) { setRecords([]); return; }
        const fetchRecords = async () => {
            setLoadingRecords(true);
            try {
                const { data } = await api.get(`/records/${selectedPatient}`);
                setRecords(data);
            } catch (err) {
                console.error('Error fetching records:', err);
                setRecords([]);
            } finally {
                setLoadingRecords(false);
            }
        };
        fetchRecords();
    }, [selectedPatient]);

    const filteredRecords = records.filter(r =>
        r.title?.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase())
    );

    const selectedPatientName = patients.find(p => p._id === selectedPatient)?.name || '—';

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Top Nav */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-none">Patient Documents</h1>
                        <p className="text-sm text-gray-400 mt-0.5">Read-only, secure access</p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
                {/* Security notice */}
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-800">
                    <Shield className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
                    <p>
                        These records are <strong>strictly confidential</strong>. File access links expire after 1 hour.
                        Only view records relevant to patient treatment.
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Patient selector */}
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                Select Patient
                            </label>
                            {loadingPatients ? (
                                <div className="flex items-center gap-2 text-gray-400 text-sm py-2.5">
                                    <RefreshCw className="h-4 w-4 animate-spin" /> Loading patients…
                                </div>
                            ) : patients.length === 0 ? (
                                <p className="text-sm text-gray-400 py-2">No patients assigned to your account yet.</p>
                            ) : (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <select
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                                        value={selectedPatient}
                                        onChange={e => { setSelectedPatient(e.target.value); setSearch(''); }}
                                    >
                                        <option value="">— Select a patient —</option>
                                        {patients.map(p => (
                                            <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Search */}
                        {selectedPatient && records.length > 0 && (
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                    Search Documents
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Filter by name or notes…"
                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Records panel */}
                {selectedPatient && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Panel header */}
                        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-black text-sm">
                                    {selectedPatientName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{selectedPatientName}</p>
                                    <p className="text-xs text-gray-400">
                                        {loadingRecords ? 'Loading…' : `${filteredRecords.length} document${filteredRecords.length !== 1 ? 's' : ''}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                                <Lock className="h-3 w-3" /> Encrypted
                            </div>
                        </div>

                        {/* Records list */}
                        {loadingRecords ? (
                            <div className="flex items-center justify-center py-16 text-gray-400">
                                <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading documents…
                            </div>
                        ) : filteredRecords.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <FolderOpen className="h-12 w-12 text-gray-200 mb-3" />
                                <p className="font-semibold text-gray-500">
                                    {search ? 'No documents match your search.' : 'No documents uploaded by this patient yet.'}
                                </p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {filteredRecords.map(record => (
                                    <RecordRow key={record._id} record={record} />
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                )}

                {!selectedPatient && !loadingPatients && patients.length > 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <FolderOpen className="h-12 w-12 mx-auto mb-3 text-gray-200" />
                        <p className="font-semibold">Select a patient to view their documents.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientRecords;
