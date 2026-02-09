// src/hooks/useScrollAnimation.jsx
// Custom hook for scroll-triggered animations using Intersection Observer
import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing (one-time animation)
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options.threshold, options.rootMargin]);

    return [ref, isVisible];
};

// Component wrapper for scroll animations
export const ScrollReveal = ({
    children,
    className = '',
    animation = 'fade-up',
    delay = 0,
    duration = 700,
    threshold = 0.1
}) => {
    const [ref, isVisible] = useScrollAnimation({ threshold });

    const animationStyles = {
        'fade-up': {
            initial: 'opacity-0 translate-y-8',
            visible: 'opacity-100 translate-y-0'
        },
        'fade-left': {
            initial: 'opacity-0 translate-x-8',
            visible: 'opacity-100 translate-x-0'
        },
        'fade-right': {
            initial: 'opacity-0 -translate-x-8',
            visible: 'opacity-100 translate-x-0'
        },
        'scale-up': {
            initial: 'opacity-0 scale-95',
            visible: 'opacity-100 scale-100'
        },
        'blur-in': {
            initial: 'opacity-0 blur-sm',
            visible: 'opacity-100 blur-0'
        }
    };

    const anim = animationStyles[animation] || animationStyles['fade-up'];

    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${className} ${isVisible ? anim.visible : anim.initial}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
};

export default useScrollAnimation;
