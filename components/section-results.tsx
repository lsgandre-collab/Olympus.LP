"use client";

import { useLang } from "@/contexts/lang-context";

const METRICS = [
  { value: "+42%", labelPt: "aumento médio em margem líquida", labelEn: "average net margin increase", color: "#22c55e" },
  { value: "-68%", labelPt: "redução no tempo manual operacional", labelEn: "reduction in manual operational time", color: "#3b82f6" },
  { value: "+89", labelPt: "oportunidades de lucro por mês", labelEn: "profit opportunities per month", color: "#eab308" },
  { value: "4.152", labelPt: "SKUs monitorados simultaneamente", labelEn: "SKUs monitored simultaneously", color: "#8b5cf6" },
  { value: "-R$1.8K", labelPt: "economia mensal em ads desperdiçados", labelEn: "monthly savings in wasted ad spend", color: "#f97316" },
  { value: "<2min", labelPt: "tempo de resposta do Orquestrador", labelEn: "Orchestrator response time", color: "#14b8a6" },
];

export function SectionResults() {
  const { t } = useLang();
  return (
    <section id="resultados" className="section-padding border-t border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{t("Resultados Reais", "Real Results")}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">{t("Métricas extraídas de operações reais monitoradas pelo OLYMPUS.", "Metrics extracted from real operations monitored by OLYMPUS.")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((m, i) => (
            <div key={m.value + m.labelPt} className="animate-fade-in-up rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center relative overflow-hidden" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: m.color }} />
              <p className="font-display text-4xl font-bold md:text-5xl" style={{ color: m.color }}>{m.value}</p>
              <p className="mt-3 text-sm text-zinc-400">{t(m.labelPt, m.labelEn)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
