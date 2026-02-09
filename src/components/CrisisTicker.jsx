import { useEffect, useState } from 'react';

const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(ease * end));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <span className="tabular-nums tracking-tighter">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

const CrisisTicker = () => {
    return (
        <div className="w-full border-y border-red-900/10 dark:border-red-500/10 bg-red-50/50 dark:bg-red-900/5 backdrop-blur-sm py-8 my-12 relative overflow-hidden">
            {/* Background noise/texture tailored for this section */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-red-200 dark:divide-red-800/30">

                    {/* Lives Lost */}
                    <div className="flex flex-col items-center py-4 md:py-0">
                        <dt className="text-sm font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 mb-2">
                            Lives Lost
                        </dt>
                        <dd className="text-5xl md:text-6xl font-black font-serif text-charcoal dark:text-white">
                            <AnimatedCounter end={79} duration={2500} />
                        </dd>
                    </div>

                    {/* Still Missing */}
                    <div className="flex flex-col items-center py-4 md:py-0">
                        <dt className="text-sm font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
                            Unaccounted For
                        </dt>
                        <dd className="text-5xl md:text-6xl font-black font-serif text-charcoal dark:text-white">
                            <AnimatedCounter end={12} duration={3000} />
                        </dd>
                    </div>

                    {/* Financial Loss */}
                    <div className="flex flex-col items-center py-4 md:py-0">
                        <dt className="text-sm font-mono font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                            Est. Loss (Crores)
                        </dt>
                        <dd className="text-5xl md:text-6xl font-black font-serif text-charcoal dark:text-white">
                            <AnimatedCounter end={500} duration={3500} suffix="+" prefix="Rs. " />
                        </dd>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CrisisTicker;
