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
    count: number;
    colorBg: string;
    border: string;
    glow: string;
  }[] = [
    {
      status: "visited",
      label: t.status.visited,
      count: counts.visited,
      colorBg: "bg-emerald-500",
      border: "border-emerald-500/40",
      glow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]",
    },
    {
      status: "planned",
      label: t.status.planned,
      count: counts.planned,
      colorBg: "bg-amber-500",
      border: "border-amber-500/40",
      glow: "hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]",
    },
    {
      status: "cancelled",
      label: t.status.cancelled,
      count: counts.cancelled,
      colorBg: "bg-rose-500",
      border: "border-rose-500/40",
      glow: "hover:shadow-[0_0_15px_rgba(244,63,94,0.35)]",
    },
    {
      status: "bucketlist",
      label: t.status.bucketlist,
      count: counts.bucketlist,
      colorBg: "bg-purple-500",
      border: "border-purple-500/40",
      glow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]",
    },
    {
      status: "never",
      label: t.status.never,
      count: counts.never,
      colorBg: "bg-zinc-700",
      border: "border-zinc-700/60",
      glow: "hover:shadow-[0_0_15px_rgba(113,113,122,0.2)]",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2.5 rounded-2xl glass-card backdrop-blur-md">
      {legendItems.map((item) => {
        const isActive = activeFilter === item.status;
        return (
          <button
            key={item.status}
            type="button"
            onClick={() =>
              onFilterChange?.(isActive ? null : item.status)
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
              isActive
                ? `${item.border} bg-zinc-800 text-white ring-1 ring-white/20 scale-105`
                : "border-transparent bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
            } ${item.glow}`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${item.colorBg} shrink-0 ring-2 ring-black/40`}
            />
            <span>{item.label}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-zinc-800/80 text-[11px] font-mono text-zinc-400">
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
