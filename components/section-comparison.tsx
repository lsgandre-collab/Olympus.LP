"use client";

import { useState } from "react";
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
  const [showROI, setShowROI] = useState(false);
  const [skus, setSkus] = useState(500);
  const [monthlyRevenue, setMonthlyRevenue] = useState(500000);
  const [employees, setEmployees] = useState(5);

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
              <button
                onClick={() => setShowROI(true)}
                className="px-8 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
              >
                {t("Calcular Seu ROI", "Calculate Your ROI")}
              </button>
              <a
                href="https://wa.me/5511999999999?text=Olá! Quero saber mais sobre o OLYMPUS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-white font-semibold transition-colors text-center"
              >
                {t("Falar com Especialista", "Talk to Specialist")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Calculator Modal */}
      {showROI && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowROI(false)}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowROI(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                {t("Calculadora de ROI", "ROI Calculator")}
              </h2>
              <p className="text-zinc-400">
                {t(
                  "Descubra quanto você pode economizar com OLYMPUS",
                  "Discover how much you can save with OLYMPUS"
                )}
              </p>
            </div>

            {/* Sliders */}
            <div className="space-y-8 mb-10">
              {/* SKUs Slider */}
              <div>
                <label className="text-sm font-semibold text-white mb-3 block">
                  {t("SKUs em Operação", "SKUs in Operation")}: <span className="text-teal-400">{skus.toLocaleString("pt-BR")}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  value={skus}
                  onChange={(e) => setSkus(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>50</span>
                  <span>5.000</span>
                </div>
              </div>

              {/* Monthly Revenue Slider */}
              <div>
                <label className="text-sm font-semibold text-white mb-3 block">
                  {t("Receita Mensal", "Monthly Revenue")}: <span className="text-teal-400">R$ {monthlyRevenue.toLocaleString("pt-BR")}</span>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="2000000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>R$ 10k</span>
                  <span>R$ 2M</span>
                </div>
              </div>

              {/* Employees Slider */}
              <div>
                <label className="text-sm font-semibold text-white mb-3 block">
                  {t("Operadores em Equipe", "Employees in Operations")}: <span className="text-teal-400">{employees}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>0</span>
                  <span>15</span>
                </div>
              </div>
            </div>

            {/* ROI Calculations */}
            <ROIResults
              skus={skus}
              monthlyRevenue={monthlyRevenue}
              employees={employees}
              t={t}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ROIResults({ skus, monthlyRevenue, employees, t }: any) {
  // OLYMPUS tiered pricing: scales with operation size
  // Small: R$997, Medium: R$1.997, Large: 1% of revenue (capped at R$15k)
  const olympusCost = monthlyRevenue <= 50000
    ? 997
    : monthlyRevenue <= 200000
      ? 1997
      : monthlyRevenue <= 500000
        ? 2997
        : Math.min(monthlyRevenue * 0.01, 15000);

  // Team savings: avg salary per employee varies by operation size
  const avgSalary = monthlyRevenue <= 100000 ? 3500 : monthlyRevenue <= 500000 ? 5000 : 6500;
  const teamSavings = Math.max(0, employees * avgSalary - olympusCost);

  // Margin increase: scales with SKU complexity (more SKUs = more optimization potential)
  const marginRate = skus <= 200 ? 0.12 : skus <= 1000 ? 0.18 : 0.21;
  const marginIncrease = monthlyRevenue * marginRate;

  // Ads savings: based on typical ACoS reduction
  const adsRate = skus <= 200 ? 0.05 : skus <= 1000 ? 0.07 : 0.08;
  const adsSavings = monthlyRevenue * adsRate;

  const totalROI = teamSavings + marginIncrease + adsSavings;

  // ROI percentage (compared to OLYMPUS cost)
  const roiPercentage = olympusCost > 0 ? Math.round((totalROI / olympusCost) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Team Savings - Green */}
        <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-600/40">
          <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wide mb-2">
            {t("Economia em Equipe", "Team Savings")}
          </p>
          <p className="font-display text-2xl font-bold text-emerald-400">
            R$ {Math.max(0, teamSavings).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            {t("por mês", "per month")}
          </p>
        </div>

        {/* Margin Increase - Teal */}
        <div className="p-4 rounded-lg bg-teal-950/40 border border-teal-600/40">
          <p className="text-xs font-semibold text-teal-300 uppercase tracking-wide mb-2">
            {t("Aumento de Margem", "Margin Increase")}
          </p>
          <p className="font-display text-2xl font-bold text-teal-400">
            R$ {marginIncrease.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            {t("por mês", "per month")}
          </p>
        </div>

        {/* Ads Savings - Yellow */}
        <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-600/40">
          <p className="text-xs font-semibold text-amber-300 uppercase tracking-wide mb-2">
            {t("Economia em Anúncios", "Ads Savings")}
          </p>
          <p className="font-display text-2xl font-bold text-amber-400">
            R$ {adsSavings.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            {t("por mês", "per month")}
          </p>
        </div>

        {/* OLYMPUS Investment - Zinc */}
        <div className="p-4 rounded-lg bg-zinc-800/40 border border-zinc-600/40">
          <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wide mb-2">
            {t("Investimento OLYMPUS", "OLYMPUS Investment")}
          </p>
          <p className="font-display text-2xl font-bold text-zinc-300">
            R$ {olympusCost.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            {t("por mês", "per month")}
          </p>
        </div>
      </div>

      {/* ROI Percentage - Large Display with Gradient */}
      <div className="rounded-lg bg-gradient-to-r from-teal-600/20 to-emerald-600/20 border border-teal-600/40 p-6 text-center">
        <p className="text-sm font-semibold text-teal-300 uppercase tracking-wide mb-2">
          {t("Retorno sobre Investimento", "Return on Investment")}
        </p>
        <div className="font-display text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          {roiPercentage}%
        </div>
        <p className="text-sm text-zinc-400 mt-3">
          {t(
            "Retorno total em relação ao investimento mensal",
            "Total return relative to monthly investment"
          )}
        </p>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
        <p className="text-sm text-zinc-300">
          {t(
            "Com OLYMPUS, você economizará ",
            "With OLYMPUS, you will save "
          )}
          <span className="font-bold text-teal-400">
            R$ {totalROI.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </span>
          {t(" por mês.", " per month.")}
        </p>
      </div>
    </div>
  );
}
