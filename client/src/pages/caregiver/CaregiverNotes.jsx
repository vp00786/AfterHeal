import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, StickyNote, Plus, CheckCircle2, Circle, Trash2, RefreshCw, X } from 'lucide-react';
import api from '../../api/axios';
import clsx from 'clsx';

const CaregiverNotes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/caregiver/notes');
            setNotes(data);
        } catch (err) {
            setError('Could not load notes.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        setSubmitting(true);
        try {
            const { data: newNote } = await api.post('/caregiver/notes', { content });
            setNotes(prev => [newNote, ...prev]);
            setContent('');
            setShowForm(false);
        } catch (err) {
            console.error('Failed to add note:', err);
            setError('Failed to save note. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleResolve = async (noteId) => {
        try {
            const { data: updated } = await api.put(`/caregiver/notes/${noteId}`);
            setNotes(prev => prev.map(n => n._id === noteId ? updated : n));
        } catch (err) {
            console.error('Failed to update note:', err);
        }
    };

    const openNotes = notes.filter(n => n.status === 'open');
    const resolvedNotes = notes.filter(n => n.status === 'resolved');

    return (
        <div className="min-h-screen bg-slate-50 p-6 pb-24">
            <header className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button onClick={() => navigate('/dashboard')} className="p-2 mr-4 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Care Notes</h1>
                        <p className="text-gray-500 text-sm">Track patient observations</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:bg-purple-700 transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add Note
                </button>
            </header>

            {/* Add Note Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">New Care Note</h3>
                            <button onClick={() => { setShowForm(false); setContent(''); }} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Describe the patient's condition, behavior, or any observations..."
                                rows={5}
                                className="w-full border border-gray-200 rounded-2xl p-4 text-sm text-gray-800 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                            <div className="flex gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); setContent(''); }}
                                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || !content.trim()}
                                    className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold disabled:opacity-50 hover:bg-purple-700 transition-colors"
                                >
                                    {submitting ? 'Saving...' : 'Save Note'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-20 text-gray-400">
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" /> Loading...
                </div>
            ) : (
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Open Notes */}
                    <section>
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                            Open ({openNotes.length})
                        </h2>
                        {openNotes.length === 0 ? (
                            <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
                                <StickyNote className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No open notes. Tap "Add Note" to create one.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {openNotes.map(note => (
                                    <div key={note._id} className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm">
                                        <p className="text-gray-800 text-sm leading-relaxed">{note.content}</p>
                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                            <span className="text-xs text-gray-400">
                                                {new Date(note.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <button
                                                onClick={() => handleToggleResolve(note._id)}
                                                className="flex items-center gap-1.5 text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Resolve
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Resolved Notes */}
                    {resolvedNotes.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                Resolved ({resolvedNotes.length})
                            </h2>
                            <div className="space-y-3">
                                {resolvedNotes.map(note => (
                                    <div key={note._id} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 opacity-70">
                                        <p className="text-gray-600 text-sm leading-relaxed line-through decoration-gray-300">{note.content}</p>
                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                            <span className="text-xs text-gray-400">
                                                {new Date(note.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <button
                                                onClick={() => handleToggleResolve(note._id)}
                                                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                <Circle className="h-3.5 w-3.5" /> Reopen
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default CaregiverNotes;
