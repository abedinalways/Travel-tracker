"use client";

import React, { useState, useMemo } from "react";
import { MapBangladesh } from "./MapBangladesh";
import { MapWorld } from "./MapWorld";
import { MapLegend } from "./MapLegend";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { DistrictGeoData, CountryGeoData, MapViewMode } from "@/types/map";
import { TravelMemory, TripStatus, TripStats } from "@/types/trip";
import { useLanguage } from "@/i18n/LanguageContext";
import { Search, ZoomIn, ZoomOut, RotateCcw, Globe, MapPin } from "lucide-react";

interface CountryStats {
  totalCountries: number;
  visitedCount: number;
  cancelledCount: number;
  plannedCount: number;
  bucketlistCount: number;
  neverPlannedCount: number;
  visitedRate: number;
}

interface MapContainerProps {
  memoriesMap: Record<string, TravelMemory>;
  stats: TripStats;
  countryStats: CountryStats;
  onSelectDistrict: (district: DistrictGeoData) => void;
  onSelectCountry: (country: CountryGeoData) => void;
  selectedId?: string | null;
}

const DIVISIONS = [
  { en: "Dhaka", bn: "ঢাকা" },
  { en: "Chattogram", bn: "চট্টগ্রাম" },
  { en: "Sylhet", bn: "সিলেট" },
  { en: "Khulna", bn: "খুলনা" },
  { en: "Rajshahi", bn: "রাজশাহী" },
  { en: "Rangpur", bn: "রংপুর" },
  { en: "Barishal", bn: "বরিশাল" },
  { en: "Mymensingh", bn: "ময়মনসিংহ" },
];

export function MapContainer({
  memoriesMap,
  stats,
  countryStats,
  onSelectDistrict,
  onSelectCountry,
  selectedId,
}: MapContainerProps) {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<MapViewMode>("bangladesh");
  const [activeStatusFilter, setActiveStatusFilter] = useState<TripStatus | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);

  // Search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || viewMode !== "bangladesh") return [];
    const q = searchQuery.toLowerCase().trim();
    return BANGLADESH_DISTRICTS.filter(
      (d) =>
        d.nameEn.toLowerCase().includes(q) ||
        d.nameBn.includes(q) ||
        d.divisionEn.toLowerCase().includes(q) ||
        d.divisionBn.includes(q)
    ).slice(0, 8);
  }, [searchQuery, viewMode]);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Top Map Toolbar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl glass-card border border-zinc-800">
          <button
            type="button"
            onClick={() => setViewMode("bangladesh")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === "bangladesh"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{t.nav.bangladesh}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("world")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === "world"
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>{t.nav.world}</span>
          </button>
        </div>

        {/* Search Bar & Zoom Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {viewMode === "bangladesh" && (
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.common.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />

              {/* Autocomplete Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-xl glass-dropdown border border-zinc-800 z-50 shadow-2xl max-h-60 overflow-y-auto">
                  {searchResults.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        onSelectDistrict(d);
                        setSearchQuery("");
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800/70 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="font-medium">
                        {language === "bn" ? d.nameBn : d.nameEn}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {language === "bn" ? d.divisionBn : d.divisionEn}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Zoom Actions */}
          <div className="flex items-center gap-1 p-1 rounded-xl glass-card border border-zinc-800">
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Reset Zoom"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Division Filter Pills (BD View Only) */}
      {viewMode === "bangladesh" && (
        <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
          <button
            type="button"
            onClick={() => setSelectedDivision(null)}
            className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
              selectedDivision === null
                ? "bg-zinc-800 text-white border border-zinc-700"
                : "bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {t.common.allDivisions}
          </button>
          {DIVISIONS.map((div) => (
            <button
              key={div.en}
              type="button"
              onClick={() =>
                setSelectedDivision(selectedDivision === div.en ? null : div.en)
              }
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                selectedDivision === div.en
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {language === "bn" ? div.bn : div.en}
            </button>
          ))}
        </div>
      )}

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full rounded-3xl glass-panel p-3 sm:p-6 overflow-hidden flex items-center justify-center min-h-[500px] border border-zinc-800/80 shadow-2xl">
        <div
          className="w-full flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {viewMode === "bangladesh" ? (
            <MapBangladesh
              memoriesMap={memoriesMap}
              selectedDistrictId={selectedId}
              onSelectDistrict={onSelectDistrict}
              activeFilter={activeStatusFilter}
              highlightDivision={selectedDivision}
            />
          ) : (
            <MapWorld
              memoriesMap={memoriesMap}
              selectedCountryId={selectedId}
              onSelectCountry={onSelectCountry}
            />
          )}
        </div>
      </div>

      {/* Status Legend */}
      <div className="w-full mt-4">
        <MapLegend
          counts={
            viewMode === "world"
              ? {
                  visited: countryStats.visitedCount,
                  planned: countryStats.plannedCount,
                  cancelled: countryStats.cancelledCount,
                  bucketlist: countryStats.bucketlistCount,
                  never: countryStats.neverPlannedCount,
                }
              : {
                  visited: stats.visitedCount,
                  planned: stats.plannedCount,
                  cancelled: stats.cancelledCount,
                  bucketlist: stats.bucketlistCount,
                  never: stats.neverPlannedCount,
                }
          }
          activeFilter={activeStatusFilter}
          onFilterChange={setActiveStatusFilter}
        />
      </div>
    </div>
  );
}
