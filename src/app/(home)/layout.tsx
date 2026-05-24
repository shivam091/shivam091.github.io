import React, { JSX } from "react";
import Hero from "@/components/Hero/Hero";
import SkyBannerBottom from "@/components/SkyBanners/SkyBannerBottom/SkyBannerBottom";

export default function HomeLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <div className="container w-full mx-auto">
        <div className="relative flex flex-col min-h-dvh z-10">
          <Hero />

          <main id="main-content" className="flex-1 p-4 max-w-full" style={{ containerType: "inline-size" }} tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>

      <SkyBannerBottom />
    </>
  );
};
