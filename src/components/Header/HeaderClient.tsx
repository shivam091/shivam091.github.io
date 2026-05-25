"use client";

/**
 * HeaderClient — the sole "use client" boundary for the header.
 *
 * Handles everything that requires browser APIs:
 *   • usePathname() for active nav-link highlighting
 *   • Theme switching persisted to localStorage
 *   • Mobile drawer open/close state
 *   • Theme-dropdown click-outside dismissal
 *
 * The glass/blur effect is now handled entirely by CSS scroll-driven
 * animations (@keyframes glass-on + animation-timeline: scroll()), so
 * there is NO IntersectionObserver or scroll listener here.
 */

import { JSX, useCallback, useEffect, useRef, useState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, colorSchemes } from "@/data/navigation";
import {
  AdjustIcon,
  HamburgerIcon,
  RssIcon,
  SearchIcon,
  SpeakerIcon,
} from "@/components/Icon";
import { Icon } from "@/components/Icon";
import HeaderDrawer from "@/components/Header/HeaderDrawer/HeaderDrawer";
import styles from "@/components/Header/Header.module.scss";

export default function HeaderClient(): JSX.Element {
  const pathname = usePathname();
  const drawerId  = useId();          // stable id shared with aria-controls
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef   = useRef<HTMLButtonElement>(null);   // hamburger button

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // ── Close drawer whenever the route changes ────────────────────────────
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  // ── Escape closes drawer; also traps focus back to the toggle button ───
  useEffect(() => {
    if (!drawerOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeDrawer(); }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [drawerOpen, closeDrawer]);

  // ── Move focus into the drawer when it opens; return it on close ───────
  useEffect(() => {
    if (drawerOpen) {
      // Small delay lets the transition begin before we steal focus.
      const id = setTimeout(() => {
        (document.getElementById(drawerId) as HTMLElement | null)?.focus();
      }, 50);
      return () => clearTimeout(id);
    } else {
      // Return focus to the hamburger button that opened the drawer.
      toggleRef.current?.focus();
    }
  }, [drawerOpen, drawerId]);

  // ── Close theme dropdown when clicking outside it ──────────────────────
  useEffect(() => {
    if (!themeMenuOpen) return;
    const handle = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [themeMenuOpen]);

  // ── Theme switch ───────────────────────────────────────────────────────
  // Static export → no server-side cookies; persist to localStorage.
  // The anti-FOUC script in layout.tsx reads this on every page load.
  const handleTheme = useCallback((key: string) => {
    document.documentElement.dataset.theme = key;
    try { localStorage.setItem("theme", key); } catch { /* private browsing */ }
    setThemeMenuOpen(false);
  }, []);

  return (
    <>
      {/* ── Desktop navigation ──────────────────────────────────────────── */}
      <nav className={styles.navItems} role="navigation" aria-label="Main Navigation">
        <ul className={styles.navLinks}>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.navLink}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Header actions ──────────────────────────────────────────────── */}
      <div className={styles.headerActions}>
        <button className={styles.headerAction} aria-label="Search">
          <SearchIcon size={16} />
        </button>

        <button className={styles.headerAction} aria-label="Toggle sounds">
          <SpeakerIcon size={16} />
        </button>

        {/* Theme switcher dropdown */}
        <div
          ref={dropdownRef}
          className={`${styles.dropdown} ${styles.headerAction}`}
        >
          <button
            type="button"
            className={styles.dropdownToggle}
            aria-haspopup="true"
            aria-expanded={themeMenuOpen}
            aria-label="Toggle color scheme"
            onClick={() => setThemeMenuOpen((v) => !v)}
          >
            <AdjustIcon size={16} />
          </button>

          {themeMenuOpen && (
            <ul
              className={styles.dropdownMenu}
              role="menu"
              aria-label="Available color schemes"
            >
              {colorSchemes.map((scheme) => (
                <li key={scheme.key}>
                  <button
                    type="button"
                    className={styles.dropdownItem}
                    role="menuitem"
                    aria-label={scheme.description ?? scheme.label}
                    data-color-scheme={scheme.key}
                    onClick={() => handleTheme(scheme.key)}
                  >
                    <Icon name={scheme.icon} size={14} />
                    {scheme.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="/atom.xml"
          className={styles.headerAction}
          aria-label="Atom Feed"
          target="_blank"
          rel="alternate"
          type="application/atom+xml"
        >
          <RssIcon size={16} />
        </Link>

        {/* Hamburger — scales up when the drawer is open */}
        <button
          ref={toggleRef}
          className={`${styles.headerAction} ${styles.toggleMenu}`}
          aria-label="Toggle menu"
          aria-controls={drawerId}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <HamburgerIcon
            size={16}
            className={drawerOpen ? styles.iconActive : undefined}
          />
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <HeaderDrawer
        id={drawerId}
        isOpen={drawerOpen}
        pathname={pathname ?? "/"}
        onClose={closeDrawer}
      />
    </>
  );
}
