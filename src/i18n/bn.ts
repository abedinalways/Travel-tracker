export const bn = {
  appName: "CancelTour & Beyond",
  tagline: "প্ল্যান যত, ভ্রমণ তত নয় — আপনার ট্রিপ আর ক্যান্সেলেশনের নিখুঁত হিসাব!",
  subTagline: "৬৪ জেলার কতটুকু ঘুরলেন আর কতগুলো প্ল্যান শেষ মুহূর্তে ভেস্তে গেল?",

  // Navigation & Actions
  nav: {
    bangladesh: "বাংলাদেশ (৬৪ জেলা)",
    world: "বিশ্ব ভ্রমণ",
    share: "সোশ্যাল কার্ড জেনারেটর",
    backup: "ব্যাকআপ ও রিস্টোর",
    reset: "সব মুছুন",
    language: "Language",
  },

  // Statuses
  status: {
    visited: "ঘুরেছি",
    planned: "প্ল্যানে আছে",
    cancelled: "বাতিল / ড্রপ",
    bucketlist: "একদিন যাবো",
    never: "প্ল্যানও করি নাই",
    visitedDesc: "পদচিহ্ন এঁকে এসেছি",
    plannedDesc: "তারিখ ঠিক, টিকিট কাটা বাকি",
    cancelledDesc: "ট্যুরমেট বা ভাগ্যের ধোঁকা",
    bucketlistDesc: "স্বপ্নের বাকেট লিস্ট",
    neverDesc: "তালিকার বাইরে",
  },

  // Stats
  stats: {
    overview: "ভ্রমণ ও ক্যান্সেলেশন পরিসংখ্যান",
    visitedDistricts: "ঘোরা হয়েছে",
    cancelledDistricts: "ড্রপ হয়েছে",
    plannedDistricts: "আপকামিং",
    bucketlistDistricts: "স্বপ্নে আছে",
    cancelRate: "ক্যান্সেলেশন রেট",
    completionRate: "বাংলাদেশ কভার্ড",
    yourTitle: "আপনার ট্রাভেলার উপাধি",
    nicknamePlaceholder: "আপনার ডাকনাম লিখুন (যেমন: নিওন ট্রাভেলার)",
  },

  // Drawer & Form
  drawer: {
    selectStatus: "এই জেলার বর্তমান অবস্থা নির্বাচন করুন",
    cancelReasonTitle: "কী কারণে ট্যুরটি ভেস্তে গেল? (সততার সাথে বলুন)",
    customReasonPlaceholder: "নিজের গোপন অজুহাত লিখুন...",
    visitedDetailsTitle: "ভ্রমণের মধুর স্মৃতি ও প্রমাণাদি",
    travelDate: "ভ্রমণের তারিখ",
    favoriteSpot: "সবচেয়ে পছন্দের জায়গা / স্পট",
    favoriteSpotPlaceholder: "যেমন: নীলাচল, সাজেক ভ্যালি, সেন্টমার্টিন",
    favoriteFood: "সেরা স্থানীয় খাবার",
    favoriteFoodPlaceholder: "যেমন: চুইঝাল খাসি, কাচ্চি, চমচম",
    rating: "অভিজ্ঞতার রেটিং",
    notes: "ছোট চিরকুট বা ডায়েরি",
    notesPlaceholder: "কেমন ছিল অভিজ্ঞতা? কোনো মজার ঘটনা...",
    attachPhotos: "ছবি যুক্ত করুন (সর্বোচ্চ ৩টি)",
    uploadHint: "ছবিগুলো স্বয়ংক্রিয়ভাবে কম্প্রেস হয়ে আপনার ব্রাউজারে সেভ হবে",
    saveChanges: "সংরক্ষণ করুন",
    resetStatus: "স্ট্যাটাস মুছুন",
    close: "বন্ধ করুন",
  },

  // Social Share Modal
  shareModal: {
    title: "ভাইরাল সোশ্যাল স্টোরি কার্ড",
    subtitle: "ইনস্টাগ্রাম, ফেসবুক বা হোয়াটসঅ্যাপ স্টোরিতে বন্ধুদের সাথে শেয়ার করুন!",
    formatStory: "স্টোরি মোড (9:16)",
    formatFeed: "পোস্ট মোড (1:1)",
    downloading: "কার্ড তৈরি হচ্ছে...",
    downloadBtn: "কার্ড ডাউনলোড করুন",
    cardWatermark: "CancelTour & Beyond 🇧🇩",
    funQuote: "প্ল্যান হয় গ্রুপে, ভ্রমণ হয় একা অথবা ক্যান্সেলেশন দিয়ে শেষ!",
  },

  // Backup & Restore
  backupModal: {
    title: "ডাটা ব্যাকআপ ও রিস্টোর (Local-First)",
    description: "আপনার সমস্ত ডাটা এবং ছবি আপনার ব্রাউজারের IndexedDB-তে সুরক্ষিত। সার্ভারে কিছু যায় না!",
    exportBtn: "JSON ব্যাকআপ ডাউনলোড",
    importBtn: "ব্যাকআপ ফাইল রিস্টোর করুন",
    dangerZone: "সকল ডাটা ক্লিয়ার করুন",
    dangerConfirm: "আপনি কি নিশ্চিত? সমস্ত ট্রিপ ডাটা চিরতরে মুছে যাবে!",
    restoreSuccess: "ডাটা সফলভাবে রিস্টোর হয়েছে!",
    restoreError: "ভুল ফাইল ফরম্যাট! সঠিক JSON ফাইল আপলোড করুন।",
  },

  // General & Microcopy
  common: {
    searchPlaceholder: "জেলা বা বিভাগ খুঁজুন...",
    allDivisions: "সকল বিভাগ",
    loading: "লোড হচ্ছে...",
    emptySearch: "কোনো জেলা পাওয়া যায়নি!",
    districtsCount: "জেলা",
  },
};
