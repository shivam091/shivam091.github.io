"use client";

import React, {
  JSX,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Union of every valid theme key — "system" delegates to the OS preference.
export type ThemeOption = "system" | "light" | "dark" | "soft-dark";

// localStorage key for persisting the user's chosen theme across sessions.
const THEME_KEY = "saved-color-theme";

// Starting value before the mount effect reads localStorage.
const DEFAULT_THEME: ThemeOption = "system";

// Reads the OS colour-scheme preference and returns the matching concrete theme.
function resolveSystem(): Exclude<ThemeOption, "system"> {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Shape of the value exposed by ThemeContext — current key, mount flag, and setter.
interface ThemeContextType {
  theme: ThemeOption;
  // False on the server and before the first useEffect fires; guards hydration-sensitive renders.
  isMounted: boolean;
  setTheme: (theme: ThemeOption) => void;
}

// Raw context — undefined until a ThemeProvider mounts above the consumer.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provides theme state to the tree — reads localStorage on mount, writes on change,
// and re-applies when the OS colour scheme changes while "system" is selected.
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [theme, setThemeState] = useState<ThemeOption>(DEFAULT_THEME);
  const [isMounted, setIsMounted] = useState(false);

  // Resolves "system", writes data-theme on <html>, persists to localStorage.
  const setTheme = useCallback((next: ThemeOption) => {
    const resolved = next === "system" ? resolveSystem() : next;
    document.documentElement.setAttribute("data-theme", resolved);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* private browsing */ }
    setThemeState(next);
  }, []);

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as ThemeOption) ?? DEFAULT_THEME;
    setTheme(saved);
    setIsMounted(true);

    // Re-apply when the OS colour scheme changes and user has chosen "system"
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if ((localStorage.getItem(THEME_KEY) as ThemeOption) === "system") {
        setTheme("system");
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isMounted, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Typed ThemeContext accessor — throws if called outside a ThemeProvider.
export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
