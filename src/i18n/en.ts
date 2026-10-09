import { bn } from "./bn";

export const en: typeof bn = {
  appName: "CancelTour & Beyond",
  tagline: "Big Plans, Empty Itineraries — Your Ultimate Travel & Drop Tracker!",
  subTagline: "How many of the 64 districts did you actually visit vs flaked out at the last hour?",

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
    importBtn: "Restore from JSON File",
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
  },
};
