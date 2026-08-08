"use client";

import { motion } from "framer-motion";
import { ACCENTS } from "../lib/constants";
import { popIn } from "../lib/motion";
import type { AccentKey } from "../lib/types";
import styles from "./FiveCrafts.module.css";

interface CraftPillProps {
  label: string;
  accent: AccentKey;
}

export function CraftPill({ label, accent }: CraftPillProps) {
  const a = ACCENTS[accent];

  return (
    <motion.span
      className={styles.craftPill}
      style={
        {
          "--pill-fill": a.fill,
          "--pill-text": a.text,
        } as React.CSSProperties
      }
      variants={popIn}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 18 } }}
      whileTap={{ scale: 0.96 }}
    >
      {label}
    </motion.span>
  );
}