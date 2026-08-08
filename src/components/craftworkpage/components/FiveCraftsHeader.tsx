"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";
import { fadeUp, scaleIn, staggerContainer } from "../lib/motion";
import type { Stat } from "../lib/types";
import styles from "./FiveCrafts.module.css";

const STATS: Stat[] = [
  { target: 5, label: "Core crafts" },
  { target: 12, suffix: "+", label: "Homes finished" },
  { target: 1, suffix: " yr", label: "Avg. warranty" },
];

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp(stat.target);

  return (
    <motion.div
      className={styles.fcStat}
      custom={index}
      variants={fadeUp}
    >
      <span className={styles.fcStatNum}>
        {stat.prefix}
        <span ref={ref}>{value}</span>
        {stat.suffix}
      </span>
      <span className={styles.fcStatLabel}>{stat.label}</span>
    </motion.div>
  );
}

export function FiveCraftsHeader() {
  return (
    <motion.header
      className={styles.fcHeader}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      <motion.span className={styles.fcEyebrow} variants={scaleIn}>
        <Leaf size={14} strokeWidth={2} />
        Our craftsmanship
      </motion.span>

      <motion.h1 className={styles.fcTitle} custom={1} variants={fadeUp}>
        Five Crafts, <em>One Studio</em>
      </motion.h1>

      <motion.p className={styles.fcSubtitle} custom={2} variants={fadeUp}>
        Every finish in your home, designed, measured and installed by one
        team — so the details actually talk to each other.
      </motion.p>

      <motion.div className={styles.fcStats} custom={3} variants={fadeUp}>
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </motion.div>
    </motion.header>
  );
}