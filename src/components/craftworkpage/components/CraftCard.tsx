"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";
import { useTilt } from "../hooks/useTilt";
import { ACCENTS, iconColorFor } from "../lib/constants";
import { drawLine, fadeUp, scaleIn, staggerContainer } from "../lib/motion";
import type { Craft } from "../lib/types";
import { CraftPill } from "./CraftPill";
import styles from "./FiveCrafts.module.css";

interface CraftCardProps {
  craft: Craft;
  reversed: boolean;
}

export function CraftCard({ craft, reversed }: CraftCardProps) {
  const Icon = craft.icon;
  const a = ACCENTS[craft.accent];

  const tilt = useTilt<HTMLDivElement>({ strength: 7 });
  const magnetic = useMagnetic<HTMLAnchorElement>(14);

  return (
    <motion.article
      className={[styles.craftRow, reversed ? styles.craftRowReversed : ""]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${craft.id}-title`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer}
    >
      <motion.div
        ref={tilt.ref}
        className={styles.craftMedia}
        variants={fadeUp}
        onPointerMove={tilt.handlePointerMove}
        onPointerLeave={tilt.handlePointerLeave}
      >
        <div className={styles.craftMediaFrame}>
          <Image
            src={craft.image}
            alt={craft.alt}
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            className={styles.craftMediaImg}
          />
          <span className={styles.craftSpotlight} />
          <div
            className={styles.craftMediaIndex}
            style={{ background: a.fill, color: a.text }}
            aria-hidden="true"
          >
            {craft.index}
          </div>
        </div>
      </motion.div>

      <div className={styles.craftContent}>
        <motion.div
          className={styles.craftIcon}
          style={{ background: `${a.fill}1A`, color: iconColorFor(craft.accent) }}
          variants={scaleIn}
          aria-hidden="true"
        >
          <Icon size={22} strokeWidth={1.75} />
        </motion.div>

        <motion.p className={styles.craftEyebrow} variants={fadeUp}>
          Craft No. {craft.index}
          <motion.span
            className={styles.craftEyebrowLine}
            style={{ background: a.fill }}
            variants={drawLine}
          />
        </motion.p>

        <motion.h3 id={`${craft.id}-title`} className={styles.craftTitle} variants={fadeUp}>
          {craft.title}
        </motion.h3>

        <motion.p className={styles.craftCopy} variants={fadeUp}>
          {craft.copy}
        </motion.p>

        <motion.ul
          className={styles.craftTags}
          role="list"
          variants={staggerContainer}
        >
          {craft.tags.map((tag) => (
            <li key={tag}>
              <CraftPill label={tag} accent={craft.accent} />
            </li>
          ))}
        </motion.ul>

        <motion.a
          ref={magnetic.ref}
          href={`#${craft.id}`}
          className={styles.craftCta}
          variants={fadeUp}
          onPointerMove={magnetic.handlePointerMove}
          onPointerLeave={magnetic.handlePointerLeave}
          whileTap={{ scale: 0.95 }}
        >
          <span>Learn more</span>
          <ArrowUpRight size={17} strokeWidth={2} className={styles.craftCtaIcon} />
        </motion.a>
      </div>
    </motion.article>
  );
}