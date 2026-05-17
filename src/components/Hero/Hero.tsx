"use client";

import { JSX } from "react";
import { siteConfig } from "@/config/site";
import { useTimeGreeting } from "@/hooks/useTimeGreeting";
import HeroRoleTyped from "@/components/HeroRoleTyped/HeroRoleTyped";
import styles from "@/components/Hero/Hero.module.scss";

export default function Hero(): JSX.Element {
  const timeGreeting = useTimeGreeting();

  return (
    <>
      <section className="p-6 min-h-82.5 flex items-center justify-center">
        <div className="flex flex-col items-start justify-center gap-6 w-full max-w-4xl">
          <h1 className={`${styles.heroHeading} text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight`}>
            <span className="text-(--color-fg-muted) block mb-3 lowercase first-letter:uppercase">
              {timeGreeting}
            </span>
            <span className="block font-medium">
              I&apos;m {siteConfig.author.name} 👋
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
    </>
  );
}
