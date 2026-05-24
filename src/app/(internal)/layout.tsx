import { JSX } from "react";
import PageHeading from "@/components/PageHeading/PageHeading";
import SkyBannerTop from "@/components/SkyBanners/SkyBannerTop/SkyBannerTop";

export default function InternalLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <SkyBannerTop />

      <div className="container w-full mx-auto">
        <div className="relative flex flex-col min-h-dvh z-10">
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
    </>
  );
}
