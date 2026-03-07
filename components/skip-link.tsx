"use client";

import { useLang } from "@/contexts/lang-context";

export function SkipLink() {
  const { t } = useLang();
  return (
    <a href="#main-content" className="skip-link">
      {t("Pular para o conteúdo", "Skip to content")}
    </a>
  );
}
