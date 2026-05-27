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
 * Glass effect — pure CSS "Header Blocker" technique (Josh W. Comeau):
 *   This header has position:fixed and a permanently transparent background.
 *   The glass tint + blur come from HeaderBlocker sticky divs that sit BEHIND
 *   this header in the page layout — no JS, no IntersectionObserver.
 *   See HeaderBlocker.module.scss for the full explanation.
 *
 * Styling split:
 *   Tailwind handles layout, colour, and typography.
 *   Header.module.scss keeps only the @starting-style staggered drop-in
 *   animation for the action buttons (cannot be expressed in Tailwind).
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
     * position:fixed  — out of flow, always at viewport top.
     * inset-x-0 top-0 — spans full viewport width.
     * z-20            — above the HeaderBlocker sticky divs (z-index: 10).
     *                   Two-step gap: glass (z:10) → header (z:20).
     * bg-transparent  — permanently transparent; the HeaderBlocker behind it
     *                   provides the sky or default glass tint + blur.
     */
    <header
      className={[
        styles.siteHeader,

        // Layout
        "flex flex-wrap items-center justify-center",
        "sticky inset-x-0 inset-y-0",

        // Sizing — fixed height on large screens, auto (wrappable) on mobile
        "h-20 max-md:h-auto max-md:min-h-20",

        // Spacing
        "p-[clamp(.75rem,1vw,1rem)]",
        "gap-3 max-md:gap-2",

        // Alignment override on mobile
        "max-md:justify-between",

        // Always transparent — glass tint comes from HeaderBlocker behind this
        "text-(--color-fg-accent-muted)",
        "bg-transparent",
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
