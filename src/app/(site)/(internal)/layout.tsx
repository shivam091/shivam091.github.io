import { JSX } from "react";
import PageHeading from "@/components/PageHeading/PageHeading";
import HeaderBlocker from "@/components/HeaderBlocker/HeaderBlocker";

/**
 * InternalLayout — all non-home content pages with two-phase pure-CSS glass.
 *
 * Phase 1 — sky glass (scroll = 0 … sky section end)
 *   SkyBlocker sticks immediately behind the fixed transparent header,
 *   providing sky-tinted frosted glass while the sky banner is in view.
 *   The h-56 (14rem / 224px) sky section height matches the SkyBannerTop
 *   SVG visual area (height="225") so the glass exits as the banner scrolls away.
 *
 * Phase 2 — default glass (scroll = sky section end …)
 *   DefaultBlocker takes over at exactly the scroll position SkyBlocker exits.
 *
 * Seamless handoff math:
 *   SkyBlocker stops  at scroll = 0 + 224 − 80 = 144px
 *   main.offsetTop              = 224 − 80        = 144px  (−mt-20 on <main>)
 *   DefaultBlocker starts at scroll = 144px  ← same value ✓
 *
 *   <main> has NO padding-top — padding lives in the inner content wrapper
 *   so DefaultBlocker.naturalTop = main.offsetTop exactly.
 *
 * Z-index scale:
 *   Cloud SVGs / sky banners        z-index: 1   — very back, decorative
 *   SkyBlocker (sky glass)          z-index: 3   — above clouds, below hero + header
 *   DefaultBlocker (default glass)  z-index: 8   — sits on page content, below header
 *   Header (sticky)                 z-index: 10  — always crisp on top
 *
 * DOM structure:
 *   ┌──────────────────────────────────────┐  ← viewport top
 *   │  [sticky Header — z:10, transparent] │
 *   │  h-56 sky section                    │
 *   │    [SkyBlocker — z:3,  sticky top:0] │  sky glass phase
 *   │  (SkyBannerTop cloud SVG z:1 behind) │
 *   ├──────────────────────────────────────┤  ← -mt-20 on <main>
 *   │  [DefaultBlocker — z:8,  sticky top:0│  default glass takes over
 *   │  padded content wrapper              │
 *   │    PageHeading + page content        │
 *   └──────────────────────────────────────┘
 */
export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      {/*
       * Sky section — SkyBlocker is sticky within this div.
       * Height = SkyBannerTop visual height (SVG height="225" ≈ h-56 / 224px).
       * SkyBlocker sticks behind the header from scroll=0 until this div's
       * bottom edge scrolls past the top of the viewport.
       */}
      <div className="h-56" aria-hidden="true">
        <HeaderBlocker variant="sky" />
      </div>

      {/*
       * Main content — margin-top: -$header-height makes DefaultBlocker's
       * natural position equal the sky section's bottom, so the sky → default
       * handoff is seamless (both events happen at scroll = 144px).
       *
       * NO padding on <main> — padding is on the inner wrapper so the
       * DefaultBlocker starts sticking without any extra offset.
       */}
      <main
        id="main-content"
        className="flex-1 max-w-full -mt-20"
        style={{ containerType: "inline-size" }}
        tabIndex={-1}
      >
        <HeaderBlocker variant="default" />

        {/*
         * All readable content lives here — safely below the DefaultBlocker.
         * Padding is here (not on <main>) to keep the DefaultBlocker flush
         * with main's top edge for the seamless handoff.
         */}
        <div className="p-[clamp(.75rem,1vw,1rem)]">
          <PageHeading />

          <section className="page-content" aria-labelledby="page-title">
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
