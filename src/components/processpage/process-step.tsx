import { ProcessStepIcon } from "./process-icons";
import { RevealOnScroll } from "./shared/reveal-on-scroll";
import type { ProcessStepData } from "./lib/process-data";

interface ProcessStepProps {
  step: ProcessStepData;
  index: number;
  isLast: boolean;
}

export function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  return (
    <li
      className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
      aria-label={`Step ${index + 1} of 5: ${step.title}`}
    >
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-7 top-14 -bottom-10 w-px bg-[#DAD5C6] lg:hidden"
        />
      ) : null}

      <RevealOnScroll delayMs={index * 100} className="shrink-0">
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-[#2F3B2E] bg-[#F4F1EA] transition-all duration-300 ease-out group-hover:scale-[1.08] group-hover:bg-[#2F3B2E]">
          <span className="absolute -right-1 -top-2 bg-[#F4F1EA] px-1 font-sans text-[10.5px] font-medium leading-none text-[#A9825A]">
            {step.numeral}
          </span>
          <ProcessStepIcon
            icon={step.icon}
            className="h-5 w-5 stroke-[#2F3B2E] transition-colors duration-300 group-hover:stroke-[#F4F1EA]"
            aria-hidden="true"
          />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delayMs={index * 100 + 60} className="pt-1 lg:pt-4">
        <h3 className="font-serif text-[16.5px] font-medium leading-tight text-[#211F1B] sm:text-[17.5px]">
          {step.title}
        </h3>
        <p className="mt-1.5 max-w-[15rem] font-sans text-[13.5px] leading-relaxed text-[#6E6B60] lg:mx-auto">
          {step.description}
        </p>
      </RevealOnScroll>
    </li>
  );
}
