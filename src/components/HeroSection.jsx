// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Ban, CheckCircle, AlertCircle } from 'lucide-react';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen w-full bg-[#1a1915] overflow-hidden grid grid-cols-1 lg:grid-cols-2">

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* CONTENT (Left) */}
            <div className="relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 order-2 lg:order-1">
                <div className="max-w-xl">
                    {/* Eyebrow Label */}
                    <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="text-red-500 text-xs font-sans font-bold tracking-[0.25em] uppercase">Urgent Relief Fund</span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-serif text-5xl md:text-7xl text-[#e9e6dc] leading-tight tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                        From Ashes <br />
                        <span className="italic">to Hope.</span>
                    </h1>

                    {/* Sub-headline */}
                    <p className="font-sans font-normal text-lg text-white/70 leading-relaxed max-w-lg mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Gul Plaza was the heart of Karachi's wholesale. On January 17th, we lost it. <br />
                        <span className="text-white/90 font-medium block mt-2">Help 1,200 families rebuild their livelihoods today.</span>
                    </p>

                    {/* Trust Cards - Minimalist Grid */}
                    <div className="flex flex-wrap gap-4 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        {[
                            { label: "100% Direct Impact", icon: <CheckCircle className="w-4 h-4 text-white/80" /> },
                            { label: "Verified Victims List", icon: <Users className="w-4 h-4 text-white/80" /> },
                            { label: "Zero Admin Fees", icon: <ShieldCheck className="w-4 h-4 text-white/80" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3 border border-white/10 rounded-[4px] bg-transparent hover:bg-white/5 transition-colors group">
                                {item.icon}
                                <span className="text-xs font-sans font-medium text-white/80 uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        <button
                            onClick={() => navigate('/relief')}
                            className="w-full sm:w-auto px-8 py-4 bg-[#c96442] text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-md shadow-lg hover:bg-[#b05536] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <span>Donate Now</span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold">VERIFIED</span>
                        </button>
                        <button
                            onClick={() => navigate('/directory')}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-md hover:bg-white/5 hover:border-white/60 transition-all duration-300"
                        >
                            Read Their Stories
                        </button>
                    </div>
                </div>
            </div>

            {/* VISUAL (Right) */}
            <div className="relative h-[50vh] lg:h-auto w-full order-1 lg:order-2">
                <div className="absolute inset-0">
                    <img
                        src="/hero-before.webp"
                        alt="Gul Plaza Tragedy"
                        className="w-full h-full object-cover [mask-image:linear-gradient(to_top,transparent,black_30%)] lg:[mask-image:linear-gradient(to_right,transparent,black_10%,black_80%)] opacity-90 contrast-110 grayscale-[20%]"
                    />
                    {/* Vignette & Tint */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1915] via-[#1a1915]/20 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
