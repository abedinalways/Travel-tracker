"use client";

import React from "react";
import { TripStats } from "@/types/trip";
import { useLanguage } from "@/i18n/LanguageContext";
import { SparklesIconComp, ArrowUpRightIcon } from "@/components/ui/icons";

interface StatsBannerProps {
  stats: TripStats;
  onOpenShare: () => void;
}

export function StatsBanner({ stats, onOpenShare }: StatsBannerProps) {
  const { language, t } = useLanguage();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* 1. Visited Card */}
      <div className="relative overflow-hidden p-4 sm:p-5 rounded-3xl glass-card-interactive border border-emerald-500/25 bg-gradient-to-b from-emerald-950/20 via-zinc-900/80 to-zinc-900/90 flex flex-col justify-between group shadow-[0_4px_20px_rgba(16,185,129,0.06)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {t.stats.visitedDistricts}
          </span>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            {stats.visitedRate}% {language === "bn" ? "কভার্ড" : "Covered"}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
            {stats.visitedCount}
          </span>
          <span className="text-xs text-zinc-400 font-mono">/ 64 {t.common.districtsCount}</span>
        </div>
        <div className="mt-2 text-[11px] text-emerald-400/80 font-medium">
          {stats.visitedCount >= 30
            ? (language === "bn" ? "🎒 খাঁটি যাযাবর পথিক!" : "🎒 True wanderer!")
            : stats.visitedCount >= 10
            ? (language === "bn" ? "🚗 ইঞ্জিনে তেল পড়েছে!" : "🚗 Rolling fast!")
            : stats.visitedCount > 0
            ? (language === "bn" ? "🌱 খাতা খুলেছে মাত্র!" : "🌱 Just getting started!")
            : (language === "bn" ? "🛋️ সোফা থেকে ওঠা বাকি!" : "🛋️ Still glued to the sofa!")}
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden p-0.5 ring-1 ring-white/5">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
              style={{ width: `${Math.max(stats.visitedRate, 3)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Cancelled Card */}
      <div className="relative overflow-hidden p-4 sm:p-5 rounded-3xl glass-card-interactive border border-rose-500/25 bg-gradient-to-b from-rose-950/20 via-zinc-900/80 to-zinc-900/90 flex flex-col justify-between group shadow-[0_4px_20px_rgba(244,63,94,0.06)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500 opacity-80" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {t.stats.cancelledDistricts}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            {stats.cancelledCount > 0 ? "চিটিংবাজি কাউন্টার 🤡" : "ধোঁকামুক্ত রেকর্ড! ✨"}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-rose-400 font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
            {stats.cancelledCount}
          </span>
          <span className="text-xs text-zinc-400">
            {language === "bn" ? "টি ট্রিপ ড্রপ" : "Trips Flaked"}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-zinc-400 leading-snug line-clamp-1 italic">
          {stats.cancelledCount > 0
            ? (language === "bn" ? "গ্রুপে সিন করে গায়েব হওয়া স্পেশালিস্ট" : "Ghosting travel groups like a pro")
            : t.stats.cancelledNote}
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden p-0.5 ring-1 ring-white/5">
            <div
              className="bg-gradient-to-r from-rose-500 to-red-400 h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
              style={{ width: `${Math.min(stats.cancelledCount * 5, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Cancellation Rate Card */}
      <div className="relative overflow-hidden p-4 sm:p-5 rounded-3xl glass-card-interactive border border-amber-500/25 bg-gradient-to-b from-amber-950/20 via-zinc-900/80 to-zinc-900/90 flex flex-col justify-between group shadow-[0_4px_20px_rgba(245,158,11,0.06)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400 opacity-80" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <SparklesIconComp size={15} className="text-amber-400" />
            {t.stats.cancelRate}
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            {stats.cancellationRate > 50 ? "মারাত্মক ড্রপার 💀" : stats.cancellationRate > 0 ? "মাঝারি ফ্লেকার ⚖️" : "পারফেক্ট 🌟"}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
            {stats.cancellationRate}%
          </span>
          <span className="text-xs text-zinc-400">{t.stats.dropRatio}</span>
        </div>
        <div className="mt-2 text-[11px] text-amber-300/80 font-medium">
          {stats.cancellationRate >= 50
            ? (language === "bn" ? "বন্ধুরা আপনারে বিশ্বাস করে না!" : "Friends have trust issues with you!")
            : stats.cancellationRate > 0
            ? (language === "bn" ? "অজুহাত বানানোর সহজাত দক্ষতা" : "Natural talent for last-minute excuses")
            : (language === "bn" ? "কথার মানুষ, প্ল্যান ভাঙেন না" : "Man of word, never flakes")}
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden p-0.5 ring-1 ring-white/5">
            <div
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              style={{ width: `${Math.max(stats.cancellationRate, 2)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Active Title & Badge Card */}
      <button
        type="button"
        onClick={onOpenShare}
        className="relative overflow-hidden p-4 sm:p-5 rounded-3xl glass-card-interactive border border-purple-500/35 hover:border-purple-400/70 bg-gradient-to-br from-purple-950/30 via-zinc-900/90 to-zinc-900/90 text-left group cursor-pointer flex flex-col justify-between shadow-[0_4px_25px_rgba(168,85,247,0.15)]"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500 opacity-90" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
            <span>{t.stats.yourTitle}</span>
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[11px] text-purple-300 font-semibold group-hover:bg-purple-500/25 transition-all">
            <span>কার্ড দেখুন</span>
            <ArrowUpRightIcon size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner">
            {stats.badge.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base font-extrabold text-white leading-tight truncate">
              {language === "bn" ? stats.badge.titleBn : stats.badge.titleEn}
            </div>
            <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
              {language === "bn" ? stats.badge.descriptionBn : stats.badge.descriptionEn}
            </div>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-purple-500/20 text-[10px] text-purple-300/80 font-mono flex items-center justify-between">
          <span>লেভেল: {stats.visitedCount > 10 ? "অভিজ্ঞ" : "প্রাথমিক"}</span>
          <span className="text-purple-400 underline decoration-dotted">কার্ড জেনারেট করুন →</span>
        </div>
      </button>
    </div>
  );
}
