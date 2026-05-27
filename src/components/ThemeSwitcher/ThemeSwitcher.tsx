"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeOption } from "@/context/ThemeContext";
import styles from "./ThemeSwitcher.module.scss";

interface ThemeItem {
  id: ThemeOption;
  label: string;
  icon: string;
}

const THEMES: ThemeItem[] = [
  { id: "system",    label: "System",    icon: "💻" },
  { id: "light",     label: "Light",     icon: "☀️" },
  { id: "dark",      label: "Dark",      icon: "🌙" },
  { id: "soft-dark", label: "Soft Dark", icon: "☁️" },
];

export default function ThemeSwitcher(): JSX.Element {
  const { theme, isMounted, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  // Close on click-outside
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch theme"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Avoid label flicker before localStorage is read */}
        {isMounted ? (
          <>
            <span aria-hidden="true">{current.icon}</span>
            <span>{current.label}</span>
          </>
        ) : (
          <span className={styles.placeholder} aria-hidden="true">⏳</span>
        )}
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Theme options"
          className={styles.dropdown}
        >
          {THEMES.map((t) => (
            <li key={t.id} role="option" aria-selected={theme === t.id}>
              <button
                type="button"
                className={`${styles.option} ${theme === t.id ? styles.optionActive : ""}`}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
              >
                <span aria-hidden="true">{t.icon}</span>
                <span>{t.label}</span>
                {theme === t.id && (
                  <span className={styles.checkmark} aria-hidden="true">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
