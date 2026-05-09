# WorkLifeLM — Frontend

Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript 5 (strict).

This is the user-facing Command Center for WorkLifeLM. It talks to the FastAPI backend at `/api/*` (proxied by Caddy in production, called directly in dev when both servers are running locally).

## Pages

| Route | Auth | Purpose |
|---|---|---|
| `/` | ✅ client redirect | Dashboard — 3 modes (Build / Operate / Analyze), live stats, swarm chat |
| `/login` | ❌ | Sign in / Register |
| `/profile` | ✅ | Edit profile, change password, manage subscription |
| `/pricing` | ❌ | Tier comparison + Stripe Checkout |
| `/outputs` | ✅ | 8 output generators + saved-output library (archive / download) |

## Develop

```bash
npm install
npm run dev
# → http://localhost:3000
```

The dashboard expects the backend at `http://localhost:8000`. Easiest path is to run Caddy locally with the production `Caddyfile`, or proxy `/api` to `:8000` in `next.config.ts` for dev.

## Build

```bash
npm run build
npm run start  # production server on :3000 (or :3001 in prod)
```

## Lint

```bash
npm run lint
```

ESLint uses the new flat config (`eslint.config.mjs`) with `eslint-config-next`.

## Notes

- Tailwind v4 — no `tailwind.config.ts`. Configuration lives in `src/app/globals.css` via `@import "tailwindcss"`. PostCSS plugin is wired up in `postcss.config.mjs`.
- Auth is JWT in `localStorage` under the key `wlm_token`, with the user object under `wlm_user`. Pages enforce auth client-side via `useEffect`.
- See the root [`COMPONENTS.md`](../COMPONENTS.md) for the full module inventory and [`TROUBLESHOOT.md`](../TROUBLESHOOT.md) for deploy issues.
