"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Grid mesh background */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.05,
        }}
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Vertical grid lines */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 100}
            y1="0"
            x2={i * 100}
            y2="800"
            stroke="url(#gridGradient)"
            strokeWidth="0.5"
            opacity="0.6"
          />
        ))}

        {/* Horizontal grid lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 100}
            x2="1200"
            y2={i * 100}
            stroke="url(#gridGradient)"
            strokeWidth="0.5"
            opacity="0.6"
          />
        ))}
      </svg>

      {/* Animated data pulse particles */}
      <div className="absolute inset-0">
        {/* Particle 1 - Teal pulse along diagonal path */}
        <div
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "#14b8a6",
            boxShadow: "0 0 8px rgba(20, 184, 166, 0.6)",
            animation: `dataPulseOne 8s ease-in-out infinite`,
            opacity: 0.07,
            left: "10%",
            top: "20%",
          }}
        />

        {/* Particle 2 - Gold pulse along different path */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: "#eab308",
            boxShadow: "0 0 10px rgba(234, 179, 8, 0.5)",
            animation: `dataPulseTwo 10s ease-in-out infinite`,
            opacity: 0.06,
            left: "75%",
            top: "30%",
          }}
        />

        {/* Particle 3 - Teal pulse along vertical path */}
        <div
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "#14b8a6",
            boxShadow: "0 0 8px rgba(20, 184, 166, 0.5)",
            animation: `dataPulseThree 9s ease-in-out infinite`,
            opacity: 0.065,
            left: "45%",
            top: "10%",
          }}
        />

        {/* Particle 4 - Gold pulse along horizontal path */}
        <div
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "#eab308",
            boxShadow: "0 0 8px rgba(234, 179, 8, 0.5)",
            animation: `dataPulseFour 11s ease-in-out infinite`,
            opacity: 0.055,
            left: "20%",
            top: "65%",
          }}
        />

        {/* Particle 5 - Teal secondary pulse */}
        <div
          className="absolute w-0.5 h-0.5 rounded-full"
          style={{
            background: "#14b8a6",
            boxShadow: "0 0 6px rgba(20, 184, 166, 0.4)",
            animation: `dataPulseFive 7s ease-in-out infinite`,
            opacity: 0.04,
            left: "85%",
            top: "55%",
          }}
        />
      </div>

      {/* CSS Animations embedded as style tag to ensure they work */}
      <style>{`
        @keyframes dataPulseOne {
          0% {
            transform: translate(0, 0);
            opacity: 0.07;
          }
          25% {
            transform: translate(80px, 60px);
            opacity: 0.08;
          }
          50% {
            transform: translate(120px, 140px);
            opacity: 0.06;
          }
          75% {
            transform: translate(60px, 100px);
            opacity: 0.07;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.07;
          }
        }

        @keyframes dataPulseTwo {
          0% {
            transform: translate(0, 0);
            opacity: 0.06;
          }
          25% {
            transform: translate(-60px, 100px);
            opacity: 0.07;
          }
          50% {
            transform: translate(-100px, 160px);
            opacity: 0.065;
          }
          75% {
            transform: translate(-40px, 80px);
            opacity: 0.06;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.06;
          }
        }

        @keyframes dataPulseThree {
          0% {
            transform: translate(0, 0);
            opacity: 0.065;
          }
          25% {
            transform: translate(20px, 80px);
            opacity: 0.07;
          }
          50% {
            transform: translate(0px, 180px);
            opacity: 0.065;
          }
          75% {
            transform: translate(-20px, 100px);
            opacity: 0.06;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.065;
          }
        }

        @keyframes dataPulseFour {
          0% {
            transform: translate(0, 0);
            opacity: 0.055;
          }
          25% {
            transform: translate(100px, 0px);
            opacity: 0.065;
          }
          50% {
            transform: translate(200px, 20px);
            opacity: 0.06;
          }
          75% {
            transform: translate(80px, -10px);
            opacity: 0.055;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.055;
          }
        }

        @keyframes dataPulseFive {
          0% {
            transform: translate(0, 0);
            opacity: 0.04;
          }
          33% {
            transform: translate(-60px, -80px);
            opacity: 0.05;
          }
          66% {
            transform: translate(-120px, -140px);
            opacity: 0.045;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.04;
          }
        }
      `}</style>
    </div>
  );
}
