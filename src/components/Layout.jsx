import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import ThemeToggle from './ThemeToggle';
import LogoutBtn from './logoutBtn';

const Layout = () => {
    const [user, setUser] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser ?? null);
        });

        // Scroll listener for header
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            unsubscribe();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Header Styles Calculation
    // Navbar Styles - International Aid / Dark Theme
    // bg-[#1a1915]/80 = Dark Charcoal 80%
    const headerBg = 'bg-[#1a1915]/80 backdrop-blur-[12px] border-b border-white/10 shadow-lg';
    // Text is always white-ish on dark header
    const headerTextColor = 'text-white/90 hover:text-white transition-colors';


    const logoBg = isHome && !isScrolled ? 'bg-white text-charcoal' : 'bg-commerce text-white';

    return (
        <div className="min-h-screen bg-surface transition-colors duration-200 font-sans text-charcoal flex flex-col relative overflow-x-hidden">
            {/* Texture Overlay */}
            <div className="grain-overlay" aria-hidden="true" />

            {/* Trust Bar Header - Fixed & Adaptive */}
            <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${headerBg}`}>
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-3 group">
                                <div className={`w-15 h-15`}>
                                    <img src="/logo.png" alt="" />
                                </div>
                                <span className={`font-serif font-bold text-xl tracking-tight transition-colors duration-300 ${headerTextColor}`}>
                                    Gul Plaza Relief
                                </span>
                            </Link>
                        </div>

                        {/* Actions (Desktop) */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <LogoutBtn className={`text-sm font-medium ${headerTextColor}`} />
                            ) : (
                                <Link
                                    to="/auth"
                                    className={`px-5 py-2.5 text-sm font-bold border rounded-full transition-all duration-300 ${isHome && !isScrolled
                                        ? 'text-white border-white/30 hover:bg-white hover:text-charcoal'
                                        : 'text-charcoal border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="md:hidden flex items-center">
                            <button className={`p-2 rounded-md ${headerTextColor}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={`flex-grow w-full ${!isHome ? 'pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}`}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-card border-t border-border mt-auto relative z-10">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-muted">
                            © {new Date().getFullYear()} Gul Plaza Relief. Built with hope.
                        </p>
                        <div className="flex items-center gap-8 text-sm text-muted">
                            <a href="#" className="hover:text-charcoal transition-colors">
                                Report an Issue
                            </a>
                            <a href="#" className="hover:text-charcoal transition-colors">
                                Verify a Profile
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
