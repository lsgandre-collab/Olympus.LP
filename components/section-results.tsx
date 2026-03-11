"use client";

import { useLang } from "@/contexts/lang-context";
import { useEffect, useRef, useState } from "react";

const METRICS = [
  {
    value: 42,
    suffix: "%",
    labelPt: "aumento médio em margem líquida",
    labelEn: "average net margin increase",
    icon: "📈",
    color: "#22c55e",
    before: "0%",
  },
  {
    value: 68,
    suffix: "%",
    labelPt: "redução no tempo manual operacional",
    labelEn: "reduction in manual operational time",
    icon: "⏱️",
    color: "#3b82f6",
    before: "100%",
  },
  {
    value: 89,
    suffix: "",
    labelPt: "oportunidades de lucro por mês",
    labelEn: "profit opportunities per month",
    icon: "💰",
    color: "#eab308",
    before: "~8",
  },
  {
    value: 4152,
    suffix: "",
    labelPt: "SKUs monitorados simultaneamente",
    labelEn: "SKUs monitored simultaneously",
    icon: "📦",
    color: "#8b5cf6",
    before: "~500",
  },
  {
    value: 1800,
    suffix: "K",
    labelPt: "economia mensal em ads desperdiçados",
    labelEn: "monthly savings in wasted ad spend",
    icon: "💸",
    color: "#f97316",
    before: "R$0",
    formatPrefix: "-R$",
  },
  {
    value: 2,
    suffix: "min",
    labelPt: "tempo de resposta do Orquestrador",
    labelEn: "Orchestrator response time",
    icon: "⚡",
    color: "#14b8a6",
    before: "~30min",
    isLessThan: true,
  },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
  isLessThan?: boolean;
  formatPrefix?: string;
}

function AnimatedCounter({ value, suffix, duration = 2000, isLessThan = false, formatPrefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = countRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isVisible, value, duration]);

  return (
    <div ref={countRef} className="font-display text-5xl font-bold md:text-6xl">
      {isLessThan && "<"}
      {formatPrefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

function MetricCard({ metric }: { metric: typeof METRICS[0] }) {
  const { t } = useLang();
  const progress = (metric.value / Math.max(...METRICS.map(m => m.value))) * 100;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors duration-300">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" style={{ color: metric.color }} />

      {/* Background gradient on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: metric.color }} />

      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4">{metric.icon}</div>

        {/* Before/After comparison */}
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-sm text-zinc-500">{t("Antes:", "Before:")}</span>
          <span className="text-sm font-mono text-zinc-600">{metric.before}</span>
        </div>

        {/* Animated counter */}
        <div style={{ color: metric.color }} className="mb-2">
          <AnimatedCounter
            value={metric.value}
            suffix={metric.suffix}
            isLessThan={metric.isLessThan}
            formatPrefix={metric.formatPrefix}
          />
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              backgroundColor: metric.color,
              boxShadow: `0 0 8px ${metric.color}40`
            }}
          />
        </div>

        {/* Label */}
        <p className="text-sm text-zinc-400 leading-relaxed">{metric.labelPt}</p>
      </div>
    </div>
  );
}

export function SectionResults() {
  const { t } = useLang();

  return (
    <section id="resultados" className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t("Resultados Reais", "Real Results")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">
            {t("Métricas extraídas de operações reais monitoradas pelo OLYMPUS.", "Metrics extracted from real operations monitored by OLYMPUS.")}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {METRICS.map((m, i) => (
            <div key={m.labelPt} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <MetricCard metric={m} />
            </div>
          ))}
        </div>

        {/* Premium Quote */}
        <div className="relative mt-20 pt-16 border-t border-zinc-800/50">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Quote mark decoration */}
              <div className="absolute -left-8 -top-8 text-6xl opacity-10" style={{ color: "#22c55e" }}>
                {`"`}
              </div>

              <blockquote className="text-center">
                <p className="text-xl md:text-2xl font-display font-bold text-white leading-relaxed mb-6">
                  {t(
                    "Enquanto ferramentas tradicionais resolvem um problema, o OLYMPUS resolve todos simultaneamente.",
                    "While traditional tools solve one problem, OLYMPUS solves them all simultaneously."
                  )}
                </p>
                <footer className="text-sm text-zinc-400 uppercase tracking-widest">
                  — {t("A Filosofia do OLYMPUS", "The OLYMPUS Philosophy")}
                </footer>
              </blockquote>

              {/* Accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full" style={{ backgroundColor: "#22c55e" }} />
            </div>
          </div>
        </div>

        {/* Reality stamp */}
        <div className="text-center mt-16">
          <p className="inline-block px-4 py-2 rounded-full border border-zinc-700/50 text-sm text-zinc-400">
            ✓ {t("Resultados de operações reais em produção", "Results from real operations in production")}
          </p>
        </div>
      </div>
    </section>
  );
}
