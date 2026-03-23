"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/contexts/lang-context";

const SCREENSHOTS = [
  {
    src: "/images/dashboard-screenshot.png",
    labelPt: "Dashboard Principal",
    labelEn: "Main Dashboard",
    descPt: "Visão geral de todos os agentes, métricas e resultados em tempo real.",
    descEn: "Overview of all agents, metrics and results in real-time.",
  },
  {
    src: "/images/dashboard-agents.png",
    labelPt: "Amazon Results",
    labelEn: "Amazon Results",
    descPt: "Resultados da Amazon: vendas, BSR, Buy Box, sess\u00f5es e performance por SKU.",
    descEn: "Amazon results: sales, BSR, Buy Box, sessions and performance by SKU.",
  },
  {
    src: "/images/dashboard-analytics.png",
    labelPt: "Financeiro",
    labelEn: "Financial",
    descPt: "Painel financeiro completo: receita, custos, margens, fees da Amazon e lucro l\u00edquido.",
    descEn: "Complete financial panel: revenue, costs, margins, Amazon fees and net profit.",
  },
];

export function SectionDashboard() {
  const { t, lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Auto-advance every 45s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SCREENSHOTS.length);
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  const screenshot = SCREENSHOTS[activeIndex];

  return (
    <section className="section-padding bg-zinc-900/20" id="demo">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("Dashboard em Tempo Real", "Real-Time Dashboard")}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
          {t(
            "Tudo que seus agentes fazem, em uma tela. Métricas, decisões e resultados ao vivo.",
            "Everything your agents do, on one screen. Metrics, decisions and results live."
          )}
        </p>

        {/* Screenshot tabs */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {SCREENSHOTS.map((ss, i) => (
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
          className="mt-8 mx-auto max-w-4xl rounded-2xl overflow-hidden ring-1 ring-zinc-800 shadow-2xl"
          style={{ boxShadow: "0 0 80px -20px rgba(234,179,8,0.12)" }}
        >
          <div className="relative aspect-video w-full bg-zinc-900">
            {imageErrors.has(activeIndex) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 text-sm border border-zinc-700 rounded-2xl gap-2">
                <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>{lang === "pt" ? screenshot.labelPt : screenshot.labelEn}</p>
                <code className="text-xs text-zinc-600">{screenshot.src}</code>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={activeIndex}
                src={screenshot.src}
                alt={lang === "pt" ? screenshot.labelPt : screenshot.labelEn}
                className="w-full h-full object-contain transition-opacity duration-500"
                onError={() => handleImageError(activeIndex)}
              />
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-zinc-500 transition-all duration-300">
          {lang === "pt" ? screenshot.descPt : screenshot.descEn}
        </p>

        {/* Dots indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {SCREENSHOTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-8 h-2 bg-teal-500" : "w-2 h-2 bg-zinc-700 hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
