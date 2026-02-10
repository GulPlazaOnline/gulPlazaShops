// src/pages/directory/index.jsx
// Shop Directory Page - Separate from Landing
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import ShopCard from '../../components/shopCard';
import SearchBar from '../../components/searchBar';
import { ScrollReveal } from '../../hooks/useScrollAnimation.jsx';

const Directory = () => {
    const [shops, setShops] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch shops from Firestore
    useEffect(() => {
        const fetchShops = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'shops'));
                let allShops = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Client-side search filter
                if (search) {
                    const term = search.toLowerCase();
                    allShops = allShops.filter(shop =>
                        shop.shop_name?.toLowerCase().includes(term) ||
                        shop.owner_name?.toLowerCase().includes(term) ||
                        (shop.tags && shop.tags.some(tag =>
                            tag.toLowerCase().includes(term)
                        ))
                    );
                }

                setShops(allShops);
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error('Failed to load shops. Please try again.');
            }
            setLoading(false);
        };

        fetchShops();
    }, [search]);

    return (
        <div className="min-h-screen bg-surface dark:bg-surface-dark">
            {/* Page Header */}
            <section className="bg-charcoal text-white py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="text-white/60 hover:text-white text-sm font-mono uppercase tracking-wider mb-6 flex items-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </button>
                    <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">
                        Shop Directory
                    </h1>
                    <p className="text-white/70 max-w-xl text-lg">
                        Every shop listed here was destroyed in the Gul Plaza fire. Browse, connect, and help them rebuild.
                    </p>
                </div>
            </section>

            {/* Directory Content */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Search Section */}
                    <ScrollReveal animation="fade-up" duration={600}>
                        <div className="max-w-2xl mx-auto mb-12">
                            <SearchBar search={search} setSearch={setSearch} />
                        </div>
                    </ScrollReveal>

                    {/* Filter Bar */}
                    <ScrollReveal animation="fade-up" delay={100} duration={600}>
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-mono text-muted uppercase tracking-wider">
                                    {shops.length} {shops.length === 1 ? 'Profile' : 'Profiles'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 bg-charcoal dark:bg-white text-white dark:text-charcoal text-xs font-bold uppercase tracking-wider transition-all">
                                    All
                                </button>
                                <button className="px-4 py-2 bg-transparent text-muted text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-gray-700 hover:border-charcoal dark:hover:border-white transition-all">
                                    Verified
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Shops Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 animate-pulse">
                                    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6" />
                                        <div className="flex gap-2">
                                            <div className="h-6 bg-gray-200 dark:bg-gray-700 w-16" />
                                            <div className="h-6 bg-gray-200 dark:bg-gray-700 w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : shops.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {shops.map((shop, index) => (
                                <ScrollReveal
                                    key={shop.id}
                                    animation="fade-up"
                                    delay={index * 80}
                                    duration={500}
                                    threshold={0.05}
                                >
                                    <ShopCard shop={shop} />
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <ScrollReveal animation="fade-up">
                            <div className="text-center py-20 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold font-serif text-charcoal dark:text-white mb-2">
                                    No Matching Shops Found
                                </h3>
                                <p className="text-muted mb-8 max-w-md mx-auto">
                                    Do you know a shopkeeper affected by the fire? Help us build this directory.
                                </p>
                                <button
                                    onClick={() => navigate('/add-shop')}
                                    className="px-6 py-3 bg-charcoal text-white font-bold uppercase tracking-wide hover:bg-charcoal/90 transition-all"
                                >
                                    Submit a Shop Profile
                                </button>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Directory;
