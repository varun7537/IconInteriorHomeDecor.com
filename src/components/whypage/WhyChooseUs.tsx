"use client";

import { useEffect, useRef, useState } from "react";
import { Lora, Commissioner } from "next/font/google";
import {
  Check,
  ArrowUpRight,
  Star,
  Building2,
  Users,
  Clock,
} from "lucide-react";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const commissioner = Commissioner({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-commissioner",
  display: "swap",
});

type Feature = {
  code: string;
  label: string;
};

type Stat = {
  icon: React.ElementType;
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  caption?: string;
};

const features: Feature[] = [
  { code: "F.01", label: "Experienced professionals" },
  { code: "F.02", label: "Custom interior solutions" },
  { code: "F.03", label: "Good quality materials" },
  { code: "F.04", label: "Affordable pricing" },
  { code: "F.05", label: "Timely project delivery" },
  { code: "F.06", label: "Excellent customer support" },
];

const stats: Stat[] = [
  {
    icon: Building2,
    value: 150,
    suffix: "+",
    label: "Projects completed",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Happy clients",
  },
  {
    icon: Clock,
    value: 1,
    suffix: "+",
    label: "Years of experience",
  },
  {
    icon: Star,
    value: 5.0,
    decimals: 1,
    label: "Google rating",
    caption: "620+ reviews",
  },
];

const whatsappMessage =
  "Hi Icon Interior, I would like to book a consultation for my interior project.";

const whatsappUrl =
  `https://api.whatsapp.com/send/?phone=919773836697&text=${encodeURIComponent(
    whatsappMessage
  )}&type=phone_number&app_absent=0`;

function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.3
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    inView,
  };
}

function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CountUpNumber({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const { ref, inView } =
    useInView<HTMLDivElement>(0.6);

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1300;
    const start = performance.now();

    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setDisplay(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [inView, value]);

  return (
    <div ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </div>
  );
}

export default function WhyChooseUs() {
  const {
    ref: headerRef,
    inView: headerInView,
  } = useInView<HTMLDivElement>(0.4);

  const {
    ref: rulerRef,
    inView: rulerInView,
  } = useInView<HTMLDivElement>(0.6);

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      style={
        {
          "--bg": "#FFFFFF",
          "--surface": "#FAFAF8",
          "--ink": "#18140F",
          "--ink-soft": "#5B564E",
          "--ink-faint": "#A79F8E",
          "--primary": "#FFDE59",
          "--primary-deep": "#E7B916",
          "--line": "#E9E4D8",
        } as React.CSSProperties
      }
      className={`${lora.variable} ${commissioner.variable} relative bg-[var(--bg)] px-6 py-24 sm:py-28 lg:px-10`}
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className="flex items-center gap-3"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView
              ? "translateY(0)"
              : "translateY(10px)",
            transition:
              "opacity 650ms ease-out, transform 650ms ease-out",
          }}
        >
          <div
            className="h-px w-8 bg-[var(--primary-deep)]"
            aria-hidden="true"
          />

          <span className="font-[family-name:var(--font-commissioner)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)]">
            Studio credentials
          </span>
        </div>

        <h2
          id="why-choose-us-heading"
          className="mt-6 font-[family-name:var(--font-lora)] text-4xl font-medium leading-[1.15] text-[var(--ink)] sm:text-5xl"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="block overflow-hidden"
            >
              <span
                className="block"
                style={{
                  opacity: headerInView ? 1 : 0,
                  transform: headerInView
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition:
                    "opacity 750ms cubic-bezier(0.22,1,0.36,1), transform 750ms cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${
                    140 + i * 120
                  }ms`,
                }}
              >
                {i === 0 ? (
                  "Judgement you're glad to"
                ) : (
                  <>
                    <span className="relative inline-block">
                      <span className="relative z-10 italic">
                        hand
                      </span>

                      <svg
                        className="pointer-events-none absolute -bottom-1 left-0 h-3.5 w-[108%]"
                        viewBox="0 0 100 14"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 9 C 26 3, 74 3, 98 9"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="7"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: 140,
                            strokeDashoffset:
                              headerInView ? 0 : 140,
                            transition:
                              "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)",
                            transitionDelay:
                              "560ms",
                          }}
                        />
                      </svg>
                    </span>{" "}
                    over your keys
                  </>
                )}
              </span>
            </span>
          ))}
        </h2>

        <p
          className="mt-5 max-w-3xl font-[family-name:var(--font-commissioner)] text-base leading-relaxed text-[var(--ink-soft)]"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView
              ? "translateY(0)"
              : "translateY(14px)",
            transition:
              "opacity 650ms ease-out, transform 650ms ease-out",
            transitionDelay: "380ms",
          }}
        >
          From first sketch to final handover, our studio
          treats every room like it&apos;s the{" "}
          <span className="italic">only</span> one
          we&apos;re working on — the numbers below are how
          our clients keep score.
        </p>

        <div
          ref={rulerRef}
          className="relative mb-16 mt-16 sm:mb-20 sm:mt-20"
        >
          <div className="relative h-px w-full bg-[var(--line)]">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--ink)]"
              style={{
                width: rulerInView
                  ? "100%"
                  : "0%",
                transition:
                  "width 1200ms cubic-bezier(0.22,1,0.36,1) 150ms",
              }}
            />
          </div>

          <div
            className="absolute inset-x-0 top-0 flex justify-between"
            aria-hidden="true"
          >
            {Array.from({ length: 25 }).map(
              (_, i) => (
                <span
                  key={i}
                  className={`-translate-y-1/2 ${
                    i % 5 === 0
                      ? "h-3 w-px bg-[var(--ink-faint)]"
                      : "h-1.5 w-px bg-[var(--line)]"
                  }`}
                  style={{
                    opacity: rulerInView
                      ? 1
                      : 0,
                    transition: `opacity 400ms ease-out ${
                      300 + i * 18
                    }ms`,
                  }}
                />
              )
            )}
          </div>

          <div
            className="absolute -top-[13px] flex h-[26px] items-center rounded-full bg-[var(--primary)] px-3 font-[family-name:var(--font-commissioner)] text-[11px] font-semibold text-[var(--ink)] shadow-[0_8px_18px_-4px_rgba(231,185,22,0.55)]"
            style={{
              left: rulerInView
                ? "calc(100% - 4.4rem)"
                : "0%",
              opacity: rulerInView ? 1 : 0,
              transition:
                "left 1200ms cubic-bezier(0.22,1,0.36,1) 150ms, opacity 300ms ease-out 150ms",
            }}
          >
            1 years
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-4 lg:border-r lg:border-[var(--line)] lg:pr-10">
            <span className="font-[family-name:var(--font-commissioner)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)]">
              By the numbers
            </span>

            <div className="mt-5 flex flex-col">
              {stats.map((stat, i) => {
                const Icon = stat.icon;

                return (
                  <Reveal
                    key={stat.label}
                    delay={i * 90}
                    y={14}
                  >
                    <div className="group border-b border-[var(--line)] py-5 first:pt-0 last:border-b-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-[family-name:var(--font-lora)] text-3xl font-medium tabular-nums text-[var(--ink)] sm:text-4xl">
                            <CountUpNumber
                              value={stat.value}
                              decimals={
                                stat.decimals
                              }
                              suffix={
                                stat.suffix
                              }
                            />
                          </div>

                          <div className="mt-1 font-[family-name:var(--font-commissioner)] text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--ink-soft)]">
                            {stat.label}
                          </div>

                          {stat.caption && (
                            <div className="font-[family-name:var(--font-commissioner)] text-xs italic text-[var(--ink-faint)]">
                              {stat.caption}
                            </div>
                          )}
                        </div>

                        <Icon
                          className="mt-1 h-4 w-4 shrink-0 text-[var(--primary-deep)] transition-transform duration-300 group-hover:rotate-12"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </div>

                      <span className="mt-3 block h-[3px] w-6 bg-[var(--line)] transition-all duration-300 ease-out group-hover:w-12 group-hover:bg-[var(--primary)]" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>


          <div className="lg:col-span-8 lg:pl-10">
            <span className="font-[family-name:var(--font-commissioner)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)]">
              What you get
            </span>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2">
              {features.map((feature, i) => (
                <Reveal
                  key={feature.code}
                  delay={i * 70}
                  y={12}
                >
                  <div className="group flex items-center gap-3 border-b border-[var(--line)] py-4 pr-4">
                    <span className="font-[family-name:var(--font-commissioner)] text-[11px] tabular-nums text-[var(--ink-faint)]">
                      {feature.code}
                    </span>

                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-[var(--primary-deep)]/35 bg-transparent transition-colors duration-200 group-hover:border-[var(--primary-deep)] group-hover:bg-[var(--primary)]">
                      <Check
                        className="h-3 w-3 text-[var(--ink)]"
                        strokeWidth={2.75}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="font-[family-name:var(--font-commissioner)] text-[15px] font-medium text-[var(--ink)]">
                      {feature.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={160}
              y={20}
              className="mt-10"
            >
              <div className="group relative overflow-hidden rounded-3xl bg-[var(--ink)] px-8 py-9 sm:px-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, #FFDE59 1px, transparent 0)",
                    backgroundSize:
                      "16px 16px",
                  }}
                  aria-hidden="true"
                />

                <span
                  className="pointer-events-none absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  aria-hidden="true"
                />

                <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-[family-name:var(--font-lora)] text-xl italic text-white sm:text-2xl">
                      Let&apos;s talk about your space.
                    </p>

                    <p className="mt-1.5 font-[family-name:var(--font-commissioner)] text-sm text-white/55">
                      Free 30-minute design call, no
                      obligation.
                    </p>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a consultation on WhatsApp"
                    className="group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--primary)] px-7 py-3.5 font-[family-name:var(--font-commissioner)] text-sm font-semibold text-[var(--ink)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />

                    <span className="relative z-10">
                      Book a consultation
                    </span>

                    <ArrowUpRight
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
