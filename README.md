# WorkLifeLM

> A persistent, automation-forward AI orchestration platform that replaces traditional note-taking with a "system brain."

![License](https://img.shields.io/badge/license-proprietary-blue)
![Status](https://img.shields.io/badge/status-live-brightgreen)
![Models](https://img.shields.io/badge/models-Haiku%204.5%20%7C%20Sonnet%204.6%20%7C%20Opus%204.7-purple)

---

## What Is WorkLifeLM

WorkLifeLM is a production-focused platform that gives every user a custom-tailored AI swarm. It ingests data from repos, docs, and communication channels, organizes it into a persistent vector memory, and provides intelligent outputs — reports, slide decks, mind maps, audio overviews, and more — all routed through a smart tiered model system that optimizes for cost and capability.

### Core Differentiators

- **System Brain** — Persistent vector memory (ChromaDB) that ingests from GitHub, Slack, uploads, and builds cross-project context over time
- **Smart Tiered Model Routing** — Prompts are classified by complexity and routed to the optimal model (Haiku for fast tasks, Sonnet for balanced, Opus for deep analysis)
- **7 Output Generators** — Reports, slide decks, mind maps, flashcards, quizzes, audio scripts, reverse pitches
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
| Frontend | Next.js 16, TailwindCSS, TypeScript |
| Backend | FastAPI, Python 3.12, Uvicorn |
| Vector DB | ChromaDB (persistent, on-disk) |
| Auth | JWT (PyJWT) + bcrypt + SQLite |
| LLM | Anthropic API (Haiku 4.5, Sonnet 4.6, Opus 4.7) |
| Hosting | Azure VM, systemd services, Caddy reverse proxy |
| CI/CD | GitHub (robs46859-eng/worklifelm) |

---

## API Endpoints (22 total)

### Core
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | System health + model routing info |
| GET | `/api/stats` | Live dashboard stats |
| GET | `/api/prompts/suggested` | Pre-made suggested prompts |

### Brain (Vector Memory)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ingest` | Ingest data from any source |
| GET | `/api/query` | Semantic search across the brain |
| POST | `/api/webhooks/github` | Auto-ingest GitHub push/PR events |

### Swarm Router
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/swarm/route` | Classify → route → call LLM with context |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Get JWT token |
| GET | `/api/auth/profile` | User profile + usage |
| GET | `/api/auth/usage` | Detailed usage breakdown |

### Output Generators
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/outputs/report` | Executive report |
| POST | `/api/outputs/slides` | Slide deck (JSON) |
| POST | `/api/outputs/mindmap` | Mind map (nested JSON) |
| POST | `/api/outputs/flashcards` | Study flashcards |
| POST | `/api/outputs/quiz` | Multiple-choice quiz |
| POST | `/api/outputs/audio-script` | Podcast-style script |
| POST | `/api/outputs/pitch` | Reverse Pitch |

### Operational Agents
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/agents/crm` | CRM follow-up drafts |
| POST | `/api/agents/billing` | Invoice summaries/reminders |
| POST | `/api/agents/team` | Team task management |
| POST | `/api/agents/outreach` | Multi-channel outreach |
| POST | `/api/agents/workflow` | Workflow automation design |

### Decision Tracking
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/decisions/track` | Track unresolved assumptions |
| GET | `/api/decisions/list` | List decision debt |

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
uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend
cd frontend
npm install
npm run dev
```

---

## Deployment

The production deployment runs on an Azure VM with systemd services:

```bash
# Check all services
systemctl --user status worklifelm-frontend worklifelm-backend

# Restart after code changes
systemctl --user restart worklifelm-backend
cd ~/worklifelm/frontend && npm run build && systemctl --user restart worklifelm-frontend
```

---

## License

Proprietary — © 2026 WorkLifeLM. All rights reserved.
