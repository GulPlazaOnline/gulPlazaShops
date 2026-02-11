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
import { AuthForm } from '@/components/ui/sign-in-1';
import { Button } from '@/components/ui/button';
import BackToHomeBtn from '../../components/backToHomeBtn/index.jsx';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Icons
const IconGoogle = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const IconGithub = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
    </svg>
);

const IconFacebook = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const IconMail = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
);

const Auth = () => {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    const handleEmailAuth = async (e) => {
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

    // If email form is shown, render the email/password form
    if (showEmailForm) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center p-4" style={{ backgroundColor: 'var(--background)' }}>
                <div className="w-full max-w-sm animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500">
                    <div className="rounded-lg border shadow-sm p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--card-foreground)' }}>
                        <div className="text-center mb-6">
                            <div className="mb-4 flex justify-center">
                                <div className="w-12 h-12 bg-charcoal dark:bg-white rounded-[4px] flex items-center justify-center">
                                    <span className="text-white dark:text-charcoal font-bold text-lg">GP</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>
                                {isSignup ? 'Create Account' : 'Sign In with Email'}
                            </h2>
                            <p className="text-sm mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
                                {isSignup ? 'Create a new account' : 'Enter your credentials to continue'}
                            </p>
                        </div>

                        <form onSubmit={handleEmailAuth} className="grid gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                                    style={{
                                        backgroundColor: 'var(--secondary)',
                                        border: '1px solid var(--input)',
                                        color: 'var(--foreground)'
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                                    style={{
                                        backgroundColor: 'var(--secondary)',
                                        border: '1px solid var(--input)',
                                        color: 'var(--foreground)'
                                    }}
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
                            </Button>
                        </form>

                        <p className="text-center mt-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <span
                                className="font-semibold cursor-pointer hover:underline"
                                style={{ color: 'var(--foreground)' }}
                                onClick={() => setIsSignup(!isSignup)}
                            >
                                {isSignup ? 'Sign In' : 'Create Account'}
                            </span>
                        </p>

                        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setShowEmailForm(false)}
                            >
                                ← Back to all sign-in options
                            </Button>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <BackToHomeBtn />
                    </div>
                </div>
            </div>
        );
    }

    // Main auth view with social buttons via AuthForm
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4" style={{ backgroundColor: 'var(--background)' }}>
            <div className="w-full max-w-sm">
                <AuthForm
                    logoSrc=""
                    logoAlt="Gul Plaza"
                    title="Welcome Back"
                    description="Sign in to manage your shop profile"
                    primaryAction={{
                        label: "Continue with Google",
                        icon: <IconGoogle className="mr-2 h-4 w-4" />,
                        onClick: () => handleSocialAuth(googleProvider, 'Google'),
                    }}
                    secondaryActions={[
                        {
                            label: "Continue with GitHub",
                            icon: <IconGithub className="mr-2 h-4 w-4" />,
                            onClick: () => handleSocialAuth(githubProvider, 'GitHub'),
                        },
                        {
                            label: "Continue with Facebook",
                            icon: <IconFacebook className="mr-2 h-4 w-4" />,
                            onClick: () => handleSocialAuth(facebookProvider, 'Facebook'),
                        },
                        {
                            label: "Continue with Email",
                            icon: <IconMail className="mr-2 h-4 w-4" />,
                            onClick: () => setShowEmailForm(true),
                        },
                    ]}
                    skipAction={{
                        label: "← Back to Home",
                        onClick: () => navigate('/'),
                    }}
                    footerContent={
                        <>
                            By signing in, you agree to our{" "}
                            <u className="cursor-pointer transition-colors hover:text-charcoal dark:hover:text-white">Terms of Service</u>{" "}
                            and{" "}
                            <u className="cursor-pointer transition-colors hover:text-charcoal dark:hover:text-white">Privacy Policy</u>.
                        </>
                    }
                />

                {/* Custom logo override: render GP logo instead of img */}
            </div>
        </div>
    );
};

export default Auth;
