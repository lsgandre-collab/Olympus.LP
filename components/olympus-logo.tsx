"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface OlympusLogoProps {
  className?: string;
  showSymbol?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { omega: "text-2xl sm:text-3xl", svgH: "h-6 sm:h-8" },
  md: { omega: "text-3xl sm:text-4xl md:text-5xl", svgH: "h-8 sm:h-10 md:h-12" },
  lg: { omega: "text-4xl sm:text-5xl md:text-6xl", svgH: "h-10 sm:h-12 md:h-14" },
};

export function OlympusLogo({ className, showSymbol = true, size = "md" }: OlympusLogoProps) {
  const s = sizeMap[size];
  const id = useId().replace(/:/g, "-");
  const gId = `ol-grad-${id}`;

  return (
    <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
      {showSymbol && (
        <span className={cn("font-display font-bold leading-none flex-shrink-0", s.omega)} style={{ color: "#14b8a6" }} aria-hidden>
          Ω
        </span>
      )}
      <svg viewBox="0 0 280 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("flex-shrink-0", s.svgH)} aria-label="OLYMPUS">
        <defs>
          <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
        <text x="0" y="36" fill={`url(#${gId})`} fontFamily="var(--font-display), system-ui, sans-serif" fontWeight="700" fontSize="42" letterSpacing="-0.02em">OLYMPUS</text>
      </svg>
    </div>
  );
}
