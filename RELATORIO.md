# Relatório — Landing Page OLYMPUS

**Projeto:** OLYMPUS — Multi-Agent Seller OS (Landing Page)  
**Stack:** Next.js 15 (App Router), Tailwind CSS, React Three Fiber, shadcn/ui, Resend

---

## 1. O que foi feito

### 1.1 Migração e estrutura

- **Next.js 15** com App Router a partir do HTML estático original.
- **Tailwind CSS** com tema escuro (God-of-War), variáveis em `app/globals.css` e `darkMode: ["class"]`.
- **Componentes tipo shadcn/ui:** Button, Input, Textarea, Card em `components/ui/`.
- **React Three Fiber + Three.js** para a cena 3D do hero (orbe central + 6 orbes orbitando), carregada com `dynamic(..., { ssr: false })` e Error Boundary.

### 1.2 Conteúdo e funcionalidades

- **Bilíngue (PT/EN):** contexto `LangProvider`, função `t(pt, en)`, botão EN/PT na nav. Atributo `document.documentElement.lang` atualizado ao trocar idioma.
- **Tema claro/escuro:** toggle na nav; classe `.dark` no `<html>`; preferência salva em `localStorage`.
- **Logo OLYMPUS:** componente SVG em `components/olympus-logo.tsx` (Cinzel, dourado, glow vermelho) e arquivo `public/olympus-logo.svg`. IDs únicos com `useId()` para evitar duplicação.
- **Seções:** Nav, Hero (com 3D), Benefits, Agents, Waitlist (formulário com Server Action).

### 1.3 Formulário de waitlist

- **Campos:** Nome, E-mail, “Por que você vende na Amazon?” (opcional).
- **Server Action** em `app/actions/waitlist.ts`: validação, mensagens de erro em PT ou EN (conforme campo oculto `lang`), e:
  - **Com env:** envio de e-mail via **Resend** (`RESEND_API_KEY` + `WAITLIST_EMAIL`).
  - **Sem env:** apenas `console.log` no servidor; usuário vê mensagem de sucesso.
- Conteúdo do e-mail escapado com `escapeHtml()` para evitar injection.

### 1.4 Acessibilidade e compatibilidade

- **Skip link:** “Pular para o conteúdo” / “Skip to content” (bilíngue), oculto até o foco (Tab). Classe `.skip-link` em `app/globals.css`. `<main id="main-content" tabIndex={-1}>` em `app/page.tsx`.
- **Quirks Mode:** custom server `server.js` que garante `<!DOCTYPE html>` no início da resposta HTML.
- **Correção no server.js:** chamada `originalWrite(DOCTYPE_BYTES)` sem passar `encoding` como segundo argumento (evita perda de callback quando o chunk é Buffer).

### 1.5 Ajustes e documentação

- **Metadata:** descrição bilíngue em `app/layout.tsx` para SEO.
- **Arquivo `.env.example`** com `RESEND_API_KEY`, `WAITLIST_EMAIL` e `RESEND_FROM_EMAIL` (opcional).
- **README.md** com setup, execução, waitlist (Resend), skip link e estrutura do projeto.
- **Dependência `resend`** adicionada em `package.json`; envio ativado automaticamente quando as variáveis estão definidas.

---

## 2. O que precisa ser feito para o funcionamento correto

### 2.1 Obrigatório para rodar o site

| Passo | Ação |
|-------|------|
| 1 | Instalar dependências: `npm install` |
| 2 | Subir o servidor: `npm run dev` (usa `server.js`) ou `npm run dev:next` (Next puro) |
| 3 | Abrir no navegador: **http://localhost:3000** (ou http://127.0.0.1:3000) |

Sem isso a landing não “sobe” localmente.

### 2.2 Opcional: receber inscrições da waitlist por e-mail

| Passo | Ação |
|-------|------|
| 1 | Copiar `.env.example` para `.env`: `cp .env.example .env` (ou criar `.env` manualmente) |
| 2 | Criar conta em [resend.com](https://resend.com) e gerar uma API key |
| 3 | No `.env`, preencher: `RESEND_API_KEY=sua_chave` e `WAITLIST_EMAIL=email@onde.receber` |
| 4 | (Opcional) Para “De” customizado: verificar domínio no Resend e definir `RESEND_FROM_EMAIL=waitlist@seudominio.com` |

Sem essas variáveis o formulário continua funcionando (validação, mensagem de sucesso), mas as inscrições só aparecem no log do servidor.

### 2.3 Produção (deploy)

| Item | Recomendação |
|------|----------------|
| **Build** | `npm run build` |
| **Start** | `npm run start` (usa `server.js`) ou `npm run start:next` |
| **Variáveis de ambiente** | Definir `RESEND_API_KEY` e `WAITLIST_EMAIL` no painel da plataforma (Vercel, etc.) |
| **Next.js** | Verificar avisos de segurança (ex.: CVE) e atualizar para versão patchada se necessário |

### 2.4 Não implementado (melhorias futuras)

- **Persistência em banco:** inscrições só em log ou e-mail; não há banco de dados.
- **Google Forms / Typeform:** não há embed; pode substituir o bloco do formulário por iframe/link se quiser.
- **Favicon:** usar `public/olympus-logo.svg` ou gerar ícone a partir dele (ex.: em `app/icon.svg` ou via ferramentas).
- **Analytics / cookie banner:** não incluído; adicionar conforme necessidade e LGPD.

---

## 3. Resumo rápido

- **Já feito:** site Next.js 15, tema dark, PT/EN, tema claro/escuro, logo, hero 3D, benefits, agents, waitlist com validação e envio por e-mail (Resend opcional), skip link, DOCTYPE, documentação e `.env.example`.
- **Para funcionar:** `npm install` → `npm run dev` → abrir http://localhost:3000.
- **Para receber e-mails da waitlist:** criar `.env` com `RESEND_API_KEY` e `WAITLIST_EMAIL` (e opcionalmente `RESEND_FROM_EMAIL`).
