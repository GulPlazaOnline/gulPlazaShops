// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Users, ShieldCheck, Heart, Handshake } from 'lucide-react';
import { TextReveal } from './ui/text-reveal';
import { TornEdge } from './ui/torn-edge';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen w-full bg-[#1a1915] overflow-hidden flex flex-col justify-center">

            {/* Watermark - Massive & Faint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="text-[20vw] font-serif font-bold text-white opacity-[0.03] select-none tracking-widest leading-none translate-y-12">
                    KARACHI
                </span>
            </div>

            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 h-full items-center">

                {/* CONTENT (Left) */}
                <div className="flex flex-col justify-center py-20">

                    {/* Location Badge */}
                    <div className="inline-flex items-center gap-2 self-start border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <MapPin className="w-3 h-3 text-[var(--color-terracotta)]" />
                        <span className="text-white/80 text-[10px] font-sans uppercase tracking-widest font-medium">
                            M.A. Jinnah Road, Karachi
                        </span>
                    </div>

                    {/* Headline - "Big Brand" Look */}
                    <h1 className="font-serif text-6xl md:text-8xl leading-[0.85] tracking-tight mb-8">
                        <span className="text-[#faf9f5] block">GUL PLAZA</span>
                        {/* RELIEF: Upright, Extra Bold, Tracking-widest to balance width */}
                        <span className="text-[var(--color-terracotta)] block font-extrabold not-italic tracking-wider">RELIEF</span>
                    </h1>

                    {/* Sub-headline - Phantom Reveal */}
                    <div className=" min-h-[5rem] mb-10">
                        <TextReveal
                            text="For 30 years, Gul Plaza was the wholesale heart of Karachi. On Jan 17th, fire took 1,200 shops. Help us rebuild the hub of our economy."
                            className="font-sans font-light text-lg md:text-xl text-white/80 leading-relaxed max-w-lg"
                            delay={300}
                        />
                    </div>

                    {/* Trust Cards - Minimalist Transparent */}
                    <div className="flex flex-wrap gap-4 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        {[
                            { label: "1,200 Shops Lost", icon: <Building2 className="w-4 h-4 text-white/90" /> },
                            { label: "Wholesale Market Support", icon: <Users className="w-4 h-4 text-white/90" /> },
                            { label: "Direct Bank Transfer", icon: <ShieldCheck className="w-4 h-4 text-white/90" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3 border border-white/10 rounded-sm bg-transparent hover:bg-white/5 transition-colors cursor-default">
                                {item.icon}
                                <span className="text-xs font-sans font-medium text-white/80 uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTAs - Direct Support */}
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-3">
                            <button
                                onClick={() => navigate('/relief')}
                                className="w-full sm:w-auto px-8 py-4 bg-[#c96442] text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-md shadow-lg hover:bg-[#b05536] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <Heart className="w-4 h-4 fill-current" />
                                <span>Sponsor a Family</span>
                            </button>
                            <button
                                onClick={() => navigate('/directory')}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-sans font-semibold text-sm uppercase tracking-widest rounded-md hover:bg-white/5 hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <span>View Verified List</span>
                            </button>
                        </div>
                        {/* Context Caption */}
                        <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium pl-1">
                            100% of funds go directly to shopkeepers' bank accounts.
                        </p>
                    </div>

                </div>

                {/* IMAGE (Right) - Gradient Fade */}
                <div className="relative h-[50vh] lg:h-full w-full lg:absolute lg:right-0 lg:top-0 lg:w-1/2 overflow-hidden pointer-events-none">
                    <img
                        src="/hero-before.webp"
                        alt="Gul Plaza Tragedy"
                        className="w-full h-full object-cover [mask-image:linear-gradient(to_top,transparent,black_20%)] lg:[mask-image:linear-gradient(to_right,transparent,black_20%,black)] opacity-80 mix-blend-screen grayscale-[30%] contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1915] via-transparent to-transparent lg:bg-gradient-to-l" />
                </div>
            </div>

            {/* Torn Paper Edge (Bottom) - Violent Rip */}
            <div className="absolute bottom-0 left-0 w-full z-20 translate-y-[2px]">
                <TornEdge />
            </div>

        </section>
    );
};

export default HeroSection;
