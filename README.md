# OLYMPUS — Multi-Agent Seller OS (Landing Page)

Next.js 15 landing page with App Router, Tailwind CSS, React Three Fiber (3D hero), and shadcn-style UI. Dark God-of-War theme, PT/EN toggle, skip link (acessibilidade), and waitlist form com envio por e-mail (Resend).

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** + CSS variables (dark theme, `darkMode: "class"`)
- **React Three Fiber** + Three.js (hero 3D scene)
- **shadcn/ui**-style components (Button, Input, Textarea, Card)
- **Bilingual** PT/EN (context + `document.documentElement.lang`)
- **Resend** — envio de e-mails da waitlist (opcional)

## Setup e execução

```bash
npm install
cp .env.example .env
# Edite .env e preencha RESEND_API_KEY e WAITLIST_EMAIL para receber inscrições por e-mail (opcional).
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) ou [http://127.0.0.1:3000](http://127.0.0.1:3000).

- **Servidor padrão:** `npm run dev` usa **Next.js** (`next dev --turbopack`). Não usa custom server — compatível com App Router.
- **Custom server (opcional):** Se quiser o fix de DOCTYPE/Quirks Mode, use `npm run dev:custom-server` (usa `server.js`).
- **Sem Turbopack:** `npm run dev:no-turbopack` se der problema com Turbopack.
- **Porta em uso:** `set PORT=3001 && npm run dev` (Windows) e abra http://localhost:3001.
- **Acessibilidade:** Link "Pular para o conteúdo" (skip link); foco pelo teclado (Tab).

## Waitlist (formulário e e-mail)

O formulário em `#waitlist` envia via Server Action (`app/actions/waitlist.ts`).

- **Com variáveis de ambiente:** Se `RESEND_API_KEY` e `WAITLIST_EMAIL` estiverem definidos no `.env`, cada inscrição é enviada por e-mail (Resend). Crie conta em [resend.com](https://resend.com), gere a API key e defina no `.env`.
- **Sem variáveis:** As inscrições são apenas registradas no log do servidor (console). O usuário continua vendo a mensagem de sucesso.

Opcional no `.env`: `RESEND_FROM_EMAIL` (domínio verificado no Resend). Padrão: `onboarding@resend.dev`.

## Logo

- **Componente:** `components/olympus-logo.tsx` — SVG "OLYMPUS" (Cinzel, dourado, glow vermelho), símbolo opcional.
- **Arquivo:** `public/olympus-logo.svg` para favicon ou uso externo.

## Estrutura principal

- `app/layout.tsx` — fontes (Inter, Cinzel), `LangProvider`, `SkipLink`, tema dark
- `app/page.tsx` — Nav, Hero, Benefits, Agents, Waitlist; `<main id="main-content">` para o skip link
- `components/` — Nav, Hero, HeroScene (R3F), Benefits, Agents, Waitlist, OlympusLogo, SkipLink, `ui/`
- `contexts/lang-context.tsx` — `useLang()`, `t(pt, en)`, sync `document.documentElement.lang`
- `app/actions/waitlist.ts` — Server Action; envia e-mail via Resend quando env configurado
