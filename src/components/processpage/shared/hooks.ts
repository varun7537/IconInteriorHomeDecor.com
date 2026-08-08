"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReduced(mq.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mq.addEventListener("change", handler);

    return () => {
      mq.removeEventListener("change", handler);
    };
  }, []);

  return reduced;
}

export function seededTilt(
  index: number,
  spread = 3
) {
  const seed =
    Math.sin(index * 12.9898) * 43758.5453;

  const frac = seed - Math.floor(seed);

  return (frac - 0.5) * 2 * spread;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.25
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined"
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return {
    ref,
    isVisible,
  };
}

export function useScrollProgress<
  T extends HTMLElement = HTMLDivElement
>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    let raf = 0;

    const measure = () => {
      raf = 0;

      const rect =
        node.getBoundingClientRect();

      const vh = window.innerHeight || 1;

      const span =
        rect.height + vh * 0.5;

      const traveled =
        vh * 0.9 - rect.top;

      const nextProgress = Math.min(
        1,
        Math.max(0, traveled / span)
      );

      setProgress(nextProgress);
    };

    const onScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(
        measure
      );
    };

    measure();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return {
    ref,
    progress,
  };
}

export function useParallax<
  T extends HTMLElement = HTMLDivElement
>(distance = 10): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      const rect =
        node.getBoundingClientRect();

      const vh = window.innerHeight || 1;

      const progress =
        (vh - rect.top) /
        (vh + rect.height);

      const y =
        (progress - 0.5) * distance;

      node.style.setProperty(
        "--parallax-y",
        `${y}px`
      );
    };

    const onScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(
        update
      );
    };

    update();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [distance]);

  return ref;
}