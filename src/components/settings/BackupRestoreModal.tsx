"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Download, Upload, Trash2, X, Check, AlertCircle, Database } from "lucide-react";

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => Promise<string>;
  onRestore: (jsonString: string) => Promise<boolean>;
  onResetAll: () => Promise<void>;
}

export function BackupRestoreModal({
  isOpen,
  onClose,
  onExport,
  onRestore,
  onResetAll,
}: BackupRestoreModalProps) {
  const { t } = useLanguage();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleDownloadBackup = async () => {
    try {
      const json = await onExport();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `canceltour-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setStatusMessage({
        type: "success",
        text: "Backup downloaded successfully!",
      });
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to export backup.",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = await onRestore(content);
        if (success) {
          setStatusMessage({
            type: "success",
            text: t.backupModal.restoreSuccess,
          });
        } else {
          setStatusMessage({
            type: "error",
            text: t.backupModal.restoreError,
          });
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = async () => {
    if (confirm(t.backupModal.dangerConfirm)) {
      await onResetAll();
      setStatusMessage({
        type: "success",
        text: "All local data cleared.",
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e0e12] border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t.backupModal.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          {t.backupModal.description}
        </p>

        {/* Feedback Message */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === "success"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
            }`}
          >
            {statusMessage.type === "success" ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Actions Grid */}
        <div className="space-y-3">
          {/* Download JSON */}
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-100">
                  {t.backupModal.exportBtn}
                </div>
                <div className="text-[11px] text-zinc-500">
                  Save all statuses & memories locally
                </div>
              </div>
            </div>
          </button>

          {/* Upload JSON */}
          <label className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 hover:border-sky-500/50 hover:bg-zinc-800 transition-all text-left cursor-pointer group">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-100">
                  {t.backupModal.importBtn}
                </div>
                <div className="text-[11px] text-zinc-500">
                  Restore from a previously saved JSON
                </div>
              </div>
            </div>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Danger Zone */}
        <div className="pt-3 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-all text-xs font-semibold cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.backupModal.dangerZone}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
