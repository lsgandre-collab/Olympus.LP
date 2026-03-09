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
    "Enquanto você vive sua vida, sua loja na Amazon vende, otimiza e escala sozinha. 10 agentes autônomos de IA gerenciam preços, ads, estoque e listings 24/7.",
  keywords: ["Amazon Seller", "IA", "automação", "marketplace", "multi-agent", "seller OS", "OLYMPUS"],
  authors: [{ name: "TwelvePrime" }],
  openGraph: {
    title: "OLYMPUS — Multi-Agent Seller OS",
    description: "10 agentes autônomos de IA gerenciam sua loja na Amazon 24/7. Preços, ads, estoque e listings — tudo no automático.",
    url: "https://olympuslp.vercel.app",
    siteName: "OLYMPUS",
    images: [
      {
        url: "https://olympuslp.vercel.app/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "OLYMPUS — Multi-Agent Seller OS Dashboard",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OLYMPUS — Multi-Agent Seller OS",
    description: "10 agentes autônomos de IA gerenciam sua loja na Amazon 24/7.",
    images: ["https://olympuslp.vercel.app/images/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
