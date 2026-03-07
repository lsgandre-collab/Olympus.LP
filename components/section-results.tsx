"use client";

import { useLang } from "@/contexts/lang-context";

const METRICS = [
  { value: "+89", labelPt: "oportunidades encontradas", labelEn: "opportunities found" },
  { value: "-R$1.8K", labelPt: "em gastos com ads", labelEn: "in ad spend" },
  { value: "4.152", labelPt: "SKUs analisados", labelEn: "SKUs analyzed" },
  { value: "24/7", labelPt: "monitoramento ativo", labelEn: "active monitoring" },
];

export function SectionResults() {
  const { t } = useLang();

  return (
    <section id="resultados" className="section-padding border-t border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("Resultados Reais", "Real Results")}
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-400">
          {t(
            "Métricas reais do dashboard: oportunidades, economia em ads e escala de análise.",
            "Real dashboard metrics: opportunities, ad savings and analysis scale."
          )}
        </p>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <div
              key={m.value}
              className="animate-fade-in-up rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="font-display text-4xl font-bold text-white md:text-5xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {t(m.labelPt, m.labelEn)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
