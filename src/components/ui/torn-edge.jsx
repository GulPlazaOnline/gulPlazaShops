"use client";

export function TornEdge({ className = "", flip = false }) {
    // Generate a highly irregular "ripped paper" path
    // Pseudo-random generator for SSR consistency
    const seed = 12345;
    const pseudoRandom = (input) => {
        const x = Math.sin(input) * 10000;
        return x - Math.floor(x);
    };

    const points = [];
    let x = 100;
    let i = 0;

    // Start at top right
    points.push({ x: 100, y: 0 }); // Top Right

    // Transition to jagged start
    points.push({ x: 100, y: 5 });

    // Generate jagged bottom edge from right to left
    while (x > 0) {
        // Random step width between 0.2 and 1.5 units (in 0-100 scale)
        // This corresponds roughly to 2px-15px on a 1000px wide screen
        const step = (pseudoRandom(i * seed) * 1.3) + 0.2;
        x -= step;
        if (x < 0) x = 0;

        // Random height between 2 and 9
        // Mix low frequency (waviness) and high frequency (jaggedness)
        const noise = pseudoRandom(i * seed + 100) * 6; // 0 to 6
        const y = 3 + noise; // 3 to 9 range

        points.push({ x, y });
        i++;
    }

    points.push({ x: 0, y: 0 }); // Top Left (Close loop)

    const pathD = `M0,0 L100,0 L100,5 ` +
        points.filter((_, idx) => idx > 1 && idx < points.length - 1).map(p => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") +
        ` L0,5 L0,0 Z`;

    // Highlight stroke path (Just the jagged part)
    const highlightD = `M100,5 ` +
        points.filter((_, idx) => idx > 1 && idx < points.length - 1).map(p => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") +
        ` L0,5`;

    return (
        <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none ${className}`} style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
            <svg
                className="relative block w-full h-[40px] md:h-[60px]"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="torn-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000" floodOpacity="0.6" />
                    </filter>
                </defs>

                {/* Main Dark Shape */}
                <path
                    d={pathD}
                    fill="#1a1915"
                    filter="url(#torn-shadow)"
                />

                {/* White Highlight on the jagged edge */}
                <path
                    d={highlightD}
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}
