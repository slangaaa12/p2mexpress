# P2M Express

Compras de Portugal para Moçambique — site e API.

## Estrutura do projeto

```
p2mexpress/
├── package.json              # Raiz — dependências e scripts
├── vercel.json               # Deploy Vercel
├── vite.config.ts            # Build frontend
├── tsconfig.json             # TypeScript (monorepo-style paths)
│
├── client/                   # Frontend React
│   ├── index.html
│   ├── public/               # Favicon e ficheiros estáticos (/favicon.png)
│   └── src/
│       ├── main.tsx          # Entrada
│       ├── App.tsx
│       ├── assets/           # Imagens (logos) — import via @/assets/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       │   ├── queryClient.ts
│       │   ├── order.ts
│       │   └── utils.ts
│       └── pages/
│           └── home.tsx
│
├── server/                   # Express (desenvolvimento local)
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   ├── static.ts
│   ├── vite.ts
│   └── envConfig.ts
│
├── api/                      # Serverless Vercel (/api/*)
│   ├── config.ts
│   ├── stores.ts
│   ├── contact.ts
│   └── ...
│
└── shared/                   # Dados e tipos partilhados
    ├── schema.ts
    ├── catalog.ts
    └── config.ts
```

## Requisitos

- Node.js 18+

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abrir: **http://localhost:3000**

## Build de produção

```bash
npm run build
```

Saída:

| Caminho | Uso |
|---------|-----|
| `dist/public/` | Frontend estático (HTML, JS, CSS, imagens) |
| `dist/index.cjs` | Servidor Express — `npm start` |

## Produção local (servidor completo)

```bash
npm run build
PORT=3000 npm start
```

Abrir: **http://localhost:3000** (API + site)

## Preview local (só frontend, sem API)

```bash
npm run build:client
npm run preview
```

Abrir: **http://localhost:4173**

## Deploy Railway

| Campo | Valor |
|-------|--------|
| Build Command | `npm run build` |
| Start Command | `npm start` |

O Railway define `PORT` automaticamente. O servidor escuta em `0.0.0.0` e serve `dist/public/` + rotas `/api/*`.

Ficheiro `railway.json` incluído com estes comandos.

## Deploy Vercel

| Campo | Valor |
|-------|--------|
| Build Command | `npm run build` |
| Output Directory | `dist/public` |
| Install Command | `npm install` |

Rotas `/api/*` são servidas automaticamente pela pasta `api/`.

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Express + Vite (porta 3000) |
| `npm run build` | Cliente Vite + servidor → `dist/public` + `dist/index.cjs` |
| `npm run build:client` | Só frontend Vite |
| `npm run build:server` | Só bundle Express → `dist/index.cjs` |
| `npm run start` | Servidor produção (`dist/index.cjs`) |
| `npm run preview` | Vite preview (só estáticos) |
| `npm run check` | `tsc` sem emit |

## Variáveis de ambiente

Ver `.env.example`
