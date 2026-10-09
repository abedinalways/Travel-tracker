"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "./Logo";
import { Share2, Database, Languages } from "lucide-react";

interface HeaderProps {
  onOpenShare: () => void;
  onOpenBackup: () => void;
}

export function Header({ onOpenShare, onOpenBackup }: HeaderProps) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Titles */}
        <Logo size="md" />

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            title="Switch Language"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-card border border-zinc-700/80 hover:border-zinc-500 text-xs font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer"
          >
            <Languages className="w-4 h-4 text-emerald-400" />
            <span className="font-mono">
              {language === "bn" ? "English" : "বাংলা"}
            </span>
          </button>

          {/* Backup / Settings Modal Trigger */}
          <button
            type="button"
            onClick={onOpenBackup}
            title={t.nav.backup}
            className="p-2 sm:px-3 sm:py-2 rounded-xl glass-card border border-zinc-700/80 hover:border-zinc-500 text-xs font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Database className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">{t.nav.backup}</span>
          </button>

          {/* Viral Social Card Trigger */}
          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:brightness-110 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.share}</span>
            <span className="sm:hidden">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
