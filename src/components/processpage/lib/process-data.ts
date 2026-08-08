// lib/process-data.ts
export type ProcessIcon = "chat" | "measure" | "palette" | "thread" | "sparkle";

interface ToneStyle {
  fill: string;
  numeral: string;
  ink: string;
  label: string;
}

export const toneStyles = {
  clay: {
    fill: "#6EC6FF",
    numeral: "#A8DADC",
    ink: "#1F2937",
    label: "#374151",
  },

  sage: {
    fill: "#FFDE59",
    numeral: "#F7E7A9",
    ink: "#1F2937",
    label: "#374151",
  },

  dustyblue: {
    fill: "#9CAF88",
    numeral: "#A7F3D0",
    ink: "#1F2937",
    label: "#374151",
  },

  umber: {
    fill: "#DC2626",
    numeral: "#FB7185",
    ink: "#FFFFFF",
    label: "#F3F4F6",
  },

  blush: {
    fill: "#F59E0B",
    numeral: "#FF7F50",
    ink: "#1F2937",
    label: "#374151",
  },
} satisfies Record<string, ToneStyle>;

export type ToneName = keyof typeof toneStyles;

export interface ProcessStepData {
  id: string;
  numeral: string;
  title: string;
  description: string;
  icon: ProcessIcon;
  tone: ToneName;
  side: "above" | "below";
}

export const processSteps: ProcessStepData[] = [
  {
    id: "consult",
    numeral: "01",
    title: "Consultation",
    description: "We walk your space and listen for how you actually live in it.",
    icon: "chat",
    tone: "clay",
    side: "below",
  },
  {
    id: "measure",
    numeral: "02",
    title: "Space & scale",
    description: "Precise measurements and a floor plan tuned to your rooms.",
    icon: "measure",
    tone: "sage",
    side: "above",
  },
  {
    id: "palette",
    numeral: "03",
    title: "Palette & concept",
    description: "Colour, material, and mood boards built around your light.",
    icon: "palette",
    tone: "dustyblue",
    side: "below",
  },
  {
    id: "sourcing",
    numeral: "04",
    title: "Sourcing & thread",
    description: "We weave together furniture, textiles, and finishes to order.",
    icon: "thread",
    tone: "umber",
    side: "above",
  },
  {
    id: "walkthrough",
    numeral: "05",
    title: "Styling & walkthrough",
    description: "Final styling, then a room-by-room walkthrough together.",
    icon: "sparkle",
    tone: "blush",
    side: "below",
  },
];

/** Reference canvas the thread path and node positions are authored in. */
export const nodeCanvas = { width: 1000, height: 460 };

/** Centre point of each circle, in nodeCanvas units — read as percentages by ProcessNode. */
export const nodePoints: { x: number; y: number }[] = [
  { x: 60, y: 300 },
  { x: 280, y: 130 },
  { x: 500, y: 300 },
  { x: 720, y: 130 },
  { x: 940, y: 300 },
];

/** A single smooth curve threading through every point above. */
export const threadPath =
  "M60,300 C160,300 180,130 280,130 " +
  "C380,130 400,300 500,300 " +
  "C600,300 620,130 720,130 " +
  "C820,130 840,300 940,300";