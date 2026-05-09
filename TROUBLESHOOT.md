# WorkLifeLM Troubleshooting Guide

## Quick Diagnostics

### Check All Services
```bash
ssh hermes@172.173.241.253
systemctl --user status worklifelm-frontend worklifelm-backend
curl -s http://127.0.0.1:8000/api/health | python3 -m json.tool
```

---

## Common Issues

### 1. Backend Won't Start
**Symptoms:** `worklifelm-backend` is `inactive` or `failed`

**Steps:**
```bash
# Check logs
journalctl --user -u worklifelm-backend --no-pager -n 50

# Common causes:
# a) Missing JWT_SECRET env var → check systemd service file
cat ~/.config/systemd/user/worklifelm-backend.service | grep JWT_SECRET

# b) Python dependency missing
cd ~/worklifelm/backend
./venv/bin/pip install -r requirements.txt

# c) Port already in use
lsof -i :8000
kill <PID>

# Restart
systemctl --user restart worklifelm-backend
```

### 2. Frontend Build Fails
**Symptoms:** TypeScript errors during `npm run build`

**Steps:**
```bash
cd ~/worklifelm/frontend
npm run build 2>&1 | tail -20

# Fix TS errors, then:
npm run build && systemctl --user restart worklifelm-frontend
```

### 3. API Returns 502 / Blank
**Symptoms:** Browser shows 502 Bad Gateway

**Steps:**
```bash
# Check if backend is running
curl http://127.0.0.1:8000/api/health

# Check Caddy logs
sudo journalctl -u caddy --no-pager -n 20

# Reload Caddy config
sudo systemctl reload caddy
```

### 4. LLM Calls Fail (model not found)
**Symptoms:** API returns `not_found_error` on model

**Steps:**
```bash
# List available models
curl -s https://api.anthropic.com/v1/models \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" | python3 -m json.tool

# Update MODEL_ROUTING in backend/main.py to match available model IDs
# Restart backend
```

### 5. Stripe Checkout Fails
**Symptoms:** Clicking "Upgrade" doesn't redirect to Stripe

**Steps:**
```bash
# Test checkout endpoint
curl -X POST http://127.0.0.1:8000/api/billing/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"tier": "professional"}'

# Verify Stripe keys are set
cat ~/.config/systemd/user/worklifelm-backend.service | grep STRIPE
```

### 6. Login Not Working
**Symptoms:** "Invalid email or password" despite correct credentials

**Steps:**
```bash
# Check if auth DB exists
ls -la ~/worklifelm/backend/data/auth.db

# If DB was deleted, restart backend to re-seed admin
systemctl --user restart worklifelm-backend

# Verify admin account
sqlite3 ~/worklifelm/backend/data/auth.db "SELECT email, tier FROM users;"
```

### 7. ChromaDB / Vector Memory Issues
**Symptoms:** Brain nodes always shows 0, or ingestion fails

**Steps:**
```bash
# Check ChromaDB data directory
ls -la ~/worklifelm/backend/data/chroma/

# Reset vector DB (caution: deletes all stored context)
rm -rf ~/worklifelm/backend/data/chroma
systemctl --user restart worklifelm-backend
```

### 8. DNS / TLS Issues
**Symptoms:** Site unreachable at worklifelm.com

**Steps:**
```bash
# Check DNS resolution
dig worklifelm.com A

# Should return 172.173.241.253
# If not, update DNS A record and wait for propagation (2-5 min)

# Check Caddy TLS
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl restart caddy
```

---

## Nuclear Options

### Full Backend Reset
```bash
rm -rf ~/worklifelm/backend/data
systemctl --user restart worklifelm-backend
# Re-seeds admin account, fresh ChromaDB, fresh auth DB
```

### Full Frontend Rebuild
```bash
cd ~/worklifelm/frontend
rm -rf .next node_modules
npm install
npm run build
systemctl --user restart worklifelm-frontend
```

### Pull Latest from GitHub
```bash
cd ~/worklifelm
git pull origin main
# Then rebuild both services
```

---

## Log Locations
| Log | Location |
|---|---|
| Backend | `journalctl --user -u worklifelm-backend` |
| Frontend | `journalctl --user -u worklifelm-frontend` |
| Caddy | `sudo journalctl -u caddy` |
| Caddy access | `/var/log/caddy/worklifelm_access.log` |
| Backups | `~/worklifelm/backups/` |

## Support Contacts
- **Admin Login:** robcofamily@gmail.com
- **GitHub:** github.com/robs46859-eng/worklifelm
- **VM:** hermes@172.173.241.253
