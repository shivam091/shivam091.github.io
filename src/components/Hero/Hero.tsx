"use client";

import { JSX } from "react";
import { siteConfig } from "@/config/site";
import { useTimeGreeting } from "@/hooks/useTimeGreeting";
import HeroRoleTyped from "@/components/HeroRoleTyped/HeroRoleTyped";
import styles from "@/components/Hero/Hero.module.scss";

export default function Hero(): JSX.Element {
  const timeGreeting = useTimeGreeting();

  return (
    <section
      aria-label="Introduction"
      className="p-[clamp(.75rem,1vw,1rem)] min-h-82.5 flex items-center justify-start z-10 relative"
    >
      <div className="flex flex-col items-start justify-center gap-2 w-full max-w-4xl">
        <h1 className={`${styles.heroHeading} font-semibold tracking-tight leading-tight`}>
          <span className="text-(--color-fg-muted) block mb-3 lowercase first-letter:uppercase">
            {timeGreeting}
          </span>
          <span className="block font-medium">
            {/* aria-hidden keeps "waving hand" out of the heading text */}
            I&apos;m {siteConfig.author.name} <span aria-hidden="true">👋</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl font-normal leading-relaxed text-(--color-fg-muted)">
          {siteConfig.tagline}
        </p>

        <p className="text-lg font-medium text-(--color-fg-danger)">
          I&apos;m a <HeroRoleTyped />.
        </p>
      </div>
    </section>
  );
}
