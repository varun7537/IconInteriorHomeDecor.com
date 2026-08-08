"use client";

import { processSteps } from "./lib/process-data";
import { ProcessNode } from "./process-node";
import { ProcessThread } from "./process-thread";
import { RevealOnScroll } from "./shared/reveal-on-scroll";
import { useScrollProgress } from "./shared/hooks";

const whatsappMessage =
  "Hello Icon Interior, I’d like to start my interior project. Please share the next steps.";

const whatsappUrl = `https://api.whatsapp.com/send/?phone=919773836697&text=${encodeURIComponent(
  whatsappMessage
)}&type=phone_number&app_absent=0`;

export default function Process() {
  const { ref: threadRef, progress } = useScrollProgress();

  return (
    <section
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-7 bg-[#A9825A]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#A9825A]">
              How we work
            </span>
            <span aria-hidden="true" className="h-px w-7 bg-[#A9825A]" />
          </div>
          <h2
            id="process-heading"
            className="font-serif text-4xl font-medium leading-[1.05] text-[#221F1C] sm:text-5xl"
          >
            One <em className="font-normal italic text-[#FFDE59]">thread</em>,
            five steps
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-[15px] leading-relaxed text-[#6B665A] sm:text-base">
            Every project follows the same line, from the first conversation
            to the final walkthrough &mdash; nothing skipped, nothing rushed.
          </p>
        </div>

        <div className="relative mt-14 lg:mt-20">
          <div className="-mx-6 snap-x snap-mandatory overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-10 lg:mx-0 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
            <div
              ref={threadRef}
              className="relative mx-auto h-[340px] min-w-[860px] max-w-5xl px-8 sm:h-[390px] sm:px-10 lg:h-[420px] lg:px-6"
            >
              <ProcessThread progress={progress} />
              <ol aria-label="Our five-step process" className="absolute inset-0">
                {processSteps.map((step, index) => (
                  <ProcessNode key={step.id} step={step} index={index} />
                ))}
              </ol>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent lg:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent lg:hidden"
          />

          <p className="mt-2 text-center font-sans text-[11px] uppercase tracking-[0.14em] text-[#A39C8A] lg:hidden">
            Swipe to follow the thread &rarr;
          </p>
        </div>

        <RevealOnScroll delayMs={processSteps.length * 90}>
          <div className="mt-16 flex flex-col items-center gap-6 border-t border-dashed border-[#DAD5C6] pt-10 sm:mt-14 sm:flex-row sm:justify-between">
            <p className="font-sans text-[13px] text-[#6B665A]">
              Most projects move from consultation to walkthrough in
              6&ndash;10 weeks.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start your project on WhatsApp"
              className="group inline-flex items-center gap-2 rounded-sm bg-[#221F1C] px-6 py-3.5 font-sans text-[13.5px] font-medium tracking-wide text-white transition-colors duration-200 hover:bg-[#3A352E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[#221F1C]"
            >
              Start your project

              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M3.5 8h9m0 0-3.5-3.5M12.5 8 9 11.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
