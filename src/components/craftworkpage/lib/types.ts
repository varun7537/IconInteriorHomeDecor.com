import type { LucideIcon } from "lucide-react";

export type AccentKey = "primary" | "terracotta" | "olive" | "softblue";

export interface AccentTokens {
  fill: string;
  text: string;
  ring: string;
}

export type CraftIcon = LucideIcon;

export interface Craft {
  index: string;
  id: string;
  icon: CraftIcon;
  title: string;
  copy: string;
  tags: string[];
  accent: AccentKey;
  image: string;
  alt: string;
}

export interface Stat {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}