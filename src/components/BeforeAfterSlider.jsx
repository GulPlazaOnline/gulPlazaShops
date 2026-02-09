import { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After", defaultPosition = 50 }) => {
    const [sliderPosition, setSliderPosition] = useState(defaultPosition);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const onMouseDown = () => { isDragging.current = true; };
    const onMouseUp = () => { isDragging.current = false; };
    const onMouseMove = (e) => {
        if (isDragging.current) handleMove(e.clientX);
    };

    const onTouchMove = (e) => {
        handleMove(e.touches[0].clientX);
    };

    // Add global event listeners for smooth dragging outside container
    useEffect(() => {
        const handleGlobalMouseUp = () => { isDragging.current = false; };
        const handleGlobalMouseMove = (e) => {
            if (isDragging.current) handleMove(e.clientX);
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []);

    // Watermark Cropping Style (Bottom ~40px)
    // We achieve this by slightly scaling up and shifting up, or using a container with overflow hidden.
    // Here we'll use a container technique to ensure exact pixel alignment.

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden select-none cursor-ew-resize group"
            onMouseDown={onMouseDown}
            onTouchMove={onTouchMove}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Before and after comparison slider"
        >
            {/* Common Image Styles to ensure perfect alignment */}
            {/* We scale the height to 100% + 50px and translate Y to crop the bottom watermark */}

            {/* AFTER Image (Background - Right Side) */}
            <div className="absolute inset-0 w-full h-[calc(100%+50px)] -top-[25px]">
                <img
                    src={afterImage}
                    alt={afterLabel}
                    className="w-full h-full object-cover object-center"
                    draggable="false"
                />
                <span className="absolute top-32 right-8 bg-black/30 backdrop-blur-sm text-white/90 px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-sm border border-white/10 z-10 pointer-events-none">
                    {afterLabel}
                </span>
            </div>

            {/* BEFORE Image (Foreground - Left Side - Clipped) */}
            <div
                className="absolute inset-0 w-full h-[calc(100%+50px)] -top-[25px]"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="w-full h-full object-cover object-center"
                    draggable="false"
                />
                <span className="absolute top-32 left-8 bg-black/30 backdrop-blur-sm text-white/90 px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-sm border border-white/10 z-10 pointer-events-none">
                    {beforeLabel}
                </span>

                {/* Dark Overlay for "Before" state (optional, adds drama) */}
                <div className="absolute inset-0 bg-sepia/20 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Cinematic Gradient Overlays (Shared) */}
            {/* These need to be on top of both images but below the handle */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-20" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none z-20" />


            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-px bg-white/50 z-30 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Handle Knob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 backdrop-blur-md border border-white/80 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="flex gap-1">
                        <div className="w-px h-3 bg-white" />
                        <div className="w-px h-3 bg-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
