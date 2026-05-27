import { JSX } from "react";
import Hero from "@/components/Hero/Hero";
import HeaderBlocker from "@/components/HeaderBlocker/HeaderBlocker";
import styles from "./Home.module.scss";

/**
 * HomeLayout — home-route layout with two-phase pure-CSS glass-header.
 *
 * Phase 1 — sky glass (scroll = 0 … hero section end)
 *   SkyBlocker sticks immediately behind the fixed transparent header,
 *   providing sky-tinted frosted glass for the full duration of the hero.
 *
 * Phase 2 — default glass (scroll = hero section end …)
 *   DefaultBlocker starts sticking at exactly the scroll position the
 *   SkyBlocker exits — zero gap guaranteed by -mt-20 on <main>.
 *
 * Seamless handoff math:
 *   SkyBlocker stops  at scroll = heroSection.height − $header-height
 *   main.offsetTop              = heroSection.height − $header-height  (−mt-20)
 *   DefaultBlocker starts at scroll = main.offsetTop  ← same value ✓
 *
 *   <main> has NO padding-top — padding lives in the inner content wrapper
 *   so DefaultBlocker.naturalTop = main.offsetTop exactly.
 *   A padding-top on <main> would push the DefaultBlocker down by that amount,
 *   creating a momentary transparent gap between the two phases.
 *
 * Z-index scale:
 *   HeaderBlocker (glass)  z-index: 10  — blurs sky + content behind it
 *   Header (fixed, z-20)   z-index: 20  — nav/logo always crisp on top
 *
 * DOM structure:
 *   ┌──────────────────────────────────────┐  ← viewport top
 *   │  [fixed Header — z:20, transparent]  │
 *   │  [SkyBlocker   — z:10, sticky top:0] │  sky glass immediately at scroll=0
 *   │  Hero                                │
 *   ├──────────────────────────────────────┤  ← -mt-20 on <main>
 *   │  [DefaultBlocker — z:10, sticky top:0│  default glass takes over
 *   │  padded content wrapper              │
 *   └──────────────────────────────────────┘
 */
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      {/*
       * Sky section — SkyBlocker is sticky within this element.
       * It sticks at y = 0 (behind the transparent header) for the full
       * duration of the hero, then scrolls away naturally.
       */}
      <section aria-label="Introduction" className={styles.hero}>
        <HeaderBlocker variant="sky" />
        <Hero />
      </section>

      {/*
       * Main content — margin-top: -$header-height closes the gap between
       * SkyBlocker unsticking and DefaultBlocker sticking (seamless handoff).
       *
       * NO padding on <main> itself — padding is on the inner wrapper so the
       * DefaultBlocker's natural position equals main.offsetTop exactly.
       */}
      <main
        id="main-content"
        className="flex-1 max-w-full"
        style={{ containerType: "inline-size" }}
        tabIndex={-1}
      >
        <HeaderBlocker variant="default" />

        {/* All readable content lives here, safely below the DefaultBlocker. */}
        <div className="p-[clamp(.75rem,1vw,1rem)]">
          {children}
        </div>
      </main>
    </>
  );
}
