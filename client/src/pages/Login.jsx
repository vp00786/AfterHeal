import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add local loading state for button
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            // Optional: Add a small delay for animation or improved UX before redirect
            navigate('/dashboard');
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left Side - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Medical team"
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full p-12 lg:p-20 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg">
                            <Activity className="h-8 w-8 text-primary-400" />
                        </div>
                        <span className="font-heading font-bold text-3xl text-white tracking-tight">AfterHeal</span>
                    </div>

                    <div className="max-w-md">
                        <blockquote className="space-y-6">
                            <p className="text-3xl font-heading font-bold text-white leading-tight">
                                "The level of continuous care we achieved with AfterHeal transformed our clinic."
                            </p>
                            <footer className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20">
                                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Dr. Sarah" className="h-full w-full object-cover"/>
                                </div>
                                <div>
                                    <div className="font-bold text-white">Dr. Sarah Jenkins</div>
                                    <div className="text-primary-300 text-sm">Chief of Surgery</div>
                                </div>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md relative z-10 space-y-10"
                >
                    <div className="space-y-3">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-8">
                            <div className="bg-primary-50 p-3 rounded-2xl">
                                <Activity className="h-8 w-8 text-primary-600" />
                            </div>
                            <span className="font-heading font-bold text-2xl text-slate-900">AfterHeal</span>
                        </div>
                        
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Welcome back</h2>
                        <p className="text-slate-500 text-lg">Enter your details to access your account.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-center gap-2">
                             <div className="bg-red-100 p-1 rounded-full"><Activity className="h-4 w-4 shrink-0" /></div>
                            {error}
                        </div>
                    )}

                    <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Email address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-12 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                <span className="text-sm font-medium text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 text-white w-full py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-6 w-6" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-slate-600 font-medium">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">
                            Create one
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
