import React, { JSX } from "react";
import Hero from "@/components/Hero/Hero";

export default function HomeLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <div className="container w-full mx-auto">
        <div className="relative flex flex-col min-h-dvh z-10">
          <Hero />

          <main id="main-content" className="flex-1 max-w-full p-[clamp(.75rem,1vw,1rem)]" style={{ containerType: "inline-size" }} tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
