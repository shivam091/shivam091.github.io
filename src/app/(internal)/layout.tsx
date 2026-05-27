import { JSX } from "react";
import PageHeading from "@/components/PageHeading/PageHeading";
import SkyBannerTop from "@/components/SkyBanners/SkyBannerTop/SkyBannerTop";
import SkyBannerBottom from "@/components/SkyBanners/SkyBannerBottom/SkyBannerBottom";
import Header from "@/components/Header/Header";

export default function InternalLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <SkyBannerTop />

      <div className="container w-full mx-auto">
        <div className="relative flex flex-col min-h-dvh z-10">
          {/* 1 px sentinel — IntersectionObserver in HeaderClient watches this.
              While it is visible (scroll = 0) the header stays transparent.
              The moment it leaves the viewport the glass ramp-up begins. */}
          <div data-glass-trigger aria-hidden="true" className="absolute inset-x-0 top-0 h-px pointer-events-none" />

          <Header />

          <main
            id="main-content"
            className="flex-1 max-w-full p-[clamp(.75rem,1vw,1rem)]"
            style={{ containerType: "inline-size" }}
            tabIndex={-1}
          >
            <PageHeading />

            <section className="page-content" aria-labelledby="page-title">
              {children}
            </section>
          </main>
        </div>
      </div>

      <SkyBannerBottom />
    </>
  );
}
