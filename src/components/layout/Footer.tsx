"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "@/components/layout/Logo";
import { HeartIcon } from "@/components/ui/icons";

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenRoast: () => void;
  onOpenBudget: () => void;
  onOpenPacking: () => void;
  onOpenBackup: () => void;
  onOpenShare: () => void;
}

export function Footer({
  onOpenCalculator,
  onOpenRoast,
  onOpenBudget,
  onOpenPacking,
  onOpenBackup,
  onOpenShare,
}: FooterProps) {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border mt-16 bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Funny Philosophy */}
          <div className="md:col-span-5 space-y-3">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              {language === "bn"
                ? "ট্যুর প্ল্যান হাজারটা, কিন্তু শেষ রাতে ড্রপ দেওয়ার সহজাত প্রতিভা যাদের আছে—তাদের জন্যই তৈরি নিখুঁত মেমোরি ট্র্যাকার।"
                : "For those with infinite travel dreams and an innate talent for ghosting group chats at 2 AM."}
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>
                {language === "bn"
                  ? "১০০% অফলাইন ও ব্রাউজারে সুরক্ষিত (জিরো সার্ভার ট্র্যাকিং)"
                  : "100% Client-Side & Private (Zero tracking)"}
              </span>
            </div>
          </div>

          {/* Quick Interactive Features */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              {language === "bn" ? "মজাদার ফিচারসমূহ" : "Fun Features"}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="text-left px-2.5 py-1.5 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>🧮</span>
                <span>{language === "bn" ? "ট্যুর ক্যালকুলেটর" : "Tour Calculator"}</span>
              </button>
              <button
                type="button"
                onClick={onOpenRoast}
                className="text-left px-2.5 py-1.5 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>💀</span>
                <span>{language === "bn" ? "রোস্ট মোড" : "Brutal Roast"}</span>
              </button>
              <button
                type="button"
                onClick={onOpenBudget}
                className="text-left px-2.5 py-1.5 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>💸</span>
                <span>{language === "bn" ? "বাজেট বাস্তবতা" : "Budget Reality"}</span>
              </button>
              <button
                type="button"
                onClick={onOpenPacking}
                className="text-left px-2.5 py-1.5 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>🎒</span>
                <span>{language === "bn" ? "প্যাকিং চেকলিস্ট" : "Packing List"}</span>
              </button>
              <button
                type="button"
                onClick={onOpenShare}
                className="text-left px-2.5 py-1.5 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>✨</span>
                <span>{language === "bn" ? "সোশ্যাল কার্ড" : "Social Card"}</span>
              </button>
              <button
                type="button"
                onClick={onOpenBackup}
                className="text-left px-2.5 py-1.5 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>💾</span>
                <span>{language === "bn" ? "ডাটা ব্যাকআপ" : "Backup Data"}</span>
              </button>
            </div>
          </div>

          {/* Funny Pro Tip & Scroll-to-Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between h-full">
            <div className="p-3 rounded-sm bg-secondary border border-border">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                💡 {language === "bn" ? "চিরন্তন উপদেশ" : "Pro Life Tip"}
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                {language === "bn"
                  ? "ট্যুর ক্যান্সেল হলে সবসময় পরিস্থিতির ওপর দোষ চাপাবেন। কোনোভাবেই নিজের অলসতা স্বীকার করবেন না!"
                  : "If a tour cancels, blame the weather or bus schedule. Never admit you just wanted to sleep!"}
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="self-start md:self-end flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary hover:border-primary/50 border border-border text-xs font-semibold text-card-foreground transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <span>উপরে যান</span>
              <span>↑</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Love Note */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>{t.footer.madeWith}</span>
            <HeartIcon size={14} className="text-primary fill-primary" />
            <span>🇧🇩</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span>© 2026 DropTrip</span>
            <span>•</span>
            <span className="text-primary">{t.footer.rights}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
