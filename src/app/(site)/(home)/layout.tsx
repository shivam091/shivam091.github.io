import { JSX } from "react";
import Hero from "@/components/Hero";

/**
 * HomeLayout — home-route layout
 */
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <section aria-label="Introduction" className="z-10">
        <Hero />
      </section>

      <main
        id="main-content"
        className="flex-1 max-w-full z-1000"
        style={{ containerType: "inline-size" }}
        tabIndex={-1}
      >
        <div className="p-[clamp(.75rem,1vw,1rem)]">
          {children}
        </div>
      </main>
    </>
  );
}
