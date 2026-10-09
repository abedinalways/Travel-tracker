"use client";

import React, { useState } from "react";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { DistrictGeoData } from "@/types/map";
import { TravelMemory, TripStatus } from "@/types/trip";
import { useLanguage } from "@/i18n/LanguageContext";

interface MapBangladeshProps {
  memoriesMap: Record<string, TravelMemory>;
  selectedDistrictId?: string | null;
  onSelectDistrict: (district: DistrictGeoData) => void;
  activeFilter?: TripStatus | null;
  highlightDivision?: string | null;
  className?: string;
}

export function MapBangladesh({
  memoriesMap,
  selectedDistrictId,
  onSelectDistrict,
  activeFilter,
  highlightDivision,
  className = "",
}: MapBangladeshProps) {
  const { language, t } = useLanguage();
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictGeoData | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const getDistrictStatus = (id: string): TripStatus => {
    return memoriesMap[id]?.status || "never";
  };

  const getStatusColor = (status: TripStatus, isHovered: boolean, isSelected: boolean) => {
    if (isSelected) {
      return "fill-white stroke-emerald-400 stroke-[3] filter drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]";
    }

    switch (status) {
      case "visited":
        return isHovered
          ? "fill-emerald-400 stroke-emerald-200 stroke-[2] filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
          : "fill-emerald-500/80 stroke-emerald-400/50 stroke-[1.2]";
      case "planned":
        return isHovered
          ? "fill-amber-400 stroke-amber-200 stroke-[2] filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
          : "fill-amber-500/80 stroke-amber-400/50 stroke-[1.2]";
      case "cancelled":
        return isHovered
          ? "fill-rose-400 stroke-rose-200 stroke-[2] filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
          : "fill-rose-500/80 stroke-rose-400/50 stroke-[1.2]";
      case "bucketlist":
        return isHovered
          ? "fill-purple-400 stroke-purple-200 stroke-[2] filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
          : "fill-purple-500/80 stroke-purple-400/50 stroke-[1.2]";
      case "never":
      default:
        return isHovered
          ? "fill-zinc-600 stroke-zinc-400 stroke-[1.8]"
          : "fill-zinc-800/85 stroke-zinc-700/60 stroke-[1]";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 1000"
        className="w-full h-auto max-h-[82vh] transition-transform duration-300 drop-shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredDistrict(null)}
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="1000" fill="url(#mapGlow)" rx="24" />

        <g className="cursor-pointer">
          {BANGLADESH_DISTRICTS.map((district) => {
            const status = getDistrictStatus(district.id);
            const isHovered = hoveredDistrict?.id === district.id;
            const isSelected = selectedDistrictId === district.id;

            // Opacity dimming if filtered
            let opacity = 1;
            if (activeFilter && status !== activeFilter) {
              opacity = 0.25;
            }
            if (highlightDivision && district.divisionEn !== highlightDivision) {
              opacity = Math.min(opacity, 0.2);
            }

            return (
              <g
                key={district.id}
                onClick={() => onSelectDistrict(district)}
                onMouseEnter={() => setHoveredDistrict(district)}
                className="transition-all duration-200"
                style={{ opacity }}
              >
                <path
                  d={district.svgPath}
                  className={`transition-colors duration-200 ${getStatusColor(
                    status,
                    isHovered,
                    isSelected
                  )}`}
                />
                {district.center && (
                  <text
                    x={district.center[0]}
                    y={district.center[1]}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[9px] font-medium fill-zinc-300 pointer-events-none select-none tracking-tight opacity-75"
                  >
                    {language === "bn" ? district.nameBn : district.nameEn}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredDistrict && (
        <div
          className="absolute z-30 pointer-events-none px-3 py-2 rounded-xl glass-dropdown border border-zinc-700/80 shadow-2xl transition-opacity duration-150 text-xs transform -translate-x-1/2 -translate-y-full mb-2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 12}px`,
          }}
        >
          <div className="font-semibold text-white text-sm">
            {language === "bn" ? hoveredDistrict.nameBn : hoveredDistrict.nameEn}
          </div>
          <div className="text-[11px] text-zinc-400">
            {language === "bn" ? hoveredDistrict.divisionBn : hoveredDistrict.divisionEn} বিভাগ
          </div>
          <div className="mt-1 flex items-center gap-1.5 pt-1 border-t border-zinc-800">
            <span
              className={`w-2 h-2 rounded-full ${
                getDistrictStatus(hoveredDistrict.id) === "visited"
                  ? "bg-emerald-500"
                  : getDistrictStatus(hoveredDistrict.id) === "planned"
                  ? "bg-amber-500"
                  : getDistrictStatus(hoveredDistrict.id) === "cancelled"
                  ? "bg-rose-500"
                  : getDistrictStatus(hoveredDistrict.id) === "bucketlist"
                  ? "bg-purple-500"
                  : "bg-zinc-600"
              }`}
            />
            <span className="font-medium text-zinc-200">
              {t.status[getDistrictStatus(hoveredDistrict.id)]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
