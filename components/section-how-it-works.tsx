"use client";

import { useLang } from "@/contexts/lang-context";

const STEPS = [
  { num: "01", icon: "🔗", color: "#14b8a6", titlePt: "Captação", titleEn: "Capture", descPt: "Conecte sua conta Amazon Seller Central. Seus dados e catálogo entram no sistema automaticamente.", descEn: "Connect your Amazon Seller Central account. Your data and catalog enter the system automatically." },
  { num: "02", icon: "🔍", color: "#3b82f6", titlePt: "Análise", titleEn: "Analysis", descPt: "Os 10 agentes analisam milhares de SKUs, margens, concorrentes e campanhas em tempo real.", descEn: "All 10 agents analyze thousands of SKUs, margins, competitors and campaigns in real time." },
  { num: "03", icon: "⚡", color: "#eab308", titlePt: "Automação", titleEn: "Automation", descPt: "Preços, ads, estoque e listings são otimizados automaticamente 24/7 pelo Orquestrador.", descEn: "Pricing, ads, inventory and listings are optimized automatically 24/7 by the Orchestrator." },
  { num: "04", icon: "🚀", color: "#ec4899", titlePt: "Escala", titleEn: "Scale", descPt: "Repita para centenas ou milhares de SKUs sem contratar mais gente. O sistema cresce com você.", descEn: "Repeat for hundreds or thousands of SKUs without hiring more people. The system grows with you." },
];

export function SectionHowItWorks() {
  const { t } = useLang();
  return (
    <section id="como-funciona" className="section-padding border-t border-zinc-800/80 bg-zinc-900/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{t("Como Funciona", "How It Works")}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">{t("Da captação à escala, no automático.", "From capture to scale, on autopilot.")}</p>
        </div>
        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0" style={{ background: "linear-gradient(90deg, #14b8a6, #3b82f6, #eab308, #ec4899)" }}>
            <div className="absolute inset-0" style={{ animation: "pulse-glow 3s ease-in-out infinite" }} />
          </div>
          {STEPS.map((step, i) => (
            <div key={step.num} className="animate-fade-in-up rounded-2xl border border-zinc-800 bg-zinc-950 p-8 relative overflow-hidden z-10" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ backgroundColor: step.color }} />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{step.icon}</span>
                <span className="font-display text-3xl font-bold" style={{ color: step.color }}>{step.num}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-white">{t(step.titlePt, step.titleEn)}</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{t(step.descPt, step.descEn)}</p>
              {i < STEPS.length - 1 && (
                <span className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 text-2xl font-bold z-20" style={{ color: step.color }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
