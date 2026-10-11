export interface CancelReasonOption {
  id: string;
  textBn: string;
  textEn: string;
  emoji: string;
}

export const CANCEL_REASONS: CancelReasonOption[] = [
  {
    id: "tourmates_betrayal",
    textBn: "ট্যুরমেটের শেষ মুহূর্তের 'দোস্ত পেট খারাপ' অজুহাত",
    textEn: "The legendary 'Bro sudden stomach ache' excuse",
    emoji: "🤡",
  },
  {
    id: "group_silent",
    textBn: "গ্রুপ চ্যাটে সবাই সিন করে রেখে হাওয়া!",
    textEn: "Everyone seen-zoned the chat and vanished into thin air",
    emoji: "👻",
  },
  {
    id: "no_budget",
    textBn: "মানিব্যাগে শুধুই বাতাস আর কান্নার আওয়াজ",
    textEn: "Account balance strictly running on pure vibes & tears",
    emoji: "💸",
  },
  {
    id: "mom_permission",
    textBn: "আম্মা বলল: 'আগে বিসিএস/চাকরি দে, তারপর ট্যুর!'",
    textEn: "Mom declared: 'Get settled first, wanderlust can wait!'",
    emoji: "👵",
  },
  {
    id: "boss_leave_cancelled",
    textBn: "বসের মুখে ছুটির কথা বলতেই অগ্নিদৃষ্টি",
    textEn: "Boss looked at the leave request like a personal crime",
    emoji: "💼",
  },
  {
    id: "fake_fever",
    textBn: "যাত্রার আগের রাতে কাল্পনিক রহস্যময় জ্বর",
    textEn: "A 104°F phantom fever appeared out of nowhere",
    emoji: "🤒",
  },
  {
    id: "slept_late_missed",
    textBn: "অ্যালার্মের সাথে কুস্তি লড়ে সকালেই ট্রেন মিস",
    textEn: "Fought with alarm clock and overslept in victory",
    emoji: "⏰",
  },
  {
    id: "bed_is_best",
    textBn: "বিছানার সাথে আত্মার গভীর বন্ধন (কম্বলই সেরা)",
    textEn: "Bed + AC blanket proved superior to any mountain",
    emoji: "🛌",
  },
  {
    id: "sudden_daowat",
    textBn: "আকস্মিক বিয়েবাড়ি বা কাচ্চির দাওয়াত চলে আসছে",
    textEn: "Free wedding Kacchi invitation superseded the tour",
    emoji: "🍗",
  },
  {
    id: "bad_weather_excuse",
    textBn: "আকাশে এক টুকরো মেঘ দেখেই ট্যুর বাতিল",
    textEn: "Spotted one tiny raincloud and called off the expedition",
    emoji: "🌧️",
  },
  {
    id: "overthinking_tickets",
    textBn: "যাবো কি যাবো না ভাবতে ভাবতেই টিকিট শেষ",
    textEn: "Overthought until tickets were completely sold out",
    emoji: "🎟️",
  },
  {
    id: "group_admin_left",
    textBn: "গ্রুপের মেইন উদ্যোক্তাই সবার আগে গ্রুপ লেফট নিছে!",
    textEn: "The main tour organizer left the WhatsApp group first!",
    emoji: "🏃‍♂️",
  },
  {
    id: "tea_at_bailey_road",
    textBn: "ট্যুর বাদ দিয়ে বেইলি রোডে চা খেয়ে বাসায় ফেরত",
    textEn: "Abandoned the 4-day tour to drink tea at Bailey Road and go home",
    emoji: "☕",
  },
  {
    id: "bus_missed_delay",
    textBn: "বাস রাত ১১টায়, বন্ধু ১০টা ৫৯-এ বলে 'জ্যামে আছি'!",
    textEn: "Bus departs at 11:00 PM, friend texts 'Stuck in traffic' at 10:59 PM!",
    emoji: "🚌",
  },
  {
    id: "other",
    textBn: "চরম গোপন বা অবর্ণনীয় কোনো অজুহাত...",
    textEn: "Top-secret, strictly confidential excuse...",
    emoji: "🤫",
  },
];
