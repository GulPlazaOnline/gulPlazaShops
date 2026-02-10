// src/components/Logout/index.jsx
import { useEffect } from 'react';
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const doSignOut = async () => {
            try {
                await signOut(auth);
            } catch (error) {
                toast.error('Logout failed: ' + error.message);
            }
            navigate('/auth');
        };

        doSignOut();
    }, []);

    return <p className="text-center mt-10">Logging out...</p>;
};

export default Logout;
