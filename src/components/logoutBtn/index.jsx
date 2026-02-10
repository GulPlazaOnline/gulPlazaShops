import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const LogoutBtn = ({ className }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/auth');
        } catch (error) {
            toast.error('Logout failed: ' + error.message);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors ${className || ''}`}
        >
            Logout
        </button>
    )
}

export default LogoutBtn