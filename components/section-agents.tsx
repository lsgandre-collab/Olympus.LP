"use client";

import { useLang } from "@/contexts/lang-context";

const AGENTS = [
  { name: "Apollo", rolePt: "Analista de Inteligência", roleEn: "Intelligence Analyst", status: "active" },
  { name: "Plutus", rolePt: "Controlador Financeiro", roleEn: "Financial Controller", status: "active" },
  { name: "Hermes", rolePt: "Gestor de Fornecedores", roleEn: "Supplier Manager", status: "active" },
  { name: "Artemis", rolePt: "Monitor de Preços", roleEn: "Price Monitor", status: "active" },
  { name: "Ares", rolePt: "Gestor de Publicidade", roleEn: "Ads Manager", status: "active" },
  { name: "Hefesto", rolePt: "Especialista em Listings", roleEn: "Listing Specialist", status: "active" },
  { name: "Deméter", rolePt: "Controladora de Inventário", roleEn: "Inventory Controller", status: "active" },
  { name: "Atena", rolePt: "Coordenadora Logística", roleEn: "Logistics Coordinator", status: "active" },
  { name: "Calíope", rolePt: "Analista de Dados", roleEn: "Data Analyst", status: "active" },
  { name: "ATLAS", rolePt: "CEO Orchestrator", roleEn: "CEO Orchestrator", status: "ceo" },
] as const;

export function SectionAgents() {
  const { t } = useLang();

  return (
    <section id="agentes" className="section-padding border-t border-zinc-800/80 bg-zinc-900/30">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("Seus Deuses Autônomos", "Your Autonomous Gods")}
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-400">
          {t(
            "10 agentes de IA trabalhando em conjunto. Cada um com sua especialidade; o ATLAS orquestra tudo.",
            "10 AI agents working together. Each with their specialty; ATLAS orchestrates everything."
          )}
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              className="animate-fade-in-up rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  {agent.name}
                  <span className="ml-2 text-zinc-500">—</span>
                  <span className="ml-1 text-zinc-400">
                    {t(agent.rolePt, agent.roleEn)}
                  </span>
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    agent.status === "ceo"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {agent.status === "ceo" ? "CEO" : t("Ativo", "Active")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
