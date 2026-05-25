import React, { JSX } from "react";
import Hero from "@/components/Hero/Hero";
import SkyBannerBottom from "@/components/SkyBanners/SkyBannerBottom/SkyBannerBottom";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Header from "@/components/Header/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <HeroBanner />

      <div className="container w-full mx-auto">
        <div className="relative flex flex-col min-h-dvh z-10">
          <Header />
          <Hero />

          <main id="main-content" className="flex-1 max-w-full p-[clamp(.75rem,1vw,1rem)]" style={{ containerType: "inline-size" }} tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>

      <SkyBannerBottom />
    </>
  );
};
