import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/contexts/lang-context";
import { SkipLink } from "@/components/skip-link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OLYMPUS — Multi-Agent Seller OS",
  description:
    "Enquanto você vive sua vida, sua loja na Amazon vende, otimiza e escala sozinha. Multi-Agent Seller OS with 10 autonomous AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-zinc-950 text-zinc-100 overflow-x-hidden antialiased`}
      >
        <LangProvider>
          <SkipLink />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
