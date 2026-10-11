"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { CloseIcon, SparklesIconComp } from "@/components/ui/icons";
import { useToast } from "@/components/ui/Toast";

interface TourCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TourCalculatorModal({
  isOpen,
  onClose,
}: TourCalculatorModalProps) {
  const { language } = useLanguage();
  const { showToast } = useToast();
  useModalBehavior(isOpen, onClose);

  // Inputs
  const [destination, setDestination] = useState("");
  const [members, setMembers] = useState(4);
  const [days, setDays] = useState(3);
  const [transportCost, setTransportCost] = useState(6000);
  const [hotelCost, setHotelCost] = useState(5000);
  const [foodCost, setFoodCost] = useState(4500);
  const [activityCost, setActivityCost] = useState(1500);
  const [emergencyCost, setEmergencyCost] = useState(1500);

  if (!isOpen) return null;

  const totalCost =
    transportCost + hotelCost + foodCost + activityCost + emergencyCost;
  const validMembers = Math.max(members, 1);
  const perPersonCost = Math.round(totalCost / validMembers);

  const getVerdict = (perPerson: number) => {
    if (language === "bn") {
      if (perPerson < 2500) {
        return "🎒 বাজেট ট্যুর: রাস্তায় চা-পরোটা খেয়ে রাত কাটানোর সাশ্রয়ী প্ল্যান!";
      }
      if (perPerson <= 6000) {
        return "🚗 ব্যালেন্সড ট্যুর: বাজেট সুন্দর ও মানানসই, কোনো প্যারা নেই!";
      }
      if (perPerson <= 12000) {
        return "🏖️ লাক্সারি সফর: ভালো হোটেল আর রিলাক্স মোডে ঘোরার প্ল্যান!";
      }
      return "👑 রাজকীয় ট্যুর: গ্রুপের সবার ভরসা এখন আপনার পকেটের ওপর!";
    } else {
      if (perPerson < 2500) {
        return "🎒 Ultra Budget: Roadside tea and frugal packing vibes!";
      }
      if (perPerson <= 6000) {
        return "🚗 Sweet Spot: Well balanced and comfortable budget!";
      }
      if (perPerson <= 12000) {
        return "🏖️ Luxury Getaway: Premium resorts and chill vacation vibes!";
      }
      return "👑 Royal Expedition: Everyone is eyeing your wallet!";
    }
  };

  const handleCopy = () => {
    const destName = destination.trim() || (language === "bn" ? "ট্যুর" : "Tour");
    const summary =
      language === "bn"
        ? `📍 ${destName} খরচের হিসাব:\n👥 সদস্য: ${validMembers} জন | ⏱️ সময়: ${days} দিন\n------------------------\n🚌 যাতায়াত: ৳${transportCost.toLocaleString()}\n🏨 হোটেল: ৳${hotelCost.toLocaleString()}\n🍽️ খাবার: ৳${foodCost.toLocaleString()}\n🎟️ ঘোরাঘুরি ও এন্ট্রি: ৳${activityCost.toLocaleString()}\n☕ চা-নাস্তা ও জরুরি: ৳${emergencyCost.toLocaleString()}\n------------------------\n💰 মোট খরচ: ৳${totalCost.toLocaleString()}\n👤 জনপ্রতি: ৳${perPersonCost.toLocaleString()}\n💡 মন্তব্য: ${getVerdict(perPersonCost)}`
        : `📍 ${destName} Budget Split:\n👥 Members: ${validMembers} | ⏱️ Days: ${days}\n------------------------\n🚌 Transport: ৳${transportCost.toLocaleString()}\n🏨 Stay: ৳${hotelCost.toLocaleString()}\n🍽️ Food: ৳${foodCost.toLocaleString()}\n🎟️ Activities: ৳${activityCost.toLocaleString()}\n☕ Emergency/Snacks: ৳${emergencyCost.toLocaleString()}\n------------------------\n💰 Total: ৳${totalCost.toLocaleString()}\n👤 Per Person: ৳${perPersonCost.toLocaleString()}\n💡 Note: ${getVerdict(perPersonCost)}`;

    void navigator.clipboard.writeText(summary);
    showToast(
      language === "bn"
        ? "হিসাব ক্লিপবোর্ডে কপি হয়েছে! গ্রুপে পাঠিয়ে দিন 📋"
        : "Budget summary copied to clipboard! 📋",
      "success"
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-card text-card-foreground border border-border rounded-lg p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-md bg-secondary text-primary border border-border flex items-center justify-center text-xl font-bold shadow-inner">
              🧮
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-foreground tracking-tight flex items-center gap-1.5">
                <span>{language === "bn" ? "ট্যুর খরচের হিসাব ক্যালকুলেটর" : "Tour Cost Calculator"}</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                {language === "bn"
                  ? "যাতায়াত, হোটেল, খাবার ও জনপ্রতি খরচের নিখুঁত হিসাব"
                  : "Calculate transport, stay, food and split per person"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Basic Tour Inputs */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="sm:col-span-1">
            <label className="text-[11px] font-bold text-muted-foreground block mb-1">
              {language === "bn" ? "গন্তব্যের নাম:" : "Destination:"}
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={language === "bn" ? "যেমন: সাজেক" : "e.g. Sajek"}
              className="w-full px-3 py-1.5 rounded-md bg-secondary border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-muted-foreground block mb-1">
              {language === "bn" ? "সদস্য সংখ্যা:" : "Members:"}
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMembers((prev) => Math.max(1, prev - 1))}
                className="px-2.5 py-1.5 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-l-md text-xs font-bold cursor-pointer"
              >
                -
              </button>
              <span className="flex-1 text-center py-1.5 bg-secondary/60 border-y border-border text-xs font-mono font-bold text-foreground">
                {members}
              </span>
              <button
                type="button"
                onClick={() => setMembers((prev) => prev + 1)}
                className="px-2.5 py-1.5 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-r-md text-xs font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-muted-foreground block mb-1">
              {language === "bn" ? "দিন সংখ্যা:" : "Days:"}
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setDays((prev) => Math.max(1, prev - 1))}
                className="px-2.5 py-1.5 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-l-md text-xs font-bold cursor-pointer"
              >
                -
              </button>
              <span className="flex-1 text-center py-1.5 bg-secondary/60 border-y border-border text-xs font-mono font-bold text-foreground">
                {days}
              </span>
              <button
                type="button"
                onClick={() => setDays((prev) => prev + 1)}
                className="px-2.5 py-1.5 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-r-md text-xs font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Expense Category Breakdowns */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <SparklesIconComp size={13} className="text-primary" />
            <span>{language === "bn" ? "খরচের খাতসমূহ (টাকা):" : "Cost Breakdown (BDT):"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-md bg-secondary border border-border flex items-center justify-between">
              <span className="text-foreground">🚌 যাতায়াত (বাস/ট্রেন/গাড়ি)</span>
              <input
                type="number"
                min={0}
                step={100}
                value={transportCost}
                onChange={(e) => setTransportCost(Number(e.target.value) || 0)}
                className="w-24 px-2 py-1 rounded bg-background border border-border font-mono text-right text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="p-2.5 rounded-md bg-secondary border border-border flex items-center justify-between">
              <span className="text-foreground">🏨 হোটেল / রিসোর্ট</span>
              <input
                type="number"
                min={0}
                step={100}
                value={hotelCost}
                onChange={(e) => setHotelCost(Number(e.target.value) || 0)}
                className="w-24 px-2 py-1 rounded bg-background border border-border font-mono text-right text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="p-2.5 rounded-md bg-secondary border border-border flex items-center justify-between">
              <span className="text-foreground">🍽️ খাবার-দাবার</span>
              <input
                type="number"
                min={0}
                step={100}
                value={foodCost}
                onChange={(e) => setFoodCost(Number(e.target.value) || 0)}
                className="w-24 px-2 py-1 rounded bg-background border border-border font-mono text-right text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div className="p-2.5 rounded-md bg-secondary border border-border flex items-center justify-between">
              <span className="text-foreground">🎟️ দর্শনীয় স্থান ও এন্ট্রি</span>
              <input
                type="number"
                min={0}
                step={50}
                value={activityCost}
                onChange={(e) => setActivityCost(Number(e.target.value) || 0)}
                className="w-24 px-2 py-1 rounded bg-background border border-border font-mono text-right text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-md bg-secondary border border-border flex items-center justify-between text-xs">
            <span className="text-foreground">☕ চা-নাস্তা ও জরুরি ব্যাকআপ ফান্ড</span>
            <input
              type="number"
              min={0}
              step={100}
              value={emergencyCost}
              onChange={(e) => setEmergencyCost(Number(e.target.value) || 0)}
              className="w-28 px-2 py-1 rounded bg-background border border-border font-mono text-right text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Calculation Result Summary Card */}
        <div className="mt-4 p-4 rounded-md bg-secondary border border-border">
          <div className="grid grid-cols-2 gap-4 pb-3 border-b border-border">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {language === "bn" ? "সর্বমোট ট্যুর খরচ" : "Total Tour Cost"}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-foreground mt-0.5">
                ৳ {totalCost.toLocaleString()}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                {language === "bn" ? "জনপ্রতি খরচ" : "Cost Per Person"}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-primary mt-0.5">
                ৳ {perPersonCost.toLocaleString()}
              </div>
            </div>
          </div>

          <p className="mt-2.5 text-xs text-muted-foreground italic leading-relaxed">
            {getVerdict(perPersonCost)}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>{language === "bn" ? "হিসাব কপি করুন" : "Copy Budget"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            {language === "bn" ? "সম্পন্ন" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}

