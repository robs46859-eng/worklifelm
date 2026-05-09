# WorkLifeLM — Component & Dependency Inventory

_Last verified: 2026-05-09 against the live `main` branch._

## Repository
- **GitHub:** `https://github.com/robs46859-eng/worklifelm`
- **Local dev:** `/Users/robert/Desktop/worklifelm`
- **Production:** `/home/hermes/worklifelm` (Azure VM: 172.173.241.253, hostname `worklifelm.com`)

---

## Directory Structure

```
worklifelm/
├── README.md
├── TROUBLESHOOT.md
├── INTEGRATIONS_PLAN.md
├── COMPONENTS.md                ← This file
├── AGENTS.md                    ← Build-swarm role definitions
│
├── backend/
│   ├── main.py                  ← FastAPI app, all 44 endpoints
│   ├── auth.py                  ← JWT auth, user CRUD, rate limiting
│   ├── billing.py               ← Stripe checkout, webhooks, portal
│   ├── integrations.py          ← Saved outputs, collaborators, integration registry
│   ├── requirements.txt         ← Python deps (pinned)
│   ├── venv/                    ← (created on the VM, gitignored)
│   └── data/
│       ├── auth.db              ← SQLite (users, usage, integrations, outputs, collaborators)
│       └── chroma/              ← ChromaDB persistent vector storage
│
└── frontend/                    ← Next.js 16 + React 19 + Tailwind v4
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs       ← @tailwindcss/postcss (Tailwind v4 — no separate config file)
    ├── eslint.config.mjs        ← Flat config, eslint-config-next
    ├── AGENTS.md                ← Next 16 codegen rules
    ├── CLAUDE.md                ← @AGENTS.md
    └── src/app/
        ├── layout.tsx           ← Root layout (Geist fonts, dark shell)
        ├── globals.css          ← Tailwind import + dark body
        ├── page.tsx             ← Dashboard (Command Center, 367 lines)
        ├── login/page.tsx       ← Sign in / Register (106 lines)
        ├── profile/page.tsx     ← Profile, password change, subscription (159 lines)
        ├── pricing/page.tsx     ← Tier comparison + Stripe checkout (136 lines)
        └── outputs/page.tsx     ← 8 output generators + saved library (311 lines)
```

---

## Backend Components

### `main.py` — FastAPI Application (1,247 lines, 44 endpoints)

| Section | Lines | Purpose |
|---|---|---|
| Tier definitions | ~60–90 | Free / Professional / Max daily quotas |
| Model routing table | ~93–100 | Haiku 4.5 / Sonnet 4.6 / Opus 4.7 + per-1k cost |
| Anthropic client | ~135–230 | `call_anthropic()` + `stream_anthropic()` (raw httpx) |
| Health / Stats | ~241, 659 | Health check + dashboard stats |
| Auth endpoints | ~257–366 | Register, login, profile (GET/PUT), usage, change/reset password |
| Billing endpoints | ~367–426 | Stripe checkout, webhook, portal, public config |
| Brain ingest / query | ~428–469 | ChromaDB write + semantic search |
| Swarm router | ~470–548 | Classify → query brain → route to LLM |
| Decision tracking | ~549–579 | Track / list unresolved assumptions |
| GitHub webhook | ~581–641 | Auto-ingest push & PR events |
| Suggested prompts | ~642 | Pre-canned prompts |
| Output generators | ~703–905 | report, slides, mindmap, flashcards, quiz, audio-script, pitch |
| Operational agents | ~942–1064 | crm, billing, team, outreach, workflow |
| Video scaffold | ~1077 | Storyboard placeholder (coming soon) |
| Saved outputs | ~1116–1191 | save, list, download, archive, unarchive, delete |
| Collaborators | ~1193–1228 | Invite, list, remove (paid feature) |
| Integrations | ~1230–1244 | Available / connected provider list |

### Endpoint inventory (44)

**Core (3)** — `GET /api/health`, `GET /api/stats`, `GET /api/prompts/suggested`

**Auth (7)** — `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`, `PUT /api/auth/profile`, `GET /api/auth/usage`, `POST /api/auth/change-password`, `POST /api/auth/reset-password`

**Billing (4)** — `POST /api/billing/checkout`, `POST /api/billing/webhook`, `POST /api/billing/portal`, `GET /api/billing/config`

**Brain (3)** — `POST /api/ingest`, `GET /api/query`, `POST /api/webhooks/github`

**Swarm (1)** — `POST /api/swarm/route`

**Decisions (2)** — `POST /api/decisions/track`, `GET /api/decisions/list`

**Output generators (8)** — `POST /api/outputs/{report,slides,mindmap,flashcards,quiz,audio-script,pitch,video}`

**Operational agents (5)** — `POST /api/agents/{crm,billing,team,outreach,workflow}`

**Saved outputs (6)** — `POST /api/outputs/save`, `GET /api/outputs/list`, `GET /api/outputs/{id}/download`, `POST /api/outputs/{id}/archive`, `POST /api/outputs/{id}/unarchive`, `DELETE /api/outputs/{id}`

**Collaborators (3)** — `POST /api/collaborators/invite`, `GET /api/collaborators/{project_id}`, `DELETE /api/collaborators/{entry_id}`

**Integrations (2)** — `GET /api/integrations/available`, `GET /api/integrations/connected`

### `auth.py` — Authentication (271 lines)
| Function | Purpose |
|---|---|
| `init_auth_db()` | Create tables, seed admin |
| `create_user()` / `authenticate_user()` | Register + verify with bcrypt |
| `create_token()` / `decode_token()` | PyJWT 2.12+ encode/decode |
| `get_current_user()` | Extract user from `Authorization` header |
| `update_user_profile()` / `update_user_tier()` | Profile + subscription tier mutation |
| `change_password()` / `reset_password_by_email()` | Password lifecycle |
| `check_rate_limit()` / `record_usage()` / `get_usage_summary()` | Per-tier daily quotas + usage telemetry |

### `billing.py` — Stripe (86 lines)
| Function | Purpose |
|---|---|
| `create_checkout_session()` | Stripe Checkout for Pro / Max |
| `handle_webhook_event()` | Subscription lifecycle handler |
| `create_billing_portal()` | Customer self-service portal |

### `integrations.py` — Integrations & Data (210 lines)
| Function | Purpose |
|---|---|
| `init_integrations_db()` | Create `integrations`, `saved_outputs`, `collaborators` tables |
| `save_output()` / `get_user_outputs()` / `get_output_by_id()` | Persisted generated outputs |
| `archive_output()` / `unarchive_output()` | Soft-archive lifecycle |
| `invite_collaborator()` / `get_project_collaborators()` | Project sharing (paid) |
| `SUPPORTED_PROVIDERS` | Registry of integration providers |
| `OUTPUT_FORMATS` | File-type → MIME mapping for downloads |

---

## Frontend Pages

| Page | Route | Auth Required | Purpose |
|---|---|---|---|
| Dashboard | `/` | ✅ (client redirect) | Command Center: 3 modes, chat, live stats |
| Login | `/login` | ❌ | Sign in / Register |
| Profile | `/profile` | ✅ | Edit name/email, change password, manage subscription |
| Pricing | `/pricing` | ❌ | Tier comparison, Stripe checkout buttons |
| Outputs | `/outputs` | ✅ | 8 output generators, saved library w/ archive + download |

All pages are `"use client"` components. Auth is enforced via a `localStorage` token + client-side redirect inside `useEffect`.

---

## Python Dependencies (`backend/requirements.txt`)

| Package | Pinned Version | Purpose |
|---|---|---|
| fastapi | 0.110.0 | Web framework |
| uvicorn | 0.28.0 | ASGI server |
| chromadb | 0.4.24 | Vector DB |
| pydantic | 2.6.4 | Data validation |
| httpx | 0.27.0 | Async HTTP (Anthropic API) |
| PyJWT | 2.12.0 | JWT encode/decode |
| bcrypt | 4.1.2 | Password hashing |
| stripe | 15.1.0 | Stripe API client |

---

## Frontend Dependencies (`frontend/package.json`)

| Package | Version | Purpose |
|---|---|---|
| next | 16.2.6 | React framework (App Router) |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM renderer |
| tailwindcss | 4.x | Utility CSS (v4 — no `tailwind.config.ts` needed) |
| @tailwindcss/postcss | 4.x | Tailwind PostCSS plugin |
| typescript | 5.x | Type safety (strict mode) |
| eslint | 9.x | Linter (flat config) |
| eslint-config-next | 16.2.6 | Next.js eslint preset |

---

## Environment Variables (Production)

| Variable | Set In | Required |
|---|---|---|
| `ANTHROPIC_API_KEY` | systemd service | ✅ |
| `JWT_SECRET` | systemd service | ✅ |
| `STRIPE_SECRET_KEY` | systemd service | ✅ |
| `STRIPE_PUBLISHABLE_KEY` | systemd service | ✅ |
| `STRIPE_PRICE_PRO` | systemd service | ✅ |
| `STRIPE_PRICE_MAX` | systemd service | ✅ |
| `STRIPE_WEBHOOK_SECRET` | systemd service | ✅ |

Future integrations (see `INTEGRATIONS_PLAN.md`): `SLACK_*`, `GOOGLE_*`, `NOTION_*`, `LINEAR_API_KEY`, `HUBSPOT_*`.

---

## Infrastructure

| Component | Technology | Location |
|---|---|---|
| VM | Azure Ubuntu 22.04 | 172.173.241.253 |
| Reverse proxy | Caddy 2 (auto-TLS) | `/etc/caddy/Caddyfile` |
| Process manager | systemd (user) | `~/.config/systemd/user/worklifelm-{frontend,backend}.service` |
| Backups | cron + tar | `~/worklifelm/backups/` (3am daily, 7-day retention) |
| TLS | Let's Encrypt via Caddy | Auto-provisioned |
| Frontend port | :3001 | Next.js production server |
| Backend port | :8000 | Uvicorn (2 workers) |

---

## Counts at a glance

| Metric | Value |
|---|---|
| Backend Python LOC | 1,814 |
| Backend modules | 4 |
| Backend endpoints | **44** |
| Frontend TSX LOC (excluding layout) | 1,079 |
| Frontend pages | 5 |
| Tier definitions | 3 (free / professional / max) |
| Model tiers | 3 (Haiku 4.5 / Sonnet 4.6 / Opus 4.7) |
