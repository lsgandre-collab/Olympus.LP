"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/lang-context";

const LINKS = [
  { href: "/", labelPt: "Home", labelEn: "Home" },
  { href: "/#agentes", labelPt: "Agentes", labelEn: "Agents" },
  { href: "/#orquestrador", labelPt: "Orquestrador", labelEn: "Orchestrator" },
  { href: "/demo", labelPt: "Demo", labelEn: "Demo" },
  { href: "/#pacotes", labelPt: "Pacotes", labelEn: "Packages" },
  { href: "/#faq", labelPt: "FAQ", labelEn: "FAQ" },
  { href: "#waitlist", labelPt: "Waitlist", labelEn: "Waitlist" },
];

const QUOTES_PT = [
  { text: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", author: "Epicteto" },
  { text: "Não é o homem que tem pouco, mas o que deseja muito, que é pobre.", author: "Sêneca" },
  { text: "O tempo é o recurso mais escasso. Se não for gerenciado, nada mais pode ser.", author: "Peter Drucker" },
  { text: "O dinheiro é um bom servo, mas um mau mestre.", author: "Francis Bacon" },
  { text: "Quem controla o fluxo, controla o império.", author: "Provérbio Comercial" },
  { text: "A fortuna favorece a mente preparada.", author: "Louis Pasteur" },
  { text: "Automatize o previsível para que você possa se concentrar no extraordinário.", author: "Filosofia OLYMPUS" },
];

const QUOTES_EN = [
  { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
  { text: "It is not the man who has too little, but the man who craves more, that is poor.", author: "Seneca" },
  { text: "Time is the scarcest resource. Unless it is managed, nothing else can be.", author: "Peter Drucker" },
  { text: "Money is a good servant but a bad master.", author: "Francis Bacon" },
  { text: "He who controls the flow, controls the empire.", author: "Trade Proverb" },
  { text: "Fortune favors the prepared mind.", author: "Louis Pasteur" },
  { text: "Automate the predictable so you can focus on the extraordinary.", author: "OLYMPUS Philosophy" },
];

export function Footer() {
  const { t, lang } = useLang();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = lang === "pt" ? QUOTES_PT : QUOTES_EN;

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
  }, [quotes.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const quote = quotes[quoteIndex];

  return (
    <footer className="border-t border-zinc-800/30 bg-zinc-950 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Philosophical Quote */}
        <div className="mb-10 text-center transition-all duration-700">
          <p className="text-sm italic text-zinc-400 max-w-lg mx-auto leading-relaxed">
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className="mt-2 text-xs text-zinc-600">— {quote.author}</p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-sm font-semibold text-white">OLYMPUS — Multi-Agent Seller OS</p>
          <div className="flex flex-wrap gap-6 justify-center">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-400 transition hover:text-white">
                {t(link.labelPt, link.labelEn)}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800/60 pt-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/termos" className="text-xs text-zinc-500 transition hover:text-zinc-300">{t("Termos de Uso", "Terms of Service")}</Link>
              <Link href="/privacidade" className="text-xs text-zinc-500 transition hover:text-zinc-300">{t("Política de Privacidade", "Privacy Policy")}</Link>
              <Link href="/lgpd" className="text-xs text-zinc-500 transition hover:text-zinc-300">{t("LGPD", "LGPD")}</Link>
            </div>
            <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} OLYMPUS. {t("Todos os direitos reservados.", "All rights reserved.")}</p>
          </div>
          <p className="mt-3 text-center text-xs text-zinc-600">{t("Um produto", "A product by")} <span className="text-zinc-400 font-medium">TwelvePrime</span></p>
        </div>
      </div>
    </footer>
  );
}
