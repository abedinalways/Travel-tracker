"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsBanner } from "@/components/layout/StatsBanner";
import { MapContainer } from "@/components/maps/MapContainer";
import { DistrictDrawer } from "@/components/drawer/DistrictDrawer";
import { ShareModal } from "@/components/share/ShareModal";
import { BackupRestoreModal } from "@/components/settings/BackupRestoreModal";
import { RoastModal } from "@/components/fun/RoastModal";
import { AnimatedCompass } from "@/components/fun/AnimatedCompass";
import { BudgetRealityModal } from "@/components/fun/BudgetRealityModal";
import { PackingChecklistModal } from "@/components/fun/PackingChecklistModal";
import { TourCalculatorModal } from "@/components/fun/TourCalculatorModal";
import { Footer } from "@/components/layout/Footer";
import { useTripStorage } from "@/hooks/useTripStorage";
import { DistrictGeoData, CountryGeoData } from "@/types/map";
import { useLanguage } from "@/i18n/LanguageContext";
import { SparklesIconComp } from "@/components/ui/icons";

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
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isPackingOpen, setIsPackingOpen] = useState(false);
  const [isTourCalculatorOpen, setIsTourCalculatorOpen] = useState(false);
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
    <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans">
      <div className="bg-ambient" />
      {/* Top Header */}
      <Header
        onOpenShare={() => setIsShareOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
        onOpenRoast={() => setIsRoastOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7 flex flex-col">
        {/* Interactive Travel Truth / Meme Ticker (Clean 2-color minimalist) */}
        <div className="mb-5 p-3 rounded-sm bg-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
            <span className="text-lg sm:text-xl shrink-0">😂</span>
            <p className="text-xs sm:text-sm font-semibold text-card-foreground italic leading-snug break-words">
              {t.funQuotes?.[memeIndex % t.funQuotes.length]}
            </p>
          </div>
          <button
            type="button"
            onClick={handleShuffleMeme}
            className="self-end sm:self-auto shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-secondary hover:border-primary/50 text-card-foreground border border-border text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            title={t.hero.shuffleMeme}
          >
            <SparklesIconComp size={13} className="text-primary" />
            <span>{t.hero.shuffleMeme}</span>
          </button>
        </div>

        {/* Hero Section: Title + Action Buttons + Animated Compass */}
        <div className="mb-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary border border-border text-primary text-xs font-bold mb-2 shadow-sm">
              <SparklesIconComp size={13} className="text-emerald-400" />
              <span>{t.subTagline}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {t.hero.title}
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-zinc-300/90 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {/* Tour Expense Calculator (Primary CTA) */}
              <button
                type="button"
                onClick={() => setIsTourCalculatorOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <span>🧮</span>
                <span>{language === "bn" ? "ট্যুর ক্যালকুলেটর" : "Tour Calculator"}</span>
              </button>

              {/* Share Card Button */}
              <button
                type="button"
                onClick={() => setIsShareOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <span>{t.hero.ctaShare}</span>
              </button>

              {/* Roast Me Button (Secondary Card Button) */}
              <button
                type="button"
                onClick={() => setIsRoastOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 border border-border text-xs font-semibold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <span>💀</span>
                <span>{language === "bn" ? "রোস্ট মি" : "Roast Me"}</span>
              </button>

              {/* Budget vs Reality Calculator Button */}
              <button
                type="button"
                onClick={() => setIsBudgetOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 border border-border text-xs font-semibold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <span>💸</span>
                <span>{language === "bn" ? "বাজেট vs বাস্তবতা" : "Budget vs Reality"}</span>
              </button>

              {/* Forgettable Packing Checklist Button */}
              <button
                type="button"
                onClick={() => setIsPackingOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 border border-border text-xs font-semibold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <span>🎒</span>
                <span>{language === "bn" ? "প্যাকিং চেকলিস্ট" : "Packing List"}</span>
              </button>

              {/* Backup Trigger */}
              <button
                type="button"
                onClick={() => setIsBackupOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 border border-border text-xs font-semibold transition-all cursor-pointer"
              >
                <span>{t.hero.ctaBackup}</span>
              </button>
            </div>
          </div>

          {/* Animated Compass Widget in Hero */}
          <div className="lg:col-span-5 xl:col-span-4 w-full">
            <AnimatedCompass />
          </div>
        </div>

        {/* Playful Flake-O-Meter / ড্রপ মিটার (Clean 2-color minimalist) */}
        <div className="mb-5 p-3.5 sm:p-4 rounded-sm bg-card border border-border shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 rounded-sm bg-secondary border border-border flex items-center justify-center text-2xl shrink-0">
                {stats.cancellationRate >= 60 ? "💀" : stats.cancellationRate >= 30 ? "🤡" : stats.visitedCount > 5 ? "✈️" : "🌱"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-primary">
                    {language === "bn" ? "ড্রপ মিটার (Flake-O-Meter)" : "Flake-O-Meter"}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-secondary text-primary border border-border">
                    {stats.cancellationRate}% {language === "bn" ? "ধোঁকা রেট" : "Drop Rate"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-card-foreground mt-1 leading-snug">
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
                className="px-3 py-1.5 rounded-sm bg-secondary hover:border-primary/50 text-card-foreground border border-border text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-sm"
              >
                <span>💀</span>
                <span>{language === "bn" ? "রোস্ট কার্ড দেখুন" : "View Roast"}</span>
              </button>
            </div>
          </div>

          {/* Clean 2-Color Gauge Meter */}
          <div className="mt-3.5 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono mb-1.5 px-0.5">
              <span>0% বিশ্বস্ত</span>
              <span>30% দ্বিধাদ্বন্দ্ব</span>
              <span>60% অজুহাতবাজ</span>
              <span>100% চরম ধোঁকা</span>
            </div>
            <div className="relative w-full h-2 rounded-sm bg-secondary overflow-hidden border border-border">
              <div
                className="bg-primary h-full rounded-sm transition-all duration-700"
                style={{ width: `${Math.min(Math.max(stats.cancellationRate, 2), 100)}%` }}
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

      {/* Modern 2-Color Footer */}
      <Footer
        onOpenCalculator={() => setIsTourCalculatorOpen(true)}
        onOpenRoast={() => setIsRoastOpen(true)}
        onOpenBudget={() => setIsBudgetOpen(true)}
        onOpenPacking={() => setIsPackingOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

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

      {/* Tour Budget vs Reality Modal */}
      <BudgetRealityModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        onOpenRoast={() => setIsRoastOpen(true)}
      />

      {/* Forgettable Packing Checklist Modal */}
      <PackingChecklistModal
        isOpen={isPackingOpen}
        onClose={() => setIsPackingOpen(false)}
      />

      {/* Tour Cost Calculator Modal */}
      <TourCalculatorModal
        isOpen={isTourCalculatorOpen}
        onClose={() => setIsTourCalculatorOpen(false)}
      />
    </div>
  );
}
