"use client";

import React, { forwardRef } from "react";
import { TripStats, TravelMemory } from "@/types/trip";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "@/components/layout/Logo";
import { Sparkles, MapPin } from "lucide-react";

interface StoryCardProps {
  stats: TripStats;
  memoriesMap: Record<string, TravelMemory>;
  nickname?: string;
}

export const StoryCard = forwardRef<HTMLDivElement, StoryCardProps>(
  ({ stats, memoriesMap, nickname }, ref) => {
    const { language, t } = useLanguage();

    const displayName =
      nickname?.trim() ||
      (language === "bn" ? "অজ্ঞাত মুসাফির" : "Anonymous Nomad");

    return (
      <div
        ref={ref}
        className="w-[405px] h-[720px] bg-[#09090b] text-white p-7 flex flex-col justify-between relative overflow-hidden select-none border border-zinc-800 rounded-3xl shadow-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at 90% 90%, rgba(244, 63, 94, 0.15), transparent 50%), radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.08), transparent 60%)",
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <span>DropTrip</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">CancelTour & Beyond</span>
              </div>
              <div className="text-sm font-bold text-white">
                @{displayName}
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700 text-[11px] font-mono text-zinc-300">
            🇧🇩 BD 64
          </div>
        </div>

        {/* Hero Badge Box */}
        <div className="z-10 mt-2 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-700/80 backdrop-blur-md text-center shadow-xl">
          <div className="text-3xl mb-1">{stats.badge.icon}</div>
          <div className="text-sm sm:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-rose-300">
            {language === "bn" ? stats.badge.titleBn : stats.badge.titleEn}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
            {language === "bn"
              ? stats.badge.descriptionBn
              : stats.badge.descriptionEn}
          </p>
        </div>

        {/* Mini High-Impact Vector Map Preview */}
        <div className="my-auto py-2 flex items-center justify-center z-10">
          <svg
            viewBox="0 0 800 1000"
            className="w-56 h-64 filter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            {BANGLADESH_DISTRICTS.map((d) => {
              const status = memoriesMap[d.id]?.status || "never";
              let fill = "#27272a";
              let stroke = "#3f3f46";

              if (status === "visited") {
                fill = "#10b981";
                stroke = "#6ee7b7";
              } else if (status === "planned") {
                fill = "#f59e0b";
                stroke = "#fcd34d";
              } else if (status === "cancelled") {
                fill = "#f43f5e";
                stroke = "#fda4af";
              } else if (status === "bucketlist") {
                fill = "#a855f7";
                stroke = "#d8b4fe";
              }

              return (
                <path
                  key={d.id}
                  d={d.svgPath}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1.2"
                />
              );
            })}
          </svg>
        </div>

        {/* 4 Key Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 z-10">
          {/* Visited */}
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-emerald-500/30">
            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t.stats.visitedDistricts}</span>
            </div>
            <div className="text-xl font-black text-emerald-400 mt-1 font-mono">
              {stats.visitedCount} <span className="text-xs text-zinc-500">/ 64 {t.common.districtsCount}</span>
            </div>
          </div>

          {/* Cancelled */}
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-rose-500/30">
            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{t.stats.cancelledDistricts}</span>
            </div>
            <div className="text-xl font-black text-rose-400 mt-1 font-mono">
              {stats.cancelledCount}
            </div>
          </div>

          {/* Planned */}
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-amber-500/30">
            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.stats.plannedDistricts}</span>
            </div>
            <div className="text-xl font-black text-amber-400 mt-1 font-mono">
              {stats.plannedCount}
            </div>
          </div>

          {/* Cancellation Rate */}
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-rose-500/40">
            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>{t.stats.cancelRate}</span>
            </div>
            <div className="text-xl font-black text-rose-400 mt-1 font-mono">
              {stats.cancellationRate}%
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 z-10">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="italic">{t.shareModal.funQuote}</span>
          </div>
          <span className="font-mono text-zinc-500 text-[10px]">
            canceltour.app
          </span>
        </div>
      </div>
    );
  }
);

StoryCard.displayName = "StoryCard";
