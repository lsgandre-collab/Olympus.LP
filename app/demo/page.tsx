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
    featuresPt: [
      "Status de todos os 10 agentes em tempo real",
      "M\u00e9tricas de vendas, margem e ACoS consolidadas",
      "Timeline de a\u00e7\u00f5es autom\u00e1ticas executadas",
      "Alertas e notifica\u00e7\u00f5es priorit\u00e1rias",
    ],
    featuresEn: [
      "Real-time status of all 10 agents",
      "Consolidated sales, margin and ACoS metrics",
      "Timeline of automated actions executed",
      "Priority alerts and notifications",
    ],
  },
  {
    src: "/images/dashboard-agents.png",
    labelPt: "Amazon Results",
    labelEn: "Amazon Results",
    descPt: "Resultados da Amazon: vendas, BSR, Buy Box, sess\u00f5es e performance por SKU.",
    descEn: "Amazon results: sales, BSR, Buy Box, sessions and performance by SKU.",
    featuresPt: [
      "Performance por SKU: vendas, sess\u00f5es, convers\u00e3o",
      "Ranking BSR e evolu\u00e7\u00e3o hist\u00f3rica",
      "Buy Box win rate e competi\u00e7\u00e3o de pre\u00e7o",
      "An\u00e1lise de reviews e rating por produto",
    ],
    featuresEn: [
      "Per-SKU performance: sales, sessions, conversion",
      "BSR ranking and historical evolution",
      "Buy Box win rate and price competition",
      "Review and rating analysis per product",
    ],
  },
  {
    src: "/images/dashboard-analytics.png",
    labelPt: "Financeiro",
    labelEn: "Financial",
    descPt: "Painel financeiro completo: receita, custos, margens, fees da Amazon e lucro l\u00edquido.",
    descEn: "Complete financial panel: revenue, costs, margins, Amazon fees and net profit.",
    featuresPt: [
      "Receita bruta vs. l\u00edquida em tempo real",
      "Breakdown de custos: produto, frete, ads, fees",
      "Margem por SKU e por categoria",
      "Proje\u00e7\u00e3o de lucro mensal e tend\u00eancias",
    ],
    featuresEn: [
      "Gross vs. net revenue in real-time",
      "Cost breakdown: product, shipping, ads, fees",
      "Margin per SKU and per category",
      "Monthly profit projection and trends",
    ],
  },
];

export default function DemoPage() {
  const { t, lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEMO_SCREENS.length);
    }, 45000);
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
          <p className="mt-6 text-sm text-zinc-400 text-center transition-all duration-300">
            {lang === "pt" ? screen.descPt : screen.descEn}
          </p>

          {/* Feature list for current screenshot */}
          <div className="mt-6 mx-auto max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(lang === "pt" ? screen.featuresPt : screen.featuresEn).map((feature: string, fi: number) => (
              <div key={fi} className="flex items-start gap-2 text-left p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                <span className="text-teal-400 mt-0.5 flex-shrink-0">&#10003;</span>
                <span className="text-xs text-zinc-300 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

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
