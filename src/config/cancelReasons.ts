export interface CancelReasonOption {
  id: string;
  textBn: string;
  textEn: string;
  emoji: string;
}

export const CANCEL_REASONS: CancelReasonOption[] = [
  {
    id: "tourmates_betrayal",
    textBn: "ট্যুরমেটদের শেষ মুহূর্তের ধোঁকা",
    textEn: "Tour mates backed out at the 11th hour",
    emoji: "🤡",
  },
  {
    id: "no_budget",
    textBn: "পকেটে টান / একাউন্টে মাছি ওড়ে",
    textEn: "Wallet empty & zero budget",
    emoji: "💸",
  },
  {
    id: "mom_permission",
    textBn: "আম্মা পারমিশন দেয় নাই (বাঁচিয়ে দিলেন)",
    textEn: "Mom said: 'Ekdom na!' (Blessing in disguise)",
    emoji: "👵",
  },
  {
    id: "boss_leave_cancelled",
    textBn: "অফিসের বসের ছুটির দরখাস্ত বাতিল",
    textEn: "Boss cancelled the approved leave",
    emoji: "💼",
  },
  {
    id: "bad_weather_excuse",
    textBn: "মেঘ দেখেই ভয়, আবহাওয়া খারাপের অজুহাত",
    textEn: "Sudden 'bad weather' convenient excuse",
    emoji: "🌧️",
  },
  {
    id: "slept_late_missed",
    textBn: "ঘুম ভাঙ্গে নাই, বাস/ট্রেন মিস",
    textEn: "Overslept and missed the ride",
    emoji: "⏰",
  },
  {
    id: "fake_fever",
    textBn: "যাত্রার আগের রাতে কাল্পনিক জ্বর",
    textEn: "Mystery fever right before departure",
    emoji: "🤒",
  },
  {
    id: "bed_is_best",
    textBn: "বের হওয়ার পর মনে হলো ঘরের বিছানাই সেরা",
    textEn: "Realized the bed is far superior to travel",
    emoji: "🛌",
  },
  {
    id: "other",
    textBn: "অন্য কোনো গোপন অজুহাত...",
    textEn: "Other confidential excuse...",
    emoji: "🤫",
  },
];
