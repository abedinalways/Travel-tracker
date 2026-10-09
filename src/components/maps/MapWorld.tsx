"use client";

import React, { useState, memo } from "react";
import { WORLD_COUNTRIES } from "@/config/worldCountries";
import { CountryGeoData } from "@/types/map";
import { TravelMemory, TripStatus } from "@/types/trip";
import { useLanguage } from "@/i18n/LanguageContext";

interface MapWorldProps {
  memoriesMap: Record<string, TravelMemory>;
  selectedCountryId?: string | null;
  onSelectCountry: (country: CountryGeoData) => void;
  className?: string;
}

const CountryPath = memo(function CountryPath({
  country,
  status,
  isHovered,
  isSelected,
  onSelect,
  onHover,
  onLeave,
}: {
  country: CountryGeoData;
  status: TripStatus;
  isHovered: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onHover: (e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  let fillClass = "fill-zinc-800/80";
  let strokeClass = "stroke-zinc-700/50";
  let strokeWidth = "0.6";

  if (isSelected) {
    fillClass = "fill-white";
    strokeClass = "stroke-emerald-400";
    strokeWidth = "2";
  } else {
    switch (status) {
      case "visited":
        fillClass = isHovered ? "fill-emerald-400" : "fill-emerald-500/80";
        strokeClass = isHovered ? "stroke-emerald-200" : "stroke-emerald-400/40";
        strokeWidth = isHovered ? "1.5" : "0.8";
        break;
      case "planned":
        fillClass = isHovered ? "fill-amber-400" : "fill-amber-500/80";
        strokeClass = isHovered ? "stroke-amber-200" : "stroke-amber-400/40";
        strokeWidth = isHovered ? "1.5" : "0.8";
        break;
      case "cancelled":
        fillClass = isHovered ? "fill-rose-400" : "fill-rose-500/80";
        strokeClass = isHovered ? "stroke-rose-200" : "stroke-rose-400/40";
        strokeWidth = isHovered ? "1.5" : "0.8";
        break;
      case "bucketlist":
        fillClass = isHovered ? "fill-purple-400" : "fill-purple-500/80";
        strokeClass = isHovered ? "stroke-purple-200" : "stroke-purple-400/40";
        strokeWidth = isHovered ? "1.5" : "0.8";
        break;
      case "never":
      default:
        fillClass = isHovered ? "fill-zinc-600" : "fill-zinc-800/80";
        strokeClass = isHovered ? "stroke-zinc-400" : "stroke-zinc-700/50";
        strokeWidth = isHovered ? "1.2" : "0.6";
        break;
    }
  }

  return (
    <path
      d={country.svgPath}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`cursor-pointer transition-colors duration-150 ${fillClass} ${strokeClass}`}
      strokeWidth={strokeWidth}
    />
  );
});

export function MapWorld({
  memoriesMap,
  selectedCountryId,
  onSelectCountry,
  className = "",
}: MapWorldProps) {
  const { language, t } = useLanguage();
  const [hoveredCountry, setHoveredCountry] = useState<CountryGeoData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const handleCountryHover = (country: CountryGeoData, e: React.MouseEvent) => {
    const container = e.currentTarget.closest(".world-map-wrapper");
    if (container) {
      const rect = container.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredCountry(country);
  };

  return (
    <div className={`world-map-wrapper relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 1000 520"
        className="w-full h-auto max-h-[75vh] transition-transform duration-200"
        style={{ willChange: "transform" }}
      >
        <defs>
          <radialGradient id="worldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1000" height="520" fill="url(#worldGlow)" rx="24" />

        <g>
          {WORLD_COUNTRIES.map((country) => {
            const status = memoriesMap[country.id]?.status || "never";
            const isHovered = hoveredCountry?.id === country.id;
            const isSelected = selectedCountryId === country.id;

            return (
              <CountryPath
                key={country.id}
                country={country}
                status={status}
                isHovered={isHovered}
                isSelected={isSelected}
                onSelect={() => onSelectCountry(country)}
                onHover={(e) => handleCountryHover(country, e)}
                onLeave={() => {
                  setHoveredCountry(null);
                  setTooltipPos(null);
                }}
              />
            );
          })}
        </g>
      </svg>

      {hoveredCountry && tooltipPos && (
        <div
          className="absolute z-30 pointer-events-none px-3 py-2 rounded-xl glass-dropdown border border-zinc-700/80 shadow-xl text-xs transform -translate-x-1/2 -translate-y-full mb-2"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 10}px`,
          }}
        >
          <div className="font-semibold text-white text-sm">
            {language === "bn" ? hoveredCountry.nameBn : hoveredCountry.nameEn}
          </div>
          <div className="mt-1 flex items-center gap-1.5 pt-1 border-t border-zinc-800">
            <span
              className={`w-2 h-2 rounded-full ${
                (memoriesMap[hoveredCountry.id]?.status || "never") === "visited"
                  ? "bg-emerald-500"
                  : (memoriesMap[hoveredCountry.id]?.status || "never") === "planned"
                  ? "bg-amber-500"
                  : (memoriesMap[hoveredCountry.id]?.status || "never") === "cancelled"
                  ? "bg-rose-500"
                  : (memoriesMap[hoveredCountry.id]?.status || "never") === "bucketlist"
                  ? "bg-purple-500"
                  : "bg-zinc-600"
              }`}
            />
            <span className="font-medium text-zinc-200">
              {t.status[memoriesMap[hoveredCountry.id]?.status || "never"]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
