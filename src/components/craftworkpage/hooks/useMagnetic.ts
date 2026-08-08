"use client";

import { useRef, type PointerEvent } from "react";

export function useMagnetic<T extends HTMLElement>(strength = 16) {
  const ref = useRef<T | null>(null);

  function handlePointerMove(e: PointerEvent<T>) {
    const node = ref.current;
    if (!node || e.pointerType === "touch") return;

    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    node.style.transform = `translate(${(x / rect.width) * strength}px, ${
      (y / rect.height) * strength
    }px)`;
  }

  function handlePointerLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0px, 0px)";
  }

  return { ref, handlePointerMove, handlePointerLeave };
}