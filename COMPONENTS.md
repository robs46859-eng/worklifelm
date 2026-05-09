# WorkLifeLM — Component & Dependency Inventory

## Repository
- **GitHub:** `https://github.com/robs46859-eng/worklifelm`
- **Local:** `/Users/robert/Desktop/worklifelm`
- **Production:** `/home/hermes/worklifelm` (Azure VM: 172.173.241.253)

---

## Directory Structure

```
worklifelm/
├── README.md
├── TROUBLESHOOT.md
├── INTEGRATIONS_PLAN.md
├── COMPONENTS.md                ← This file
│
├── backend/
│   ├── main.py                  ← FastAPI app (all endpoints)
│   ├── auth.py                  ← JWT auth, user CRUD, rate limiting
│   ├── billing.py               ← Stripe checkout, webhooks, portal
│   ├── integrations.py          ← 3rd party scaffold, saved outputs, collaborators
│   ├── requirements.txt
│   ├── venv/                    ← Python virtual environment
│   └── data/
│       ├── auth.db              ← SQLite (users, usage, integrations, outputs, collaborators)
│       └── chroma/              ← ChromaDB persistent vector storage
│
└── frontend/
    ├── package.json
    ├── next.config.ts
    ├── tailwind.config.ts
    └── src/app/
        ├── layout.tsx           ← Root layout
        ├── page.tsx             ← Dashboard (Command Center)
        ├── login/page.tsx       ← Auth (sign in / register)
        ├── profile/page.tsx     ← Profile, password change, subscription
        ├── pricing/page.tsx     ← Tier comparison + Stripe checkout
        └── outputs/page.tsx     ← Output generator + saved library
```

---

## Backend Components

### `main.py` — FastAPI Application
| Component | Lines | Purpose |
|---|---|---|
| Model Routing | ~60-90 | Classify prompt complexity → route to Haiku/Sonnet/Opus |
| LLM Client | ~90-130 | Anthropic Messages API caller with usage tracking |
| Health/Stats | ~220-240 | System health, dashboard stats, suggested prompts |
| Auth Endpoints | ~250-360 | Register, login, profile CRUD, password change/reset |
| Billing Endpoints | ~360-430 | Stripe checkout, webhook, portal, config |
| Ingestion | ~430-470 | Data ingest → ChromaDB vector embedding |
| Semantic Query | ~470-520 | Vector similarity search across brain |
| GitHub Webhook | ~520-560 | Auto-ingest from GitHub push/PR events |
| Swarm Router | ~560-680 | Classify → query brain → route to LLM → respond |
| Decision Tracking | ~680-720 | Track/list unresolved assumptions |
| Output Generators | ~720-1000 | Report, slides, mindmap, flashcards, quiz, audio, pitch |
| Operational Agents | ~1000-1070 | CRM, billing, team, outreach, workflow agents |
| Video Scaffold | ~1070-1100 | Video storyboard (coming soon) |
| Saved Outputs | ~1100-1180 | Save, list, download, archive, delete outputs |
| Collaborators | ~1180-1230 | Invite, list, remove (paid feature) |
| Integrations | ~1230-1250 | Available/connected integrations list |

### `auth.py` — Authentication Module
| Function | Purpose |
|---|---|
| `init_auth_db()` | Create tables, seed admin |
| `create_user()` | Register with bcrypt hash |
| `authenticate_user()` | Verify credentials |
| `create_token()` / `decode_token()` | JWT encode/decode |
| `get_current_user()` | Extract user from Authorization header |
| `update_user_profile()` | Update name/email |
| `change_password()` | Change with current password verification |
| `reset_password_by_email()` | Admin-only reset |
| `check_rate_limit()` | Per-tier daily limit enforcement |
| `record_usage()` | Log usage events |
| `get_usage_summary()` | Daily usage breakdown |

### `billing.py` — Stripe Module
| Function | Purpose |
|---|---|
| `create_checkout_session()` | Stripe Checkout for Pro/Max upgrade |
| `handle_webhook_event()` | Process subscription lifecycle events |
| `create_billing_portal()` | Customer self-service portal |

### `integrations.py` — Integrations & Data Module
| Function | Purpose |
|---|---|
| `init_integrations_db()` | Create integrations, saved_outputs, collaborators tables |
| `save_output()` | Persist generated output |
| `get_user_outputs()` | List outputs (active or archived) |
| `get_output_by_id()` | Fetch single output with content |
| `archive_output()` / `unarchive_output()` | Move to/from archive |
| `invite_collaborator()` | Invite user to project (paid) |
| `get_project_collaborators()` | List project collaborators |
| `SUPPORTED_PROVIDERS` | Registry of 8 integration providers |
| `OUTPUT_FORMATS` | File type mapping for downloads |

---

## Frontend Pages

| Page | Route | Auth Required | Purpose |
|---|---|---|---|
| Dashboard | `/` | ✅ | Command Center with 3 modes, chat, stats |
| Login | `/login` | ❌ | Sign in / Register |
| Profile | `/profile` | ✅ | Edit name/email, change password, manage subscription |
| Pricing | `/pricing` | ❌ | Tier comparison, Stripe checkout buttons |
| Outputs | `/outputs` | ✅ | 8 output generators, save/download/archive library |

---

## Python Dependencies

| Package | Version | Purpose |
|---|---|---|
| fastapi | latest | Web framework |
| uvicorn | latest | ASGI server |
| chromadb | latest | Vector database |
| httpx | latest | Async HTTP client (Anthropic API) |
| pydantic | latest | Data validation |
| PyJWT | 2.12+ | JWT token encoding |
| bcrypt | 5.0+ | Password hashing |
| aiosqlite | 0.22+ | Async SQLite support |
| stripe | 15.1+ | Stripe API client |

## Frontend Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | 16.2.6 | React framework |
| react | 19+ | UI library |
| tailwindcss | 4+ | Utility CSS |
| typescript | 5+ | Type safety |

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

---

## Infrastructure

| Component | Technology | Location |
|---|---|---|
| VM | Azure Ubuntu 22.04 | 172.173.241.253 |
| Reverse Proxy | Caddy 2 | `/etc/caddy/Caddyfile` |
| Process Manager | systemd (user) | `~/.config/systemd/user/` |
| Backups | Cron + tar | `~/worklifelm/backups/` (3am daily, 7-day retention) |
| TLS | Let's Encrypt (via Caddy) | Auto-provisioned |

## API Endpoint Count: 35+
