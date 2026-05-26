"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./NavigationProgress.module.scss";

type State = "idle" | "loading" | "done";

/**
 * Two-part navigation indicator:
 *
 *   1. A thin gradient progress bar fixed to the top of the viewport.
 *   2. A triple-ring SVG spinner centred in the viewport — only appears after
 *      a 400 ms delay so fast navigations never flash it.
 *
 * Works with Next.js App Router + `output: "export"`.
 * No external dependencies.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  const [state, setState]           = useState<State>("idle");
  const [progress, setProgress]     = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  const trickleRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinnerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  function clearTimers() {
    if (trickleRef.current)  clearTimeout(trickleRef.current);
    if (doneRef.current)     clearTimeout(doneRef.current);
    if (spinnerRef.current)  clearTimeout(spinnerRef.current);
  }

  function start() {
    clearTimers();
    setShowSpinner(false);
    setState("loading");
    setProgress(8);
    scheduleTrickle(8);

    // Reveal spinner only if navigation takes longer than 400 ms.
    spinnerRef.current = setTimeout(() => setShowSpinner(true), 400);
  }

  /**
   * Eased trickle — increments shrink as progress approaches 85 %,
   * mimicking a real async operation that slows toward the end.
   */
  function scheduleTrickle(current: number) {
    if (current >= 85) return;
    const increment = (85 - current) * 0.12 + Math.random() * 3;
    const next      = Math.min(current + increment, 85);
    const delay     = 120 + Math.random() * 180;

    trickleRef.current = setTimeout(() => {
      setProgress(next);
      scheduleTrickle(next);
    }, delay);
  }

  function complete() {
    clearTimers();
    setShowSpinner(false);
    setProgress(100);
    setState("done");

    // Allow the bar CSS transition (220 ms) + fade delay (150 ms) to finish.
    doneRef.current = setTimeout(() => {
      setState("idle");
      setProgress(0);
    }, 600);
  }

  // ── Detect internal-link clicks → start ─────────────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const raw = anchor.getAttribute("href") ?? "";

      // Skip: external, protocol-relative, hash-only, mailto, tel
      if (
        raw.startsWith("http")    ||
        raw.startsWith("//")      ||
        raw.startsWith("#")       ||
        raw.startsWith("mailto:") ||
        raw.startsWith("tel:")
      ) return;

      // Skip: same page
      const target = raw.split("?")[0].split("#")[0] || "/";
      if (target === pathname) return;

      start();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Detect navigation complete → finish ─────────────────────────────────────
  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      complete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Cleanup ──────────────────────────────────────────────────────────────────
  useEffect(() => () => clearTimers(), []);

  if (state === "idle") return null;

  return (
    <>
      {/* ── Top progress bar ───────────────────────────────────────────────── */}
      <div
        className={`${styles.track} ${state === "done" ? styles.done : ""}`}
        aria-hidden="true"
        role="presentation"
      >
        <div className={styles.bar} style={{ width: `${progress}%` }}>
          <span className={styles.orb} />
        </div>
      </div>

      {/* ── Centred SVG spinner ────────────────────────────────────────────── */}
      <div
        className={`${styles.overlay} ${showSpinner ? styles.visible : ""}`}
        aria-hidden="true"
        role="presentation"
      >
        {/* Frosted glass backdrop so rings are readable against any page bg */}
        <span className={styles.backdrop} />

        {/*
         * Triple-ring SVG spinner.
         *
         * Ring arc lengths are calculated from each circle's circumference:
         *   Outer  r=34 → C ≈ 213.6 → 3/4 arc: dasharray="160 54"
         *   Middle r=25 → C ≈ 157.1 → 2/3 arc: dasharray="105 52"
         *   Inner  r=16 → C ≈ 100.5 → 1/2 arc: dasharray=" 50 51"
         *
         * Rotation speeds/directions:
         *   Outer  → clockwise,          slow  (2.8 s)
         *   Middle → counter-clockwise,  medium (2.0 s)
         *   Inner  → clockwise,          fast  (1.2 s)
         */}
        <svg
          viewBox="0 0 80 80"
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring — attention (orange) */}
          <circle
            className={styles.ring1}
            cx="40" cy="40" r="34"
            fill="none"
            stroke="var(--color-fg-attention)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="160 54"
          />

          {/* Middle ring — success (green) */}
          <circle
            className={styles.ring2}
            cx="40" cy="40" r="25"
            fill="none"
            stroke="var(--color-fg-success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="105 52"
          />

          {/* Inner ring — accent (blue) */}
          <circle
            className={styles.ring3}
            cx="40" cy="40" r="16"
            fill="none"
            stroke="var(--color-fg-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="50 51"
          />
        </svg>
      </div>
    </>
  );
}
