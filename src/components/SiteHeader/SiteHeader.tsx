/**
 * Header — server component (no "use client").
 *
 * The logo and outer <header> element are rendered to static HTML at build
 * time and shipped with zero JavaScript. Only the interactive parts (nav
 * active state, theme switcher, mobile drawer) live inside HeaderClient,
 * which is the sole "use client" boundary for this feature.
 *
 * Island architecture:
 *   <Header>                ← server  (logo + shell)
 *     <HeaderClient />      ← client  (nav, theme, drawer)
 *   </Header>
 */
import { JSX } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import SiteHeaderClient from "@/components/SiteHeader/SiteHeaderClient";
import SiteName from "@/components/SiteHeader/SiteName";
import styles from "@/components/SiteHeader/SiteHeader.module.scss";

export default function SiteHeader(): JSX.Element {
  return (
    <>
      <header
        className={[
          styles.siteHeader,
          "flex items-center justify-center flex-wrap",
          "sticky top-0 inset-x-0 z-1001",
          "h-20 p-[clamp(0.75rem,1vw,1rem)]",
          "text-(--color-fg-accent-muted) gap-3",
          "max-md:gap-2 max-md:justify-between max-md:min-h-20 max-md:h-auto",
        ].join(" ")}
      >
        {/* ── Logo ── static HTML, zero JS ──────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-inherit no-underline hover:text-(--color-fg-default) hover:no-underline"
        >
          <img
            src="/assets/img/hl-smiling-face.png"
            alt={siteConfig.author.name}
            className="w-12 h-12 object-contain"
            loading="eager"
            width={48}
            height={48}
          />

          <SiteName />
        </Link>

        {/*
        * Everything that needs the browser (usePathname, useState, localStorage)
        * lives here. This is the only JS boundary in the header.
        */}
        <SiteHeaderClient />
      </header>
    </>
  );
}
