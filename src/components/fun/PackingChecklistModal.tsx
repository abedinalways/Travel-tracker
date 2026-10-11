"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/i18n/LanguageContext";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { CloseIcon, CheckIcon, ResetIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/Toast";

interface PackingItem {
  id: string;
  nameBn: string;
  nameEn: string;
  roastBn: string;
  roastEn: string;
  icon: string;
}

const PACKING_ITEMS: PackingItem[] = [
  {
    id: "charger",
    nameBn: "ফোনের ফাস্ট চার্জার ও পাওয়ার ব্যাংক",
    nameEn: "Phone Fast Charger & Power Bank",
    roastBn: "বাসায় মাল্টিপ্লাগে ঝুলন্ত রেখে আসার সম্ভাবনা ৯৯%!",
    roastEn: "99% chance left hanging on your bedroom wall socket!",
    icon: "🔌",
  },
  {
    id: "brush",
    nameBn: "টুথব্রাশ ও পেস্ট",
    nameEn: "Toothbrush & Paste",
    roastBn: "যাত্রাপথে স্থানীয় দোকান থেকে ২০ টাকার শক্ত ব্রাশ কেনার গ্যারান্টি।",
    roastEn: "Guaranteed to buy a rough cheap plastic brush at 2 AM.",
    icon: "🪥",
  },
  {
    id: "gastric_meds",
    nameBn: "গ্যাস্ট্রিকের ওষুধ ও ওরস্যালাইন",
    nameEn: "Gastric Meds & Oral Saline",
    roastBn: "হাইওয়ের ঝাল খাবার খাওয়ার পর এটা ছাড়া জীবন তেজপাতা!",
    roastEn: "Without this, highway street spicy food will end you!",
    icon: "💊",
  },
  {
    id: "sunglasses",
    nameBn: "ভাব নেওয়ার সানগ্লাস",
    nameEn: "Aesthetic Sunglasses",
    roastBn: "ছবিতে ভাব দেখানোর মেইন অস্ত্র, ব্যাগে বসলেই ফ্রেম বাঁকা!",
    roastEn: "Main photo-prop, snaps the moment someone sits on your backpack!",
    icon: "🕶️",
  },
  {
    id: "cash",
    nameBn: "পকেটে হার্ড ক্যাশ টাকা",
    nameEn: "Emergency Hard Cash",
    roastBn: "পাহাড়ের চূড়ায় বিকাশ বা এটিএম থাকে না—ক্যাশ ছাড়া খাবার মিলবে না!",
    roastEn: "No bKash or ATM on mountain peaks. No cash = No food!",
    icon: "💵",
  },
  {
    id: "sandals",
    nameBn: "এক্সট্রা স্যান্ডেল / চটি",
    nameEn: "Extra Rubber Sandals",
    roastBn: "জুতো কাদায় বা পানিতে ভিজে যাওয়ার পর খালি পায়ে ঘুরে বেড়ানো ঠেকায়।",
    roastEn: "Saves you from walking barefoot when shoes soak in mud.",
    icon: "🩴",
  },
  {
    id: "umbrella",
    nameBn: "ছোট ফোল্ডিং ছাতা",
    nameEn: "Mini Folding Umbrella",
    roastBn: "রোদে পুড়বেন নাকি পাহাড়ি বৃষ্টিতে ভিজে নিউমোনিয়া বাঁধাবেন?",
    roastEn: "Saves you from scorching heat or sudden mountain rain.",
    icon: "☂️",
  },
  {
    id: "friend",
    nameBn: "ঘুমন্ত ট্যুরমেটকে ঘুম থেকে তোলা!",
    nameEn: "Wake up your oversleeping travel buddy!",
    roastBn: "সবকিছু প্যাক করার পরও যে বন্ধু বাস মিস করাবে, তারে ধাক্কা দিয়ে তুলুন!",
    roastEn: "The friend who will still cause you to miss the bus—shake them awake!",
    icon: "😴",
  },
];

interface PackingChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = "canceltour_packing_checked";

export function PackingChecklistModal({
  isOpen,
  onClose,
}: PackingChecklistModalProps) {
  const { language } = useLanguage();
  const { showToast } = useToast();
  useModalBehavior(isOpen, onClose);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          return JSON.parse(raw);
        }
      } catch {
        // ignore
      }
    }
    return {};
  });

  const saveChecked = (updated: Record<string, boolean>) => {
    setCheckedItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleToggle = (id: string) => {
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    saveChecked(next);

    const checkedCount = Object.values(next).filter(Boolean).length;
    if (checkedCount === PACKING_ITEMS.length) {
      // All checked! Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      showToast(
        language === "bn"
          ? "অভিনন্দন! আপনি অলৌকিক মানুষ—সবকিছু ব্যাগে ভরা শেষ! 🏆"
          : "Incredible! You remembered absolutely everything! 🏆",
        "success"
      );
    }
  };

  const handleReset = () => {
    saveChecked({});
    showToast(
      language === "bn" ? "চেকলিস্ট রিসেট করা হয়েছে!" : "Checklist reset!",
      "success"
    );
  };

  if (!isOpen) return null;

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = Math.round((checkedCount / PACKING_ITEMS.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-card border border-border rounded-xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto text-card-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xl shadow-inner">
              🎒
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {language === "bn" ? "ভুলে যাওয়ার আশঙ্কামুক্ত প্যাকিং তালিকা" : "Essential Tour Packing Checklist"}
              </h2>
              <p className="text-xs text-zinc-400">
                {language === "bn"
                  ? "যেসব জিনিস বাঙালি ভ্রমণকারীরা গ্যারান্টি দিয়ে বাসায় ফেলে যায়!"
                  : "Items Bangladeshi travelers almost always forget at home!"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-zinc-300">
              {language === "bn" ? "ব্যাগে গোছানোর অগ্রগতি:" : "Packing Completion:"}
            </span>
            <span className="font-mono text-emerald-400">
              {checkedCount} / {PACKING_ITEMS.length} ({progressPct}%)
            </span>
          </div>
          <div className="w-full bg-background h-2 rounded-sm overflow-hidden">
            <div
              className="bg-primary h-full rounded-sm transition-all duration-300"
              style={{ width: `${Math.max(progressPct, 4)}%` }}
            />
          </div>
        </div>

        {/* List Items */}
        <div className="mt-4 space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {PACKING_ITEMS.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggle(item.id)}
                className={`w-full text-left p-3 rounded-sm border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                  isChecked
                    ? "bg-secondary border-primary text-card-foreground shadow-sm"
                    : "bg-secondary border-border text-muted-foreground hover:border-primary/40 hover:text-card-foreground"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-sm mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? "bg-primary text-primary-foreground font-bold"
                      : "border border-border bg-background"
                  }`}
                >
                  {isChecked && <CheckIcon size={13} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-card-foreground">
                    <span>{item.icon}</span>
                    <span className={isChecked ? "line-through text-muted-foreground" : ""}>
                      {language === "bn" ? item.nameBn : item.nameEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 italic leading-tight">
                    {language === "bn" ? item.roastBn : item.roastEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-card-foreground transition-colors cursor-pointer"
          >
            <ResetIcon size={14} />
            <span>{language === "bn" ? "তালিকা ক্লিয়ার করুন" : "Reset List"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {language === "bn" ? "ব্যাগ লক করুন 🔒" : "Lock the Backpack 🔒"}
          </button>
        </div>
      </div>
    </div>
  );
}
