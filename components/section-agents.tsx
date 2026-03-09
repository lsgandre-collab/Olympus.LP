"use client";

import { useLang } from "@/contexts/lang-context";

const AGENTS = [
  { symbol: "Ψ", name: "Apollo", color: "#8b5cf6", funcPt: "Análise de SKUs em tempo real", funcEn: "Real-time SKU analysis" },
  { symbol: "Φ", name: "Artemis", color: "#22c55e", funcPt: "Proteção de margens e preços", funcEn: "Margin and price protection" },
  { symbol: "Σ", name: "Hermes", color: "#3b82f6", funcPt: "Gestão de fornecedores", funcEn: "Supplier management" },
  { symbol: "Δ", name: "Ares", color: "#eab308", funcPt: "Campanhas e ACoS", funcEn: "Campaigns and ACoS" },
  { symbol: "Λ", name: "Hefesto", color: "#f97316", funcPt: "Listings e catálogo", funcEn: "Listings and catalog" },
  { symbol: "Ζ", name: "Deméter", color: "#14b8a6", funcPt: "Inventário automático", funcEn: "Auto inventory" },
  { symbol: "Θ", name: "Atena", color: "#ec4899", funcPt: "Logística e entregas", funcEn: "Logistics and delivery" },
  { symbol: "Ξ", name: "Calíope", color: "#a855f7", funcPt: "Relatórios preditivos", funcEn: "Predictive reports" },
  { symbol: "Π", name: "Plutus", color: "#6366f1", funcPt: "Reviews e reputação", funcEn: "Reviews and reputation" },
  { symbol: "Κ", name: "Iris", color: "#d4af77", funcPt: "Controle financeiro", funcEn: "Financial control" },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0],
  [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
];

function pos(i: number, r: number) {
  const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
}

export function SectionAgents() {
  const { t } = useLang();
  const R = 34;

  return (
    <section id="agentes" className="py-20 md:py-28 lg:py-32 border-t border-zinc-800/80 bg-zinc-900/10 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400 mb-4">{t("O coração do sistema", "The heart of the system")}</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {t("Seus Agentes Autônomos", "Your Autonomous Agents")}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl">
            {t("10 agentes de IA especializados, conectados por linhas de dados e trabalhando 24/7 pelo seu negócio.", "10 specialized AI agents, connected by data lines and working 24/7 for your business.")}
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto aspect-square">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden>
            <defs>
              <filter id="glow-line">
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {CONNECTIONS.map(([a, b], i) => {
              const pA = pos(a, R);
              const pB = pos(b, R);
              const isOuter = i < 10;
              return (
                <line
                  key={i}
                  x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y}
                  stroke={isOuter ? "#eab308" : "#14b8a6"}
                  strokeWidth={isOuter ? "0.35" : "0.2"}
                  strokeOpacity={isOuter ? "0.6" : "0.35"}
                  filter="url(#glow-line)"
                  style={{ animation: `pulse-glow 2.5s ease-in-out ${i * 0.12}s infinite` }}
                />
              );
            })}
          </svg>
          {AGENTS.map((agent, i) => {
            const p = pos(i, R);
            return (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  animation: `float 5s ease-in-out ${i * 0.4}s infinite`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-125"
                  style={{
                    width: 72,
                    height: 72,
                    backgroundColor: agent.color,
                    boxShadow: `0 0 36px ${agent.color}70, 0 0 72px ${agent.color}25`,
                    border: "2px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <span className="text-white font-display font-bold text-2xl select-none">{agent.symbol}</span>
                </div>
                <span className="text-xs sm:text-sm text-white text-center font-display font-semibold leading-tight">
                  {agent.name}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-400 text-center font-medium max-w-[100px] leading-tight">
                  {t(agent.funcPt, agent.funcEn)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
