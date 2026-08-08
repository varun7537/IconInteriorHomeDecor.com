"use client";

import Image from "next/image";
import { useState, RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";

import logo from "@/public/images/home-decor.png";
import RippleButton from "./homepage/ui/RippleButton";
import MobileDrawer from "./homepage/MobileDrawer";
import { NAV_LINKS } from "../components/navigations/Navigation";

const ACCENT = "#ffde59";

interface NavbarProps {
  hamburgerRef: RefObject<HTMLButtonElement | null>;
}

export default function Navbar({
  hamburgerRef,
}: NavbarProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={
          prefersReducedMotion
            ? undefined
            : {
                opacity: 0,
                y: -40,
              }
        }
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 sm:px-8"
      >
        <div
          className="
            flex w-full max-w-7xl items-center justify-between
            rounded-full
            border border-white/10
            bg-[#111111]/45
            supports-[backdrop-filter]:bg-[#111111]/35
            backdrop-blur-xl
            shadow-xl
            px-6 py-3
          "
        >
          <motion.a
            href="#"
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -2,
                    scale: 1.05,
                  }
            }
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
            className="group flex items-center gap-4 outline-none"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-[#ffde59]/15 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <Image
                src={logo}
                alt="Company logo"
                width={82}
                height={82}
                priority
                className="relative h-14 w-14 rounded-full object-contain sm:h-16 sm:w-16"
              />
            </div>
          </motion.a>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-3 lg:flex">
              <span className="h-px w-10 bg-[#ffde59]/50" />

              <span className="text-[11px] uppercase tracking-[0.35em] text-white/55">
                MENU
              </span>
            </div>

            <RippleButton
              ref={hamburgerRef}
              aria-label="Open menu"
              aria-expanded={isDrawerOpen}
              aria-controls="navigation-drawer"
              rippleClassName="bg-[#ffde59]/20"
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#222222]/80 ring-1 ring-[#ffde59]/25 transition-all duration-500 hover:bg-[#2B2B2B]/90 hover:ring-[#ffde59] hover:shadow-[0_0_25px_rgba(255,222,89,.35)]"
            >
              <motion.div
                animate={isDrawerOpen ? "open" : "closed"}
                className="flex flex-col gap-[6px]"
              >
                <motion.span
                  variants={{
                    closed: {
                      rotate: 0,
                      y: 0,
                    },
                    open: {
                      rotate: 45,
                      y: 8,
                    },
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="block h-[2px] w-7 rounded-full bg-white"
                />

                <motion.span
                  variants={{
                    closed: {
                      opacity: 1,
                    },
                    open: {
                      opacity: 0,
                    },
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="block h-[2px] w-7 rounded-full bg-white"
                />

                <motion.span
                  variants={{
                    closed: {
                      rotate: 0,
                      y: 0,
                    },
                    open: {
                      rotate: -45,
                      y: -8,
                    },
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="block h-[2px] w-7 rounded-full bg-white"
                />
              </motion.div>
            </RippleButton>
          </div>

          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.5,
            }}
            className="absolute -bottom-2 left-1/2 h-px w-40 -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-[#ffde59] to-transparent"
          />
        </div>
      </motion.header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        links={NAV_LINKS}
        triggerRef={hamburgerRef}
      />
    </>
  );
}