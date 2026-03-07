"use client";

import { useLang } from "@/contexts/lang-context";

export function SectionProblem() {
  const { t } = useLang();

  return (
    <section id="problema" className="section-padding border-t border-zinc-800/80">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("O Problema", "The Problem")}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-zinc-400 md:text-xl">
          {t(
            "Vender na Amazon exige tempo: repricing, ads, estoque, listings, fornecedores. Ou você escala com uma equipe cara, ou trava no operacional. Até agora.",
            "Selling on Amazon takes time: repricing, ads, inventory, listings, suppliers. You either scale with an expensive team or get stuck in operations. Until now."
          )}
        </p>
      </div>
    </section>
  );
}
