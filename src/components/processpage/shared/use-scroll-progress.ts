"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far a tracked element has traveled through the viewport, as a
 * value from 0 to 1. Used to drive the "thread" that fills the process
 * timeline's spine as the visitor scrolls past each step.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Progress starts once the top of the track crosses ~65% down the
      // viewport, and completes once the bottom clears the same line.
      const startLine = viewportHeight * 0.65;
      const totalDistance = rect.height + viewportHeight * 0.3;
      const traveled = startLine - rect.top;

      const next = Math.min(1, Math.max(0, traveled / totalDistance));
      setProgress(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}