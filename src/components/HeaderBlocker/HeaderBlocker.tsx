import { JSX } from "react";
import styles from "./HeaderBlocker.module.scss";

interface HeaderBlockerProps {
  /**
   * "sky"     — sky-tinted glass; goes at the top of the hero/sky-banner section
   * "default" — default-bg glass; goes at the top of <main> content
   */
  variant: "sky" | "default";
}

/**
 * HeaderBlocker — pure-CSS frosted-glass layer for the site header.
 *
 * position:sticky + top:0 keeps this div aligned behind the fixed transparent
 * header for as long as its containing section is in the viewport.  No JS,
 * no IntersectionObserver, no scroll listeners.
 *
 * See HeaderBlocker.module.scss for the full technique explanation.
 */
export default function HeaderBlocker({ variant }: HeaderBlockerProps): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={`${styles.blocker} ${styles[variant]}`}
    />
  );
}
