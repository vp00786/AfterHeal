import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Hash, Briefcase, ChevronRight, Check, Eye, EyeOff } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-50 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-white/50 backdrop-blur-lg relative">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                        title="Back to Home"
                    >
                        <ChevronRight className="h-6 w-6 rotate-180" />
                    </button>

                    <div className="text-center mb-8">
                        <Link to="/">
                            <div className="mx-auto h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 cursor-pointer hover:scale-105 transition-transform">
                                <UserPlus className="h-8 w-8 text-teal-600" />
                            </div>
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-500 mt-2">Join AfterHeal for better recovery management</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                name="name"
                                type="text"
                                required
                                className="input-field pl-12"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="input-field pl-12"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="input-field pl-12 pr-12"
                                placeholder="Create Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                required
                                className="input-field pl-12"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="text-xs text-gray-500 pl-1">
                            Must be 8+ chars, include 1 uppercase & 1 number.
                        </p>

                        <div className="relative">
                            <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <select
                                name="role"
                                className="input-field pl-12 appearance-none bg-white"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="caregiver">Caregiver</option>
                            </select>
                            <ChevronRight className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                        </div>

                        <motion.div
                            initial={false}
                            animate={{ height: formData.role === 'caregiver' ? 'auto' : 0, opacity: formData.role === 'caregiver' ? 1 : 0 }}
                            className="overflow-hidden"
                        >
                            {formData.role === 'caregiver' && (
                                <div className="relative pt-1">
                                    <Hash className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        name="relatedPatient"
                                        type="text"
                                        className="input-field pl-12"
                                        placeholder="Patient ID to Monitor (Optional)"
                                        value={formData.relatedPatient}
                                        onChange={handleChange}
                                    />
                                    <p className="text-xs text-gray-500 mt-2 ml-1">Ask the doctor for the Patient ID.</p>
                                </div>
                            )}
                        </motion.div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-secondary w-full flex justify-center items-center gap-2 mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center pt-6 mt-2">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
