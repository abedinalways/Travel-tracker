"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const { language } = useLanguage();

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-14 h-14",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Luxury U-Turn Plane Emblem */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-xl bg-secondary p-0.5 border border-border group hover:border-primary/50 transition-all duration-300`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full rounded-[14px] overflow-hidden"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Theme 2-color gradients */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="emeraldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="emblemAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background aura */}
          <rect width="100" height="100" fill="url(#emblemAura)" />

          {/* Outer fine luxury compass ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          />

          {/* North/South compass pips */}
          <circle cx="50" cy="10" r="1.5" fill="var(--primary)" />
          <circle cx="50" cy="90" r="1.5" fill="var(--primary)" />
          <circle cx="10" cy="50" r="1.5" fill="var(--primary)" />
          <circle cx="90" cy="50" r="1.5" fill="var(--primary)" />

          {/* Funny U-turn flight trajectory (Going out enthusiastically then doing a U-turn home!) */}
          <path
            d="M 28 72 C 28 35, 74 30, 74 52 C 74 68, 48 68, 48 56"
            stroke="url(#emeraldGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="5 3"
            className="group-hover:stroke-primary transition-colors"
          />

          {/* Supersonic jet heading back home */}
          <g transform="translate(48, 56) rotate(-140) scale(0.9)">
            <path
              d="M 0 -14 L 8 10 L 0 5 L -8 10 Z"
              fill="url(#goldGrad)"
            />
          </g>

          {/* Cozy Home/Bed Pin where the journey started and ended */}
          <circle cx="28" cy="72" r="3.5" fill="var(--primary)" />
          <circle cx="28" cy="72" r="6" stroke="var(--primary)" strokeWidth="1" opacity="0.6" />
        </svg>

        {/* Playful mini notification badge on the logo corner */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background flex items-center justify-center animate-pulse" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center">
              DropTrip
              <span className="ml-1 text-xs font-mono font-bold px-1.5 py-0.5 rounded-sm bg-secondary text-primary border border-border">
                PRO
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-muted-foreground leading-none mt-0.5">
            <span className="text-primary font-semibold">
              CancelTour & Beyond
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="hidden sm:inline italic text-zinc-400">
              {language === "bn" ? "প্ল্যান যত, ড্রপও তত!" : "The Flake Chronicles"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
