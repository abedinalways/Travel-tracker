"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Download, Upload, Trash2, X, Database } from "lucide-react";

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
  const { showToast } = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useModalBehavior(isOpen, onClose);

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
      showToast(t.toast.exportSuccess, "success");
    } catch {
      showToast(t.toast.exportError, "error");
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
          showToast(t.backupModal.restoreSuccess, "success");
        } else {
          showToast(t.backupModal.restoreError, "error");
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = async () => {
    await onResetAll();
    setShowResetConfirm(false);
    showToast(t.toast.resetSuccess, "success");
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
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
                  {t.backupModal.exportSub}
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
                  {t.backupModal.importSub}
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
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-all text-xs font-semibold cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.backupModal.dangerZone}</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title={t.backupModal.dangerZone}
        message={t.backupModal.dangerConfirm}
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
}
