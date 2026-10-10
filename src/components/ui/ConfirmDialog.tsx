"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm bg-[#0e0e12] border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {t.confirm.cancel}
          </button>
          <button
            type="button"
            autoFocus
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-500 text-white hover:bg-rose-400 transition-all shadow-[0_0_18px_rgba(244,63,94,0.35)] cursor-pointer"
          >
            {t.confirm.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
