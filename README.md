# P2M Express

Site da P2M Express — compras em Portugal com entrega em Moçambique.

## Estrutura do projeto

```
p2mexpress/
├── package.json          # Raiz — scripts e dependências
├── vercel.json           # Deploy Vercel (SPA + API serverless)
├── client/               # Frontend React + Vite
│   ├── public/           # Favicon e assets estáticos
│   └── src/              # Código da aplicação
├── server/               # Express (desenvolvimento local)
├── api/                  # Rotas serverless Vercel (/api/*)
├── shared/               # Dados e config partilhados
└── attached_assets/      # Logótipos (importados pelo Vite)
```

## Requisitos

- Node.js 18+

## Instalação

```bash
npm install
```

## Desenvolvimento local

Servidor completo (API Express + Vite com hot reload):

```bash
npm run dev
```

Abrir: **http://localhost:3000**

Apenas frontend (com proxy API para porta 3000):

```bash
npm run dev:client
```

## Produção

### Build (Vercel e preview estático)

```bash
npm run build
```

Saída: `dist/public/`

### Preview local do build

```bash
npm run preview
```

Abrir: **http://localhost:4173**

### Servidor Node (opcional, hosting tradicional)

```bash
npm run build:server
npm start
```

## Deploy na Vercel

1. Importar o repositório na Vercel
2. Framework: **Other**
3. Build Command: `npm run build`
4. Output Directory: `dist/public`
5. As rotas `/api/*` são servidas pelas funções em `api/`

Variáveis opcionais: ver `.env.example`

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Dev fullstack (Express + Vite) |
| `npm run dev:client` | Só Vite |
| `npm run build` | Build frontend para produção |
| `npm run build:server` | Build frontend + bundle Express |
| `npm run preview` | Preview do build Vite |
| `npm start` | Servidor produção (após `build:server`) |
| `npm run check` | Verificação TypeScript |
