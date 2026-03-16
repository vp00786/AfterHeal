import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Hash, Briefcase, ChevronRight, Check, Eye, EyeOff, Activity } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'patient',
        assignedDoctor: '',
        relatedPatient: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("Password must be 8+ chars, 1 uppercase, 1 number");
            return;
        }

        setLoading(true);
        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            navigate('/dashboard');
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-row-reverse bg-white font-sans">
            {/* Right Side - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1584982751601-97dcf099a3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Patient care"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-teal-900/40 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full p-12 lg:p-20 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg">
                            <Activity className="h-8 w-8 text-teal-400" />
                        </div>
                        <span className="font-heading font-bold text-3xl text-white tracking-tight">AfterHeal</span>
                    </div>

                    <div className="max-w-md">
                        <blockquote className="space-y-6">
                            <h3 className="text-4xl font-heading font-bold text-white leading-tight">
                                Start your journey to better health management.
                            </h3>
                            <p className="text-teal-100 text-lg">Join thousands of patients, doctors, and caregivers connecting for continuous care.</p>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden h-screen overflow-y-auto">
                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-60"></div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="space-y-3 mb-8">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-6">
                            <div className="bg-teal-50 p-3 rounded-2xl">
                                <Activity className="h-8 w-8 text-teal-600" />
                            </div>
                            <span className="font-heading font-bold text-2xl text-slate-900">AfterHeal</span>
                        </div>
                        
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Join us</h2>
                        <p className="text-slate-500 text-lg">Create an account to get started.</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-center gap-2">
                             <div className="bg-red-100 p-1 rounded-full"><Activity className="h-4 w-4 shrink-0" /></div>
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-10 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                                        placeholder="Min 8 chars"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                                        placeholder="Repeat pass"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Account Role</label>
                            <div className="relative group">
                                <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                                <select
                                    name="role"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium appearance-none"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="patient">Patient (Needs care)</option>
                                    <option value="doctor">Doctor (Provider)</option>
                                    <option value="caregiver">Caregiver (Family/Nurse)</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-3.5 h-5 w-5 text-slate-400 rotate-90 pointer-events-none" />
                            </div>
                        </div>

                        <AnimatePresence>
                            {formData.role === 'caregiver' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Linked Patient ID</label>
                                    <div className="relative group">
                                        <Hash className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                                        <input
                                            name="relatedPatient"
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                                            placeholder="Ask doctor for ID"
                                            value={formData.relatedPatient}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-teal-600 text-white w-full mt-6 py-4 rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all shadow-[0_8px_30px_rgb(13,148,136,0.3)] active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
                        >
                            {loading ? 'Setting up...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-slate-600 font-medium mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-teal-600 hover:text-teal-700 font-bold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
