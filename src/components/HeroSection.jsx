// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import { MapPin, Store, Heart, ArrowRight } from 'lucide-react';
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

                    {/* ACTION AREA - Buttons (Professional) */}
                    <div className="flex flex-col items-start gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            {/* Button 1: Support a Family (Humanitarian) */}
                            <button
                                onClick={() => navigate('/relief')}
                                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-[var(--color-terracotta)] hover:bg-[#b05536] text-white transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_30px_rgba(201,100,66,0.2)] w-full sm:w-auto"
                            >
                                <Heart className="w-5 h-5 fill-current" />
                                <span className="font-sans font-bold text-sm uppercase tracking-widest">Support a Family</span>
                            </button>

                            {/* Button 2: Rebuild a Shop (Business) */}
                            <button
                                onClick={() => navigate('/directory')}
                                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-transparent border border-white/30 hover:bg-white/10 text-white transition-all duration-300 w-full sm:w-auto"
                            >
                                <Store className="w-5 h-5" />
                                <span className="font-sans font-bold text-sm uppercase tracking-widest">Rebuild a Shop</span>
                            </button>
                        </div>

                        {/* Verified Link */}
                        <button
                            onClick={() => navigate('/directory')}
                            className="group flex items-center gap-2 text-white/50 text-xs font-medium hover:text-[var(--color-terracotta)] transition-colors mt-2 pl-1"
                        >
                            <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-[var(--color-terracotta)]">View Verified Victims List</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>

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
