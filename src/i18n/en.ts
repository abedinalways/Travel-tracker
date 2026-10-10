import { bn } from "./bn";

export const en: typeof bn = {
  appName: "DropTrip: CancelTour & Beyond",
  tagline: "Big Plans, Empty Itineraries — The Art of Flaking Out in Luxury!",
  subTagline:
    "How many of the 64 districts did you actually visit vs flaked out at the last hour?",

  // Hero Section
  hero: {
    title: "Your Travel & Drop Ledger",
    subtitle:
      "All 64 districts of Bangladesh and the whole world — where you went, where you planned, and where you bailed at the last minute! All on one map, right in your browser.",
    ctaShare: "Make a Story Card",
    ctaBackup: "Get Backup",
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
    visited: "Visited",
    planned: "Planned",
    cancelled: "Cancelled / Dropped",
    bucketlist: "Bucket List",
    never: "Never Planned",
    visitedDesc: "Left your footprints here",
    plannedDesc: "Dates set, bags ready",
    cancelledDesc: "Betrayed by friends or fate",
    bucketlistDesc: "One day in life",
    neverDesc: "Not even in thoughts",
  },

  stats: {
    overview: "Travel & Cancellation Stats",
    visitedDistricts: "Visited",
    cancelledDistricts: "Dropped",
    plannedDistricts: "Upcoming",
    bucketlistDistricts: "Bucket List",
    cancelRate: "Cancellation Rate",
    completionRate: "Bangladesh Covered",
    yourTitle: "Your Traveler Title",
    nicknamePlaceholder: "Enter your nickname (e.g. Neon Nomad)",
    cancelledSub: "Trips that got flaked",
    cancelledNote: "Witness to your friends' last-minute betrayal",
    dropRatio: "Drop Ratio",
  },

  drawer: {
    selectStatus: "Select Status for this Region",
    cancelReasonTitle: "Why did the plan crash? (Be brutally honest)",
    customReasonPlaceholder: "Type your top secret excuse...",
    visitedDetailsTitle: "Travel Memories & Proof",
    travelDate: "Date of Visit",
    favoriteSpot: "Favorite Spot / Location",
    favoriteSpotPlaceholder: "e.g. Nilachal, Sajek Valley, Saint Martin",
    favoriteFood: "Best Local Food",
    favoriteFoodPlaceholder: "e.g. Chui Jhal, Kacchi, Chamcham",
    rating: "Experience Rating",
    notes: "Short Journal / Note",
    notesPlaceholder: "How was the vibe? Any hilarious stories...",
    attachPhotos: "Attach Photos (Max 3)",
    uploadHint: "Photos are compressed and stored locally in your browser",
    saveChanges: "Save Changes",
    resetStatus: "Clear Status",
    close: "Close",
    quickFacts: "About This Region",
    divisionLabel: "Division",
    currentStatus: "Current Status",
    notSet: "Nothing saved yet",
    viewOnMap: "View on Map",
  },

  shareModal: {
    title: "Viral Social Story Card",
    subtitle: "Share with friends on Instagram, Facebook or WhatsApp stories!",
    formatStory: "Story Mode (9:16)",
    formatFeed: "Square Post (1:1)",
    downloading: "Rendering card...",
    downloadBtn: "Download Card",
    cardWatermark: "CancelTour & Beyond 🇧🇩",
    funQuote: "Plans are made in group chats, tours end in cancellations!",
  },

  backupModal: {
    title: "Data Backup & Restore (Local-First)",
    description: "All your data and compressed photos are stored in IndexedDB. Zero cloud leaks!",
    exportBtn: "Download JSON Backup",
    exportSub: "Save all statuses & memories locally",
    importBtn: "Restore from JSON File",
    importSub: "Restore from a previously saved JSON",
    dangerZone: "Clear All Data",
    dangerConfirm: "Are you sure? All your saved trips will be permanently deleted!",
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
    visitedLabel: "Visited",
    maxPhotos: "You can attach a maximum of 3 photos!",
    exportFailed: "Could not generate image, please try again!",
  },

  toast: {
    saved: "Saved successfully!",
    deleted: "Status has been removed.",
    exportSuccess: "Backup downloaded!",
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
    privacyNote: "100% local — your data stays in your browser.",
    rights: "All rights reserved",
    madeWith: "For passionate dreamers & perpetual tour droppers",
  },
};
