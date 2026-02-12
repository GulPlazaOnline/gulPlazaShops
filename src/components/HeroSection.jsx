// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import { MapPin, Store, Heart, CheckCircle2 } from 'lucide-react';
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
                <div className="flex flex-col justify-center pt-32 pb-20">

                    {/* Location Badge - Subtle Stamp Style */}
                    <div className="inline-flex items-center gap-2 self-start mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none opacity-60">
                        <MapPin className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-sans uppercase tracking-[0.2em] font-medium">
                            M.A. Jinnah Road, Karachi
                        </span>
                    </div>

                    {/* Headline - "Big Brand" Look */}
                    <h1 className="font-serif text-6xl md:text-8xl leading-[0.85] tracking-tight mb-8">
                        <span className="text-[#faf9f5] block">GUL PLAZA</span>
                        {/* RELIEF: Upright, Extra Bold, Tracking-widest */}
                        <span className="text-[var(--color-terracotta)] block font-extrabold not-italic tracking-wider">RELIEF</span>
                    </h1>

                    {/* Sub-headline - Phantom Reveal */}
                    <div className="min-h-[5rem] mb-12">
                        <TextReveal
                            text="For 30 years, Gul Plaza was the wholesale heart of Karachi. On Jan 17th, fire took 1,200 shops. Help us rebuild the hub of our economy."
                            className="font-sans font-light text-lg md:text-xl text-white/80 leading-relaxed max-w-lg"
                            delay={300}
                        />
                    </div>

                    {/* DUAL PATH ACTION AREA */}
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 max-w-lg">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Option A: Business Path */}
                            <button
                                onClick={() => navigate('/directory')}
                                className="group flex flex-col items-start p-5 rounded-lg border border-[var(--color-terracotta)]/30 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 text-left"
                            >
                                <div className="p-2 rounded-full bg-white/5 mb-3 group-hover:bg-[var(--color-terracotta)] group-hover:text-white transition-colors text-[var(--color-terracotta)]">
                                    <Store className="w-5 h-5" />
                                </div>
                                <span className="text-white font-serif font-bold text-lg leading-tight mb-1">Rebuild a Shop</span>
                                <span className="text-white/60 text-xs font-sans leading-relaxed">Help small business owners restock and restart.</span>
                            </button>

                            {/* Option B: Family Path (Primary) */}
                            <button
                                onClick={() => navigate('/relief')}
                                className="group flex flex-col items-start p-5 rounded-lg bg-[var(--color-terracotta)] hover:bg-[#b05536] transition-all duration-300 hover:-translate-y-1 text-left shadow-[0_0_30px_rgba(201,100,66,0.3)]"
                            >
                                <div className="p-2 rounded-full bg-white/20 mb-3 text-white">
                                    <Heart className="w-5 h-5 fill-current" />
                                </div>
                                <span className="text-white font-serif font-bold text-lg leading-tight mb-1">Support a Family</span>
                                <span className="text-white/90 text-xs font-sans leading-relaxed">Provide rations & rent for those who lost breadwinners.</span>
                            </button>
                        </div>

                        {/* Trust Signal */}
                        <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] uppercase tracking-wider font-medium">
                            <CheckCircle2 className="w-3 h-3 text-[var(--color-terracotta)]" />
                            <span>100% Direct Bank Transfer • Verified List</span>
                        </div>

                    </div>

                </div>

                {/* IMAGE (Right) - Gradient Fade */}
                <div className="relative h-[50vh] lg:h-full w-full lg:absolute lg:right-0 lg:top-0 lg:w-1/2 overflow-hidden pointer-events-none">
                    <img
                        src="/hero-before.webp"
                        alt="Gul Plaza Tragedy"
                        className="w-full h-full object-cover [mask-image:linear-gradient(to_top,transparent,black_20%)] lg:[mask-image:linear-gradient(to_right,transparent,black_10%,black_80%)] opacity-80 mix-blend-screen grayscale-[30%] contrast-125"
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
