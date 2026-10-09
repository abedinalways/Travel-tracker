"use client";

import React, { useState } from "react";
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

export function MapWorld({
  memoriesMap,
  selectedCountryId,
  onSelectCountry,
  className = "",
}: MapWorldProps) {
  const { language, t } = useLanguage();
  const [hoveredCountry, setHoveredCountry] = useState<CountryGeoData | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const getCountryStatus = (id: string): TripStatus => {
    return memoriesMap[id]?.status || "never";
  };

  const getStatusColor = (status: TripStatus, isHovered: boolean, isSelected: boolean) => {
    if (isSelected) {
      return "fill-white stroke-emerald-400 stroke-[2] filter drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]";
    }

    switch (status) {
      case "visited":
        return isHovered
          ? "fill-emerald-400 stroke-emerald-200 stroke-[1.5]"
          : "fill-emerald-500/80 stroke-emerald-400/40 stroke-[0.8]";
      case "planned":
        return isHovered
          ? "fill-amber-400 stroke-amber-200 stroke-[1.5]"
          : "fill-amber-500/80 stroke-amber-400/40 stroke-[0.8]";
      case "cancelled":
        return isHovered
          ? "fill-rose-400 stroke-rose-200 stroke-[1.5]"
          : "fill-rose-500/80 stroke-rose-400/40 stroke-[0.8]";
      case "bucketlist":
        return isHovered
          ? "fill-purple-400 stroke-purple-200 stroke-[1.5]"
          : "fill-purple-500/80 stroke-purple-400/40 stroke-[0.8]";
      case "never":
      default:
        return isHovered
          ? "fill-zinc-600 stroke-zinc-400 stroke-[1.2]"
          : "fill-zinc-800/80 stroke-zinc-700/50 stroke-[0.6]";
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
        viewBox="0 0 1000 520"
        className="w-full h-auto max-h-[75vh] transition-transform duration-300 drop-shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCountry(null)}
      >
        <defs>
          <radialGradient id="worldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1000" height="520" fill="url(#worldGlow)" rx="24" />

        <g className="cursor-pointer">
          {WORLD_COUNTRIES.map((country) => {
            const status = getCountryStatus(country.id);
            const isHovered = hoveredCountry?.id === country.id;
            const isSelected = selectedCountryId === country.id;

            return (
              <path
                key={country.id}
                d={country.svgPath}
                onClick={() => onSelectCountry(country)}
                onMouseEnter={() => setHoveredCountry(country)}
                className={`transition-colors duration-150 ${getStatusColor(
                  status,
                  isHovered,
                  isSelected
                )}`}
              />
            );
          })}
        </g>
      </svg>

      {hoveredCountry && (
        <div
          className="absolute z-30 pointer-events-none px-3 py-2 rounded-xl glass-dropdown border border-zinc-700/80 shadow-2xl transition-opacity duration-150 text-xs transform -translate-x-1/2 -translate-y-full mb-2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 12}px`,
          }}
        >
          <div className="font-semibold text-white text-sm">
            {language === "bn" ? hoveredCountry.nameBn : hoveredCountry.nameEn}
          </div>
          <div className="mt-1 flex items-center gap-1.5 pt-1 border-t border-zinc-800">
            <span
              className={`w-2 h-2 rounded-full ${
                getCountryStatus(hoveredCountry.id) === "visited"
                  ? "bg-emerald-500"
                  : getCountryStatus(hoveredCountry.id) === "planned"
                  ? "bg-amber-500"
                  : getCountryStatus(hoveredCountry.id) === "cancelled"
                  ? "bg-rose-500"
                  : getCountryStatus(hoveredCountry.id) === "bucketlist"
                  ? "bg-purple-500"
                  : "bg-zinc-600"
              }`}
            />
            <span className="font-medium text-zinc-200">
              {t.status[getCountryStatus(hoveredCountry.id)]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
