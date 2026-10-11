"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/components/ui/Toast";
import { compressAndConvertToBase64 } from "@/lib/imageCompressor";
import {
  StarIconComp,
  UploadIcon,
  CloseIcon,
  SpinnerIcon,
  CalendarIcon,
  MapPinIcon,
  FoodIcon,
} from "@/components/ui/icons";
import Image from "next/image";

interface VisitedFormProps {
  visitedDate?: string;
  favoriteSpot?: string;
  favoriteFood?: string;
  rating?: number;
  notes?: string;
  photos?: string[];
  onChangeVisitedDate: (date: string) => void;
  onChangeFavoriteSpot: (spot: string) => void;
  onChangeFavoriteFood: (food: string) => void;
  onChangeRating: (rating: number) => void;
  onChangeNotes: (notes: string) => void;
  onAddPhoto: (base64: string) => void;
  onRemovePhoto: (index: number) => void;
}

export function VisitedForm({
  visitedDate,
  favoriteSpot,
  favoriteFood,
  rating = 5,
  notes,
  photos = [],
  onChangeVisitedDate,
  onChangeFavoriteSpot,
  onChangeFavoriteFood,
  onChangeRating,
  onChangeNotes,
  onAddPhoto,
  onRemovePhoto,
}: VisitedFormProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length >= 3) {
      showToast(t.common.maxPhotos, "error");
      return;
    }

    setIsCompressing(true);
    try {
      for (let i = 0; i < files.length; i++) {
        if (photos.length + i >= 3) break;
        const file = files[i];
        const base64 = await compressAndConvertToBase64(file);
        onAddPhoto(base64);
      }
    } catch (err) {
      console.error("Photo processing failed:", err);
    } finally {
      setIsCompressing(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Date & Rating Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Travel Date */}
        <div>
          <label className="text-xs font-semibold text-card-foreground flex items-center gap-1.5 mb-1.5">
            <CalendarIcon size={14} className="text-primary" />
            <span>{t.drawer.travelDate}</span>
          </label>
          <input
            type="date"
            value={visitedDate || ""}
            onChange={(e) => onChangeVisitedDate(e.target.value)}
            className="w-full px-3 py-2 rounded-sm bg-secondary border border-border text-xs text-card-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-xs font-semibold text-card-foreground flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5">
              <StarIconComp size={14} className="text-primary" />
              <span>{t.drawer.rating}</span>
            </span>
            <span className="text-[11px] font-medium text-primary italic">
              {t.drawer.ratingLabels?.[(rating || 5) as 1 | 2 | 3 | 4 | 5]}
            </span>
          </label>
          <div className="flex items-center gap-1 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onChangeRating(star)}
                className="p-1 text-primary hover:scale-125 transition-transform cursor-pointer"
              >
                <StarIconComp
                  size={18}
                  className={
                    star <= (rating || 5)
                      ? "text-primary"
                      : "text-border"
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Favorite Spot & Local Food */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-card-foreground flex items-center gap-1.5 mb-1.5">
            <MapPinIcon size={14} className="text-primary" />
            <span>{t.drawer.favoriteSpot}</span>
          </label>
          <input
            type="text"
            value={favoriteSpot || ""}
            onChange={(e) => onChangeFavoriteSpot(e.target.value)}
            placeholder={t.drawer.favoriteSpotPlaceholder}
            className="w-full px-3 py-2 rounded-sm bg-secondary border border-border text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-card-foreground flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5">
              <FoodIcon size={14} className="text-primary" />
              <span>{t.drawer.favoriteFood}</span>
            </span>
          </label>
          <input
            type="text"
            value={favoriteFood || ""}
            onChange={(e) => onChangeFavoriteFood(e.target.value)}
            placeholder={t.drawer.favoriteFoodPlaceholder}
            className="w-full px-3 py-2 rounded-sm bg-secondary border border-border text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          {/* Quick Popular Food Chips */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {[
              "চুইঝাল 🍖",
              "কাচ্চি 🍚",
              "বগুড়ার দই 🍯",
              "চমচম 🍮",
              "সাতকড়া 🍋",
              "চা ☕",
            ].map((foodItem) => (
              <button
                key={foodItem}
                type="button"
                onClick={() =>
                  onChangeFavoriteFood(
                    favoriteFood ? `${favoriteFood}, ${foodItem}` : foodItem
                  )
                }
                className="text-[10px] px-2 py-0.5 rounded-sm bg-secondary hover:border-primary/50 text-muted-foreground hover:text-primary border border-border transition-colors cursor-pointer"
              >
                + {foodItem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes / Diary */}
      <div>
        <label className="text-xs font-semibold text-card-foreground block mb-1.5">
          {t.drawer.notes}
        </label>
        <textarea
          rows={2}
          value={notes || ""}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder={t.drawer.notesPlaceholder}
          className="w-full px-3 py-2 rounded-sm bg-secondary border border-border text-xs text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
        />
        {/* Quick Highlights / Memory Chips */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {[
            "ক্যামেরার মেমোরি ফুল 📸",
            "পাহাড়ে উঠে দম শেষ 🏔️",
            "অসাধারণ চা খাইছি ☕",
            "জঘন্য জ্যামে ৫ ঘণ্টা 🚗",
            "মেঘের সাথে সেলফি ☁️",
            "জুতার ফিতা ছিঁড়ছে 👟",
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                onChangeNotes(notes ? `${notes} • ${tag}` : tag)
              }
              className="text-[10px] px-2 py-0.5 rounded-sm bg-secondary hover:border-primary/50 text-muted-foreground hover:text-primary border border-border transition-colors cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-card-foreground">
            {t.drawer.attachPhotos} ({photos.length}/3)
          </label>
          <span className="text-[11px] text-muted-foreground">{t.drawer.uploadHint}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Photos Preview Thumbnails */}
          {photos.map((src, index) => (
            <div
              key={index}
              className="relative w-16 h-16 rounded-sm overflow-hidden border border-border group shrink-0"
            >
              <Image
                src={src}
                alt="Travel memory"
                fill
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onRemovePhoto(index)}
                className="absolute top-1 right-1 p-1 rounded-sm bg-background/90 text-primary hover:bg-secondary transition-colors cursor-pointer"
              >
                <CloseIcon size={12} />
              </button>
            </div>
          ))}

          {/* Upload Button */}
          {photos.length < 3 && (
            <label className="w-16 h-16 rounded-sm border border-dashed border-border hover:border-primary flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0 bg-secondary">
              {isCompressing ? (
                <SpinnerIcon size={18} className="animate-spin text-primary" />
              ) : (
                <>
                  <UploadIcon size={18} />
                  <span className="text-[9px] mt-0.5">Upload</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={isCompressing}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
