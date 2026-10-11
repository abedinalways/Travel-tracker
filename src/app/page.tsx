"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsBanner } from "@/components/layout/StatsBanner";
import { MapContainer } from "@/components/maps/MapContainer";
import { DistrictDrawer } from "@/components/drawer/DistrictDrawer";
import { ShareModal } from "@/components/share/ShareModal";
import { BackupRestoreModal } from "@/components/settings/BackupRestoreModal";
import { RoastModal } from "@/components/fun/RoastModal";
import { useTripStorage } from "@/hooks/useTripStorage";
import { DistrictGeoData, CountryGeoData } from "@/types/map";
import { useLanguage } from "@/i18n/LanguageContext";
import { HeartIcon, SparklesIconComp } from "@/components/ui/icons";

export default function HomePage() {
  const { language, t } = useLanguage();
  const {
    memoriesMap,
    stats,
    countryStats,
    nickname,
    saveMemory,
    deleteMemory,
    setNickname,
    exportBackup,
    restoreBackup,
    resetAll,
  } = useTripStorage();

  const [selectedItem, setSelectedItem] = useState<
    DistrictGeoData | CountryGeoData | null
  >(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [isRoastOpen, setIsRoastOpen] = useState(false);
  const [memeIndex, setMemeIndex] = useState(0);

  const handleShuffleMeme = () => {
    setMemeIndex((prev) => (prev + 1) % (t.funQuotes?.length || 1));
  };

  const handleSelectDistrict = (district: DistrictGeoData) => {
    setSelectedItem(district);
    setIsDrawerOpen(true);
  };

  const handleSelectCountry = (country: CountryGeoData) => {
    setSelectedItem(country);
    setIsDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#09090b] text-zinc-100 font-sans">
      <div className="bg-ambient" />
      {/* Top Header */}
      <Header
        onOpenShare={() => setIsShareOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
        onOpenRoast={() => setIsRoastOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7 flex flex-col">
        {/* Interactive Travel Truth / Meme Ticker */}
        <div className="mb-6 p-3 sm:p-4 rounded-3xl bg-gradient-to-r from-amber-500/15 via-zinc-900/90 to-rose-500/15 border-2 border-amber-500/30 flex items-center justify-between gap-3 shadow-[0_4px_25px_rgba(245,158,11,0.12)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl sm:text-2xl shrink-0">😂</span>
            <p className="text-xs sm:text-sm font-semibold text-amber-200/95 italic truncate sm:whitespace-normal">
              {t.funQuotes?.[memeIndex % t.funQuotes.length]}
            </p>
          </div>
          <button
            type="button"
            onClick={handleShuffleMeme}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 border border-amber-500/35 text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            title={t.hero.shuffleMeme}
          >
            <SparklesIconComp size={14} className="text-amber-300" />
            <span className="hidden sm:inline">{t.hero.shuffleMeme}</span>
          </button>
        </div>

        {/* Hero Title & Subtagline */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2 shadow-sm">
              <SparklesIconComp size={14} className="text-emerald-400" />
              <span>{t.subTagline}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {t.hero.title}
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-zinc-300/90 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Roast Me Button */}
            <button
              type="button"
              onClick={() => setIsRoastOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <span>💀</span>
              <span>আমারে রোস্ট করো!</span>
            </button>
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer active:scale-95"
            >
              <span>{t.hero.ctaShare}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsBackupOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card hover:border-zinc-500 text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <span>{t.hero.ctaBackup}</span>
            </button>
          </div>
        </div>

        {/* Playful Flake-O-Meter / ড্রপ মিটার */}
        <div className="mb-6 p-4 sm:p-5 rounded-3xl glass-card-interactive border border-rose-500/25 bg-gradient-to-r from-rose-950/20 via-zinc-900/90 to-amber-950/20 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {stats.cancellationRate >= 60 ? "💀" : stats.cancellationRate >= 30 ? "🤡" : stats.visitedCount > 5 ? "✈️" : "🌱"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                    {language === "bn" ? "ড্রপ মিটার (Flake-O-Meter)" : "Flake-O-Meter"}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    {stats.cancellationRate}% {language === "bn" ? "ধোঁকা রেট" : "Drop Rate"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1">
                  {stats.visitedCount + stats.cancelledCount === 0
                    ? (language === "bn" ? "এখনও খাতা খোলা হয়নি! কোনো জেলার ওপর ক্লিক করে স্ট্যাটাস সেভ করুন।" : "Clean slate! Click any district on the map or list to start.")
                    : stats.cancellationRate >= 60
                    ? (language === "bn" ? "বিপদজনক ড্রপার! আপনার সাথে ট্যুরের প্ল্যান করার আগে বন্ধুদের রোজা বা মানত করতে হয়।" : "Dangerously Flaky! Friends prepare for heartbreak before planning with you.")
                    : stats.cancellationRate >= 30
                    ? (language === "bn" ? "মাঝারি ড্রপার! সব ঠিক থাকে, কিন্তু শেষ রাতে রহস্যময় পেট ব্যথায় কাহিল।" : "Mild Flaker! Everything looks great until mystery stomach ache strikes the night before.")
                    : (language === "bn" ? "আসল যাযাবর! প্ল্যান করলে ব্যাগ গুছিয়ে ঠিকই রওয়ানা দিয়ে দেন।" : "Authentic Nomad! When you plan, you actually pack up and hit the road.")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setIsRoastOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border border-rose-500/35 text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-sm"
              >
                <span>💀</span>
                <span>{language === "bn" ? "রোস্ট কার্ড দেখুন" : "View Roast"}</span>
              </button>
            </div>
          </div>

          {/* Segmented Risk Gauge Meter */}
          <div className="mt-4 pt-3.5 border-t border-white/5">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1.5 px-0.5">
              <span className="text-emerald-400 font-semibold">🟢 0% বিশ্বস্ত</span>
              <span className="text-amber-400 font-semibold">🟡 30% দ্বিধাদ্বন্দ্ব</span>
              <span className="text-orange-400 font-semibold">🟠 60% অজুহাতবাজ</span>
              <span className="text-rose-400 font-semibold">🔴 100% চরম ধোঁকা</span>
            </div>
            <div className="relative w-full h-3 rounded-full bg-zinc-800/90 overflow-hidden p-0.5 ring-1 ring-white/10">
              <div className="grid grid-cols-4 w-full h-full rounded-full overflow-hidden gap-0.5 opacity-90">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" />
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full" />
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full" />
                <div className="bg-gradient-to-r from-orange-500 to-rose-600 h-full" />
              </div>
              {/* Dynamic Indicator Pin */}
              <div
                className="absolute top-0 bottom-0 w-2.5 -ml-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)] ring-2 ring-black transition-all duration-700"
                style={{ left: `${Math.min(Math.max(stats.cancellationRate, 2), 98)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live Stats Metric Banner */}
        <StatsBanner
          stats={stats}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* Interactive Map Section */}
        <div className="flex-1 w-full">
          <MapContainer
            memoriesMap={memoriesMap}
            stats={stats}
            countryStats={countryStats}
            onSelectDistrict={handleSelectDistrict}
            onSelectCountry={handleSelectCountry}
            selectedId={selectedItem?.id}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/80 py-8 mt-12 bg-zinc-950/60 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-zinc-200 font-bold">DropTrip</span>
              <span className="text-zinc-500">•</span>
              <span className="text-emerald-400 font-semibold">
                CancelTour & Beyond 🇧🇩
              </span>
            </div>
            <p className="text-zinc-500 text-center sm:text-left">
              {t.footer.brandTagline}
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span>{t.footer.madeWith}</span>
              <HeartIcon size={14} className="text-rose-500 fill-rose-500" />
            </div>
            <p className="text-emerald-500/70 text-center sm:text-right">
              {t.footer.privacyNote}
            </p>
            <p className="text-zinc-600">
              © DropTrip — {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* District / Region Status Drawer */}
      <DistrictDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        existingMemory={selectedItem ? memoriesMap[selectedItem.id] : undefined}
        onSave={saveMemory}
        onDelete={deleteMemory}
      />

      {/* Social Story Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        stats={stats}
        memoriesMap={memoriesMap}
        nickname={nickname}
        onUpdateNickname={setNickname}
      />

      {/* JSON Backup & Restore Modal */}
      <BackupRestoreModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        onExport={exportBackup}
        onRestore={restoreBackup}
        onResetAll={resetAll}
      />

      {/* Funny Roast Modal */}
      <RoastModal
        isOpen={isRoastOpen}
        onClose={() => setIsRoastOpen(false)}
        stats={stats}
        nickname={nickname}
      />
    </div>
  );
}
