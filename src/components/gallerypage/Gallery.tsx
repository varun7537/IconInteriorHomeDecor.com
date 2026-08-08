// gallery.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { galleryItems, type GalleryCategory } from "./lib/gallery-data";
import { GalleryCard } from "./gallery-card";
import { FilterTabs } from "./filter-tabs";

type FilterValue = "all" | GalleryCategory;

const LG_BREAKPOINT = 1024;

export default function Gallery() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [columnCount, setColumnCount] = useState(2);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(
    () =>
      filter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
    const update = () => setColumnCount(mq.matches ? 4 : 2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        setScrollDistance(rect.top + rect.height / 2 - viewportCenter);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const columns = useMemo(() => {
    const cols: (typeof visibleItems)[] = Array.from(
      { length: columnCount },
      () => [],
    );
    visibleItems.forEach((item, i) => cols[i % columnCount].push(item));
    return cols;
  }, [visibleItems, columnCount]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="bg-[#1B1B1B] px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-[#FFDE59]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFDE59]">
                Sample book, vol. 04
              </span>
            </div>
            <h2
              id="gallery-heading"
              className="font-serif text-4xl font-medium leading-[1.05] text-[#F3EEE0] sm:text-5xl lg:text-[3.25rem]"
            >
              The <em className="font-normal italic text-[#FFDE59]">gallery</em>{" "}
              wall
            </h2>
            <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-[#9C9480] sm:text-base">
              Every room we&apos;ve sourced, styled, and photographed in the
              finished home &mdash; hung here like swatches pulled from the
              sample book, never a showroom.
            </p>
          </div>

          <FilterTabs active={filter} onChange={setFilter} />
        </div>

        {visibleItems.length === 0 ? (
          <p className="mt-20 text-center font-sans text-sm text-[#9C9480]">
            No projects in this room category yet &mdash; check back soon.
          </p>
        ) : (
          <div className="mt-16 flex gap-4 sm:gap-5">
            {columns.map((col, colIndex) => {
              const direction = colIndex % 2 === 0 ? 1 : -1;
              const amplitude = reducedMotion ? 0 : 0.06 + colIndex * 0.015;
              const translate = scrollDistance * amplitude * direction;

              return (
                <div
                  key={colIndex}
                  className="flex flex-1 flex-col gap-4 sm:gap-5"
                  style={{
                    transform: `translate3d(0, ${translate}px, 0)`,
                    transition: reducedMotion ? undefined : "transform 120ms linear",
                  }}
                >
                  {col.map((item, itemIndex) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      index={itemIndex * columnCount + colIndex}
                      priority={colIndex < 2 && itemIndex === 0}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-20 flex flex-col items-center gap-6 border-t border-[#2B2820] pt-10 sm:flex-row sm:justify-between">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#9C9480]">
            240+ interiors documented &middot; 18 cities
          </p>
          <a
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-sm bg-[#FFDE59] px-6 py-3.5 font-sans text-[13.5px] font-semibold tracking-wide text-[#15130F] transition-colors duration-200 hover:bg-[#FFE985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#15130F] focus-visible:ring-[#FFDE59]"
          >
            View full portfolio
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
      </div>
    </section>
  );
}