import { useState, useEffect } from "react";

export default function useTheme() {
    const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const [theme, setThemeState] = useState(() => {
        // Check local storage first
        if (typeof window !== "undefined" && window.localStorage) {
            const stored = localStorage.getItem("theme");
            if (stored) return stored;
        }
        // Fallback to system preference
        return getSystemTheme();
    });

    // Effect 1: Apply theme class to document
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    // Effect 2: Listen for system preference changes (only works if no manual override)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (!localStorage.getItem("theme")) {
                setThemeState(mediaQuery.matches ? "dark" : "light");
            }
        };

        // Modern event listener
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Wrapper to persist manual changes
    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return [theme, setTheme];
}
