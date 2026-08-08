"use client";

import { useState } from "react";
import { CornerBracket } from "./ui/Cornerbracket";
import { GoogleIcon, MailIcon, PhoneIcon, PinIcon, StarIcon } from "./ui/Icons";
import { FloatingInput } from "./components/Floatinginput";
import { FloatingSelect } from "./components/Floatingselect";
import { FloatingTextarea } from "./components/Floatingtextarea";

const materials = [
  { name: "Walnut", swatch: "bg-walnut-700" },
  { name: "Brass", swatch: "bg-brass-500" },
  { name: "Sage", swatch: "bg-sage-400" },
  { name: "Linen", swatch: "bg-[#F8F6F2]" },
];

const infoRows = [
  {
    icon: PinIcon,
    label: "Address",
    value: "Pillar No. 86, Salarpur, Near Shiv Mandir, Sector 102, Noida, Uttar Pradesh",
    href: "https://maps.google.com/?q=Pillar+No.+86+Salarpur+Sector+102+Noida",
  },
  {
    icon: PhoneIcon,
    label: "Phone / WhatsApp",
    value: "+91 97738 36697",
    href: "tel:+919773836697",
  },
  {
    icon: MailIcon,
    label: "Email",
    value: "hello@iconinteriorhomedecor.in",
    href: "mailto:hello@iconinteriorhomedecor.in",
  },
];

const projectTypes = [
  "Full Home Interior",
  "Kitchen & Wardrobe",
  "Single Room Makeover",
  "Commercial / Office",
  "Consultation Only",
];

export default function ContactInfoPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <div className="relative overflow-hidden bg-[#1F1F1F] px-8 py-12 text-[#F8F6F2] sm:px-10 md:px-12 lg:px-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C6A667]/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#4A5523]/10 blur-[100px]"
      />
      <div aria-hidden="true" className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">

        <div className="animate-fade-up">
          <div className="flex items-center gap-3 text-brass-300">
            <span className="h-px w-8 bg-brass-400" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.32em]">
              Get in Touch
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[2.6rem] font-medium leading-[1.12] text-linen sm:text-5xl">
            Let&rsquo;s design your{" "}
            <span className="italic text-brass-300">space</span>
          </h2>

          <p className="mt-5 max-w-sm font-sans text-[15px] leading-relaxed text-linen/65">
            From first sketch to final styling — tell us a little about your
            home and we&rsquo;ll walk the site with you, free of charge.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {materials.map((m) => (
                <span
                  key={m.name}
                  title={m.name}
                  className={`h-6 w-6 rounded-full ring-2 ring-walnut-900 ${m.swatch}`}
                />
              ))}
            </div>
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-linen/45">
              The palette we build with
            </span>
          </div>

          <div className="mt-10 h-px w-full bg-linen/10" />

          <ul className="mt-10 space-y-7">
            {infoRows.map((row) => (
              <li key={row.label}>
                <a
                  href={row.href}
                  className="group flex items-start gap-4 transition-transform duration-300 ease-out hover:translate-x-1"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-linen/15 bg-linen/5 text-brass-300 transition-colors duration-300 group-hover:border-brass-400/60 group-hover:bg-brass-500/10">
                    <row.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-300/90">
                      {row.label}
                    </span>
                    <span className="mt-1 block max-w-xs font-sans text-[15px] leading-relaxed text-linen/85">
                      {row.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://www.google.com/search?q=icon+interior+home+decor+reviews"
            className="group mt-10 flex items-center gap-4 rounded-2xl border border-linen/10 bg-linen/5 p-4 transition-colors duration-300 hover:border-brass-400/50 hover:bg-linen/[0.08]"
          >
            <GoogleIcon className="h-8 w-8 shrink-0" />
            <div className="flex flex-1 items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-lg font-semibold text-linen">5.0</span>
                  <span className="flex gap-0.5 text-brass-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                </div>
                <p className="font-sans text-xs text-linen/55">Google Rating · 120+ reviews</p>
              </div>
              <span className="font-sans text-xs text-linen/40 transition-colors group-hover:text-brass-300">
                View →
              </span>
            </div>
          </a>

          <div className="relative mt-8 rounded-2xl border border-brass-500/25 p-1">
            <CornerBracket position="tl" className="text-brass-400/70 -left-1 -top-1" />
            <CornerBracket position="tr" className="text-brass-400/70 -right-1 -top-1" />
            <CornerBracket position="bl" className="text-brass-400/70 -bottom-1 -left-1" />
            <CornerBracket position="br" className="text-brass-400/70 -bottom-1 -right-1" />

            <a
              href="https://maps.google.com/?q=Pillar+No.+86+Salarpur+Sector+102+Noida"
              className="group flex h-36 flex-col items-center justify-center gap-2 rounded-xl bg-walnut-700/60 text-center transition-colors duration-300 hover:bg-walnut-700"
            >
              <PinIcon className="h-6 w-6 text-brass-300" />
              <span className="font-sans text-sm text-linen/80">Visit the studio</span>
              <span className="flex items-center gap-1 font-sans text-xs text-brass-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Open in Google Maps →
              </span>
            </a>
          </div>
        </div>

        <div className="animate-fade-up lg:pt-2">
          <div className="relative rounded-2xl border border-linen/10 bg-linen/[0.03] p-7 sm:p-9">
            <CornerBracket position="tl" className="text-brass-400/60 -left-px -top-px" />
            <CornerBracket position="tr" className="text-brass-400/60 -right-px -top-px" />
            <CornerBracket position="bl" className="text-brass-400/60 -bottom-px -left-px" />
            <CornerBracket position="br" className="text-brass-400/60 -bottom-px -right-px" />

            <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-brass-300">
              Start a Project
            </span>
            <h3 className="mt-3 font-serif text-2xl font-medium text-linen">
              Tell us about your home
            </h3>

            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
              <FloatingInput
                label="Full Name"
                name="name"
                type="text"
                value={name}
                onChange={setName}
                required
                autoComplete="name"
              />

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                  autoComplete="email"
                />
                <FloatingInput
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  required
                  autoComplete="tel"
                />
              </div>

              <FloatingSelect
                label="Project Type"
                name="projectType"
                value={projectType}
                onChange={setProjectType}
                options={projectTypes}
                required
              />

              <FloatingTextarea
                label="Tell us about your space"
                name="message"
                value={message}
                onChange={setMessage}
                rows={4}
              />

              <button
                type="submit"
                disabled={submitting}
                className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm border border-[#ffffff]/90 px-8 py-4 font-sans
                  text-xs font-semibold uppercase tracking-[0.24em] text-[#ffffff] transition-all duration-300 ease-out hover:-translate-y-1
                  hover:border-[#FFDE59] hover:bg-[#FFE680] hover:shadow-[0_15px_40px_rgba(255,222,89,0.35)] active:translate-y-0
                  active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/40
                    to-transparent

                    transition-transform
                    duration-700

                    group-hover:translate-x-full
                  "
                />

                <span className="relative z-10">
                  {submitting ? "Sending…" : "Send Enquiry"}
                </span>

                {!submitting && (
                  <span
                    className="
                      relative
                      z-10
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}