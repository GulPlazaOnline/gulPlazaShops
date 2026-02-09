import React from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase.js';
import { toast } from 'react-toastify';

const LogoutBtn = ({ className }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error('Logout failed: ' + error.message);
        } else {
            navigate('/auth');
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