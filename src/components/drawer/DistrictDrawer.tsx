"use client";

import React, { useState } from "react";
import { TravelMemory, TripStatus } from "@/types/trip";
import { DistrictGeoData, CountryGeoData } from "@/types/map";
import { useLanguage } from "@/i18n/LanguageContext";
import { CancelledForm } from "./CancelledForm";
import { VisitedForm } from "./VisitedForm";
import confetti from "canvas-confetti";
import {
  CloseIcon,
  CheckIcon,
  DeleteIcon,
  MapPinIcon,
  GlobeIcon,
} from "@/components/ui/icons";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { RegionMiniMap } from "@/components/maps/RegionMiniMap";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { getDistrictRoast } from "@/config/districtRoasts";

interface DistrictDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: DistrictGeoData | CountryGeoData | null;
  existingMemory?: TravelMemory;
  onSave: (memory: TravelMemory) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function DistrictDrawer({
  isOpen,
  onClose,
  item,
  existingMemory,
  onSave,
  onDelete,
}: DistrictDrawerProps) {
  const { language } = useLanguage();
  useModalBehavior(isOpen, onClose);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={language === "bn" ? item.nameBn : item.nameEn}
    >
      <div className="w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
        <DistrictDrawerContent
          key={item.id}
          item={item}
          existingMemory={existingMemory}
          onClose={onClose}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

function DistrictDrawerContent({
  item,
  existingMemory,
  onClose,
  onSave,
  onDelete,
}: {
  item: DistrictGeoData | CountryGeoData;
  existingMemory?: TravelMemory;
  onClose: () => void;
  onSave: (memory: TravelMemory) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const { language, t } = useLanguage();
  const { showToast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [status, setStatus] = useState<TripStatus>(
    () => existingMemory?.status || "never"
  );
  const [cancelReason, setCancelReason] = useState<string | undefined>(
    () => existingMemory?.cancelReason
  );
  const [cancelReasonCustom, setCancelReasonCustom] = useState<string | undefined>(
    () => existingMemory?.cancelReasonCustom
  );
  const [visitedDate, setVisitedDate] = useState<string | undefined>(
    () => existingMemory?.visitedDate
  );
  const [favoriteSpot, setFavoriteSpot] = useState<string | undefined>(
    () => existingMemory?.favoriteSpot
  );
  const [favoriteFood, setFavoriteFood] = useState<string | undefined>(
    () => existingMemory?.favoriteFood
  );
  const [rating, setRating] = useState<number>(
    () => existingMemory?.rating || 5
  );
  const [notes, setNotes] = useState<string | undefined>(
    () => existingMemory?.notes
  );
  const [photos, setPhotos] = useState<string[]>(
    () => existingMemory?.photos || []
  );
  const [isSaving, setIsSaving] = useState(false);

  const isDistrict = "divisionEn" in item;
  const divisionEn = isDistrict ? item.divisionEn : "World";
  const divisionBn = isDistrict ? item.divisionBn : "বিশ্ব";

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const memory: TravelMemory = {
        districtId: item.id,
        districtNameEn: item.nameEn,
        districtNameBn: item.nameBn,
        divisionEn,
        divisionBn,
        geoType: isDistrict ? "district" : "country",
        status,
        cancelReason: status === "cancelled" ? cancelReason : undefined,
        cancelReasonCustom:
          status === "cancelled" && cancelReason === "other"
            ? cancelReasonCustom
            : undefined,
        visitedDate: status === "visited" ? visitedDate : undefined,
        favoriteSpot: status === "visited" ? favoriteSpot : undefined,
        favoriteFood: status === "visited" ? favoriteFood : undefined,
        rating: status === "visited" ? rating : undefined,
        notes: status === "visited" ? notes : undefined,
        photos: status === "visited" ? photos : undefined,
        updatedAt: Date.now(),
      };

      // "Never planned" means the user is clearing any tracked status, so
      // remove the record entirely instead of persisting a "never" row.
      if (status === "never") {
        if (existingMemory) {
          await onDelete(item.id);
        }
        showToast(t.toast.deleted, "success");
        onClose();
        return;
      }

      await onSave(memory);
      showToast(t.toast.saved, "success");

      if (status === "visited") {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      } else if (status === "cancelled") {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      }

      onClose();
    } catch (err) {
      console.error("Failed to save memory:", err);
      showToast(t.toast.saveError, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    await onDelete(item.id);
    showToast(t.toast.deleted, "success");
    onClose();
  };

  const statusOptions: {
    status: TripStatus;
    label: string;
    desc: string;
    color: string;
    border: string;
    activeBg: string;
  }[] = [
    {
      status: "visited",
      label: t.status.visited,
      desc: t.status.visitedDesc,
      color: "bg-primary",
      border: "border-primary",
      activeBg: "bg-secondary border-primary shadow-sm ring-1 ring-primary",
    },
    {
      status: "planned",
      label: t.status.planned,
      desc: t.status.plannedDesc,
      color: "bg-primary",
      border: "border-primary",
      activeBg: "bg-secondary border-primary shadow-sm ring-1 ring-primary",
    },
    {
      status: "cancelled",
      label: t.status.cancelled,
      desc: t.status.cancelledDesc,
      color: "bg-primary",
      border: "border-primary",
      activeBg: "bg-secondary border-primary shadow-sm ring-1 ring-primary",
    },
    {
      status: "bucketlist",
      label: t.status.bucketlist,
      desc: t.status.bucketlistDesc,
      color: "bg-primary",
      border: "border-primary",
      activeBg: "bg-secondary border-primary shadow-sm ring-1 ring-primary",
    },
    {
      status: "never",
      label: t.status.never,
      desc: t.status.neverDesc,
      color: "bg-muted-foreground",
      border: "border-border",
      activeBg: "bg-secondary border-primary shadow-sm ring-1 ring-primary",
    },
  ];

  const districtRoast = getDistrictRoast(item.id);

  return (
    <div className="relative w-full max-w-lg bg-card border border-border rounded-t-xl sm:rounded-xl p-4 sm:p-5 shadow-2xl max-h-[90vh] overflow-y-auto text-card-foreground">
      {/* Header */}
      <div className="flex items-start justify-between pb-3.5 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <MapPinIcon size={18} className="text-emerald-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {language === "bn" ? item.nameBn : item.nameEn}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 pl-10 font-medium">
            {language === "bn" ? `${divisionBn} বিভাগ` : `${divisionEn} Division`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-transparent hover:border-zinc-700 transition-all cursor-pointer"
        >
          <CloseIcon size={18} />
        </button>
      </div>

      {/* Region mini-map + quick facts */}
      <div className="pt-3.5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {isDistrict ? (
            <MapPinIcon size={15} className="text-primary" />
          ) : (
            <GlobeIcon size={15} className="text-primary" />
          )}
          <span>{t.drawer.quickFacts}</span>
        </div>

        <RegionMiniMap
          selectedId={item.id}
          status={status}
          variant={isDistrict ? "bangladesh" : "world"}
        />

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-sm bg-secondary border border-border">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {t.drawer.divisionLabel}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-card-foreground mt-0.5">
              {isDistrict
                ? language === "bn"
                  ? item.divisionBn
                  : item.divisionEn
                : language === "bn"
                  ? "বিশ্ব"
                  : "World"}
            </div>
          </div>
          <div className="p-2.5 rounded-sm bg-secondary border border-border">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {t.drawer.currentStatus}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-card-foreground mt-0.5">
              {t.status[status]}
            </div>
          </div>
        </div>

        {/* Hilarious District Roast Pill */}
        {isDistrict && (
          <div className="p-3 rounded-sm bg-secondary border border-border flex items-start gap-2.5 shadow-sm">
            <span className="text-xl shrink-0 mt-0.5">😂</span>
            <div>
              <div className="text-[11px] font-bold text-primary uppercase tracking-wider">
                {language === "bn" ? "খাঁটি বাস্তবতা ও রোস্ট" : "Local Truth & Roast"}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed italic mt-0.5">
                &ldquo;{language === "bn" ? districtRoast.roastBn : districtRoast.roastEn}&rdquo;
              </p>
              <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                {language === "bn" ? "বিখ্যাত:" : "Famous:"} {language === "bn" ? districtRoast.famousItemBn : districtRoast.famousItemEn}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5 Dynamic Status Cards */}
      <div className="py-3.5 space-y-2">
        <label className="text-xs font-semibold text-zinc-300 block mb-2">
          {t.drawer.selectStatus}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {statusOptions.map((opt) => {
            const isSelected = status === opt.status;
            return (
              <button
                key={opt.status}
                type="button"
                onClick={() => setStatus(opt.status)}
                className={`flex items-start gap-2.5 p-2.5 rounded-md border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? opt.activeBg
                    : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full mt-1 shrink-0 ${opt.color}`}
                />
                <div>
                  <div className="font-semibold text-xs sm:text-sm text-zinc-100">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-zinc-500 leading-tight">
                    {opt.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Forms based on status */}
      {status === "cancelled" && (
        <div className="pt-2 pb-4 border-t border-zinc-800/80">
          <CancelledForm
            selectedReasonId={cancelReason}
            customReason={cancelReasonCustom}
            onSelectReason={setCancelReason}
            onChangeCustomReason={setCancelReasonCustom}
          />
        </div>
      )}

      {status === "visited" && (
        <div className="pt-2 pb-4 border-t border-zinc-800/80">
          <VisitedForm
            visitedDate={visitedDate}
            favoriteSpot={favoriteSpot}
            favoriteFood={favoriteFood}
            rating={rating}
            notes={notes}
            photos={photos}
            onChangeVisitedDate={setVisitedDate}
            onChangeFavoriteSpot={setFavoriteSpot}
            onChangeFavoriteFood={setFavoriteFood}
            onChangeRating={setRating}
            onChangeNotes={setNotes}
            onAddPhoto={(base64) => setPhotos((prev) => [...prev, base64])}
            onRemovePhoto={(idx) =>
              setPhotos((prev) => prev.filter((_, i) => i !== idx))
            }
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
        {existingMemory ? (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold text-muted-foreground hover:text-card-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <DeleteIcon size={15} />
            <span>{t.drawer.resetStatus}</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-sm text-xs sm:text-sm font-semibold text-muted-foreground hover:text-card-foreground transition-colors cursor-pointer"
          >
            {t.drawer.close}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <CheckIcon size={15} />
            <span>{t.drawer.saveChanges}</span>
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title={t.drawer.resetStatus}
        message={t.backupModal.dangerConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
