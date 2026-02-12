"use client";

export function TornEdge({ className = "", flip = false }) {
    // Generate a high-frequency jagged "sawtooth" path
    const segments = 150;
    let d = "";

    // We want sharp zig-zags.
    // We will generate a path that goes from left to right.
    // The "tear" is at the top of this shape if we consider it sitting at the bottom of the hero.
    // Wait, if this component is at `bottom-0` of the hero, and fills the space *below* the hero image?
    // No, usually "Torn Edge" is a shape that covers the *bottom* of the image with the background color of the *next* section?
    // OR it is a shape of the *current* section that has a jagged bottom?
    // If it's a shape of the current section (Dark Charcoal), it should be filled with Charcoal, and the empty space below reveals the white next section.
    // So the SVG should be: Top edge straight (connected to hero), Bottom edge jagged.
    // AND it should be placed such that the jagged bottom edge sits over the white background of the next section?
    // Actually, if the next section is white, and we want the hero to look torn ON TOP of it:
    // The SVG needs to be the *bottom part* of the hero.
    // So the SVG path should be: Move to Top-Left -> Top-Right -> Bottom-Right (jagged) -> Bottom-Left (jagged) -> Close.
    // OR simpler: The SVG is a "transition" strip.
    // If we want the Dark Hero to look torn, the SVG should be filled with `#1a1915`.
    // Top edge: Straight line at y=0.
    // Bottom edge: Jagged line varying between y=2 and y=10.
    // This SVG sits at the very bottom of the Hero container.
    // The next section starts immediately after the Hero container.
    // So visually: Hero Dark Block -> Jagged Edge -> White Section.

    for (let i = 0; i <= segments; i++) {
        const x = 100 - (i / segments) * 100;
        // Sawtooth noise: Math.random() is unstable for SSR.
        // Use a pseudo-random deterministic function.
        const pseudoRandom = (seed) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        // Zig-zag: alternating high and low, plus some noise.
        // Base sawtooth: i % 2 == 0 ? low : high
        const base = (i % 2 === 0) ? 2 : 8;
        // Add noise to make it "violent" and irregular
        const noise = pseudoRandom(i * 123.45) * 4 - 2;
        const y = Math.max(0, Math.min(10, base + noise));

        d += `L${x.toFixed(2)},${y.toFixed(2)} `;
    }

    const pathData = `M0,0 L100,0 L100,10 ${d} L0,10 Z`;

    // Highlight line: Just the jagged bottom edge, but slightly shifted or stroke?
    // To simulate "white fiber" highlight on the TOP edge of the tear?
    // If the tear is the bottom of the dark section, the light hits the torn edge suitable.
    // A thin white stroke along the jagged edge.
    // The jagged edge path itself is what we need.
    // We can't reuse the closed path easily for stroke without artifacts.
    // Let's create a separate open path for the stroke.

    let strokeD = `M100,10 `; // Start where the previous loop started? No, loop went 100 -> 0.
    // Recalculate or store points? Storing is better but loop is cheap.
    // Let's just regenerate the stroke path (Line only along the jagged part).
    // Actually, the loop above built `d` which is L... L... L...
    // We need M at the start of the jagged part.
    // The jagged part starts at 100,y_start... ends at 0,y_end.

    // Let's separate point generation.
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const x = 100 - (i / segments) * 100;
        const pseudoRandom = (seed) => (Math.sin(seed) * 10000) - Math.floor(Math.sin(seed) * 10000);
        const base = (i % 2 === 0) ? 2 : 8;
        const noise = pseudoRandom(i * 123.45) * 4 - 2;
        const y = Math.max(0, Math.min(10, base + noise));
        points.push({ x, y });
    }

    const jaggedPathCmd = points.map(p => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
    const fullPath = `M0,0 L100,0 L100,${points[0].y.toFixed(2)} ${jaggedPathCmd} L0,0 Z`;
    // Wait, close path logic:
    // Top-Left (0,0) -> Top-Right (100,0) -> Start of jagged (100, y0) -> ... -> End of jagged (0, yn) -> Close to (0,0).
    // Perfect.

    // Stroke Path: Just the jagged part.
    const highlightPath = `M100,${points[0].y.toFixed(2)} ${jaggedPathCmd}`;

    return (
        <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none ${className}`} style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
            <svg
                className="relative block w-full h-[50px] md:h-[80px]"
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
                    d={fullPath}
                    fill="#1a1915"
                    filter="url(#torn-shadow)"
                />

                {/* White Highlight on the jagged edge */}
                <path
                    d={highlightPath}
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}
