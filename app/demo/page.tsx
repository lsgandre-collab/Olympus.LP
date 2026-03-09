"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { DashboardTilt } from "@/components/dashboard-tilt";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";
import { useLang } from "@/contexts/lang-context";

export default function DemoPage() {
  const { t } = useLang();
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen pt-24 pb-0">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <Link href="/" className="inline-flex rounded-xl border-2 border-zinc-700 bg-transparent px-6 py-3 font-display text-sm font-semibold text-white transition hover:bg-zinc-800">
              ← {t("Voltar para Home", "Back to Home")}
            </Link>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-center md:text-5xl text-white">
            {t("Dashboard OLYMPUS", "OLYMPUS Dashboard")}
          </h1>
          <p className="mt-4 text-center text-zinc-400 max-w-xl mx-auto">
            {t("Tudo que seus agentes fazem, em uma tela. Métricas, decisões e resultados ao vivo.", "Everything your agents do, on one screen. Metrics, decisions and results live.")}
          </p>
          <div className="mt-12 mx-auto max-w-5xl rounded-2xl overflow-hidden ring-1 ring-zinc-800 shadow-2xl" style={{ boxShadow: "0 0 80px -20px rgba(234,179,8,0.12)" }}>
            <DashboardTilt />
          </div>
          <p className="mt-8 text-center text-zinc-500 text-sm">
            {t("Screenshot real do dashboard com agentes conectados.", "Real screenshot of the dashboard with connected agents.")}
          </p>
        </div>
        <Waitlist />
        <Footer />
      </main>
    </>
  );
}
