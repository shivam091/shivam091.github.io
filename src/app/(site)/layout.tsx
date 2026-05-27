/**
 * SiteLayout — the single layout shared by every content route.
 *
 * Why here, rather than in the old (home) + (internal) layouts?
 * ─────────────────────────────────────────────────────────────
 * Previously, <Header> lived in two separate route-group layouts.
 * When the user navigated between home ( / ) and internal pages, React
 * unmounted the old layout and mounted the new one — remounting <Header>
 * each time.  That re-triggered @starting-style on every navigation.
 *
 * Moving <Header> into this parent (site) layout means React keeps it
 * mounted for the lifetime of the session. @starting-style only fires
 * on a true full-page refresh — exactly once per session.
 *
 * Layout tree (after this change):
 *   <SiteLayout>           ← this file — server component, mounted once
 *     <SiteBanner />       ← client — swaps HeroBanner ↔ SkyBannerTop
 *     <Header />           ← mounted once, never remounts on navigation
 *     <HomeLayout>         ← (home) — Hero + main
 *       <page />
 *     </HomeLayout>
 *     — or —
 *     <InternalLayout>     ← (internal) — PageHeading + main
 *       <page />
 *     </InternalLayout>
 *   </SiteLayout>
 */

import { JSX } from "react";
import Header from "@/components/Header/Header";
import SiteBanner from "@/components/SiteBanner/SiteBanner";
import SkyBannerBottom from "@/components/SkyBanners/SkyBannerBottom/SkyBannerBottom";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      {/*
       * SiteBanner — client component that switches the full-bleed sky
       * background between HeroBanner (home) and SkyBannerTop (internal).
       * Both banners are position:absolute overlays that take no flow space,
       * so the container below still starts at y = 0.
       */}
      <SiteBanner />

      <div className="container w-full mx-auto">
        <div className="relative flex flex-col min-h-dvh z-10">
          {/*
           * Glass-trigger sentinel — 1 px absolutely-positioned marker at
           * y = 0 of this relative container (≈ y = 0 of the page, since the
           * banners above take no flow space).
           *
           * HeaderClient's IntersectionObserver fires the instant it leaves
           * the viewport, starting the glass opacity ramp-up.
           */}
          <div
            data-glass-trigger
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
          />

          {/* Header — mounted once in this shared layout, never remounted */}
          <Header />

          {children}
        </div>
      </div>

      <SkyBannerBottom />
    </>
  );
}
