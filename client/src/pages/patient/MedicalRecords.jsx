import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { FileText, Upload, Eye, Clock, Shield, Lock, Trash2 } from 'lucide-react';

const MedicalRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', file: null });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const { data } = await axios.get(`/records/${user._id}`);
            setRecords(data);
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!formData.file) return;

        setUploading(true);
        const data = new FormData();
        data.append('file', formData.file);
        data.append('title', formData.title);
        data.append('description', formData.description);

        try {
            await axios.post('/records/upload', data);
            setShowUpload(false);
            setFormData({ title: '', description: '', file: null });
            fetchRecords(); // Refresh list
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record? This cannot be undone.')) return;

        try {
            await axios.delete(`/records/${id}`);
            setRecords(records.filter(r => r._id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete record.');
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-emerald-600 px-6 pt-12 pb-8 rounded-b-[40px] shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Medical Records</h1>
                    <Shield className="text-emerald-200 h-6 w-6" />
                </div>
                <p className="text-emerald-100 text-sm">Securely store and share your documents.</p>
            </div>

            <div className="px-6 space-y-4">
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="w-full bg-white p-4 rounded-xl border border-dashed border-emerald-300 text-emerald-600 flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
                >
                    <Upload className="h-5 w-5" />
                    <span className="font-semibold">Upload New Record</span>
                </button>

                {showUpload && (
                    <form onSubmit={handleUpload} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="e.g., Blood Test Report"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                                <textarea
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="Add details..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                                <input
                                    type="file"
                                    required
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                    onChange={handleFileChange}
                                />
                                <p className="text-xs text-gray-400 mt-1">Supported: PDF, Images, Docs</p>
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                {uploading ? 'Uploading...' : 'Save Record'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="space-y-3">
                    {loading ? (
                        <p className="text-center text-gray-400 py-8">Loading records...</p>
                    ) : records.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
                            <FileText className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-400">No records uploaded yet.</p>
                        </div>
                    ) : (
                        records.map(record => (
                            <div key={record._id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-indigo-50 h-10 w-10 rounded-full flex items-center justify-center text-indigo-500">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{record.title}</h3>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(record.uploadedAt).toLocaleDateString()}
                                            <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-2">
                                                <Lock className="h-3 w-3" /> Encrypted
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={record.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-sm font-medium"
                                        title="Securely View File"
                                    >
                                        <Eye className="h-4 w-4" />
                                        View
                                    </a>
                                    <button
                                        onClick={() => handleDelete(record._id)}
                                        className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all text-sm font-medium"
                                        title="Delete File"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedicalRecords;
