import React from 'react';

export const Marquee = ({ items, className = "" }) => {
    return (
        <div className={`relative flex overflow-hidden whitespace-nowrap ${className}`}>
            <div className="animate-marquee flex items-center gap-8 min-w-full">
                {items.map((item, i) => (
                    <span key={i} className="mx-4">{item}</span>
                ))}
                {/* Duplicate for seamless loop */}
                {items.map((item, i) => (
                    <span key={`dup-${i}`} className="mx-4">{item}</span>
                ))}
                {/* Triplicate for safety on wide screens */}
                {items.map((item, i) => (
                    <span key={`tri-${i}`} className="mx-4">{item}</span>
                ))}
            </div>
        </div>
    );
};
