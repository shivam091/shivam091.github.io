import React, { JSX } from "react";
import Hero from "@/components/Hero/Hero";

export default function HomeLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <div className="container">
        <div className="page-wrapper">
          <Hero />

          <main id="main-content" className="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
