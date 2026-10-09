import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/store/cart";
import AgeGate from "@/components/AgeGate";
import SiteWatermark from "@/components/SiteWatermark";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Veda Naturals — Ancient Wisdom for Modern Vitality",
  description:
    "Heritage Ayurvedic formulations. Wildcrafted botanicals, lab-tested purity, AYUSH certified.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable} h-full`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <CartProvider>
          <AgeGate />
          <SiteWatermark />
          <div className="relative z-[1] flex-1 flex flex-col">{children}</div>
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
