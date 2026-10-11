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
    border: string;
    activeCls: string;
    glow: string;
  }[] = [
    {
      status: "visited",
      label: t.status.visited,
      emoji: "✅",
      count: counts.visited,
      colorBg: "bg-emerald-500",
      border: "border-emerald-500/50",
      activeCls: "bg-emerald-500/20 border-emerald-500/80 text-emerald-200 ring-2 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      glow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]",
    },
    {
      status: "planned",
      label: t.status.planned,
      emoji: "⏳",
      count: counts.planned,
      colorBg: "bg-amber-500",
      border: "border-amber-500/50",
      activeCls: "bg-amber-500/20 border-amber-500/80 text-amber-200 ring-2 ring-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
      glow: "hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]",
    },
    {
      status: "cancelled",
      label: t.status.cancelled,
      emoji: "💔",
      count: counts.cancelled,
      colorBg: "bg-rose-500",
      border: "border-rose-500/50",
      activeCls: "bg-rose-500/20 border-rose-500/80 text-rose-200 ring-2 ring-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.3)]",
      glow: "hover:shadow-[0_0_15px_rgba(244,63,94,0.35)]",
    },
    {
      status: "bucketlist",
      label: t.status.bucketlist,
      emoji: "🌟",
      count: counts.bucketlist,
      colorBg: "bg-purple-500",
      border: "border-purple-500/50",
      activeCls: "bg-purple-500/20 border-purple-500/80 text-purple-200 ring-2 ring-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      glow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]",
    },
    {
      status: "never",
      label: t.status.never,
      emoji: "💤",
      count: counts.never,
      colorBg: "bg-zinc-600",
      border: "border-zinc-600/60",
      activeCls: "bg-zinc-800 border-zinc-500 text-white ring-2 ring-zinc-500/30",
      glow: "hover:shadow-[0_0_15px_rgba(113,113,122,0.2)]",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-2 rounded-2xl glass-card backdrop-blur-md border border-white/10 shadow-lg">
      {legendItems.map((item) => {
        const isActive = activeFilter === item.status;
        return (
          <button
            key={item.status}
            type="button"
            onClick={() =>
              onFilterChange?.(isActive ? null : item.status)
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
              isActive
                ? `${item.activeCls} scale-105`
                : "border-transparent bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
            } ${item.glow}`}
          >
            <span className="text-xs">{item.emoji}</span>
            <span>{item.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-zinc-800 text-zinc-400"
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
