"use client";

import React, { forwardRef } from "react";
import { TripStats, TravelMemory } from "@/types/trip";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "@/components/layout/Logo";
import { SparklesIconComp, MapPinIcon } from "@/components/ui/icons";

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
        className="w-[405px] h-[720px] bg-card text-card-foreground p-7 flex flex-col justify-between relative overflow-hidden select-none border border-border rounded-xl shadow-2xl font-sans"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at 90% 90%, rgba(16, 185, 129, 0.08), transparent 50%)",
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-primary font-bold flex items-center gap-1.5">
                <span>DropTrip</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">CancelTour & Beyond</span>
              </div>
              <div className="text-sm font-bold text-card-foreground">
                @{displayName}
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-secondary border border-border text-[11px] font-mono text-muted-foreground">
            🇧🇩 BD 64
          </div>
        </div>

        {/* Hero Badge Box */}
        <div className="z-10 mt-2 p-4 rounded-xl bg-secondary border border-border backdrop-blur-md text-center shadow-xl">
          <div className="text-3xl mb-1">{stats.badge.icon}</div>
          <div className="text-sm sm:text-base font-extrabold text-primary">
            {language === "bn" ? stats.badge.titleBn : stats.badge.titleEn}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
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

        {/* 4 Key Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 z-10">
          {/* Visited */}
          <div className="p-3 rounded-sm bg-secondary border border-border">
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{t.stats.visitedDistricts}</span>
            </div>
            <div className="text-xl font-black text-primary mt-1 font-mono">
              {stats.visitedCount} <span className="text-xs text-muted-foreground">/ 64 {t.common.districtsCount}</span>
            </div>
          </div>

          {/* Cancelled */}
          <div className="p-3 rounded-sm bg-secondary border border-border">
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span>{t.stats.cancelledDistricts}</span>
            </div>
            <div className="text-xl font-black text-card-foreground mt-1 font-mono">
              {stats.cancelledCount}
            </div>
          </div>

          {/* Planned */}
          <div className="p-3 rounded-sm bg-secondary border border-border">
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{t.stats.plannedDistricts}</span>
            </div>
            <div className="text-xl font-black text-primary mt-1 font-mono">
              {stats.plannedCount}
            </div>
          </div>

          {/* Cancellation Rate */}
          <div className="p-3 rounded-sm bg-secondary border border-border">
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
              <SparklesIconComp size={13} className="text-primary" />
              <span>{t.stats.cancelRate}</span>
            </div>
            <div className="text-xl font-black text-primary mt-1 font-mono">
              {stats.cancellationRate}%
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground z-10">
          <div className="flex items-center gap-1.5">
            <MapPinIcon size={14} className="text-primary" />
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
