"use client";

import { useEffect, useState } from "react";

export function Typewriter({
    words,
    speed = 100,
    delayBetweenWords = 2000,
    cursor = true,
    cursorChar = "|",
    loop = true, // Added loop prop
    className = "",
    onComplete,
}) {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [isFinished, setIsFinished] = useState(false);

    const currentWord = words[wordIndex] || "";

    useEffect(() => {
        if (isFinished) return;

        const timeout = setTimeout(
            () => {
                // Typing logic
                if (!isDeleting) {
                    if (charIndex < currentWord.length) {
                        setDisplayText(currentWord.substring(0, charIndex + 1));
                        setCharIndex(charIndex + 1);
                    } else {
                        // Word is complete
                        if (!loop && wordIndex === words.length - 1) {
                            // Stop if last word and no loop
                            setIsFinished(true);
                            if (onComplete) onComplete();
                            return;
                        }
                        // Wait before deleting
                        setTimeout(() => {
                            setIsDeleting(true);
                        }, delayBetweenWords);
                    }
                } else {
                    // Deleting logic
                    if (charIndex > 0) {
                        setDisplayText(currentWord.substring(0, charIndex - 1));
                        setCharIndex(charIndex - 1);
                    } else {
                        // Word is deleted, move to next word
                        setIsDeleting(false);
                        setWordIndex((prev) => (prev + 1) % words.length);
                    }
                }
            },
            isDeleting ? speed / 2 : speed,
        );

        return () => clearTimeout(timeout);
    }, [
        charIndex,
        currentWord,
        isDeleting,
        speed,
        delayBetweenWords,
        wordIndex,
        words,
        loop,
        isFinished,
        onComplete,
    ]);

    // Cursor blinking effect
    useEffect(() => {
        if (!cursor) return;
        // Stop blinking if finished? Or keep blinking? Component usually keeps blinking.
        // User asked "type once not again and again" referring to the text.
        // I'll keep cursor blinking to show it's active unless they want it gone.

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, [cursor]);

    return (
        <span className={`inline-block ${className}`}>
            {displayText}
            {cursor && (
                <span
                    className="ml-1 transition-opacity duration-75 text-primary"
                    style={{ opacity: showCursor ? 1 : 0 }}
                >
                    {cursorChar}
                </span>
            )}
        </span>
    );
}
