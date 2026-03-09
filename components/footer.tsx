"use client";

import Link from "next/link";
import { useLang } from "@/contexts/lang-context";

const LINKS = [
  { href: "/", labelPt: "Home", labelEn: "Home" },
  { href: "/#agentes", labelPt: "Agentes", labelEn: "Agents" },
  { href: "/#orquestrador", labelPt: "Orquestrador", labelEn: "Orchestrator" },
  { href: "/demo", labelPt: "Demo", labelEn: "Demo" },
  { href: "/#pacotes", labelPt: "Pacotes", labelEn: "Packages" },
  { href: "#waitlist", labelPt: "Waitlist", labelEn: "Waitlist" },
];

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-sm font-semibold text-white">OLYMPUS — {t("Multi-Agent Seller OS", "Multi-Agent Seller OS")}</p>
          <div className="flex flex-wrap gap-6 justify-center">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-zinc-400 transition hover:text-white">
                {t(link.labelPt, link.labelEn)}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} OLYMPUS. {t("Todos os direitos reservados.", "All rights reserved.")}</p>
          <p className="text-xs text-zinc-600">{t("Um produto", "A product by")} <span className="text-zinc-400 font-medium">TwelvePrime</span></p>
        </div>
      </div>
    </footer>
  );
}
