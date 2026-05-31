"use client";

import { useState, useEffect } from "react";

// Touch coordinates in viewport space; null when no active touch point exists.
interface TouchPosition {
  x: number | null;
  y: number | null;
}

// Tracks the first active touch point via passive listeners; resets to null on touchend.
export function useTouch(): TouchPosition {
  const [position, setPosition] = useState<TouchPosition>({ x: null, y: null });

  useEffect(() => {
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setPosition({ x: t.clientX, y: t.clientY });
    };
    const onEnd = () => setPosition({ x: null, y: null });

    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  return position;
}
