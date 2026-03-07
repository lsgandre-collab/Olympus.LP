"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface OlympusLogoProps {
  className?: string;
  showSymbol?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { text: "text-2xl", symbol: "w-8 h-8" },
  md: { text: "text-4xl", symbol: "w-12 h-12" },
  lg: { text: "text-5xl", symbol: "w-14 h-14" },
};

export function OlympusLogo({
  className,
  showSymbol = true,
  size = "md",
}: OlympusLogoProps) {
  const { text: textSize, symbol: symbolSize } = sizeMap[size];
  const id = useId().replace(/:/g, "-");
  const goldId = `olympus-gold-${id}`;
  const glowId = `olympus-glow-${id}`;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {showSymbol && (
        <div
          className={cn(
            "rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#b91c1c] via-[#991b1b] to-[#d4af77] shadow-olympus-glow",
            symbolSize
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-1/2 h-1/2 text-black"
            aria-hidden
          >
            <path
              d="M12 2L2 7v10l10 5 10-5V7L12 2z"
              fill="currentColor"
              opacity={0.9}
            />
          </svg>
        </div>
      )}
      <svg
        viewBox="0 0 280 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("flex-shrink-0", textSize)}
        aria-label="OLYMPUS"
      >
        <defs>
          <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af77" />
            <stop offset="50%" stopColor="#f0d9a0" />
            <stop offset="100%" stopColor="#d4af77" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feFlood floodColor="#b91c1c" floodOpacity="0.4" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="0"
          y="36"
          fill={`url(#${goldId})`}
          filter={`url(#${glowId})`}
          fontFamily="var(--font-cinzel), Cinzel, Georgia, serif"
          fontWeight="900"
          fontSize="42"
          letterSpacing="-0.02em"
        >
          OLYMPUS
        </text>
      </svg>
    </div>
  );
}
