// src/pages/admin/index.jsx
import { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedShop, setSelectedShop] = useState(null);
    const navigate = useNavigate();

    // Fetch all shops
    const fetchShops = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'shops'), orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);
            const allShops = querySnapshot.docs.map(docSnap => ({
                id: docSnap.id,
                ...docSnap.data()
            }));
            setShops(allShops);
        } catch (error) {
            console.error('Error fetching shops:', error);
            toast.error('Failed to load triage data');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchShops();
    }, []);

    // Group shops by status
    const pendingShops = shops.filter(s => s.verification_status === 'pending');
    const verifiedShops = shops.filter(s => s.verification_status === 'verified');

    const KanbanColumn = ({ title, items, statusColor, count }) => (
        <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex flex-col h-full min-h-[600px] border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700 dark:text-gray-200">{title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                    {count}
                </span>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1">
                {items.length === 0 ? (
                    <div className="text-center py-8 text-muted text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                        No items
                    </div>
                ) : (
                    items.map(shop => (
                        <div
                            key={shop.id}
                            onClick={() => setSelectedShop(shop)}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md cursor-pointer transition-all border-l-4"
                            style={{ borderLeftColor: shop.verification_status === 'verified' ? '#16A34A' : '#EAB308' }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="mono text-xs text-muted">{shop.shop_id || 'NO-ID'}</span>
                                <span className="text-xs text-muted">
                                    {shop.created_at?.toDate ? new Date(shop.created_at.toDate()).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <h4 className="font-bold text-charcoal dark:text-white text-sm mb-1">{shop.shop_name}</h4>
                            <p className="text-xs text-muted mb-3">{shop.owner_name}</p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-1">
                                {shop.current_status === 'deceased' && (
                                    <span className="px-1.5 py-0.5 bg-gray-900 text-white text-[10px] rounded uppercase font-bold">Deceased</span>
                                )}
                                {shop.current_status === 'missing' && (
                                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded uppercase font-bold">Missing</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-charcoal dark:text-white">Relief Triage</h1>
                    <p className="text-muted">Verify shops and manage status reports.</p>
                </div>
                <button onClick={fetchShops} className="btn-secondary text-sm">
                    Refresh Data
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-96 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-6 h-full overflow-x-auto pb-6">
                    {/* Column 1: Pending */}
                    <KanbanColumn
                        title="Pending Review"
                        items={pendingShops}
                        count={pendingShops.length}
                        statusColor="bg-yellow-100 text-yellow-800"
                    />

                    {/* Column 2: Live / Verified */}
                    <KanbanColumn
                        title="Live on Site"
                        items={verifiedShops}
                        count={verifiedShops.length}
                        statusColor="bg-green-100 text-green-800"
                    />

                    {/* Column 3: Flagged / Reported (Future) */}
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 opacity-50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-500">Flagged Reports</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">0</span>
                        </div>
                        <div className="text-center py-12 text-muted text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                            Report handling coming soon
                        </div>
                    </div>
                </div>
            )}

            {/* Triage Edit Modal */}
            {selectedShop && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 dark:border-gray-700">
                        {/* Header */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-charcoal dark:text-white font-serif">
                                    Triage Case #{selectedShop.shop_id || 'NEW'}
                                </h2>
                                <p className="text-xs text-muted font-mono uppercase tracking-wide">
                                    {selectedShop.shop_name} • {selectedShop.owner_name}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedShop(null)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {/* Verification Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700/50">
                                <div>
                                    <h3 className="font-semibold text-charcoal dark:text-white text-sm">Verification Status</h3>
                                    <p className="text-xs text-muted mt-1">Mark this shop as verified to display the green badge.</p>
                                </div>
                                <button
                                    onClick={() => setSelectedShop({
                                        ...selectedShop,
                                        verification_status: selectedShop.verification_status === 'verified' ? 'pending' : 'verified'
                                    })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-commerce ${selectedShop.verification_status === 'verified' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${selectedShop.verification_status === 'verified' ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>

                            {/* Crisis Status */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-charcoal dark:text-gray-300">
                                    Crisis Status Override
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['active', 'deceased', 'missing'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setSelectedShop({ ...selectedShop, current_status: status })}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all capitalize ${selectedShop.current_status === status
                                                ? status === 'active'
                                                    ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400 Ring-2 Ring-green-500/20'
                                                    : status === 'deceased'
                                                        ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 Ring-2 Ring-red-500/20'
                                                        : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 Ring-2 Ring-amber-500/20'
                                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Admin Notes */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-charcoal dark:text-gray-300">
                                    Internal Admin Notes
                                </label>
                                <textarea
                                    value={selectedShop.admin_notes || ''}
                                    onChange={(e) => setSelectedShop({ ...selectedShop, admin_notes: e.target.value })}
                                    placeholder="Add context (e.g., 'Verified via WhatsApp video call')"
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-commerce focus:border-commerce min-h-[80px]"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedShop(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await updateDoc(doc(db, 'shops', selectedShop.id), {
                                            verification_status: selectedShop.verification_status,
                                            current_status: selectedShop.current_status,
                                            admin_notes: selectedShop.admin_notes,
                                            last_verified_at: selectedShop.verification_status === 'verified' ? new Date().toISOString() : null
                                        });

                                        toast.success('Shop updated successfully');
                                        setSelectedShop(null);
                                        fetchShops();
                                    } catch (error) {
                                        toast.error('Failed to update shop');
                                        console.error(error);
                                    }
                                }}
                                className="px-6 py-2 bg-commerce hover:bg-commerce-hover text-white text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
