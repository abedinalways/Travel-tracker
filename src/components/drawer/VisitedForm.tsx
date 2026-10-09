"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { compressAndConvertToBase64 } from "@/lib/imageCompressor";
import { Star, Upload, X, Loader2, Calendar, MapPin, UtensilsCrossed } from "lucide-react";
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
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length >= 3) {
      alert("Maximum 3 photos allowed!");
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
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.drawer.travelDate}</span>
          </label>
          <input
            type="date"
            value={visitedDate || ""}
            onChange={(e) => onChangeVisitedDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-700 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{t.drawer.rating}</span>
          </label>
          <div className="flex items-center gap-1 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onChangeRating(star)}
                className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= (rating || 5)
                      ? "fill-amber-400 text-amber-400"
                      : "text-zinc-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Favorite Spot & Local Food */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.drawer.favoriteSpot}</span>
          </label>
          <input
            type="text"
            value={favoriteSpot || ""}
            onChange={(e) => onChangeFavoriteSpot(e.target.value)}
            placeholder={t.drawer.favoriteSpotPlaceholder}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-700 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.drawer.favoriteFood}</span>
          </label>
          <input
            type="text"
            value={favoriteFood || ""}
            onChange={(e) => onChangeFavoriteFood(e.target.value)}
            placeholder={t.drawer.favoriteFoodPlaceholder}
            className="w-full px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-700 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Notes / Diary */}
      <div>
        <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
          {t.drawer.notes}
        </label>
        <textarea
          rows={2}
          value={notes || ""}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder={t.drawer.notesPlaceholder}
          className="w-full px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-700 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 resize-none"
        />
      </div>

      {/* Photo Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-zinc-300">
            {t.drawer.attachPhotos} ({photos.length}/3)
          </label>
          <span className="text-[11px] text-zinc-500">{t.drawer.uploadHint}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Photos Preview Thumbnails */}
          {photos.map((src, index) => (
            <div
              key={index}
              className="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-700 group shrink-0"
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
                className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-white hover:bg-rose-600 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Upload Button */}
          {photos.length < 3 && (
            <label className="w-16 h-16 rounded-xl border-2 border-dashed border-zinc-700 hover:border-emerald-500/60 flex flex-col items-center justify-center text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0 bg-zinc-900/40">
              {isCompressing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Upload className="w-5 h-5" />
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
