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
      strings: strings,
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      smartBackspace: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <span ref={el} className={`${styles.heroHighlight} relative tracking-wider pb-0.5`} />
    </>
  );
};
