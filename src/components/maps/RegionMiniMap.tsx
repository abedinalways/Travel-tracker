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
  visited: "#10b981",
  planned: "#f59e0b",
  cancelled: "#f43f5e",
  bucketlist: "#a855f7",
  never: "#3f3f46",
};

const STATUS_STROKE: Record<TripStatus, string> = {
  visited: "#6ee7b7",
  planned: "#fcd34d",
  cancelled: "#fda4af",
  bucketlist: "#d8b4fe",
  never: "#52525b",
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
      fill={isHighlighted ? fill : "#18181b"}
      stroke={isHighlighted ? stroke : "#27272a"}
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
