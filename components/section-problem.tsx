"use client";

import { useLang } from "@/contexts/lang-context";

const PAINS = [
  { emoji: "📊", titlePt: "Dados espalhados", titleEn: "Scattered data", descPt: "Planilhas, Seller Central, ads em outro lugar. Nada conversa entre si. Você perde tempo juntando informação.", descEn: "Spreadsheets, Seller Central, ads elsewhere. Nothing talks to each other. You waste time gathering info." },
  { emoji: "⏰", titlePt: "Tempo perdido", titleEn: "Time wasted", descPt: "Horas em repricing manual, estoque e campanhas. Em vez de estratégia e crescimento real.", descEn: "Hours on manual repricing, inventory and campaigns. Instead of strategy and real growth." },
  { emoji: "💸", titlePt: "Oportunidades ignoradas", titleEn: "Missed opportunities", descPt: "SKUs que poderiam vender mais. Margens que escapam. Ads que queimam dinheiro sem retorno.", descEn: "SKUs that could sell more. Margins that slip away. Ads that burn money without return." },
  { emoji: "👥", titlePt: "Escalar = contratar", titleEn: "Scaling = hiring", descPt: "Crescer na Amazon hoje significa mais gente, mais salários, mais complexidade e mais erro humano.", descEn: "Growing on Amazon today means more people, more salaries, more complexity and more human error." },
];

export function SectionProblem() {
  const { t } = useLang();
  return (
    <section id="problema" className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{t("O Problema", "The Problem")}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">{t("Todo seller Amazon conhece essas dores.", "Every Amazon seller knows these pains.")}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {PAINS.map((pain, i) => (
            <div key={pain.titlePt} className="animate-fade-in-up rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="text-3xl mb-4 block">{pain.emoji}</span>
              <h3 className="font-display text-xl font-semibold text-white">{t(pain.titlePt, pain.titleEn)}</h3>
              <p className="mt-3 text-base text-zinc-400 leading-relaxed">{t(pain.descPt, pain.descEn)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
