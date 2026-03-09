"use client";

import { useEffect, useState } from "react";

const DOTS = [
  { color: "#8b5cf6", x: 8, y: 5, size: 10 },
  { color: "#22c55e", x: 88, y: 12, size: 8 },
  { color: "#3b82f6", x: 15, y: 25, size: 9 },
  { color: "#eab308", x: 75, y: 30, size: 11 },
  { color: "#ec4899", x: 45, y: 18, size: 7 },
  { color: "#f97316", x: 92, y: 42, size: 9 },
  { color: "#14b8a6", x: 5, y: 55, size: 10 },
  { color: "#a855f7", x: 35, y: 65, size: 8 },
  { color: "#d4af77", x: 62, y: 48, size: 12 },
  { color: "#6366f1", x: 82, y: 72, size: 8 },
  { color: "#8b5cf6", x: 20, y: 80, size: 7 },
  { color: "#22c55e", x: 55, y: 88, size: 9 },
  { color: "#f97316", x: 70, y: 95, size: 8 },
  { color: "#ec4899", x: 10, y: 92, size: 6 },
  { color: "#3b82f6", x: 90, y: 60, size: 7 },
];

export function GlobalDots() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const maxScroll = typeof document !== "undefined" ? document.body.scrollHeight - window.innerHeight : 5000;
  const progress = Math.min(scrollY / (maxScroll || 1), 1);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {DOTS.map((d, i) => {
        const parallaxY = (scrollY * 0.02 * (i % 3 === 0 ? 1 : i % 3 === 1 ? -0.5 : 0.7)) % 40;
        const opShift = 0.15 + progress * 0.2 * (i % 2 === 0 ? 1 : -0.5);
        const op = Math.max(0.08, Math.min(0.4, opShift));
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              backgroundColor: d.color,
              boxShadow: `0 0 ${12 + progress * 12}px ${d.color}60`,
              opacity: op,
              transform: `translateY(${parallaxY}px)`,
              animation: `float 4s ease-in-out ${i * 0.3}s infinite`,
              transition: "opacity 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}
