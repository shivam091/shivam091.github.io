import { JSX } from "react";
import Hero from "@/components/Hero/Hero";

/**
 * HomeLayout — home-route-specific layout.
 *
 * Renders the Hero section (time-based greeting + role type-writer) above the
 * main content area.  <Header> and the sky banner are provided by the parent
 * (site)/layout.tsx — this file only adds what is unique to the home route.
 */
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Hero />

      <main
        id="main-content"
        className="flex-1 max-w-full p-[clamp(.75rem,1vw,1rem)]"
        style={{ containerType: "inline-size" }}
        tabIndex={-1}
      >
        {children}
      </main>
    </>
  );
}
