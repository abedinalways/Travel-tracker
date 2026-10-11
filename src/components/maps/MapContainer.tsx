"use client";

import React, { useState, useMemo } from "react";
import { MapBangladesh } from "./MapBangladesh";
import { MapWorld } from "./MapWorld";
import { MapLegend } from "./MapLegend";
import { BANGLADESH_DISTRICTS } from "@/config/bangladeshDistricts";
import { DistrictGeoData, CountryGeoData, MapViewMode } from "@/types/map";
import { TravelMemory, TripStatus, TripStats } from "@/types/trip";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  SearchIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ResetIcon,
  GlobeIcon,
  MapPinIcon,
} from "@/components/ui/icons";

import { getDistrictRoast } from "@/config/districtRoasts";

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

const VIRAL_HOTSPOTS = [
  { id: "coxs_bazar", labelBn: "কক্সবাজার ও সেন্টমার্টিন 🏖️", labelEn: "Cox's Bazar 🏖️" },
  { id: "khagrachhari", labelBn: "সাজেক ভ্যালি 🌲", labelEn: "Sajek Valley 🌲" },
  { id: "bandarban", labelBn: "বান্দরবান নীলাচল 🏔️", labelEn: "Bandarban 🏔️" },
  { id: "sylhet", labelBn: "সিলেট রাতারগুল 🍋", labelEn: "Sylhet 🍋" },
  { id: "moulvibazar", labelBn: "শ্রীমঙ্গল চা বাগান 🍃", labelEn: "Sreemangal 🍃" },
  { id: "patuakhali", labelBn: "কুয়াকাটা সৈকত 🌅", labelEn: "Kuakata 🌅" },
  { id: "bagerhat", labelBn: "সুন্দরবন 🐅", labelEn: "Sundarbans 🐅" },
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
  const [displayMode, setDisplayMode] = useState<"map" | "grid">("map");
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

  // Grid view filtered districts
  const gridDistricts = useMemo(() => {
    return BANGLADESH_DISTRICTS.filter((d) => {
      if (selectedDivision && d.divisionEn !== selectedDivision) return false;
      if (activeStatusFilter) {
        const s = memoriesMap[d.id]?.status || "never";
        if (s !== activeStatusFilter) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          d.nameEn.toLowerCase().includes(q) ||
          d.nameBn.includes(q) ||
          d.divisionEn.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDivision, activeStatusFilter, searchQuery, memoriesMap]);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const handleHotspotClick = (districtId: string) => {
    const found = BANGLADESH_DISTRICTS.find((d) => d.id === districtId);
    if (found) onSelectDistrict(found);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Top Map Toolbar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        {/* View Switcher Tabs & Mode Switch */}
        <div className="flex flex-wrap items-center gap-2">
          {/* BD vs World */}
          <div className="flex items-center p-1 rounded-2xl glass-card border border-zinc-800">
            <button
              type="button"
              onClick={() => setViewMode("bangladesh")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "bangladesh"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <MapPinIcon size={16} className="text-emerald-400" />
              <span>{t.nav.bangladesh}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("world")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "world"
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <GlobeIcon size={16} className="text-sky-400" />
              <span>{t.nav.world}</span>
            </button>
          </div>

          {/* Map vs Grid Toggle (Only for BD) */}
          {viewMode === "bangladesh" && (
            <div className="flex items-center p-1 rounded-2xl glass-card border border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => setDisplayMode("map")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  displayMode === "map"
                    ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                🗺️ {language === "bn" ? "মানচিত্র" : "Map"}
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode("grid")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  displayMode === "grid"
                    ? "bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                📋 {language === "bn" ? "জেলা কার্ড" : "Districts"}
              </button>
            </div>
          )}
        </div>

        {/* Search Bar & Zoom Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {viewMode === "bangladesh" && (
            <div className="relative flex-1 md:w-64">
              <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "bn" ? "কোথায় ড্রপ দেবেন? যেমন: সাজেক..." : t.common.searchPlaceholder}
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
                      <span className="font-semibold text-white">
                        {language === "bn" ? d.nameBn : d.nameEn}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {language === "bn" ? d.divisionBn : d.divisionEn} বিভাগ
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Zoom Actions (Only on Map view) */}
          {displayMode === "map" && (
            <div className="flex items-center gap-1 p-1 rounded-xl glass-card border border-zinc-800">
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ZoomInIcon size={16} />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ZoomOutIcon size={16} />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset Zoom"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ResetIcon size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Viral Hotspots Bar (BD View) */}
      {viewMode === "bangladesh" && (
        <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-2 text-xs">
          <span className="shrink-0 text-amber-400 font-bold flex items-center gap-1 text-[11px] pr-1">
            🔥 {language === "bn" ? "ভাইরাল স্পট:" : "Hotspots:"}
          </span>
          {VIRAL_HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              type="button"
              onClick={() => handleHotspotClick(spot.id)}
              className="px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border border-amber-500/25 shrink-0 transition-all cursor-pointer font-medium text-[11px] hover:scale-105 active:scale-95"
            >
              {language === "bn" ? spot.labelBn : spot.labelEn}
            </button>
          ))}
        </div>
      )}

      {/* Division Filter Pills (BD View Only) */}
      {viewMode === "bangladesh" && (
        <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
          <button
            type="button"
            onClick={() => setSelectedDivision(null)}
            className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedDivision === null
                ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
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
              className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                selectedDivision === div.en
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {language === "bn" ? div.bn : div.en}
            </button>
          ))}
        </div>
      )}

      {/* Main Container: Map or District Grid */}
      {displayMode === "map" || viewMode === "world" ? (
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
      ) : (
        /* District Grid View: Playful & Super User-Friendly */
        <div className="w-full rounded-3xl glass-panel p-4 sm:p-6 border border-zinc-800/80 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs sm:text-sm font-bold text-zinc-300 flex items-center gap-2">
              <span>📋 {language === "bn" ? "জেলার তালিকা" : "Districts Ledger"}</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[11px] font-mono text-zinc-400">
                {gridDistricts.length} {t.common.districtsCount}
              </span>
            </div>
            <span className="text-[11px] text-zinc-500">
              {language === "bn" ? "যেকোনো জেলায় ক্লিক করে স্ট্যাটাস সেভ করুন" : "Click any district to set status"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[620px] overflow-y-auto pr-1">
            {gridDistricts.map((d) => {
              const memory = memoriesMap[d.id];
              const status = memory?.status || "never";
              const roast = getDistrictRoast(d.id);

              let badgeBg = "bg-zinc-800 text-zinc-400 border-zinc-700";
              let cardBorder = "border-zinc-800 hover:border-zinc-600";
              if (status === "visited") {
                badgeBg = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
                cardBorder = "border-emerald-500/40 bg-emerald-950/10 hover:border-emerald-400";
              } else if (status === "planned") {
                badgeBg = "bg-amber-500/20 text-amber-300 border-amber-500/40";
                cardBorder = "border-amber-500/40 bg-amber-950/10 hover:border-amber-400";
              } else if (status === "cancelled") {
                badgeBg = "bg-rose-500/20 text-rose-300 border-rose-500/40";
                cardBorder = "border-rose-500/40 bg-rose-950/10 hover:border-rose-400";
              } else if (status === "bucketlist") {
                badgeBg = "bg-purple-500/20 text-purple-300 border-purple-500/40";
                cardBorder = "border-purple-500/40 bg-purple-950/10 hover:border-purple-400";
              }

              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onSelectDistrict(d)}
                  className={`p-3.5 rounded-2xl glass-card-interactive border text-left flex flex-col justify-between transition-all cursor-pointer group ${cardBorder}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {language === "bn" ? d.nameBn : d.nameEn}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {language === "bn" ? d.divisionBn : d.divisionEn} বিভাগ
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badgeBg}`}>
                      {t.status[status]}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-400/90 leading-snug line-clamp-2 italic">
                    💡 {language === "bn" ? roast.roastBn : roast.roastEn}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

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
