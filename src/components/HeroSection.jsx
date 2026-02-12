// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import { RevealWaveImage } from './ui/reveal-wave-image';
import { Typewriter } from './ui/typewriter'; // Import Typewriter

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-screen w-full flex flex-col bg-charcoal overflow-hidden">
            {/* ... (Hero Image Section remains unchanged) ... */}
            <div className="absolute inset-0 z-0">
                <RevealWaveImage
                    src="/hero-before.webp"
                    waveSpeed={0.2}
                    waveFrequency={0.7}
                    waveAmplitude={0.5}
                    revealRadius={0.4}
                    revealSoftness={0.8}
                    pixelSize={2}
                    mouseRadius={0.3}
                    className="h-full w-full"
                />

                {/* Cinematic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />
            </div>

            {/* Main Hero Content - Centered & Monumental */}
            <div className="flex-1 flex flex-col justify-end items-center px-6 md:px-12 pb-24 relative z-20 pointer-events-none">
                <div className="max-w-4xl mx-auto w-full text-center pointer-events-auto">
                    {/* Location Badge */}
                    <div className="flex flex-col items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="h-12 w-px bg-primary/60" />
                        <span className="text-primary tracking-[0.4em] uppercase text-xs font-mono">Karachi, Pakistan</span>
                    </div>

                    {/* Main Headline - Monumental */}
                    <h1 className="text-8xl md:text-[10rem] leading-[0.85] font-serif font-medium text-white tracking-tight mb-8 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-forwards">
                        Gul Plaza
                    </h1>

                    {/* Context Paragraph with Typewriter */}
                    <div className="flex flex-col items-center gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards">
                        <div className="max-w-2xl min-h-[4rem] text-xl md:text-2xl text-white/90 font-sans font-light leading-relaxed">
                            <Typewriter
                                words={["For decades, this was the heart of wholesale. On January 17, 2026, silence fell. Now, we rebuild together."]}
                                loop={false}
                                speed={40}
                                delayBetweenWords={1000}
                                cursor={true}
                            />
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                            <button
                                onClick={() => navigate('/directory')}
                                className="px-10 py-5 bg-primary text-primary-foreground font-serif text-lg tracking-wide rounded-full transition-all duration-300 hover:bg-primary-hover hover:scale-105 shadow-[0_0_40px_-10px_rgba(166,124,82,0.4)] flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <span className="uppercase font-bold text-sm">Support Survivors</span>
                            </button>
                            <button
                                onClick={() => navigate('/relief')}
                                className="px-10 py-5 bg-transparent border border-white/20 text-white font-serif text-lg tracking-wide rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/40 flex items-center justify-center gap-3 cursor-pointer backdrop-blur-sm"
                            >
                                <span className="uppercase font-bold text-sm">Donate Aid</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Unchanged */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40 z-20">
                <span className="text-white/50 text-[10px] tracking-widest uppercase mb-2 block text-center">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent mx-auto" />
            </div>
        </section>
    );
};

export default HeroSection;
