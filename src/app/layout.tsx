import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
      className={`dark ${inter.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300">
        <LanguageProvider>
          <ToastProvider>
            {children}
            <Analytics />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
