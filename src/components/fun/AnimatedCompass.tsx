"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CompassVerdict {
  angle: number;
  dirBn: string;
  dirEn: string;
  quoteBn: string;
  quoteEn: string;
  badge: string;
}

const VERDICTS: CompassVerdict[] = [
  {
    angle: 0,
    dirBn: "উত্তর (North)",
    dirEn: "North (Hills)",
    quoteBn: "পাহাড় ডাকছে সাজেক চলো! কিন্তু শেষ রাতে কম্বলের মায়া কাটাতে পারবা তো?",
    quoteEn: "Sajek peaks are calling! Can you really overcome the morning blanket trap?",
    badge: "🏔️ সাজেক / বান্দরবান",
  },
  {
    angle: 45,
    dirBn: "উত্তর-পূর্ব (NE)",
    dirEn: "North-East (Tea Gardens)",
    quoteBn: "শ্রীমঙ্গলের চা বাগান ও সিলেটের বৃষ্টি! চা প্রেমীদের স্বর্গরাজ্য।",
    quoteEn: "Rainy Sylhet and lush tea estates of Sreemangal await!",
    badge: "🍵 সিলেট / শ্রীমঙ্গল",
  },
  {
    angle: 90,
    dirBn: "পূর্ব (East)",
    dirEn: "East (Lakes & Forests)",
    quoteBn: "কাপ্তাই লেকে বোট রাইড আর পাহাড়ের নিস্তব্ধতা! এবার অন্তত প্ল্যান ফেল কোরো না।",
    quoteEn: "Kaptai Lake cruise and mountain tranquility. Don't ghost your crew this time!",
    badge: "🛶 রাঙামাটি / কাপ্তাই",
  },
  {
    angle: 135,
    dirBn: "দক্ষিণ-পূর্ব (SE)",
    dirEn: "South-East (Adventure)",
    quoteBn: "বান্দরবানের নাফাখুম বা কেউক্রাডং ট্রেইল! অজুহাত রেখে ট্র্যাকিং শু পরো!",
    quoteEn: "Nafakhum and Keokradong trails! Ditch the excuses, lace up the boots!",
    badge: "🥾 বান্দরবান ট্রেইল",
  },
  {
    angle: 180,
    dirBn: "দক্ষিণ (South)",
    dirEn: "South (Ocean)",
    quoteBn: "বিশ্বের দীর্ঘতম সমুদ্র সৈকত কক্সবাজার! সাগরের ঢেউ আর টুনা ফ্রাইয়ের ঘ্রাণ!",
    quoteEn: "Cox's Bazar roaring waves! Beach walks and grilled tuna fish!",
    badge: "🌊 কক্সবাজার সৈকত",
  },
  {
    angle: 225,
    dirBn: "দক্ষিণ-পশ্চিম (SW)",
    dirEn: "South-West (Mangrove)",
    quoteBn: "সুন্দরবনের রয়েল বেঙ্গল টাইগারের ডেরা ও কোটকা বিচ! খাঁটি বন্য রোমাঞ্চ!",
    quoteEn: "Sundarbans mangrove wilds! Royal Bengal Tiger territory and Kotka beach!",
    badge: "🐅 সুন্দরবন / মংলা",
  },
  {
    angle: 270,
    dirBn: "পশ্চিম (West)",
    dirEn: "West (Heritage)",
    quoteBn: "কুষ্টিয়ার লালন আখড়া আর পদ্মা চরে সূর্যাস্ত! আত্মিক শান্তি আর গান।",
    quoteEn: "Kushtia Lalon Akhra and dreamy Padma river sunset!",
    badge: "🪕 কুষ্টিয়া / লালনধাম",
  },
  {
    angle: 315,
    dirBn: "উত্তর-পশ্চিম (NW)",
    dirEn: "North-West (Food & Kings)",
    quoteBn: "বগুড়ার খাঁটি ক্ষীরশা দই আর পুঠিয়া রাজবাড়ী! ভোজনরসিকের আসল ঠিকানা!",
    quoteEn: "Bogura's authentic royal curd & Puthia palace heritage!",
    badge: "🍧 বগুড়ার দই / রাজশাহী",
  },
];

export function AnimatedCompass() {
  const { language } = useLanguage();
  const [currentAngle, setCurrentAngle] = useState(0);
  const [currentVerdict, setCurrentVerdict] = useState<CompassVerdict>(VERDICTS[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * VERDICTS.length);
    const selected = VERDICTS[randomIndex];
    // Add multiple full 360 rotations for realistic spin momentum
    const extraSpins = (3 + Math.floor(Math.random() * 3)) * 360;
    const targetAngle = currentAngle + extraSpins + selected.angle - (currentAngle % 360);

    setCurrentAngle(targetAngle);

    setTimeout(() => {
      setCurrentVerdict(selected);
      setIsSpinning(false);
    }, 1100);
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center gap-3.5 p-3 sm:p-4 rounded-xl glass-card border border-emerald-500/20 bg-gradient-to-br from-emerald-950/15 via-zinc-900/90 to-zinc-900/95 shadow-md">
      {/* Interactive Compass Dial */}
      <button
        type="button"
        onClick={handleSpin}
        title={language === "bn" ? "কম্পাস ঘুরিয়ে গন্তব্য খুঁজুন!" : "Spin the compass to find your next destination!"}
        className="group relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-zinc-950 border border-emerald-500/40 p-1 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-95 ring-1 ring-white/10"
      >
        {/* Subtle Outer Dial Ring with Degree Marks */}
        <div className="absolute inset-1 rounded-full border border-dashed border-emerald-500/25 pointer-events-none" />

        {/* Cardinal Markers */}
        <span className="absolute top-1 text-[8px] sm:text-[9px] font-black text-primary tracking-tighter">N</span>
        <span className="absolute bottom-1 text-[8px] sm:text-[9px] font-black text-muted-foreground tracking-tighter">S</span>
        <span className="absolute right-1.5 text-[8px] sm:text-[9px] font-black text-muted-foreground tracking-tighter">E</span>
        <span className="absolute left-1.5 text-[8px] sm:text-[9px] font-black text-muted-foreground tracking-tighter">W</span>

        {/* Rotating Compass Needle */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${currentAngle}deg)` }}
        >
          {/* North Needle Point (Primary) */}
          <div className="absolute top-3 w-0 h-0 border-x-4 border-x-transparent border-b-[26px] sm:border-b-[32px] border-b-primary filter drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
          {/* South Needle Point (Muted) */}
          <div className="absolute bottom-3 w-0 h-0 border-x-4 border-x-transparent border-t-[26px] sm:border-t-[32px] border-t-muted-foreground" />
          {/* Pivot Center */}
          <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-inner z-10" />
        </div>

        {/* Center Spin Hint Pill on Hover */}
        <div className="absolute -bottom-2 px-2 py-0.5 rounded-sm bg-primary text-primary-foreground text-[9px] font-black tracking-tight shadow opacity-0 group-hover:opacity-100 transition-opacity">
          SPIN 🎲
        </div>
      </button>

      {/* Compass Destination & Roast Verdict */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
          <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
            {language === "bn" ? "🧭 ট্রাভেল কম্পাস" : "🧭 Travel Compass"}
          </span>
          <span className="px-1.5 py-0.5 rounded-sm bg-secondary border border-border text-[10px] font-bold text-primary">
            {currentVerdict.badge}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed italic line-clamp-2">
          &ldquo;{language === "bn" ? currentVerdict.quoteBn : currentVerdict.quoteEn}&rdquo;
        </p>
        <button
          type="button"
          onClick={handleSpin}
          disabled={isSpinning}
          className="mt-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
        >
          <span>{isSpinning ? (language === "bn" ? "ঘুরছে..." : "Spinning...") : (language === "bn" ? "🧭 কম্পাস ঘুরিয়ে পরবর্তী গন্তব্য খুঁজুন" : "🧭 Spin to find next destination")}</span>
          <span className="text-xs">→</span>
        </button>
      </div>
    </div>
  );
}

