import { useState, useEffect } from 'react';
import { auth } from '../../firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

/* ── tiny inline SVG icons ── */
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);
const GithubIcon = () => (
    <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
    </svg>
);
const FacebookIcon = () => (
    <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);
const MailIcon = () => (
    <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
);
const ArrowLeft = () => (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

/* ── Shared styles using CSS variables ── */
const s = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
    },
    /* Card styles moved to .auth-card class */
    logo: {
        width: 52, height: 52,
        background: 'var(--foreground)',
        color: 'var(--card)',
        borderRadius: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        fontFamily: "'Fraunces', serif",
        fontWeight: 900,
        fontSize: '1.25rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    },
    heading: {
        fontFamily: "'Fraunces', serif",
        fontSize: '1.75rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        textAlign: 'center',
        margin: 0,
        color: 'var(--foreground)',
    },
    sub: {
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--muted-foreground)',
        marginTop: '0.5rem',
        fontWeight: 500,
    },
    btnPrimary: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0.85rem 1rem',
        borderRadius: '0.75rem',
        border: 'none',
        background: 'var(--foreground)',
        color: 'var(--card)',
        fontSize: '0.9rem',
        fontWeight: 600,
        fontFamily: "'Outfit', sans-serif",
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    btnOutline: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--foreground)',
        fontSize: '0.875rem',
        fontWeight: 500,
        fontFamily: "'Outfit', sans-serif",
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    btnSecondary: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border)',
        background: 'var(--secondary)',
        color: 'var(--secondary-foreground)',
        fontSize: '0.875rem',
        fontWeight: 500,
        fontFamily: "'Outfit', sans-serif",
        cursor: 'pointer',
        transition: 'all 0.15s ease',
    },
    separator: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        margin: '1.5rem 0',
    },
    separatorLine: {
        flex: 1,
        height: 1,
        background: 'var(--border)',
    },
    separatorText: {
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--muted-foreground)',
        whiteSpace: 'nowrap',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--border)',
        background: 'var(--secondary)',
        color: 'var(--foreground)',
        fontSize: '0.875rem',
        fontFamily: "'Outfit', sans-serif",
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxSizing: 'border-box',
    },
    label: {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: 'var(--muted-foreground)',
        marginBottom: '0.375rem',
    },
    link: {
        fontWeight: 600,
        cursor: 'pointer',
        color: 'var(--foreground)',
        textDecoration: 'none',
        transition: 'opacity 0.15s',
    },
    footer: {
        marginTop: '1.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--muted-foreground)',
        lineHeight: 1.6,
    },
};

/* ── keyframe animation injected once ── */
const animCSS = `
@keyframes authFadeUp {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.auth-enter { animation: authFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
.auth-enter-delay { animation: authFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.12s both; }

.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid color-mix(in srgb, var(--border), var(--foreground) 10%);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.08);
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
}
.auth-card:hover {
  border-color: color-mix(in srgb, var(--border), var(--foreground) 20%);
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.auth-btn { transition: all 0.2s ease; }
.auth-btn:hover { opacity: 0.92; transform: translateY(-1px); }
.auth-btn:active { transform: translateY(0) scale(0.98); }
.auth-input:focus { border-color: var(--foreground) !important; box-shadow: 0 0 0 2px color-mix(in srgb, var(--foreground) 10%, transparent); }
`;

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [view, setView] = useState('social'); // 'social' | 'email'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { setMounted(true); }, []);

    const toggleMode = () => {
        const next = !isSignup;
        setIsSignup(next);
        setSearchParams({ mode: next ? 'signup' : 'login' });
    };

    const handleSocial = async (provider, name) => {
        try {
            await signInWithPopup(auth, provider);
            toast.success(`Signed in with ${name}!`);
            navigate('/');
        } catch (err) {
            if (err.code === 'auth/popup-closed-by-user') return;
            toast.error(err.code === 'auth/account-exists-with-different-credential'
                ? 'Account exists with a different provider.'
                : err.message);
        }
    };

    const handleEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(auth, email, password);
                toast.success('Account created!');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Welcome back!');
            }
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
        setLoading(false);
    };

    /* ── Email / Password form ── */
    if (view === 'email') {
        return (
            <div style={s.page}>
                <style>{animCSS}</style>
                <div className="auth-card auth-enter">
                    {/* Logo */}
                    <div style={s.logo}>GP</div>

                    <h1 style={s.heading}>{isSignup ? 'Create account' : 'Welcome back'}</h1>
                    <p style={s.sub}>{isSignup ? 'Start your journey with Gul Plaza' : 'Sign in to manage your shop'}</p>

                    <form onSubmit={handleEmail} style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={s.label}>Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="auth-input"
                                style={s.input}
                            />
                        </div>
                        <div>
                            <label style={s.label}>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="auth-input"
                                style={s.input}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="auth-btn"
                            style={{ ...s.btnPrimary, marginTop: '0.25rem', opacity: loading ? 0.6 : 1 }}
                        >
                            {loading ? 'Please wait…' : isSignup ? 'Create Account' : 'Sign In'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                        {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                        <span style={s.link} onClick={toggleMode} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 1}>
                            {isSignup ? 'Sign In' : 'Create Account'}
                        </span>
                    </p>

                    {/* Separator */}
                    <div style={s.separator}>
                        <div style={s.separatorLine} />
                        <span style={s.separatorText}>or</span>
                        <div style={s.separatorLine} />
                    </div>

                    <button
                        className="auth-btn"
                        style={s.btnOutline}
                        onClick={() => setView('social')}
                    >
                        <ArrowLeft /> Back to all sign-in options
                    </button>
                </div>

                <div className="auth-enter-delay" style={s.footer}>
                    By signing in, you agree to our <u style={{ cursor: 'pointer' }}>Terms of Service</u> and <u style={{ cursor: 'pointer' }}>Privacy Policy</u>.
                </div>
            </div>
        );
    }

    /* ── Main social login view ── */
    return (
        <div style={s.page}>
            <style>{animCSS}</style>
            <div style={{ width: '100%', maxWidth: '420px' }}>
                <div className={`auth-card ${mounted ? 'auth-enter' : ''}`}>
                    {/* Logo */}
                    <div style={s.logo}>GP</div>

                    <h1 style={s.heading}>Welcome Back</h1>
                    <p style={s.sub}>Sign in to manage your shop profile</p>

                    {/* Google — primary CTA */}
                    <button
                        className="auth-btn"
                        style={{ ...s.btnPrimary, marginTop: '1.75rem' }}
                        onClick={() => handleSocial(googleProvider, 'Google')}
                    >
                        <GoogleIcon /> Continue with Google
                    </button>

                    {/* Separator */}
                    <div style={s.separator}>
                        <div style={s.separatorLine} />
                        <span style={s.separatorText}>or continue with</span>
                        <div style={s.separatorLine} />
                    </div>

                    {/* Secondary providers */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button className="auth-btn" style={s.btnSecondary} onClick={() => handleSocial(githubProvider, 'GitHub')}>
                            <GithubIcon /> Continue with GitHub
                        </button>
                        <button className="auth-btn" style={s.btnSecondary} onClick={() => handleSocial(facebookProvider, 'Facebook')}>
                            <FacebookIcon /> Continue with Facebook
                        </button>
                        <button className="auth-btn" style={s.btnSecondary} onClick={() => setView('email')}>
                            <MailIcon /> Continue with Email
                        </button>
                    </div>

                    {/* Separator */}
                    <div style={{ ...s.separator, margin: '1.25rem 0 0.75rem' }}>
                        <div style={s.separatorLine} />
                    </div>

                    {/* Back to Home */}
                    <button className="auth-btn" style={s.btnOutline} onClick={() => navigate('/')}>
                        <ArrowLeft /> Back to Home
                    </button>
                </div>

                {/* Footer */}
                <div className={mounted ? 'auth-enter-delay' : ''} style={s.footer}>
                    By signing in, you agree to our <u style={{ cursor: 'pointer' }}>Terms of Service</u> and <u style={{ cursor: 'pointer' }}>Privacy Policy</u>.
                </div>
            </div>
        </div>
    );
};

export default Auth;
