import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import BackToHomeBtn from '../../components/backToHomeBtn/index.jsx';
import LogoutBtn from '../../components/logoutBtn/index.jsx';

const AddShop = () => {
    const navigate = useNavigate();
    const [shopName, setShopName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [phone, setPhone] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [links, setLinks] = useState([{ name: '', link: '' }]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Get current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                navigate('/auth');
            }
        });
        return () => unsubscribe();
    }, []);

    // Check if user already has a shop
    useEffect(() => {
        const checkShop = async () => {
            if (!user) return;
            const shopRef = doc(db, 'shops', user.uid);
            const shopSnap = await getDoc(shopRef);
            if (shopSnap.exists()) {
                navigate(`/shop/${user.uid}`);
            }
        };
        checkShop();
    }, [user]);

    // Links handlers
    const handleAddLink = () => setLinks([...links, { name: '', link: '' }]);
    const handleRemoveLink = (index) => setLinks(links.filter((_, i) => i !== index));
    const handleLinkChange = (index, field, value) => {
        const newLinks = [...links];
        newLinks[index][field] = value;
        setLinks(newLinks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!user) return;

        // Validation
        if (!shopName.trim()) {
            setError('Shop name is required');
            toast.error('Shop name is required');
            return;
        }
        if (!ownerName.trim()) {
            setError('Owner name is required');
            toast.error('Owner name is required');
            return;
        }
        if (!phone.trim()) {
            setError('Phone number is required');
            toast.error('Phone number is required');
            return;
        }

        const tagsArray = tags.split(',').map((t) => t.trim()).filter((t) => t);
        const validLinks = links.filter(l => l.name && l.link);

        try {
            await setDoc(doc(db, 'shops', user.uid), {
                shop_name: shopName,
                owner_name: ownerName,
                phone,
                tags: tagsArray,
                description,
                new_location: location,
                links: validLinks,
                verification_status: 'pending',
                created_at: serverTimestamp()
            });

            toast.success('Shop added successfully!');
            navigate(`/shop/${user.uid}`);
        } catch (err) {
            setError(err.message);
            toast.error('Failed to add shop: ' + err.message);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <BackToHomeBtn />
            {user && <LogoutBtn />}
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{
                    padding: '1.5rem',
                    maxWidth: '28rem',
                    width: '100%',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.25rem'
                }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Add Your Shop</h1>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" placeholder="Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} required />
                        <input type="text" placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} required />
                        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} required />
                        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
                        <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>Each tag should be separated by a comma (e.g., tag1, tag2, tag3)</small>
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', minHeight: '5rem' }} />
                        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />

                        {/* Links Section */}
                        <div>
                            <h3 style={{ fontWeight: '600', marginTop: '1rem' }}>Social / Contact Links</h3>
                            {links.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <input type="text" placeholder="Platform Name (WhatsApp, Instagram...)" value={item.name} onChange={(e) => handleLinkChange(idx, 'name', e.target.value)} style={{ flex: 1, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
                                    <input type="text" placeholder="Link" value={item.link} onChange={(e) => handleLinkChange(idx, 'link', e.target.value)} style={{ flex: 2, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
                                    <button type="button" onClick={() => handleRemoveLink(idx)} style={{ background: '#ef4444', color: 'white', padding: '0 0.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}>X</button>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddLink} style={{ marginTop: '0.5rem', background: '#3b82f6', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}>+ Add Link</button>
                        </div>

                        {error && <p style={{ color: '#ef4444' }}>{error}</p>}
                        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'} onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}>Add Shop</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddShop;
