import {
  Blinds,
  PaintBucket,
  Grid3x3,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";
import type { Craft } from "../lib/types";

export const CRAFTS: Craft[] = [
  {
    index: "01",
    id: "curtains-blinds",
    icon: Blinds,
    title: "Curtains & Blinds",
    copy: "Fabric that frames a room — tailored drapes and precision blinds, motorised for the way you actually live.",
    tags: ["Luxury Curtains", "Roller Blinds", "Roman Blinds", "Motorised Blinds"],
    accent: "primary",
    image:
      "/images/curtains-(3).jpg",
    alt: "Soft linen curtains framing a sunlit living room window",
  },
  {
    index: "02",
    id: "wallpaper",
    icon: PaintBucket,
    title: "Wallpaper Decoration",
    copy: "From subtle texture to statement walls — patterns matched to light, room size and the mood you're after.",
    tags: ["3D Wallpaper", "Vinyl Wallpaper", "Custom Wallpaper", "Kids Room Wallpaper"],
    accent: "terracotta",
    image:
      "/images/wallpaper-decoration-(1).jpeg",
    alt: "Botanical print wallpaper accent wall in a warm reading nook",
  },
  {
    index: "03",
    id: "pvc-flooring",
    icon: Grid3x3,
    title: "PVC Flooring",
    copy: "Wood and marble finishes without the upkeep — waterproof, anti-slip, and laid to feel seamless underfoot.",
    tags: ["Wood Texture", "Marble Texture", "Anti-Slip Flooring", "Waterproof Flooring"],
    accent: "olive",
    image:
      "/images/pvc-flooring-(1).jpeg",
    alt: "Warm wood-textured PVC flooring in a minimal living space",
  },
  {
    index: "04",
    id: "wall-ceiling-panels",
    icon: PanelsTopLeft,
    title: "PVC Wall & Ceiling Panels",
    copy: "Fluted and moulded panelling that adds architectural depth to a wall or ceiling in a single weekend.",
    tags: ["Modern Wall Panels", "Waterproof Ceiling Panels", "Decorative PVC Panels"],
    accent: "softblue",
    image:
      "/images/pvc-ceiling-(1).jpeg",
    alt: "Fluted panel wall detail with warm ambient lighting",
  },
  {
    index: "05",
    id: "glass-films",
    icon: Sparkles,
    title: "Artificial Glass & Films",
    copy: "Privacy and light in the same breath — frosted, decorative and UV-protective films for glass of any size.",
    tags: ["Frosted Glass Film", "Decorative Glass Film", "UV Protection Film", "Privacy Film"],
    accent: "primary",
    image:
      "/images/glass-films-(1).jpeg",
    alt: "Frosted glass partition dividing a bright modern office",
  },
];
