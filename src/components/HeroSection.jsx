// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Ban } from 'lucide-react'; // Installing icons if needed, or use text

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen w-full bg-[#1a1915] overflow-hidden grid grid-cols-1 lg:grid-cols-2">

            {/* CONTENT (Left) */}
            <div className="relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 order-2 lg:order-1">
                <div className="max-w-xl">
                    {/* Headline */}
                    <h1 className="font-serif text-6xl md:text-8xl text-[#e9e6dc] leading-[0.9] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        From Ashes <br />
                        <span className="italic">to Hope.</span>
                    </h1>

                    {/* Sub-headline */}
                    <p className="font-sans font-light text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Gul Plaza was the heart of Karachi's wholesale. On January 17th, we lost it. <br />
                        <span className="text-[#e9e6dc] font-medium block mt-2">Help 1,200 families rebuild their livelihoods today.</span>
                    </p>

                    {/* Trust Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        {[
                            { label: "100% Direct Impact", icon: "💎" },
                            { label: "Verified Victims List", icon: "✅" },
                            { label: "Zero Admin Fees", icon: "🛡️" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-xs font-sans text-white/90 uppercase tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        <button
                            onClick={() => navigate('/relief')}
                            className="w-full sm:w-auto px-8 py-4 bg-[#c96442] text-white font-sans font-medium text-lg rounded-lg shadow-[0_0_30px_rgba(201,100,66,0.3)] hover:shadow-[0_0_50px_rgba(201,100,66,0.5)] hover:bg-[#b05536] transition-all duration-300 hover:-translate-y-1"
                        >
                            Donate Now
                        </button>
                        <button
                            onClick={() => navigate('/directory')}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white font-sans font-medium text-lg rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
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
                        className="w-full h-full object-cover [mask-image:linear-gradient(to_top,transparent,black_30%)] lg:[mask-image:linear-gradient(to_right,transparent,black_20%,black)]"
                    />
                    {/* Dark Overlay for tinting */}
                    <div className="absolute inset-0 bg-[#1a1915]/30 mix-blend-multiply" />
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
