"use server";

export type WaitlistState = {
  success?: boolean;
  error?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitWaitlist(prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const revenueTotal = formData.get("revenue_total") as string | null;
  const revenueMonthly = formData.get("revenue_monthly") as string | null;
  const growthBlocker = formData.get("growth_blocker") as string | null;
  const lang = (formData.get("lang") as string | null) || "pt";
  const isEn = lang === "en";

  const errors = {
    nameRequired: isEn ? "Name is required." : "Nome é obrigatório.",
    emailRequired: isEn ? "Email is required." : "E-mail é obrigatório.",
    emailInvalid: isEn ? "Invalid email." : "E-mail inválido.",
    generic: isEn ? "Something went wrong. Please try again." : "Algo deu errado. Tente novamente.",
  };

  if (!name?.trim()) {
    return { error: errors.nameRequired };
  }
  if (!email?.trim()) {
    return { error: errors.emailRequired };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: errors.emailInvalid };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.WAITLIST_EMAIL;

    if (apiKey && toEmail) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: `[Olympus Waitlist] ${escapeHtml(name.trim())}`,
          html: [
            `<p><strong>Nome / Name:</strong> ${escapeHtml(name.trim())}</p>`,
            `<p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>`,
            `<p><strong>Telefone / Phone:</strong> ${escapeHtml((phone ?? "").trim() || "-")}</p>`,
            `<p><strong>Faturamento Total / Total Revenue:</strong> ${escapeHtml((revenueTotal ?? "").trim() || "-")}</p>`,
            `<p><strong>Faturamento Mensal / Monthly Revenue:</strong> ${escapeHtml((revenueMonthly ?? "").trim() || "-")}</p>`,
            `<p><strong>O que falta para crescer / Growth blocker:</strong></p>`,
            `<p>${escapeHtml((growthBlocker ?? "").trim() || "-")}</p>`,
          ].join(""),
        });
      } catch (resendError) {
        console.error("Resend send failed (signup still recorded):", resendError);
      }
    } else {
      console.log("Waitlist signup (set RESEND_API_KEY + WAITLIST_EMAIL to receive emails):", {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() ?? "",
        revenueTotal: revenueTotal?.trim() ?? "",
        revenueMonthly: revenueMonthly?.trim() ?? "",
        growthBlocker: growthBlocker?.trim() ?? "",
      });
    }

    return { success: true };
  } catch (e) {
    console.error("Waitlist submit error:", e);
    return { error: errors.generic };
  }
}
