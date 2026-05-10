# Production Hardening Guide: WorkLifeLM (Azure Deployment)

**Target Environment:** Azure VM (Ubuntu 22.04) | IP: 172.173.241.253 | Hostname: worklifelm.com

## 1. Security Hardening
- [ ] **Firewall (UFW):** Ensure only ports 80 (HTTP), 443 (HTTPS), and 22 (SSH) are open.
- [ ] **Fail2Ban:** Install and configure to prevent brute-force SSH attacks.
- [ ] **Environment Secrets:** All keys (GROQ, OPENROUTER, LLAMA, BRAVE) must be stored in a `.env` file with `chmod 600` permissions. Never hardcode.
- [ ] **Application Default Credentials:** Run `gcloud auth application-default login` on the VM if using Stitch MCP features from the server.

## 2. Persistence Layer (Database Migration)
- [ ] **SQLite to Managed DB:** Migration from local SQLite to Azure Database for PostgreSQL (recommended for production).
- [ ] **ChromaDB Persistence:** Ensure the Docker volume for Chroma is backed up daily to Azure Blob Storage.
- [ ] **Backup Schedule:** Weekly automated snapshots of the OS disk and daily DB dumps.

## 3. Monitoring & Reliability
- [ ] **Systemd Services:** Configure both `worklife-backend` and `worklife-frontend` as systemd user services with `Restart=always`.
- [ ] **Caddy Reverse Proxy:** Use Caddy for automatic SSL management and routing.
- [ ] **Health Probes:** The `/health` endpoint must be monitored by an external uptime service.

## 4. Cost Controls
- [ ] **Azure Budget Alerts:** Set an alert at 80% of the monthly quota.
- [ ] **LLM Rate Limiting:** Global rate limits are active in `auth.py` to prevent runaway API costs from compromised accounts.

## 5. Recovery Steps
1. **Frontend Failure:** `systemctl --user restart worklife-frontend`
2. **Backend Failure:** `systemctl --user restart worklife-backend`
3. **Database Corruption:** Restore latest `.sql` dump from Azure Blob Storage.
4. **Full System Restore:** Deploy from the GitHub repository and run `scripts/database_migration.py`.
