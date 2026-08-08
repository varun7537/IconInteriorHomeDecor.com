import type { Metadata } from "next";
import { Lora, Commissioner } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const commissioner = Commissioner({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-commissioner",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Icon Interior | Crafted for Luxury, Built for Generations",
  description:
    "Discover premium, hand-finished furniture made to transform your home into a masterpiece.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${commissioner.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
