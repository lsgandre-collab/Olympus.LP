"use client";

import { useLang } from "@/contexts/lang-context";

const STEPS = [
  { num: "01", titlePt: "Conecte sua conta Amazon", titleEn: "Connect your Amazon account" },
  { num: "02", titlePt: "Ative os agentes", titleEn: "Enable the agents" },
  { num: "03", titlePt: "Deixe o ATLAS orquestrar", titleEn: "Let ATLAS orchestrate" },
  { num: "04", titlePt: "Acompanhe resultados no dashboard", titleEn: "Track results on the dashboard" },
];

export function SectionHowItWorks() {
  const { t } = useLang();

  return (
    <section id="como-funciona" className="section-padding border-t border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("Como Funciona", "How It Works")}
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-400">
          {t(
            "Quatro passos para sua loja rodar no piloto automático.",
            "Four steps to run your store on autopilot."
          )}
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="animate-fade-in-up rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="font-display text-2xl font-bold text-zinc-500">
                {step.num}
              </span>
              <p className="mt-4 font-display text-lg font-semibold text-white">
                {t(step.titlePt, step.titleEn)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
