"use client";

import React, { useRef, useState } from "react";
import { StoryCard } from "./StoryCard";
import { FeedCard } from "./FeedCard";
import { TripStats, TravelMemory } from "@/types/trip";
import { exportElementAsPng } from "@/lib/exportImage";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/components/ui/Toast";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { X, Download, Loader2, Sparkles, User } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: TripStats;
  memoriesMap: Record<string, TravelMemory>;
  nickname: string;
  onUpdateNickname: (name: string) => void;
}

type Format = "story" | "feed";

export function ShareModal({
  isOpen,
  onClose,
  stats,
  memoriesMap,
  nickname,
  onUpdateNickname,
}: ShareModalProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [format, setFormat] = useState<Format>("story");
  const [isExporting, setIsExporting] = useState(false);

  const storyCardRef = useRef<HTMLDivElement>(null);
  const feedCardRef = useRef<HTMLDivElement>(null);

  useModalBehavior(isOpen, onClose);

  if (!isOpen) return null;

  const handleDownload = async () => {
    const targetRef = format === "story" ? storyCardRef : feedCardRef;
    if (!targetRef.current) return;

    setIsExporting(true);
    try {
      const fileName =
        format === "story"
          ? `canceltour-story-${Date.now()}.png`
          : `canceltour-feed-${Date.now()}.png`;

      await exportElementAsPng(targetRef.current, fileName, 2.5);
    } catch (err) {
      console.error("Export error:", err);
      showToast(t.common.exportFailed, "error");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{t.shareModal.title}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {t.shareModal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Nickname + Format Switcher */}
        <div className="py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-zinc-800/80">
          {/* Nickname Input */}
          <div className="relative w-full sm:w-64">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={nickname}
              onChange={(e) => onUpdateNickname(e.target.value)}
              placeholder={t.stats.nicknamePlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Format Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              type="button"
              onClick={() => setFormat("story")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                format === "story"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.shareModal.formatStory}
            </button>
            <button
              type="button"
              onClick={() => setFormat("feed")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                format === "feed"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.shareModal.formatFeed}
            </button>
          </div>
        </div>

        {/* Live Preview Container (Scrollable & Responsive) */}
        <div className="flex-1 overflow-y-auto py-4 flex items-center justify-center bg-zinc-950/60 rounded-2xl border border-zinc-900/90 my-2">
          <div className="transform scale-[0.62] sm:scale-[0.78] origin-center transition-all duration-300">
            {format === "story" ? (
              <StoryCard
                ref={storyCardRef}
                stats={stats}
                memoriesMap={memoriesMap}
                nickname={nickname}
              />
            ) : (
              <FeedCard
                ref={feedCardRef}
                stats={stats}
                memoriesMap={memoriesMap}
                nickname={nickname}
              />
            )}
          </div>
        </div>

        {/* Download Footer */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {t.drawer.close}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.shareModal.downloading}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{t.shareModal.downloadBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
