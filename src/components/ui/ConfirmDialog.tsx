"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { WarningIcon } from "@/components/ui/icons";

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
        className="relative w-full max-w-sm bg-card border border-border rounded-xl p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-sm bg-secondary border border-border shrink-0">
            <WarningIcon size={20} className="text-primary" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-card-foreground leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold text-muted-foreground hover:text-card-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            {t.confirm.cancel}
          </button>
          <button
            type="button"
            autoFocus
            onClick={onConfirm}
            className="px-5 py-2 rounded-sm text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
          >
            {t.confirm.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
