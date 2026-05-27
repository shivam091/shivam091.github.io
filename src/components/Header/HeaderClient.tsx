"use client";

/**
 * HeaderClient — the sole "use client" boundary for the header.
 *
 * Handles everything that requires browser APIs:
 *   • usePathname() for active nav-link highlighting
 *   • Theme switching persisted to localStorage
 *   • Mobile drawer open/close state
 *   • Theme-dropdown click-outside dismissal
 *   • Three-phase glass effect driven by IntersectionObserver + scroll
 *
 * Styling split:
 *   Tailwind handles all layout, colour, and typography.
 *   styles.headerAction is the only CSS-module class applied here — it carries
 *   the @starting-style entry animation and calc(var(--index)) stagger that
 *   cannot be expressed as Tailwind utilities.
 *   styles.glassyBackdrop is toggled on the parent <header> by the glass effect.
 *
 * Glass effect phases (Header.module.scss for the CSS counterpart):
 *   1. At top — trigger intersecting → transparent, no glass
 *   2. Scrolling through sky banner — ramp --glass-opacity / --blur-amount
 *      over 100 px; styles.glassyBackdrop → sky-tinted glass
 *   3. Past sky banner — [data-cloud-shapes] bottom ≤ 0 → data-is-over-threshold
 *      on <header> → CSS crossfades tint to default-bg glass
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

// ─── Shared header-action class string ───────────────────────────────────────
// All icon buttons / the theme-dropdown wrapper share the same visual treatment.
// styles.headerAction is the SCSS module class that carries ONLY the @starting-style
// drop-in animation and the @for stagger loop — Tailwind provides everything else.
const ACTION =
  [
    styles.headerAction,
    "inline-flex items-center justify-center",
    "p-2 rounded-full cursor-pointer leading-none",
    "bg-(--color-bg-control-transparent)",
    "text-inherit",
    "border border-(--color-border-control-transparent)",
    "text-[clamp(.8125rem,1.4vw,.875rem)] font-semibold",
    "no-underline",
    "hover:bg-(--color-bg-control-transparent)",
    "hover:border-(--color-border-control-transparent-hover)",
    "focus-visible:outline-none",
  ].join(" ");

export default function HeaderClient(): JSX.Element {
  const pathname = usePathname();
  const drawerId  = useId();          // stable id shared with aria-controls
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef   = useRef<HTMLButtonElement>(null);  // hamburger button
  const anchorRef   = useRef<HTMLSpanElement>(null);    // locates parent <header>

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // ── Three-phase glass effect ───────────────────────────────────────────
  //
  // <Header> is mounted once in the root layout and never remounts, so this
  // effect must re-run on every navigation (pathname dep) to reconnect the
  // sky observer to whichever [data-cloud-shapes] element the new route has.
  //
  //   observerTrigger watches [data-glass-trigger] (a 1 px sentinel in the
  //   root layout at y = 0).  While it's visible the header stays transparent;
  //   once it leaves, a scroll listener ramps up opacity/blur over 100 px.
  //
  //   observerSky watches [data-cloud-shapes] (the sky banner container).
  //   When its bottom edge scrolls above y = 0, the header switches its glass
  //   tint from the sky colour to the default background colour.
  //   skyContainer is optional — pages without a sky banner still get Phase 2.
  useEffect(() => {
    const siteHeader   = anchorRef.current?.closest("header") as HTMLElement | null;
    const glassTrigger = document.querySelector("[data-glass-trigger]") as HTMLElement | null;
    const skyContainer = document.querySelector("[data-cloud-shapes]")  as HTMLElement | null;

    if (!siteHeader || !glassTrigger) return;

    let isScrolling = false;

    const updateGlassEffect = () => {
      const triggerTop       = glassTrigger.getBoundingClientRect().top;
      const distanceScrolled = Math.max(0, -triggerTop);
      const maxDistance      = 100;
      const progress         = Math.min(1, distanceScrolled / maxDistance);

      siteHeader.style.setProperty("--glass-opacity", (0.7 * progress).toFixed(2));
      siteHeader.style.setProperty("--blur-amount",   (4   * progress).toFixed(1) + "px");
      siteHeader.classList.toggle(styles.glassyBackdrop, progress > 0);
    };

    const startTrackingScroll = () => {
      if (!isScrolling) {
        window.addEventListener("scroll", updateGlassEffect, { passive: true });
        isScrolling = true;
      }
      updateGlassEffect(); // sync immediately on entry
    };

    const stopTrackingScroll = () => {
      if (isScrolling) {
        window.removeEventListener("scroll", updateGlassEffect);
        isScrolling = false;
      }
      siteHeader.style.setProperty("--glass-opacity", "0");
      siteHeader.style.setProperty("--blur-amount",   "0px");
      siteHeader.classList.remove(styles.glassyBackdrop);
      siteHeader.removeAttribute("data-is-over-threshold");
    };

    // Trigger observer: start / stop scroll tracking when the sentinel
    // enters / leaves the viewport (threshold 0.98 fires almost instantly).
    const observerTrigger = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? stopTrackingScroll() : startTrackingScroll();
      },
      { threshold: 0.98 },
    );
    observerTrigger.observe(glassTrigger);

    // Sky observer (optional): swap the glass tint once the cloud container
    // is fully above the viewport (bottom edge ≤ 0).
    // Re-connected on every navigation so it always tracks the current page's
    // sky banner — home uses HeroBanner, internal uses SkyBannerTop.
    let observerSky: IntersectionObserver | null = null;
    if (skyContainer) {
      observerSky = new IntersectionObserver(
        ([entry]) => {
          siteHeader.toggleAttribute(
            "data-is-over-threshold",
            entry.boundingClientRect.bottom <= 0,
          );
        },
        { threshold: 0 },
      );
      observerSky.observe(skyContainer);
    }

    return () => {
      stopTrackingScroll();
      observerTrigger.disconnect();
      observerSky?.disconnect();
    };
  }, [pathname]); // re-run on navigation to reconnect sky observer to new route's banner

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
      {/* Hidden anchor — lets the glass useEffect locate the parent <header> */}
      <span ref={anchorRef} aria-hidden="true" style={{ display: "none" }} />

      {/* ── Desktop navigation ──────────────────────────────────────────── */}
      <nav
        className="flex gap-2 flex-auto max-md:hidden"
        role="navigation"
        aria-label="Main Navigation"
      >
        <ul className="list-none m-0 p-0 flex items-center gap-2">
          {mainNav.map((item) => (
            <li key={item.href} className="mb-0">
              <Link
                href={item.href}
                className={[
                  "inline-flex items-center gap-2 no-underline",
                  "text-sm text-inherit py-1 px-2",
                  "hover:text-(--color-fg-default)",
                  // Active page gets a stronger colour + semi-bold weight
                  pathname === item.href
                    ? "text-(--color-fg-default) font-semibold"
                    : "",
                ].filter(Boolean).join(" ")}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Header actions ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">

        <button className={ACTION} aria-label="Search">
          <SearchIcon size={16} />
        </button>

        <button className={ACTION} aria-label="Toggle sounds">
          <SpeakerIcon size={16} />
        </button>

        {/* Theme switcher dropdown ─────────────────────────────────────── */}
        <div ref={dropdownRef} className={`${ACTION} relative`}>
          <button
            type="button"
            className="flex items-center justify-center [background:none] border-0 text-inherit cursor-pointer p-0 leading-none"
            aria-haspopup="true"
            aria-expanded={themeMenuOpen}
            aria-label="Toggle color scheme"
            onClick={() => setThemeMenuOpen((v) => !v)}
          >
            <AdjustIcon size={16} />
          </button>

          {themeMenuOpen && (
            <ul
              className={[
                "list-none m-0",
                "absolute top-[calc(100%+.25rem)] right-0 z-[100]",
                "min-w-40 py-1",
                "bg-(--color-bg-overlay)",
                "border border-(--color-border-overlay)",
                "rounded-md",
                "[box-shadow:var(--box-shadow-md)]",
              ].join(" ")}
              role="menu"
              aria-label="Available color schemes"
            >
              {colorSchemes.map((scheme) => (
                <li key={scheme.key} className="mb-0">
                  <button
                    type="button"
                    className={[
                      "flex items-center gap-2 w-full",
                      "py-2 px-3",
                      "[background:none] border-0",
                      "text-(--color-fg-default) text-sm",
                      "cursor-pointer text-left",
                      "hover:bg-(--color-bg-neutral-muted)",
                    ].join(" ")}
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
          className={ACTION}
          aria-label="Atom Feed"
          target="_blank"
          rel="alternate"
          type="application/atom+xml"
        >
          <RssIcon size={16} />
        </Link>

        {/* Hamburger — hidden on desktop, shown on mobile ──────────────── */}
        <button
          ref={toggleRef}
          className={`${ACTION} hidden max-md:inline-flex`}
          aria-label="Toggle menu"
          aria-controls={drawerId}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <HamburgerIcon
            size={16}
            // Tailwind: scale up + transition when drawer is open
            className={
              drawerOpen
                ? "scale-150 transition-transform duration-200 ease-in-out"
                : undefined
            }
          />
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      {/* <HeaderDrawer
        id={drawerId}
        isOpen={drawerOpen}
        pathname={pathname ?? "/"}
        onClose={closeDrawer}
      /> */}
    </>
  );
}
