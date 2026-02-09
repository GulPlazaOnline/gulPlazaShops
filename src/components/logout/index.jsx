// src/components/Logout/index.jsx
import { useEffect } from 'react';
import supabase from '../../supabase.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const signOut = async () => {
            const { error } = await supabase.auth.signOut();
            if (error) toast.error('Logout failed: ' + error.message);
            navigate('/auth'); // redirect to login/signup page
        };

        signOut();
    }, []);

    return <p className="text-center mt-10">Logging out...</p>;
};

export default Logout;
