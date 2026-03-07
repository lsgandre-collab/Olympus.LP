"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OlympusLogo } from "@/components/olympus-logo";
import { useLang } from "@/contexts/lang-context";
import { Sun, Moon } from "lucide-react";

export function Nav() {
  const { lang, setLang, t } = useLang();

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center min-w-0">
          <OlympusLogo size="md" showSymbol />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="border-white/40 rounded-xl px-4 py-2"
          >
            {lang.toUpperCase()}
          </Button>
          <Button asChild size="default" className="rounded-2xl">
            <Link href="#waitlist">
              {t("Entrar na Waitlist", "Join Waitlist")}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem("theme")) as "dark" | "light" | null;
    const initial = stored ?? (isDark ? "dark" : "light");
    setTheme(initial);
    if (initial === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", next);
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="p-2 rounded-xl hover:bg-white/10 transition-colors text-xl"
        aria-label="Toggle theme"
      >
        <Sun className="size-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-xl hover:bg-white/10 transition-colors text-xl"
      aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
