"use client"

import { JSX, useEffect, useState, useCallback } from "react";
import { ArrowUpIcon } from "@/components/Icon";
import styles from "@/components/ScrollToTop/ScrollToTop.module.scss";

export default function ScrollToTop(): JSX.Element {
  // undefined = never been visible yet (no animation, hidden via base CSS)
  const [state, setState] = useState<"visible" | "hidden" | undefined>(undefined);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      if (window.scrollY > 250) {
        setState("visible");
      } else {
        // Only trigger the hide animation after it has been shown at least once
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
    <>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-state={state}
        className={`fixed flex items-center justify-center rounded-full z-[1000] bg-secondary text-white ${styles.scrollTop}`}
      >
        <ArrowUpIcon />
      </button>
    </>
  );
}
