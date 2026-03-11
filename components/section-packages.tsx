"use client";

import Link from "next/link";
import { useLang } from "@/contexts/lang-context";

const PACKAGES = [
  {
    name: "Semi-Deus",
    subtitle: "A força para começar",
    subtitleEn: "The strength to begin",
    color: "#cd7f32",
    descPt: "A força para começar. Ideal para sellers em crescimento.",
    descEn: "The strength to begin. Ideal for growing sellers.",
    pricePt: "Sob consulta",
    priceEn: "On request",
    featuresPt: ["Até 500 SKUs", "5 agentes ativos", "Dashboard básico", "Relatórios semanais", "Suporte por e-mail", "Modo recomendação"],
    featuresEn: ["Up to 500 SKUs", "5 active agents", "Basic dashboard", "Weekly reports", "Email support", "Recommendation mode"],
  },
  {
    name: "Mitológico",
    subtitle: "Sabedoria que domina",
    subtitleEn: "Wisdom that dominates",
    color: "#c0c0c0",
    descPt: "Sabedoria estratégica. O plano mais escolhido.",
    descEn: "Strategic wisdom. The most chosen plan.",
    pricePt: "Sob consulta",
    priceEn: "On request",
    highlight: true,
    featuresPt: ["Até 2.000 SKUs", "10 agentes ativos", "Dashboard completo", "Orquestrador WhatsApp + Telegram", "Relatórios diários", "Suporte prioritário", "Automação parcial com aprovação"],
    featuresEn: ["Up to 2,000 SKUs", "10 active agents", "Full dashboard", "Orchestrator WhatsApp + Telegram", "Daily reports", "Priority support", "Partial automation with approval"],
  },
  {
    name: "Titã",
    subtitle: "Poder absoluto",
    subtitleEn: "Absolute power",
    color: "#eab308",
    descPt: "Poder absoluto. Para quem domina o marketplace.",
    descEn: "Absolute power. For those who dominate the marketplace.",
    pricePt: "Sob consulta",
    priceEn: "On request",
    featuresPt: ["SKUs ilimitados", "10 agentes + customizados", "Dashboard + API", "Orquestrador multicanal", "Relatórios em tempo real", "Automação total com guardrails", "Onboarding dedicado"],
    featuresEn: ["Unlimited SKUs", "10 agents + custom", "Dashboard + API", "Multi-channel orchestrator", "Real-time reports", "Full automation with guardrails", "Dedicated onboarding"],
  },
];

export function SectionPackages() {
  const { t, lang } = useLang();
  const ft = (pt: string[], en: string[]) => lang === "en" ? en : pt;
  return (
    <section id="pacotes" className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{t("Pacotes", "Packages")}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-zinc-400 text-lg">{t("Escolha o plano ideal para o tamanho da sua operação.", "Choose the ideal plan for the size of your operation.")}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl border p-8 flex flex-col relative overflow-hidden ${pkg.highlight ? "border-yellow-500/50 bg-zinc-900/80 ring-1 ring-yellow-500/20" : "border-zinc-800 bg-zinc-900/50"}`}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl" style={{ backgroundColor: pkg.color }} />
              <div className="flex items-center gap-3 mb-2 pl-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: pkg.color, boxShadow: `0 0 20px ${pkg.color}40` }}>
                  <span className="text-white font-bold text-sm">Ω</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs font-medium" style={{ color: pkg.color }}>{t(pkg.subtitle, pkg.subtitleEn)}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-500 mb-4 pl-2">{t(pkg.descPt, pkg.descEn)}</p>
              {pkg.highlight && (
                <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wider text-yellow-400 pl-2">{t("Mais popular", "Most popular")}</span>
              )}
              <p className="font-display text-xl font-bold text-zinc-300 mb-6 pl-2">{t(pkg.pricePt, pkg.priceEn)}</p>
              <ul className="space-y-3 flex-1 mb-8 pl-2">
                {ft(pkg.featuresPt, pkg.featuresEn).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-0.5" style={{ color: pkg.color }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="#waitlist" className={`block text-center rounded-xl px-6 py-3 font-display text-sm font-semibold transition ${pkg.highlight ? "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/30" : "border-2 border-zinc-700 text-white hover:bg-zinc-800"}`}>
                {t("Entrar na Waitlist", "Join Waitlist")}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="inline-block bg-teal-500/10 border border-teal-500/30 rounded-lg px-4 py-2 mb-4">
            <p className="text-sm text-teal-400 font-medium">{t("Pague de acordo com o seu tamanho. Cobramos de acordo com o faturamento e uso real da ferramenta — sem surpresas.", "Pay according to your size. We charge based on revenue and actual tool usage — no surprises.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
