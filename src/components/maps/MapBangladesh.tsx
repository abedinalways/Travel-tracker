"use client";

import React, { useState, memo } from "react";
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

const DistrictPath = memo(function DistrictPath({
  district,
  status,
  isHovered,
  isSelected,
  opacity,
  language,
  onSelect,
  onHover,
  onLeave,
}: {
  district: DistrictGeoData;
  status: TripStatus;
  isHovered: boolean;
  isSelected: boolean;
  opacity: number;
  language: string;
  onSelect: () => void;
  onHover: (e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  let fillClass = "fill-zinc-800/90";
  let strokeClass = "stroke-zinc-700/60";
  let strokeWidth = "1";

  if (isSelected) {
    fillClass = "fill-white";
    strokeClass = "stroke-emerald-400";
    strokeWidth = "2.5";
  } else {
    switch (status) {
      case "visited":
        fillClass = isHovered ? "fill-emerald-400" : "fill-emerald-500/80";
        strokeClass = isHovered ? "stroke-emerald-200" : "stroke-emerald-400/50";
        strokeWidth = isHovered ? "2" : "1.2";
        break;
      case "planned":
        fillClass = isHovered ? "fill-amber-400" : "fill-amber-500/80";
        strokeClass = isHovered ? "stroke-amber-200" : "stroke-amber-400/50";
        strokeWidth = isHovered ? "2" : "1.2";
        break;
      case "cancelled":
        fillClass = isHovered ? "fill-rose-400" : "fill-rose-500/80";
        strokeClass = isHovered ? "stroke-rose-200" : "stroke-rose-400/50";
        strokeWidth = isHovered ? "2" : "1.2";
        break;
      case "bucketlist":
        fillClass = isHovered ? "fill-purple-400" : "fill-purple-500/80";
        strokeClass = isHovered ? "stroke-purple-200" : "stroke-purple-400/50";
        strokeWidth = isHovered ? "2" : "1.2";
        break;
      case "never":
      default:
        fillClass = isHovered ? "fill-zinc-600" : "fill-zinc-800/85";
        strokeClass = isHovered ? "stroke-zinc-400" : "stroke-zinc-700/60";
        strokeWidth = isHovered ? "1.8" : "1";
        break;
    }
  }

  return (
    <g
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="button"
      tabIndex={0}
      aria-label={`${language === "bn" ? district.nameBn : district.nameEn} — ${status}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:stroke-emerald-400"
      style={{ opacity }}
    >
      <path
        d={district.svgPath}
        className={`${fillClass} ${strokeClass}`}
        strokeWidth={strokeWidth}
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
});

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
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const handleDistrictHover = (district: DistrictGeoData, e: React.MouseEvent) => {
    const container = e.currentTarget.closest(
      ".map-container-wrapper"
    ) as HTMLElement | null;
    if (container) {
      const rect = container.getBoundingClientRect();
      // The wrapper is CSS-scaled by the parent (zoom). getBoundingClientRect
      // returns scaled pixels, but the tooltip is positioned in the wrapper's
      // local coordinate space, so divide out the scale factor.
      const scaleX = rect.width / container.offsetWidth || 1;
      const scaleY = rect.height / container.offsetHeight || 1;
      setTooltipPos({
        x: (e.clientX - rect.left) / scaleX,
        y: (e.clientY - rect.top) / scaleY,
      });
    }
    setHoveredDistrict(district);
  };

  return (
    <div className={`map-container-wrapper relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 1000"
        className="w-full h-auto max-h-[80vh] transition-transform duration-200"
        style={{ willChange: "transform" }}
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="1000" fill="url(#mapGlow)" rx="24" />

        <g>
          {BANGLADESH_DISTRICTS.map((district) => {
            const status = memoriesMap[district.id]?.status || "never";
            const isHovered = hoveredDistrict?.id === district.id;
            const isSelected = selectedDistrictId === district.id;

            let opacity = 1;
            if (activeFilter && status !== activeFilter) {
              opacity = 0.25;
            }
            if (highlightDivision && district.divisionEn !== highlightDivision) {
              opacity = Math.min(opacity, 0.2);
            }

            return (
              <DistrictPath
                key={district.id}
                district={district}
                status={status}
                isHovered={isHovered}
                isSelected={isSelected}
                opacity={opacity}
                language={language}
                onSelect={() => onSelectDistrict(district)}
                onHover={(e) => handleDistrictHover(district, e)}
                onLeave={() => {
                  setHoveredDistrict(null);
                  setTooltipPos(null);
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredDistrict && tooltipPos && (
        <div
          className="absolute z-30 pointer-events-none px-3 py-2 rounded-xl glass-dropdown border border-zinc-700/80 shadow-xl text-xs transform -translate-x-1/2 -translate-y-full mb-2"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 10}px`,
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
                (memoriesMap[hoveredDistrict.id]?.status || "never") === "visited"
                  ? "bg-emerald-500"
                  : (memoriesMap[hoveredDistrict.id]?.status || "never") === "planned"
                  ? "bg-amber-500"
                  : (memoriesMap[hoveredDistrict.id]?.status || "never") === "cancelled"
                  ? "bg-rose-500"
                  : (memoriesMap[hoveredDistrict.id]?.status || "never") === "bucketlist"
                  ? "bg-purple-500"
                  : "bg-zinc-600"
              }`}
            />
            <span className="font-medium text-zinc-200">
              {t.status[memoriesMap[hoveredDistrict.id]?.status || "never"]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
