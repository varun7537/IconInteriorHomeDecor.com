
"use client";

import Image from "next/image";
import { Lora, Commissioner } from "next/font/google";
import { MapPin, Wrench, Phone, ArrowRight } from "lucide-react";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const commissioner = Commissioner({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-commissioner",
  display: "swap",
});

const infoItems = [
  {
    label: "Based in Noida",
    icon: MapPin,
  },
  {
    label: "Custom interior solutions",
    icon: Wrench,
  },
  {
    label: "Reliable service",
    icon: Phone,
  },
];

const swatches = [
  {
    id: "curtains",
    src: "/images/blind-roller.jpg",
    alt: "Living room with layered curtains and warm lighting",
    label: "Curtains & Blinds",
    code: "TXT — 01",
    tilt: -4,
    size: "h-[300px] w-[210px] sm:h-[360px] sm:w-[250px]",
  },
  {
    id: "wallpaper",
    src: "/images/wallpaper-decoration-(2).jpeg",
    alt: "Textured wallpaper feature wall",
    label: "Wallpapers",
    code: "WLP — 02",
    tilt: 3,
    size: "h-[260px] w-[210px] sm:h-[310px] sm:w-[250px]",
  },
  {
    id: "flooring",
    src: "/images/pvc-flooring-(2).jpg",
    alt: "Close up of PVC plank flooring",
    label: "PVC Flooring",
    code: "FLR — 03",
    tilt: -2,
    size: "h-[320px] w-[210px] sm:h-[380px] sm:w-[250px]",
  },
  {
    id: "panels",
    src: "/images/pvc-ceiling-(2).jpeg",
    alt: "Textured wall panels in a modern living room",
    label: "Wall Panels",
    code: "PNL — 05",
    tilt: -3,
    size: "h-[300px] w-[210px] sm:h-[360px] sm:w-[250px]",
  },
  {
    id: "glass",
    src: "/images/glass-films-(2).jpeg",
    alt: "Frosted decorative glass film on a partition",
    label: "Glass Films",
    code: "GLS — 06",
    tilt: 2,
    size: "h-[260px] w-[210px] sm:h-[310px] sm:w-[250px]",
  },
];

const whatsappMessage =
  "Hello Icon Interior, I’d like to book a consultation. Please share the available slots.";

const whatsappUrl = `https://api.whatsapp.com/send/?phone=919773836697&text=${encodeURIComponent(
  whatsappMessage
)}&type=phone_number&app_absent=0`;

export default function About() {
  return (
    <section
      className={`${lora.variable} ${commissioner.variable} bg-white`}
    >
      <div className="mx-auto max-w-8xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="font-[family-name:var(--font-lora)] text-[2.75rem] font-medium leading-[1.08] tracking-tight text-[#1B1712] sm:text-6xl lg:text-[4rem]">
              Considered interiors,
              <br />
              crafted with{" "}
              <span className="relative inline-block">
                precision
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#FFDE59]"
                  viewBox="0 0 220 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C48 3 172 3 218 9"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-dashed border-[#1B1712]/30 py-1.5 pl-2 pr-4">
              <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-[#1B1712]/40" />

              <span className="font-[family-name:var(--font-commissioner)] text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#746B5E]">
                Noida Studio · Home &amp; Office
              </span>
            </div>

            <p className="mt-6 max-w-md font-[family-name:var(--font-commissioner)] text-sm font-medium uppercase tracking-[0.15em] text-[#746B5E]">
              Home decor that defines elegance
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-3">
            <p className="font-[family-name:var(--font-commissioner)] text-base italic leading-relaxed text-[#746B5E]">
              At Icon Interior, we bring style, comfort, and innovation to
              every space. Whether it&apos;s your home or office, our team is
              committed to crafting every detail with precision, quality, and
              passion — from concept to installation.
            </p>

            <dl className="grid grid-cols-1 divide-y divide-[#E8E1D1] border-y border-[#E8E1D1] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {infoItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 py-3 sm:px-4 sm:first:pl-0"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-[#1B1712]"
                    strokeWidth={1.75}
                  />

                  <dt className="sr-only">{label}</dt>

                  <dd className="font-[family-name:var(--font-commissioner)] text-sm italic text-[#1B1712]">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#FFDE59] px-6 py-3 font-[family-name:var(--font-commissioner)] text-sm font-medium text-[#1B1712] transition-colors hover:bg-[#E8C233] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1712]"
                aria-label="Book a consultation on WhatsApp"
              >
                Book a consultation

                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-[#1B1712] px-6 py-3 font-[family-name:var(--font-commissioner)] text-sm font-medium text-[#1B1712] transition-colors hover:bg-[#F7F1E4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1712]"
              >
                View our work
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        id="work"
        className="mx-auto max-w-8xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-lora)] text-2xl font-medium text-[#1B1712] sm:text-3xl">
              The swatch wall
            </h2>

            <p className="mt-1 font-[family-name:var(--font-commissioner)] text-sm italic text-[#746B5E]">
              A few of the materials we work with most.
            </p>
          </div>

          <span className="hidden font-[family-name:var(--font-commissioner)] text-xs italic text-[#746B5E] sm:inline">
            Scroll to browse →
          </span>
        </div>

        <ul className="no-scrollbar flex snap-x snap-mandatory gap-12 overflow-x-auto overflow-y-visible pb-8 pl-2 pr-10 sm:gap-16 lg:gap-20">
          {swatches.map((item, i) => (
            <li
              key={item.id}
              className="shrink-0 snap-start"
            >
              <div
                className={`swatch-card group relative isolate overflow-hidden rounded-[1.25rem] border border-[#E8E1D1] bg-[#F7F1E4] shadow-[0_16px_32px_-16px_rgba(27,23,18,0.25)] ${item.size}`}
                style={
                  {
                    "--tilt": `${item.tilt}deg`,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 250px, 300px"
                  className="object-cover"
                  priority={i === 0}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1712]/75 via-[#1B1712]/5 to-transparent" />

                <div className="hangtag absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <p className="font-[family-name:var(--font-lora)] text-sm font-medium text-[#1B1712]">
                    {item.label}
                  </p>

                  <p className="font-[family-name:var(--font-commissioner)] text-[0.65rem] italic tracking-wide text-[#746B5E]">
                    {item.code}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .swatch-card {
          opacity: 1;
          visibility: visible;
          transform: rotate(var(--tilt));
          transform-origin: center center;
          transition:
            transform 500ms cubic-bezier(0.16, 0.84, 0.44, 1),
            box-shadow 500ms cubic-bezier(0.16, 0.84, 0.44, 1);
          will-change: transform;
        }

        .swatch-card:hover {
          transform: rotate(0deg) translateY(-10px);
          box-shadow:
            0 24px 48px -20px rgba(27, 23, 18, 0.35);
        }

        .hangtag {
          transform: rotate(-1.5deg);
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .swatch-card {
            opacity: 1;
            visibility: visible;
            transform: none;
            transition: none;
          }

          .swatch-card:hover {
            transform: none;
            box-shadow:
              0 16px 32px -16px rgba(27, 23, 18, 0.25);
          }
        }
      `}</style>
    </section>
  );
}