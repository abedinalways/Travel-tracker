import { bn } from "./bn";

export const en: typeof bn = {
  appName: "DropTrip: CancelTour & Beyond",
  tagline: "Big Plans, Empty Itineraries — The Art of Flaking Out in Luxury!",
  subTagline:
    "How many of the 64 districts did you actually conquer vs bailed out at the 11th hour? 😂",

  // Funny Travel Memes Ticker
  funQuotes: [
    "💡 Golden Rule: The friend who hypes up the tour the most in WhatsApp cancels first on departure morning!",
    "☕ True travel purpose: Traveling 300km away just to drink an overpriced cup of tea!",
    "💸 The biggest obstacle to becoming a nomad is not geographical distance, it's the bank balance!",
    "🛌 The plan was to hike misty peaks, but ended up sipping tea on the porch wrapped in a blanket!",
    "🎒 Before the luggage was even zipped, the text arrived: 'Bro, mom strictly said no!'",
    "🏖️ Didn't get tickets to Saint Martin? Don't worry, go to your rooftop and enjoy the breeze!",
    "🎟️ Travel Rule #1: 15 people say '100% going', only 2 remain when it's time to buy tickets!",
    "👔 Boss looked at the leave request like I asked him to transfer company ownership to my name!",
    "📱 Real vacation photography: 3000 photos taken, 2999 of them blurry with closed eyes!",
    "🚌 Bus departs at 11:00 PM, one friend texts 'Stuck in traffic' at 10:59 PM!",
    "🍗 The only 100% successful part of the trip: Eating highway parathas and dal fry!",
  ],

  // Hero Section
  hero: {
    title: "Plan vs Reality: The 64-District Chronicle 🗺️",
    subtitle:
      "All 64 districts of Bangladesh and the whole world — where you actually left footprints, where you only watched reels, and where your friends flaked on you! All on one interactive map.",
    ctaShare: "Viral Story Card 🔥",
    ctaBackup: "Data Backup 💾",
    shuffleMeme: "Shuffle Traveler Truth 🎲",
  },

  // Navigation & Actions
  nav: {
    bangladesh: "Bangladesh (64 Districts)",
    world: "World Odyssey",
    share: "Social Card Generator",
    backup: "Backup & Restore",
    reset: "Reset All",
    language: "ভাষা",
  },

  status: {
    visited: "Visited 🎒",
    planned: "Upcoming 🎟️",
    cancelled: "Dropped / Flaked 🪦",
    bucketlist: "Bucket List 💭",
    never: "Off Radar 💤",
    visitedDesc: "Physically stood there and took photos!",
    plannedDesc: "Dates locked, packing bags soon",
    cancelledDesc: "Betrayed by friends or cruel fate",
    bucketlistDesc: "One day when the wallet permits",
    neverDesc: "Hasn't crossed the mind yet",
  },

  stats: {
    overview: "Travel & Cancellation Stats",
    visitedDistricts: "Conquered 🎒",
    cancelledDistricts: "Dropped Trips 🪦",
    plannedDistricts: "Upcoming 🎟️",
    bucketlistDistricts: "Bucket List 💭",
    cancelRate: "Cancellation Ratio",
    completionRate: "Bangladesh Covered",
    yourTitle: "Your Traveler Title 🏆",
    nicknamePlaceholder: "Your nomad alias (e.g. Chai Addict Traveler)",
    cancelledSub: "Trips that got flaked",
    cancelledNote: "Living witness to your friends' last-minute excuses",
    dropRatio: "Drop Ratio",
  },

  drawer: {
    selectStatus: "What's the real status here? (Be brutally honest)",
    cancelReasonTitle: "Why did the plan crash? (No self-deception)",
    customReasonPlaceholder: "Type your top secret excuse...",
    visitedDetailsTitle: "Travel Memories & Eyewitness Proof",
    travelDate: "Date of Visit",
    favoriteSpot: "Favorite Spot / Hidden Gem",
    favoriteSpotPlaceholder: "e.g. Nilachal, Sajek Valley, Saint Martin Jetty",
    favoriteFood: "Mouth-watering Local Food",
    favoriteFoodPlaceholder: "e.g. Chui Jhal Mutton, Kacchi Biryani, Bogra Curd",
    rating: "How was the actual experience?",
    notes: "Short Tour Journal / Diary",
    notesPlaceholder: "How was the vibe? Any hilarious stories or mishaps...",
    attachPhotos: "Attach Photos (Max 3)",
    uploadHint: "Photos are compressed and stored locally in your browser",
    saveChanges: "Save Changes",
    resetStatus: "Clear Status",
    close: "Close",
    quickFacts: "Region Quick Fact",
    divisionLabel: "Division",
    currentStatus: "Current Status",
    notSet: "Nothing recorded yet",
    viewOnMap: "View on Map",
    ratingLabels: {
      1: "Never again, spare my life! 💀",
      2: "Been there once, won't return 😐",
      3: "Decent, friends' fault though 🤷",
      4: "Had solid fun! 🥳",
      5: "Phenomenal! Going back soon 🔥",
    },
  },

  shareModal: {
    title: "Viral Social Story Card",
    subtitle: "Share on Instagram, Facebook or WhatsApp stories to call out your flaky friends!",
    formatStory: "Story Mode (9:16)",
    formatFeed: "Square Post (1:1)",
    downloading: "Rendering card...",
    downloadBtn: "Download Card 📥",
    cardWatermark: "CancelTour & Beyond 🇧🇩",
    funQuote: "Plans are hyped in group chats, tours end in cancellations!",
  },

  backupModal: {
    title: "Data Backup & Restore (Local-First)",
    description: "All your data and compressed photos are stored in browser IndexedDB. Zero cloud leaks!",
    exportBtn: "Download JSON Backup",
    exportSub: "Save all statuses & memories locally",
    importBtn: "Restore from JSON File",
    importSub: "Restore from a previously saved JSON file",
    dangerZone: "Clear All Data",
    dangerConfirm: "Are you sure? All your saved trips and photos will be permanently deleted!",
    restoreSuccess: "Data successfully restored!",
    restoreError: "Invalid file format! Please select a valid JSON backup.",
  },

  common: {
    searchPlaceholder: "Search district or division...",
    allDivisions: "All Divisions",
    loading: "Loading...",
    emptySearch: "No districts found!",
    districtsCount: "Districts",
    countriesCount: "Countries",
    visitedLabel: "Conquered",
    maxPhotos: "You can attach a maximum of 3 photos!",
    exportFailed: "Could not generate image, please try again!",
  },

  toast: {
    saved: "Saved successfully! 🎉",
    deleted: "Status has been removed.",
    exportSuccess: "Backup downloaded! 💾",
    exportError: "Could not create backup.",
    resetSuccess: "All data has been cleared.",
    saveError: "Could not save, please try again.",
  },

  confirm: {
    confirm: "Yes, I'm sure",
    cancel: "Cancel",
  },

  footer: {
    brandTagline: "Big plans, empty itineraries — keep count of your travels and drops.",
    privacyNote: "100% local — your data stays safely in your browser.",
    rights: "All rights reserved",
    madeWith: "For passionate dreamers & perpetual tour droppers",
  },
};
