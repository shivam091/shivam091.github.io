import { JSX } from "react";
import PageHeading from "@/components/PageHeading";

/**
 * InternalLayout — all non-home content pages with two-phase pure-CSS glass.
 */
export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <main
        id="main-content"
        className="flex-1 max-w-full z-1000"
        style={{ containerType: "inline-size" }}
        tabIndex={-1}
      >
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
