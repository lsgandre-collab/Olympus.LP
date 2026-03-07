# Deploy OLYMPUS LP na Vercel

## Build local (já testado)

```bash
cd "c:\Users\carfi\Desktop\Andre\Olympus LP"
npm run build
```

✅ Build passou com sucesso.

---

## Deploy (precisa estar logado na Vercel)

**1. Login (uma vez)**  
No terminal:

```bash
vercel login
```

Abra o link no navegador e conclua o login.

**2. Deploy**

```bash
cd "c:\Users\carfi\Desktop\Andre\Olympus LP"
vercel --yes
```

O comando vai gerar um **link de preview**, por exemplo:  
**https://olympus-lp-xxxxx.vercel.app**

**3. Produção (opcional)**

Depois de validar o preview:

```bash
vercel --prod
```

O site de produção ficará em: **https://olympus-lp.vercel.app** (ou o domínio que a Vercel mostrar).

---

## Variáveis de ambiente (opcional)

Para a waitlist enviar e-mails via Resend, no dashboard da Vercel (Settings → Environment Variables) adicione:

- `RESEND_API_KEY`
- `WAITLIST_EMAIL`
- (Opcional) `RESEND_FROM_EMAIL`

Sem essas variáveis o site sobe normalmente; o formulário só não envia e-mail.
