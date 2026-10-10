"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Bengali on first render so server and client HTML match,
  // then load the persisted preference after mount to avoid a hydration
  // mismatch (reading localStorage during the useState initializer would
  // make the client's first render differ from the server's).
  const [language, setLanguageState] = useState<Language>("bn");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("canceltour_lang") as Language;
      if (saved === "bn" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // LocalStorage not available or restricted
    }
  }, []);

  // Keep <html lang> in sync for accessibility / screen readers.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("canceltour_lang", lang);
    } catch {
      // ignore
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
