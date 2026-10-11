"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { CloseIcon, SparklesIconComp } from "@/components/ui/icons";
import { useToast } from "@/components/ui/Toast";

interface BudgetRealityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRoast?: () => void;
}

export function BudgetRealityModal({
  isOpen,
  onClose,
  onOpenRoast,
}: BudgetRealityModalProps) {
  const { language } = useLanguage();
  const { showToast } = useToast();
  useModalBehavior(isOpen, onClose);

  const [budget, setBudget] = useState<number>(3000);

  if (!isOpen) return null;

  // Realistic hilarious calculations based on Bangladeshi travel culture
  const chaShingaraCost = Math.round(budget * 0.18 + 200);
  const emergencyMeds = Math.round(budget * 0.12 + 150);
  const brokeFriendSubsidy = Math.round(budget * 0.35 + 400);
  const missedBusCng = Math.round(budget * 0.22 + 300);
  const hiddenPhotographerFee = Math.round(budget * 0.08 + 100);

  const totalRealCost =
    budget +
    chaShingaraCost +
    emergencyMeds +
    brokeFriendSubsidy +
    missedBusCng +
    hiddenPhotographerFee;
  const extraPercentage = Math.round(((totalRealCost - budget) / budget) * 100);

  const handleCopySummary = () => {
    const text =
      language === "bn"
        ? `💸 আমার ট্যুর বাজেট হিসাব:\n- প্ল্যান করা বাজেট: ৳${budget.toLocaleString()}\n- মাঝরাতের হাইওয়ের চা-সিঙ্গারা: ৳${chaShingaraCost}\n- 'মানিব্যাগ ভুলে গেছি' বন্ধুর খরচ: ৳${brokeFriendSubsidy}\n- সিএনজি ও ইমার্জেন্সি: ৳${missedBusCng}\n➡️ আসল খরচ: ৳${totalRealCost.toLocaleString()} (+${extraPercentage}% বেশি!)\nউপসংহার: ট্যুর বাদ দিয়ে বাসায় ঘুমানো ভালো! 😂`
        : `💸 My Tour Budget vs Reality:\n- Planned Budget: ৳${budget.toLocaleString()}\n- Highway tea & snacks: ৳${chaShingaraCost}\n- Broke friend subsidy: ৳${brokeFriendSubsidy}\n- Emergency transit: ৳${missedBusCng}\n➡️ Real Damage: ৳${totalRealCost.toLocaleString()} (+${extraPercentage}% extra!)\nVerdict: Cancel tour and sleep home! 😂`;

    void navigator.clipboard.writeText(text);
    showToast(
      language === "bn"
        ? "হিসাব ক্লিপবোর্ডে কপি হয়েছে! বন্ধুদের ইনবক্সে পাঠান 📋"
        : "Copied to clipboard! Send to your travel group 📋",
      "success"
    );
  };

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
        <div className="flex items-start justify-between pb-3.5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center text-xl shadow-inner">
              💸
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-card-foreground tracking-tight flex items-center gap-1.5">
                <span>{language === "bn" ? "ট্যুর বাজেট vs বাস্তব খতিয়ান" : "Budget vs Reality Calculator"}</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                {language === "bn"
                  ? "প্ল্যানে ছিল কম খরচ, বাস্তবে পকেট ফাঁকা হওয়ার নিখুঁত বিজ্ঞান!"
                  : "The exact science of how 'budget tours' bankrupt you!"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm text-muted-foreground hover:text-card-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Interactive Slider */}
        <div className="mt-4 p-4 rounded-sm bg-secondary border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-card-foreground">
              {language === "bn" ? "আপনার কল্পিত বা স্বপ্নের বাজেট:" : "Your Dream Planned Budget:"}
            </span>
            <span className="text-base sm:text-lg font-mono font-black text-primary">
              ৳ {budget.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min={1000}
            max={25000}
            step={500}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer h-2 bg-background rounded-sm"
          />

          <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1">
            <span>৳ ১,০০০ (সোফার পেছনে)</span>
            <span>৳ ১০,০০০ (সাজেক/কক্সবাজার)</span>
            <span>৳ ২৫,০০০ (আমিরের মতো)</span>
          </div>
        </div>

        {/* Breakdown of Hidden Costs */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <SparklesIconComp size={13} className="text-primary" />
            <span>{language === "bn" ? "অদৃশ্য দেশি খরচের তালিকা:" : "Breakdown of Inevitable Hidden Costs:"}</span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-sm bg-secondary border border-border">
              <span className="text-card-foreground">☕ মাঝরাতের হাইওয়ের চা + পরোটা + শিঙ্গাড়া</span>
              <span className="font-mono font-bold text-primary">+ ৳{chaShingaraCost}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-sm bg-secondary border border-border">
              <span className="text-card-foreground">🤦‍♂️ &ldquo;মানিব্যাগ ফেলে আসছি&rdquo; দোস্তের বিল দেওয়া</span>
              <span className="font-mono font-bold text-primary">+ ৳{brokeFriendSubsidy}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-sm bg-secondary border border-border">
              <span className="text-card-foreground">🚕 বাস মিস হওয়ার পর রুদ্ধশ্বাস সিএনজি রেস</span>
              <span className="font-mono font-bold text-primary">+ ৳{missedBusCng}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-sm bg-secondary border border-border">
              <span className="text-card-foreground">💊 রাস্তার খাবার খেয়ে গ্যাস্ট্রিক ও স্যালাইন</span>
              <span className="font-mono font-bold text-primary">+ ৳{emergencyMeds}</span>
            </div>
          </div>
        </div>

        {/* The Shocking Total Box */}
        <div className="mt-4 p-4 rounded-sm bg-secondary border border-border shadow-inner">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                {language === "bn" ? "আসল বাস্তবতা (Real Damage)" : "Real Damage"}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-card-foreground mt-0.5">
                ৳ {totalRealCost.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-1 rounded-sm bg-secondary border border-border text-primary text-xs font-mono font-bold">
                +{extraPercentage}% অতিরিক্ত!
              </span>
              <div className="text-[10px] text-muted-foreground mt-1">
                {language === "bn" ? "পকেট গ্যারান্টিযুক্ত খালি 💀" : "Wallet safely destroyed 💀"}
              </div>
            </div>
          </div>

          <p className="mt-2.5 pt-2 border-t border-border text-xs text-muted-foreground italic leading-relaxed">
            {language === "bn"
              ? "💡 বুদ্ধিমানের উপদেশ: ট্যুরের প্ল্যান ড্রপ দিয়ে এই টাকায় বাসায় আয়েশ করে বিরিয়ানি খান আর কম্বল মুড়ি দিন!"
              : "💡 Pro tip: Flake on the tour right now, buy yourself kacchi biryani, and nap peacefully!"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>{language === "bn" ? "হিসাব কপি করুন" : "Copy Breakdown"}</span>
          </button>

          <div className="flex items-center gap-2">
            {onOpenRoast && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRoast();
                }}
                className="px-3 py-2 rounded-sm bg-secondary border border-border hover:border-primary/50 text-card-foreground text-xs font-bold transition-all cursor-pointer active:scale-95"
              >
                💀 {language === "bn" ? "রোস্ট কার্ড দেখুন" : "View Roast"}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              {language === "bn" ? "বুঝেছি, বাসাতেই থাকবো" : "Got it, staying home"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

