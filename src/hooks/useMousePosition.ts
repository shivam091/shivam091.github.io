"use client";

import { useState, useEffect } from "react";

// Cursor coordinates in viewport space; null until the first mousemove event fires.
interface MousePosition {
  x: number | null;
  y: number | null;
}

// Tracks the mouse cursor position via a passive mousemove listener; returns null on touch-only devices.
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return mousePosition;
}
