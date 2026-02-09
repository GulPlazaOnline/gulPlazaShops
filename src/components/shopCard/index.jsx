// src/components/shopCard/index.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ShopCard = ({ shop }) => {
    const navigate = useNavigate();
    const [showReportModal, setShowReportModal] = useState(false);

    // Determine card type based on shop status
    // Determine card type based on shop status
    const getCardStyle = () => {
        if (shop.current_status === 'deceased') return 'card-tribute';
        if (shop.current_status === 'missing') return 'card-alert';
        return 'card-commerce';
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        const url = `${window.location.origin}/shop/${shop.id}`;
        await navigator.clipboard.writeText(url);
        // Could add toast notification here
    };

    const handleReport = (e) => {
        e.stopPropagation();
        setShowReportModal(true);
    };

    return (
        <>
            <div
                onClick={() => navigate(`/shop/${shop.id}`)}
                className={`group relative ${getCardStyle()} card-soft cursor-pointer bg-white dark:bg-zinc-900 overflow-hidden h-full flex flex-col`}
            >
                {/* Status Badge */}
                {shop.verification_status === 'verified' && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="status-pill status-verified shadow-md backdrop-blur-md bg-white/90 dark:bg-zinc-800/90">
                            <svg className="w-3 h-3 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified
                        </span>
                    </div>
                )}

                {/* Deceased/Missing Status */}
                {shop.current_status === 'deceased' && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="status-pill status-deceased shadow-md">Deceased Owner</span>
                    </div>
                )}
                {shop.current_status === 'missing' && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="status-pill bg-amber-100 text-amber-900 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 shadow-md">Missing</span>
                    </div>
                )}

                <div className="relative h-56 w-full overflow-hidden bg-gray-50 dark:bg-zinc-800">
                    {/* Shop Image or Fallback Gradient */}
                    {shop.image_url ? (
                        <img
                            src={shop.image_url}
                            alt={shop.shop_name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${shop.current_status === 'deceased' ? 'from-gray-800 via-gray-700 to-gray-900' :
                            shop.current_status === 'missing' ? 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40' :
                                'from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900'
                            } flex items-center justify-center`}>

                            {/* Visual Fallback: Logo/Initials */}
                            {shop.logo_url ? (
                                <img src={shop.logo_url} alt="Logo" className="h-20 w-20 opacity-90 mix-blend-multiply dark:mix-blend-screen grayscale contrast-125 rounded-xl shadow-sm" />
                            ) : (
                                <span className="text-5xl font-serif font-black text-gray-200 dark:text-zinc-700 select-none">
                                    {shop.shop_name?.charAt(0) || 'G'}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Overlay Gradient for Text Readability */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-60" />
                </div>

                <div className="flex flex-col flex-grow relative z-0 p-6">
                    {/* Shop Tags - Top of Content */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {shop.tags?.slice(0, 3).map((tag, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Shop Name */}
                    <h2 className="text-xl font-bold font-serif text-charcoal dark:text-white group-hover:text-commerce transition-colors mb-1 leading-tight">
                        {shop.shop_name}
                    </h2>

                    {/* Owner */}
                    <p className="text-xs text-gray-500 mb-4 flex items-center gap-2 font-mono">
                        <span className="uppercase tracking-wider font-bold text-[10px] text-gray-400">Owner:</span>
                        {shop.owner_name}
                    </p>

                    {/* Shop ID (Monospace) - Moved to bottom */}
                    {shop.shop_id && (
                        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-zinc-800 flex items-center justify-between">
                            <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
                                {shop.shop_id}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleShare}
                                    className="p-2 text-gray-400 hover:text-charcoal dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
                                    title="Share"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleReport}
                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-all"
                                    title="Report"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Report Modal - Softened */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowReportModal(false)}>
                    <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold font-serif text-charcoal dark:text-white mb-2 text-center">Report Issue</h3>
                        <p className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-wider text-center">Help us maintain integrity</p>

                        <div className="space-y-3">
                            {['Fake Shop', 'Wrong Information', 'Potential Scam', 'Duplicate Entry'].map((reason) => (
                                <button
                                    key={reason}
                                    className="w-full text-left px-5 py-3 rounded-xl bg-gray-50 dark:bg-zinc-700/50 hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm font-medium text-charcoal dark:text-white transition-all duration-200 flex items-center justify-between group"
                                    onClick={() => {
                                        setShowReportModal(false);
                                    }}
                                >
                                    {reason}
                                    <span className="opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity">→</span>
                                </button>
                            ))}
                        </div>
                        <button
                            className="mt-6 w-full text-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-charcoal dark:hover:text-white transition-colors pt-2"
                            onClick={() => setShowReportModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShopCard;