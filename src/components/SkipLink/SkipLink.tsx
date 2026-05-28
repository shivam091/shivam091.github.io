"use client";

import { JSX, useCallback } from "react";
import Button from "@/components/Button";
import styles from "@/components/SkipLink/SkipLink.module.scss";

interface SkipLinkProps {
  skipTo?: string;
}

export default function SkipLink({ skipTo = "#main-content" }: SkipLinkProps): JSX.Element {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const target = document.querySelector<HTMLElement>(skipTo);
      if (!target) return;

      // Non-interactive elements are not focusable by default; tabindex="-1"
      // makes them programmatically focusable without adding them to tab order.
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }

      // preventScroll:true lets scrollIntoView control the scroll position
      // instead of the browser's default instant focus-scroll behaviour.
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [skipTo],
  );

  // A wrapper <div> owns the slide animation via :focus-within so the Button's
  // own transition (transform, background-color, …) is never overridden.
  return (
    <div className={styles.wrapper}>
      <Button
        href={skipTo}
        size="sm"
        onClick={handleClick}
      >
        Skip to main content
      </Button>
    </div>
  );
}
