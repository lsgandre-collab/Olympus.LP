"use client";

import { useLang } from "@/contexts/lang-context";
import { DashboardTilt } from "@/components/dashboard-tilt";

export function SectionDashboard() {
  const { t } = useLang();

  return (
    <section className="section-padding border-t border-zinc-800/80 bg-zinc-900/20">
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
        <div className="mt-12 mx-auto max-w-4xl rounded-2xl overflow-hidden ring-1 ring-zinc-800 shadow-2xl" style={{ boxShadow: "0 0 80px -20px rgba(234,179,8,0.12)" }}>
          <DashboardTilt />
        </div>
      </div>
    </section>
  );
}
