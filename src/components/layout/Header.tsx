"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "./Logo";
import { ShareIcon, DatabaseIconComp, LanguageIcon } from "@/components/ui/icons";

interface HeaderProps {
  onOpenShare: () => void;
  onOpenBackup: () => void;
  onOpenRoast: () => void;
}

export function Header({ onOpenShare, onOpenBackup, onOpenRoast }: HeaderProps) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Titles */}
        <Logo size="md" />

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Roast Me Button */}
          <button
            type="button"
            onClick={onOpenRoast}
            title={language === "bn" ? "আমারে রোস্ট করো" : "Roast Me"}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span className="text-sm">💀</span>
            <span className="hidden sm:inline font-bold">
              {language === "bn" ? "রোস্ট মি!" : "Roast Me!"}
            </span>
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={t.nav.language}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-sm bg-secondary border border-border hover:border-primary/50 text-xs font-bold text-card-foreground transition-all cursor-pointer"
          >
            <LanguageIcon size={15} className="text-primary" />
            <span>
              {language === "bn" ? "English" : "বাংলা"}
            </span>
          </button>

          {/* Backup / Settings Modal Trigger */}
          <button
            type="button"
            onClick={onOpenBackup}
            title={t.nav.backup}
            className="p-1.5 sm:px-3 sm:py-2 rounded-sm bg-secondary border border-border hover:border-primary/50 text-xs font-bold text-card-foreground transition-all cursor-pointer flex items-center gap-1.5"
          >
            <DatabaseIconComp size={15} className="text-primary" />
            <span className="hidden sm:inline">{t.nav.backup}</span>
          </button>

          {/* Viral Social Card Trigger - Primary Button */}
          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-black transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <ShareIcon size={15} />
            <span className="hidden sm:inline">{t.nav.share}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
