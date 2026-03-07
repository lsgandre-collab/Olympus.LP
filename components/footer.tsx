"use client";

import Link from "next/link";
import { useLang } from "@/contexts/lang-context";

const DEMO_URL = "https://web-production-8d263.up.railway.app/";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-sm font-semibold text-white">
            OLYMPUS — {t("Multi-Agent Seller OS", "Multi-Agent Seller OS")}
          </p>
          <div className="flex gap-8">
            <Link
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {t("Ver Demo", "View Demo")}
            </Link>
            <Link
              href="#waitlist"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {t("Waitlist", "Waitlist")}
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} OLYMPUS. {t("Todos os direitos reservados.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
}
