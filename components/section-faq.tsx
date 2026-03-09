"use client";

import { useState } from "react";
import { useLang } from "@/contexts/lang-context";

const FAQS = [
  {
    qPt: "Preciso de cartão de crédito para entrar na waitlist?",
    qEn: "Do I need a credit card to join the waitlist?",
    aPt: "Não. A waitlist é gratuita e sem compromisso. Você será notificado quando sua vaga estiver disponível.",
    aEn: "No. The waitlist is free and with no commitment. You'll be notified when your spot is available.",
  },
  {
    qPt: "Quanto tempo leva para configurar o OLYMPUS na minha conta?",
    qEn: "How long does it take to set up OLYMPUS on my account?",
    aPt: "A integração inicial com o Seller Central leva menos de 10 minutos. Os agentes começam a analisar seus dados imediatamente após a conexão.",
    aEn: "The initial integration with Seller Central takes less than 10 minutes. Agents start analyzing your data immediately after connection.",
  },
  {
    qPt: "Funciona com Amazon de outros países além do Brasil?",
    qEn: "Does it work with Amazon in countries other than Brazil?",
    aPt: "Atualmente o OLYMPUS é otimizado para Amazon Brasil. O suporte para Amazon US, MX e outros marketplaces está no roadmap para 2026.",
    aEn: "Currently OLYMPUS is optimized for Amazon Brazil. Support for Amazon US, MX and other marketplaces is on the 2026 roadmap.",
  },
  {
    qPt: "Os agentes fazem alterações automáticas na minha conta?",
    qEn: "Do agents make automatic changes to my account?",
    aPt: "Por padrão, os agentes operam em modo de recomendação — sugerem ações e você aprova. No plano Gold, você pode habilitar automação total com guardrails de segurança.",
    aEn: "By default, agents operate in recommendation mode — they suggest actions and you approve. On the Gold plan, you can enable full automation with safety guardrails.",
  },
  {
    qPt: "Meus dados estão seguros?",
    qEn: "Is my data secure?",
    aPt: "Sim. Utilizamos criptografia de ponta a ponta, servidores em conformidade com LGPD e não compartilhamos seus dados com terceiros. Seus dados pertencem a você.",
    aEn: "Yes. We use end-to-end encryption, LGPD-compliant servers, and never share your data with third parties. Your data belongs to you.",
  },
  {
    qPt: "Qual a diferença entre o OLYMPUS e outras ferramentas para sellers?",
    qEn: "What's the difference between OLYMPUS and other seller tools?",
    aPt: "Ferramentas tradicionais resolvem um problema de cada vez. O OLYMPUS é um sistema operacional completo com 10 agentes especializados que se comunicam entre si e tomam decisões coordenadas pelo Orquestrador central — como ter uma equipe inteira de especialistas trabalhando 24/7.",
    aEn: "Traditional tools solve one problem at a time. OLYMPUS is a complete operating system with 10 specialized agents that communicate with each other and make decisions coordinated by the central Orchestrator — like having an entire team of specialists working 24/7.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800/80">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-white group"
      >
        <span className="font-display text-base font-semibold text-zinc-200 group-hover:text-white pr-4">{q}</span>
        <svg
          className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"}`}
      >
        <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export function SectionFAQ() {
  const { t } = useLang();
  return (
    <section id="faq" className="py-20 md:py-28 border-t border-zinc-800/80">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t("Perguntas Frequentes", "Frequently Asked Questions")}
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            {t("Tudo o que você precisa saber antes de entrar.", "Everything you need to know before joining.")}
          </p>
        </div>
        <div>
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={t(faq.qPt, faq.qEn)} a={t(faq.aPt, faq.aEn)} />
          ))}
        </div>
      </div>
    </section>
  );
}
