"use client";

import { useRef } from "react";
import { Clock, MapPin, Phone, ArrowUpRight, ArrowUp } from "lucide-react";
import Logo from "../../public/images/home-decor.png";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";

type LinkItem = {
  label: string;
  href: string;
};

const quickLinks: LinkItem[] = [
  { label: "About", href: "#About" },
  { label: "Services", href: "#FiveCrafts" },
  { label: "Work", href: "#Process" },
  { label: "Gallery", href: "#Gallery" },
];

const serviceLinks: LinkItem[] = [
  { label: "Curtains & Blinds", href: "/services/curtains-blinds" },
  { label: "Wallpaper", href: "/services/wallpaper" },
  { label: "PVC Flooring", href: "/services/pvc-flooring" },
  { label: "Wall Panels", href: "/services/wall-panels" },
  { label: "Glass Films", href: "/services/glass-films" },
];

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.15" cy="6.85" r="1.1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
      <path
        d="M12.04 3.5c-4.7 0-8.5 3.8-8.5 8.5 0 1.5.4 2.94 1.15 4.2L3.5 20.5l4.42-1.16a8.46 8.46 0 0 0 4.12 1.06h.01c4.69 0 8.5-3.8 8.5-8.5s-3.8-8.4-8.51-8.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 8.3c.17-.38.35-.39.51-.39.13 0 .28 0 .4.01.13.01.31-.05.48.37.18.44.6 1.53.65 1.64.05.11.09.24.01.39-.07.15-.11.24-.22.37-.11.13-.23.29-.33.39-.11.11-.22.22-.1.44.13.22.56.94 1.21 1.52.83.75 1.53 1 1.75 1.11.22.11.35.09.48-.05.13-.15.55-.65.7-.87.15-.22.29-.18.49-.11.2.07 1.28.61 1.5.72.22.11.37.16.42.26.06.09.06.55-.13 1.08-.19.53-1.11 1.02-1.53 1.09-.4.07-.87.1-1.98-.31a11.4 11.4 0 0 1-4.06-2.87 11.14 11.14 0 0 1-2.06-3.57c-.22-.6-.03-1.02.2-1.34"
        fill="currentColor"
      />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
      <path
        d="M21.35 12.18c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.9-4.19 2.9-7.21Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.5c2.62 0 4.82-.87 6.43-2.35l-3.14-2.44c-.87.59-1.98.93-3.29.93-2.53 0-4.68-1.71-5.44-4.01H3.32v2.52A9.5 9.5 0 0 0 12 21.5Z"
        fill="#34A853"
      />
      <path
        d="M6.56 13.63a5.7 5.7 0 0 1 0-3.63V7.48H3.32a9.5 9.5 0 0 0 0 8.67l3.24-2.52Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.36c1.42 0 2.7.49 3.71 1.45l2.78-2.78C16.81 3.34 14.62 2.5 12 2.5a9.5 9.5 0 0 0-8.68 4.98l3.24 2.52C7.32 8.07 9.47 6.36 12 6.36Z"
        fill="#EA4335"
      />
    </svg>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -10]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.06, 0.1]);

  const backToTopProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-surface text-ink">
      <div className="pointer-events-none absolute inset-0 bg-brass-glow" aria-hidden="true" />

      <motion.p
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[14vw] font-bold leading-none tracking-tight text-ink sm:text-[12vw]"
        aria-hidden="true"
      >
        ICON INTERIOR
      </motion.p>


      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 border-b border-line py-14 lg:flex-row lg:items-end lg:justify-between lg:py-20"
        >
          <div className="max-w-2xl">
            <span className="font-body text-[13px] font-medium uppercase tracking-[0.25em] text-brass">
              Have a space in mind?
            </span>
            <h2 className="mt-4 font-display text-[13vw] font-bold leading-[0.95] tracking-tight text-ink sm:text-[7vw] lg:text-[4.2vw]">
              Let&rsquo;s design
              <br />
              your <em className="italic text-brass">next</em> room.
            </h2>
          </div>

          <motion.a
            href="tel:+919773836697"
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brass/40 sm:h-40 sm:w-40"
          >
            <motion.span
              variants={{
                rest: { scale: 0, opacity: 0 },
                hover: { scale: 1, opacity: 1 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-full bg-brass"
            />
            <motion.span
              variants={{
                rest: { rotate: 0 },
                hover: { rotate: 45 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center gap-1.5 font-body text-[13px] font-medium text-ink group-hover:text-surface"
            >
              <ArrowUpRight className="h-6 w-6" strokeWidth={1.6} />
              Call Us
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-x-10 gap-y-14 py-16 lg:grid-cols-12 lg:py-20"
        >
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <a href="/" className="inline-block transition-transform duration-300 hover:scale-105">
              <Image
                src={Logo}
                alt="ICON Interior Home Decor"
                width={180}
                height={60}
                priority
                className="h-14 w-auto object-contain"
              />
            </a>

            <p className="mt-6 max-w-sm font-body text-[14.5px] leading-relaxed text-ink-muted">
              Premium curtains, wallpapers, PVC flooring, wall panels and glass
              films for{" "}
              <em className="font-display italic text-ink not-italic sm:italic">
                homes and offices
              </em>{" "}
              across Noida &amp; NCR.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[
                { icon: <InstagramMark />, href: "https://www.instagram.com/i_con_interier_home_decor_/", label: "Instagram" },
                { icon: <WhatsAppMark />, href: "https://wa.me/+919773836697", label: "WhatsApp" },
                { icon: <GoogleMark />, href: "https://g.page/icon-interior-home-decor", label: "Google" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow Icon Interior on ${s.label}`}
                  whileHover={{ y: -4, backgroundColor: "#ffde59", borderColor: "#ffde59" }}
                  transition={{ duration: 0.25 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.nav variants={fadeUp} aria-label="Quick links" className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-6 flex flex-col gap-4">
              {quickLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </motion.nav>

          <motion.nav variants={fadeUp} aria-label="Services" className="lg:col-span-2">
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-6 flex flex-col gap-4">
              {serviceLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={fadeUp} className="lg:col-span-3">
            <FooterHeading>Visit / Reach Us</FooterHeading>
            <ul className="mt-6 flex flex-col gap-4 font-body text-[14.5px] text-ink-muted">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.6} />
                <span>
                  Mon&nbsp;&ndash;&nbsp;Sat: 10.00&nbsp;&ndash;&nbsp;19.00
                  <br />
                  Sunday: By Appointment
                </span>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Sector+102,+Noida"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 transition-colors duration-300 hover:text-ink"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.6} />
                  Sector 102, Noida
                </a>
              </li>
              <li>
                <a
                  href="tel:+919773836697"
                  className="group flex items-center gap-3 font-medium text-ink transition-colors duration-300 hover:text-brass"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.6} />
                  +91 97738 36697
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="h-px w-full origin-left scale-x-100 bg-thread-line opacity-70" />

        <div className="flex flex-col-reverse items-center gap-4 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-body text-[12.5px] text-ink-muted/80">
            &copy; 2026 Icon Interior Home Decor. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <p className="font-body text-[12.5px] text-ink-muted/80">
              Sector 102, Noida, Uttar Pradesh
            </p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Back to top"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-300 hover:border-brass hover:text-brass"
            >
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
                <motion.circle
                  cx="20"
                  cy="20"
                  r="17.5"
                  fill="none"
                  stroke="#ffde59"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ pathLength: backToTopProgress }}
                />
              </svg>
              <ArrowUp className="h-4 w-4" strokeWidth={1.8} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="relative inline-block font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink">
      {children}
      <span className="absolute -bottom-2 left-0 h-px w-6 bg-brass" />
    </p>
  );
}

function FooterLink({ label, href }: LinkItem) {
  return (
    <li>
      <a
        href={href}
        className="group inline-flex items-center gap-1.5 font-body text-[14.5px] text-ink-muted transition-colors duration-300 hover:text-ink"
      >
        <span className="relative">
          {label}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brass transition-all duration-300 ease-out group-hover:w-full" />
        </span>
        <ArrowUpRight className="h-3 w-3 -translate-x-1 text-brass opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </a>
    </li>
  );
}
