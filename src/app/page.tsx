"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsBanner } from "@/components/layout/StatsBanner";
import { MapContainer } from "@/components/maps/MapContainer";
import { DistrictDrawer } from "@/components/drawer/DistrictDrawer";
import { ShareModal } from "@/components/share/ShareModal";
import { BackupRestoreModal } from "@/components/settings/BackupRestoreModal";
import { useTripStorage } from "@/hooks/useTripStorage";
import { DistrictGeoData, CountryGeoData } from "@/types/map";
import { useLanguage } from "@/i18n/LanguageContext";
import { Heart, Sparkles } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
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

  const handleSelectDistrict = (district: DistrictGeoData) => {
    setSelectedItem(district);
    setIsDrawerOpen(true);
  };

  const handleSelectCountry = (country: CountryGeoData) => {
    setSelectedItem(country);
    setIsDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#09090b] text-zinc-100">
      <div className="bg-ambient" />
      {/* Top Header */}
      <Header
        onOpenShare={() => setIsShareOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        {/* Hero Title & Fun Tagline */}
        <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.subTagline}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {t.hero.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
          <div className="text-xs text-zinc-400 font-mono shrink-0">
            {stats.visitedCount} {t.common.visitedLabel} •{" "}
            {stats.cancelledCount} {t.status.cancelled}
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
            <div className="flex items-center gap-1 text-zinc-400">
              <span>{t.footer.madeWith}</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
            <p className="text-emerald-500/70 text-center sm:text-right">
              {t.footer.privacyNote}
            </p>
            <p className="text-zinc-600">
              © {new Date().getFullYear()} DropTrip — {t.footer.rights}
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
    </div>
  );
}
