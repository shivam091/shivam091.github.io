import Hero from "@/components/Hero/Hero";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
        <Hero />
      </main>
    </>
  );
}
