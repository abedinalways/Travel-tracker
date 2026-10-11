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
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/40 hover:border-rose-400 text-rose-300 hover:text-rose-100 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]"
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl glass-card-interactive border border-white/10 hover:border-emerald-500/50 text-xs font-bold text-zinc-200 hover:text-white transition-all cursor-pointer"
          >
            <LanguageIcon size={16} className="text-emerald-400" />
            <span>
              {language === "bn" ? "English" : "বাংলা"}
            </span>
          </button>

          {/* Backup / Settings Modal Trigger */}
          <button
            type="button"
            onClick={onOpenBackup}
            title={t.nav.backup}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl glass-card-interactive border border-white/10 hover:border-sky-500/50 text-xs font-bold text-zinc-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <DatabaseIconComp size={16} className="text-sky-400" />
            <span className="hidden sm:inline">{t.nav.backup}</span>
          </button>

          {/* Viral Social Card Trigger */}
          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 hover:brightness-110 text-zinc-950 text-xs sm:text-sm font-black transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer active:scale-95"
          >
            <ShareIcon size={16} />
            <span className="hidden sm:inline">{t.nav.share}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
