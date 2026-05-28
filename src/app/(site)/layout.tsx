/**
 * SiteLayout — the single layout shared by every content route.
 */
import { JSX } from "react";
import SiteBanner from "@/components/SiteBanner";
import SkyBannerBottom from "@/components/SkyBanners/SkyBannerBottom";
import SiteFooter from "@/components/SiteFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <SiteBanner />

      <div className="container w-full mx-auto">
        <div className="flex flex-col min-h-dvh">
          {children}
          <SiteFooter />
        </div>
      </div>

      <SkyBannerBottom />
    </>
  );
}
