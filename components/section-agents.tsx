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
  const angles = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
  const radii = [38, 38, 38, 38, 38, 38, 38, 38, 38, 38];
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
  isSelected,
  isDragging,
  onHover,
  onClick,
  onDragStart,
  lang,
}: {
  agent: typeof AGENTS[0];
  position: { x: number; y: number };
  index: number;
  isHovered: boolean;
  isSelected: boolean;
  isDragging: boolean;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
  onDragStart: (index: number, e: React.MouseEvent | React.TouchEvent) => void;
  lang: string;
}) {
  const active = isHovered || isSelected;
  const didDragRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    didDragRef.current = false;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    onDragStart(index, e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    didDragRef.current = false;
    startPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    onDragStart(index, e);
  };

  const handleMouseUp = () => {
    if (!didDragRef.current) {
      onClick(index);
    }
  };

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 group ${isDragging ? "duration-0 cursor-grabbing z-30" : "cursor-grab z-20"}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition: isDragging ? "none" : "left 0.3s ease, top 0.3s ease",
      }}
      onMouseEnter={() => !isDragging && onHover(index)}
      onMouseLeave={() => !isDragging && onHover(null)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
    >
      {/* Pulse ring animation (always visible, slow breathing) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 90,
          height: 90,
          left: "50%",
          top: "50%",
          border: `2px solid ${agent.color}`,
          opacity: active ? 0.5 : 0.15,
          animation: "agent-breathe 3s ease-in-out infinite",
          animationDelay: `${index * 0.3}s`,
        }}
      />

      {/* Outer glow ring on hover/select */}
      {active && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 110,
            height: 110,
            left: "50%",
            top: "50%",
            border: `1.5px solid ${agent.color}`,
            animation: "agent-ripple 1.5s ease-out infinite",
          }}
        />
      )}

      {/* Main orb with constant glow */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
        style={{
          left: "50%",
          top: "50%",
          width: active ? 76 : 68,
          height: active ? 76 : 68,
          backgroundColor: agent.color,
          boxShadow: active
            ? `0 0 50px ${agent.color}aa, 0 0 100px ${agent.color}55, inset 0 0 20px rgba(255,255,255,0.25)`
            : `0 0 30px ${agent.color}66, 0 0 60px ${agent.color}22`,
          border: active ? "2px solid rgba(255,255,255,0.5)" : "2px solid rgba(255,255,255,0.15)",
          transition: "all 0.3s ease",
          animation: isDragging ? "none" : `agent-float ${3 + index * 0.2}s ease-in-out infinite`,
          animationDelay: `${index * 0.5}s`,
        }}
      >
        <span className="text-white font-display font-bold text-2xl select-none drop-shadow-lg">{agent.symbol}</span>
      </div>

      {/* Label — always visible, well centered */}
      <div
        className="absolute text-center whitespace-nowrap pointer-events-none"
        style={{
          left: "50%",
          top: "calc(50% + 48px)",
          transform: "translateX(-50%)",
          transition: "all 0.3s ease",
        }}
      >
        <span
          className="text-white font-semibold text-xs block"
          style={{
            textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)",
          }}
        >
          {agent.name}
        </span>

        {/* Function text — shown on hover or click */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: active ? 40 : 0,
            opacity: active ? 1 : 0,
          }}
        >
          <p
            className="text-[10px] mt-1 max-w-[140px] mx-auto leading-tight px-2 py-1 rounded-md"
            style={{
              color: agent.color,
              backgroundColor: "rgba(0,0,0,0.7)",
              textShadow: `0 0 10px ${agent.color}66`,
            }}
          >
            {lang === "pt" ? agent.funcPt : agent.funcEn}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SectionAgents() {
  const { t, lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [positions, setPositions] = useState(getInitialPositions);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const connections = getConnections();

  const handleClick = useCallback((index: number) => {
    setSelectedAgent((prev) => (prev === index ? null : index));
  }, []);

  const handleDragStart = useCallback((index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDraggingIndex(index);
    hasDraggedRef.current = false;
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

      // Check if actually dragged (more than 5px)
      if (dragStartRef.current) {
        const dx = clientX - dragStartRef.current.x;
        const dy = clientY - dragStartRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > 5) {
          hasDraggedRef.current = true;
        }
      }

      const newX = ((clientX - rect.left) / rect.width) * 100;
      const newY = ((clientY - rect.top) / rect.height) * 100;
      const clampedX = Math.max(8, Math.min(92, newX));
      const clampedY = Math.max(8, Math.min(92, newY));
      setPositions((prev) => {
        const next = [...prev];
        next[draggingIndex] = { x: clampedX, y: clampedY };
        return next;
      });
    };

    const handleEnd = () => {
      if (!hasDraggedRef.current && draggingIndex !== null) {
        // It was a click, not a drag
        setSelectedAgent((prev) => (prev === draggingIndex ? null : draggingIndex));
      }
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
          <p className="mt-2 text-xs text-zinc-500 hidden md:block">
            {t("Arraste ou clique nos agentes para explorar", "Drag or click agents to explore")}
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

            {/* Secondary connections (agent ring) */}
            {connections.secondary.map(([a, b], i) => {
              const isActive = hoveredAgent === a || hoveredAgent === b || selectedAgent === a || selectedAgent === b;
              return (
                <line
                  key={`s-${i}`}
                  x1={positions[a].x} y1={positions[a].y}
                  x2={positions[b].x} y2={positions[b].y}
                  stroke={isActive ? AGENTS[a].color : "#14b8a6"}
                  strokeWidth={isActive ? "0.4" : "0.2"}
                  strokeOpacity={isActive ? 0.6 : 0.2}
                  filter="url(#glow-soft)"
                  style={{ transition: draggingIndex !== null ? "none" : "all 300ms ease" }}
                />
              );
            })}

            {/* Primary connections to center (data lines with animated dash) */}
            {connections.primary.map((idx) => {
              const isActive = hoveredAgent === idx || selectedAgent === idx || draggingIndex === idx;
              return (
                <line
                  key={`p-${idx}`}
                  x1={positions[idx].x} y1={positions[idx].y}
                  x2={50} y2={50}
                  stroke={isActive ? AGENTS[idx].color : "#14b8a6"}
                  strokeWidth={isActive ? "0.5" : "0.25"}
                  strokeOpacity={isActive ? 0.8 : 0.35}
                  strokeDasharray={isActive ? "none" : "1 1.5"}
                  filter="url(#glow-bright)"
                  style={{ transition: draggingIndex === idx ? "none" : "all 300ms ease" }}
                >
                  {!isActive && (
                    <animate attributeName="stroke-dashoffset" from="0" to="5" dur="3s" repeatCount="indefinite" />
                  )}
                </line>
              );
            })}

            {/* Central ATLAS node */}
            <circle cx="50" cy="50" r="4.5" fill="url(#orch-gradient)" filter="url(#glow-bright)" style={{ animation: "pulse-orchestrator 2s ease-in-out infinite" }} />
            <circle cx="50" cy="50" r="6" fill="none" stroke="url(#orch-gradient)" strokeWidth="0.3" strokeOpacity="0.4" style={{ animation: "atlas-ring 3s ease-in-out infinite" }} />
            <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="3" fontWeight="bold" fontFamily="serif" style={{ pointerEvents: "none" }}>Ω</text>
            <text x="50" y="56" textAnchor="middle" fill="white" fontSize="1.5" fontWeight="600" style={{ pointerEvents: "none" }} opacity="0.8">ATLAS</text>
          </svg>

          {/* Draggable agent nodes */}
          {AGENTS.map((agent, i) => (
            <DraggableAgent
              key={i}
              agent={agent}
              position={positions[i]}
              index={i}
              isHovered={hoveredAgent === i}
              isSelected={selectedAgent === i}
              isDragging={draggingIndex === i}
              onHover={setHoveredAgent}
              onClick={handleClick}
              onDragStart={handleDragStart}
              lang={lang}
            />
          ))}

          {/* Amazon badge at bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/60 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600" />
              <span className="text-xs font-semibold text-zinc-300">Amazon Seller Central</span>
            </div>
          </div>
        </div>

        {/* Mobile — scrollable cards with tap for function */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
            {AGENTS.map((agent, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[170px] snap-center flex flex-col items-center gap-3 p-5 rounded-xl border border-zinc-700/40 bg-zinc-800/30 transition-all duration-300"
                style={{
                  boxShadow: `0 0 25px ${agent.color}20`,
                  animation: `agent-float ${3 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center relative"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: agent.color,
                    boxShadow: `0 0 35px ${agent.color}70`,
                    border: "2px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <span className="text-white font-display font-bold text-xl">{agent.symbol}</span>
                  {/* breathing ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `1.5px solid ${agent.color}`,
                      animation: "agent-breathe 3s ease-in-out infinite",
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
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
          50% { filter: drop-shadow(0 0 30px rgba(20,184,166,1)); }
        }
        @keyframes atlas-ring {
          0%, 100% { r: 6; opacity: 0.3; }
          50% { r: 7.5; opacity: 0.6; }
        }
        @keyframes agent-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.35; }
        }
        @keyframes agent-ripple {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes agent-float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-4px); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
