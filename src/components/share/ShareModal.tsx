"use client";

import React, { useRef, useState } from "react";
import { StoryCard } from "./StoryCard";
import { FeedCard } from "./FeedCard";
import { TripStats, TravelMemory } from "@/types/trip";
import { exportElementAsPng } from "@/lib/exportImage";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/components/ui/Toast";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import {
  CloseIcon,
  DownloadIcon,
  SpinnerIcon,
  SparklesIconComp,
  UserIconComp,
} from "@/components/ui/icons";

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
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] text-card-foreground">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-card-foreground flex items-center gap-2">
              <SparklesIconComp size={20} className="text-primary" />
              <span>{t.shareModal.title}</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.shareModal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-sm text-muted-foreground hover:text-card-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Toolbar: Nickname + Format Switcher */}
        <div className="py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-border">
          {/* Nickname Input */}
          <div className="relative w-full sm:w-64">
            <UserIconComp size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={nickname}
              onChange={(e) => onUpdateNickname(e.target.value)}
              placeholder={t.stats.nicknamePlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-sm bg-secondary border border-border text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Format Switcher */}
          <div className="flex items-center p-1 rounded-sm bg-secondary border border-border">
            <button
              type="button"
              onClick={() => setFormat("story")}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                format === "story"
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              {t.shareModal.formatStory}
            </button>
            <button
              type="button"
              onClick={() => setFormat("feed")}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                format === "feed"
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              {t.shareModal.formatFeed}
            </button>
          </div>
        </div>

        {/* Live Preview Container (Scrollable & Responsive) */}
        <div className="flex-1 overflow-y-auto py-4 flex items-center justify-center bg-secondary rounded-sm border border-border my-2">
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
        <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold text-muted-foreground hover:text-card-foreground transition-colors cursor-pointer"
          >
            {t.drawer.close}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <SpinnerIcon size={16} className="animate-spin" />
                <span>{t.shareModal.downloading}</span>
              </>
            ) : (
              <>
                <DownloadIcon size={16} />
                <span>{t.shareModal.downloadBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
