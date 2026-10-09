"use client";

import React, { forwardRef } from "react";
import { TripStats, TravelMemory } from "@/types/trip";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "@/components/layout/Logo";
import { Sparkles, MapPin } from "lucide-react";

interface FeedCardProps {
  stats: TripStats;
  memoriesMap: Record<string, TravelMemory>;
  nickname?: string;
}

export const FeedCard = forwardRef<HTMLDivElement, FeedCardProps>(
  ({ stats, memoriesMap, nickname }, ref) => {
    const { language, t } = useLanguage();

    const displayName =
      nickname?.trim() ||
      (language === "bn" ? "অজ্ঞাত মুসাফির" : "Anonymous Nomad");

    return (
      <div
        ref={ref}
        className="w-[520px] h-[520px] bg-[#09090b] text-white p-7 flex flex-col justify-between relative overflow-hidden select-none border border-zinc-800 rounded-3xl shadow-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.16), transparent 50%), radial-gradient(circle at 85% 85%, rgba(244, 63, 94, 0.16), transparent 50%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <span>DropTrip</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">CancelTour & Beyond</span>
              </div>
              <div className="text-base font-bold text-white">
                @{displayName}
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300">
            {stats.badge.icon} {language === "bn" ? stats.badge.titleBn : stats.badge.titleEn}
          </div>
        </div>

        {/* Middle Body: Map + Stats side by side */}
        <div className="flex items-center justify-between gap-6 my-auto z-10">
          {/* Map */}
          <div className="w-52 h-60 flex items-center justify-center">
            <svg
              viewBox="0 0 800 1000"
              className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
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

          {/* Stats Column */}
          <div className="flex-1 space-y-2.5">
            <div className="p-3 rounded-2xl bg-zinc-900/90 border border-emerald-500/30">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>{t.stats.visitedDistricts}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                {stats.visitedCount} <span className="text-xs text-zinc-500">/ 64</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900/90 border border-rose-500/30">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>{t.stats.cancelledDistricts}</span>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
              <div className="text-2xl font-black text-rose-400 font-mono mt-0.5">
                {stats.cancelledCount}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900/90 border border-rose-500/50">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>{t.stats.cancelRate}</span>
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-400 font-mono mt-0.5">
                {stats.cancellationRate}%
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 z-10">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="italic">{t.shareModal.funQuote}</span>
          </div>
          <span className="font-mono text-zinc-500 text-[11px]">
            canceltour.app
          </span>
        </div>
      </div>
    );
  }
);

FeedCard.displayName = "FeedCard";
