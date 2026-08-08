"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Navbar from "../Navbar";
import RippleButton from "../homepage/ui/RippleButton";

const ACCENT = "#ffde59";

const FONT_HEADING = "'Lora', serif";
const FONT_SUBHEADING = "'Commissioner', sans-serif";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const beamX = useMotionValue(0);
  const beamY = useMotionValue(0);
  const beamSpringX = useSpring(beamX, { stiffness: 40, damping: 20 });
  const beamSpringY = useSpring(beamY, { stiffness: 40, damping: 20 });
  const beamTranslateX = useTransform(beamSpringX, [-1, 1], [-14, 14]);
  const beamTranslateY = useTransform(beamSpringY, [-1, 1], [-10, 10]);

  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  const ctaSpringX = useSpring(ctaX, { stiffness: 300, damping: 20 });
  const ctaSpringY = useSpring(ctaY, { stiffness: 300, damping: 20 });

  function handleHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    beamX.set(nx * 2);
    beamY.set(ny * 2);
  }

  function handleCtaMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    ctaX.set(relX * 0.3);
    ctaY.set(relY * 0.4);
  }

  function handleCtaMouseLeave() {
    ctaX.set(0);
    ctaY.set(0);
  }

  function handleExploreWork() { 
    const target = document.getElementById("work"); 
    if (!target) { 
      console.warn( 'Explore Our Work: Element with id="work" was not found.' );
      return; 
    } 
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start", }); 
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-900"
    >
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />

        <motion.div
          aria-hidden="true"
          className="absolute -inset-10"
          style={{
            x: prefersReducedMotion ? 0 : beamTranslateX,
            y: prefersReducedMotion ? 0 : beamTranslateY,
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,255,255,.16) 50%, transparent 70%)",
          }}
        />

        <div className="absolute inset-0 shadow-[inset_0_0_160px_40px_rgba(0,0,0,.6)]" />
      </div>

      <Navbar hamburgerRef={hamburgerRef} />

      <motion.div
        variants={prefersReducedMotion ? undefined : fade}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "show"}
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 z-10 border border-white/15 sm:inset-8 lg:inset-10"
      >
        {[
          "-top-px -left-px border-t border-l",
          "-top-px -right-px border-t border-r",
          "-bottom-px -left-px border-b border-l",
          "-bottom-px -right-px border-b border-r",
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute h-6 w-6 ${pos}`}
            style={{ borderColor: ACCENT }}
          />
        ))}
      </motion.div>

      <motion.div
        variants={prefersReducedMotion ? undefined : rise}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "show"}
        className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 sm:right-12 lg:right-14 md:block"
      >
        <span
          style={{ fontFamily: FONT_SUBHEADING }}
          className="block origin-center rotate-90 whitespace-nowrap text-xs font-medium uppercase tracking-[0.5em] text-white/60"
        >
          Noida — Interior Atelier
        </span>
      </motion.div>

      <motion.div
        variants={prefersReducedMotion ? undefined : container}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "show"}
        className="relative z-20 flex min-h-screen w-full flex-col justify-end px-4 pb-10 sm:px-8 sm:pb-14 lg:px-10"
      >
        <motion.h1
          variants={prefersReducedMotion ? undefined : rise}
          style={{ fontFamily: FONT_HEADING }}
          className="max-w-[22ch] text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.95] tracking-tight text-white"
        >
          Crafted for luxury.
          <span className="block text-white/50">Built for generations.</span>
        </motion.h1>

        <div className="mt-10 flex flex-col gap-8 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            variants={prefersReducedMotion ? undefined : rise}
            className="max-w-md border-l pl-5"
            style={{ borderColor: ACCENT }}
          >
            <p
              style={{ fontFamily: FONT_SUBHEADING }}
              className="text-[10px] uppercase tracking-[0.35em] text-white/50"
            >
              N°01 — On View
            </p>
            <p className="mt-2 text-base italic leading-relaxed text-white/80 sm:text-lg">
              Hand-finished furniture in walnut, brass and linen — discover
              pieces made to transform your home into a masterpiece.
            </p>
            <p
              style={{ fontFamily: FONT_SUBHEADING }}
              className="mt-3 text-[11px] italic uppercase tracking-[0.3em] text-white/40"
            >
              Walnut · Brass · Linen
            </p>
          </motion.div>

          <motion.div
            variants={prefersReducedMotion ? undefined : rise}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
          >
            <motion.div
              style={{ x: ctaSpringX, y: ctaSpringY }}
              className="inline-block"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            >
              <RippleButton
                type="button"
                onClick={ handleExploreWork }
                rippleClassName="bg-black/10"
                style={{ ["--tw-ring-color" as string]: ACCENT }}
                className="group relative flex w-fit items-center gap-5 rounded-full bg-white py-3 pl-8 pr-3 text-xl font-semibold text-neutral-900 shadow-lg outline-none transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,222,89,0.55),0_18px_44px_-10px_rgba(0,0,0,0.55)] focus-visible:ring-2"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ backgroundColor: ACCENT }}
                />

                {!prefersReducedMotion && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 [animation:spin_2.4s_linear_infinite]"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, ${ACCENT} 18%, transparent 34%)`,
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
                      mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
                    }}
                  />
                )}

                <span
                  style={{ fontFamily: FONT_SUBHEADING }}
                  className="relative block h-[1.3em] overflow-hidden"
                >
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                    Explore Our Work
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                    style={{ color: "#9a7b13" }}
                  >
                    Explore Our Work
                  </span>
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-900 text-white transition-colors duration-300 ease-out group-hover:bg-[#ffde59] group-hover:text-neutral-900">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </RippleButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span
          style={{ fontFamily: FONT_SUBHEADING }}
          className="text-[10px] uppercase tracking-[0.3em] text-white/70"
        >
          Scroll
        </span>

        <div className="relative h-9 w-px overflow-hidden bg-white/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 w-px"
            style={{ backgroundColor: ACCENT }}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: ["-100%", "200%"] }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
}
