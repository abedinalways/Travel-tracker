"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Compass, Share2, Database, Languages } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-zinc-800 to-rose-500/20 border border-zinc-700/80 flex items-center justify-center shadow-inner group">
            <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-white">
                CancelTour <span className="text-emerald-400">&</span> Beyond
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                v1.0
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-zinc-400 truncate max-w-md">
              {t.tagline}
            </p>
          </div>
        </div>

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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
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
