"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TripStatus } from "@/types/trip";

interface MapLegendProps {
  counts: {
    visited: number;
    planned: number;
    cancelled: number;
    bucketlist: number;
    never: number;
  };
  activeFilter?: TripStatus | null;
  onFilterChange?: (status: TripStatus | null) => void;
}

export function MapLegend({
  counts,
  activeFilter,
  onFilterChange,
}: MapLegendProps) {
  const { t } = useLanguage();

  const legendItems: {
    status: TripStatus;
    label: string;
    emoji: string;
    count: number;
    colorBg: string;
  }[] = [
    {
      status: "visited",
      label: t.status.visited,
      emoji: "✅",
      count: counts.visited,
      colorBg: "bg-primary",
    },
    {
      status: "planned",
      label: t.status.planned,
      emoji: "⏳",
      count: counts.planned,
      colorBg: "bg-primary",
    },
    {
      status: "cancelled",
      label: t.status.cancelled,
      emoji: "💔",
      count: counts.cancelled,
      colorBg: "bg-muted-foreground",
    },
    {
      status: "bucketlist",
      label: t.status.bucketlist,
      emoji: "🌟",
      count: counts.bucketlist,
      colorBg: "bg-primary",
    },
    {
      status: "never",
      label: t.status.never,
      emoji: "💤",
      count: counts.never,
      colorBg: "bg-muted-foreground",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-sm bg-card border border-border shadow-sm">
      {legendItems.map((item) => {
        const isActive = activeFilter === item.status;
        return (
          <button
            key={item.status}
            type="button"
            onClick={() =>
              onFilterChange?.(isActive ? null : item.status)
            }
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
              isActive
                ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                : "bg-secondary text-card-foreground border-border hover:border-primary/50"
            }`}
          >
            <span className="text-xs">{item.emoji}</span>
            <span>{item.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-sm text-[11px] font-mono font-bold ${
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-card text-primary border border-border"
              }`}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
