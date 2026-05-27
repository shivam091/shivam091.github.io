/**
 * Header — server component (no "use client").
 *
 * The logo and outer <header> element are rendered to static HTML at build
 * time and shipped with zero JavaScript.  Only the interactive parts (nav
 * active state, theme switcher, mobile drawer) live inside HeaderClient,
 * which is the sole "use client" boundary for this feature.
 *
 * Island architecture:
 *   <Header>                ← server  (logo + shell)
 *     <HeaderClient />      ← client  (nav, theme, drawer)
 *   </Header>
 *
 * Styling split:
 *   Tailwind utilities handle layout, spacing, colour, and typography.
 *   Header.module.scss retains only SCSS-only constructs (multi-property
 *   transition with a custom cubic-bezier, glass-effect classes, and the
 *   @starting-style entry animation that cannot be expressed in Tailwind).
 */

import { JSX } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import HeaderClient from "@/components/Header/HeaderClient";
import SiteName from "./SiteName/SiteName";
import styles from "@/components/Header/Header.module.scss";

export default function Header(): JSX.Element {
  return (
    /*
     * styles.siteHeader — provides only the 3-property transition + will-change
     *   (cubic-bezier(0.41, 0.1, 0.13, 1) shared across background/backdrop-filter/color).
     * All layout, colour, and spacing come from the Tailwind classes alongside it.
     *
     * bg-(--color-bg-transparent) — Phase 1: fully transparent at the top of
     *   the page.  JS in HeaderClient adds styles.glassyBackdrop on scroll,
     *   overriding this with the sky/default glass tint.
     */
    <header
      className={[
        styles.siteHeader,

        // Layout
        "flex flex-wrap items-center justify-center",
        "sticky inset-x-0 top-0 z-10",

        // Sizing — fixed height on large screens, auto (wrappable) on mobile
        "h-20 max-md:h-auto max-md:min-h-20",

        // Spacing
        "p-[clamp(.75rem,1vw,1rem)]",
        "gap-3 max-md:gap-2",

        // Alignment override on mobile
        "max-md:justify-between",

        // Colour — transparent until JS ramps in the glass
        "text-(--color-fg-accent-muted)",
        "bg-(--color-bg-transparent)",
      ].join(" ")}
    >
      {/* ── Logo ── static HTML, zero JS ──────────────────────────────────── */}
      <Link
        href="/"
        className="flex items-center gap-2 font-bold text-lg text-inherit no-underline hover:text-(--color-fg-default) hover:no-underline"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/hl-smiling-face.png"
          alt={siteConfig.author.name}
          className="w-12 h-12 object-contain"
          loading="lazy"
          width={32}
          height={32}
        />

        <SiteName />
      </Link>

      {/*
       * Everything that needs the browser (usePathname, useState, localStorage)
       * lives here.  This is the only JS boundary in the header.
       */}
      <HeaderClient />
    </header>
  );
}
