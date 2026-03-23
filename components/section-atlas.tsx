"use client";

import { useLang } from "@/contexts/lang-context";

export function SectionAtlas() {
  const { t } = useLang();

  return (
    <section id="atlas" className="section-padding border-t border-zinc-800/80 bg-zinc-900/30">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("O CEO que Nunca Dorme", "The CEO That Never Sleeps")}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-zinc-400 md:text-xl">
          {t(
            "O ATLAS é o orquestrador central: recebe dados de todos os agentes, toma decisões e coordena preços, ads, estoque e listings para sua loja rodar sozinha, 24/7.",
            "ATLAS is the central orchestrator: it receives data from all agents, makes decisions and coordinates pricing, ads, inventory and listings so your store runs on its own, 24/7."
          )}
        </p>
      </div>
    </section>
  );
}
