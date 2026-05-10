from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime

router = APIRouter()

# Schema for Marketplace Entities
class ContributorProfile(BaseModel):
    id: str
    name: str
    bio: str
    ranking: float
    specialties: List[str]

class DialectPack(BaseModel):
    id: str
    title: str
    description: str
    dialect: str
    contributor_id: str
    price: float
    verified: bool = True

class ReviewItem(BaseModel):
    id: str
    pack_id: str
    reviewer_id: str
    status: str # "Pending", "Approved", "Flagged"

# Mock Database / State (To be moved to SQLite/Chroma in Hardening phase)
mock_contributors = [
    {"id": "c1", "name": "Yuki Tanaka", "bio": "Osaka dialect specialist.", "ranking": 4.9, "specialties": ["Japanese", "Osaka-ben"]},
    {"id": "c2", "name": "Carlos Gomez", "bio": "Expert in Mexican industry slang.", "ranking": 4.8, "specialties": ["Spanish", "Technical Mexican"]}
]

@router.get("/contributors", response_model=List[ContributorProfile])
async def list_contributors():
    """Returns all registered human contributors."""
    return mock_contributors

@router.get("/packs", response_model=List[DialectPack])
async def list_packs(dialect: Optional[str] = None):
    """Lists available dialect and pronunciation packs."""
    packs = [
        {"id": "p1", "title": "Osaka Business Essentials", "description": "High-density Osaka-ben for executives.", "dialect": "Osaka-ben", "contributor_id": "c1", "price": 29.99, "verified": True},
        {"id": "p2", "title": "CDMX Software Slang", "description": "Local slang for dev teams in Mexico City.", "dialect": "Mexican Spanish", "contributor_id": "c2", "price": 19.99, "verified": True}
    ]
    if dialect:
        return [p for p in packs if p["dialect"] == dialect]
    return packs

@router.post("/review/submit")
async def submit_for_review(pack_id: str):
    """Submits a new contributor pack to the Arkham review queue."""
    return {"status": "submitted", "queue_id": "q_" + os.urandom(4).hex()}

@router.get("/rankings")
async def get_rankings():
    """Returns top-ranked contributors based on community trust scores."""
    return sorted(mock_contributors, key=lambda x: x["ranking"], reverse=True)
