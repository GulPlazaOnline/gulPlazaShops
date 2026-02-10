import { useState } from 'react';
import { auth } from '../../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackToHomeBtn from '../../components/backToHomeBtn/index.jsx';

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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1rem'
        }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {isSignup ? 'Sign Up' : 'Login'}
            </h1>

            <form
                onSubmit={handleAuth}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '100%',
                    maxWidth: '24rem'
                }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        border: '1px solid #d1d5db',
                        padding: '0.5rem',
                        borderRadius: '0.25rem'
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        border: '1px solid #d1d5db',
                        padding: '0.5rem',
                        borderRadius: '0.25rem'
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? '#93c5fd' : '#3b82f6',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>

            <p style={{ marginTop: '1rem', color: '#4b5563' }}>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span
                    style={{ color: '#3b82f6', cursor: 'pointer' }}
                    onClick={() => setIsSignup(!isSignup)}
                >
                    {isSignup ? 'Login' : 'Sign Up'}
                </span>
            </p>

            <BackToHomeBtn />
        </div>
    );
};

export default Auth;
