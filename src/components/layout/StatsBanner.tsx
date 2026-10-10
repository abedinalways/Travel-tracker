"use client";

import React from "react";
import { TripStats } from "@/types/trip";
import { useLanguage } from "@/i18n/LanguageContext";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface StatsBannerProps {
  stats: TripStats;
  onOpenShare: () => void;
}

export function StatsBanner({ stats, onOpenShare }: StatsBannerProps) {
  const { language, t } = useLanguage();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* 1. Visited Card */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border border-zinc-800/80 hover:border-emerald-500/40 transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400">
            {t.stats.visitedDistricts}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            {stats.visitedCount}
          </span>
          <span className="text-xs text-zinc-500 font-mono">/ 64 {t.common.districtsCount}</span>
        </div>
        <div className="mt-3 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${stats.visitedRate}%` }}
          />
        </div>
      </div>

      {/* 2. Cancelled Card */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border border-zinc-800/80 hover:border-rose-500/40 transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400">
            {t.stats.cancelledDistricts}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
            {stats.cancelledCount}
          </span>
          <span className="text-xs text-zinc-500">ভেস্তে যাওয়া ট্রিপ</span>
        </div>
        <div className="mt-3 text-[11px] text-zinc-500">
          {t.stats.cancelledNote}
        </div>
      </div>

      {/* 3. Cancellation Rate Card */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border border-zinc-800/80 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400">
            {t.stats.cancelRate}
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
            {stats.cancellationRate}%
          </span>
          <span className="text-xs text-zinc-500">{t.stats.dropRatio}</span>
        </div>
        <div className="mt-3 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-rose-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${stats.cancellationRate}%` }}
          />
        </div>
      </div>

      {/* 4. Active Title & Badge Card */}
      <button
        type="button"
        onClick={onOpenShare}
        className="p-4 sm:p-5 rounded-2xl glass-card border border-emerald-500/30 hover:border-emerald-500/60 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-emerald-950/20 transition-all text-left group cursor-pointer flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <span>{t.stats.yourTitle}</span>
          </span>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl">{stats.badge.icon}</span>
          <span className="text-xs sm:text-sm font-bold text-white leading-tight">
            {language === "bn" ? stats.badge.titleBn : stats.badge.titleEn}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-zinc-400 line-clamp-1">
          {language === "bn"
            ? stats.badge.descriptionBn
            : stats.badge.descriptionEn}
        </div>
      </button>
    </div>
  );
}
