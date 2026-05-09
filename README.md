# WorkLifeLM

> A persistent, automation-forward AI orchestration platform that replaces traditional note-taking with a "system brain."

![License](https://img.shields.io/badge/license-proprietary-blue)
![Status](https://img.shields.io/badge/status-live-brightgreen)
![Models](https://img.shields.io/badge/models-Haiku%204.5%20%7C%20Sonnet%204.6%20%7C%20Opus%204.7-purple)
![Endpoints](https://img.shields.io/badge/endpoints-44-blue)

---

## What Is WorkLifeLM

WorkLifeLM is a production-focused platform that gives every user a custom-tailored AI swarm. It ingests data from repos, docs, and communication channels, organizes it into a persistent vector memory, and provides intelligent outputs — reports, slide decks, mind maps, audio overviews, and more — all routed through a smart tiered model system that optimizes for cost and capability.

### Core Differentiators

- **System Brain** — Persistent vector memory (ChromaDB) that ingests from GitHub, Slack, uploads, and builds cross-project context over time
- **Smart Tiered Model Routing** — Prompts are classified by complexity and routed to the optimal model (Haiku for fast tasks, Sonnet for balanced, Opus for deep analysis)
- **8 Output Generators** — Reports, slide decks, mind maps, flashcards, quizzes, audio scripts, reverse pitches, video storyboards (scaffold)
- **5 Operational Agents** — CRM follow-up, billing automation, team management, outreach campaigns, workflow design
- **3 Modes** — Build (code/architecture), Operate (business processes), Analyze (cross-project insights)

---

## Architecture

```
Internet
  │
  └── worklifelm.com ───► Caddy (TLS) ──► :3001 (Next.js 16 Frontend)
                                        ──► :8000 (FastAPI Backend, /api/*)
```

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind v4, TypeScript 5 (strict) |
| Backend | FastAPI 0.110, Python 3.12, Uvicorn (2 workers) |
| Vector DB | ChromaDB (persistent, on-disk) |
| Auth | JWT (PyJWT 2.12+) + bcrypt + SQLite |
| Billing | Stripe (Checkout + webhooks + Customer Portal) |
| LLM | Anthropic API direct (Haiku 4.5, Sonnet 4.6, Opus 4.7) |
| Hosting | Azure VM (Ubuntu 22.04), systemd user services, Caddy reverse proxy |
| CI/CD | GitHub (`robs46859-eng/worklifelm`) → manual `git pull` + service restart on VM |

---

## API Endpoints (44 total)

### Core (3)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | System health + model routing info |
| GET | `/api/stats` | Live dashboard stats |
| GET | `/api/prompts/suggested` | Pre-made suggested prompts |

### Auth (7)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Get JWT token |
| GET | `/api/auth/profile` | User profile + usage |
| PUT | `/api/auth/profile` | Update name/email |
| GET | `/api/auth/usage` | Detailed usage breakdown |
| POST | `/api/auth/change-password` | Change password (requires current) |
| POST | `/api/auth/reset-password` | Admin-only reset |

### Billing (4)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/billing/checkout` | Stripe Checkout session for upgrade |
| POST | `/api/billing/webhook` | Stripe webhook receiver |
| POST | `/api/billing/portal` | Customer self-service portal |
| GET | `/api/billing/config` | Public Stripe config (publishable key) |

### Brain (Vector Memory) (3)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ingest` | Ingest data from any source |
| GET | `/api/query` | Semantic search across the brain |
| POST | `/api/webhooks/github` | Auto-ingest GitHub push/PR events |

### Swarm Router (1)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/swarm/route` | Classify → query brain → call LLM with context |

### Decision Tracking (2)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/decisions/track` | Track unresolved assumptions |
| GET | `/api/decisions/list` | List decision debt |

### Output Generators (8)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/outputs/report` | Executive report |
| POST | `/api/outputs/slides` | Slide deck (JSON) |
| POST | `/api/outputs/mindmap` | Mind map (nested JSON) |
| POST | `/api/outputs/flashcards` | Study flashcards |
| POST | `/api/outputs/quiz` | Multiple-choice quiz |
| POST | `/api/outputs/audio-script` | Podcast-style script |
| POST | `/api/outputs/pitch` | Reverse Pitch |
| POST | `/api/outputs/video` | Video storyboard (scaffold) |

### Operational Agents (5)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/agents/crm` | CRM follow-up drafts |
| POST | `/api/agents/billing` | Invoice summaries/reminders |
| POST | `/api/agents/team` | Team task management |
| POST | `/api/agents/outreach` | Multi-channel outreach |
| POST | `/api/agents/workflow` | Workflow automation design |

### Saved Outputs (6)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/outputs/save` | Persist a generated output |
| GET | `/api/outputs/list` | List saved (active or archived) |
| GET | `/api/outputs/{id}/download` | Download single output |
| POST | `/api/outputs/{id}/archive` | Move to archive |
| POST | `/api/outputs/{id}/unarchive` | Restore from archive |
| DELETE | `/api/outputs/{id}` | Permanently delete |

### Collaborators (3, paid)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/collaborators/invite` | Invite user to project |
| GET | `/api/collaborators/{project_id}` | List project collaborators |
| DELETE | `/api/collaborators/{entry_id}` | Remove collaborator |

### Integrations (2)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/integrations/available` | All supported providers |
| GET | `/api/integrations/connected` | User's connected providers |

---

## Pricing

| Feature | Free ($0/mo) | Professional ($20/mo) | Max ($100/mo) |
|---|---|---|---|
| Notebooks | 100/user | 200/user | 500/user |
| Sources | 50/notebook | 100/notebook | 300/notebook |
| Chats | 50/day | 200/day | 500/day |
| Audio Overviews | 3/day | 6/day | 20/day |
| Reports | 10/day | 20/day | 100/day |
| Flashcards & Quizzes | 10/day | 20/day | 100/day |
| Video Overviews | 3/day | 6/day | 20/day |
| Mind Maps | 10/day | 20/day | 100/day |
| Deep Research | 10/month | 3/day | 20/day |

---

## Local Development

```bash
# Backend
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
export ANTHROPIC_API_KEY="your-key"
export JWT_SECRET="dev-secret-change-me"
uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend (in a separate shell)
cd frontend
npm install
npm run dev
# → http://localhost:3000  (proxies /api to :8000 in production via Caddy)
```

---

## Deployment

Production runs on an Azure VM with systemd user services behind Caddy.

```bash
# SSH in
ssh hermes@172.173.241.253

# Pull latest
cd ~/worklifelm
git pull origin main

# Backend
cd backend
./venv/bin/pip install -r requirements.txt
systemctl --user restart worklifelm-backend

# Frontend
cd ../frontend
npm install
npm run build
systemctl --user restart worklifelm-frontend

# Verify
systemctl --user status worklifelm-frontend worklifelm-backend
curl -s https://worklifelm.com/api/health | python3 -m json.tool
```

See **TROUBLESHOOT.md** for failure modes and recovery, and **COMPONENTS.md** for the full module/dependency inventory.

---

## License

Proprietary — © 2026 WorkLifeLM. All rights reserved.
