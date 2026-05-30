"use client";

import { JSX, useState, useCallback, useEffect, useRef } from "react";
import Button from "@/components/Button";
import styles from "@/components/FlashlightOverlay/FlashlightOverlay.module.scss";

interface Props {
  showToggle?: boolean;
}

export default function FlashlightOverlay({ showToggle = false }: Props): JSX.Element {
  const [enabled, setEnabled] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -9999, y: -9999 });

  // Always track the latest cursor position, even while the flashlight is disabled.
  useEffect(() => {
    const track = (e: MouseEvent) => { posRef.current = { x: e.clientX, y: e.clientY }; };

    window.addEventListener("mousemove", track);
    return () => window.removeEventListener("mousemove", track);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.setProperty("--x", `${e.clientX}px`);
    el.style.setProperty("--y", `${e.clientY}px`);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled, handleMouseMove]);

  // Snap to the last known cursor position the moment the flashlight is (re-)enabled.
  useEffect(() => {
    if (!enabled) return;

    const el = overlayRef.current;
    if (!el) return;

    el.style.setProperty("--x", `${posRef.current.x}px`);
    el.style.setProperty("--y", `${posRef.current.y}px`);
  }, [enabled]);

  useEffect(() => {
    document.body.setAttribute("data-error-page", "true");
    return () => document.body.removeAttribute("data-error-page");
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        className={styles.overlay}
        data-enabled={enabled}
        aria-hidden="true"
      />
      {showToggle && (
        <div className={styles.toggleWrapper}>
          <Button variant="outlined" size="sm" onClick={() => setEnabled(v => !v)}>
            {enabled ? "Disable" : "Enable"} flashlight
          </Button>
        </div>
      )}
    </>
  );
}
