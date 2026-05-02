import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import {
    FileText, Upload, Eye, Clock, Shield, Lock, Trash2, Pencil,
    Check, X, ArrowLeft, RefreshCw, FileImage, File, Download,
    CloudUpload, AlertTriangle, FolderOpen, Share2, UserCheck,
    UserX, ChevronDown, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Helpers ────────────────────────────────────────────────────────────────

const FILE_ICONS = {
    'application/pdf': { icon: FileText, bg: 'bg-red-50', text: 'text-red-500', label: 'PDF' },
    'image/jpeg':      { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image' },
    'image/png':       { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image' },
    'image/webp':      { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image' },
    'image/gif':       { icon: FileImage, bg: 'bg-purple-50', text: 'text-purple-500', label: 'Image' },
    default:           { icon: File, bg: 'bg-blue-50', text: 'text-blue-500', label: 'Document' },
};

const getFileIcon = (mime) => FILE_ICONS[mime] || FILE_ICONS.default;

const formatBytes = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// ─── Upload Drop Zone ────────────────────────────────────────────────────────

const UploadZone = ({ onUpload, uploading }) => {
    const fileRef = useRef();
    const [dragOver, setDragOver] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', file: null });
    const [preview, setPreview] = useState(null);

    const handleFile = (file) => {
        setForm(f => ({ ...f, file, title: f.title || file.name.replace(/\.[^.]+$/, '') }));
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = e => setPreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.file) return;
        const fd = new FormData();
        fd.append('file', form.file);
        fd.append('title', form.title || form.file.name);
        fd.append('description', form.description);
        const success = await onUpload(fd);
        if (success) {
            setForm({ title: '', description: '', file: null });
            setPreview(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Drop area */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => !form.file && fileRef.current?.click()}
                className={`
                    relative cursor-pointer transition-all duration-200 p-8 flex flex-col items-center justify-center gap-3 border-b border-dashed border-gray-200
                    ${dragOver ? 'bg-emerald-50 border-emerald-300' : 'hover:bg-gray-50'}
                    ${form.file ? 'bg-emerald-50/40 cursor-default' : ''}
                `}
            >
                <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                    onChange={e => e.target.files[0] && handleFile(e.target.files[0])}
                />
                {form.file ? (
                    <div className="flex items-center gap-4 w-full">
                        {preview ? (
                            <img src={preview} alt="preview" className="h-16 w-16 rounded-xl object-cover border border-gray-200" />
                        ) : (
                            <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${getFileIcon(form.file.type).bg}`}>
                                {(() => { const I = getFileIcon(form.file.type).icon; return <I className={`h-7 w-7 ${getFileIcon(form.file.type).text}`} />; })()}
                            </div>
                        )}
                        <div className="flex-1 min-w-0 text-left">
                            <p className="font-bold text-gray-900 truncate">{form.file.name}</p>
                            <p className="text-sm text-gray-500">{getFileIcon(form.file.type).label} • {formatBytes(form.file.size)}</p>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setForm(f => ({ ...f, file: null, title: '' })); setPreview(null); }}
                            className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                            <CloudUpload className="h-7 w-7 text-emerald-500" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-gray-800">Drop a file here or <span className="text-emerald-600">browse</span></p>
                            <p className="text-sm text-gray-400 mt-1">PDF, Images, Word Docs • Max 50 MB</p>
                        </div>
                    </>
                )}
            </div>

            {/* Metadata fields */}
            <div className="p-6 space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Document Title <span className="text-red-400">*</span></label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900"
                        placeholder="e.g., Blood Test Report — Jan 2026"
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Notes <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <textarea
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-gray-900"
                        placeholder="Add context, e.g. 'Fasting blood sugar test. Results: normal.'"
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    />
                </div>
                <button
                    type="submit"
                    disabled={uploading || !form.file}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {uploading
                        ? <><RefreshCw className="h-4 w-4 animate-spin" /> Uploading…</>
                        : <><Upload className="h-4 w-4" /> Save Document</>}
                </button>
            </div>
        </form>
    );
};

// ─── Access Panel ────────────────────────────────────────────────────────────

const AccessPanel = ({ record, doctors }) => {
    const [accessList, setAccessList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [granting, setGranting] = useState(false);
    const [revoking, setRevoking] = useState(null);
    const [toast, setToast] = useState(null);

    const showMsg = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

    const fetchAccess = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/records/${record._id}/access`);
            setAccessList(data);
        } catch { }
        setLoading(false);
    };

    useEffect(() => { fetchAccess(); }, [record._id]);

    const handleGrant = async () => {
        if (!selectedDoctor) return;
        setGranting(true);
        try {
            await api.post(`/records/${record._id}/access`, { doctorId: selectedDoctor });
            showMsg('Access granted!');
            setSelectedDoctor('');
            fetchAccess();
        } catch (err) {
            showMsg(err?.response?.data?.message || 'Failed to grant access', 'error');
        }
        setGranting(false);
    };

    const handleRevoke = async (doctorId) => {
        setRevoking(doctorId);
        try {
            await api.delete(`/records/${record._id}/access/${doctorId}`);
            showMsg('Access revoked.');
            fetchAccess();
        } catch {
            showMsg('Failed to revoke access', 'error');
        }
        setRevoking(null);
    };

    const grantedDoctorIds = accessList.map(a => a.doctor_id);
    const availableDoctors = doctors.filter(d => !grantedDoctorIds.includes(d._id));

    return (
        <div className="px-4 pb-4 pt-3 bg-indigo-50/60 border-t border-indigo-100 space-y-3">
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> Doctor Access
            </p>

            {/* Grant access row */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                    <select
                        className="w-full pl-3 pr-8 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none text-gray-700"
                        value={selectedDoctor}
                        onChange={e => setSelectedDoctor(e.target.value)}
                    >
                        <option value="">Select a doctor…</option>
                        {availableDoctors.map(d => (
                            <option key={d._id} value={d._id}>Dr. {d.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleGrant}
                    disabled={!selectedDoctor || granting}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                >
                    {granting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <UserCheck className="h-3.5 w-3.5" />}
                    Grant
                </button>
            </div>

            {/* Current access list */}
            {loading ? (
                <p className="text-xs text-gray-400 flex items-center gap-1"><RefreshCw className="h-3 w-3 animate-spin" /> Loading…</p>
            ) : accessList.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No doctors have access to this document yet.</p>
            ) : (
                <div className="space-y-1.5">
                    {accessList.map(a => (
                        <div key={a._id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-indigo-100">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-xs">
                                    {a.doctor?.name?.charAt(0) || 'D'}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-800">Dr. {a.doctor?.name || a.doctor_id}</p>
                                    <p className="text-[10px] text-gray-400">{a.doctor?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRevoke(a.doctor_id)}
                                disabled={revoking === a.doctor_id}
                                className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                            >
                                {revoking === a.doctor_id ? <RefreshCw className="h-3 w-3 animate-spin" /> : <UserX className="h-3 w-3" />}
                                Revoke
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {toast && (
                <p className={`text-xs font-bold px-3 py-1.5 rounded-lg ${toast.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {toast.msg}
                </p>
            )}
        </div>
    );
};

// ─── Record Card ─────────────────────────────────────────────────────────────

const RecordCard = ({ record, onDelete, onUpdate, doctors }) => {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showAccess, setShowAccess] = useState(false);
    const [editForm, setEditForm] = useState({ title: record.title, description: record.description || '' });

    const { icon: Icon, bg, text, label } = getFileIcon(record.file_type);

    const handleSave = async () => {
        setSaving(true);
        await onUpdate(record._id, editForm);
        setSaving(false);
        setEditing(false);
    };

    const handleDelete = async () => {
        setDeleting(true);
        await onDelete(record._id);
        setDeleting(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
            <div className="p-4 flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center ${bg}`}>
                    <Icon className={`h-6 w-6 ${text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {editing ? (
                        <div className="space-y-2">
                            <input
                                autoFocus
                                className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 text-sm font-bold text-gray-900 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                value={editForm.title}
                                onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                            />
                            <textarea
                                rows={2}
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
                                placeholder="Add notes…"
                                value={editForm.description}
                                onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                            />
                        </div>
                    ) : (
                        <>
                            <h3 className="font-bold text-gray-900 truncate">{record.title}</h3>
                            {record.description && (
                                <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{record.description}</p>
                            )}
                        </>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bg} ${text}`}>{label}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {formatDate(record.uploadedAt)}
                        </span>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Lock className="h-2.5 w-2.5" /> Secure
                        </span>
                    </div>
                </div>
            </div>

            {/* Action bar */}
            <div className="border-t border-gray-50 px-4 py-2.5 flex items-center justify-between gap-2 bg-gray-50/50">
                {editing ? (
                    <div className="flex gap-2 w-full">
                        <button
                            onClick={handleSave}
                            disabled={saving || !editForm.title.trim()}
                            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                            {saving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                            Save Changes
                        </button>
                        <button
                            onClick={() => { setEditing(false); setEditForm({ title: record.title, description: record.description || '' }); }}
                            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-3.5 w-3.5" /> Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-1.5">
                            {record.file_url && (
                                <a
                                    href={record.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                                >
                                    <Eye className="h-3.5 w-3.5" /> View
                                </a>
                            )}
                            {record.file_url && (
                                <a
                                    href={record.file_url}
                                    download
                                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                >
                                    <Download className="h-3.5 w-3.5" /> Download
                                </a>
                            )}
                        </div>
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => setShowAccess(v => !v)}
                                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                                    showAccess ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-indigo-700 hover:bg-indigo-50'
                                }`}
                            >
                                <Share2 className="h-3.5 w-3.5" /> Share
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-gray-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                            >
                                <Pencil className="h-3.5 w-3.5" /> Edit
                            </button>
                            {confirmDelete ? (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-red-600 font-semibold">Sure?</span>
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                                    >
                                        {deleting ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Yes, delete'}
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setConfirmDelete(true)}
                                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            <AnimatePresence>
                {showAccess && (
                    <motion.div
                        key="access-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <AccessPanel record={record} doctors={doctors} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

const MedicalRecords = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [toast, setToast] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/records/${user._id}`);
            setRecords(data);
        } catch (err) {
            console.error('Fetch records error:', err);
            showToast('Failed to load records.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
        // Fetch all doctors for the share panel
        api.get('/auth/users')
            .then(({ data }) => setDoctors(data.filter(u => u.role === 'doctor')))
            .catch(err => console.error('Failed to fetch doctors:', err));
    }, []);

    const handleUpload = async (formData) => {
        setUploading(true);
        try {
            const { data } = await api.post('/records/upload', formData);
            setRecords(prev => [data, ...prev]);
            setShowUpload(false);
            showToast('Document uploaded successfully.');
            return true;
        } catch (err) {
            console.error('Upload error:', err);
            showToast(err?.response?.data?.message || 'Upload failed. Try again.', 'error');
            return false;
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/records/${id}`);
            setRecords(prev => prev.filter(r => r._id !== id));
            showToast('Document deleted.');
        } catch (err) {
            console.error('Delete error:', err);
            showToast('Failed to delete document.', 'error');
        }
    };

    const handleUpdate = async (id, updates) => {
        try {
            const { data } = await api.patch(`/records/${id}`, updates);
            setRecords(prev => prev.map(r => r._id === id ? { ...r, ...data } : r));
            showToast('Document updated.');
        } catch (err) {
            console.error('Update error:', err);
            showToast('Failed to update document.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 px-6 pt-12 pb-10 rounded-b-[36px] shadow-lg">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors mb-6 text-sm font-semibold"
                >
                    <ArrowLeft className="h-4 w-4" /> Dashboard
                </button>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">Health Vault</p>
                        <h1 className="text-3xl font-black text-white leading-tight">My Documents</h1>
                        <p className="text-emerald-100 text-sm mt-1">
                            {records.length} document{records.length !== 1 ? 's' : ''} • End-to-end encrypted
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur p-3 rounded-2xl">
                        <Shield className="h-8 w-8 text-white" />
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-4 space-y-4 max-w-2xl mx-auto">
                {/* Upload toggle */}
                <button
                    onClick={() => setShowUpload(v => !v)}
                    className={`w-full flex items-center justify-center gap-2.5 p-4 rounded-2xl font-bold text-sm transition-all ${
                        showUpload
                            ? 'bg-gray-100 text-gray-600 border border-gray-200'
                            : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700'
                    }`}
                >
                    {showUpload
                        ? <><X className="h-4 w-4" /> Cancel Upload</>
                        : <><CloudUpload className="h-4 w-4" /> Upload New Document</>}
                </button>

                {/* Upload form */}
                <AnimatePresence>
                    {showUpload && (
                        <motion.div
                            key="upload-form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <UploadZone onUpload={handleUpload} uploading={uploading} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Records list */}
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-400">
                        <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading documents…
                    </div>
                ) : records.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FolderOpen className="h-9 w-9 text-gray-300" />
                        </div>
                        <h3 className="font-bold text-gray-700 text-lg">No documents yet</h3>
                        <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
                            Upload prescriptions, lab results, X-rays, or any health document.
                        </p>
                        <button
                            onClick={() => setShowUpload(true)}
                            className="mt-5 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors"
                        >
                            Upload First Document
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                            Your Documents
                        </p>
                        <AnimatePresence mode="popLayout">
                            {records.map(record => (
                                <RecordCard
                                    key={record._id}
                                    record={record}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                    doctors={doctors}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Toast notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-xl flex items-center gap-2 ${
                            toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'
                        }`}
                    >
                        {toast.type === 'error'
                            ? <AlertTriangle className="h-4 w-4" />
                            : <Check className="h-4 w-4 text-emerald-400" />}
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MedicalRecords;
