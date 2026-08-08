// gallery-card.tsx
"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import type { GalleryItem } from "./lib/gallery-data";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  priority?: boolean;
  reducedMotion?: boolean;
}

const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[5/4]"];

function aspectForItem(item: GalleryItem) {
  if (item.size === "tall") return "aspect-[3/4]";
  const hash = item.id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ASPECTS[hash % ASPECTS.length];
}

export function GalleryCard({
  item,
  index,
  priority = false,
  reducedMotion = false,
}: GalleryCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const aspect = aspectForItem(item);
  const code = `SW${String(index + 1).padStart(2, "0")}`;
  const delay = reducedMotion ? 0 : Math.min(index * 60, 360);

  return (
    <a
      ref={cardRef}
      href={`/portfolio/${item.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={[
        "group relative block w-full overflow-hidden rounded-[3px]",
        "border border-[#2B2820] bg-[#1D1A14]",
        aspect,
        "transition-[clip-path,opacity] duration-700 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE59] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15130F]",
        visible
          ? "opacity-100 [clip-path:inset(0_0_0_0)]"
          : "opacity-0 [clip-path:inset(12%_0_0_0)]",
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <Image
          src={item.image}
          alt={`${item.title}${item.location ? `, ${item.location}` : ""}`}
          fill
          priority={priority}
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className={[
            "object-cover",
            "transition-transform duration-[900ms] ease-out",
            "group-hover:scale-[1.08]",
            "motion-reduce:transition-none",
            "motion-reduce:group-hover:scale-100",
          ].join(" ")}
        />
      </div>

      {/* Ambient scrim for legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0B08]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      {/* Swatch tag: swings out like a fabric-sample hangtag */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute left-3 top-3 origin-top-left",
          "rounded-[2px] border border-dashed border-[#FFDE59]/70 bg-[#15130F]/90 px-3 py-2",
          "-translate-x-1 -translate-y-1 -rotate-6 scale-95 opacity-0",
          "transition-all duration-300 ease-out",
          "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:-rotate-2 group-hover:scale-100 group-hover:opacity-100",
          "group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:-rotate-2 group-focus-visible:scale-100 group-focus-visible:opacity-100",
        ].join(" ")}
      >
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#FFDE59]">
          {code}
        </span>
        <span className="mt-0.5 block h-px w-full bg-[#2B2820]" />
        <span className="mt-1.5 block font-sans text-[11px] text-[#F3EEE0]">
          {item.location}
        </span>
      </div>

      {/* Title */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5">
        <p className="font-serif text-[17px] italic leading-tight text-[#F3EEE0] sm:text-[19px]">
          {item.title}
        </p>
      </div>
    </a>
  );
}