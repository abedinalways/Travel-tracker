"use client";

import React from "react";
import { CANCEL_REASONS } from "@/config/cancelReasons";
import { useLanguage } from "@/i18n/LanguageContext";

interface CancelledFormProps {
  selectedReasonId?: string;
  customReason?: string;
  onSelectReason: (reasonId: string) => void;
  onChangeCustomReason: (text: string) => void;
}

export function CancelledForm({
  selectedReasonId,
  customReason,
  onSelectReason,
  onChangeCustomReason,
}: CancelledFormProps) {
  const { language, t } = useLanguage();

  const handleRandomExcuse = () => {
    const eligible = CANCEL_REASONS.filter((r) => r.id !== "other");
    const random = eligible[Math.floor(Math.random() * eligible.length)];
    if (random) onSelectReason(random.id);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs sm:text-sm font-semibold text-rose-300 flex items-center gap-1.5">
          <span>{t.drawer.cancelReasonTitle}</span>
        </label>
        <button
          type="button"
          onClick={handleRandomExcuse}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-[11px] font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1"
          title={language === "bn" ? "একটা অজুহাত বানিয়ে দাও" : "Give me an excuse"}
        >
          <span>🎲</span>
          <span className="hidden sm:inline">
            {language === "bn" ? "অজুহাত বানাও" : "Random Excuse"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
        {CANCEL_REASONS.map((reason) => {
          const isSelected = selectedReasonId === reason.id;
          return (
            <button
              key={reason.id}
              type="button"
              onClick={() => onSelectReason(reason.id)}
              className={`flex items-center gap-3 p-2.5 rounded-xl text-left text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? "bg-rose-500/20 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.25)]"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span className="text-lg shrink-0">{reason.emoji}</span>
              <span className="flex-1 font-medium">
                {language === "bn" ? reason.textBn : reason.textEn}
              </span>
            </button>
          );
        })}
      </div>

      {selectedReasonId === "other" && (
        <div className="mt-2 animate-in fade-in duration-200">
          <input
            type="text"
            value={customReason || ""}
            onChange={(e) => onChangeCustomReason(e.target.value)}
            placeholder={t.drawer.customReasonPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-700 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-rose-500/60"
          />
        </div>
      )}
    </div>
  );
}
