"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/error-boundary";

const HeroSceneInner = dynamic(
  () => import("@/components/hero-scene-inner").then((m) => m.HeroSceneInner),
  { ssr: false, loading: () => <div className="absolute inset-0 z-0 bg-black/20" aria-hidden /> }
);

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none min-h-[400px] w-full">
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-black/20" />}>
        <HeroSceneInner />
      </ErrorBoundary>
    </div>
  );
}
