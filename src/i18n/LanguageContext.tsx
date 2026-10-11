"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { bn } from "./bn";
import { en } from "./en";

export type Language = "bn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof bn;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "canceltour_lang";
// Fired in the current tab so useSyncExternalStore re-reads after we write.
const LANG_CHANGE_EVENT = "canceltour:lang-change";

function readStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "bn";
  } catch {
    // LocalStorage not available or restricted
    return "bn";
  }
}

function subscribe(onStoreChange: () => void): () => void {
  // "storage" keeps other tabs in sync; the custom event updates this tab.
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANG_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANG_CHANGE_EVENT, onStoreChange);
  };
}

function getSnapshot(): Language {
  return readStoredLanguage();
}

// Server always renders the Bengali default so HTML matches the client's
// first paint; the stored preference is applied after hydration without a
// mismatch (useSyncExternalStore re-renders when the snapshot differs).
function getServerSnapshot(): Language {
  return "bn";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep <html lang> in sync for accessibility / screen readers.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore write failures; snapshot still reads current value
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "bn" ? "en" : "bn");
  };

  const t = language === "bn" ? bn : en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
