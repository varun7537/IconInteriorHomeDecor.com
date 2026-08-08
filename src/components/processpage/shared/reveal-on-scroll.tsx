// shared/reveal-on-scroll.tsx
"use client";

import type { ReactNode } from "react";
import { useInView } from "./hooks";

interface RevealOnScrollProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  delayMs = 0,
  className = "",
}: RevealOnScrollProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        isVisible
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "translate-y-5 scale-[0.98] opacity-0 blur-[2px] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-0",
        className,
      ].join(" ")}
      style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}