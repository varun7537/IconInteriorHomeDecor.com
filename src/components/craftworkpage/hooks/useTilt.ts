"use client";

import { useRef, type PointerEvent } from "react";

interface UseTiltOptions {
  strength?: number;
}

export function useTilt<T extends HTMLElement>({ strength = 8 }: UseTiltOptions = {}) {
  const ref = useRef<T | null>(null);

  function handlePointerMove(e: PointerEvent<T>) {
    const node = ref.current;
    if (!node) return;
    if (e.pointerType === "touch") return;

    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * strength;
    const rotateX = (0.5 - py) * strength;

    node.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    node.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    node.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    node.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  }

  function handlePointerLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    node.style.setProperty("--mx", "50%");
    node.style.setProperty("--my", "50%");
  }

  return { ref, handlePointerMove, handlePointerLeave };
}