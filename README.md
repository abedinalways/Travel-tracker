# 🧭 DropTrip: CancelTour & Beyond 🇧🇩

> **The Art of Flaking Out in Luxury | ভ্রমণের চেয়ে ক্যান্সেলেশনের নিখুঁত ও বিলাসবহুল হিসাব!**  
> *Track which of Bangladesh's 64 districts you've actually explored — and which trips miserably crashed at the 11th hour.*

---

## 🌟 Overview

**DropTrip** is a production-ready, ultra-modern, and humorous yet luxury-themed travel tracker web application built for the dreamers, nomads, and perpetual tour flakers of Bangladesh.

Built with a **Local-First Architecture** (Zero server storage, 100% privacy via IndexedDB), it features interactive SVG vector maps of all 64 districts of Bangladesh and the world, witty Bengali cancellation reasons, memory journals with image compression, and a viral 1-click social story card generator for Instagram and Facebook.

---

## 🚀 Key Features

### 1. 🎨 Midnight Glassmorphism UI
- **Aesthetic:** Deep slate/zinc `#09090b` canvas with crisp `#27272a` borders, subtle amber-gold foil accents, and emerald neon glows.
- **Bilingual Engine:** Seamless 1-click switch between **Bangla (বাংলা 🇧🇩)** and **English (🌍)**.
- **60-120 FPS Performance:** Zero-scroll-lag GPU ambient compositing and memoized SVG vector rendering.

### 2. 🗺️ Interactive Maps (Bangladesh & World)
- **High-Precision SVG Geometries:** All 64 districts of Bangladesh accurately mapped and interactive.
- **5 Dynamic Status States:**
  - 🟢 **Visited (ঘুরেছি)** — Left footprints and proof.
  - 🟡 **Planned (প্ল্যানে আছে)** — Dates fixed, bags waiting.
  - 🔴 **Cancelled (বাতিল / ড্রপ)** — Betrayed by friends or fate.
  - 🟣 **Bucket List (একদিন যাবো)** — Lifelong travel aspirations.
  - ⚪ **Never Planned (প্ল্যানও করি নাই)** — Uncharted territory.
- **World Odyssey Mode:** Interactive world map to log global travels and dream destinations.
- **Instant Autocomplete Search & Division Filters:** Rapidly locate any district across the 8 administrative divisions.

### 3. 🤡 Hilarious Bengali Cancellation Presets
When marking a tour as **Cancelled (ড্রপ)**, choose from brutally honest and funny presets:
- *"ট্যুরমেটদের শেষ মুহূর্তের ধোঁকা"*
- *"পকেটে টান / একাউন্টে মাছি ওড়ে"*
- *"আম্মা পারমিশন দেয় নাই (বাঁচিয়ে দিলেন)"*
- *"অফিসের বসের ছুটির দরখাস্ত বাতিল"*
- *"মেঘ দেখেই ভয়, আবহাওয়া খারাপের অজুহাত"*
- *"ঘুম ভাঙ্গে নাই, বাস/ট্রেন মিস"*
- *"যাত্রার আগের রাতে কাল্পনিক জ্বর"*
- *"গোপন অজুহাত..."*

### 4. 📸 Travel Memory Vault
- For **Visited** districts, attach 1–3 photos (automatically compressed in-browser to WebP).
- Record visited dates, favorite local foods (*যেমন: চুইঝাল, কাচ্চি, চমচম*), favorite spots, and 1–5 star ratings.

### 5. 🏆 Viral Social Story Card Generator
Export your travel and cancellation track record directly to your camera roll using `html-to-image`:
- **Format 1: Instagram/Facebook Story** (9:16 aspect ratio — 1080x1920)
- **Format 2: Square Feed Post** (1:1 aspect ratio — 1080x1080)
- **Dynamic Badge Calculation:**
  - *Cancel Rate > 70%:* **প্রফেশনাল প্ল্যান ভেস্তে দেওয়া কিংবদন্তি 🏆**
  - *Cancel Rate 45-70%:* **ট্যুরমেটদের চিরচেনা ধোঁকাবাজ 🎭**
  - *Cancel Rate 25-45%:* **দ্বিধাদ্বন্দ্বে থাকা মুসাফির ⚖️**
  - *Visited ≥ 15 & Cancel Rate < 15%:* **ঘুরন্ত যাযাবর ও আসল অভিযাত্রী ✈️**

### 6. 🔒 Local-First & Privacy First
- **Dexie.js (IndexedDB):** All data, memories, and photos stay inside your browser. No login, no trackers, no database leaks.
- **1-Click Backup & Restore:** Export your full travel vault into a portable JSON backup file and restore anytime.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **Database:** Dexie.js (IndexedDB wrapper) + `dexie-react-hooks`
- **Media Optimization:** `browser-image-compression` (client-side WebP compression)
- **Social Rendering:** `html-to-image`
- **Micro-Interactions:** `canvas-confetti`
- **Analytics:** `@vercel/analytics`

---

## 💻 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/abedinalways/Travel-tracker.git
cd Travel-tracker

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

---

## 🌿 Git Branching Strategy

This project strictly follows the **Git-Flow** methodology:
- `main`: Production-ready releases (`v1.0.0`, `v1.0.1`).
- `develop`: Integration branch for all merged features.
- `feature/*`: Dedicated branches for each isolated feature module.

---

## 📜 License

MIT License © 2026 [DropTrip](https://github.com/abedinalways/Travel-tracker). Built with ❤️ for passionate dreamers and perpetual tour droppers.
