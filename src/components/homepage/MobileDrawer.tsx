"use client";

import { RefObject, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LinkItem {
  label: string;
  href: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItem[];
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  links,
  triggerRef,
}: MobileDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              onClose();
              triggerRef.current?.focus();
            }}
          />

          <motion.div
            initial={{
              opacity: 0,
              y: -80,
              scaleY: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
              y: -80,
              scaleY: 0,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top center",
            }}
            className="
              fixed
              left-1/2
              top-24
              z-50
              w-[88vw]
              max-w-[900px]
              -translate-x-1/2
              overflow-hidden
              rounded-[36px]
              border
              border-[#ffde59]/20
              bg-[#1b1b1b]/95
              shadow-[0_25px_80px_rgba(0,0,0,.45)]
              backdrop-blur-2xl
            "
          >
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#ffde59] to-transparent" />

            <div className="px-6 py-12 sm:px-10">
              <div className="mb-10 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.45em] text-[#ffde59]/70">
                  Navigation
                </p>
                <p className="text-xs uppercase tracking-[0.45em] text-white/30">
                  {String(links.length).padStart(2, "0")} destinations
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10">
                {links.map((link, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.07,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`group relative col-span-1 flex flex-col ${
                        isEven
                          ? "items-start text-left"
                          : "items-end self-end text-right"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -top-6 text-6xl font-black leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-[#ffde59]/10 sm:text-7xl ${
                          isEven ? "left-0" : "right-0"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="relative z-10 text-2xl font-semibold tracking-wide text-white transition-all duration-300 group-hover:text-[#ffde59] sm:text-3xl">
                        {link.label}
                      </span>

                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                          transformOrigin: isEven ? "left" : "right",
                        }}
                        className="relative z-10 mt-3 h-px w-full bg-[#ffde59]"
                      />

                      <motion.span
                        initial={{ opacity: 0, x: isEven ? -8 : 8 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="relative z-10 mt-2 text-sm text-[#ffde59]"
                      >
                        {isEven ? "→ enter" : "enter ←"}
                      </motion.span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}