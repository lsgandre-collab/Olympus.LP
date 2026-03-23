"use client";

import { useLang } from "@/contexts/lang-context";

const STEPS = [
  { num: "01", color: "#14b8a6", titlePt: "Captação", titleEn: "Capture", descPt: "Conecte sua conta Amazon Seller Central. Seus dados e catálogo entram no sistema automaticamente.", descEn: "Connect your Amazon Seller Central account. Your data and catalog enter the system automatically." },
  { num: "02", color: "#3b82f6", titlePt: "Análise", titleEn: "Analysis", descPt: "Os 10 agentes analisam milhares de SKUs, margens, concorrentes e campanhas em tempo real.", descEn: "All 10 agents analyze thousands of SKUs, margins, competitors and campaigns in real time." },
  { num: "03", color: "#eab308", titlePt: "Automação", titleEn: "Automation", descPt: "Preços, ads, estoque e listings são otimizados automaticamente 24/7 pelo Orquestrador.", descEn: "Pricing, ads, inventory and listings are optimized automatically 24/7 by the Orchestrator." },
  { num: "04", color: "#ec4899", titlePt: "Escala", titleEn: "Scale", descPt: "Repita para centenas ou milhares de SKUs sem contratar mais gente. O sistema cresce com você.", descEn: "Repeat for hundreds or thousands of SKUs without hiring more people. The system grows with you." },
];

function AnimatedPlugIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes plug-connect {
            0%, 100% { transform: translateX(-8px); opacity: 0.6; }
            50% { transform: translateX(0); opacity: 1; }
          }
          @keyframes spark-burst {
            0% { r: 2; opacity: 1; }
            100% { r: 8; opacity: 0; }
          }
          .plug { animation: plug-connect 2s ease-in-out infinite; }
          .spark { animation: spark-burst 1.5s ease-out infinite; }
        `}</style>
      </defs>
      <g className="plug">
        <rect x="35" y="20" width="30" height="20" rx="4" fill="#14b8a6" opacity="0.8" />
        <rect x="40" y="42" width="8" height="15" fill="#14b8a6" />
        <rect x="52" y="42" width="8" height="15" fill="#14b8a6" />
      </g>
      <g className="plug">
        <circle cx="50" cy="65" r="8" fill="#14b8a6" opacity="0.8" />
      </g>
      <circle cx="72" cy="50" r="2" fill="#fbbf24" className="spark" style={{ animationDelay: "0s" }} />
      <circle cx="75" cy="55" r="2" fill="#fbbf24" className="spark" style={{ animationDelay: "0.3s" }} />
      <circle cx="70" cy="60" r="2" fill="#fbbf24" className="spark" style={{ animationDelay: "0.6s" }} />
    </svg>
  );
}

function AnimatedWaveformIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes wave-1 {
            0%, 100% { d: path("M 20 60 L 20 45 L 20 60"); }
            50% { d: path("M 20 60 L 20 25 L 20 60"); }
          }
          @keyframes wave-2 {
            0%, 100% { d: path("M 35 60 L 35 40 L 35 60"); }
            50% { d: path("M 35 60 L 35 15 L 35 60"); }
          }
          @keyframes wave-3 {
            0%, 100% { d: path("M 50 60 L 50 45 L 50 60"); }
            50% { d: path("M 50 60 L 50 25 L 50 60"); }
          }
          @keyframes wave-4 {
            0%, 100% { d: path("M 65 60 L 65 40 L 65 60"); }
            50% { d: path("M 65 60 L 65 15 L 65 60"); }
          }
          @keyframes wave-5 {
            0%, 100% { d: path("M 80 60 L 80 45 L 80 60"); }
            50% { d: path("M 80 60 L 80 25 L 80 60"); }
          }
          .bar { animation: linear infinite; }
          .bar-1 { animation: wave-1 1s linear infinite; }
          .bar-2 { animation: wave-2 1s linear infinite 0.15s; }
          .bar-3 { animation: wave-3 1s linear infinite 0.3s; }
          .bar-4 { animation: wave-4 1s linear infinite 0.15s; }
          .bar-5 { animation: wave-5 1s linear infinite 0s; }
        `}</style>
      </defs>
      <rect x="18" y="55" width="4" height="30" fill="#3b82f6" className="bar-1" />
      <rect x="33" y="55" width="4" height="30" fill="#3b82f6" className="bar-2" />
      <rect x="48" y="55" width="4" height="30" fill="#3b82f6" className="bar-3" />
      <rect x="63" y="55" width="4" height="30" fill="#3b82f6" className="bar-4" />
      <rect x="78" y="55" width="4" height="30" fill="#3b82f6" className="bar-5" />
    </svg>
  );
}

function AnimatedGearsIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes rotate-cw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes rotate-ccw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          @keyframes pulse-bolt {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          .gear-main { animation: rotate-cw 3s linear infinite; transform-origin: 35px 35px; }
          .gear-small { animation: rotate-ccw 2s linear infinite; transform-origin: 65px 65px; }
          .bolt { animation: pulse-bolt 1.5s ease-in-out infinite; }
        `}</style>
      </defs>
      <g className="gear-main">
        <circle cx="35" cy="35" r="18" fill="none" stroke="#eab308" strokeWidth="2" />
        <rect x="33" y="12" width="4" height="6" fill="#eab308" />
        <rect x="33" y="52" width="4" height="6" fill="#eab308" />
        <rect x="12" y="33" width="6" height="4" fill="#eab308" />
        <rect x="52" y="33" width="6" height="4" fill="#eab308" />
      </g>
      <g className="gear-small">
        <circle cx="65" cy="65" r="12" fill="none" stroke="#eab308" strokeWidth="2" />
        <rect x="63" y="50" width="4" height="5" fill="#eab308" />
        <rect x="63" y="70" width="4" height="5" fill="#eab308" />
      </g>
      <g className="bolt">
        <path d="M 50 35 L 55 40 M 55 40 L 50 45 M 55 40 L 60 40" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function AnimatedChartIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes bar-grow-1 {
            0%, 10% { height: 15px; }
            100% { height: 35px; }
          }
          @keyframes bar-grow-2 {
            0%, 20% { height: 20px; }
            100% { height: 50px; }
          }
          @keyframes bar-grow-3 {
            0%, 30% { height: 25px; }
            100% { height: 55px; }
          }
          @keyframes bar-grow-4 {
            0%, 40% { height: 30px; }
            100% { height: 60px; }
          }
          .chart-bar { animation: linear infinite 2.5s; }
          .bar-1 { animation: bar-grow-1 2.5s linear infinite; }
          .bar-2 { animation: bar-grow-2 2.5s linear infinite; }
          .bar-3 { animation: bar-grow-3 2.5s linear infinite; }
          .bar-4 { animation: bar-grow-4 2.5s linear infinite; }
        `}</style>
      </defs>
      <line x1="20" y1="70" x2="80" y2="70" stroke="#ec4899" strokeWidth="2" />
      <line x1="20" y1="20" x2="20" y2="70" stroke="#ec4899" strokeWidth="2" />
      <rect x="30" y="55" width="10" height="15" fill="#ec4899" className="bar-1" />
      <rect x="45" y="50" width="10" height="20" fill="#ec4899" className="bar-2" />
      <rect x="60" y="45" width="10" height="25" fill="#ec4899" className="bar-3" />
      <rect x="75" y="40" width="10" height="30" fill="#ec4899" className="bar-4" />
    </svg>
  );
}

function AnimatedDataFlow() {
  return (
    <svg className="w-full h-1" viewBox="0 0 100 2" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes data-flow {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
          .flow-dot { animation: data-flow 2s linear infinite; }
        `}</style>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      <line x1="0" y1="1" x2="100" y2="1" stroke="url(#flowGradient)" strokeWidth="1.5" opacity="0.3" />
      <circle cx="50" cy="1" r="1.5" fill="#14b8a6" className="flow-dot" />
    </svg>
  );
}

export function SectionHowItWorks() {
  const { t } = useLang();
  return (
    <section id="como-funciona" className="section-padding bg-zinc-900/20">
      <style>{`
        @keyframes glow-ring {
          0%, 100% { box-shadow: inset 0 0 0 2px currentColor, 0 0 12px rgba(20, 184, 166, 0.3); }
          50% { box-shadow: inset 0 0 0 2px currentColor, 0 0 24px rgba(20, 184, 166, 0.6); }
        }

        .step-number {
          animation: glow-ring 2s ease-in-out infinite;
        }

        .step-1 .step-number { color: #14b8a6; }
        .step-2 .step-number { color: #3b82f6; }
        .step-3 .step-number { color: #eab308; }
        .step-4 .step-number { color: #ec4899; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{t("Como Funciona", "How It Works")}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">{t("Da captação à escala, no automático.", "From capture to scale, on autopilot.")}</p>
        </div>
        <div className="relative">
          {/* Animated connecting line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 z-0">
            <AnimatedDataFlow />
          </div>

          {/* Steps grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`step-${i + 1} animate-fade-in-up rounded-2xl border border-zinc-800 bg-zinc-950 p-8 relative overflow-hidden`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Colored top bar */}
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ backgroundColor: step.color }} />

                {/* Step number with glow effect */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="step-number w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `2px solid ${step.color}`,
                      color: step.color,
                    }}
                  >
                    <span className="font-display text-xl font-bold">{step.num}</span>
                  </div>
                </div>

                {/* Animated icon */}
                <div className="mb-6 flex items-center justify-center h-16">
                  {i === 0 && <AnimatedPlugIcon />}
                  {i === 1 && <AnimatedWaveformIcon />}
                  {i === 2 && <AnimatedGearsIcon />}
                  {i === 3 && <AnimatedChartIcon />}
                </div>

                {/* Title and description */}
                <h3 className="font-display text-xl font-semibold text-white text-center">{t(step.titlePt, step.titleEn)}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed text-center">{t(step.descPt, step.descEn)}</p>

                {/* Arrow for desktop between steps */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-5 top-24 z-20 text-2xl font-bold" style={{ color: step.color }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
