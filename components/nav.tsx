"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OlympusLogo } from "@/components/olympus-logo";
import { useLang } from "@/contexts/lang-context";

const NAV_LINKS = [
  { href: "/#agentes", labelPt: "Agentes", labelEn: "Agents" },
  { href: "/#orquestrador", labelPt: "Orquestrador", labelEn: "Orchestrator" },
  { href: "/demo", labelPt: "Demo", labelEn: "Demo" },
  { href: "/#pacotes", labelPt: "Pacotes", labelEn: "Packages" },
  { href: "/#faq", labelPt: "FAQ", labelEn: "FAQ" },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center min-w-0">
          <OlympusLogo size="sm" showSymbol />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-zinc-400 hover:text-white transition font-medium">
              {t(link.labelPt, link.labelEn)}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={() => setLang(lang === "pt" ? "en" : "pt")} className="border-zinc-700 rounded-xl px-3 py-2 text-xs">
            {lang.toUpperCase()}
          </Button>
          <Button asChild size="default" className="rounded-2xl bg-red-600 hover:bg-red-700 text-white hidden sm:inline-flex">
            <Link href="#waitlist">{t("Waitlist", "Waitlist")}</Link>
          </Button>
          <button type="button" className="md:hidden text-zinc-400 hover:text-white" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-zinc-800/60 bg-zinc-950/95 px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block text-sm text-zinc-400 hover:text-white transition font-medium py-1" onClick={() => setOpen(false)}>
              {t(link.labelPt, link.labelEn)}
            </Link>
          ))}
          <Link href="#waitlist" className="block text-sm text-red-400 font-semibold py-1" onClick={() => setOpen(false)}>
            {t("Entrar na Waitlist", "Join Waitlist")}
          </Link>
        </div>
      )}
    </nav>
  );
}
