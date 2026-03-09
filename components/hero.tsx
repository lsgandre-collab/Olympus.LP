"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/contexts/lang-context";

const DOTS = [
  { color: "#8b5cf6", x: "10%", y: "15%", size: 14, delay: 0 },
  { color: "#22c55e", x: "85%", y: "20%", size: 12, delay: 0.3 },
  { color: "#3b82f6", x: "20%", y: "78%", size: 13, delay: 0.7 },
  { color: "#eab308", x: "72%", y: "72%", size: 15, delay: 1.0 },
  { color: "#ec4899", x: "48%", y: "8%", size: 10, delay: 0.5 },
  { color: "#f97316", x: "90%", y: "52%", size: 12, delay: 0.9 },
  { color: "#14b8a6", x: "6%", y: "48%", size: 13, delay: 0.15 },
  { color: "#a855f7", x: "35%", y: "88%", size: 11, delay: 1.3 },
  { color: "#d4af77", x: "58%", y: "32%", size: 16, delay: 0.2 },
  { color: "#6366f1", x: "93%", y: "82%", size: 11, delay: 0.8 },
];

const LINES: [number, number][] = [
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [9, 8],
  [0, 2], [1, 5], [3, 9], [4, 6], [7, 3], [0, 4], [6, 2], [1, 3],
];

const TICKER_PT = [
  { icon: "◉", text: "4.152 SKUs sendo analisados agora", color: "#14b8a6" },
  { icon: "◉", text: "89 oportunidades de lucro encontradas hoje", color: "#eab308" },
  { icon: "◉", text: "Economia de R$1.8K/mês em ads ativos", color: "#22c55e" },
  { icon: "◉", text: "10 agentes operando em tempo real", color: "#8b5cf6" },
  { icon: "◉", text: "+42% margem líquida média dos sellers", color: "#ec4899" },
];
const TICKER_EN = [
  { icon: "◉", text: "4,152 SKUs being analyzed right now", color: "#14b8a6" },
  { icon: "◉", text: "89 profit opportunities found today", color: "#eab308" },
  { icon: "◉", text: "Saving $1.8K/mo in active ad spend", color: "#22c55e" },
  { icon: "◉", text: "10 agents operating in real time", color: "#8b5cf6" },
  { icon: "◉", text: "+42% average net margin for sellers", color: "#ec4899" },
];

export function Hero() {
  const { t, lang } = useLang();
  const ticker = lang === "en" ? TICKER_EN : TICKER_PT;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ticker.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [ticker.length]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <svg className="w-full h-full opacity-40">
          {LINES.map(([a, b], i) => (
            <line key={i} x1={DOTS[a].x} y1={DOTS[a].y} x2={DOTS[b].x} y2={DOTS[b].y} stroke="#eab308" strokeWidth="0.6" strokeOpacity="0.5" style={{ animation: `pulse-glow 3s ease-in-out ${i * 0.18}s infinite` }} />
          ))}
        </svg>
        {DOTS.map((d, i) => (
          <div key={i} className="absolute rounded-full" style={{ left: d.x, top: d.y, width: d.size, height: d.size, backgroundColor: d.color, boxShadow: `0 0 24px ${d.color}90`, animation: `float 3.5s ease-in-out ${d.delay}s infinite` }} />
        ))}
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/50 via-zinc-950/70 to-zinc-950" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">Multi-Agent Seller OS</p>
        <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
          {t("Venda Mais na Amazon.", "Sell More on Amazon.")}
          <br />
          {t("Trabalhe Menos.", "Work Less.")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-yellow-400">
            {t("Automatize Seu Império 24/7.", "Automate Your Empire 24/7.")}
          </span>
        </h1>
        <p className="mt-8 text-lg text-zinc-400 md:text-xl max-w-2xl mx-auto">
          {t(
            "10 agentes autônomos analisam SKUs, protegem margens, gerenciam estoque e campanhas — enquanto você descansa.",
            "10 autonomous agents analyze SKUs, protect margins, manage inventory and campaigns — while you rest."
          )}
        </p>
        <div className="mt-14 mx-auto max-w-md">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 font-semibold">{t("Atividade ao vivo", "Live activity")}</p>
            <div className="space-y-2">
              {ticker.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm transition-all duration-500"
                  style={{ opacity: i === activeIdx ? 1 : 0.35, transform: i === activeIdx ? "scale(1.04)" : "scale(1)" }}
                >
                  <span style={{ color: item.color, animation: i === activeIdx ? "ticker-fade 1.5s ease-in-out infinite" : "none" }}>{item.icon}</span>
                  <span className="text-zinc-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
