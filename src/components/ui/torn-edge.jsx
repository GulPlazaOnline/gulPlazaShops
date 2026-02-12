"use client";

export function TornEdge({ className = "", flip = false }) {
    // Generate a high-frequency jagged path mimicking ripped cardboard/paper
    // We need many small zig-zags.
    const segments = 200; // More segments for higher frequency
    let path = "M0,0 L100,0 L100,10 ";

    // Deterministic jagged path string to avoid hydration mismatches
    // We can just construct a fixed string here or use a seed if we want randomness.
    // For simplicity and "violent" look, let's hardcode a loop that generates sharp spikes.

    let d = "";
    for (let i = 0; i <= segments; i++) {
        const x = 100 - (i / segments) * 100;
        // High frequency noise: combination of sine waves and random-looking spikes
        // We want sharp spikes, so use Math.random like function or just modulo
        // Since we need it deterministic, we use Math.sin with high multipliers
        const noise = Math.sin(i * 12.34) * 1.5 + Math.sin(i * 45.67) * 1.0 + Math.sin(i * 78.9) * 0.5;
        // Map noise to y between 2 and 8
        const y = 5 + noise;
        d += `L${x.toFixed(2)},${y.toFixed(2)} `;
    }

    const pathData = `M0,0 L100,0 L100,10 ${d} L0,10 Z`;

    return (
        <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none ${className}`} style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
            <svg
                className="relative block w-full h-[60px] md:h-[80px]"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="torn-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000" floodOpacity="0.6" />
                    </filter>
                    {/* Inner shadow trick? usually done with CSS box-shadow inset or SVG filters which are complex.
                We can just draw a second path slightly offset or use drop-shadow on the container? 
                Actually, user asked for "inner shadow at the top of the tear". 
                This implies the tear looks like it has thickness.
                We can simulate this by drawing the path twice, one slightly lower with a darker color, or using a gradient on the fill.
            */}
                </defs>

                {/* Main shape */}
                <path
                    d={pathData}
                    fill="#1a1915"
                    filter="url(#torn-shadow)"
                />

                {/* "Thickness" / Inner Shadow Simulation - A stroke or slightly offset path?
            Actually, let's just keep it simple with the drop shadow for now as "inner shadow" on a filled shape 
            usually means shading *inside* the shape near the edge.
            We can add a gradient fill to the shape that gets darker near the bottom?
            Or just trust the drop shadow to give depth against the white background below.
        */}
            </svg>
        </div>
    );
}
