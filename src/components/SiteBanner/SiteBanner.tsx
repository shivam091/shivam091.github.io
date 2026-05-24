"use client";

/**
 * SiteBanner — thin "use client" boundary for the full-bleed sky banner.
 *
 * Reads usePathname() to decide which banner to render:
 *   /               → HeroBanner   (star-field + multi-layer clouds)
 *   everything else → SkyBannerTop (simpler gradient sky)
 *
 * Why a separate component?
 *   The parent (site)/layout.tsx is a server component. Importing usePathname()
 *   directly there would force the entire layout into the client bundle.
 *   This wrapper keeps the "use client" surface area as small as possible.
 *
 * Static-export note:
 *   Next.js SSG-renders client components at build time with the correct path,
 *   so the initial HTML already contains the right banner — no hydration flash.
 */

import { JSX } from "react";
import { usePathname } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import SkyBannerTop from "@/components/SkyBanners/SkyBannerTop";

export default function SiteBanner(): JSX.Element {
  const pathname = usePathname();
  return pathname === "/" ? <HeroBanner /> : <SkyBannerTop />;
}
