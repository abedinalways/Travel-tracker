"use client";

import React, { forwardRef } from "react";
import { TripStats, TravelMemory } from "@/types/trip";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "@/components/layout/Logo";
import { SparklesIconComp, MapPinIcon } from "@/components/ui/icons";

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
        className="w-[520px] h-[520px] bg-card text-card-foreground p-7 flex flex-col justify-between relative overflow-hidden select-none border border-border rounded-xl shadow-2xl font-sans"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.16), transparent 50%), radial-gradient(circle at 85% 85%, rgba(16, 185, 129, 0.08), transparent 50%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-primary font-bold flex items-center gap-1.5">
                <span>DropTrip</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">CancelTour & Beyond</span>
              </div>
              <div className="text-base font-bold text-card-foreground">
                @{displayName}
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground">
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
                let fill = "var(--status-never)";
                let stroke = "var(--status-stroke)";

                if (status === "visited") {
                  fill = "var(--status-visited)";
                  stroke = "var(--primary)";
                } else if (status === "planned") {
                  fill = "var(--status-planned)";
                  stroke = "var(--status-planned)";
                } else if (status === "cancelled") {
                  fill = "var(--status-cancelled)";
                  stroke = "var(--status-cancelled)";
                } else if (status === "bucketlist") {
                  fill = "var(--status-bucketlist)";
                  stroke = "var(--status-bucketlist)";
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
            <div className="p-3 rounded-sm bg-secondary border border-border">
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>{t.stats.visitedDistricts}</span>
                <span className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="text-2xl font-black text-primary font-mono mt-0.5">
                {stats.visitedCount} <span className="text-xs text-muted-foreground">/ 64 {t.common.districtsCount}</span>
              </div>
            </div>

            <div className="p-3 rounded-sm bg-secondary border border-border">
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>{t.stats.cancelledDistricts}</span>
                <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              </div>
              <div className="text-2xl font-black text-card-foreground font-mono mt-0.5">
                {stats.cancelledCount}
              </div>
            </div>

            <div className="p-3 rounded-sm bg-secondary border border-border">
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>{t.stats.cancelRate}</span>
                <SparklesIconComp size={14} className="text-primary" />
              </div>
              <div className="text-2xl font-black text-primary font-mono mt-0.5">
                {stats.cancellationRate}%
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground z-10">
          <div className="flex items-center gap-1.5">
            <MapPinIcon size={16} className="text-primary" />
            <span className="italic">{t.shareModal.funQuote}</span>
          </div>
          <span className="font-mono text-muted-foreground text-[11px]">
            canceltour.app
          </span>
        </div>
      </div>
    );
  }
);

FeedCard.displayName = "FeedCard";
