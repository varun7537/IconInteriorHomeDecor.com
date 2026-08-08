"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { faqEntries } from "./lib/faq-data";
import { FaqItem } from "./components/faq-item";
import "./styles/faq.css";

const whatsappMessage = "Hi Icon Interior, I would like to book a consultation. Please share the available details."; 
const whatsappUrl = `https://api.whatsapp.com/send/?phone=919773836697&text=${encodeURIComponent( whatsappMessage )}&type=phone_number&app_absent=0`;

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqEntries[0].id);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [reduceMotion, setReduceMotion] = useState(false);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const ghostRef = useRef<HTMLDivElement | null>(null);

  const registerRef = (id: string, el: HTMLDivElement | null) => {
    cardRefs.current[id] = el;
  };

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleIds(new Set(faqEntries.map((e) => e.id)));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id;
            if (id) {
              setVisibleIds((prev) => {
                if (prev.has(id)) return prev;
                const next = new Set(prev);
                next.add(id);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    Object.values(cardRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ghostRef.current) {
          const rect = ghostRef.current.parentElement?.getBoundingClientRect();
          const offset = rect ? rect.top * -0.06 : 0;
          ghostRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <section aria-labelledby="faq-heading" className="faq-section">
      <div className="faq-wrap">
        <div className="faq-ghost-track" aria-hidden="true">
          <div className="faq-ghost" ref={ghostRef}>
            FAQ &nbsp; FAQ &nbsp; FAQ
          </div>
        </div>

        <div className="faq-head">
          <span className="faq-eyebrow">
            <span className="faq-eyebrow-dash" aria-hidden="true" />
            Questions, answered
          </span>

          <h2 id="faq-heading" className="faq-title">
            Every question we hear <em>before the first sketch</em>
          </h2>

          <p className="faq-lede">
            Everything homeowners typically ask before their first design
            consultation. Can&apos;t find what you&apos;re looking for? Our
            studio is always happy to talk it through.
          </p>

          <div className="faq-meta-row">
            <div>
              <div className="faq-stat-label">Projects completed</div>
              <div className="faq-stat-value">150+</div>
            </div>
            <div>
              <div className="faq-stat-label">Client satisfaction</div>
              <div className="faq-stat-value accent">99%</div>
            </div>
            <a href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="faq-cta" 
                aria-label="Book a consultation on WhatsApp" > 
              <span> Book a consultation </span> 
              <ArrowUpRight 
                size={16} 
                strokeWidth={2} 
                aria-hidden="true" /> 
            </a>
          </div>
        </div>

        <div className="faq-board">
          {faqEntries.map((entry, index) => (
            <FaqItem
              key={entry.id}
              entry={entry}
              index={index}
              isOpen={openId === entry.id}
              onToggle={() => toggle(entry.id)}
              visible={visibleIds.has(entry.id)}
              registerRef={registerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}