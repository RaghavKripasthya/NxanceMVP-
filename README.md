# Nxance MVP Web

Next.js 16 + TypeScript + Tailwind dashboard for **Nxance Premium Wealth** — marketing site, auth flow, Health Check, Construction, Portfolio, and Nxance AI.

## Stack

- Next.js App Router (`16.3.3`)
- React 19 + TypeScript
- Tailwind CSS 4

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing |
| `/login` | Sign in |
| `/dashboard` | Main dashboard |
| `/dashboard/portfolio` | Combined Health Check + Construction portfolio |
| `/dashboard/health-check` | Health Check flow |
| `/dashboard/construction` | Construction questionnaire |
| `/dashboard/nxance-ai` | Nxance LM chat |

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Deploy to GitHub + Vercel

### 1. Push to GitHub

1. Create a new empty repository on [GitHub](https://github.com/new) (no README).
2. In this project folder, run:

```bash
git add .
git commit -m "Ship Nxance MVP web app"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `npm run build`
5. Output: default (no change needed)
6. Click **Deploy**

Every push to `main` will auto-redeploy.

## Notes

- Client-only unlock flags and recent activity use `localStorage` (demo MVP).
- No backend/env secrets required for the current static MVP.
