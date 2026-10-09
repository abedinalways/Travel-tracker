import { BadgeInfo } from "@/types/trip";

export function calculateBadge(
  visitedCount: number,
  cancelledCount: number
): BadgeInfo {
  const total = visitedCount + cancelledCount;

  if (total === 0) {
    return {
      id: "fresh_canvas",
      titleBn: "নবীন পরিব্রাজক 🌱",
      titleEn: "Novice Dreamer 🌱",
      icon: "🌱",
      descriptionBn: "এখনও খাতা খোলা হয়নি, প্ল্যান করুন অথবা বাতিল করুন!",
      descriptionEn: "Clean slate! Time to plan a tour or cancel one.",
      colorScheme: "from-zinc-500 to-zinc-700",
    };
  }

  const cancelRate = (cancelledCount / total) * 100;

  if (visitedCount === 0 && cancelledCount > 0) {
    return {
      id: "sofa_explorer",
      titleBn: "সোফা পর্যটক 🛋️",
      titleEn: "Couch Wanderer 🛋️",
      icon: "🛋️",
      descriptionBn: "ভ্রমণ বলতে শুধু ফেসবুক স্টোরিতে দেখা আর প্ল্যান ড্রপ করা!",
      descriptionEn: "Travels exclusively through Instagram reels and cancellations.",
      colorScheme: "from-orange-500 to-amber-700",
    };
  }

  if (cancelRate >= 70) {
    return {
      id: "legendary_canceller",
      titleBn: "প্রফেশনাল প্ল্যান ভেস্তে দেওয়া কিংবদন্তি 🏆",
      titleEn: "Grandmaster Tour Canceller 🏆",
      icon: "🏆",
      descriptionBn: "প্ল্যান করাই যার নেশা, আর শেষ মুহূর্তে বাদ দেওয়াই পেশা!",
      descriptionEn: "Loves to make itineraries just to execute flawless drops.",
      colorScheme: "from-rose-500 to-red-800",
    };
  }

  if (cancelRate >= 45) {
    return {
      id: "flaky_nomad",
      titleBn: "ট্যুরমেটদের চিরচেনা ধোঁকাবাজ 🎭",
      titleEn: "The Flaky Nomad 🎭",
      icon: "🎭",
      descriptionBn: "সব গ্রুপ চ্যাটে 'হ্যাঁ যাচ্ছি' বলে ব্যাগ না গোছানো বান্দা!",
      descriptionEn: "Says '100% Going!' in group chat but never packs bags.",
      colorScheme: "from-amber-500 to-orange-700",
    };
  }

  if (cancelRate >= 25) {
    return {
      id: "hesitant_traveler",
      titleBn: "দ্বিধাদ্বন্দ্বে থাকা মুসাফির ⚖️",
      titleEn: "Hesitant Voyager ⚖️",
      icon: "⚖️",
      descriptionBn: "যাবো কি যাবো না ভাবতে ভাবতে টিকিট শেষ হয়ে যায়!",
      descriptionEn: "Overthinks until tickets are sold out.",
      colorScheme: "from-purple-500 to-indigo-700",
    };
  }

  if (visitedCount >= 15 && cancelRate < 15) {
    return {
      id: "unstoppable_nomad",
      titleBn: "ঘুরন্ত যাযাবর ও আসল অভিযাত্রী ✈️",
      titleEn: "Unstoppable Explorer ✈️",
      icon: "✈️",
      descriptionBn: "বৃষ্টি হোক বা ঝড়, পিঠে ব্যাগ আর মনে রোমাঞ্চ!",
      descriptionEn: "Rain or shine, bag packed and ready to roll!",
      colorScheme: "from-emerald-500 to-teal-700",
    };
  }

  return {
    id: "balanced_traveler",
    titleBn: "ভারসাম্যপূর্ণ পর্যটক 🎒",
    titleEn: "Balanced Traveler 🎒",
    icon: "🎒",
    descriptionBn: "কিছু প্ল্যান সফল, কিছু ব্যর্থ — জীবনের আসল সৌন্দর্য!",
    descriptionEn: "Some hits, some misses — just the beauty of life!",
    colorScheme: "from-sky-500 to-blue-700",
  };
}
