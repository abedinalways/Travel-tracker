import { BadgeInfo } from "@/types/trip";

export function calculateBadge(
  visitedCount: number,
  cancelledCount: number
): BadgeInfo {
  const total = visitedCount + cancelledCount;

  if (total === 0) {
    return {
      id: "fresh_canvas",
      titleBn: "অনভিজ্ঞ স্বপ্নবাজ 🌱",
      titleEn: "Innocent Dreamer 🌱",
      icon: "🌱",
      descriptionBn: "এখনও খাতা খোলা হয়নি, কোনো ট্যুরমেটের ধোঁকা খাওয়ার সৌভাগ্য হয়নি!",
      descriptionEn: "Clean slate! Has not yet been betrayed by a travel group.",
      colorScheme: "from-zinc-500 to-zinc-700",
    };
  }

  const cancelRate = (cancelledCount / total) * 100;

  if (visitedCount === 0 && cancelledCount > 0) {
    return {
      id: "sofa_explorer",
      titleBn: "সোফা পর্যটক ও বিছানার রাজা 🛋️",
      titleEn: "Couch Wanderer & Reel Explorer 🛋️",
      icon: "🛋️",
      descriptionBn: "ভ্রমণ বলতে শুধু রিলসে দেখা আর শেষ মুহূর্তে প্ল্যান ড্রপ করা!",
      descriptionEn: "Travels exclusively through Instagram reels and cancellations.",
      colorScheme: "from-orange-500 to-amber-700",
    };
  }

  if (cancelRate >= 70) {
    return {
      id: "legendary_canceller",
      titleBn: "ক্যান্সেলেশন গ্র্যান্ডমাস্টার 🪦",
      titleEn: "Grandmaster Tour Flaker 🪦",
      icon: "🪦",
      descriptionBn: "প্ল্যান করাই যার পরম শখ, আর শেষ মুহূর্তে বাদ দেওয়াই পেশা!",
      descriptionEn: "Loves making itineraries just to execute flawless 11th-hour drops.",
      colorScheme: "from-rose-500 to-red-800",
    };
  }

  if (cancelRate >= 45) {
    return {
      id: "flaky_nomad",
      titleBn: "ট্যুরমেটদের চরম কালপ্রিট 🤡",
      titleEn: "Chief Group Chat Culprit 🤡",
      icon: "🤡",
      descriptionBn: "সব গ্রুপ চ্যাটে '১০০% যাচ্ছি' বলে শেষ রাতে পেট ব্যথার অজুহাত দেয়!",
      descriptionEn: "Says '100% going!' in group chat then claims stomach ache at night.",
      colorScheme: "from-amber-500 to-orange-700",
    };
  }

  if (cancelRate >= 25) {
    return {
      id: "hesitant_traveler",
      titleBn: "সিদ্ধান্তহীন মুসাফির ⚖️",
      titleEn: "Overthinking Voyager ⚖️",
      icon: "⚖️",
      descriptionBn: "যাবো কি যাবো না ভাবতে ভাবতেই কাউন্টারে টিকিট শেষ হয়ে যায়!",
      descriptionEn: "Overthinks every detail until tickets are sold out.",
      colorScheme: "from-purple-500 to-indigo-700",
    };
  }

  if (visitedCount >= 15 && cancelRate < 15) {
    return {
      id: "unstoppable_nomad",
      titleBn: "অপ্রতিরোধ্য যাযাবর ✈️",
      titleEn: "Unstoppable Nomad ✈️",
      icon: "✈️",
      descriptionBn: "বৃষ্টি-বাদল বা বসের বকা—কোনোটাতেই পিঠের ব্যাগ আটকায় না!",
      descriptionEn: "Rain or boss's glare—nothing stops the backpack from rolling!",
      colorScheme: "from-emerald-500 to-teal-700",
    };
  }

  return {
    id: "balanced_traveler",
    titleBn: "বাস্তববাদী পরিব্রাজক 🎒",
    titleEn: "Pragmatic Explorer 🎒",
    icon: "🎒",
    descriptionBn: "কিছু ট্যুর স্মৃতি হয়ে বাঁচে, কিছু ড্রপ অভিজ্ঞতা হয়ে হাসায়!",
    descriptionEn: "Some trips become fond memories, some drops become funny stories!",
    colorScheme: "from-sky-500 to-blue-700",
  };
}
