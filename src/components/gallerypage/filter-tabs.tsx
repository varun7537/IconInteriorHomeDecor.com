// filter-tabs.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { categoryLabels, type GalleryCategory } from "./lib/gallery-data";

type FilterValue = "all" | GalleryCategory;

interface FilterTabsProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

const options = Object.keys(categoryLabels) as FilterValue[];

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const measure = () => {
    const btn = buttonRefs.current[active];
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - containerRect.left, width: btnRect.width });
  };

  useLayoutEffect(() => {
    measure();
  }, [active]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Filter gallery by room"
      className="relative flex flex-wrap items-center gap-1 border-b border-[#2B2820]"
    >
      {options.map((option) => {
        const selected = option === active;
        return (
          <button
            key={option}
            ref={(el) => {
              buttonRefs.current[option] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option)}
            className={[
              "relative px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE59] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15130F]",
              selected ? "text-[#FFDE59]" : "text-[#9C9480] hover:text-[#F3EEE0]",
            ].join(" ")}
          >
            {categoryLabels[option]}
          </button>
        );
      })}
      <span
        aria-hidden="true"
        className="absolute bottom-0 h-[2px] bg-[#FFDE59] transition-all duration-300 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
    </div>
  );
}