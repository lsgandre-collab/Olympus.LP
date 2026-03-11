"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/contexts/lang-context";

const TICKER_PT = [
  { number: "4.152", unit: "SKUs", text: "sendo analisados agora", color: "#14b8a6", delay: 0 },
  { number: "2.4M", unit: "R$", text: "em faturamento monitorado", color: "#22c55e", delay: 0.2 },
  { number: "347", unit: "", text: "ajustes de preço nas últimas 24h", color: "#eab308", delay: 0.4 },
  { number: "12", unit: "", text: "campanhas otimizadas automaticamente", color: "#8b5cf6", delay: 0.6 },
  { number: "99.7%", unit: "", text: "uptime do sistema", color: "#3b82f6", delay: 0.8 },
  { number: "+42%", unit: "", text: "margem líquida média dos sellers", color: "#ec4899", delay: 1.0 },
];

const TICKER_EN = [
  { number: "4,152", unit: "SKUs", text: "being analyzed right now", color: "#14b8a6", delay: 0 },
  { number: "2.4M", unit: "$", text: "in monitored revenue", color: "#22c55e", delay: 0.2 },
  { number: "347", unit: "", text: "price adjustments in last 24h", color: "#eab308", delay: 0.4 },
  { number: "12", unit: "", text: "campaigns auto-optimized", color: "#8b5cf6", delay: 0.6 },
  { number: "99.7%", unit: "", text: "system uptime", color: "#3b82f6", delay: 0.8 },
  { number: "+42%", unit: "", text: "average net margin for sellers", color: "#ec4899", delay: 1.0 },
];

function AnimatedCounter({ value, unit }: { value: string; unit: string }) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    // Extract numeric part for animation
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const numericValue = parseFloat(numericMatch[0]);
    const isPercentage = value.includes("%");
    const isMoney = unit === "R$" || unit === "$";

    let currentValue = 0;
    const step = numericValue / 30;
    const interval = setInterval(() => {
      currentValue += step;
      if (currentValue >= numericValue) {
        currentValue = numericValue;
        clearInterval(interval);
      }

      let formatted = currentValue.toFixed(isPercentage || isMoney ? 1 : 0);
      if (unit === "SKUs" && currentValue >= 1000) {
        formatted = (currentValue / 1000).toFixed(1) + "K";
      } else if (unit === "$" || unit === "R$") {
        if (currentValue >= 1000000) {
          formatted = (currentValue / 1000000).toFixed(1) + "M";
        }
      }

      setDisplayValue(formatted);
    }, 40);

    return () => clearInterval(interval);
  }, [value, unit]);

  return <>{displayValue}</>;
}

export function Hero() {
  const { t, lang } = useLang();
  const ticker = lang === "en" ? TICKER_EN : TICKER_PT;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ticker.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [ticker.length]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20">
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
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#waitlist" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-4 font-display text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition-all duration-300 hover:from-teal-400 hover:to-teal-500 hover:shadow-teal-800/50 hover:scale-105">
            {t("Quero Acesso Antecipado", "Get Early Access")}
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="/demo" className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-700 px-8 py-4 font-display text-base font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-800/50">
            {t("Ver Demo", "View Demo")}
          </a>
        </div>

        <style jsx>{`
          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1);
            }
            50% {
              box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.2);
            }
          }

          @keyframes live-pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.6;
            }
          }

          @keyframes scan-line {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes item-glow {
            0%, 100% {
              filter: drop-shadow(0 0 2px transparent);
            }
            50% {
              filter: drop-shadow(0 0 8px currentColor);
            }
          }

          .ticker-container {
            position: relative;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 20px;
            padding: 28px 24px;
            margin-top: 56px;
            border: 2px solid;
            border-image: linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(139, 92, 246, 0.4), rgba(34, 197, 94, 0.4)) 1;
            box-shadow:
              0 8px 32px rgba(16, 185, 129, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
            animation: pulse-glow 3s ease-in-out infinite;
          }

          .ticker-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 20px;
          }

          .live-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #22c55e;
            animation: live-pulse 1.5s ease-in-out infinite;
          }

          .ticker-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 16px;
            position: relative;
          }

          .ticker-grid::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.15), transparent);
            pointer-events: none;
            animation: scan-line 3s ease-in-out infinite;
            border-radius: 8px;
          }

          .ticker-item {
            position: relative;
            padding: 16px;
            border-radius: 12px;
            background: rgba(24, 24, 27, 0.4);
            border: 1px solid rgba(113, 113, 122, 0.3);
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 1;
          }

          .ticker-item.active {
            transform: scale(1.08);
            border-color: currentColor;
            background: rgba(24, 24, 27, 0.8);
            animation: item-glow 1.5s ease-in-out infinite;
            box-shadow: 0 0 24px currentColor, 0 0 48px currentColor;
          }

          .ticker-number {
            font-size: 24px;
            font-weight: 900;
            line-height: 1;
            margin-bottom: 4px;
            letter-spacing: -0.02em;
          }

          .ticker-unit {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            tracking: 0.05em;
            opacity: 0.8;
          }

          .ticker-text {
            font-size: 12px;
            font-weight: 500;
            margin-top: 8px;
            line-height: 1.4;
            color: rgba(228, 228, 231, 0.8);
          }
        `}</style>

        <div className="ticker-container">
          <div className="ticker-header">
            <div className="live-dot" />
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              {t("Atividade ao vivo", "Live activity")}
            </p>
          </div>

          <div className="ticker-grid">
            {ticker.map((item, i) => (
              <div
                key={i}
                className={`ticker-item ${i === activeIdx ? "active" : ""}`}
                style={{
                  color: item.color,
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${item.delay * 0.1}s`,
                }}
              >
                <div className="ticker-number">
                  <AnimatedCounter value={item.number} unit={item.unit} />
                  {item.unit && <span className="ticker-unit"> {item.unit}</span>}
                </div>
                <div className="ticker-text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
