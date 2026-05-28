"use client";

import { JSX, useEffect, useState, useCallback } from "react";
import { ArrowUpIcon } from "@/components/Icon";
import Button from "@/components/Button";
import styles from "@/components/ScrollToTop/ScrollToTop.module.scss";

export default function ScrollToTop(): JSX.Element {
  // undefined = never been visible yet (no animation, hidden via base CSS)
  const [state, setState] = useState<"visible" | "hidden" | undefined>(undefined);

  useEffect(() => {
    // `ticking` prevents scheduling more than one rAF per paint cycle,
    // keeping the scroll handler cheap even on high-frequency scroll events.
    let ticking = false;

    const updateVisibility = () => {
      if (window.scrollY > 250) {
        setState("visible");
      } else {
        // Only transition to "hidden" (triggering the bounce-out animation)
        // after the button has been shown at least once; if it has never been
        // visible, keep state undefined so no animation runs at all.
        setState(prev => (prev !== undefined ? "hidden" : undefined));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Button
      shape="pill"
      intent="accent"
      aria-label="Scroll to top"
      data-state={state}
      onClick={scrollToTop}
      className={styles.scrollTop}
    >
      <ArrowUpIcon />
    </Button>
  );
}
