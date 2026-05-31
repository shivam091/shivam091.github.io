"use client";

import { JSX, useState, useEffect } from "react";
import Button from "@/components/Button";
import styles from "@/components/FlashlightOverlay/FlashlightOverlay.module.scss";
import { useMousePosition } from "@/hooks/useMousePosition";

// Cursor bitmap — 10×10 crosshair.
const CURSOR_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACQSURBVHgBhZA9CsQgEIVnxCJHSJkjpFGw8wh7xD2KtRbmCClzhAVRdx6YLsQHyoifP/MxjeSct1KKl3Jl5kXG2Vo7rLUH9hlTSgmAp+cEY0zgGOMupz/0Eq31V0l2mqTW6lXvfaN5VoC/GSXMgqevGQgDSpSEGQhNyjl3Sv0GB7jkewVNMIDmxr8v6TaMi+gPLrNAA0C8lG8AAAAASUVORK5CYII=";

// Injected as a <style> tag ==
// Mounting this tag activates the effect; unmounting removes it cleanly.
const FLASHLIGHT_CSS = `
@media (hover: hover) {
  body {
    cursor: url('data:image/png;base64,${CURSOR_B64}'), auto;
  }
  :root {
    cursor: none;
    --cursorX: 0px;
    --cursorY: 0px;
  }
  :root::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    pointer-events: none;
    background: radial-gradient(
      circle 16vmax at var(--cursorX) var(--cursorY),
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }
}
`;

interface Props {
  showToggle?: boolean;
}

export default function FlashlightOverlay({ showToggle = false }: Props): JSX.Element {
  const [enabled, setEnabled] = useState(true);
  const { x, y } = useMousePosition();

  // Mirror cursor position onto :root so the :root::before gradient follows the mouse.
  useEffect(() => {
    if (typeof x !== "number" || typeof y !== "number") return;

    document.documentElement.style.setProperty("--cursorX", `${x}px`);
    document.documentElement.style.setProperty("--cursorY", `${y}px`);
  }, [x, y]);

  useEffect(() => {
    document.body.setAttribute("data-error-page", "true");
    return () => document.body.removeAttribute("data-error-page");
  }, []);

  return (
    <>
      {enabled && <style dangerouslySetInnerHTML={{ __html: FLASHLIGHT_CSS }} />}
      {showToggle && (
        <div className={styles.toggleWrapper}>
          <Button variant="outlined" size="sm" onClick={() => setEnabled(v => !v)}>
            {enabled ? "Disable" : "Enable"} Flashlight Effect
          </Button>
        </div>
      )}
    </>
  );
}
