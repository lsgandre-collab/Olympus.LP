"use client";

import { useActionState, useEffect, useState } from "react";
import { useLang } from "@/contexts/lang-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initialState: WaitlistState = {};

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
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("Obrigado!", "Thank you!")}
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            {t(
              "Sua vaga na waitlist foi reservada. Em breve entraremos em contato.",
              "Your spot on the waitlist is reserved. We'll be in touch soon."
            )}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="section-padding border-t border-zinc-800/80 bg-zinc-900/30">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t(
              "Não perca sua vaga na revolução dos sellers autônomos",
              "Don't miss your spot in the autonomous sellers revolution"
            )}
          </h2>
          <p className="mt-4 text-zinc-400">
            {t(
              "Entre na waitlist para prioridade, demo exclusiva e lançamento antecipado.",
              "Join the waitlist for priority, exclusive demo and early launch."
            )}
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-10"
        >
          <input type="hidden" name="lang" value={lang} />
          {state?.error && (
            <p className="text-red-400 text-sm font-medium">{state.error}</p>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              {t("Nome", "Name")} *
            </label>
            <Input
              id="name"
              name="name"
              required
              placeholder={t("Seu nome", "Your name")}
              className="border-zinc-700 bg-zinc-800/50 placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              {t("E-mail", "Email")} *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="email@exemplo.com"
              className="border-zinc-700 bg-zinc-800/50 placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label htmlFor="why_amazon" className="block text-sm font-medium text-zinc-300 mb-2">
              {t("Por que você vende na Amazon?", "Why do you sell on Amazon?")}
            </label>
            <Textarea
              id="why_amazon"
              name="why_amazon"
              placeholder={t(
                "Conte brevemente seu objetivo ou experiência como seller...",
                "Briefly tell us your goal or experience as a seller..."
              )}
              rows={4}
              className="border-zinc-700 bg-zinc-800/50 min-h-[120px] placeholder:text-zinc-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl bg-white font-display font-semibold text-zinc-950 hover:bg-zinc-200 md:w-auto md:px-8 md:py-3"
            disabled={isPending}
          >
            {isPending
              ? t("Enviando...", "Sending...")
              : t("Reservar Minha Vaga →", "Reserve My Spot →")}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          {t(
            "Quanto antes você entrar, mais cedo sua loja começa a rodar sozinha.",
            "The sooner you join, the sooner your store runs on its own."
          )}
        </p>
      </div>
    </section>
  );
}
