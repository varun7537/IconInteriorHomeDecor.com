// process-node.tsx
"use client";

import { ProcessStepIcon } from "./process-icons";
import { nodeCanvas, nodePoints, toneStyles, type ProcessStepData } from "./lib/process-data";
import { seededTilt, useInView, usePrefersReducedMotion } from "./shared/hooks";

interface ProcessNodeProps {
  step: ProcessStepData;
  index: number;
}

export function ProcessNode({ step, index }: ProcessNodeProps) {
  const point = nodePoints[index];
  const tone = toneStyles[step.tone];
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useInView<HTMLLIElement>(0.4);
  const tilt = seededTilt(index, 4);
  const settled = isVisible || reducedMotion;
  const isAbove = step.side === "above";

  const left = `${(point.x / nodeCanvas.width) * 100}%`;
  const top = `${(point.y / nodeCanvas.height) * 100}%`;

  return (
    <li
      ref={ref}
      className="absolute list-none snap-center"
      style={{ left, top, transform: "translate(-50%, -50%)" }}
      aria-label={`Step ${step.numeral} of 5: ${step.title}`}
    >
      <div
        className={[
          "absolute left-1/2 w-40 -translate-x-1/2 text-center sm:w-44",
          isAbove ? "bottom-full mb-4 sm:mb-5" : "top-full mt-4 sm:mt-5",
        ].join(" ")}
        style={{
          transitionProperty: "transform, opacity",
          transitionDuration: reducedMotion ? "0ms" : "600ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: settled ? `${index * 90 + 160}ms` : "0ms",
          transform: settled
            ? "translate(-50%, 0)"
            : `translate(-50%, ${isAbove ? "0.6rem" : "-0.6rem"})`,
          opacity: settled ? 1 : 0,
        }}
      >
        <h3 className="font-serif text-[16px] font-medium italic leading-snug text-[#221F1C] sm:text-[17px]">
          {step.title}
        </h3>
        <p className="mx-auto mt-1.5 max-w-[10.5rem] font-sans text-[12.5px] leading-relaxed text-[#6B665A]">
          {step.description}
        </p>
      </div>

      <div
        style={{
          transitionProperty: "transform, opacity",
          transitionDuration: reducedMotion ? "0ms" : "650ms",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          transitionDelay: settled ? `${index * 90}ms` : "0ms",
          transform: settled ? `scale(1) rotate(${tilt}deg)` : "scale(0.35) rotate(0deg)",
          opacity: settled ? 1 : 0,
        }}
      >
        <div
          className="group relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_24px_-12px_rgba(34,31,28,0.45)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_30px_-12px_rgba(34,31,28,0.55)] sm:h-20 sm:w-20 lg:h-[5.5rem] lg:w-[5.5rem]"
          style={{ backgroundColor: tone.fill }}
        >
          <ProcessStepIcon
            icon={step.icon}
            className="h-6 w-6 stroke-white transition-transform duration-300 ease-out group-hover:scale-110 sm:h-7 sm:w-7"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="absolute -right-1.5 -top-2 rounded-full bg-white px-1.5 py-0.5 font-serif text-[11px] font-medium italic leading-none"
            style={{ color: tone.numeral }}
          >
            {step.numeral}
          </span>
        </div>
      </div>
    </li>
  );
}