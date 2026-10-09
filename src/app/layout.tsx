import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DropTrip: CancelTour & Beyond 🇧🇩 | The Ultimate Luxury Tour & Flake Tracker",
  description:
    "Track which of Bangladesh's 64 districts you've explored and which trips got hilariously cancelled at the 11th hour. Local-first, viral story cards, bilingual.",
  keywords: [
    "DropTrip",
    "CancelTour",
    "Bangladesh travel map",
    "Tour cancellation tracker",
    "64 districts of Bangladesh",
    "Local-first travel app",
  ],
  authors: [{ name: "DropTrip: CancelTour & Beyond" }],
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300">
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
