"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";
import { useLang } from "@/contexts/lang-context";

const DEMO_SCREENS = [
  {
    src: "/images/dashboard-screenshot.png",
    labelPt: "Dashboard Principal",
    labelEn: "Main Dashboard",
    descPt: "Vis\u00e3o geral de todos os agentes, m\u00e9tricas e resultados em tempo real.",
    descEn: "Overview of all agents, metrics and results in real-time.",
  },
  {
    src: "/images/dashboard-agents.png",
    labelPt: "Painel de Agentes",
    labelEn: "Agents Panel",
    descPt: "Status individual de cada agente com a\u00e7\u00f5es recentes e performance.",
    descEn: "Individual status of each agent with recent actions and performance.",
  },
  {
    src: "/images/dashboard-analytics.png",
    labelPt: "Analytics & Relat\u00f3rios",
    labelEn: "Analytics & Reports",
    descPt: "Relat\u00f3rios detalhados de vendas, margens e campanhas publicit\u00e1rias.",
    descEn: "Detailed reports on sales, margins and ad campaigns.",
  },
];

export default function DemoPage() {
  const { t, lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEMO_SCREENS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  const screen = DEMO_SCREENS[activeIndex];

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen pt-24 pb-0">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <Link href="/" className="inline-flex rounded-xl border-2 border-zinc-700 bg-transparent px-6 py-3 font-display text-sm font-semibold text-white transition hover:bg-zinc-800">
              &larr; {t("Voltar para Home", "Back to Home")}
            </Link>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-center md:text-5xl text-white">
            {t("Dashboard OLYMPUS", "OLYMPUS Dashboard")}
          </h1>
          <p className="mt-4 text-center text-zinc-400 max-w-xl mx-auto">
            {t("Tudo que seus agentes fazem, em uma tela. M\u00e9tricas, decis\u00f5es e resultados ao vivo.", "Everything your agents do, on one screen. Metrics, decisions and results live.")}
          </p>

          {/* Screenshot tabs */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {DEMO_SCREENS.map((ss, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-teal-500/20 text-teal-400 border border-teal-500/40"
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                {lang === "pt" ? ss.labelPt : ss.labelEn}
              </button>
            ))}
          </div>

          {/* Screenshot display */}
          <div
            className="mt-8 mx-auto max-w-5xl rounded-2xl overflow-hidden ring-1 ring-zinc-800 shadow-2xl"
            style={{ boxShadow: "0 0 80px -20px rgba(234,179,8,0.12)" }}
          >
            <div className="relative aspect-video w-full bg-zinc-900">
              {imageErrors.has(activeIndex) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 text-sm border border-zinc-700 rounded-2xl gap-2">
                  <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>{lang === "pt" ? screen.labelPt : screen.labelEn}</p>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={activeIndex}
                  src={screen.src}
                  alt={lang === "pt" ? screen.labelPt : screen.labelEn}
                  className="w-full h-full object-contain transition-opacity duration-500"
                  onError={() => handleImageError(activeIndex)}
                />
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-zinc-500 text-center transition-all duration-300">
            {lang === "pt" ? screen.descPt : screen.descEn}
          </p>

          {/* Dots indicator */}
          <div className="mt-4 flex items-center justify-center gap-2 mb-8">
            {DEMO_SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-8 h-2 bg-teal-500" : "w-2 h-2 bg-zinc-700 hover:bg-zinc-600"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-zinc-500 text-sm pb-8">
            {t("Screenshots reais do dashboard com agentes conectados.", "Real screenshots of the dashboard with connected agents.")}
          </p>
        </div>
        <Waitlist />
        <Footer />
      </main>
    </>
  );
}
