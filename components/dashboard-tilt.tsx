"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const IMAGE_PATH = "/images/dashboard-screenshot.png";
const TILT_MAX = 12;
const TILT_MOBILE = 4;

export function DashboardTilt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tiltFactor, setTiltFactor] = useState(TILT_MAX);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setTiltFactor(mq.matches ? TILT_MOBILE : TILT_MAX);
    const handler = (e: MediaQueryListEvent) =>
      setTiltFactor(e.matches ? TILT_MOBILE : TILT_MAX);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setTransform({ rotateX: -y * tiltFactor, rotateY: x * tiltFactor });
    },
    [tiltFactor]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX, e.clientY),
    [handleMove]
  );
  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  }, []);
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    },
    [handleMove]
  );

  return (
    <div
      ref={containerRef}
      className="perspective-[1200px] w-full max-w-4xl mx-auto px-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 ease-out md:transition-none will-change-transform"
        style={{
          transform: `perspective(1200px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          boxShadow: isHovering
            ? `0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`
            : "0 24px 48px -12px rgba(0,0,0,0.5)",
        }}
      >
        {imageError ? (
          <div className="aspect-video w-full bg-zinc-800/80 flex items-center justify-center text-zinc-500 text-sm border border-zinc-700 rounded-2xl">
            Adicione <code className="mx-1 px-1 bg-zinc-700 rounded">public/images/dashboard-screenshot.png</code>
          </div>
        ) : (
          <div className="relative aspect-video w-full bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGE_PATH}
              alt="OLYMPUS Dashboard"
              className="w-full h-full object-contain"
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
