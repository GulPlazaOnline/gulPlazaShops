"use client";

import { useEffect, useState, useRef } from "react";

export function TextReveal({ text, className = "", delay = 0 }) {
    const [start, setStart] = useState(false);
    // Split text into words or characters? User said "Stagger the opacity... left to right".
    // "Render the full text immediately... occupying full height/width".
    // Splitting by words is usually safer for layout.
    const words = text.split(" ");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStart(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <div className={`overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block transition-all duration-700 ease-[cubic-bezier(0.2,0.65,0.3,0.9)] mr-[0.25em]"
                    style={{
                        opacity: start ? 1 : 0,
                        filter: start ? "blur(0px)" : "blur(4px)",
                        transform: start ? "translateY(0)" : "translateY(4px)",
                        transitionDelay: `${i * 30}ms`, // Stagger effect
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
}
