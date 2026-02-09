import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackToHomeBtn = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/')}
            style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
            Back to Home
        </button>
    )
}

export default BackToHomeBtn