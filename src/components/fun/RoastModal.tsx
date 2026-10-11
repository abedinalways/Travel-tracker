"use client";

import React, { useState } from "react";
import { TripStats } from "@/types/trip";
import { useLanguage } from "@/i18n/LanguageContext";
import { CloseIcon, ShareIcon, ResetIcon } from "@/components/ui/icons";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { useToast } from "@/components/ui/Toast";

interface RoastModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: TripStats;
  nickname?: string;
}

export function RoastModal({ isOpen, onClose, stats, nickname }: RoastModalProps) {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const [roastVariant, setRoastVariant] = useState(0);

  useModalBehavior(isOpen, onClose);

  if (!isOpen) return null;

  const displayName = nickname?.trim() || (language === "bn" ? "অজ্ঞাত মুসাফির" : "Anonymous Traveler");

  const roastsBn = getRoastsBn(stats, displayName);
  const roastsEn = getRoastsEn(stats, displayName);

  const currentRoast = language === "bn" 
    ? roastsBn[roastVariant % roastsBn.length]
    : roastsEn[roastVariant % roastsEn.length];

  const handleNextRoast = () => {
    setRoastVariant((prev) => prev + 1);
  };

  const handleCopy = () => {
    const textToCopy = `💀 [DropTrip Travel Roast]\n"${currentRoast.text}"\n\n— স্কোর: ${stats.visitedCount} ঘোরা vs ${stats.cancelledCount} ড্রপ (${stats.cancellationRate}% ক্যান্সেলেশন রেট)\nCheck your roast at: canceltour.app`;
    navigator.clipboard.writeText(textToCopy);
    showToast(language === "bn" ? "রোস্ট কপি হয়েছে! বন্ধুদের পাঠিয়ে হাসাহাসি করুন 😂" : "Roast copied to clipboard! 😂", "success");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-card border border-border rounded-xl p-6 sm:p-7 shadow-2xl text-card-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating fun pill */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-sm bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5">
          <span>💀 Brutal Roast Mode</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border mt-1">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-card-foreground flex items-center gap-2">
              <span>{currentRoast.title}</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              @{displayName} • {stats.visitedCount}Visited vs {stats.cancelledCount}Dropped
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

        {/* Roast Punchline Box */}
        <div className="my-6 p-5 sm:p-6 rounded-sm bg-secondary border border-border text-center relative overflow-hidden group">
          <div className="text-4xl sm:text-5xl mb-3 animate-bounce">
            {currentRoast.emoji}
          </div>
          <p className="text-sm sm:text-base font-semibold text-card-foreground leading-relaxed italic">
            &ldquo;{currentRoast.text}&rdquo;
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-sm bg-card text-[11px] font-mono text-primary border border-border">
            {currentRoast.tag}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleNextRoast}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-secondary border border-border hover:border-primary/50 text-xs font-bold text-card-foreground transition-all cursor-pointer active:scale-95"
          >
            <ResetIcon size={16} />
            <span>{language === "bn" ? "অন্য রোস্ট শুনবো 🔄" : "Another Roast 🔄"}</span>
          </button>
          
          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <ShareIcon size={16} />
              <span>{language === "bn" ? "রোস্ট কপি করো 📋" : "Copy Roast 📋"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoastsBn(stats: TripStats, name: string) {
  const total = stats.visitedCount + stats.cancelledCount;
  
  if (total === 0) {
    return [
      {
        title: "ঘরকুনো সোফা বিশেষজ্ঞ 🛋️",
        emoji: "💤",
        text: `${name}, আপনি তো এখনও ঘরের দরজার ছিটকিনিই খোলেন নাই! গুগল ম্যাপসের স্যাটেলাইট ভিউ দেখে ট্যুর দেওয়ার প্ল্যান বাদ দিয়ে অন্তত পাশের দোকানে গিয়ে এক কাপ চা খেয়ে আসেন!`,
        tag: "০ ট্যুর • ০ ড্রপ • ১০০% অলসতা",
      },
      {
        title: "পাসপোর্টহীন সাধু 🧘‍♂️",
        emoji: "📦",
        text: `ইনস্টাগ্রামে ট্রাভেলারদের ভিডিওতে লাইক দেওয়া ছাড়া আপনার জীবনে ট্রাভেলের আর কোনো চিহ্ন পাওয়া যায়নি!`,
        tag: "লিস্ট এখনও খালি",
      },
    ];
  }

  if (stats.visitedCount === 0 && stats.cancelledCount > 0) {
    return [
      {
        title: "শুধু ড্রপের বাদশাহ 🪦",
        emoji: "🤡",
        text: `মাশাল্লাহ ${name}! ঘুরতে যান নাই এক জায়গায়ও, অথচ ড্রপ দিছেন ${stats.cancelledCount} বার! আপনার বায়োতে 'Wanderlust' লেখা দেখলে স্বয়ং গুগল ম্যাপসও লজ্জা পাবে!`,
        tag: `${stats.cancelledCount} টি প্ল্যান ভেস্তে গেছে`,
      },
      {
        title: "ট্যুরমেটদের প্রধান শত্রু 💀",
        emoji: "👻",
        text: `যে বন্ধু গ্রুপে সবচেয়ে বেশি চেঁচামেচি করে শেষে বলে 'আম্মা মানা করছে'—সেই বন্ধুটি আসলে আপনি! আপনার নামে আন্তর্জাতিক ওয়ারেন্ট জারি হওয়া উচিত!`,
        tag: "১০০% ক্যান্সেলেশন রেকর্ড",
      },
    ];
  }

  if (stats.cancellationRate >= 60) {
    return [
      {
        title: "ক্যান্সেলেশন পিএইচডি হোল্ডার 🎓",
        emoji: "🪦",
        text: `${name}, আপনার সাথে ট্রিপের প্ল্যান করা আর শীতের রাতে কোল্ড কফি খাওয়ার আশা করা একই কথা! প্রতি ১০টা প্ল্যানের মধ্যে ${Math.round(stats.cancellationRate / 10)}টাই আপনি শেষ রাতে পেটব্যথার অজুহাতে ভাসিয়ে দেন!`,
        tag: `${stats.cancellationRate}% ক্যান্সেলেশন রেট`,
      },
      {
        title: "গ্রুপ চ্যাটের কালপ্রিট 🤡",
        emoji: "🏃‍♂️",
        text: `বাসের টিকিট কাটার সময় আপনার কোনো খোঁজ পাওয়া যায় না, অথচ প্ল্যান করার সময় আপনার চেয়ে বড় যাযাবর আর কেউ থাকে না!`,
        tag: "শেষ মুহূর্তে পগারপার",
      },
    ];
  }

  if (stats.visitedCount >= 10 && stats.cancellationRate < 25) {
    return [
      {
        title: "অবাধ্য যাযাবর 🎒",
        emoji: "🔥",
        text: `${name}, বসের বকা, ব্যাংক একাউন্টের কান্না আর সংসারের দায়িত্ব—কোনো কিছুই আপনার পিঠের ব্যাগ নামাতে পারে নাই! আপনার এই ট্যুরপ্রীতির রহস্য কি খাঁটি পাগলামি নাকি ছুটি চাওয়ার স্পর্ধা?`,
        tag: `${stats.visitedCount} জেলা সফর সম্পন্ন`,
      },
    ];
  }

  return [
    {
      title: "বাস্তববাদী মুসাফির ⚖️",
      emoji: "🎒",
      text: `${name}, কিছু জায়গায় গেছেন চা খেতে, কিছু জায়গা থেকে বন্ধুদের ধোঁকা খেয়ে ফিরেছেন! জীবনে যেমন সুখ-দুঃখ থাকে, আপনার ট্রাভেলেও তেমনই ঘোরা আর ড্রপের নিখুঁত ভারসাম্য আছে!`,
      tag: `${stats.visitedCount} ঘোরা • ${stats.cancelledCount} ড্রপ`,
    },
    {
      title: "চাখোর পর্যটক ☕",
      emoji: "☕",
      text: `ঢাকা থেকে ৩০০ কিলোমিটার পাহাড়ে গিয়েও আপনার আসল কাজ থাকে এক কাপ টংয়ের চা খাওয়া আর সেলফি তুলে স্টোরিতে দেওয়া!`,
      tag: "ক্যাফেইন নির্ভর পর্যটন",
    },
  ];
}

function getRoastsEn(stats: TripStats, name: string) {
  const total = stats.visitedCount + stats.cancelledCount;
  if (total === 0) {
    return [
      {
        title: "Sofa Sovereign 🛋️",
        emoji: "💤",
        text: `Hey ${name}, your passport is literally begging for fresh air. Your greatest expedition this year was walking from the bed to the kitchen fridge!`,
        tag: "0 Visited • 0 Dropped",
      },
    ];
  }
  if (stats.cancellationRate >= 50) {
    return [
      {
        title: "Chief Flake Officer 🪦",
        emoji: "🤡",
        text: `${name}, booking a tour with you is an Olympic sport in disappointment! You say '100% packed' on WhatsApp while still wearing pajamas in bed!`,
        tag: `${stats.cancellationRate}% Flake Ratio`,
      },
    ];
  }
  return [
    {
      title: "Pragmatic Wanderer ⚖️",
      emoji: "🎒",
      text: `${name}, a few triumphs, a few legendary drops. You live the authentic traveler life where half the memories are actual trips and half are group chat betrayals!`,
      tag: `${stats.visitedCount} Visited • ${stats.cancelledCount} Dropped`,
    },
  ];
}
