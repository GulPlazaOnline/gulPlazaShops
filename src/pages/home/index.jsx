// src/pages/home/index.jsx
// Landing Page - Emotional Impact Only
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/HeroSection';
import { ScrollReveal } from '../../hooks/useScrollAnimation.jsx';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            {/* Hero Section - Full Screen Emotional */}
            <HeroSection />

            {/* About Section */}
            <section className="relative bg-white dark:bg-zinc-900 text-charcoal dark:text-gray-100 py-24 px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-zinc-900 -z-10" />
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal animation="fade-up">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-serif font-bold uppercase tracking-widest mb-6">
                            Since 1980s
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-charcoal dark:text-white">
                            The Heart of Wholesale
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-light">
                            Gul Plaza on M.A. Jinnah Road was more than a market. It was a labyrinth of 1,200 shops where families found everything from wedding dinner sets to imported toys.
                        </p>
                        <p className="text-lg text-gray-500 dark:text-gray-500 italic mb-10 max-w-2xl mx-auto">
                            "In October 2026, the fire took the structure, but it couldn't take our spirit."
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono uppercase tracking-wider text-gray-400">
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Community-Led</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Zero Overhead</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Direct Impact</span>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Action Section - Two Clear Paths */}
            <section className="bg-gray-50 dark:bg-black py-24 px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-serif font-medium text-charcoal dark:text-white mb-4">
                                Two Ways to Heal
                            </h2>
                            <p className="text-gray-500 text-lg font-light">
                                Choose your path to support the rebuilding effort.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Shop to Rebuild Card */}
                        <ScrollReveal animation="fade-up" delay={100}>
                            <div
                                onClick={() => navigate('/directory')}
                                className="group cursor-pointer card-soft p-10 h-full flex flex-col items-start text-left relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                    <span className="text-9xl">🛍️</span>
                                </div>
                                <div className="h-14 w-14 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-sm group-hover:bg-orange-100 transition-colors">
                                    🛍️
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-white mb-3">
                                    Support Shops
                                </h3>
                                <p className="text-gray-500 mb-8 leading-relaxed flex-grow">
                                    Browse the directory of surviving businesses. Your purchase helps a family restart their livelihood.
                                </p>
                                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-charcoal text-white text-sm font-bold tracking-wide group-hover:bg-orange-600 transition-all shadow-md group-hover:shadow-lg">
                                    Browse Directory
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Direct Relief Card */}
                        <ScrollReveal animation="fade-up" delay={200}>
                            <div
                                onClick={() => navigate('/relief')}
                                className="group cursor-pointer card-soft p-10 h-full flex flex-col items-start text-left relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                    <span className="text-9xl">❤️</span>
                                </div>
                                <div className="h-14 w-14 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-sm group-hover:bg-rose-100 transition-colors">
                                    ❤️
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-white mb-3">
                                    Direct Relief
                                </h3>
                                <p className="text-gray-500 mb-8 leading-relaxed flex-grow">
                                    Provide immediate aid to families of the 79 deceased and those who lost their entire inventory.
                                </p>
                                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-200 text-charcoal text-sm font-bold tracking-wide group-hover:border-rose-200 group-hover:text-rose-700 transition-all shadow-sm group-hover:shadow-md">
                                    Donate Now
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
