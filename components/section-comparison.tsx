"use client";

import { useLang } from "@/contexts/lang-context";

const TEAM_ROLES = [
  { role: "Analista de Preços", cost: 4500 },
  { role: "Gestor de Ads", cost: 6000 },
  { role: "Analista de Estoque", cost: 3800 },
  { role: "Gestor de Listings", cost: 4000 },
  { role: "Analista de Reviews", cost: 3500 },
  { role: "Analista Financeiro", cost: 5500 },
  { role: "Gerente de Operações", cost: 8000 },
];

const TOTAL_COST = TEAM_ROLES.reduce((sum, role) => sum + role.cost, 0);

export function SectionComparison() {
  const { t } = useLang();

  return (
    <section id="comparativo" className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t("O Custo Real da Operação", "The Real Cost of Operations")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">
            {t(
              "Quanto você está realmente gastando em equipe? OLYMPUS faz o mesmo (e mais) por uma fração do custo.",
              "How much are you really spending on team? OLYMPUS does the same (and more) for a fraction of the cost."
            )}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Left: Traditional Team */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50" />

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {t("Equipe Tradicional", "Traditional Team")}
                </h3>
                <p className="text-sm text-zinc-400">
                  {t("7 profissionais dedicados", "7 dedicated professionals")}
                </p>
              </div>

              {/* Team roles list */}
              <div className="space-y-4 mb-8">
                {TEAM_ROLES.map((item) => (
                  <div
                    key={item.role}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30 hover:border-zinc-700/60 transition-colors"
                  >
                    <span className="text-sm text-zinc-300">{item.role}</span>
                    <span className="text-sm font-mono text-zinc-400">
                      R$ {item.cost.toLocaleString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total cost - Red emphasis */}
              <div className="pt-6 border-t border-zinc-700/50">
                <p className="text-sm text-zinc-400 uppercase tracking-widest mb-2">
                  {t("Custo mensal", "Monthly cost")}
                </p>
                <p className="font-display text-4xl font-bold text-red-500">
                  R$ {TOTAL_COST.toLocaleString("pt-BR")}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  {t("+ benefícios, férias, encargos", "+ benefits, holidays, taxes")}
                </p>
              </div>

              {/* Problems with traditional team */}
              <div className="mt-8 space-y-2 pt-6 border-t border-zinc-700/50">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                  {t("Limitações", "Limitations")}
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>{t("Trabalha apenas 8-9h por dia", "Works only 8-9h per day")}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>{t("Férias, doença, ausências", "Vacation, illness, absences")}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>{t("Erros humanos inevitáveis", "Human errors inevitable")}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span>{t("Curva de aprendizado lenta", "Slow learning curve")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: OLYMPUS */}
          <div className="rounded-2xl border border-teal-600/40 bg-gradient-to-br from-teal-950/40 to-zinc-900/50 p-8 relative overflow-hidden group">
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-emerald-600" />

            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-600/10 rounded-full blur-3xl group-hover:opacity-60 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  OLYMPUS
                </h3>
                <p className="text-sm text-teal-300">
                  {t("10 agentes de IA autonomos", "10 autonomous AI agents")}
                </p>
              </div>

              {/* Agents representation */}
              <div className="mb-8 p-6 rounded-lg bg-teal-950/20 border border-teal-600/30">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-gradient-to-br from-teal-500/40 to-emerald-500/40 border border-teal-600/50 flex items-center justify-center"
                    >
                      <span className="text-xs font-semibold text-teal-200">{i + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-teal-300 font-semibold">
                  {t("10 especialidades integradas", "10 integrated specialties")}
                </p>
              </div>

              {/* Key benefits - Teal emphasis */}
              <div className="space-y-4 mb-8 pt-6 border-t border-teal-600/20">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">24/7</div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t("Operação contínua", "Continuous operation")}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {t("Sem pausas, sem descanso", "No breaks, no rest")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-2xl">0</div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t("Erros humanos", "Human errors")}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {t("Precisão 100% consistente", "100% consistent accuracy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-2xl">∞</div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t("Escalabilidade", "Scalability")}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {t("Cresce com seu negócio", "Scales with your business")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cost and CTA */}
              <div className="pt-6 border-t border-teal-600/20">
                <p className="text-sm text-teal-300/70 uppercase tracking-widest mb-2">
                  {t("Começando em uma fração do custo", "Starting at a fraction of the cost")}
                </p>
                <p className="font-display text-3xl font-bold text-teal-400 mb-4">
                  {t("Economia de até 80%", "Savings up to 80%")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 pt-12 border-t border-zinc-800">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-700" />
              <span className="text-4xl">⚡</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-700" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              {t("A Verdade do Custo-Benefício", "The Real Cost-Benefit")}
            </h3>

            <p className="text-xl text-teal-300 font-semibold mb-6">
              {t(
                "Economize até 80% em custos operacionais enquanto escala 10x mais rápido.",
                "Save up to 80% on operational costs while scaling 10x faster."
              )}
            </p>

            <p className="text-zinc-400 leading-relaxed mb-8">
              {t(
                "OLYMPUS não substitui apenas uma pessoa. Substitui uma equipe inteira, que trabalha 24/7, sem erros, e aprende a cada operação.",
                "OLYMPUS doesn't just replace one person. It replaces an entire team, working 24/7, without errors, and learning with every operation."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors">
                {t("Calcular Seu ROI", "Calculate Your ROI")}
              </button>
              <button className="px-8 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-white font-semibold transition-colors">
                {t("Falar com Especialista", "Talk to Specialist")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
