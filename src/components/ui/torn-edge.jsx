"use client";

export function TornEdge({ className = "", flip = false }) {
    // SVG path for a jagged tear
    const points = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * 100;
        const y = Math.random() * 5 + 2; // Random height between 2 and 7%
        points.push(`${x},${y}`);
    }

    // Create path data
    // Start at 0,10 (bottom left), line to 100,10 (bottom right), line to 100,0 (top right), jagged line to 0,0 (top left)
    // Actually usually torn edge is at the bottom of the section.
    // So top edge is straight, bottom edge is jagged?
    // User said "Torn Paper Divider (The Bottom Edge)".
    // So the component sits at the bottom of Hero Section.
    // It should look like the hero section is torn at the bottom.
    // So the SVG should fill the width, top is straight, bottom is jagged.
    // Wait, if it sits *on top* of the next section, the jagged part is the bottom edge of the hero.
    // Correct.

    // Generating a deterministic jagged path for SSR consistency would be better, but random is okay for now if client-side only.
    // Better use a fixed path string for stability.
    const pathData = "M0,0 L100,0 L100,10 " +
        Array.from({ length: 20 }, (_, i) => {
            const x = 100 - ((i + 1) / 20) * 100;
            const y = 5 + (Math.sin(i * 132.32) * 2 + Math.cos(i * 23.12));
            return `L${x},${Math.max(2, Math.min(8, y))}`;
        }).join(" ") + " L0,10 Z";

    return (
        <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none ${className}`} style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
            <svg
                className="relative block w-full h-[60px] md:h-[100px]"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="torn-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
                    </filter>
                </defs>
                <path
                    d={pathData}
                    fill="#1a1915" // Match hero background
                    filter="url(#torn-shadow)"
                />
            </svg>
        </div>
    );
}
