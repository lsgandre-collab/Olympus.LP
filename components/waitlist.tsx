"use client";

import { useActionState, useEffect, useState } from "react";
import { useLang } from "@/contexts/lang-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initialState: WaitlistState = {};
const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1!%20Tenho%20interesse%20na%20waitlist%20OLYMPUS.";

export function Waitlist() {
  const { t, lang } = useLang();
  const [state, formAction, isPending] = useActionState(submitWaitlist, initialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state?.success) setSubmitted(true);
  }, [state?.success]);

  if (submitted) {
    return (
      <section id="waitlist" className="section-padding border-t border-zinc-800/80">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{t("Obrigado!", "Thank you!")}</h2>
          <p className="mt-6 text-lg text-zinc-400">{t("Sua vaga na waitlist foi reservada. Em breve entraremos em contato.", "Your spot on the waitlist is reserved. We'll be in touch soon.")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="section-padding border-t border-zinc-800/80">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-red-400">{t("Apenas vagas limitadas na primeira leva.", "Limited spots in the first wave only.")}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white mt-4 md:text-4xl">{t("Garanta sua vaga", "Secure your spot")}</h2>
          <p className="mt-4 text-zinc-400">{t("Prioridade, demo exclusiva e lançamento antecipado.", "Priority, exclusive demo and early launch.")}</p>
        </div>
        <form action={formAction} className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-10">
          <input type="hidden" name="lang" value={lang} />
          {state?.error && <p className="text-red-400 text-sm font-medium">{state.error}</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">{t("Nome", "Name")} *</label>
              <Input id="name" name="name" required placeholder={t("Seu nome", "Your name")} className="border-zinc-700 bg-zinc-800/50 placeholder:text-zinc-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">{t("E-mail", "Email")} *</label>
              <Input id="email" name="email" type="email" required placeholder="email@exemplo.com" className="border-zinc-700 bg-zinc-800/50 placeholder:text-zinc-500" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">{t("Telefone", "Phone")}</label>
              <Input id="phone" name="phone" type="tel" placeholder={t("+55 (11) 99999-9999", "+1 (555) 000-0000")} className="border-zinc-700 bg-zinc-800/50 placeholder:text-zinc-500" />
            </div>
            <div>
              <label htmlFor="revenue_total" className="block text-sm font-medium text-zinc-300 mb-2">{t("Faturamento Total", "Total Revenue")}</label>
              <Input id="revenue_total" name="revenue_total" placeholder={t("Ex: R$ 500.000", "e.g. $500,000")} className="border-zinc-700 bg-zinc-800/50 placeholder:text-zinc-500" />
            </div>
          </div>
          <div>
            <label htmlFor="revenue_monthly" className="block text-sm font-medium text-zinc-300 mb-2">{t("Faturamento Mensal na Amazon", "Monthly Amazon Revenue")}</label>
            <Input id="revenue_monthly" name="revenue_monthly" placeholder={t("Ex: R$ 50.000/mês", "e.g. $50,000/mo")} className="border-zinc-700 bg-zinc-800/50 placeholder:text-zinc-500" />
          </div>
          <div>
            <label htmlFor="growth_blocker" className="block text-sm font-medium text-zinc-300 mb-2">{t("O que falta para você crescer na Amazon?", "What's stopping you from growing on Amazon?")}</label>
            <Textarea id="growth_blocker" name="growth_blocker" placeholder={t("Conte brevemente...", "Briefly tell us...")} rows={3} className="border-zinc-700 bg-zinc-800/50 min-h-[100px] placeholder:text-zinc-500" />
          </div>
          <Button type="submit" className="w-full rounded-xl bg-red-600 font-display font-semibold text-white hover:bg-red-700 md:w-auto md:px-8 md:py-3 shadow-lg shadow-red-900/20" disabled={isPending}>
            {isPending ? t("Enviando...", "Sending...") : t("Reservar Minha Vaga →", "Reserve My Spot →")}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-500">{t("Quanto antes você entrar, mais cedo sua loja roda sozinha.", "The sooner you join, the sooner your store runs on its own.")}</p>
        <div className="mt-8 text-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:underline">
            {t("Preferir contato por WhatsApp?", "Prefer to be contacted via WhatsApp?")}
          </a>
        </div>
      </div>
    </section>
  );
}
