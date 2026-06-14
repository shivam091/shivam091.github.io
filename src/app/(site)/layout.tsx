import { JSX } from "react";
import SiteBanner from "@/components/SiteBanner";
import SkyBannerBottom from "@/components/SkyBanners/SkyBannerBottom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Shared layout for every content route — composes banner, container, footer, and bottom sky ornament.
export default function SiteLayout({ children }: { children: React.ReactNode; }): JSX.Element {
  return (
    <>
      <SiteBanner />

      <div className="container w-full mx-auto">
        <div className="flex flex-col min-h-dvh">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </div>

      <SkyBannerBottom />
    </>
  );
}
