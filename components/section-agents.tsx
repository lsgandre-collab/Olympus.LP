"use client";

import { useLang } from "@/contexts/lang-context";
import { useRef, useState, useCallback, useEffect } from "react";

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

function getInitialPositions() {
  const positions: { x: number; y: number }[] = [];
  const angles = [0, 35, 65, 110, 150, 190, 230, 280, 315, 350];
  const radii = [42, 38, 44, 36, 40, 46, 39, 43, 41, 37];
  angles.forEach((angle, i) => {
    const rad = (angle * Math.PI) / 180;
    positions.push({ x: 50 + radii[i] * Math.cos(rad), y: 50 + radii[i] * Math.sin(rad) });
  });
  return positions;
}

function getConnections() {
  return {
    primary: Array.from({ length: 10 }, (_, i) => i),
    secondary: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0],
      [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
    ] as [number, number][],
  };
}

function DraggableAgent({
  agent,
  position,
  index,
  isHovered,
  isDragging,
  onHover,
  onDragStart,
  lang,
}: {
  agent: typeof AGENTS[0];
  position: { x: number; y: number };
  index: number;
  isHovered: boolean;
  isDragging: boolean;
  onHover: (index: number | null) => void;
  onDragStart: (index: number, e: React.MouseEvent | React.TouchEvent) => void;
  lang: string;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${isDragging ? "duration-0 cursor-grabbing z-30" : "duration-300 cursor-grab z-20"}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      onMouseEnter={() => !isDragging && onHover(index)}
      onMouseLeave={() => !isDragging && onHover(null)}
      onMouseDown={(e) => onDragStart(index, e)}
      onTouchStart={(e) => onDragStart(index, e)}
    >
      {/* Ripple ring on hover */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{
          width: isHovered ? 110 : 72,
          height: isHovered ? 110 : 72,
          left: "50%",
          top: "50%",
          border: `2px solid ${agent.color}`,
          opacity: isHovered ? 0.3 : 0,
          animation: isHovered ? "agent-ripple 1.5s ease-out infinite" : "none",
        }}
      />

      {/* Main orb */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          left: "50%",
          top: "50%",
          width: isHovered ? 80 : 72,
          height: isHovered ? 80 : 72,
          backgroundColor: agent.color,
          boxShadow: isHovered || isDragging
            ? `0 0 48px ${agent.color}99, 0 0 96px ${agent.color}44, inset 0 0 24px rgba(255,255,255,0.2)`
            : `0 0 36px ${agent.color}70, 0 0 72px ${agent.color}25`,
          border: isHovered ? "2px solid rgba(255,255,255,0.5)" : "2px solid rgba(255,255,255,0.15)",
          transform: isHovered && !isDragging ? "scale(1.1)" : "scale(1)",
        }}
      >
        <span className="text-white font-display font-bold text-2xl select-none">{agent.symbol}</span>
      </div>

      {/* Label */}
      <div
        className="absolute top-full mt-4 text-center whitespace-nowrap transition-all duration-300 pointer-events-none"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          opacity: isHovered ? 1 : 0.7,
        }}
      >
        <span className={`${isHovered ? "text-white font-semibold text-sm" : "text-white text-xs"}`}>
          {agent.name}
        </span>
        {isHovered && (
          <p className="text-[10px] text-zinc-300 mt-1 max-w-[140px] mx-auto">
            {lang === "pt" ? agent.funcPt : agent.funcEn}
          </p>
        )}
      </div>
    </div>
  );
}

export function SectionAgents() {
  const { t, lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const [positions, setPositions] = useState(getInitialPositions);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const connections = getConnections();

  const handleDragStart = useCallback((index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDraggingIndex(index);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
  }, []);

  useEffect(() => {
    if (draggingIndex === null) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current || draggingIndex === null) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const newX = ((clientX - rect.left) / rect.width) * 100;
      const newY = ((clientY - rect.top) / rect.height) * 100;
      const clampedX = Math.max(5, Math.min(95, newX));
      const clampedY = Math.max(5, Math.min(95, newY));
      setPositions((prev) => {
        const next = [...prev];
        next[draggingIndex] = { x: clampedX, y: clampedY };
        return next;
      });
    };

    const handleEnd = () => {
      setDraggingIndex(null);
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [draggingIndex]);

  return (
    <section id="agentes" className="py-12 md:py-16 lg:py-20 bg-zinc-900/10 relative overflow-hidden">
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
            {t(
              "10 agentes de IA especializados, conectados por linhas de dados e trabalhando 24/7 pelo seu negócio.",
              "10 specialized AI agents, connected by data lines and working 24/7 for your business."
            )}
          </p>
          <p className="mt-2 text-xs text-zinc-600 hidden md:block">
            {t("Arraste os agentes para explorar as conexões", "Drag the agents to explore the connections")}
          </p>
        </div>

        {/* Desktop — interactive constellation */}
        <div ref={containerRef} className="hidden md:block relative w-full max-w-4xl mx-auto aspect-square select-none">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden>
            <defs>
              <filter id="glow-soft"><feGaussianBlur stdDeviation="0.3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="glow-bright"><feGaussianBlur stdDeviation="0.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <linearGradient id="orch-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" /><stop offset="100%" stopColor="#d4af77" />
              </linearGradient>
            </defs>

            {/* Secondary connections */}
            {connections.secondary.map(([a, b], i) => (
              <line
                key={`s-${i}`}
                x1={positions[a].x} y1={positions[a].y}
                x2={positions[b].x} y2={positions[b].y}
                stroke={hoveredAgent === a || hoveredAgent === b ? AGENTS[a].color : "#14b8a6"}
                strokeWidth={hoveredAgent === a || hoveredAgent === b ? "0.35" : "0.2"}
                strokeOpacity={hoveredAgent === a || hoveredAgent === b ? 0.5 : 0.25}
                filter="url(#glow-soft)"
                style={{ transition: "all 300ms ease" }}
              />
            ))}

            {/* Primary connections to center */}
            {connections.primary.map((idx, i) => {
              const isH = hoveredAgent === idx || draggingIndex === idx;
              return (
                <line
                  key={`p-${i}`}
                  x1={positions[idx].x} y1={positions[idx].y}
                  x2={50} y2={50}
                  stroke={isH ? AGENTS[idx].color : "#14b8a6"}
                  strokeWidth={isH ? "0.5" : "0.3"}
                  strokeOpacity={isH ? 0.7 : 0.4}
                  filter="url(#glow-bright)"
                  style={{ transition: draggingIndex === idx ? "none" : "all 300ms ease" }}
                />
              );
            })}

            {/* Central node */}
            <circle cx="50" cy="50" r="4" fill="url(#orch-gradient)" filter="url(#glow-bright)" style={{ animation: "pulse-orchestrator 2s ease-in-out infinite" }} />
            <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="2.5" fontWeight="bold" fontFamily="serif" style={{ pointerEvents: "none" }}>Ω</text>
          </svg>

          {/* Draggable agent nodes */}
          {AGENTS.map((agent, i) => (
            <DraggableAgent
              key={i}
              agent={agent}
              position={positions[i]}
              index={i}
              isHovered={hoveredAgent === i}
              isDragging={draggingIndex === i}
              onHover={setHoveredAgent}
              onDragStart={handleDragStart}
              lang={lang}
            />
          ))}

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/60 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600" />
              <span className="text-xs font-semibold text-zinc-300">Amazon Seller Central</span>
            </div>
          </div>
        </div>

        {/* Mobile — scrollable row with cards */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
            {AGENTS.map((agent, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[160px] snap-center flex flex-col items-center gap-3 p-5 rounded-xl border border-zinc-700/40 bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300"
                style={{
                  boxShadow: `0 0 20px ${agent.color}15`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: agent.color,
                    boxShadow: `0 0 30px ${agent.color}60`,
                    border: "2px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <span className="text-white font-display font-bold text-xl">{agent.symbol}</span>
                </div>
                <span className="text-sm text-white font-semibold">{agent.name}</span>
                <span className="text-[11px] text-zinc-400 text-center leading-tight">
                  {lang === "pt" ? agent.funcPt : agent.funcEn}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-zinc-600 mt-2">{t("← Deslize para ver todos →", "← Swipe to see all →")}</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-orchestrator {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(20,184,166,0.8)); }
          50% { filter: drop-shadow(0 0 28px rgba(20,184,166,1)); }
        }
        @keyframes agent-ripple {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
