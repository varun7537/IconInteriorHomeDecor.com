// process-thread.tsx
"use client";

import { useEffect, useRef } from "react";
import { nodeCanvas, processSteps, threadPath, toneStyles } from "./lib/process-data";
import { usePrefersReducedMotion } from "./shared/hooks";

interface ProcessThreadProps {
  progress: number;
}

export function ProcessThread({ progress }: ProcessThreadProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const drawn = reducedMotion ? 1 : progress;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length * (1 - drawn)}`;
  }, [progress, reducedMotion]);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${nodeCanvas.width} ${nodeCanvas.height}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="thread-gradient" x1="0" y1="0" x2="1" y2="0">
          {processSteps.map((step, index) => (
            <stop
              key={step.id}
              offset={`${(index / (processSteps.length - 1)) * 100}%`}
              stopColor={toneStyles[step.tone].fill}
            />
          ))}
        </linearGradient>
      </defs>

      <path
        d={threadPath}
        stroke="#EAE5D8"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <path
        ref={pathRef}
        d={threadPath}
        stroke="url(#thread-gradient)"
        strokeWidth={2.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ transition: reducedMotion ? "none" : "stroke-dashoffset 150ms linear" }}
      />
    </svg>
  );
}