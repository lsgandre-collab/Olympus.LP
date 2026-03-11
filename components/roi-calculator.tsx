"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/contexts/lang-context";

export function ROICalculator() {
  const { t } = useLang();
  const [skus, setSkus] = useState(500);
  const [revenue, setRevenue] = useState(100000);
  const [employees, setEmployees] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    const avgSalary = 5000;
    const currentTeamCost = employees * avgSalary;
    const olympusCost = Math.max(2000, revenue * 0.015); // ~1.5% of revenue, min R$2k
    const savings = Math.max(0, currentTeamCost - olympusCost);
    const marginIncrease = revenue * 0.21; // 21% average margin increase
    const adsSavings = revenue * 0.08; // ~8% ads optimization
    const totalBenefit = savings + marginIncrease + adsSavings;
    const roi = olympusCost > 0 ? ((totalBenefit / olympusCost) * 100) : 0;

    return {
      currentTeamCost,
      olympusCost,
      savings,
      marginIncrease,
      adsSavings,
      totalBenefit,
      roi: Math.round(roi),
    };
  }, [skus, revenue, employees]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setIsOpen(false)}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-display text-2xl font-bold text-white">
            {t("Calculadora de ROI", "ROI Calculator")}
          </h3>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-6 mb-8">
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              {t("Quantidade de SKUs", "Number of SKUs")}: <span className="text-teal-400 font-semibold">{skus.toLocaleString()}</span>
            </label>
            <input type="range" min="50" max="5000" step="50" value={skus} onChange={(e) => setSkus(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-teal-500" />
            <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>50</span><span>5.000</span></div>
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              {t("Faturamento Mensal", "Monthly Revenue")}: <span className="text-teal-400 font-semibold">R$ {revenue.toLocaleString("pt-BR")}</span>
            </label>
            <input type="range" min="10000" max="2000000" step="10000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-teal-500" />
            <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>R$ 10k</span><span>R$ 2M</span></div>
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              {t("Funcionários na operação", "Employees in operations")}: <span className="text-teal-400 font-semibold">{employees}</span>
            </label>
            <input type="range" min="0" max="15" step="1" value={employees} onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-teal-500" />
            <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>0</span><span>15</span></div>
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-zinc-700 pt-6 space-y-4">
          <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
            {t("Seu ROI Estimado", "Your Estimated ROI")}
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-zinc-800/60 p-4">
              <p className="text-xs text-zinc-500">{t("Economia em equipe", "Team savings")}</p>
              <p className="text-xl font-bold text-green-400">R$ {results.savings.toLocaleString("pt-BR")}<span className="text-xs text-zinc-500">/mês</span></p>
            </div>
            <div className="rounded-xl bg-zinc-800/60 p-4">
              <p className="text-xs text-zinc-500">{t("Aumento de margem", "Margin increase")}</p>
              <p className="text-xl font-bold text-teal-400">R$ {results.marginIncrease.toLocaleString("pt-BR")}<span className="text-xs text-zinc-500">/mês</span></p>
            </div>
            <div className="rounded-xl bg-zinc-800/60 p-4">
              <p className="text-xs text-zinc-500">{t("Economia em ads", "Ads savings")}</p>
              <p className="text-xl font-bold text-yellow-400">R$ {results.adsSavings.toLocaleString("pt-BR")}<span className="text-xs text-zinc-500">/mês</span></p>
            </div>
            <div className="rounded-xl bg-zinc-800/60 p-4">
              <p className="text-xs text-zinc-500">{t("Investimento OLYMPUS", "OLYMPUS Investment")}</p>
              <p className="text-xl font-bold text-zinc-300">R$ {results.olympusCost.toLocaleString("pt-BR")}<span className="text-xs text-zinc-500">/mês</span></p>
            </div>
          </div>

          {/* Big ROI number */}
          <div className="text-center py-6 rounded-xl bg-gradient-to-br from-teal-950/60 to-zinc-900 border border-teal-600/30">
            <p className="text-sm text-teal-300 mb-2">{t("Retorno sobre investimento", "Return on investment")}</p>
            <p className="font-display text-6xl font-bold text-teal-400">{results.roi}%</p>
            <p className="text-sm text-zinc-400 mt-2">
              {t(
                `Benefício total de R$ ${results.totalBenefit.toLocaleString("pt-BR")}/mês`,
                `Total benefit of R$ ${results.totalBenefit.toLocaleString("pt-BR")}/month`
              )}
            </p>
          </div>

          <p className="text-[10px] text-zinc-600 text-center">
            {t(
              "* Estimativas baseadas em benchmarks de sellers usando OLYMPUS. Resultados reais podem variar.",
              "* Estimates based on benchmarks from sellers using OLYMPUS. Actual results may vary."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the open function for external use
export function useROICalculator() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), setIsOpen };
}
