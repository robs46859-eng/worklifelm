# WorkLifeLM — 3rd Party Integration Build Plan

## Overview
This document outlines the integration scaffold for connecting WorkLifeLM to external productivity tools. Each integration follows a standard OAuth2 + webhook pattern, ingesting data into the ChromaDB vector brain.

---

## Integration Architecture

```
External Service → OAuth2 Auth → Webhook/Polling → Ingest Pipeline → ChromaDB Vector Brain
                                                                   → LLM Context Augmentation
```

### Standard Integration Interface
Every integration implements:
1. **Auth** — OAuth2 flow or API key storage
2. **Sync** — Initial data pull + ongoing webhook/polling
3. **Ingest** — Parse → chunk → embed → store in ChromaDB
4. **Actions** — Outbound actions (send message, create doc, etc.)

---

## Priority Integrations

### Tier 1 — Launch
| Integration | Auth Method | Data Ingested | Actions |
|---|---|---|---|
| **Slack** | OAuth2 | Messages, threads, channels | Send messages, create channels |
| **Google Drive** | OAuth2 | Docs, Sheets, Slides | Create/update docs, upload outputs |
| **Gmail** | OAuth2 | Emails, threads | Send emails, drafts |
| **GitHub** | OAuth2 + Webhooks | PRs, issues, commits, code | ✅ Already built (webhook) |

### Tier 2 — Growth
| Integration | Auth Method | Data Ingested | Actions |
|---|---|---|---|
| **Google Calendar** | OAuth2 | Events, meetings | Create events |
| **Notion** | OAuth2 | Pages, databases | Create/update pages |
| **Linear** | OAuth2 | Issues, projects | Create issues |
| **HubSpot CRM** | OAuth2 | Contacts, deals, companies | Create contacts, update deals |
| **Stripe** | API Key | Customers, invoices, subscriptions | ✅ Already built (billing) |

### Tier 3 — Enterprise
| Integration | Auth Method | Data Ingested | Actions |
|---|---|---|---|
| **Microsoft 365** | OAuth2 | Outlook, Teams, OneDrive | Send emails, create docs |
| **Salesforce** | OAuth2 | Leads, opportunities, accounts | CRUD on records |
| **Jira** | OAuth2 | Issues, sprints, boards | Create/update issues |
| **Confluence** | OAuth2 | Pages, spaces | Create pages |
| **QuickBooks** | OAuth2 | Invoices, expenses, P&L | Create invoices |

---

## Implementation Per Integration

### Slack Integration
```
Endpoint: POST /api/integrations/slack/connect
Callback: GET /api/integrations/slack/callback
Webhook: POST /api/integrations/slack/events
Scopes: channels:history, chat:write, users:read
```

**Setup Steps:**
1. Create Slack App at api.slack.com/apps
2. Add OAuth redirect: `https://worklifelm.com/api/integrations/slack/callback`
3. Subscribe to events: `message.channels`, `message.groups`
4. Store: `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`

### Google Drive Integration
```
Endpoint: POST /api/integrations/google/connect
Callback: GET /api/integrations/google/callback
Scopes: drive.readonly, docs.readonly, sheets.readonly
```

**Setup Steps:**
1. Create project in Google Cloud Console
2. Enable Drive API, Docs API, Sheets API
3. Create OAuth2 credentials with redirect: `https://worklifelm.com/api/integrations/google/callback`
4. Store: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### Gmail Integration
```
Endpoint: POST /api/integrations/gmail/connect
Callback: GET /api/integrations/gmail/callback
Watch: POST /api/integrations/gmail/webhook (via Google Pub/Sub)
Scopes: gmail.readonly, gmail.send
```

---

## Environment Variables Needed

| Variable | Integration | Description |
|---|---|---|
| `SLACK_CLIENT_ID` | Slack | OAuth app client ID |
| `SLACK_CLIENT_SECRET` | Slack | OAuth app secret |
| `SLACK_SIGNING_SECRET` | Slack | Webhook verification |
| `GOOGLE_CLIENT_ID` | Google (Drive/Gmail/Calendar) | OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google | OAuth client secret |
| `NOTION_CLIENT_ID` | Notion | Integration client ID |
| `NOTION_CLIENT_SECRET` | Notion | Integration secret |
| `LINEAR_API_KEY` | Linear | API key |
| `HUBSPOT_CLIENT_ID` | HubSpot | OAuth app client ID |
| `HUBSPOT_CLIENT_SECRET` | HubSpot | OAuth app secret |

---

## Database Schema Addition

```sql
CREATE TABLE integrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    provider TEXT NOT NULL,          -- 'slack', 'google', 'gmail', etc.
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TEXT,
    workspace_id TEXT,               -- Slack workspace, Google org, etc.
    config JSON DEFAULT '{}',        -- Provider-specific config
    status TEXT DEFAULT 'active',    -- active, paused, error
    last_sync TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Estimated Timeline
| Phase | Duration | Integrations |
|---|---|---|
| Phase 1 | 2 weeks | Slack + Google Drive |
| Phase 2 | 2 weeks | Gmail + Calendar + Notion |
| Phase 3 | 3 weeks | HubSpot + Linear + Microsoft 365 |
| Phase 4 | 4 weeks | Salesforce + Jira + QuickBooks |
