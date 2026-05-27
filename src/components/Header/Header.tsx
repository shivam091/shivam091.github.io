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
 */

import { JSX } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import HeaderClient from "@/components/Header/HeaderClient";
import styles from "@/components/Header/Header.module.scss";
import SiteName from "./SiteName/SiteName";

export default function Header(): JSX.Element {
  return (
    <header className={styles.siteHeader}>
      {/* ── Logo ── static HTML, zero JS ──────────────────────────────────── */}
      <Link href="/" className={styles.siteLogo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/hl-smiling-face.png"
          alt={siteConfig.author.name}
          className={styles.avatar}
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
