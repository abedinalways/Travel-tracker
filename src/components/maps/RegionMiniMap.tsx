"use client";

import React, { memo } from "react";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { WORLD_COUNTRIES } from "@/config/worldCountries";
import { TripStatus } from "@/types/trip";

interface RegionMiniMapProps {
  selectedId: string;
  status: TripStatus;
  variant: "bangladesh" | "world";
  className?: string;
}

const STATUS_FILL: Record<TripStatus, string> = {
  visited: "var(--status-visited)",
  planned: "var(--status-planned)",
  cancelled: "var(--status-cancelled)",
  bucketlist: "var(--status-bucketlist)",
  never: "var(--status-never)",
};

const STATUS_STROKE: Record<TripStatus, string> = {
  visited: "var(--primary)",
  planned: "var(--status-planned)",
  cancelled: "var(--status-cancelled)",
  bucketlist: "var(--status-bucketlist)",
  never: "var(--status-stroke)",
};

const MiniPath = memo(function MiniPath({
  d,
  fill,
  stroke,
  isHighlighted,
}: {
  d: string;
  fill: string;
  stroke: string;
  isHighlighted: boolean;
}) {
  return (
    <path
      d={d}
      fill={isHighlighted ? fill : "var(--card)"}
      stroke={isHighlighted ? stroke : "var(--border)"}
      strokeWidth={isHighlighted ? 2 : 0.6}
      opacity={isHighlighted ? 1 : 0.5}
    />
  );
});

/**
 * A small standalone map that highlights the currently selected district
 * (Bangladesh view) or country (World view), so the user can see exactly
 * where the region sits while reading/editing its details.
 */
export function RegionMiniMap({
  selectedId,
  status,
  variant,
  className = "",
}: RegionMiniMapProps) {
  const isBD = variant === "bangladesh";
  const items = isBD ? BANGLADESH_DISTRICTS : WORLD_COUNTRIES;
  const viewBox = isBD ? "0 0 800 1000" : "0 0 1000 520";

  const fill = STATUS_FILL[status] || STATUS_FILL.never;
  const stroke = STATUS_STROKE[status] || STATUS_STROKE.never;

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center ${className}`}
    >
      <svg
        viewBox={viewBox}
        className="w-full h-auto max-h-[180px]"
        role="img"
        aria-label="Selected region location preview"
      >
        {items.map((item) => (
          <MiniPath
            key={item.id}
            d={item.svgPath}
            fill={fill}
            stroke={stroke}
            isHighlighted={item.id === selectedId}
          />
        ))}
      </svg>
    </div>
  );
}
