/**
 * SiteLayout — the single layout shared by every content route.
 *
 * <Header> lives here (not in separate (home)/(internal) layouts) so React
 * never unmounts it on client-side navigation.  That keeps the DOM nodes alive
 * across routes, meaning @starting-style only fires on a true full-page refresh
 * — exactly the once-per-session drop-in animation the design calls for.
 *
 * Glass effect — pure CSS "Header Blocker" technique (no JavaScript):
 *   The <Header> has position:fixed and a permanently transparent background.
 *   Each child layout places HeaderBlocker sticky divs directly behind the
 *   header to provide the sky or default glass tint + blur.
 *   See HeaderBlocker/HeaderBlocker.module.scss for the full explanation.
 *
 * Layout tree:
 *   <SiteLayout>           ← this file (server component, mounted once)
 *     <SiteBanner />       ← client — swaps HeroBanner ↔ SkyBannerTop
 *     <HomeLayout>         ← (home) — SkyBlocker + Hero + DefaultBlocker + main
 *     — or —
 *     <InternalLayout>     ← (internal) — SkyBlocker + DefaultBlocker + main
 *     <Footer>             ← mounted once
 *   </SiteLayout>
 */

import { JSX } from "react";
import SiteBanner from "@/components/SiteBanner";
import SkyBannerBottom from "@/components/SkyBanners/SkyBannerBottom";
import Footer from "@/components/Footer";

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
       * Both banners use position:absolute cloud layers that take no flow
       * space, so the content below starts at y = 0.
       */}
      <SiteBanner />

      <div className="container w-full mx-auto">
        <div className="flex flex-col min-h-dvh">
          {children}
          <Footer />
        </div>
      </div>

      <SkyBannerBottom />
    </>
  );
}
