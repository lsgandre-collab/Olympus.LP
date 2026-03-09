"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/lang-context";

function WhatsAppAudio({ lang }: { lang: string }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const duration = 8;

  useEffect(() => {
    if (!playing) return;
    if (elapsed >= duration) { setPlaying(false); setElapsed(0); return; }
    const timer = setInterval(() => setElapsed((e) => e + 0.1), 100);
    return () => clearInterval(timer);
  }, [playing, elapsed]);

  const toggle = useCallback(() => {
    if (playing) { setPlaying(false); setElapsed(0); } else { setPlaying(true); setElapsed(0); }
  }, [playing]);

  const bars = 24;
  const formatTime = (s: number) => `0:${String(Math.floor(s)).padStart(2, "0")}`;

  return (
    <button
      type="button"
      onClick={toggle}
      className="mx-auto mt-8 flex items-center gap-3 rounded-2xl bg-zinc-800/80 border border-zinc-700 px-5 py-3 transition hover:bg-zinc-800 cursor-pointer max-w-sm w-full"
    >
      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><rect x="2" y="2" width="4" height="10" rx="1" /><rect x="8" y="2" width="4" height="10" rx="1" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><path d="M3 1.5v11l9-5.5z" /></svg>
        )}
      </div>
      <div className="flex-1 flex items-end gap-[2px] h-5">
        {Array.from({ length: bars }).map((_, i) => {
          const progress = elapsed / duration;
          const barActive = i / bars <= progress;
          const h = playing
            ? 4 + Math.sin((elapsed * 8) + i * 0.7) * 6 + Math.random() * 2
            : 4 + Math.sin(i * 0.5) * 3;
          return (
            <div
              key={i}
              className="w-[3px] rounded-full transition-all duration-100"
              style={{
                height: `${Math.max(3, h)}px`,
                backgroundColor: barActive ? "#22c55e" : "#52525b",
              }}
            />
          );
        })}
      </div>
      <span className="text-xs text-zinc-400 tabular-nums flex-shrink-0">{playing ? formatTime(elapsed) : formatTime(duration)}</span>
    </button>
  );
}

const CHANNELS = [
  { label: "WhatsApp", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label: "Telegram", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { label: "Google Calendar", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V8.25h15V19.5zM7.5 10.5h3v3h-3v-3zm4.5 0h3v3h-3v-3zm4.5 0h3v3h-3v-3z"/></svg> },
  { label: "Google Sheets", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.385 2H4.615A2.615 2.615 0 002 4.615v14.77A2.615 2.615 0 004.615 22h14.77A2.615 2.615 0 0022 19.385V4.615A2.615 2.615 0 0019.385 2zM8 18H5v-3h3v3zm0-4.5H5v-3h3v3zm0-4.5H5V6h3v3zm5.5 9h-4v-3h4v3zm0-4.5h-4v-3h4v3zm0-4.5h-4V6h4v3zm5.5 9h-4v-3h4v3zm0-4.5h-4v-3h4v3zm0-4.5h-4V6h4v3z"/></svg> },
];

export function SectionOrchestrator() {
  const { t, lang } = useLang();
  return (
    <section id="orquestrador" className="py-20 md:py-28 lg:py-32 border-t border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }} />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
        <div
          className="inline-flex items-center justify-center w-40 h-40 rounded-full mb-12"
          style={{
            background: "linear-gradient(135deg, #14b8a6 0%, #eab308 100%)",
            boxShadow: "0 0 80px rgba(20,184,166,0.4), 0 0 160px rgba(234,179,8,0.15), 0 0 40px rgba(20,184,166,0.3)",
          }}
        >
          <span className="text-white font-display font-bold text-7xl">Ω</span>
        </div>
        <h2 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
          {t("O Orquestrador", "The Orchestrator")}
        </h2>
        <p className="mt-10 text-xl leading-relaxed text-zinc-300 md:text-2xl max-w-3xl mx-auto">
          {t(
            "O cérebro central do OLYMPUS. Recebe dados de todos os 10 agentes, toma decisões em tempo real e coordena preços, ads, estoque e listings para sua loja rodar sozinha, 24/7.",
            "The central brain of OLYMPUS. Receives data from all 10 agents, makes real-time decisions and coordinates pricing, ads, inventory and listings so your store runs on its own, 24/7."
          )}
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          {CHANNELS.map((ch) => (
            <span key={ch.label} className="rounded-full border border-zinc-700 bg-zinc-900/80 px-6 py-3 text-base font-medium text-zinc-200 flex items-center gap-2.5 hover:bg-zinc-800 transition">
              {ch.svg}
              {ch.label}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-500">{t("Clique no play para ouvir um exemplo de relatório por áudio", "Click play to hear an example audio report")}</p>
        <WhatsAppAudio lang={lang} />
        <p className="mt-8 text-lg text-zinc-400">
          {t(
            "Converse com ele por qualquer canal. Ele entende, decide e age — em segundos.",
            "Chat with him on any channel. He understands, decides and acts — in seconds."
          )}
        </p>
        <div className="mt-10">
          <Link href="#waitlist" className="inline-block rounded-xl bg-red-600 px-8 py-4 font-display text-base font-semibold text-white transition hover:bg-red-700 shadow-lg shadow-red-900/30">
            {t("Quero Acesso Antecipado", "I Want Early Access")}
          </Link>
        </div>
      </div>
    </section>
  );
}
