import type { AccentKey, AccentTokens } from "./types";

export const COLORS = {
  primary: "#FFDE59",
  charcoal: "#1F2937",
  slate: "#475569",
  lightGray: "#F8FAFC",
  beige: "#FFF8E7",
  olive: "#A3B18A",
  terracotta: "#D97757",
  softBlue: "#DCEAF7",
} as const;

export const ACCENTS: Record<AccentKey, AccentTokens> = {
  primary: { fill: "#FFDE59", text: "#1F2937", ring: "#FFDE59" },
  terracotta: { fill: "#D97757", text: "#FFFFFF", ring: "#D97757" },
  olive: { fill: "#A3B18A", text: "#FFFFFF", ring: "#A3B18A" },
  softblue: { fill: "#DCEAF7", text: "#1F2937", ring: "#8FB8DA" },
};

/** Icon foreground color, tuned per accent for AA contrast on its tint chip. */
export function iconColorFor(accent: AccentKey): string {
  return accent === "primary" ? "#B8860B" : ACCENTS[accent].fill;
}
