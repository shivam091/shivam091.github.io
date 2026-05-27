"use client";

import React, {
  JSX,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { THEME_KEY, DEFAULT_COLOR_MODE } from "@/constants/constants";

export type ThemeOption = "system" | "light" | "dark" | "soft-dark";

interface ThemeContextType {
  /** The value the user selected (may be "system") */
  theme: ThemeOption;
  /** Whether the provider has hydrated from localStorage */
  isMounted: boolean;
  setTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [theme, setThemeState] = useState<ThemeOption>(DEFAULT_COLOR_MODE);
  const [isMounted, setIsMounted] = useState(false);

  const applyTheme = useCallback((targetTheme: ThemeOption) => {
    let effectiveTheme: ThemeOption = targetTheme;

    if (targetTheme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.documentElement.setAttribute("data-theme", effectiveTheme);
    localStorage.setItem(THEME_KEY, targetTheme);
    setThemeState(targetTheme);
  }, []);

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as ThemeOption) || DEFAULT_COLOR_MODE;
    applyTheme(saved);
    setIsMounted(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (localStorage.getItem(THEME_KEY) === "system") applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isMounted, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
