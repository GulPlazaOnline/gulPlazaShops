// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import CrisisTicker from './CrisisTicker';
import { RevealWaveImage } from './ui/reveal-wave-image';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-screen w-full flex flex-col bg-black overflow-hidden">
            {/* HERO IMAGE - Full Bleed with RevealWave Effect */}
            <div className="absolute inset-0 z-0">
                <RevealWaveImage
                    src="/hero-before.webp"
                    waveSpeed={0.2}
                    waveFrequency={0.7}
                    waveAmplitude={0.5}
                    revealRadius={0.5}
                    revealSoftness={1}
                    pixelSize={2}
                    mouseRadius={0.4}
                    className="h-full w-full"
                />

                {/* Cinematic Gradient Overlays - Pointer Events None for Interactivity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 opacity-60 pointer-events-none z-10" />
            </div>

            {/* Main Hero Content - Bottom Aligned for Drama */}
            {/* Main Hero Content - Bottom Aligned for Drama */}
            {/* Added pointer-events-none to container so it doesn't block the slider */}
            <div className="flex-1 flex flex-col justify-end px-6 md:px-12 pb-24 relative z-10 pointer-events-none">
                <div className="HeroSecDetail max-w-5xl mx-auto w-full text-center md:text-left pointer-events-auto">
                    {/* Location Badge */}
                    <div className="inline-flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="h-px w-12 bg-amber-500/50" />
                        <span className="text-amber-400 text-xs font-mono tracking-[0.3em] uppercase">Karachi, Pakistan</span>
                    </div>

                    {/* Main Headline - Massive & Editorial */}
                    <h1 className="text-7xl md:text-9xl font-serif font-medium text-white leading-[0.9] tracking-tight mb-8 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-forwards">
                        Gul Plaza
                    </h1>

                    {/* Context Paragraph */}
                    <div className="HeroSecBtnP flex flex-col md:flex-row items-end gap-12 border-t border-white/10 pt-8 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards">
                        <p className="heroSecP max-w-xl text-lg md:text-xl text-white/80 font-light leading-relaxed">
                            For decades, this was the heart of wholesale. <br />
                            <span className="text-white/60">On January 17, 2026, silence fell. Now, we rebuild together.</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="HeroSecBtn flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <button
                                onClick={() => navigate('/directory')}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-charcoal font-serif text-lg rounded-full transition-all duration-500 hover:bg-amber-50 hover:scale-105 shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <span className="uppercase tracking-widest text-sm font-bold">Support Survivors</span>
                            </button>
                            <button
                                onClick={() => navigate('/relief')}
                                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-serif text-lg rounded-full transition-all duration-500 hover:bg-white/20 hover:border-white/40 flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <span className="uppercase tracking-widest text-sm font-bold">Donate Aid</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
};

export default HeroSection;
