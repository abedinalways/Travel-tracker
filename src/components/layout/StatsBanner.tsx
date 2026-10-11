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
      <div className="relative overflow-hidden p-3.5 sm:p-4 rounded-sm bg-card border border-border hover:border-primary/40 transition-colors flex flex-col justify-between group shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary/70" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t.stats.visitedDistricts}
          </span>
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-sm bg-secondary text-primary border border-border">
            {stats.visitedRate}% {language === "bn" ? "কভার্ড" : "Covered"}
          </span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-card-foreground font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
            {stats.visitedCount}
          </span>
          <span className="text-xs text-muted-foreground font-mono">/ 64 {t.common.districtsCount}</span>
        </div>
        <div className="mt-1.5 text-[11px] text-muted-foreground font-medium">
          {stats.visitedCount >= 30
            ? (language === "bn" ? "🎒 খাঁটি যাযাবর পথিক!" : "🎒 True wanderer!")
            : stats.visitedCount >= 10
            ? (language === "bn" ? "🚗 ইঞ্জিনে তেল পড়েছে!" : "🚗 Rolling fast!")
            : stats.visitedCount > 0
            ? (language === "bn" ? "🌱 খাতা খুলেছে মাত্র!" : "🌱 Just getting started!")
            : (language === "bn" ? "🛋️ সোফা থেকে ওঠা বাকি!" : "🛋️ Still glued to the sofa!")}
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-secondary rounded-sm h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full rounded-sm transition-all duration-700"
              style={{ width: `${Math.max(stats.visitedRate, 3)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Cancelled Card */}
      <div className="relative overflow-hidden p-3.5 sm:p-4 rounded-sm bg-card border border-border hover:border-primary/40 transition-colors flex flex-col justify-between group shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary/40" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-card-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            {t.stats.cancelledDistricts}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-secondary text-muted-foreground border border-border">
            {stats.cancelledCount > 0 ? "চিটিংবাজি কাউন্টার 🤡" : "ধোঁকামুক্ত রেকর্ড! ✨"}
          </span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-card-foreground font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
            {stats.cancelledCount}
          </span>
          <span className="text-xs text-muted-foreground">
            {language === "bn" ? "টি ট্রিপ ড্রপ" : "Trips Flaked"}
          </span>
        </div>
        <div className="mt-1.5 text-[11px] text-muted-foreground leading-snug line-clamp-1 italic">
          {stats.cancelledCount > 0
            ? (language === "bn" ? "গ্রুপে সিন করে গায়েব হওয়া স্পেশালিস্ট" : "Ghosting travel groups like a pro")
            : t.stats.cancelledNote}
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-secondary rounded-sm h-1.5 overflow-hidden">
            <div
              className="bg-muted-foreground h-full rounded-sm transition-all duration-700"
              style={{ width: `${Math.min(stats.cancelledCount * 5, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Cancellation Rate Card */}
      <div className="relative overflow-hidden p-3.5 sm:p-4 rounded-sm bg-card border border-border hover:border-primary/40 transition-colors flex flex-col justify-between group shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary/50" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-card-foreground flex items-center gap-1.5">
            <SparklesIconComp size={15} className="text-primary" />
            {t.stats.cancelRate}
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-secondary text-muted-foreground border border-border">
            {stats.cancellationRate > 50 ? "মারাত্মক ড্রপার 💀" : stats.cancellationRate > 0 ? "মাঝারি ফ্লেকার ⚖️" : "পারফেক্ট 🌟"}
          </span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-primary font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
            {stats.cancellationRate}%
          </span>
          <span className="text-xs text-muted-foreground">{t.stats.dropRatio}</span>
        </div>
        <div className="mt-1.5 text-[11px] text-muted-foreground font-medium">
          {stats.cancellationRate >= 50
            ? (language === "bn" ? "বন্ধুরা আপনারে বিশ্বাস করে না!" : "Friends have trust issues with you!")
            : stats.cancellationRate > 0
            ? (language === "bn" ? "অজুহাত বানানোর সহজাত দক্ষতা" : "Natural talent for last-minute excuses")
            : (language === "bn" ? "কথার মানুষ, প্ল্যান ভাঙেন না" : "Man of word, never flakes")}
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-secondary rounded-sm h-1.5 overflow-hidden">
            <div
              className="bg-primary/80 h-full rounded-sm transition-all duration-700"
              style={{ width: `${Math.max(stats.cancellationRate, 2)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Active Title & Badge Card */}
      <button
        type="button"
        onClick={onOpenShare}
        className="relative overflow-hidden p-3.5 sm:p-4 rounded-sm bg-card border border-border hover:border-primary/50 transition-colors text-left group cursor-pointer flex flex-col justify-between shadow-sm"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary flex items-center gap-1.5">
            <span>{t.stats.yourTitle}</span>
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-sm bg-secondary border border-border text-[11px] text-primary font-semibold group-hover:border-primary/40 transition-all">
            <span>কার্ড দেখুন</span>
            <ArrowUpRightIcon size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
            {stats.badge.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold text-card-foreground leading-tight truncate">
              {language === "bn" ? stats.badge.titleBn : stats.badge.titleEn}
            </div>
            <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
              {language === "bn" ? stats.badge.descriptionBn : stats.badge.descriptionEn}
            </div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-border text-[10px] text-muted-foreground font-mono flex items-center justify-between">
          <span>লেভেল: {stats.visitedCount > 10 ? "অভিজ্ঞ" : "প্রাথমিক"}</span>
          <span className="text-primary underline decoration-dotted">কার্ড জেনারেট করুন →</span>
        </div>
      </button>
    </div>
  );
}
