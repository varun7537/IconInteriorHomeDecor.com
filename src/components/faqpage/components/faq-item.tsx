"use client";

import { Plus } from "lucide-react";
import type { FaqEntry } from "../lib/faq-data";
import { SWATCHES, ROTATIONS } from "../lib/faq-data";

type FaqItemProps = {
  entry: FaqEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
  registerRef: (id: string, el: HTMLDivElement | null) => void;
};

export function FaqItem({
  entry,
  index,
  isOpen,
  onToggle,
  visible,
  registerRef,
}: FaqItemProps) {
  const panelId = `faq-panel-${entry.id}`;
  const buttonId = `faq-trigger-${entry.id}`;
  const swatch = SWATCHES[index % SWATCHES.length];
  const rot = ROTATIONS[index % ROTATIONS.length];

  return (
    <div
      ref={(el) => registerRef(entry.id, el)}
      data-id={entry.id}
      className={`swatch-card${visible ? " is-visible" : ""}${
        isOpen ? " is-open" : ""
      }`}
      style={{ "--rot": `${rot}deg` } as React.CSSProperties}
    >
      <span className="swatch-tab" style={{ background: swatch }}>
        {entry.code}
      </span>

      <h3 className="swatch-heading">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="swatch-trigger"
        >
          <span className="swatch-q">{entry.question}</span>
          <span className="swatch-icon" aria-hidden="true">
            <Plus strokeWidth={2} size={16} />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="swatch-panel"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="swatch-panel-inner">
          <p className="swatch-answer">{entry.answer}</p>
        </div>
      </div>
    </div>
  );
}