"use client"; 

import { CRAFTS } from "../data/crafts";
import { CraftCard } from "./CraftCard";
import { FiveCraftsHeader } from "./FiveCraftsHeader";
import styles from "./FiveCrafts.module.css";

export default function FiveCrafts() {
  return (
    <section className={styles.fivecrafts} aria-label="Our five crafts">
      <FiveCraftsHeader />

      <div className={styles.craftList}>
        {CRAFTS.map((craft, i) => (
          <CraftCard key={craft.id} craft={craft} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
