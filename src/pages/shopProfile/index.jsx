// src/pages/ShopProfile/index.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BackToHomeBtn from '../../components/backToHomeBtn/index.jsx';
import LogoutBtn from '../../components/logoutBtn/index.jsx';

const ShopProfile = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const navigate = useNavigate();

    const normalizeUrl = (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        } else {
            return 'https://' + url;
        }
    };

    const shareUrl = `https://gul-plaza-relief.web.app/shop/${id}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('URL copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy URL');
        }
    };

    const shareOnPlatform = (platform) => {
        let url = '';
        switch (platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=Check out this shop: ${encodeURIComponent(shareUrl)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this shop`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
            default:
                return;
        }
        window.open(url, '_blank');
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchShop = async () => {
            setLoading(true);
            try {
                const shopSnap = await getDoc(doc(db, 'shops', id));

                if (!shopSnap.exists()) {
                    toast.error('Shop not found');
                    setShop(null);
                } else {
                    setShop({ id: shopSnap.id, ...shopSnap.data() });
                }
            } catch (error) {
                toast.error('Failed to load shop: ' + error.message);
                setShop(null);
            }
            setLoading(false);
        };

        fetchShop();
    }, [id]);

    if (loading) return <p style={{ textAlign: 'center', marginTop: '5rem' }}>Loading shop...</p>;
    if (!shop) return <p style={{ textAlign: 'center', marginTop: '5rem', color: '#ef4444' }}>Shop not found!</p>;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <BackToHomeBtn />
            {user && <LogoutBtn />}
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '5rem', paddingBottom: '2rem' }}>
                <div style={{
                    padding: '1.5rem',
                    maxWidth: '48rem',
                    width: '100%',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.25rem'
                }}>
                    {/* Shop Name */}
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Name: {shop.shop_name}</h1>

                    {/* Owner Info */}
                    <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Owner: {shop.owner_name}</p>

                    {/* Contact & Location */}
                    <div style={{ marginBottom: '1rem' }}>
                        {shop.phone && <p>📞 Phone: {shop.phone}</p>}
                        {shop.new_location && <p>📍 Location: {shop.new_location}</p>}
                    </div>

                    {/* Description */}
                    {shop.description && (
                        <div style={{ marginBottom: '1rem' }}>
                            <h2 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Description:</h2>
                            <p>{shop.description}</p>
                        </div>
                    )}

                    {/* Tags */}
                    {shop.tags?.length > 0 && (
                        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {shop.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        backgroundColor: '#dbeafe',
                                        color: '#1e40af',
                                        fontSize: '0.875rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '0.25rem'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {shop.links && shop.links.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                            <h2 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Links:</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {shop.links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={normalizeUrl(link.link)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#3b82f6',
                                            textDecoration: 'none',
                                            padding: '0.5rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.25rem',
                                            backgroundColor: '#f9fafb',
                                            display: 'inline-block',
                                            maxWidth: 'fit-content'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e0f2fe'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
                                    >
                                        {link.name}: {link.link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    {user && user.uid == id && (
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                onClick={() => navigate(`/edit-shop/${id}`)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                            >
                                Edit Shop
                            </button>
                        </div>
                    )}
                    <div style={{ marginTop: '1rem' }}>
                        <button
                            onClick={() => setShowShareModal(true)}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.25rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                        >
                            Share Shop
                        </button>
                    </div>
                </div>
            </div>
            {showShareModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }} onClick={() => setShowShareModal(false)}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        maxWidth: '28rem',
                        width: '100%',
                        margin: '1rem'
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>Share this Shop</h3>
                        <p style={{ marginBottom: '1rem' }}>Shop URL: {shareUrl}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button onClick={copyToClipboard} style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Copy URL</button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <button onClick={() => shareOnPlatform('whatsapp')} style={{ padding: '0.5rem 1rem', backgroundColor: '#25d366', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>WhatsApp</button>
                            <button onClick={() => shareOnPlatform('facebook')} style={{ padding: '0.5rem 1rem', backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Facebook</button>
                            <button onClick={() => shareOnPlatform('twitter')} style={{ padding: '0.5rem 1rem', backgroundColor: '#1da1f2', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Twitter</button>
                            <button onClick={() => shareOnPlatform('linkedin')} style={{ padding: '0.5rem 1rem', backgroundColor: '#0077b5', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>LinkedIn</button>
                        </div>
                        <button onClick={() => setShowShareModal(false)} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopProfile;
