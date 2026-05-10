from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import os

router = APIRouter()

# Schema for Enterprise Entities
class Organization(BaseModel):
    id: str
    name: str
    plan_tier: str # "Pro", "Enterprise"
    total_token_usage: int

class TeamMember(BaseModel):
    id: str
    email: str
    role: str # "Admin", "Editor", "Viewer"
    usage_stats: dict

class ApiKeyMetadata(BaseModel):
    id: str
    name: str
    last_used: str
    status: str

# Mock State for Milestone 9
mock_org = {
    "id": "org_worklife_001",
    "name": "Acme Global Engineering",
    "plan_tier": "Enterprise",
    "total_token_usage": 1250400
}

mock_members = [
    {"id": "u1", "email": "lead@acme.com", "role": "Admin", "usage_stats": {"searches": 450, "swarms": 12}},
    {"id": "u2", "email": "dev1@acme.com", "role": "Editor", "usage_stats": {"searches": 120, "swarms": 4}}
]

@router.get("/organization/stats", response_model=Organization)
async def get_org_stats():
    """Returns top-level organization usage and billing stats."""
    return mock_org

@router.get("/team/members", response_model=List[TeamMember])
async def list_team_members():
    """Lists all members in the current organization with their roles and usage."""
    return mock_members

@router.post("/team/role-update")
async def update_member_role(user_id: str, new_role: str):
    """Updates a team member's role (Admin, Editor, Viewer)."""
    # Logic to update SQLite/Postgres in hardening phase
    return {"status": "updated", "user_id": user_id, "new_role": new_role}

@router.get("/api-keys", response_model=List[ApiKeyMetadata])
async def list_api_keys():
    """Returns metadata for organizational API access keys."""
    return [
        {"id": "key_1", "name": "Production CI/CD", "last_used": "2026-05-10T11:00:00Z", "status": "Active"},
        {"id": "key_2", "name": "Staging Backend", "last_used": "2026-05-09T18:45:00Z", "status": "Active"}
    ]
