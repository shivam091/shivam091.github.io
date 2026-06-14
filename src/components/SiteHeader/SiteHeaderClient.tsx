"use client";

/**
 * HeaderClient — the sole "use client" boundary for the header.
 *
 * Handles everything that requires browser APIs:
 *   • usePathname() for active nav-link highlighting
 *   • Theme switching persisted to localStorage
 *   • Mobile drawer open/close state
 *
 * The glass/blur effect is now handled entirely by CSS scroll-driven
 * animations (@keyframes glass-on + animation-timeline: scroll()), so
 * there is NO IntersectionObserver or scroll listener here.
 */

import { JSX, useCallback, useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, colorSchemes } from "@/data/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  AdjustIcon,
  RssIcon,
  SearchIcon,
  SpeakerIcon,
} from "@/components/Icon";
import IconHamburger from "@/components/Icon/IconHamburger";
import { Icon } from "@/components/Icon";
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/DropdownMenu";
import type { IconStatus } from "@/components/Icon/IconHamburger.helpers";
import Drawer from "@/components/SiteHeader/Drawer";
import styles from "@/components/SiteHeader/SiteHeader.module.scss";

const actionCls = [
  styles.headerAction,
  "inline-flex items-center justify-center",
  "p-2 rounded-full leading-none",
  "bg-(--color-bg-control-transparent) text-inherit",
  "border border-(--color-border-control-transparent)",
  "text-[clamp(0.8125rem,1.4vw,0.875rem)] font-semibold",
  "cursor-pointer no-underline",
].join(" ");

// Client boundary for the header — owns nav highlighting, theme switching, RSS boop, hamburger timing, and the mobile drawer lifecycle.
export default function SiteHeaderClient(): JSX.Element {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const drawerId = useId();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  // Boop state lives inside IconHamburger itself; only press timing lives here.
  const [isPressed, setIsPressed] = useState(false);
  const [isBooped, setIsBooped] = useState(false);
  const pressedTimestamp = useRef<number | null>(null);
  const pressTimeoutRef = useRef<number | null>(null);

  // 4-state machine: opening/closing use clamp:true springs; open/closed allow boop bounce
  const iconStatus: IconStatus = isPressed
    ? drawerOpen ? "closing" : "opening"
    : drawerOpen ? "open" : "closed";

  // Briefly shows the 'closing' animation on the hamburger (X → bars flatten to centre)
  // before the drawer actually disappears. 167ms = 10 frames @ 60fps
  const closeDrawer = useCallback(() => {
    if (!drawerOpen) return;
    if (pressTimeoutRef.current !== null) window.clearTimeout(pressTimeoutRef.current);
    setIsPressed(true);
    pressTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      setDrawerOpen(false);
      pressTimeoutRef.current = null;
    }, 167);
  }, [drawerOpen]);

  // Track client mount so the portal target (document.body) is available
  useEffect(() => setMounted(true), []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.documentElement.classList.toggle("scroll-locked", drawerOpen);
    return () => document.documentElement.classList.remove("scroll-locked");
  }, [drawerOpen]);

  // Close drawer + reset glass animation on route changes
  // The <header> element persists across SPA navigations (shared layout, never
  // unmounted). animation-fill-mode: forwards retains --glass-opacity: 0.7
  // from a previous page's scroll position, so a short page (no scrollbar)
  // would inherit the glassed state. Restarting the animation clears that.
  useEffect(() => {
    setDrawerOpen(false);
    setIsPressed(false);
    if (pressTimeoutRef.current !== null) {
      window.clearTimeout(pressTimeoutRef.current);
      pressTimeoutRef.current = null;
    }

    const header = toggleRef.current?.closest("header");
    if (header instanceof HTMLElement) {
      header.style.animationName = "none";
      void header.offsetHeight; // force reflow so the browser registers the change
      header.style.animationName = "";
    }
  }, [pathname]);

  // Cleanup press timeout on unmount
  useEffect(() => {
    return () => {
      if (pressTimeoutRef.current !== null) window.clearTimeout(pressTimeoutRef.current);
    };
  }, []);

  // Escape closes drawer; also traps focus back to the toggle button
  useEffect(() => {
    if (!drawerOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeDrawer(); }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [drawerOpen, closeDrawer]);

  // Move focus into the drawer when it opens; return it on close
  useEffect(() => {
    if (drawerOpen) {
      const id = setTimeout(() => {
        (document.getElementById(drawerId) as HTMLElement | null)?.focus();
      }, 50);
      return () => clearTimeout(id);
    } else {
      toggleRef.current?.focus();
    }
  }, [drawerOpen, drawerId]);

  // Persists the chosen color scheme key to localStorage via ThemeContext.
  const handleTheme = useCallback((key: string) => {
    setTheme(key as Parameters<typeof setTheme>[0]);
  }, [setTheme]);

  return (
    <>
      {/* Desktop navigation */}
      <nav
        className="flex gap-2 flex-auto max-md:hidden"
        role="navigation"
        aria-label="Main Navigation"
      >
        <ul className="list-none p-0 m-0 flex items-center gap-2 [&>li]:mb-0">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 no-underline text-sm text-inherit py-1 px-2 hover:text-(--color-fg-default) aria-[current=page]:text-(--color-fg-default) aria-[current=page]:font-semibold"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Header actions */}
      <div className="flex items-center gap-2">
        <button className={actionCls} aria-label="Search">
          <SearchIcon size={16} />
        </button>

        <button className={actionCls} aria-label="Toggle sounds">
          <SpeakerIcon size={16} />
        </button>

        {/* Theme switcher — Radix DropdownMenu */}
        <DropdownMenu>
          <DropdownTrigger>
            <button
              className={actionCls}
              aria-label="Toggle color scheme"
            >
              <AdjustIcon size={16} />
            </button>
          </DropdownTrigger>

          <DropdownContent align="center" side="bottom" aria-label="Available color schemes">
            {colorSchemes.map((scheme) => {
              const isActive = scheme.key === theme;
              return (
                <DropdownItem
                  key={scheme.key}
                  onSelect={() => handleTheme(scheme.key)}
                >
                  <Icon name={scheme.icon} size={14} />
                  {scheme.label}
                  {isActive && (
                    <Icon name="check" size={12} className="ml-auto text-(--color-fg-success)" />
                  )}
                </DropdownItem>
              );
            })}
          </DropdownContent>
        </DropdownMenu>

        <Link
          href="/atom.xml"
          className={actionCls}
          aria-label="Atom Feed"
          target="_blank"
          rel="alternate"
          type="application/atom+xml"
        >
          <RssIcon size={16} />
        </Link>

        {/* Hamburger — hidden on desktop, visible on mobile.
            IconHamburger IS the button; it owns boop state + scale wrapper internally. */}
        <IconHamburger
          ref={toggleRef}
          iconStatus={iconStatus}
          isOpen={drawerOpen}
          size={16}
          className={[
            styles.headerAction,
            "hidden max-md:inline-flex items-center justify-center",
            "p-2 rounded-full leading-none",
            "bg-(--color-bg-control-transparent) text-inherit",
            "border border-(--color-border-control-transparent)",
            "text-[clamp(0.8125rem,1.4vw,0.875rem)] font-semibold cursor-pointer",
          ].join(" ")}
          aria-label="Toggle menu"
          aria-controls={drawerId}
          aria-expanded={drawerOpen}
          onPointerDown={() => {
            pressedTimestamp.current = Date.now();
            setIsPressed(true);
            // Cancel any in-flight minimum-press timeout from a previous tap
            if (pressTimeoutRef.current !== null) {
              window.clearTimeout(pressTimeoutRef.current);
            }
          }}
          onClick={() => {
            // Enforce ~7 frames (≈117ms) in opening/closing so the morph is
            // always visible even on an instant tap
            const MIN_PRESS_MS = Math.ceil(16.667 * 7);
            const elapsed = pressedTimestamp.current
              ? Date.now() - pressedTimestamp.current
              : MIN_PRESS_MS;
            const remaining = MIN_PRESS_MS - elapsed;
            if (remaining <= 0) {
              setDrawerOpen((v) => !v);
              setIsPressed(false);
            } else {
              pressTimeoutRef.current = window.setTimeout(() => {
                setDrawerOpen((v) => !v);
                setIsPressed(false);
                pressTimeoutRef.current = null;
              }, remaining);
            }
          }}
          onPointerLeave={() => setIsPressed(false)}
        />
      </div>

      {/* Mobile drawer */}
      {/* Portal escapes the header's backdrop-filter stacking context so
          position:fixed works relative to the viewport, not the header. */}
      {mounted && createPortal(
        <AnimatePresence>
          {drawerOpen && (
            <Drawer
              key="header-drawer"
              id={drawerId}
              pathname={pathname}
              onClose={closeDrawer}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
