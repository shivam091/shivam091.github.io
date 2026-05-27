import { JSX } from "react";
import PageHeading from "@/components/PageHeading/PageHeading";

/**
 * InternalLayout — shared layout for all non-home content pages.
 *
 * Adds the page title heading above each page's MDX / TSX content.
 * <Header> and the sky banner are provided by the parent (site)/layout.tsx.
 */
export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
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
  );
}
