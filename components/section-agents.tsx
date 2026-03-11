"use client";

import { useLang } from "@/contexts/lang-context";
import { useEffect, useRef, useState } from "react";

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

// Organic constellation positions (not a perfect circle)
function getAgentPositions() {
  const positions: { x: number; y: number }[] = [];
  // Create asymmetrical layout that looks like a constellation
  const angles = [
    0, 35, 65, 110, 150, 190, 230, 280, 315, 350
  ];
  const radii = [
    42, 38, 44, 36, 40, 46, 39, 43, 41, 37
  ];

  angles.forEach((angle, i) => {
    const rad = (angle * Math.PI) / 180;
    const r = radii[i];
    positions.push({
      x: 50 + r * Math.cos(rad),
      y: 50 + r * Math.sin(rad),
    });
  });

  return positions;
}

// Generate connections: each agent to center + agent-to-agent secondary connections
function getConnections(positions: { x: number; y: number }[]) {
  const connections = {
    primary: Array.from({ length: positions.length }, (_, i) => i), // All agents connect to center
    secondary: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0],
      [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
    ] as [number, number][],
  };
  return connections;
}

function PulseParticles({
  x1, y1, x2, y2,
  animationDelay,
  color
}: {
  x1: number; y1: number; x2: number; y2: number;
  animationDelay: number;
  color: string;
}) {
  return (
    <g opacity="0.7">
      {Array.from({ length: 3 }).map((_, i) => (
        <circle
          key={i}
          cx={x1}
          cy={y1}
          r="0.4"
          fill={color}
          style={{
            animation: `pulse-travel 2s ease-in-out ${animationDelay + i * 0.4}s infinite`,
            "--tx": `${x2 - x1}`,
            "--ty": `${y2 - y1}`,
          } as any}
        />
      ))}
    </g>
  );
}

function HoverableAgent({
  agent,
  position,
  index,
  isHovered,
  onHover
}: {
  agent: typeof AGENTS[0];
  position: { x: number; y: number };
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Outer ring that grows when hovered */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
        style={{
          width: isHovered ? 100 : 72,
          height: isHovered ? 100 : 72,
          left: "50%",
          top: "50%",
          border: "1px solid",
          borderColor: isHovered ? agent.color : "rgba(255,255,255,0.1)",
          opacity: isHovered ? 0.4 : 0,
        }}
      />

      {/* Main agent orb */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          left: "50%",
          top: "50%",
          width: 72,
          height: 72,
          backgroundColor: agent.color,
          boxShadow: isHovered
            ? `0 0 48px ${agent.color}99, 0 0 96px ${agent.color}44, inset 0 0 24px rgba(255,255,255,0.2)`
            : `0 0 36px ${agent.color}70, 0 0 72px ${agent.color}25`,
          border: isHovered ? "2px solid rgba(255,255,255,0.4)" : "2px solid rgba(255,255,255,0.15)",
          animation: `pulse-breath 3s ease-in-out ${index * 0.2}s infinite`,
        }}
      >
        <span className="text-white font-display font-bold text-2xl select-none">{agent.symbol}</span>
      </div>

      {/* Agent info tooltip - expands on hover */}
      <div
        className="absolute top-full mt-4 text-center whitespace-nowrap transition-all duration-300 pointer-events-none"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1 : 0.9,
        }}
      >
        <span className={isHovered ? "text-white font-semibold" : "text-white"}>
          {agent.name}
        </span>
        <p className="text-[10px] text-zinc-300 mt-1 max-w-[120px]">
          {/* This would need proper translation - using a placeholder */}
          <span className="line-clamp-2">{agent.funcEn}</span>
        </p>
      </div>
    </div>
  );
}

export function SectionAgents() {
  const { t } = useLang();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const positions = getAgentPositions();
  const connections = getConnections(positions);

  return (
    <section
      id="agentes"
      className="py-12 md:py-16 lg:py-20 bg-zinc-900/10 relative overflow-hidden"
    >
      {/* Subtle gradient separator instead of border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400 mb-4">
            {t("O coração do sistema", "The heart of the system")}
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {t("Seus Agentes Autônomos", "Your Autonomous Agents")}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl">
            {t("10 agentes de IA especializados, conectados por linhas de dados e trabalhando 24/7 pelo seu negócio.", "10 specialized AI agents, connected by data lines and working 24/7 for your business.")}
          </p>
        </div>

        {/* Desktop visualization */}
        <div className="hidden md:block relative w-full max-w-4xl mx-auto aspect-square">
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            <defs>
              <filter id="glow-soft">
                <feGaussianBlur stdDeviation="0.3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-bright">
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="orchestrator-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4af77" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Secondary agent-to-agent connections */}
            {connections.secondary.map(([a, b], i) => {
              const pA = positions[a];
              const pB = positions[b];
              const distance = Math.hypot(pB.x - pA.x, pB.y - pA.y);
              return (
                <g key={`secondary-${i}`}>
                  <line
                    x1={pA.x}
                    y1={pA.y}
                    x2={pB.x}
                    y2={pB.y}
                    stroke={hoveredAgent === a || hoveredAgent === b ? AGENTS[a].color : "#14b8a6"}
                    strokeWidth={hoveredAgent === a || hoveredAgent === b ? "0.35" : "0.2"}
                    strokeOpacity={hoveredAgent === a || hoveredAgent === b ? 0.5 : 0.25}
                    strokeDasharray={distance}
                    strokeDashoffset={distance}
                    filter="url(#glow-soft)"
                    style={{
                      animation: `dash-flow ${3 + (i % 2)}s linear ${i * 0.15}s infinite`,
                      transition: "stroke 300ms ease, stroke-opacity 300ms ease",
                    }}
                  />
                  <PulseParticles
                    x1={pA.x}
                    y1={pA.y}
                    x2={pB.x}
                    y2={pB.y}
                    animationDelay={i * 0.1}
                    color={hoveredAgent === a || hoveredAgent === b ? AGENTS[a].color : "#14b8a6"}
                  />
                </g>
              );
            })}

            {/* Primary connections to center orchestrator */}
            {connections.primary.map((agentIdx, i) => {
              const pA = positions[agentIdx];
              const pCenter = { x: 50, y: 50 };
              const distance = Math.hypot(pCenter.x - pA.x, pCenter.y - pA.y);
              const isHovered = hoveredAgent === agentIdx;
              return (
                <g key={`primary-${i}`}>
                  <line
                    x1={pA.x}
                    y1={pA.y}
                    x2={pCenter.x}
                    y2={pCenter.y}
                    stroke={isHovered ? AGENTS[agentIdx].color : "#14b8a6"}
                    strokeWidth={isHovered ? "0.5" : "0.3"}
                    strokeOpacity={isHovered ? 0.7 : 0.4}
                    strokeDasharray={distance}
                    strokeDashoffset={distance}
                    filter="url(#glow-bright)"
                    style={{
                      animation: `dash-flow 2.5s linear ${i * 0.08}s infinite`,
                      transition: "stroke 300ms ease, stroke-opacity 300ms ease, stroke-width 300ms ease",
                    }}
                  />
                  <PulseParticles
                    x1={pA.x}
                    y1={pA.y}
                    x2={pCenter.x}
                    y2={pCenter.y}
                    animationDelay={i * 0.08}
                    color={isHovered ? AGENTS[agentIdx].color : "#14b8a6"}
                  />
                </g>
              );
            })}

            {/* Central Orchestrator node */}
            <circle
              cx="50"
              cy="50"
              r="4"
              fill="url(#orchestrator-gradient)"
              filter="url(#glow-bright)"
              style={{
                boxShadow: "0 0 20px rgba(20, 184, 166, 0.6)",
                animation: `pulse-orchestrator 2s ease-in-out infinite`,
              }}
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="2.5"
              fontWeight="bold"
              fontFamily="serif"
              style={{ pointerEvents: "none" }}
            >
              Ω
            </text>
          </svg>

          {/* Agent nodes with hover interaction */}
          {AGENTS.map((agent, i) => (
            <HoverableAgent
              key={i}
              agent={agent}
              position={positions[i]}
              index={i}
              isHovered={hoveredAgent === i}
              onHover={setHoveredAgent}
            />
          ))}

          {/* Amazon Seller Central badge */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/60 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600" />
              <span className="text-xs font-semibold text-zinc-300">
                {t("Amazon Seller Central", "Amazon Seller Central")}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile visualization - simplified 2-column grid */}
        <div className="md:hidden grid grid-cols-2 gap-6 max-w-sm mx-auto">
          {AGENTS.map((agent, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-zinc-700/40 bg-zinc-800/20 hover:bg-zinc-800/40 transition-all duration-300"
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: agent.color,
                  boxShadow: `0 0 24px ${agent.color}60`,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span className="text-white font-display font-bold text-xl">{agent.symbol}</span>
              </div>
              <span className="text-xs text-white text-center font-semibold">{agent.name}</span>
              <span className="text-[9px] text-zinc-400 text-center line-clamp-2">
                {agent.funcEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes pulse-breath {
          0%, 100% {
            filter: drop-shadow(0 0 12px var(--agent-color, currentColor));
          }
          50% {
            filter: drop-shadow(0 0 24px var(--agent-color, currentColor));
          }
        }

        @keyframes pulse-orchestrator {
          0%, 100% {
            r: 4;
            filter: drop-shadow(0 0 12px rgba(20, 184, 166, 0.8));
          }
          50% {
            r: 5.5;
            filter: drop-shadow(0 0 28px rgba(20, 184, 166, 1));
          }
        }

        @keyframes dash-flow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: var(--dash-length, 100);
          }
        }

        @keyframes pulse-travel {
          0% {
            cx: 0;
            cy: 0;
            opacity: 1;
          }
          100% {
            cx: var(--tx);
            cy: var(--ty);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}
