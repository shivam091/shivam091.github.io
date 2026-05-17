"use client";

import { JSX, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import Typed from "typed.js";
import styles from "@/components/HeroRoleTyped/HeroRoleTyped.module.scss";

export default function HeroRoleTyped(): JSX.Element {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const strings = siteConfig.author.roles || [];
    if (strings.length === 0 || !el.current) return;

    const typed = new Typed(el.current, {
      strings,
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      smartBackspace: true
    });

    return () => typed.destroy();
  }, []);

  return (
    <>
      {/*
       * Static, visually-hidden text for screen readers.
       * Reads the full roles list once rather than spelling out every
       * animated character as it types.  sr-only keeps it off-screen but
       * in the accessibility tree.
       */}
      <span className="sr-only">
        {siteConfig.author.roles.join(", or a ")}
      </span>

      {/*
       * Visual-only animated span — hidden from AT with aria-hidden so
       * the typing animation doesn't produce a stream of partial words.
       */}
      <span
        ref={el}
        aria-hidden="true"
        className={`${styles.heroHighlight} relative tracking-wider pb-0.5`}
      />
    </>
  );
};
