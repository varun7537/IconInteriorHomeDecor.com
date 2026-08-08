export type GalleryCategory = "living" | "balcony" | "bedroom";

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: GalleryCategory;
  image: string;
  size: "tall" | "short";
}

export const categoryLabels: Record<"all" | GalleryCategory, string> = {
  all: "All",
  living: "Living",
  balcony: "Balcony",
  bedroom: "Bedroom",
  // dining: "Dining",
  // bath: "Bath",
};

export const galleryItems: GalleryItem[] = [
  {
    id: "living-room-wallpaper",
    title: "Living room, wallpaper",
    location: "Noida, UP",
    category: "living",
    image:
      "/images/wallpanel-decoration-(1).png",
    size: "tall",
  },
  {
    id: "artificial-glass-balcony",
    title: "Artificial glass balcony",
    location: "Noida, UP",
    category: "balcony",
    image:
      "/images/artificial-glass-(1).jpeg",
    size: "short",
  },
  {
    id: "bedroom decoration",
    title: "Bedroom decoration",
    location: "Noida, UP",
    category: "bedroom",
    image:
      "/images/wallpaper-decoration.jpg",
    size: "tall",
  },
  {
    id: "bedroom wallpaper",
    title: "Bedroom wallpaper",
    location: "Noida, UP",
    category: "bedroom",
    image:
      "/images/wallpaper-decoration-(3).jpg",
    size: "short",
  },
  {
    id: "bedroom wall panels",
    title: "Bedroom wall panels",
    location: "Noida, UP",
    category: "bedroom",
    image:
      "/images/wallpaper-decoration-(3).png",
    size: "short",
  },
  {
    id: "zebra-blinds",
    title: "Zebra Blinds, Bedroom",
    location: "Noida, UP",
    category: "bedroom",
    image:
      "/images/zebra-blinds-(1).jpeg",
    size: "short",
  },
];
