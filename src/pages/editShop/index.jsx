import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../supabase.js';
import { toast } from 'react-toastify';
import BackToHomeBtn from '../../components/backToHomeBtn/index.jsx';
import LogoutBtn from '../../components/logoutBtn/index.jsx';

const EditShop = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [shopName, setShopName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [phone, setPhone] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [links, setLinks] = useState([{ name: '', link: '' }]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    // Links handlers
    const handleAddLink = () => setLinks([...links, { name: '', link: '' }]);
    const handleRemoveLink = (index) => setLinks(links.filter((_, i) => i !== index));
    const handleLinkChange = (index, field, value) => {
        const updated = [...links];
        updated[index][field] = value;
        setLinks(updated);
    };

    // Get current user
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                toast.error('Please login first');
                navigate('/auth');
            } else {
                setUser(data.user);
            }
        };
        getUser();
    }, []);

    // Fetch shop
    useEffect(() => {
        const fetchShop = async () => {
            if (!user || user.id !== id) return;

            const { data, error } = await supabase
                .from('shops')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                toast.error('Shop not found or access denied');
                navigate('/');
                return;
            }

            setShopName(data.shop_name || '');
            setOwnerName(data.owner_name || '');
            setPhone(data.phone || '');
            setTags(data.tags ? data.tags.join(', ') : '');
            setDescription(data.description || '');
            setLocation(data.new_location || '');
            setLinks(data.links || [{ name: '', link: '' }]);
            setLoading(false);
        };

        if (user) fetchShop();
    }, [user, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || user.id !== id) {
            toast.error('Unauthorized action');
            return;
        }

        // Validation: Check required fields
        if (!shopName.trim()) {
            toast.error('Shop name is required');
            return;
        }
        if (!ownerName.trim()) {
            toast.error('Owner name is required');
            return;
        }
        if (!phone.trim()) {
            toast.error('Phone number is required');
            return;
        }

        const tagsArray = tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean);

        const validLinks = links.filter(l => l.name && l.link);

        const { error } = await supabase
            .from('shops')
            .update({
                shop_name: shopName,
                owner_name: ownerName,
                phone,
                tags: tagsArray,
                description,
                new_location: location,
                links: validLinks,
            })
            .eq('id', id);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Shop updated successfully');
            navigate(`/shop/${id}`);
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '5rem' }}>Loading...</p>;
    }

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
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderRadius: '0.25rem'
                }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                        Edit Shop
                    </h1>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="Shop Name" required style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
                        <input value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="Owner Name" required style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
                        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" required style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
                        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />
                        <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>Each tag should be separated by a comma (e.g., tag1, tag2, tag3)</small>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', minHeight: '5rem' }} />
                        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }} />

                        {/* Links */}
                        <div>
                            <strong>Social / Contact Links</strong>
                            {links.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <input
                                        placeholder="Platform"
                                        value={item.name}
                                        onChange={(e) => handleLinkChange(idx, 'name', e.target.value)}
                                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                                    />
                                    <input
                                        placeholder="Link"
                                        value={item.link}
                                        onChange={(e) => handleLinkChange(idx, 'link', e.target.value)}
                                        style={{ flex: 2, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                                    />
                                    <button type="button" onClick={() => handleRemoveLink(idx)} style={{ background: '#ef4444', color: 'white', padding: '0 0.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}>X</button>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddLink} style={{ marginTop: '0.5rem', background: '#3b82f6', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}>+ Add Link</button>
                        </div>

                        <button type="submit" style={{ background: '#10b981', color: '#fff', padding: '0.5rem' }}>
                            Update Shop
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditShop;
