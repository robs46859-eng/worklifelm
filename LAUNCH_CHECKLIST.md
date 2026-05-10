# Final Launch Checklist (Azure Deployment)

## Phase 1: Environment Setup
- [ ] Git clone to `/home/hermes/worklifelm`
- [ ] Create `.env` from `~/.zshenv` values
- [ ] Install Python 3.13 and Node.js 22

## Phase 2: Database Initialization
- [ ] Run `python3 backend/database_migration.py` to establish production schema
- [ ] Verify local Docker ChromaDB is running on port 8000

## Phase 3: Service Deployment
- [ ] Configure Caddy reverse proxy for `worklifelm.com`
- [ ] Enable systemd user services for frontend and backend

## Phase 4: Verification
- [ ] Run `python3 integration_test.py` against the production IP
- [ ] Verify DAD Bubble appears in the browser window
