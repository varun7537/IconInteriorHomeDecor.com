"use client";

import { ProcessStepIcon } from "./process-icons";
import { toneStyles, type ProcessStepData } from "./lib/process-data";
import { seededTilt, useParallax, usePrefersReducedMotion } from "./shared/hooks";

interface ProcessCardProps {
  step: ProcessStepData;
  index: number;
  isVisible: boolean;
  cardRef: (node: HTMLElement | null) => void;
}

export function ProcessCard({ step, index, isVisible, cardRef }: ProcessCardProps) {
  const tone = toneStyles[step.tone];
  const reducedMotion = usePrefersReducedMotion();
  const swatchRef = useParallax<HTMLDivElement>(10);
  const tilt = seededTilt(index);
  const settled = isVisible || reducedMotion;

  return (
    <li
      ref={cardRef}
      style={{
        transitionProperty: "transform, opacity",
        transitionDuration: reducedMotion ? "0ms" : "900ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: settled ? `${index * 110}ms` : "0ms",
        transform: settled ? "translateY(0) rotate(0deg)" : `translateY(2rem) rotate(${tilt}deg)`,
        opacity: settled ? 1 : 0,
      }}
    >
      {/* Hover lift lives on this inner element so it doesn't fight the entrance transform above */}
      <div className="group relative border border-[#E2DCCB] bg-white transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_36px_-20px_rgba(34,31,28,0.35)]">
        {/* Swatch block */}
        <div ref={swatchRef} className="relative h-28 overflow-hidden bg-[#EDE8DC] sm:h-32">
          <div
            className="absolute inset-0 transition-[clip-path] ease-out motion-reduce:transition-none"
            style={{
              backgroundColor: tone.fill,
              clipPath: settled ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transitionDuration: reducedMotion ? "0ms" : "900ms",
              transitionDelay: settled ? `${index * 110 + 120}ms` : "0ms",
              transform: "translateY(var(--parallax-y, 0px))",
            }}
          />

          {/* Light sheen sweep on hover, like catching a glossy paint chip */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden" />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 right-1 select-none font-serif text-[64px] font-medium italic leading-none"
            style={{ color: tone.numeral }}
          >
            {step.numeral}
          </span>

          <ProcessStepIcon
            icon={step.icon}
            className="absolute left-4 top-4 h-5 w-5"
            style={{ color: tone.ink }}
            aria-hidden="true"
          />
        </div>

        {/* Text */}
        <div className="p-5 sm:p-6">
          <p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.16em]"
            style={{ color: tone.label }}
          >
            Step {step.numeral}
          </p>
          <h3 className="mt-1.5 font-serif text-[19px] font-medium italic leading-snug text-[#221F1C] sm:text-[20px]">
            {step.title}
          </h3>
          <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-[#6B665A]">
            {step.description}
          </p>
        </div>
      </div>
    </li>
  );
}