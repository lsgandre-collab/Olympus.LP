"use client";

import Link from "next/link";
import { useLang } from "@/contexts/lang-context";
import { HeroScene } from "@/components/hero-scene";

const DEMO_URL = "https://web-production-8d263.up.railway.app/";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
      <div className="absolute inset-0 z-0 opacity-40">
        <HeroScene />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 font-display text-sm font-semibold uppercase tracking-widest text-zinc-400">
          {t("Multi-Agent Seller OS", "Multi-Agent Seller OS")}
        </p>
        <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
          {t(
            "Sua loja na Amazon vende, otimiza e escala sozinha.",
            "Your Amazon store sells, optimizes and scales on its own."
          )}
        </h1>
        <p className="mt-8 text-lg text-zinc-400 md:text-xl lg:text-2xl">
          {t(
            "Enquanto você vive sua vida, 10 agentes de IA trabalham 24/7: preços, ads, estoque, listings e um CEO que orquestra tudo.",
            "While you live your life, 10 AI agents work 24/7: pricing, ads, inventory, listings and a CEO that orchestrates everything."
          )}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#waitlist"
            className="rounded-xl bg-white px-8 py-4 font-display text-base font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            {t("Entrar na Waitlist", "Join Waitlist")}
          </Link>
          <Link
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-600 bg-zinc-800/50 px-8 py-4 font-display text-base font-semibold text-white transition hover:bg-zinc-700"
          >
            {t("Ver Demo", "View Demo")}
          </Link>
        </div>
      </div>
    </section>
  );
}
