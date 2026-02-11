import { useState } from 'react';
import { auth } from '../../firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackToHomeBtn from '../../components/backToHomeBtn/index.jsx';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(auth, email, password);
                toast.success('Account created successfully!');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Login successful!');
            }
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    };

    const handleSocialAuth = async (provider, providerName) => {
        try {
            await signInWithPopup(auth, provider);
            toast.success(`Signed in with ${providerName}!`);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') return;
            if (error.code === 'auth/account-exists-with-different-credential') {
                toast.error('An account already exists with the same email. Try a different sign-in method.');
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-surface dark:bg-surface-dark flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-14 h-14 bg-charcoal dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white dark:text-charcoal font-bold text-xl">GP</span>
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-charcoal dark:text-white mb-2">
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-muted text-sm">
                        {isSignup ? 'Join the Gul Plaza relief community' : 'Sign in to manage your shop profile'}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">

                    {/* Social Auth Buttons */}
                    <div className="space-y-3 mb-6">
                        {/* Google */}
                        <button
                            onClick={() => handleSocialAuth(googleProvider, 'Google')}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-semibold text-charcoal dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        {/* GitHub */}
                        <button
                            onClick={() => handleSocialAuth(githubProvider, 'GitHub')}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 dark:bg-gray-600 rounded-xl text-sm font-semibold text-white hover:bg-gray-800 dark:hover:bg-gray-500 transition-all duration-200 hover:shadow-md"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </button>

                        {/* Facebook */}
                        <button
                            onClick={() => handleSocialAuth(facebookProvider, 'Facebook')}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] rounded-xl text-sm font-semibold text-white hover:bg-[#166FE5] transition-all duration-200 hover:shadow-md"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Continue with Facebook
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
                        <span className="text-xs font-semibold text-muted uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-charcoal dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-commerce focus:border-commerce outline-none transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-charcoal dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-commerce focus:border-commerce outline-none transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-charcoal dark:bg-white text-white dark:text-charcoal font-bold text-sm rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                        >
                            {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
                        </button>
                    </form>

                    {/* Toggle signup/login */}
                    <p className="text-center mt-6 text-sm text-muted">
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <span
                            className="text-commerce font-semibold cursor-pointer hover:underline"
                            onClick={() => setIsSignup(!isSignup)}
                        >
                            {isSignup ? 'Sign In' : 'Create Account'}
                        </span>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <BackToHomeBtn />
                </div>
            </div>
        </div>
    );
};

export default Auth;
